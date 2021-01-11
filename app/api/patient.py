from flask import request, jsonify, url_for, g, current_app
from app.api import bp
from app.api.auth import token_auth
from app.api.errors import error_response, bad_request
from app.extensions import db
from app.models import Permission,PatientBasicInformation,DiseaseInformation,SampleSequence
from app.utils.decorator import permission_required
from config import Config
from app.utils.my_response import restfulResponse
from sqlalchemy import and_
import json

@bp.route("/disease/upload", methods=["POST"])
@token_auth.login_required
def disease_file_upload():
    """样本信息文件导入"""
    # a = request.get_array(field_name='file')
    # print(a)
    #
    # # # 接收文件
    fileObj = request.files.get("file")
    if fileObj.filename.split(".")[-1] not in ["xlsx", "xls"]:
        return bad_request("文件格式不支持")

    # def category_init_func(row):
    #     sequence_id = row.get("Sequence ID", None)
    #     if not isinstance(sequence_id, int):
    #         print(row)
    #         return None
    #     post = SampleSequence.query.get(int(sequence_id)) or SampleSequence()
    #     post.from_dict(row, trans=True)
    #     return post

    # request.save_book_to_database(
    #     field_name="file",
    #     session=db.session,
    #     tables=[SampleSequence],
    #     initializers=[category_init_func],
    # )

    # d = request.get_dict(field_name='file')
    # r = request.get_records(field_name='file')
    # b = request.get_book_dict(field_name='file')
    b = request.get_book(field_name='file',)
    origin_list = (
        db.session.query(SampleSequence.disease_type, db.func.count("*").label("value"))
            .filter(
            and_(
                SampleSequence.disease_type != ".", SampleSequence.disease_type != None
            )
        )
            .group_by(SampleSequence.disease_type)
            .all()
    )
    disease_type_list = []
    for i in origin_list:
        disease_type_list.append(i[0])
    for i in b.sheet_names():
        # print(i) #获取工作表名称
        sheet_content = request.get_records(field_name='file',sheet_name=i,name_columns_by_row=0) #  name_columns_by_row指定一行作为表头
        with db.session.no_autoflush:
            for data in sheet_content:

                name = data.get('姓名', None)
                print(name)
                origin = data.get('样品来源', None)
                sequence_ids = []
                sequence_id = data.get('Sequence ID', None)
                if not sequence_id:
                    return bad_request("缺少测序id")
                if name and origin and name not in ['姓名','.']:
                    patient = PatientBasicInformation.query.filter(PatientBasicInformation.name == name).filter(
                        PatientBasicInformation.sample_origin == data['样品来源']).first()
                    if not patient:
                        patient = PatientBasicInformation()
                        patient.from_dict(data, trans=True)
                        db.session.add(patient)
                        db.session.flush()
                    else:
                        patient.from_dict(data, trans=True)
                else:
                    patient = None
                print(data,patient)
                disease_type = data.get('疾病类型')
                if disease_type not in disease_type_list:
                    print('疾病类型错误', data)
                    return bad_request(f"疾病类型错误,测序ID{sequence_id},请先导入相关测序表格")
                if not SampleSequence.query.get(sequence_id):
                    return bad_request("测序ID不存在,请先导入相关测序表格")
                else:
                    sequence = SampleSequence.query.get(sequence_id)
                if sequence.disease_info:
                    disease = sequence.disease_info
                    print('存在',sequence_id,disease)
                elif patient and patient.diseases_history.filter(DiseaseInformation.disease_type == disease_type).first():
                    disease = patient.diseases_history.filter(DiseaseInformation.disease_type == disease_type).first()
                else:
                    print("新建")
                    disease = DiseaseInformation()
                    disease.from_dict(data, trans=True)
                    db.session.add(disease)
                    db.session.flush()
                print('疾病id', disease.id)
                # db.session.add(sequence)
                sequence.disease_id = disease.id
                db.session.flush()
                if patient:
                    disease.patient_id = patient.id
            db.session.commit()
    return restfulResponse({})

    # if not os.path.exists(os.path.join(basedir,"user_file/" + str(g.current_user.username))):
    #     os.mkdir(os.path.join(basedir,"user_file/"+str(g.current_user.username)))
    # file_name = str(logger()).strip()+ fileObj.filename.strip()
    # fileObj.save(os.path.join(basedir,"user_file/"+str(g.current_user.username),file_name))

