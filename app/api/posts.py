from flask import request, jsonify, url_for, g, current_app
from app.api import bp
from app.api.auth import token_auth
from app.api.errors import error_response, bad_request
from app.extensions import db
from app.models import Permission, SampleSequence,SequenceResult
from config import Config
from app.utils.my_response import restfulResponse
from flask_cors import cross_origin
import json
from app.extensions import cors

@bp.route('/sequence/search', methods=['POST'])
@token_auth.login_required(role=Config.WRITE)
def search_sequence():

    pass


@bp.route('/result/search', methods=['POST'])
@token_auth.login_required(role=Config.WRITE)
def search_result():
    data = request.get_json()
    if not data:
        return bad_request('查询内容为空')
    pass

@bp.route('/sequences/import', methods=['POST'])
@cross_origin()
@token_auth.login_required(role=Config.WRITE)
def excel_create():
    '''excel导入样本测序信息'''
    data = request.get_json()
    # print(data)
    if not data:
        return bad_request('excel表内容为空')

    sample_data = data['data']
    print(sample_data)
    sample_header = data['header']
    print(sample_header)
    for data in sample_data:
        sequence_id = data.get('Sequence ID',None)
        if not sequence_id:
            return bad_request('缺少Sequence ID')
        post = SampleSequence.query.get(int(sequence_id)) or SampleSequence()
        post.from_dict(data,trans=True)
        post.author = g.current_user
        db.session.add(post)
    db.session.commit()
    response = restfulResponse("上传完成")
    response.headers['Access-Control-Allow-Origin'] = '*'
    return response


@bp.route('/result/import', methods=['POST'])
@cross_origin()
@token_auth.login_required(role=Config.WRITE)
def excel_create_result():
    '''excel导入样本测序结果信息'''
    data = request.get_json()
    if not data:
        return bad_request('excel表内容为空')

    sample_data = data['data']
    print(sample_data)
    print(len(sample_data))
    for data in sample_data:
        sequence_id = data.get('Sequence ID', None)
        batch = data.get('测序批次', '')
        if not isinstance(sequence_id,int):
            print(data)
            continue
        post = SampleSequence.query.get(int(sequence_id)) or SampleSequence()
        post.from_dict(data,trans=True)
        post.author = g.current_user
        result = SequenceResult.query.filter(SequenceResult.sequence_id == sequence_id).filter(SequenceResult.batch == batch).first() or SequenceResult()
        result.from_dict(data,trans=True)
        db.session.add(result)
        db.session.add(post)
    db.session.commit()
    response = restfulResponse("上传完成")
    response.headers['Access-Control-Allow-Origin'] = '*'
    return response



@bp.route('/sequences/create', methods=['POST'])
@token_auth.login_required(role=Config.WRITE)
def create_sequence():
    '''添加一条新的样本测序信息'''
    data = request.get_json()
    print(data)
    if not data:
        return bad_request('You must post JSON data.')
    message = {}
    if 'sequence_id' not in data or SampleSequence.query.get(data.get('sequence_id')):
        message['sequence_id'] = 'sequence_id is invalid.'
    # elif len(data.get('introduction')) > 255:
    #     message['introduction'] = 'introduction must less than 255 characters.'
    if message:
        return bad_request(message)

    post = SampleSequence()
    post.from_dict(data)
    post.author = g.current_user  # 通过 auth.py 中 verify_token() 传递过来的（同一个request中，需要先进行 Token 认证）
    db.session.add(post)
    db.session.commit()
    response = restfulResponse(post.to_dict())
    response.status_code = 201
    # HTTP协议要求201响应包含一个值为新资源URL的Location头部
    response.headers['Location'] = url_for('api.get_sequences')
    return response


