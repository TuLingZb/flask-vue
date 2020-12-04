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
            'administrator': ('管理员',),
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
    # 反向引用，直接查询出当前用户的所有博客文章; 同时，Post实例中会有 author 属性
    # cascade 用于级联删除，当删除user时，该user下面的所有posts都会被级联删除
    samples = db.relationship('Sample', backref='author', lazy='dynamic',)
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
        digest = md5(self.email.lower().encode('utf-8')).hexdigest()
        return 'https://www.gravatar.com/avatar/{}?d=identicon&s={}'.format(digest, size)

    def to_dict(self, include_email=False):
        data = {
            'id': self.id,
            'username': self.username,
            'name': self.name,
            'location': self.location,
            'about_me': self.about_me,
            'member_since': self.member_since.isoformat() + 'Z',
            'last_seen': self.last_seen.isoformat() + 'Z',
            # 'posts_count': self.posts.count(),
            'confirmed': self.confirmed,
            'role_id': self.role_id,
            'role_name': Role.query.get_or_404(self.role_id).name,
            '_links': {
                'self': url_for('api.get_user', id=self.id),
                'avatar': self.avatar(128),
                # 'followeds': url_for('api.get_followeds', id=self.id),
                # 'followers': url_for('api.get_followers', id=self.id),
                # 'posts': url_for('api.get_user_posts', id=self.id),
                # 'followeds_posts': url_for('api.get_user_followeds_posts', id=self.id),
                # 'comments': url_for('api.get_user_comments', id=self.id),
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
                    self.role = Role.query.filter_by(slug='administrator').first()
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


class Sample(SearchableMixin, PaginatedAPIMixin, db.Model):
    __tablename__ = 'posts'
    __searchable__ = [('title', True), ('summary', True), ('body', False)]
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255))
    summary = db.Column(db.Text)
    body = db.Column(db.Text)
    timestamp = db.Column(db.DateTime, index=True, default=datetime.utcnow)
    views = db.Column(db.Integer, default=0)
    # 外键, 直接操纵数据库当user下面有posts时不允许删除user，下面仅仅是 ORM-level “delete” cascade
    # db.ForeignKey('users.id', ondelete='CASCADE') 会同时在数据库中指定 FOREIGN KEY level “ON DELETE” cascade
    author_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    comments = db.relationship('Comment', backref='post', lazy='dynamic',
                               cascade='all, delete-orphan')
    # 博客文章与喜欢/收藏它的人是多对多关系
    likers = db.relationship('User', secondary=posts_likes, backref=db.backref('liked_posts', lazy='dynamic'), lazy='dynamic')

    def __repr__(self):
        return '<Post {}>'.format(self.title)

    @staticmethod
    def on_changed_body(target, value, oldvalue, initiator):
        '''
        target: 有监听事件发生的 Post 实例对象
        value: 监听哪个字段的变化
        '''
        if not target.summary:  # 如果前端不填写摘要，是空str，而不是None
            target.summary = value[:200] + '  ... ...'  # 截取 body 字段的前200个字符给 summary

    def to_dict(self):
        data = {
            'id': self.id,
            'title': self.title,
            'summary': self.summary,
            'body': self.body,
            'timestamp': self.timestamp,
            'views': self.views,
            'likers_id': [user.id for user in self.likers],
            'likers': [
                {
                    'id': user.id,
                    'username': user.username,
                    'name': user.name,
                    'avatar': user.avatar(128)
                } for user in self.likers
            ],
            'author': {
                'id': self.author.id,
                'username': self.author.username,
                'name': self.author.name,
                'avatar': self.author.avatar(128)
            },
            'likers_count': self.likers.count(),
            'comments_count': self.comments.count(),
            '_links': {
                'self': url_for('api.get_post', id=self.id),
                'author_url': url_for('api.get_user', id=self.author_id),
                'comments': url_for('api.get_post_comments', id=self.id)
            }
        }
        return data

    def from_dict(self, data):
        for field in ['title', 'summary', 'body', 'timestamp', 'views']:
            if field in data:
                setattr(self, field, data[field])

    def is_liked_by(self, user):
        '''判断用户 user 是否已经收藏过该文章'''
        return user in self.likers

    def liked_by(self, user):
        '''收藏'''
        if not self.is_liked_by(user):
            self.likers.append(user)

    def unliked_by(self, user):
        '''取消收藏'''
        if self.is_liked_by(user):
            self.likers.remove(user)


db.event.listen(Post.body, 'set', Post.on_changed_body)  # body 字段有变化时，执行 on_changed_body() 方法
db.event.listen(Post, 'after_insert', Post.receive_after_insert)
db.event.listen(Post, 'after_delete', Post.receive_after_delete)

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
