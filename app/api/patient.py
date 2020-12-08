from flask import request, jsonify, url_for, g, current_app
from app.api import bp
from app.api.auth import token_auth
from app.api.errors import error_response, bad_request
from app.extensions import db
from app.models import Permission,PatientBasicInformation,DiseaseInformation
from app.utils.decorator import permission_required
from config import Config

@bp.route('/patients/', methods=['POST'])
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
    # patient.author = g.current_user  # 通过 auth.py 中 verify_token() 传递过来的（同一个request中，需要先进行 Token 认证）
    db.session.add(patient)
    db.session.commit()
    response = jsonify(patient.to_dict())
    response.status_code = 201
    # HTTP协议要求201响应包含一个值为新资源URL的Location头部
    response.headers['Location'] = url_for('api.get_patients', id=patient.id)
    return response


@bp.route('/patients/', methods=['GET'])
def get_patients():
    '''返回病人集合，分页'''
    page = request.args.get('page', 1, type=int)
    per_page = min(
        request.args.get(
            'per_page', current_app.config['POSTS_PER_PAGE'], type=int), 100)
    data = PatientBasicInformation.to_collection_dict(
        PatientBasicInformation.query.order_by(PatientBasicInformation.timestamp.desc()), page, per_page,
        'api.get_patients')
    return jsonify(data)


@bp.route('/patients/<int:id>', methods=['GET'])
@token_auth.login_required(role=Config.WRITE)
def get_patient(id):
    '''返回一个病人信息'''
    post = PatientBasicInformation.query.get_or_404(id)
    data = post.to_dict()
    # 下一个病人信息
    next_basequery = PatientBasicInformation.query.order_by(PatientBasicInformation.timestamp.desc()).filter(PatientBasicInformation.timestamp > post.timestamp)
    if next_basequery.all():
        data['next_id'] = next_basequery[-1].id
        data['next_title'] = next_basequery[-1].name
        data['_links']['next'] = url_for('api.get_patient', id=next_basequery[-1].id)
    else:
        data['_links']['next'] = None
    # 上一个病人信息
    prev_basequery = PatientBasicInformation.query.order_by(PatientBasicInformation.timestamp.desc()).filter(PatientBasicInformation.timestamp < post.timestamp)
    if prev_basequery.first():
        data['prev_id'] = prev_basequery.first().id
        data['prev_title'] = prev_basequery.first().name
        data['_links']['prev'] = url_for('api.get_patient', id=prev_basequery.first().id)
    else:
        data['_links']['prev'] = None
    return jsonify(data)


@bp.route('/patients/<int:id>', methods=['PUT'])
@token_auth.login_required(role=Config.WRITE)
def update_post(id):
    '''修改病人信息'''
    post = PatientBasicInformation.query.get_or_404(id)
    # if g.current_user != post.author and not g.current_user.is_administrator():
    #     return error_response(403)

    data = request.get_json()
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


    post.from_dict(data)
    db.session.commit()
    return jsonify(post.to_dict())


@bp.route('/patients/<int:id>', methods=['DELETE'])
@token_auth.login_required(role=Config.WRITE)
def delete_post(id):
    '''删除一位病人信息'''
    post = PatientBasicInformation.query.get_or_404(id)
    # if g.current_user != post.author and not g.current_user.is_administrator():
    #     return error_response(403)
    if post.diseases_history is not None:
        return jsonify({'msg':'此病人还有关联信息尚未清除，不能删除'})
    db.session.delete(post)
    db.session.commit()
    return '', 204


###
#病人病历相关
##

@bp.route('/diseases/<int:id>', methods=['POST'])
@token_auth.login_required(role=Config.WRITE)
def create_disease(id):
    '''添加新的病人患病信息'''
    data = request.get_json()
    print(data)
    if not data:
        return bad_request('You must post JSON data.')

    patient = PatientBasicInformation.query.get_or_404(id)
    if not patient:
        return bad_request('该病人信息不存在')

    disease_info = DiseaseInformation()
    disease_info.from_dict(data)
    # disease_info.patient_id = id

    db.session.add(disease_info)
    db.session.commit()
    response = jsonify(disease_info.to_dict())
    response.status_code = 201
    # HTTP协议要求201响应包含一个值为新资源URL的Location头部
    response.headers['Location'] = url_for('api.get_patients', id=patient.id)
    return response

@bp.route('/patients/<int:id>/diseases', methods=['GET'])
def get_patient_diseases(id):
    '''获取病人下的所有疾病信息'''
    post = PatientBasicInformation.query.get_or_404(id)
    page = request.args.get('page', 1, type=int)
    per_page = min(
        request.args.get(
            'per_page', current_app.config['COMMENTS_PER_PAGE'], type=int), 100)
    #
    data = DiseaseInformation.to_collection_dict(
        post.diseases_history.filter(DiseaseInformation.deleted==False).order_by(DiseaseInformation.timestamp.desc()), page, per_page,
        'api.get_patient_diseases', id=id)
    # 再添加子孙到一级评论的 descendants 属性上
    return jsonify(data)

@bp.route('/diseases/<int:id>', methods=['GET'])
def get_disease(id):
    '''返回当前患病详情'''
    post = DiseaseInformation.query.get_or_404(id)
    data = post.to_dict()
    # 下一个病人信息
    next_basequery = DiseaseInformation.query.order_by(DiseaseInformation.timestamp.desc()).filter(
        DiseaseInformation.timestamp > post.timestamp)
    if next_basequery.all():
        data['next_id'] = next_basequery[-1].id
        data['next_title'] = next_basequery[-1].name
        data['_links']['next'] = url_for('api.get_disease', id=next_basequery[-1].id)
    else:
        data['_links']['next'] = None
    # 上一个病人信息
    prev_basequery = DiseaseInformation.query.order_by(DiseaseInformation.timestamp.desc()).filter(
        DiseaseInformation.timestamp < post.timestamp)
    if prev_basequery.first():
        data['prev_id'] = prev_basequery.first().id
        data['prev_title'] = prev_basequery.first().name
        data['_links']['prev'] = url_for('api.get_disease', id=prev_basequery.first().id)
    else:
        data['_links']['prev'] = None
    return jsonify(data)

@bp.route('/diseases/<int:id>', methods=['PUT'])
@token_auth.login_required(role=Config.WRITE)
def update_disease(id):
    '''修改疾病信息'''
    post = DiseaseInformation.query.get_or_404(id)
    # if g.current_user != post.author and not g.current_user.is_administrator():
    #     return error_response(403)

    data = request.get_json()
    if not data:
        return bad_request('You must post JSON data.')


    post.from_dict(data)
    db.session.commit()
    return jsonify(post.to_dict())


@bp.route('/patients/<int:id>', methods=['DELETE'])
@token_auth.login_required(role=Config.WRITE)
def delete_disease(id):
    '''删除一条疾病信息'''
    post = DiseaseInformation.query.get_or_404(id)
    # if g.current_user != post.author and not g.current_user.is_administrator():
    #     return error_response(403)
    if post.sequences is not None:
        return jsonify({'msg':'此疾病还有关联测序信息尚未清除，不能删除'})
    post.deleted = True
    db.session.commit()
    return '', 204



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
        return jsonify(message='正在运行导出文章后台任务')


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
    return jsonify(data=data, message='Total items: {}, current page: {}'.format(total, page))


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
    return jsonify(data)