@bp.route('/sequences/list', methods=['GET'])
def get_sequences():
    '''返回文章集合，分页'''
    page = request.args.get('page', 1, type=int)
    per_page = min(
        request.args.get(
            'limit', current_app.config['POSTS_PER_PAGE'], type=int), 100)

    queryMap = []

    queryMap.append(SampleSequence.deleted==False) # 非删除

    sequence_id = request.args.get('sequence_id', None, type=int)
    gao_lab_id = request.args.get('gao_lab_id', None)
    sample_id = request.args.get('sample_id', None)
    introduction = request.args.get('introduction', None)
    sample_origin = request.args.get('sample_origin', None)
    importance = request.args.get('importance', None) # 疾病类型
    if sequence_id:
        queryMap.append(SampleSequence.sequence_id == sequence_id)
    if gao_lab_id:
        queryMap.append(SampleSequence.gao_lab_id.like('%{gao_lab_id}%'.format(gao_lab_id=gao_lab_id)))
    if sample_id:
        queryMap.append(SampleSequence.sample_id == sample_id)
    if introduction:
        queryMap.append(SampleSequence.introduction.like('%{introduction}%'.format(introduction=introduction)))
    if importance:
        queryMap.append(SampleSequence.disease_type == importance)

    if sample_origin:
        queryMap.append(SampleSequence.sample_origin.like('%{sample_origin}%'.format(sample_origin=sample_origin)))

    querySort = []
    sort = json.loads(request.args.get('sort',{}))
    if sort.get('sequence_id',None):
        if sort['sequence_id'] == "ascending":
            querySort.append(SampleSequence.sequence_id.asc())
        elif sort['sequence_id'] == "descending":
            querySort.append(SampleSequence.sequence_id.desc())
    if sort.get('collected_date',None):
        if sort['collected_date'] == "ascending":
            querySort.append(SampleSequence.collected_date.asc())
        elif sort['collected_date'] == "descending":
            querySort.append(SampleSequence.collected_date.desc())
    if sort.get('blood_date',None):
        if sort['blood_date'] == "ascending":
            querySort.append(SampleSequence.blood_date.asc())
        elif sort['blood_date'] == "descending":
            querySort.append(SampleSequence.blood_date.desc())
    print(queryMap)
    print(querySort)
    data = SampleSequence.to_collection_dict(
        SampleSequence.query.filter(*queryMap).order_by(*querySort), page, per_page,
        'api.get_sequences')
    return restfulResponse(data)


@bp.route('/sequences/detail/<int:id>', methods=['GET'])
@token_auth.login_required(role=Config.WRITE)
def get_sequence(id):
    '''返回一篇测序信息'''
    post = SampleSequence.query.get_or_404(id)
    data = post.to_dict()
    return restfulResponse([data])


@bp.route('/sequences/update', methods=['PUT'])
@token_auth.login_required(role=Config.WRITE)
def update_sequence():
    '''修改一篇测序信息'''
    # if g.current_user != post.author and not g.current_user.can(Permission.ADMIN):
    #     return error_response(403)

    data = request.get_json()
    if not data:
        return bad_request('You must post JSON data.')
    print(data)
    id = data.get('sequence_id')
    post = SampleSequence.query.get(id)
    if not post:
        return restfulResponse({},code=4004,msg="测序ID不存在")

    post.from_dict(data)
    db.session.commit()
    return restfulResponse(post.to_dict())


@bp.route('/sequences/delete/<int:id>', methods=['DELETE'])
@token_auth.login_required(role=Config.WRITE)
def delete_sequence(id):
    '''删除一篇测序信息'''
    # data = request.get_json()
    # id = data.get('sequence_id')
    sequences = SampleSequence.query.get_or_404(id)
    # if g.current_user != post.author and not g.current_user.can(Permission.ADMIN):
    #     return error_response(403)

    sequences.deleted = True
    db.session.commit()
    return restfulResponse({})

