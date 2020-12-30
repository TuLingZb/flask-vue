import base64
from datetime import datetime, timedelta
from hashlib import md5
import json
import jwt
from time import time
from werkzeug.security import generate_password_hash, check_password_hash
from flask import url_for, current_app
from app.extensions import db
from app.utils.elasticsearch import add_to_index, remove_from_index, query_index, es_highlight
from app.utils.date_trans import transfor_dateformat

class SearchableMixin(object):
    @classmethod
    def search(cls, query, page, per_page, ids=None):
        total, hits, highlights = query_index(cls.__tablename__, query, page, per_page, ids)

        if total == 0:
            return 0, cls.query.filter_by(id=0)  # 如果没有匹配到搜索词，则故意返回空的 BaseQuery

        hit_ids = []  # 匹配到的记录，id 列表
        when = []
        for i in range(len(hits)):
            hit_ids.append(hits[i][0])
            when.append((hits[i][0], i))
        # 将 hit_ids 列表转换成对应排序顺序(ES搜索得分高排在前面)的 BaseQuery，请参考: https://stackoverflow.com/questions/6332043/sql-order-by-multiple-values-in-specific-order/6332081#6332081
        hits_basequery = cls.query.filter(cls.id.in_(hit_ids)).order_by(db.case(when, value=cls.id))
        # 再遍历 BaseQuery，将要搜索的字段值中关键词高亮
        for obj in hits_basequery:
            for field, need_highlight in obj.__searchable__:
                if need_highlight:  # 只有设置为 True 的字段才高亮关键字
                    source = getattr(obj, field)  # 原字段的值
                    highlight_source = es_highlight(source, highlights)  # 关键字高亮后的字段值
                    setattr(obj, field, highlight_source)

        return total, hits_basequery

    @classmethod
    def receive_after_insert(cls, mapper, connection, target):
        '''监听 SQLAlchemy 'after_insert' 事件
        请参考: https://docs.sqlalchemy.org/en/13/orm/events.html#mapper-events'''
        add_to_index(target.__tablename__, target)

    @classmethod
    def before_commit(cls, session):
        session._changes = {
            'update': list(session.dirty)
        }

    @classmethod
    def after_commit(cls, session):
        for obj in session._changes['update']:
            if isinstance(obj, SearchableMixin):
                add_to_index(obj.__tablename__, obj)
        session._changes = None

    @classmethod
    def receive_after_delete(cls, mapper, connection, target):
        '''监听 SQLAlchemy 'after_delete' 事件'''
        remove_from_index(target.__tablename__, target)

    @classmethod
    def reindex(cls):
        '''刷新指定数据模型中的所有数据的索引'''
        for obj in cls.query:
            add_to_index(cls.__tablename__, obj)


db.event.listen(db.session, 'before_commit', SearchableMixin.before_commit)
db.event.listen(db.session, 'after_commit', SearchableMixin.after_commit)


class PaginatedAPIMixin(object):
    @staticmethod
    def to_collection_dict(query, page, per_page, endpoint, **kwargs):
        # 如果当前没有任何资源时，或者前端请求的 page 越界时，都会抛出 404 错误
        # 由 @bp.app_errorhandler(404) 自动处理，即响应 JSON 数据：{ error: "Not Found" }
        resources = query.paginate(page, per_page)
        data = {
            'items': [item.to_dict() for item in resources.items],
            'total':resources.total,
            '_meta': {
                'page': page,
                'per_page': per_page,
                'total_pages': resources.pages,
                'total_items': resources.total
            },
            '_links': {
                'self': url_for(endpoint, page=page, per_page=per_page,
                                **kwargs),
                'next': url_for(endpoint, page=page + 1, per_page=per_page,
                                **kwargs) if resources.has_next else None,
                'prev': url_for(endpoint, page=page - 1, per_page=per_page,
                                **kwargs) if resources.has_prev else None
            }
        }
        return data

class Permission:
    '''权限认证中的各种操作，对应二进制的位，比如
    FOLLOW: 0b00000001，转换为十六进制为 0x01
    COMMENT: 0b00000010，转换为十六进制为 0x02
    WRITE: 0b00000100，转换为十六进制为 0x04
    ...
    ADMIN: 0b10000000，转换为十六进制为 0x80

    中间还预留了第 4、5、6、7 共4位二进制位，以备后续增加操作权限
    '''
    # 关注其它用户的权限
    FOLLOW = 0x01
    # 发表评论、评论点赞与踩的权限
    COMMENT = 0x02
    # 撰写文章的权限
    WRITE = 0x04
    # 管理网站的权限(对应管理员角色)
    ADMIN = 0x80


