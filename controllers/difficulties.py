from flask import Blueprint
from models.difficulty import Difficulty, DifficultySchema

api = Blueprint('difficulty', __name__)
difficulty_schema = DifficultySchema()

#  Route for the 3 possible difficulties available: easy, medium, hard
# -----New component-----
@api.route('/difficulties', methods=['GET'])
def index():
    difficulties = Difficulty.query.all()
    return difficulty_schema.jsonify(difficulties, many=True), 200
