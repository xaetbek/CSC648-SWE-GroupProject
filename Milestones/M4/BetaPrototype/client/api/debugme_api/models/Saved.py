import datetime
from debugme_api.debugme_toolkit import db, ma
from debugme_api.models.User import UserSchema
from debugme_api.models.Premium import PremiumSchema
class Saved(db.Model):
    __tablename__ = 'Saved'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    post_id = db.Column(db.Integer, db.ForeignKey('Premium.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('User.id'), nullable=False)
    is_premium = db.Column(db.Boolean, default=False, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

    author = db.relationship("User", lazy="joined", foreign_keys=[user_id],viewonly=True)
    guides = db.relationship("Premium", lazy="joined", viewonly=True)

    def __init__(self, post_id, user_id, is_premium):
        self.post_id = post_id
        self.user_id = user_id
        self.is_premium = is_premium

class SavedSchema(ma.Schema):
    class Meta:
        fields = ('id', 'post_id', 'user_id', 'is_premium', 'created_at')

class SavedUserSchema(ma.SQLAlchemyAutoSchema):
    author = ma.Nested(UserSchema)
    guides = ma.Nested(PremiumSchema)
    class Meta:
        model = Saved