class Role(PaginatedAPIMixin, db.Model):
    __tablename__ = 'roles'
    id = db.Column(db.Integer, primary_key=True)
    slug = db.Column(db.String(255), unique=True)
    name = db.Column(db.String(255))  # 角色名称
    default = db.Column(db.Boolean, default=False, index=True)  # 当新增用户时，是否将当前角色作为默认角色赋予新用户
    # permissions = db.Column(db.Integer)  # 角色拥有的权限，各操作对应一个二进制位，能执行某项操作的角色，其位会被设为 1
    users = db.relationship('User', backref='role', lazy='dynamic')
    deleted = db.Column(db.Boolean, default=False)
    def __init__(self, **kwargs):
        super(Role, self).__init__(**kwargs)
        # if self.permissions is None:
        #     self.permissions = 0
        pass

    @staticmethod
    def insert_roles():
        '''应用部署时，应该主动执行此函数，添加以下角色
        注意: 未登录的用户，可以浏览，但不能评论或点赞等
        shutup:        0b0000 0000 (0x00) 用户被关小黑屋，收回所有权限
        reader:        0b0000 0011 (0x03) 读者，可以关注别人、评论与点赞，但不能发表文章
        author:        0b0000 0111 (0x07) 作者，可以关注别人、评论与点赞，发表文章
        administrator: 0b1000 0111 (0x87) 超级管理员，拥有全部权限

        以后如果要想添加新角色，或者修改角色的权限，修改 roles 数组，再运行函数即可
        '''
        roles = {
            # 'shutup': ('小黑屋', ()),
            'reader': ('访客',),
            'author': ('实验员',),
            'admin': ('管理员',),
        }
        default_role = 'reader'
        for r in roles:  # r 是字典的键
            role = Role.query.filter_by(slug=r).first()
            if role is None:
                role = Role(slug=r, name=roles[r][0])
            # role.reset_permissions()
            role.default = (role.slug == default_role)
            db.session.add(role)
        db.session.commit()



    def to_dict(self):
        data = {
            'id': self.id,
            'slug': self.slug,
            'name': self.name,
            'default': self.default,
            # 'permissions': self.permissions,
            '_links': {
                'self': url_for('api.get_role', id=self.id)
            }
        }
        return data

    def from_dict(self, data):
        for field in ['slug', 'name']:
            if field in data:
                setattr(self, field, data[field])

    def __str__(self):
        return self.name

    def __repr__(self):
        return '<Role {}>'.format(self.name)


class User(PaginatedAPIMixin, db.Model):
    '''
    登录网站录入人员注册信息表
    '''
    # 设置数据库表名，Post模型中的外键 user_id 会引用 users.id
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), index=True, unique=True)
    email = db.Column(db.String(120), index=True, unique=True)
    password_hash = db.Column(db.String(128))  # 不保存原始密码
    name = db.Column(db.String(64))
    location = db.Column(db.String(64))
    about_me = db.Column(db.Text())
    member_since = db.Column(db.DateTime(), default=datetime.utcnow)
    last_seen = db.Column(db.DateTime(), default=datetime.utcnow)

    deleted = db.Column(db.Boolean, default=False)
    # 反向引用，直接查询出当前用户的所有博客文章; 同时，Post实例中会有 author 属性
    # cascade 用于级联删除，当删除user时，该user下面的所有posts都会被级联删除
    squences = db.relationship('SampleSequence', backref='author', lazy='dynamic',)
                            # cascade='all, delete-orphan')
    # 用户注册后，需要先确认邮箱
    confirmed = db.Column(db.Boolean, default=False)
    # 用户所属的角色
    role_id = db.Column(db.Integer, db.ForeignKey('roles.id'))
    # 用户的RQ后台任务
    # tasks = db.relationship('Task', backref='user', lazy='dynamic')

    def set_password(self, password):
        '''设置用户密码，保存为 Hash 值'''
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        '''验证密码与保存的 Hash 值是否匹配'''
        return check_password_hash(self.password_hash, password)

    def avatar(self, size):
        '''用户头像'''
        # digest = md5(self.email.lower().encode('utf-8')).hexdigest()
        return 'https://wpimgs.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'

    def to_dict(self, include_email=False):
        data = {
            'id': self.id,
            'username': self.username,
            'name': self.name,
            'location': self.location,
            'introduction': self.about_me,
            'member_since': self.member_since.isoformat() + 'Z',
            'last_seen': self.last_seen.isoformat() + 'Z',
            # 'posts_count': self.posts.count(),
            'confirmed': self.confirmed,
            'role_id': self.role_id,
            'roles': [Role.query.get_or_404(self.role_id).slug],
            'avatar': 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
            '_links': {
                'self': url_for('api.get_user', id=self.id),
                'avatar': self.avatar(128),
                'roles': url_for('api.get_role', id=self.role_id)
            }
        }
        if include_email:
            data['email'] = self.email
        return data

    def from_dict(self, data, new_user=False):
        for field in ['username', 'email', 'name', 'location', 'about_me', 'confirmed', 'role_id']:
            if field in data:
                setattr(self, field, data[field])
        if new_user and 'password' in data:
            self.set_password(data['password'])
            # 新建用户时，给用户自动分配角色
            if self.role is None:
                if self.email in current_app.config['ADMINS']:
                    self.role = Role.query.filter_by(slug='admin').first()
                else:
                    self.role = Role.query.filter_by(default=True).first()

    def ping(self):
        '''更新用户的最后访问时间'''
        self.last_seen = datetime.utcnow()
        db.session.add(self)

    def get_jwt(self, expires_in=3600):
        '''用户登录后，发放有效的 JWT'''
        now = datetime.utcnow()
        payload = {
            'user_id': self.id,
            'confirmed': self.confirmed,
            'user_name': self.name if self.name else self.username,
            'user_avatar': base64.b64encode(self.avatar(24).
                                            encode('utf-8')).decode('utf-8'),
            'permissions': self.role.slug,
            'exp': now + timedelta(seconds=expires_in),
            'iat': now
        }
        return jwt.encode(
            payload,
            current_app.config['SECRET_KEY'],
            algorithm='HS256').decode('utf-8')

    @staticmethod
    def verify_jwt(token):
        '''验证 JWT 的有效性'''
        try:
            payload = jwt.decode(
                token,
                current_app.config['SECRET_KEY'],
                algorithms=['HS256'])
        except (jwt.exceptions.ExpiredSignatureError,
                jwt.exceptions.InvalidSignatureError,
                jwt.exceptions.DecodeError) as e:
            # Token过期，或被人修改，那么签名验证也会失败
            return None
        return User.query.get(payload.get('user_id'))









    def generate_confirm_jwt(self, expires_in=3600):
        '''生成确认账户的 JWT'''
        now = datetime.utcnow()
        payload = {
            'confirm': self.id,
            'exp': now + timedelta(seconds=expires_in),
            'iat': now
        }
        return jwt.encode(
            payload,
            current_app.config['SECRET_KEY'],
            algorithm='HS256').decode('utf-8')

    def verify_confirm_jwt(self, token):
        '''用户点击确认邮件中的URL后，需要检验 JWT，如果检验通过，则把新添加的 confirmed 属性设为 True'''
        try:
            payload = jwt.decode(
                token,
                current_app.config['SECRET_KEY'],
                algorithms=['HS256'])
        except (jwt.exceptions.ExpiredSignatureError,
                jwt.exceptions.InvalidSignatureError,
                jwt.exceptions.DecodeError) as e:
            # Token过期，或被人修改，那么签名验证也会失败
            return False
        if payload.get('confirm') != self.id:
            return False
        self.confirmed = True
        db.session.add(self)
        return True

    def generate_reset_password_jwt(self, expires_in=3600):
        '''生成重置账户密码的 JWT'''
        now = datetime.utcnow()
        payload = {
            'reset_password': self.id,
            'exp': now + timedelta(seconds=expires_in),
            'iat': now
        }
        return jwt.encode(
            payload,
            current_app.config['SECRET_KEY'],
            algorithm='HS256').decode('utf-8')

    @staticmethod
    def verify_reset_password_jwt(token):
        '''用户点击重置密码邮件中的URL后，需要检验 JWT
        如果检验通过，则返回 JWT 中存储的 id 所对应的用户实例'''
        try:
            payload = jwt.decode(
                token,
                current_app.config['SECRET_KEY'],
                algorithms=['HS256'])
        except (jwt.exceptions.ExpiredSignatureError,
                jwt.exceptions.InvalidSignatureError,
                jwt.exceptions.DecodeError) as e:
            # Token过期，或被人修改，那么签名验证也会失败
            return None
        return User.query.get(payload.get('reset_password'))


    def is_administrator(self):
        '''检查用户是否为管理员'''
        return self.role.slug == 'administrator'

    # def get_task_in_progress(self, name):
    #     '''检查指定任务名的RQ任务是否还在运行中'''
    #     return Task.query.filter_by(name=name, user=self, complete=False).first()
    #
    # def launch_task(self, name, description, *args, **kwargs):
    #     '''用户启动一个新的后台任务'''
    #     rq_job = current_app.task_queue.enqueue('app.utils.tasks.' + name, *args, **kwargs)
    #     task = Task(id=rq_job.get_id(), name=name, description=description, user=self)
    #     db.session.add(task)
    #     db.session.commit()
    #     return task
    #
    # def get_tasks_in_progress(self):
    #     '''返回用户所有正在运行中的后台任务'''
    #     return Task.query.filter_by(user=self, complete=False).all()

    def __repr__(self):
        return '<User {}>'.format(self.username)



