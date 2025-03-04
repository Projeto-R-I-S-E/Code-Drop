from app import db

class Usuario(db.Model):
    id = db.Column(db.Interger, primary_key=True, autoincrement=True, notnull=True)
    nome = db.Column(db.String(150), notnull=True)
    senha = db.Column(db.String(30), notnull=True)