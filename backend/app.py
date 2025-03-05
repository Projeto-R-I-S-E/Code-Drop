from flask import Flask, request, jsonify
from flask_cors import CORS
import uuid
import os
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import JWTManager,  create_access_token, jwt_required, get_jwt_identity
from flask_migrate import Migrate

project_root = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
static_folder = os.path.join(project_root, 'frontend', 'dist')
template_folder = os.path.join(project_root, 'frontend', 'templates')

app = Flask(__name__, static_folder=static_folder, template_folder=template_folder)
CORS(app)

DATABASE_URL = os.getenv("DATABASE_URL")

if DATABASE_URL and DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://")

app.config["SQLALCHEMY_DATABASE_URI"] = DATABASE_URL
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# Instância do banco de dados
db = SQLAlchemy(app)
migrate = Migrate(app, db)

# Importação das models
from models import *

pages = {}

app.config["JWT_SECRET_KEY"] = "your_secret_key"
jwt = JWTManager(app)

@app.route('/api/register', methods=['POST'])
def register():
    data = request.json
    nome = data.get('nome')
    email = data.get('email')
    senha = data.get('senha')

    if not nome or not email or not senha:
        return jsonify({'error': 'Todos os campos são obrigatórios!'}), 400

    # Verifica se o email já existe
    if Usuario.query.filter_by(email=email).first():
        return jsonify({'error': 'Email já cadastrado!'}), 400

    # Hash da senha antes de salvar
    hashed_password = generate_password_hash(senha)

    novo_usuario = Usuario(nome=nome, email=email, senha=hashed_password)
    db.session.add(novo_usuario)
    db.session.commit()

    return jsonify({'message': 'Usuário cadastrado com sucesso!'}), 201

# Rota de Login
@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    senha = data.get('senha')

    if not email or not senha:
        return jsonify({'error': 'Email e senha são obrigatórios!'}), 400

    usuario = Usuario.query.filter_by(email=email).first()
    if usuario and check_password_hash(usuario.senha, senha):
        # Gerar o token JWT
        access_token = create_access_token(identity=email)
        return jsonify({'token': access_token}), 200

    return jsonify({'error': 'Email ou senha inválidos!'}), 401


#rotas para gerar urls
@app.route('/api/submit', methods=['POST'])
@jwt_required()  # Garante que a requisição é feita por um usuário logado
def submit():
    data = request.get_json()
    text = data.get('text')

    if not text:
        return jsonify({'error': 'Texto não pode ser vazio'}), 400

    # Gerar um ID único para o link
    page_id = str(uuid.uuid4())  
    
    # Verificar se o usuário está autenticado
    user_email = get_jwt_identity()  # Obtém o e-mail do usuário logado

    if not user_email:
        return jsonify({'error': 'Usuário não autenticado'}), 401

    # Salvar o link no banco de dados
    user = Usuario.query.filter_by(email=user_email).first()
    if not user:
        return jsonify({'error': 'Usuário não encontrado'}), 404

    # Criar o link no banco de dados
    new_link = Link(id=page_id, url=text, user_id=user.id)
    db.session.add(new_link)
    db.session.commit()

    # Gerar a URL do link
    frontend_url = f'https://drop-code.netlify.app/view/{page_id}'

    return jsonify({'link': frontend_url}), 200

@app.route('/api/get_text/<page_id>', methods=['GET'])
def get_text(page_id):
    # Tentar encontrar o link no banco de dados pelo ID
    link = Link.query.filter_by(id=page_id).first()

    if link:
        return jsonify({'text': link.url})  # Retorna o texto associado ao link
    else:
        return jsonify({'error': 'Página não encontrada'}), 404

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000)) 
    app.run(debug=True, host='0.0.0.0', port=port)