class PatientBasicInformation(SearchableMixin, PaginatedAPIMixin, db.Model):
    '''
    样本来源的病人基础信息表
    '''
    __tablename__ = 'patients'
    # __searchable__ = ['',]

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255),comment='病人姓名',nullable=True)
    case_number = db.Column(db.String(255),comment='病历号')
    sex = db.Column(db.String(255),comment='性别',nullable=True)
    date = db.Column(db.Date,comment='出生日期',nullable=True)
    address = db.Column(db.String(255),comment='家庭住址')
    sample_origin = db.Column(db.String(255), comment='样品来源')
    phone = db.Column(db.String(255), comment='联系方式')
    timestamp = db.Column(db.DateTime, index=True, default=datetime.utcnow)
    # 反向引用，直接查询出当前病人的病史; 同时，DiseaseInformation实例中会有 patient_name 属性
    # cascade 用于级联删除，病人时，该patient下面的所有diseases_history都会被级联删除
    diseases_history = db.relationship('DiseaseInformation', backref='patient_info', lazy='dynamic',
                            cascade='all, delete-orphan')

    deleted = db.Column(db.Boolean,default=False)




    def __repr__(self):
        return '<Patient {}>'.format(self.name)

    def to_dict(self):
        data = {
            'id': self.id,
            'name': self.name,
            'case_number': self.case_number,
            'sex': self.sex,
            'date': self.date,
            'address': self.address,
            'sample_origin':self.sample_origin,
            '_links': {
                'self': url_for('api.get_patient_diseases', id=self.id)
            }
        }
        return data

    def from_dict(self,data,trans=False):
        column_list = ['name', 'case_number', 'sex', 'date', 'address','sample_origin']
        if trans:
            column_list = {'病历号': 'case_number', '姓名': 'name', '性别': 'sex','出生日期':'date','家庭住址':'address','样品来源':'sample_origin'}
        for field in column_list:
            if not trans and field in data:
                if field in ['timestamp', 'collected_date','date']:
                    data[field] = transfor_dateformat(str(data[field]))
                if not data.get('id',0):
                    continue
                setattr(self, field, data[field])
            elif trans and field in data:
                if column_list[field] in ['timestamp', 'collected_date','date']:
                        data[field] = transfor_dateformat(str(data[field]))
                setattr(self, column_list[field], data[field])