@bp.route('/disease/import', methods=['POST'])
@token_auth.login_required(role=Config.WRITE)
def excel_create_disease():
    '''excel导入样本疾病信息'''
    data = request.get_json()
    if not data:
        return bad_request('excel表内容为空')

    sample_data = data['data']
    # print(sample_data)
    n = 1
    sequence_ids = []
    origin_list = (
        db.session.query(SampleSequence.disease_type, db.func.count("*").label("value"))
            .filter(
            and_(
                SampleSequence.disease_type != ".", SampleSequence.disease_type != None
            )
        )
            .group_by(SampleSequence.disease_type)
            .all()
    )
    list = []
    for i in origin_list:
        list.append(i[0])
    print("疾病类型",list)
    with db.session.no_autoflush:
        for data in sample_data:
            # print(data)
            name = data.get('姓名',None)
            origin = data.get('样品来源',None)
            sequence_id = data.get('Sequence ID', None)
            if not sequence_id:
                return bad_request("缺少测序id")
            if not name or not origin or name == '姓名':
                return bad_request(f"缺少姓名或样本来源{sequence_id}")
            disease_type = data.get('疾病类型')
            if disease_type not in list:
                print('疾病类型错误',data)
                return bad_request(f"疾病类型错误{sequence_id}")
            patient = PatientBasicInformation.query.filter(PatientBasicInformation.name == name).filter(PatientBasicInformation.sample_origin == data['样品来源']).first() or PatientBasicInformation()
            patient.from_dict(data, trans=True)
            db.session.add(patient)
            db.session.flush()
            if not SampleSequence.query.get(sequence_id) and sequence_id not in sequence_ids:
                return bad_request("测序ID不存在")
            else:
                sequence = SampleSequence.query.get(sequence_id)
            if sequence.disease_info:
                disease = DiseaseInformation.query.filter(
                    DiseaseInformation.id == sequence.disease_info.id).first()
            elif patient.diseases_history.filter(DiseaseInformation.disease_type==disease_type).first():
                disease = patient.diseases_history.filter(DiseaseInformation.disease_type == disease_type).first()
            else:
                DiseaseInformation()
            # print('查找到的疾病信息', sequence.disease_info, disease, sequence_id, patient.id)
            disease.from_dict(data,trans=True)
            db.session.add(disease)
            print('疾病id',disease.id)
            db.session.add(sequence)
            db.session.flush()
            sequence.disease_id = disease.id
            db.session.flush()
            disease.patient_id = patient.id
            # if sequence.sequence_id == 'Sequence ID':
            #     print('id:',sequence.sequence_id)
            #     print(n, data)
        db.session.commit()
    response = restfulResponse("上传完成")
    response.headers['Access-Control-Allow-Origin'] = '*'
    return response

@bp.route('/patient/create', methods=['POST'])
@token_auth.login_required(role=Config.WRITE)
def create_post():
    '''添加新的病人基础信息'''
    data = request.get_json()
    print(data)
    if not data:
        return bad_request('You must post JSON data.')
    message = {}
    if 'name' not in data or not data.get('name').strip():
        message['name'] = 'name is required.'
    if 'date' not in data or not data.get('date').strip():
        message['date'] = 'date is required.'
    if 'sex' not in data or not data.get('sex').strip():
        message['sex'] = 'sex is required.'
    if len(data.get('address')) > 255:
        message['address'] = 'address must less than 255 characters.'
    if message:
        return bad_request(message)

    patient = PatientBasicInformation()
    patient.from_dict(data)
    db.session.add(patient)
    db.session.commit()
    response = restfulResponse(patient.to_dict())
    response.status_code = 201
    # HTTP协议要求201响应包含一个值为新资源URL的Location头部
    response.headers['Location'] = url_for('api.get_patients', id=patient.id)
    return response


@bp.route('/patient/list', methods=['GET'])
def get_patients():
    '''返回病人集合，分页'''
    page = request.args.get('page', 1, type=int)
    per_page = min(
        request.args.get(
            'limit', current_app.config['POSTS_PER_PAGE'], type=int), 100)
    queryMap = []

    queryMap.append(PatientBasicInformation.deleted == False)  # 非删除

    name = request.args.get('name', None)
    sex = request.args.get('sex', None)
    case_number = request.args.get('case_number', None)
    patient_id = request.args.get('patient_id', None)
    if name:
        queryMap.append(PatientBasicInformation.name == name)
    if sex:
        queryMap.append(PatientBasicInformation.sex == sex)
    if case_number:
        queryMap.append(PatientBasicInformation.case_number == case_number)
    if patient_id:
        queryMap.append(PatientBasicInformation.id == patient_id)

    querySort = PatientBasicInformation.timestamp.desc()
    sort = json.loads(request.args.get('sort', '{}'))
    if sort.get('name', None):
        if sort['name'] == "ascending":
            querySort = PatientBasicInformation.age.asc()
        elif sort['name'] == "descending":
            querySort = PatientBasicInformation.age.desc()
    if sort.get('id', None):
        if sort['id'] == "ascending":
            querySort = PatientBasicInformation.id.asc()
        elif sort['id'] == "descending":
            querySort = PatientBasicInformation.id.desc()
    data = PatientBasicInformation.to_collection_dict(
        PatientBasicInformation.query.filter(*queryMap).order_by(querySort), page, per_page,
        'api.get_patients')
    return restfulResponse(data)


