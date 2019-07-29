from flask import Blueprint, jsonify, request
from models.user import User, UserSchema

api = Blueprint('users', __name__)
user_schema = UserSchema()

@api.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    user, errors = user_schema.load(data)
    if errors:
        return jsonify(errors), 422
    user.save()
    return jsonify({'message':'Registration successful'}), 201

@api.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    if not data:
        return jsonify({'message':'Unauthorized'}), 401
    user = User.query.filter_by(email=data['email']).first()
    if not user or not user.validate_password:
        return jsonify({'message':'Unauthorized'}), 401
    return jsonify({
        'token': user.generate_token()
    }), 200
