from app import db, ma
from marshmallow import fields
from .base import BaseModel, BaseSchema
# pylint: disable=W0611
from .difficulty import Difficulty

class ImageModel(db.Model, BaseModel):

    __tablename__ = 'images'

    title = db.Column(db.String(50), nullable=False)
    url = db.Column(db.String(300), nullable=False)
    difficulty_id = db.Column(db.Integer, db.ForeignKey('difficulties.id'))
    difficulty = db.relationship('Difficulty', backref='created_images')

class ImageSchema(ma.ModelSchema, BaseSchema):

    class Meta:
        model = ImageModel

    pixels = fields.Nested('PixelSchema', many=True, exclude=('created_at', 'updated_at'))
    difficulty = fields.Nested('DifficultySchema', only=('id', 'level', 'pixelSize'))

class Pixel(db.Model, BaseModel):

    __tablename__ = 'pixels'

    color = db.Column(db.String(30), nullable=False)
    ticked = db.Column(db.Boolean, nullable=False)
    image_id = db.Column(db.Integer, db.ForeignKey('images.id'))
    image = db.relationship('ImageModel', backref='pixels')

class PixelSchema(ma.ModelSchema, BaseSchema):

    class Meta:
        model = Pixel