@bp.route('/patient/detail', methods=['POST'])
@token_auth.login_required(role=Config.WRITE)
def get_patient():
    '''返回一个病人信息'''
    data = request.get_json()
    ids = data.get("ids", [])
    dises = PatientBasicInformation.query.filter(PatientBasicInformation.id.in_(ids)).order_by(PatientBasicInformation.id.asc()).all()
    data = {"items": [item.to_dict() for item in dises]}
    return restfulResponse(data)

@bp.route('/patient/info', methods=['POST'])
@token_auth.login_required(role=Config.WRITE)
def get_patient_info():
    '''返回一个病人信息'''
    data = request.get_json()
    patient_id = data.get("id", None)
    if not patient_id:
        return bad_request("病人ID为空")
    print("病人info",patient_id)
    patient = PatientBasicInformation.query.filter(PatientBasicInformation.id==patient_id).order_by(PatientBasicInformation.id.asc()).first()
    data = {"diseease_id": [item.id for item in patient.diseases_history],
            "patient_id":patient_id,}
    return restfulResponse(data)


@bp.route('/patient/update/', methods=['PUT'])
@token_auth.login_required(role=Config.WRITE)
def update_post():
    '''修改病人信息'''
    data = request.get_json()
    print('sa', data)
    if not data:
        return bad_request('You must post JSON data.')
    id = data.get('id', 0)
    post = PatientBasicInformation.query.get_or_404(id)
    # if g.current_user != post.author and not g.current_user.is_administrator():
    #     return error_response(403)

    message = {}
    if 'name' not in data or not data.get('name').strip():
        message['name'] = 'name is required.'
    # if 'date' not in data or not data.get('date').strip():
    #     message['date'] = 'date is required.'
    if 'sex' not in data or not data.get('sex').strip():
        message['sex'] = 'sex is required.'
    if len(data.get('address','')) > 1000:
        message['address'] = '地址信息太长了.'
    if message:
        return bad_request(message)


    post.from_dict(data)
    db.session.commit()
    return restfulResponse(post.to_dict())


@bp.route('/patient/delete/<int:id>', methods=['DELETE'])
@token_auth.login_required(role=Config.WRITE)
def delete_post(id):
    '''删除一位病人信息'''
    post = PatientBasicInformation.query.get(id)
    if not post:
        return bad_request("病人信息不存在")
    # if g.current_user != post.author and not g.current_user.is_administrator():
    #     return error_response(403)
    if post.diseases_history is not None:
        return bad_request('此病人还有关联信息尚未清除，不能删除')
    db.session.delete(post)
    db.session.commit()
    return restfulResponse({})


###
#病人病历相关
##im
import re

@bp.route('/disease/create', methods=['POST'])
@token_auth.login_required(role=Config.WRITE)
def create_disease():
    '''添加新的病人患病信息'''
    data = request.get_json()
    print('创建病信息',data)
    if not data:
        return bad_request('You must post JSON data.')

    # patient = PatientBasicInformation.query.get_or_404(id)
    # if not patient:
    #     return bad_request('该病人信息不存在')

    disease_info = DiseaseInformation()
    disease_info.from_dict(data)
    # disease_info.patient_id = id

    db.session.add(disease_info)
    db.session.flush()

    patient = data.get('patient',None)
    if patient:
        patient = re.match('\d+',patient).group()
    disease_info.patient_id = patient

    sequences = data.get('sequences',[])
    for sequence in sequences:
        sample = SampleSequence.query.get(sequence)
        if not sample:
            return bad_request(f"{sequence}测序id不存在")
        sample.disease_id = disease_info.id
    db.session.commit()
    response = restfulResponse(disease_info.to_dict())
    response.status_code = 201
    # HTTP协议要求201响应包含一个值为新资源URL的Location头部
    # response.headers['Location'] = url_for('api.get_patient_diseases', id=data.id)
    return response

