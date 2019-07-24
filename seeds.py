from app import app, db
from models.image import ImageModel
from models.difficulty import Difficulty

with app.app_context():
    db.drop_all()
    db.create_all()

    easy = Difficulty(level='easy', pixelSize=10)
    medium = Difficulty(level='medium', pixelSize=20)
    hard = Difficulty(level='hard', pixelSize=30)
    teddy = ImageModel(title='teddy', url='https://pixy.org/src/81/thumbs350/811052.jpg', difficulty=hard)

    db.session.add(easy)
    db.session.add(medium)
    db.session.add(hard)
    db.session.add(teddy)
    db.session.commit()
