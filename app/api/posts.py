from flask import request, jsonify, url_for, g, current_app
from app.api import bp
from app.api.auth import token_auth
from app.api.errors import error_response, bad_request
from app.extensions import db
from app.models import Permission, SampleSequence,SequenceResult
from config import Config


@bp.route('/sequences/<int:disease_id>', methods=['POST'])
@token_auth.login_required(role=Config.WRITE)
def create_sequence(disease_id):
    '''添加一条新的样本测序信息'''
    data = request.get_json()
    if not data:
        return bad_request('You must post JSON data.')
    message = {}
    if 'sequence_id' not in data or not data.get('sequence_id').strip():
        message['sequence_id'] = 'sequence_id is required.'
    elif len(data.get('introduction')) > 255:
        message['introduction'] = 'introduction must less than 255 characters.'
    if message:
        return bad_request(message)

    post = SampleSequence()
    post.from_dict(data)
    post.author = g.current_user  # 通过 auth.py 中 verify_token() 传递过来的（同一个request中，需要先进行 Token 认证）
    db.session.add(post)
    db.session.commit()
    response = jsonify(post.to_dict())
    response.status_code = 201
    # HTTP协议要求201响应包含一个值为新资源URL的Location头部
    response.headers['Location'] = url_for('api.get_sequences', id=post.id)
    return response


@bp.route('/sequences/', methods=['GET'])
def get_sequences():
    '''返回文章集合，分页'''
    page = request.args.get('page', 1, type=int)
    per_page = min(
        request.args.get(
            'per_page', current_app.config['POSTS_PER_PAGE'], type=int), 100)
    data = SampleSequence.to_collection_dict(
        SampleSequence.query.order_by(SampleSequence.timestamp.desc()), page, per_page,
        'api.get_posts')
    return jsonify(data)


@bp.route('/sequences/<int:id>', methods=['GET'])
def get_sequence(id):
    '''返回一篇测序信息'''
    post = SampleSequence.query.get_or_404(id)
    data = post.to_dict()
    # 下一篇文章
    next_basequery = SampleSequence.query.order_by(SampleSequence.timestamp.desc()).filter(SampleSequence.timestamp > post.timestamp)
    if next_basequery.all():
        data['next_id'] = next_basequery[-1].id
        data['next_title'] = next_basequery[-1].title
        data['_links']['next'] = url_for('api.get_sequence', id=next_basequery[-1].id)
    else:
        data['_links']['next'] = None
    # 上一篇文章
    prev_basequery = SampleSequence.query.order_by(SampleSequence.timestamp.desc()).filter(SampleSequence.timestamp < post.timestamp)
    if prev_basequery.first():
        data['prev_id'] = prev_basequery.first().id
        data['prev_title'] = prev_basequery.first().title
        data['_links']['prev'] = url_for('api.get_sequence', id=prev_basequery.first().id)
    else:
        data['_links']['prev'] = None
    return jsonify(data)


@bp.route('/sequences/<int:id>', methods=['PUT'])
@token_auth.login_required(role=Config.WRITE)
def update_post(id):
    '''修改一篇测序信息'''
    post = SampleSequence.query.get_or_404(id)
    # if g.current_user != post.author and not g.current_user.can(Permission.ADMIN):
    #     return error_response(403)

    data = request.get_json()
    if not data:
        return bad_request('You must post JSON data.')
    message = {}
    if 'title' not in data or not data.get('title').strip():
        message['title'] = 'Title is required.'
    elif len(data.get('title')) > 255:
        message['title'] = 'Title must less than 255 characters.'
    if 'body' not in data or not data.get('body').strip():
        message['body'] = 'Body is required.'
    if message:
        return bad_request(message)

    post.from_dict(data)
    db.session.commit()
    return jsonify(post.to_dict())


@bp.route('/sequences/<int:id>', methods=['DELETE'])
@token_auth.login_required(role=Config.WRITE)
def delete_sequence(id):
    '''删除一篇测序信息'''
    sequences = SampleSequence.query.get_or_404(id)
    # if g.current_user != post.author and not g.current_user.can(Permission.ADMIN):
    #     return error_response(403)

    sequences.deleted = True
    db.session.commit()
    return '', 204

@bp.route('/results/<int:disease_id>', methods=['POST'])
@token_auth.login_required(role=Config.WRITE)
def create_results(disease_id):
    '''添加一条新的样本测序信息'''
    data = request.get_json()
    if not data:
        return bad_request('You must post JSON data.')
    message = {}
    if 'sequence_id' not in data or not data.get('sequence_id').strip():
        message['sequence_id'] = 'sequence_id is required.'
    elif len(data.get('introduction')) > 255:
        message['introduction'] = 'introduction must less than 255 characters.'
    if message:
        return bad_request(message)

    results = SampleSequence()
    results.from_dict(data)
    results.author = g.current_user  # 通过 auth.py 中 verify_token() 传递过来的（同一个request中，需要先进行 Token 认证）
    db.session.add(results)
    db.session.commit()
    response = jsonify(results.to_dict())
    response.status_code = 201
    # HTTP协议要求201响应包含一个值为新资源URL的Location头部
    response.headers['Location'] = url_for('api.get_results', id=results.id)
    return response


@bp.route('/results/', methods=['GET'])
def get_results():
    '''返回文章集合，分页'''
    page = request.args.get('page', 1, type=int)
    per_page = min(
        request.args.get(
            'per_page', current_app.config['POSTS_PER_PAGE'], type=int), 100)
    data = SampleSequence.to_collection_dict(
        SampleSequence.query.order_by(SampleSequence.timestamp.desc()), page, per_page,
        'api.get_resultss')
    return jsonify(data)


@bp.route('/results/<int:id>', methods=['GET'])
def get_result(id):
    '''返回一篇测序信息'''
    post = SampleSequence.query.get_or_404(id)
    data = post.to_dict()
    # 下一篇文章
    next_basequery = SampleSequence.query.order_by(SampleSequence.timestamp.desc()).filter(SampleSequence.timestamp > post.timestamp)
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


@bp.route('/results/<int:id>', methods=['PUT'])
@token_auth.login_required(role=Config.WRITE)
def update_result(id):
    '''修改一篇测序信息'''
    post = SampleSequence.query.get_or_404(id)
    # if g.current_user != post.author and not g.current_user.can(Permission.ADMIN):
    #     return error_response(403)

    data = request.get_json()
    if not data:
        return bad_request('You must post JSON data.')
    message = {}
    if 'title' not in data or not data.get('title').strip():
        message['title'] = 'Title is required.'
    elif len(data.get('title')) > 255:
        message['title'] = 'Title must less than 255 characters.'
    if 'body' not in data or not data.get('body').strip():
        message['body'] = 'Body is required.'
    if message:
        return bad_request(message)

    post.from_dict(data)
    db.session.commit()
    return jsonify(post.to_dict())


@bp.route('/results/<int:id>', methods=['DELETE'])
@token_auth.login_required(role=Config.WRITE)
def delete_result(id):
    '''删除一篇测序信息'''
    result = SampleSequence.query.get_or_404(id)
    # if g.current_user != results.author and not g.current_user.can(Permission.ADMIN):
    #     return error_response(403)

    result.deleted = True
    db.session.commit()
    return '', 204
