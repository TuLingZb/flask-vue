from flask import request, url_for, jsonify,g
from app.api import bp
from app.api.auth import token_auth
from app.api.errors import bad_request, error_response
from app.extensions import db
from app.models import Role,User
from app.utils.decorator import admin_required
from app.utils.my_response import restfulResponse


# @bp.route('/roles/perms', methods=['GET'])
# def get_perms():
#     '''获取所有Permissions'''
#     data = [
#         {'name': 'FOLLOW', 'dec': 1},
#         {'name': 'COMMENT', 'dec': 2},
#         {'name': 'WRITE', 'dec': 4},
#         {'name': 'ADMIN', 'dec': 128}
#     ]
#     return restfulResponse(data)


# @bp.route('/roles', methods=['POST'])
# @token_auth.login_required
# @admin_required
# def create_role():
#     '''注册一个新角色'''
#     data = request.get_json()
#     if not data:
#         return bad_request('You must post JSON data.')
#
#     message = {}
#     if 'slug' not in data or not data.get('slug', None).strip():
#         message['slug'] = 'Please provide a valid slug.'
#     if 'name' not in data or not data.get('name', None).strip():
#         message['name'] = 'Please provide a valid name.'
#
#     if Role.query.filter_by(slug=data.get('slug', None)).first():
#         message['slug'] = 'Please use a different slug.'
#     if message:
#         return bad_request(message)
#
#     permissions = 0
#     for perm in data.get('permissions', 0):
#         permissions += perm
#     data['permissions'] = permissions
#
#     role = Role()
#     role.from_dict(data)
#     db.session.add(role)
#     db.session.commit()
#
#     response = restfulResponse(role.to_dict())
#     response.status_code = 201
#     # HTTP协议要求201响应包含一个值为新资源URL的Location头部
#     response.headers['Location'] = url_for('api.get_role', id=role.id)
#     return response


@bp.route('/roles/list', methods=['GET'])
@token_auth.login_required(role='admin')
def get_roles():
    '''返回所有角色的集合'''
    page = request.args.get('page', 1, type=int)
    per_page = min(request.args.get('limit', 10, type=int), 100)
    queryMap = []

    username = request.args.get('username', None)
    print(username)
    role = request.args.get('role', None)
    if username:
        queryMap.append(User.username == username)
    if role:
        queryMap.append(User.role_id == role)
    querySort = []
    sort = request.args.get('sort', '+id')
    if sort == "+id":
        querySort.append(User.id.asc())
    else:
        querySort.append(User.id.desc())

    data = User.to_collection_dict(
        User.query.filter(*queryMap).order_by(*querySort), page, per_page,
        'api.get_roles')
    return restfulResponse(data)


@bp.route('/roles/<int:id>', methods=['GET'])
@token_auth.login_required(role='admin')
def get_role(id):
    '''返回一个角色'''
    role = Role.query.get_or_404(id)
    data = role.to_dict()

    return restfulResponse(data)


@bp.route('/role/update', methods=['PUT'])
@token_auth.login_required(role='admin')
def update_role():
    '''修改用户角色'''
    data = request.get_json()
    print('pp',data)
    id = data.get("id",0)
    user = User.query.get(id)
    if not user:
        return bad_request("用户不存在")
    # 自己不能修改自己的用户角色
    if g.current_user == user:
        return error_response(403,"不能修改自己的角色")
    message = {}
    
    user.from_dict(data)
    db.session.commit()
    return restfulResponse(user.to_dict())


# @bp.route('/roles/<int:id>', methods=['DELETE'])
# @token_auth.login_required
# @admin_required
# def delete_role(id):
#     '''删除一个角色'''
#     role = Role.query.get_or_404(id)
#     db.session.delete(role)
#     db.session.commit()
#     return '', 204
