from functools import wraps
from flask import request, jsonify, g
import jwt
from models.user import User
from config.environment import secret

def secure_route(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        if 'Authorization' not in request.headers:
            return jsonify({'message':'Unauthorized'}), 401
        token = request.headers.get('Authorization').replace('Bearer ', '')

        try:
            payload = jwt.decode(token, secret)
        except jwt.ExpiredSignatureError:
            return jsonify({'message':'Token expired'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'message':'Invalid Token'}), 401

        user = User.query.get(payload['user'])

        if not user:
            return jsonify({'message':'Unauthorized'}), 401

        g.current_user = user

        return func(*args, **kwargs)
    return wrapper