class DiseaseInformation(SearchableMixin, PaginatedAPIMixin, db.Model):
    '''样本疾病信息表'''
    __tablename__ = 'diseases'
    id = db.Column(db.Integer, primary_key=True)
    age = db.Column(db.Integer, comment='就诊年龄')
    pathological_information = db.Column(db.Text,comment='病理完整信息')
    process = db.Column(db.Text,comment='进展')
    Typing = db.Column(db.String(255),comment='分型')
    Class = db.Column(db.String(255),comment='分级')
    pathological_immunohistochemistry = db.Column(db.Text,comment='病理免疫组化')
    tnm = db.Column(db.Text,comment='TNM')
    period = db.Column(db.String(255),comment='分期')
    Subtype = db.Column(db.String(255),comment='亚型/部位')
    operationed = db.Column(db.String(255),comment='术前术后')
    collected_date = db.Column(db.Date,comment='抽血日期')
    operation_date = db.Column(db.Date,comment='手术日期')
    preoperative_tumor_treatment = db.Column(db.Text,comment='术前肿瘤治疗情况（射频、TACE等）')
    Chief_complaint = db.Column(db.String(255),comment='主诉')
    drinking = db.Column(db.String(255),comment='饮酒（包括频度、种类、量）')
    hypertension = db.Column(db.String(255),comment='高血压')
    diabetes = db.Column(db.String(255),comment='糖尿病')
    smoking = db.Column(db.String(255),comment='吸烟史')
    history_of_cancer = db.Column(db.Text,comment='既往肿瘤病史(若有，注明肿瘤类型)')
    systemic_diseases = db.Column(db.Text,comment='系统疾病')
    family_history = db.Column(db.Text,comment='家族史')
    antiviral_therapy = db.Column(db.Text,comment='抗病毒治疗')
    blood_lipids  = db.Column(db.Text,comment='高血脂(TC、TG、LDL-C、HDL-C)')
    biochemical_indicators = db.Column(db.Text,comment='生化指标')
    lymphocyte = db.Column(db.String(255),comment='淋巴细胞')
    Neutrophils = db.Column(db.String(255),comment='中性粒细胞')
    after_AEP = db.Column(db.String(255),comment='术前AFP')
    after_CEA = db.Column(db.String(255),comment='术前CEA')
    after_CA19_9 = db.Column(db.String(255),comment='术前CA19-9')
    HBV_DNA = db.Column(db.String(255),comment='HBV-DNA')
    hepatitis_B_surface_antigen = db.Column(db.String(255),comment='乙肝表面抗原')
    surface_antibody = db.Column(db.String(255),comment='表面抗体')
    E_antigen = db.Column(db.String(255),comment='e抗原')
    E_antibody = db.Column(db.String(255),comment='e抗体')
    core_antibody = db.Column(db.String(255),comment='核心抗体')
    hcv = db.Column(db.String(255),comment='丙肝')
    HCV_Ab = db.Column(db.String(255),comment='HCV-Ab')
    HCV_RNA = db.Column(db.String(255),comment='HCV-RNA')
    thyroid = db.Column(db.String(255),comment='甲状腺+')
    total_bilirubin = db.Column(db.String(255),comment='总胆红素')
    albumin = db.Column(db.String(255),comment='白蛋白')
    prothrombin_time = db.Column(db.String(255),comment='凝血酶原时间')
    hepatic_encephalopathy = db.Column(db.String(255),comment='肝性脑病')
    ascites = db.Column(db.Text,comment='腹水')
    Child_Pugh = db.Column(db.String(255),comment='Child-Pugh')
    Postoperative_chemotherapy = db.Column(db.Text,comment='术后化疗')
    Recurrence_time = db.Column(db.String(255),comment='发现复发时间')
    Targeted_drug_therapy = db.Column(db.Text,comment='靶向药物治疗（注明药物）')
    internal = db.Column(db.Text,comment='体内放疗（放射性粒子植入）')
    Radiofrequency_therapy = db.Column(db.String(255),comment='射频治疗')
    surgical_treatment = db.Column(db.String(255),comment='手术治疗')
    Time_of_death = db.Column(db.String(255),comment='死亡时间')
    Postoperative_abnormalities = db.Column(db.String(255),comment='术后异常')
    survival_time = db.Column(db.String(255),comment='存活时间（M）')
    Preoperative_colonoscopy = db.Column(db.Text,comment='术前肠镜')
    Colonoscopy_pathology = db.Column(db.Text,comment='肠镜病理')
    Liver_metastasis = db.Column(db.Text,comment='肝转移')
    number = db.Column(db.String(255),comment='个数')
    max_diameter = db.Column(db.String(255),comment='最大径（最大径和）（mm）')
    diameter = db.Column(db.String(255),comment='大小（mm）')
    sub_stove = db.Column(db.Text,comment='子灶')
    Macroscopic_tumor_thrombus = db.Column(db.Text,comment='肉眼癌栓')
    Location_of_tumor_thrombus = db.Column(db.Text,comment='癌栓位置')
    envelope = db.Column(db.String(255),comment='包膜')
    necrosis = db.Column(db.String(255),comment='坏死')
    Extrahepatic_nvasion = db.Column(db.Text,comment='肝外侵犯（写明部位）')
    Capsule_breakthrough = db.Column(db.Text,comment='镜下包膜有无突破')
    Multifocal_growth_under_microscope = db.Column(db.String(255),comment='镜下多灶性生长')
    Mirror_sub_stove = db.Column(db.String(255),comment='镜下子灶')
    Microvascular_tumor_thrombus = db.Column(db.String(255),comment='微血管癌栓')
    cirrhosis = db.Column(db.Text,comment='肝硬化')
    hepatitis = db.Column(db.Text,comment='肝炎')
    BCLC = db.Column(db.String(255),comment='BCLC')
    UICC = db.Column(db.String(255),comment='UICC')
    Postoperative_TACE = db.Column(db.String(255),comment='术后TACE（注明治疗次数）')
    Antiviral_therapy_after_operation = db.Column(db.Text,comment='术后抗病毒治疗（注明药物）')
    PSA = db.Column(db.String(255),comment='PSA')
    Lauren_classification = db.Column(db.String(255),comment='Lauren分类')
    remarks = db.Column(db.Text,comment='备注')
    timestamp = db.Column(db.DateTime, index=True, default=datetime.utcnow)
    deleted = db.Column(db.Boolean, default=False)

    patient_id = db.Column(db.Integer, db.ForeignKey('patients.id'))

    sequences = db.relationship('SampleSequence', backref='disease_info', lazy='dynamic')

    def __repr__(self):
        return '<Disease {}>'.format(self.disease_type)

    def to_dict(self):
        data = {
            'id': self.id,
            'age': self.age,
            'pathological_information': self.pathological_information,
            'process': self.process,
            'Typing': self.Typing,
            'Class': self.Class,
            'pathological_immunohistochemistry': self.pathological_immunohistochemistry,
            'tnm': self.tnm,
            'period': self.period,
            'Subtype': self.Subtype,
            'operationed': self.operationed,
            'collected_date': self.collected_date,
            'operation_date': self.operation_date,
            'preoperative_tumor_treatment': self.preoperative_tumor_treatment,
            'drinking': self.drinking,
            'Chief_complaint': self.Chief_complaint,
            'hypertension': self.hypertension,
            'diabetes': self.diabetes,
            'smoking': self.smoking,
            'history_of_cancer': self.history_of_cancer,
            'systemic_diseases': self.systemic_diseases,
            'family_history': self.family_history,
            'antiviral_therapy': self.antiviral_therapy,
            'blood_lipids ': self.blood_lipids,
            'biochemical_indicators': self.biochemical_indicators,
            'lymphocyte': self.lymphocyte,
            'Neutrophils': self.Neutrophils,
            'after_AEP': self.after_AEP,
            'after_CEA': self.after_CEA,
            'after_CA19_9': self.after_CA19_9,
            'HBV_DNA': self.HBV_DNA,
            'hepatitis_B_surface_antigen': self.hepatitis_B_surface_antigen,
            'surface_antibody': self.surface_antibody,
            'E_antigen': self.E_antigen,
            'E_antibody': self.E_antibody,
            'core_antibody': self.core_antibody,
            'hcv': self.hcv,
            'HCV_Ab': self.HCV_Ab,
            'HCV_RNA': self.HCV_RNA,
            'thyroid': self.thyroid,
            'total_bilirubin': self.total_bilirubin,
            'albumin': self.albumin,
            'prothrombin_time': self.prothrombin_time,
            'hepatic_encephalopathy': self.hepatic_encephalopathy,
            'ascites': self.ascites,
            'Child_Pugh': self.Child_Pugh,
            'Postoperative_chemotherapy': self.Postoperative_chemotherapy,
            'Recurrence_time': self.Recurrence_time,
            'Targeted_drug_therapy': self.Targeted_drug_therapy,
            'internal': self.internal,
            'Radiofrequency_therapy': self.Radiofrequency_therapy,
            'surgical_treatment': self.surgical_treatment,
            'Time_of_death': self.Time_of_death,
            'Postoperative_abnormalities': self.Postoperative_abnormalities,
            'survival_time': self.survival_time,
            'Preoperative_colonoscopy': self.Preoperative_colonoscopy,
            'Colonoscopy_pathology': self.Colonoscopy_pathology,
            'Liver_metastasis': self.Liver_metastasis,
            'number': self.number,
            'max_diameter': self.max_diameter,
            'diameter': self.diameter,
            'sub_stove': self.sub_stove,
            'Macroscopic_tumor_thrombus': self.Macroscopic_tumor_thrombus,
            'Location_of_tumor_thrombus': self.Location_of_tumor_thrombus,
            'envelope': self.envelope,
            'necrosis': self.necrosis,
            'Extrahepatic_nvasion': self.Extrahepatic_nvasion,
            'Capsule_breakthrough': self.Capsule_breakthrough,
            'Multifocal_growth_under_microscope': self.Multifocal_growth_under_microscope,
            'Mirror_sub_stove': self.Mirror_sub_stove,
            'Microvascular_tumor_thrombus': self.Microvascular_tumor_thrombus,
            'cirrhosis': self.cirrhosis,
            'hepatitis': self.hepatitis,
            'BCLC': self.BCLC,
            'UICC': self.UICC,
            'Postoperative_TACE': self.Postoperative_TACE,
            'Antiviral_therapy_after_operation': self.Antiviral_therapy_after_operation,
            'PSA': self.PSA,
            'Lauren_classification': self.Lauren_classification,
            'remarks': self.remarks,
            'deleted': self.deleted,
            'patient_id': self.patient_id,
            'timestamp':self.timestamp,
            'sequences': [sequence.sequence_id for sequence in self.sequences],
            '_links': {
                'self': url_for('api.get_role', id=self.id)
            }
        }
        return data

    def from_dict(self, data,trans=False):
        column_list = ['id','age','pathological_information','process','Typing','Class','pathological_immunohistochemistry','tnm','period','period','operationed','collected_date','operation_date','preoperative_tumor_treatment','Chief_complaint','drinking','hypertension','diabetes','smoking','history_of_cancer','systemic_diseases','family_history','antiviral_therapy','blood_lipids ','biochemical_indicators','lymphocyte','Neutrophils','after_AEP','after_CEA','after_CA19_9','HBV_DNA','hepatitis_B_surface_antigen','surface_antibody','E_antigen','E_antibody','core_antibody','hcv','HCV_Ab','HCV_RNA','thyroid','total_bilirubin','albumin','prothrombin_time','hepatic_encephalopathy','ascites','Child_Pugh','Postoperative_chemotherapy','Recurrence_time','Targeted_drug_therapy','internal','Radiofrequency_therapy','surgical_treatment','Time_of_death','Postoperative_abnormalities','survival_time','Preoperative_colonoscopy','Colonoscopy_pathology','Liver_metastasis','number','max_diameter','diameter','sub_stove','Macroscopic_tumor_thrombus','Location_of_tumor_thrombus','envelope','necrosis','Extrahepatic_nvasion','Capsule_breakthrough','Multifocal_growth_under_microscope','Mirror_sub_stove','Microvascular_tumor_thrombus','cirrhosis','hepatitis','BCLC','UICC','Postoperative_TACE','Antiviral_therapy_after_operation','PSA','Lauren_classification','remarks','treatment','timestamp','deleted',]
        if trans:
            column_list = {
                '就诊年龄': 'age',
                '病理完整信息': 'pathological_information',
                '进展': 'process',
                '分型': 'Typing',
                '分级': 'Class',
                '病理免疫组化': 'pathological_immunohistochemistry',
                'TNM': 'tnm',
                '分期': 'period',
                '亚型/部位': 'Subtype',
                '术前术后': 'operationed',
                '抽血日期': 'collected_date',
                '手术日期': 'operation_date',
                '术前肿瘤治疗情况（射频、TACE等）': 'preoperative_tumor_treatment',
                '主诉': 'Chief_complaint',
                '饮酒（包括频度、种类、量）': 'drinking',
                '高血压': 'hypertension',
                '糖尿病': 'diabetes',
                '吸烟史': 'smoking',
                '既往肿瘤病史(若有，注明肿瘤类型)': 'history_of_cancer',
                '系统疾病': 'systemic_diseases',
                '家族史': 'family_history',
                '抗病毒治疗': 'antiviral_therapy',
                '高血脂(TC、TG、LDL-C、HDL-C)': 'blood_lipids ',
                '生化指标': 'biochemical_indicators',
                '淋巴细胞': 'lymphocyte',
                '中性粒细胞': 'Neutrophils',
                '术前AFP': 'after_AEP',
                '术前CEA': 'after_CEA',
                '术前CA19-9': 'after_CA19_9',
                'HBV-DNA': 'HBV_DNA',
                '乙肝表面抗原': 'hepatitis_B_surface_antigen',
                '表面抗体': 'surface_antibody',
                'e抗原': 'E_antigen',
                'e抗体': 'E_antibody',
                '核心抗体': 'core_antibody',
                '丙肝': 'hcv',
                'HCV-Ab': 'HCV_Ab',
                'HCV-RNA': 'HCV_RNA',
                '甲状腺+': 'thyroid',
                '总胆红素': 'total_bilirubin',
                '白蛋白': 'albumin',
                '凝血酶原时间': 'prothrombin_time',
                '肝性脑病': 'hepatic_encephalopathy',
                '腹水': 'ascites',
                'Child-Pugh': 'Child_Pugh',
                '术后化疗': 'Postoperative_chemotherapy',
                '发现复发时间': 'Recurrence_time',
                '靶向药物治疗（注明药物）': 'Targeted_drug_therapy',
                '体内放疗（放射性粒子植入）': 'internal',
                '射频治疗': 'Radiofrequency_therapy',
                '手术治疗': 'surgical_treatment',
                '死亡时间': 'Time_of_death',
                '术后异常': 'Postoperative_abnormalities',
                '存活时间（M）': 'survival_time',
                '术前肠镜': 'Preoperative_colonoscopy',
                '肠镜病理': 'Colonoscopy_pathology',
                '肝转移': 'Liver_metastasis',
                '个数': 'number',
                '最大径（最大径和）（mm）': 'max_diameter',
                '大小（mm）': 'diameter',
                '子灶': 'sub_stove',
                '肉眼癌栓': 'Macroscopic_tumor_thrombus',
                '癌栓位置': 'Location_of_tumor_thrombus',
                '包膜': 'envelope',
                '坏死': 'necrosis',
                '肝外侵犯（写明部位）': 'Extrahepatic_nvasion',
                '镜下包膜有无突破': 'Capsule_breakthrough',
                '镜下多灶性生长': 'Multifocal_growth_under_microscope',
                '镜下子灶': 'Mirror_sub_stove',
                '微血管癌栓': 'Microvascular_tumor_thrombus',
                '肝硬化': 'cirrhosis',
                '肝炎': 'hepatitis',
                'BCLC': 'BCLC',
                'UICC': 'UICC',
                '术后TACE（注明治疗次数）': 'Postoperative_TACE',
                '术后抗病毒治疗（注明药物）': 'Antiviral_therapy_after_operation',
                'PSA': 'PSA',
                'Lauren分类': 'Lauren_classification',
                '备注': 'remarks',
            }
        for field in column_list:
            if not trans and field in data:
                if field in ['timestamp', 'collected_date','Time_of_death','operation_date','prothrombin_time','Recurrence_time','survival_time']:
                    data[field] = transfor_dateformat(str(data[field]))
                if not data.get('id',0):
                    continue
                setattr(self, field, data[field])
            elif trans and field in data:
                if column_list[field] in ['timestamp', 'collected_date','Time_of_death','operation_date','prothrombin_time','Recurrence_time','survival_time']:
                    data[field] = transfor_dateformat(str(data[field]))
                setattr(self, column_list[field], data[field])





