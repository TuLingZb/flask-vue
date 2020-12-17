from flask import jsonify

def restfulResponse(data,code=200,msg='success'):
    return jsonify(
        {
        'code':code,
        'message':msg,
        'data': data,
        }
    )