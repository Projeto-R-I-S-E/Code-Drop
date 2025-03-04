from app import db

class Usuario(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True, nullable=False)
    nome = db.Column(db.String(150), nullable=False)
    senha = db.Column(db.String(30), nullable=False)