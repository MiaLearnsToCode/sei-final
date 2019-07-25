from datetime import datetime, timedelta
import jwt
from sqlalchemy.ext.hybrid import hybrid_property
from marshmallow import validates_schema, ValidationError, fields
from app import db, ma, bcrypt
from config.environment import secret
from .base import BaseModel, BaseSchema

class User(db.Model, BaseModel):

    __tablename__ = 'users'

    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(128), nullable=False, unique=True)
    password_hash = db.Column(db.String(128), nullable=False)

    @hybrid_property
    def password(self):
        pass

    @password.setter
    def password(self, plaintext):
        self.password_hash = bcrypt.generate_password_hash(plaintext).decode('utf-8')

    def validate_password(self, plaintext):
        return bcrypt.check_password_hash(self.password, plaintext)

    def generate_token(self):
        payload = {
            'exp': datetime.utcnow() + timedelta(days=4),
            'iat': datetime.utcnow(),
            'user': self.id
        }
        token = jwt.encode(
            payload,
            secret,
            'HS256'
        ).decode('utf-8')
        return token

class UserSchema(ma.ModelSchema, BaseSchema):

    password = fields.String(required=True)
    password_confirmation = fields.String(required=True)

    @validates_schema
    # pylint: disable=R0201
    def check_passwords_match(self, data):
        print(data)
        if data.get('password') != data.get('password_confirmation'):
            raise ValidationError(
                'Password do not match',
                'password_confirmation'
            )

    class Meta:
        model = User
        exclude = ('password_hash', )
    created_images = fields.Nested('ImageSchema', many=True, only=('title'))
    created_notes = fields.Nested('NoteSchema', many=True, only=('text'))
