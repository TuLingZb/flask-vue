from flask import g
from flask_httpauth import HTTPBasicAuth, HTTPTokenAuth
from app.api.errors import error_response
from app.extensions import db
from app.models import User
from app.utils.my_response import restfulResponse

basic_auth = HTTPBasicAuth()
token_auth = HTTPTokenAuth()





@basic_auth.verify_password
def verify_password(username, password):
    '''用于检查用户提供的用户名和密码'''
    print('sa',username, password)
    user = User.query.filter_by(username=username).first()
    if user is None:

        user = User()
        user.from_dict({"username":username,"password":password}, new_user=True)
        user.confirmed = True
        db.session.add(user)
        db.session.commit()
        # return False
    g.current_user = user
    return user.check_password(password)


@basic_auth.error_handler
def basic_auth_error():
    '''用于在认证失败的情况下返回错误响应'''
    # return error_response(401)
    return restfulResponse(data="",msg="用户名或密码错误", code=50000)

@token_auth.verify_token
def verify_token(token):
    '''用于检查用户请求是否有token，并且token真实存在，还在有效期内'''
    g.current_user = User.verify_jwt(token) if token else None
    if g.current_user:
        # 每次认证通过后（即将访问资源API），更新 last_seen 时间
        g.current_user.ping()
        db.session.commit()
    return g.current_user


@token_auth.error_handler
def token_auth_error(status):

    '''用于在 Token Auth 认证失败的情况下返回错误响应'''
    print('错误状态吗',status)
    # return error_response(401)
    if status == 401:
        return restfulResponse(data="",msg="认证失败,token非法或过期",code=status)
    elif status == 403:
        return restfulResponse(data="", msg=f"权限不足,当前角色为{g.current_user.role}", code=status)

@token_auth.get_user_roles
def get_user_roles(user):
    '''角色认证'''
    # print(user.__dict__)
    return user.role.slug