@bp.route('/disease/list', methods=['GET'])
def get_patient_diseases():
    '''获取所有疾病信息'''
    page = request.args.get('page', 1, type=int)
    per_page = min(
        request.args.get(
            'limit', current_app.config['POSTS_PER_PAGE'], type=int), 100)
    queryMap = []
    queryMap.append(DiseaseInformation.deleted == False)  # 非删除
    sequence_id = request.args.get('sequence_id', None)  # 疾病类型
    disease_type = request.args.get('disease_type', None)  # 疾病类型
    if sequence_id:
        sample = SampleSequence.query.filter(SampleSequence.sequence_id==sequence_id).first()
        if not sample:
            return bad_request("测序ID不存在")
        print('疾病查询',sample.disease_id)
        queryMap.append(DiseaseInformation.id == sample.disease_id)
    if disease_type:
        queryMap.append(DiseaseInformation.disease_type == disease_type)


    querySort = DiseaseInformation.timestamp.desc()
    sort = json.loads(request.args.get('sort', '{}'))
    if sort.get('age', None):
        if sort['age'] == "ascending":
            querySort = DiseaseInformation.age.asc()
        elif sort['age'] == "descending":
            querySort = DiseaseInformation.age.desc()
    if sort.get('id', None):
        if sort['id'] == "ascending":
            querySort = DiseaseInformation.id.asc()
        elif sort['id'] == "descending":
            querySort = DiseaseInformation.id.desc()

    data = DiseaseInformation.to_collection_dict(
        DiseaseInformation.query.filter(*queryMap).order_by(querySort), page,
        per_page,
        'api.get_sequences')
    print('疾病',data)
    print(type(data))
    return restfulResponse(data)

@bp.route('/disease/detail', methods=['POST'])
def get_disease_detail():
    '''返回当前患病详情'''
    data = request.get_json()
    print('疾病detail',data)
    ids = data.get("ids",[])
    dises = DiseaseInformation.query.filter(DiseaseInformation.id.in_(ids)).order_by(DiseaseInformation.id.asc()).all()
    data = {"items":[item.to_dict() for item in dises]}
    return restfulResponse(data)

@bp.route("/disease/info", methods=["POST"])
@token_auth.login_required(role=Config.WRITE)
def get_disease_info():
    """返回一篇疾病信息"""
    data = request.get_json()
    id = data.get("id", [])
    disease = DiseaseInformation.query.get(id)
    if not disease:
        return bad_request("信息不存在")
    sequences = [result.sequence_id for result in disease.sequences] if disease.sequences else []

    data = {"sequences": sequences}
    return restfulResponse(data)

@bp.route('/disease/update', methods=['PUT'])
@token_auth.login_required(role=Config.WRITE)
def update_disease():
    '''修改疾病信息'''
    # if g.current_user != post.author and not g.current_user.is_administrator():
    #     return error_response(403)

    data = request.get_json()
    disease_info = DiseaseInformation.query.get(data['id'])
    if not data:
        return bad_request('You must post JSON data.')
    sequences = data.get('sequences', {})
    print('id列表',sequences)
    old = set([i.sequence_id for i in disease_info.sequences])
    new = set(sequences)
    add = new - old
    delect = old - new
    print('add',add)
    print('delect',delect)
    for sequence in add:
        sequence = int(sequence)
        sample = SampleSequence.query.get(sequence)
        if not sample:
            return bad_request(f"{sequence}测序id不存在")
        sample.disease_id = disease_info.id
    for sequence in delect:
        sequence = int(sequence)
        sample = SampleSequence.query.get(sequence)
        if not sample:
            return bad_request(f"{sequence}测序id不存在")
        sample.disease_id = None
    db.session.commit()

    disease_info.from_dict(data)
    db.session.commit()
    return restfulResponse(disease_info.to_dict())


@bp.route('/disease/delete/<int:id>', methods=['DELETE'])
@token_auth.login_required(role=Config.WRITE)
def delete_disease(id):
    '''删除一条疾病信息'''
    post = DiseaseInformation.query.get_or_404(id)
    # if g.current_user != post.author and not g.current_user.is_administrator():
    #     return error_response(403)
    # if post.sequences is not None:
    #     return restfulResponse({'msg':'此疾病还有关联测序信息尚未清除，不能删除'})
    post.deleted = True
    db.session.commit()
    return restfulResponse({})

