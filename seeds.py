from app import app, db
from models.image import ImageModel, Note
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
    landscape = ImageModel(title='landscape', url='https://static1.squarespace.com/static/52e57753e4b0f20972c633ab/532b8a93e4b0ccd5fa5463af/5804d81cf5e2319f13781dc2/1476712482113/Brough_-Clearing%2CHelene%27s+view-.jpeg', difficulty=easy, user=mia)
    teddy_two = ImageModel(title='teddy_two', url='https://pixy.org/src/81/thumbs350/811052.jpg', difficulty=easy, user=sim)

    note = Note(text='finished the first row', image=teddy, user=mia)
    note_one = Note(text='Ran out of yarn', image=landscape, user=mia)

    db.session.add(mia)
    db.session.add(sim)
    db.session.add(easy)
    db.session.add(medium)
    db.session.add(hard)
    db.session.add(teddy)
    db.session.add(landscape)
    db.session.add(teddy_two)
    db.session.add(note)
    db.session.add(note_one)
    db.session.commit()
