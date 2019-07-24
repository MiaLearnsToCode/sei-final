from app import app, db
from models.image import ImageModel
from models.difficulty import Difficulty
from models.user import UserSchema

user_schema = UserSchema()

with app.app_context():
    db.drop_all()
    db.create_all()

    mia, mia_errors = user_schema.load({
        'username': 'mia',
        'email': 'mia@google',
        'password': 'pass',
        'password_confirmation': 'pass'
    })

    if mia_errors:
        raise Exception(mia_errors)

    sim, sim_errors = user_schema.load({
        'username': 'sim',
        'email': 'sim@google',
        'password': 'pass',
        'password_confirmation': 'pass'
    })

    if sim_errors:
        raise Exception(sim_errors)

    easy = Difficulty(level='easy', pixelSize=10)
    medium = Difficulty(level='medium', pixelSize=20)
    hard = Difficulty(level='hard', pixelSize=30)
    teddy = ImageModel(title='teddy', url='https://pixy.org/src/81/thumbs350/811052.jpg', difficulty=hard, user=mia)

    db.session.add(mia)
    db.session.add(sim)
    db.session.add(easy)
    db.session.add(medium)
    db.session.add(hard)
    db.session.add(teddy)
    db.session.commit()
