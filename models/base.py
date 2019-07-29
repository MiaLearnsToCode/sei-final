from datetime import datetime
from app import db
from marshmallow import fields

# Base model: applied to all other models to populate id and timestamps
# The model includes the save and remove methods used in the controllers

class BaseModel:
    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow)

    def save(self):
        self.updated_at = datetime.utcnow()
        db.session.add(self)
        db.session.commit()

    def remove(self):
        db.session.delete(self)
        db.session.commit()

# Reformat the dates in case they need to be used in the frontend
class BaseSchema:
    created_at = fields.DateTime(format='%Y-%m-%d %H:%M:%S')
    updated_at = fields.DateTime(format='%Y-%m-%d %H:%M:%S')