@bp.route('/result/create', methods=['POST'])
@token_auth.login_required(role=Config.WRITE)
def create_results():
    '''添加一条新的样本测序信息'''
    data = request.get_json()
    if not data:
        return bad_request('You must post JSON data.')
    # message = {}
    # if 'sequence_id' not in data or not data.get('sequence_id'):
    #     message['sequence_id'] = 'sequence_id is required.'
    # elif len(data.get('introduction')) > 255:
    #     message['introduction'] = 'introduction must less than 255 characters.'
    # if message:
    #     return bad_request(message)
    sequence_id = data.get('sequence_id',None)
    if not SampleSequence.query.get(sequence_id):
        return bad_request('测序ID不存在')
    results = SequenceResult()
    results.from_dict(data)
    db.session.add(results)
    db.session.commit()
    response = restfulResponse(results.to_dict())
    response.status_code = 201
    # HTTP协议要求201响应包含一个值为新资源URL的Location头部
    response.headers['Location'] = url_for('api.get_results', id=results.id)
    return response


@bp.route('/result/list', methods=['GET'])
def get_results():
    '''返回文章集合，分页'''

    page = request.args.get('page', 1, type=int)
    per_page = min(
        request.args.get(
            'limit', current_app.config['POSTS_PER_PAGE'], type=int), 100)

    queryMap = []

    sequence_id = request.args.get('sequence_id', None, type=int)
    batch = request.args.get('batch', None)
    name_1 = request.args.get('name_1', None)
    if sequence_id:
        queryMap.append(SequenceResult.sequence_id == sequence_id)
    if batch:
        queryMap.append(SequenceResult.batch == batch)
    if name_1:
        queryMap.append(SequenceResult.name_1 == name_1)
    querySort = []
    sort = request.args.get('sort', '+id')
    if sort == "+id":
        querySort.append(SequenceResult.sequence_id.asc())
    else:
        querySort.append(SequenceResult.sequence_id.desc())


    data = SequenceResult.to_collection_dict(
        SequenceResult.query.filter(*queryMap).order_by(*querySort), page, per_page,
        'api.get_results')
    return restfulResponse(data)


@bp.route('/result/detail/<int:id>', methods=['GET'])
def get_result(id):
    '''返回一篇测序信息'''
    post = SequenceResult.query.get_or_404(id)
    data = post.to_dict()
    # 下一篇文章
    next_basequery = SequenceResult.query.order_by(SequenceResult.timestamp.desc()).filter(SequenceResult.timestamp > post.timestamp)
    if next_basequery.all():
        data['next_id'] = next_basequery[-1].id
        data['next_title'] = next_basequery[-1].title
        data['_links']['next'] = url_for('api.get_results', id=next_basequery[-1].id)
    else:
        data['_links']['next'] = None
    # 上一篇文章
    prev_basequery = SampleSequence.query.order_by(SampleSequence.timestamp.desc()).filter(SampleSequence.timestamp < post.timestamp)
    if prev_basequery.first():
        data['prev_id'] = prev_basequery.first().id
        data['prev_title'] = prev_basequery.first().title
        data['_links']['prev'] = url_for('api.get_result', id=prev_basequery.first().id)
    else:
        data['_links']['prev'] = None
    return jsonify(data)


@bp.route('/result/update/', methods=['PUT'])
@token_auth.login_required(role=Config.WRITE)
def update_result():
    '''修改一篇测序信息'''

    data = request.get_json()
    if not data:
        return bad_request('You must post JSON data.')
    id = data.get("id",None)
    post = SequenceResult.query.get(id)
    if not post:
        return bad_request("信息不存在")


    # message = {}
    # if 'title' not in data or not data.get('title').strip():
    #     message['title'] = 'Title is required.'
    # elif len(data.get('title')) > 255:
    #     message['title'] = 'Title must less than 255 characters.'
    # if 'body' not in data or not data.get('body').strip():
    #     message['body'] = 'Body is required.'
    # if message:
    #     return bad_request(message)

    post.from_dict(data)
    db.session.commit()
    return restfulResponse(post.to_dict())


@bp.route('/result/detele/<int:id>', methods=['DELETE'])
@token_auth.login_required(role=Config.WRITE)
def delete_result(id):
    '''删除一篇测序信息'''
    result = SampleSequence.query.get_or_404(id)
    # if g.current_user != results.author and not g.current_user.can(Permission.ADMIN):
    #     return error_response(403)

    result.deleted = True
    db.session.commit()
    return '', 204
