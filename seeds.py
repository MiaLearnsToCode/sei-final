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

    # Projects: hard
    teddy = ImageModel(title='teddy', url='https://pixy.org/src/81/thumbs350/811052.jpg', difficulty=hard, user=mia)
    blue = ImageModel(title='blue', url='https://jpeg.org/images/jpeg2000-home.jpg', difficulty=hard, user=mia)
    red = ImageModel(title='red', url='https://jpeg.org/images/jpegsystems-home.jpg', difficulty=hard, user=mia)
    flower = ImageModel(title='flower', url='https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/JPEG_example_flower.jpg/260px-JPEG_example_flower.jpg', difficulty=hard, user=mia)
    meme = ImageModel(title='meme', url='http://i.imgur.com/nBYOnvl.jpg', difficulty=hard, user=mia)

    # Projects: medium
    forest = ImageModel(title='forest', url='https://jpeg.org/images/jpegxs-home.jpg', difficulty=medium, user=mia)
    emojis = ImageModel(title='emojis', url='https://onlinejpgtools.com/images/examples-onlinejpgtools/smile.jpg', difficulty=medium, user=mia)
    panda = ImageModel(title='panda', url='https://tinyjpg.com/images/social/website.jpg', difficulty=medium, user=mia)

    # Projects: easy
    landscape = ImageModel(title='landscape', url='https://static1.squarespace.com/static/52e57753e4b0f20972c633ab/532b8a93e4b0ccd5fa5463af/5804d81cf5e2319f13781dc2/1476712482113/Brough_-Clearing%2CHelene%27s+view-.jpeg', difficulty=easy, user=mia)
    lion = ImageModel(title='lion', url='http://www.agm-s.rs/upload/medialib/lion.jpeg', difficulty=easy, user=mia)
    bouquet = ImageModel(title='bouquet', url='https://static.wixstatic.com/media/ed05e1_5e9b4d30cb79466f93092d9354e7fcc4~mv2.jpeg/v1/fill/w_265,h_255,al_c,q_90/file.jpg', difficulty=easy, user=mia)

    # Other user project
    teddy_two = ImageModel(title='teddy_two', url='https://pixy.org/src/81/thumbs350/811052.jpg', difficulty=easy, user=sim)

    note = Note(text='Finished the first row', image=teddy, user=mia)
    note_one = Note(text='Ran out of yarn', image=landscape, user=mia)

    db.session.add(mia)
    db.session.add(sim)

    db.session.add(easy)
    db.session.add(medium)
    db.session.add(hard)

    db.session.add(teddy)
    db.session.add(landscape)
    db.session.add(teddy_two)

    db.session.add(blue)
    db.session.add(red)
    db.session.add(flower)
    db.session.add(forest)
    db.session.add(emojis)
    db.session.add(panda)
    db.session.add(lion)
    db.session.add(bouquet)
    db.session.add(meme)

    db.session.add(note)
    db.session.add(note_one)

    db.session.commit()