from app.utils.sql_json import to_json



class SampleSequence(SearchableMixin, PaginatedAPIMixin, db.Model):
    '''
    测序批次记录表
    '''
    __tablename__ = 'sequence'
    __searchable__ = [('title', True), ('summary', True), ('body', False)]
    sequence_id = db.Column(db.Integer, primary_key=True)
    # batch = db.Column(db.String(255),comment='测序批次')
    disease_type = db.Column(db.String(255), comment='疾病类型')
    sample_id = db.Column(db.String(255),comment='样本id')
    gao_lab_id = db.Column(db.String(255),comment='gao_lab_id')
    introduction = db.Column(db.Text)
    sample_origin = db.Column(db.String(255),comment='样品来源')
    collected_date = db.Column(db.DATE,comment='采样日期')
    blood_date = db.Column(db.DATE,comment='抽血日期')
    special_operation = db.Column(db.String(255),comment='实验特殊操作备注（样本过滤、浓缩、建库…)')
    timestamp = db.Column(db.DateTime, index=True, default=datetime.utcnow)
    deleted = db.Column(db.Boolean, default=False)

    author_id = db.Column(db.Integer, db.ForeignKey('users.id'),comment='录入人id')

    results = db.relationship('SequenceResult', backref='sequence', lazy='dynamic')

    disease_id = db.Column(db.Integer, db.ForeignKey('diseases.id'),comment='疾病详细信息id')

    def __repr__(self):
        return '<Squence {}>'.format(self.sequence_id)

    @staticmethod
    def on_changed_body(target, value, oldvalue, initiator):
        '''
        target: 有监听事件发生的 Post 实例对象
        value: 监听哪个字段的变化
        '''
        #todo
        # print('666',target,value)
        # if not target.introduction:  # 如果前端不填写摘要，是空str，而不是None
        #     target.introduction = value[:200] + '  ... ...'  # 截取 body 字段的前200个字符给 summary
        pass

    @property
    def serialize(self):
        return to_json(self, self.__class__)

    def to_dict(self):
        data = {
            'sequence_id': self.sequence_id,
            'sample_id': self.sample_id,
            'gao_lab_id': self.gao_lab_id,
            'introduction': self.introduction,
            'sample_origin': self.sample_origin,
            'collected_date': self.collected_date,
            'timestamp': self.timestamp,
            'author_id': self.author_id,
            'disease_id': self.disease_id,
            # 'result_id': [result.id for result in self.results],
            'disease_type':self.disease_type,
            'results':{},
            'author': {},
            'disease':{},
            '_links': {
                'self': url_for('api.get_sequence', id=self.sequence_id),  #获取详情 TODO
            }
        }
        return data

    def from_dict(self, data,trans=False):
        column_list = ['disease_type','special_operation','sequence_id', 'id', 'gao_lab_id', 'introduction','sample_origin','collected_date','timestamp','author_id','disease_id']

        if trans:
            column_list = {'实验特殊操作备注（样本过滤、浓缩、建库…)':'special_operation',
                           'Sequence ID': 'sequence_id',
                           'ID': 'sample_id',
                           'id': 'sample_id',
                           'SampleID':'sample_id',
                           'Gao lab ID': 'gao_lab_id',
                           'Introduction': 'introduction',
                           '样品来源': 'sample_origin',
                           '疾病类型':'disease_type',
                           '抽血日期': 'blood_date',
                           '采样日期': 'collected_date',
                           '收样日期': 'collected_date'}
        for field in column_list:
            if not trans and field in data:
                if field in ['timestamp','collected_date']:
                    data[field] = transfor_dateformat(str(data[field]))
                if not data.get('id',0):
                    continue
                setattr(self, field, data[field])
            elif trans and field in data:
                if column_list[field] in ['collected_date','blood_date']:
                    data[field] = transfor_dateformat(str(data[field]))
                # print(data[field])
                setattr(self, column_list[field], data[field])

    def to_chart_origin(self):
        pass


    # def is_liked_by(self, user):
    #     '''判断用户 user 是否已经收藏过该文章'''
    #     return user in self.likers
    #
    # def liked_by(self, user):
    #     '''收藏'''
    #     if not self.is_liked_by(user):
    #         self.likers.append(user)
    #
    # def unliked_by(self, user):
    #     '''取消收藏'''
    #     if self.is_liked_by(user):
    #         self.likers.remove(user)


