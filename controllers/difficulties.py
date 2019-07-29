from flask import Blueprint, jsonify
from models.difficulty import Difficulty, DifficultySchema

api = Blueprint('difficulty', __name__)
difficulty_schema = DifficultySchema()

@api.route('/difficulties', methods=['GET'])
def index():
    difficulties = Difficulty.query.all()
    return difficulty_schema.jsonify(difficulties, many=True), 200
