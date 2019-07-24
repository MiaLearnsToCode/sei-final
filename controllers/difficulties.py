from flask import Blueprint, jsonify
from models.difficulty import Difficulty, DifficultySchema

api = Blueprint('difficulty', __name__)
difficulty_schema = DifficultySchema()

@api.route('/difficulties', methods=['GET'])
def index():
    difficulties = Difficulty.query.all()
    return difficulty_schema.jsonify(difficulties, many=True), 200

@api.route('/difficulties/<int:difficulty_id>', methods=['GET'])
def show(difficulty_id):
    difficulty = Difficulty.query.get(difficulty_id)
    if not difficulty:
        return jsonify({'message':'Difficulty not found'}), 404
    return difficulty_schema.jsonify(difficulty), 200