db.event.listen(SampleSequence.introduction, 'set', SampleSequence.on_changed_body)  # body 字段有变化时，执行 on_changed_body() 方法
db.event.listen(SampleSequence, 'after_insert', SampleSequence.receive_after_insert)
db.event.listen(SampleSequence, 'after_delete', SampleSequence.receive_after_delete)


class SequenceResult(SearchableMixin, PaginatedAPIMixin, db.Model):
    __tablename__ = 'results'

    id = db.Column(db.Integer,primary_key=True,comment='测序结果id')
    batch = db.Column(db.String(255), comment='测序批次')
    name_1 = db.Column(db.String(255),comment='name-1')
    data_quality_input = db.Column(db.Float,comment='')
    data_quality_bam = db.Column(db.Float,comment='')
    data_quality_bam_input = db.Column(db.Float,comment='')
    data_Quality_uniq_bam = db.Column(db.Float,comment='')
    data_Quality_uniq_nodup_bam = db.Column(db.Float,comment='')
    data_Quality_uniq_nodup_bam_input = db.Column(db.Float,comment='')
    coverage = db.Column(db.Float,comment='')
    timestamp = db.Column(db.DateTime, index=True, default=datetime.utcnow)
    deleted = db.Column(db.Boolean, default=False)

    sequence_id = db.Column(db.Integer, db.ForeignKey('sequence.sequence_id'), comment='测序id')


    def __repr__(self):
        return '<Results {}>'.format(self.id)


    def to_dict(self):
        data = {
            'id': self.id,
            'batch':self.batch,
            'name_1': self.name_1,
            'data_quality_input': self.data_quality_input,
            'data_quality_bam': self.data_quality_bam,
            'data_quality_bam_input': self.data_quality_bam_input,
            'data_Quality_uniq_bam': self.data_Quality_uniq_bam,
            'data_Quality_uniq_nodup_bam': self.data_Quality_uniq_nodup_bam,
            'data_Quality_uniq_nodup_bam_input': self.data_Quality_uniq_nodup_bam_input,
            'coverage': self.coverage,
            'sequence_id': self.sequence_id,
            '_links': {
                'self': url_for('api.get_role', id=self.id)
            }
        }
        return data

    def from_dict(self,data,trans=False):
        column_list = ['batch','name_1', 'data_quality_input', 'data_quality_bam', 'data_quality_bam_input', 'data_Quality_uniq_bam','data_Quality_uniq_nodup_bam','data_Quality_uniq_nodup_bam_input','coverage','sequence_id']
        if trans:
            column_list = {'Sequence ID': 'sequence_id',
                           '测序批次': 'batch',
                           'name-1': 'name_1',
                           'NAME': 'name_1',
                           'Data Quality-Input': 'data_quality_input',
                           'Input': 'data_quality_input',
                           'Data Quality-bam': 'data_quality_bam',
                           'bam': 'data_quality_bam',
                           'Data Quality-bam/Input': 'data_quality_bam_input',
                           'bam/Input': 'data_quality_bam_input',
                           'Data Quality-uniq.bam': 'data_Quality_uniq_bam',
                           'uniq.bam': 'data_Quality_uniq_bam',
                           'Data Quality-uniq_nodup.bam': 'data_Quality_uniq_nodup_bam',
                           'uniq.nodup.bam': 'data_Quality_uniq_nodup_bam',
                           'Data Quality-uniq_nodup.bam/Input': 'data_Quality_uniq_nodup_bam_input',
                           'uniq.nodup.bam/Input': 'data_Quality_uniq_nodup_bam_input',
                           'Coverage':'coverage',
                           'coverage':'coverage'}
        for field in column_list:
            if not trans and field in data:
                # if field in ['timestamp', 'collected_date']:
                    # data[field] = datetime.strptime(str(data[field])[:-5], '%Y-%m-%dT%H:%M:%S')
                if not data.get('id',0):
                    continue
                setattr(self, field, data[field])
            elif trans and field in data:
                # if column_list[field] in ['timestamp', 'collected_date']:
                #     data[field] = datetime.strptime(str(data[field])[:-5], '%Y-%m-%dT%H:%M:%S')
                if data[field] == '.':
                    data[field] = None
                setattr(self, column_list[field], data[field])

#
#
#
#
#
#
#
#
#
# class Task(PaginatedAPIMixin, db.Model):
#     __tablename__ = 'tasks'
#     # 不使用默认的整数主键，而是用 RQ 为每个任务生成的字符串ID
#     id = db.Column(db.String(36), primary_key=True)
#     # 任务名
#     name = db.Column(db.String(128), index=True)
#     # 任务描述
#     description = db.Column(db.String(128))
#     # 任务所属的用户
#     user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
#     # 是否已执行完成
#     complete = db.Column(db.Boolean, default=False)
#
#     def get_progress(self):
#         '''返回Task对象实时的进度'''
#         try:
#             # 通过Task.id，返回RQ job实例
#             rq_job = current_app.task_queue.fetch_job(self.id)
#         except Exception:
#             rq_job = None
#         return rq_job.meta.get('progress', 0) if rq_job is not None else 100
#
#     def to_dict(self):
#         data = {
#             'id': self.id,
#             'name': self.name,
#             'description': self.description,
#             'progress': self.get_progress(),
#             'complete': self.complete,
#             '_links': {
#                 'user_url': url_for('api.get_user', id=self.user.id)
#             }
#         }
#         return data
#
#     def __repr__(self):
#         return '<Task {}>'.format(self.id)
