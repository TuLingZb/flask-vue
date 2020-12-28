from flask import Blueprint
from flask_cors import CORS
bp = Blueprint('api', __name__)
CORS(bp)
# 写在最后是为了防止循环导入，ping.py文件也会导入 bp
from app.api import ping, tokens, errors, roles, users,patient,posts