@bp.route('/disease/remove', methods=['PUT'])
@token_auth.login_required(role=Config.WRITE)
def remove_disease():
    '''删除一条疾病信息'''
    data = request.get_json()
    print(data)
    seuqence_id = data.get('parent_id')
    dieseas_id = data.get('dieseas_id')
    if not seuqence_id and not dieseas_id:
        return bad_request(f"测序ID不存在")
    if seuqence_id:
        seuqence = SampleSequence.query.get(seuqence_id)
        if not seuqence:
            return bad_request("测序ID不存在")
        print(seuqence_id,'移除的ID为',seuqence.disease_id)
        seuqence.disease_id = None
    if dieseas_id:
        dieseas = DiseaseInformation.query.get(dieseas_id)
        if not dieseas:
            return bad_request("疾病信息不存在")
        print(dieseas_id,'移除的ID为', dieseas.patient_id)
        dieseas.patient_id = None
    db.session.commit()
    return restfulResponse({})


@bp.route('/posts/export-posts/', methods=['GET'])
@token_auth.login_required
@permission_required(Permission.WRITE)
def export_posts():
    '''导出当前用户的所有文章，RQ 后台任务'''
    if g.current_user.get_task_in_progress('export_posts'):  # 如果用户已经有同名的后台任务在运行中时
        return bad_request('上一个导出文章的后台任务尚未结束')
    else:
        # 将 app.utils.tasks.export_posts 放入任务队列中
        g.current_user.launch_task('export_posts', '正在导出文章...', kwargs={'user_id': g.current_user.id})
        return restfulResponse(message='正在运行导出文章后台任务')


###
# 全文搜索
###
@bp.route('/search/', methods=['GET'])
def search():
    '''Elasticsearch全文检索博客文章'''
    q = request.args.get('q')
    if not q:
        return bad_request(message='keyword is required.')

    page = request.args.get('page', 1, type=int)
    per_page = min(
        request.args.get(
            'per_page', current_app.config['POSTS_PER_PAGE'], type=int), 100)

    total, hits_basequery = PatientBasicInformation.search(q, page, per_page)
    # 总页数
    total_pages, div = divmod(total, per_page)
    if div > 0:
        total_pages += 1

    # 不能使用 PatientBasicInformation.to_collection_dict()，因为查询结果已经分页过了
    data = {
        'items': [item.to_dict() for item in hits_basequery],
        '_meta': {
            'page': page,
            'per_page': per_page,
            'total_pages': total_pages,
            'total_items': total
        },
        '_links': {
            'self': url_for('api.search', q=q, page=page, per_page=per_page),
            'next': url_for('api.search', q=q, page=page + 1, per_page=per_page) if page < total_pages else None,
            'prev': url_for('api.search', q=q, page=page - 1, per_page=per_page) if page > 1 else None
        }
    }
    return restfulResponse(data=data, message='Total items: {}, current page: {}'.format(total, page))


@bp.route('/search/post-detail/<int:id>', methods=['GET'])
def get_search_post(id):
    '''从搜索结果列表页跳转到文章详情'''
    q = request.args.get('q')
    page = request.args.get('page', type=int)
    per_page = request.args.get('per_page', type=int)

    if q and page and per_page:  # 说明是从搜索结果页中过来查看文章详情的，所以要高亮关键字
        total, hits_basequery = PatientBasicInformation.search(q, page, per_page)
        post = hits_basequery.first()  # 只会有唯一的一篇文章
        data = post.to_dict()  # 会高亮关键字
    else:
        post = PatientBasicInformation.query.get_or_404(id)
        data = post.to_dict()  # 不会高亮关键字

    # 下一篇文章
    next_basequery = PatientBasicInformation.query.order_by(PatientBasicInformation.timestamp.desc()).filter(PatientBasicInformation.timestamp > post.timestamp)
    if next_basequery.all():
        data['next_id'] = next_basequery[-1].id
        data['next_title'] = next_basequery[-1].title
        data['_links']['next'] = url_for('api.get_post', id=next_basequery[-1].id)
    else:
        data['_links']['next'] = None
    # 上一篇文章
    prev_basequery = PatientBasicInformation.query.order_by(PatientBasicInformation.timestamp.desc()).filter(PatientBasicInformation.timestamp < post.timestamp)
    if prev_basequery.first():
        data['prev_id'] = prev_basequery.first().id
        data['prev_title'] = prev_basequery.first().title
        data['_links']['prev'] = url_for('api.get_post', id=prev_basequery.first().id)
    else:
        data['_links']['prev'] = None
    return restfulResponse(data)
