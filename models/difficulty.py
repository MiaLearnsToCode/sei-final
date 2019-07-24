from marshmallow import fields
from app import db, ma
from .base import BaseModel, BaseSchema

class Difficulty(db.Model, BaseModel):

    __tablename__ = 'difficulties'

    level = db.Column(db.String(40))
    pixelSize = db.Column(db.Integer)

class DifficultySchema(ma.ModelSchema, BaseSchema):

    class Meta:
        model = Difficulty
    created_images = fields.Nested('ImageSchema', many=True, only=('title'))
