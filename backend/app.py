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

app.config["SQLALCHEMY_DATABASE_URI"] = 'postgresql://postgres:IYeKzDtAFjXPowhcciiLBpWNyowQoimM@caboose.proxy.rlwy.net:28835/railway'
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# Instância do banco de dados
db = SQLAlchemy(app)
migrate = Migrate(app, db)

# Importação das models
from models import *

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
@jwt_required(optional=True)  # Permite usuários logados e não logados
def submit():
    try:
        # Verifica se a requisição tem um JSON válido
        if not request.is_json:
            return jsonify({'error': 'Requisição inválida, JSON esperado'}), 400

        data = request.get_json()
        print(f"Recebido JSON: {data}")

        # Verifica se "text" foi enviado corretamente
        text = data.get('text')
        if not text:
            return jsonify({'error': 'O campo "text" é obrigatório!'}), 422  # Alterado para 422

        # Obtém o usuário logado (se houver)
        user_email = get_jwt_identity()
        user = Usuario.query.filter_by(email=user_email).first() if user_email else None

        # Gera o link único para a página no frontend
        frontend_url = 'https://drop-code.netlify.app'
        page_id = str(uuid.uuid4())  
        link = f'{frontend_url}/view/{page_id}'

        # Se o usuário estiver logado, salva no banco de dados
        if user:
            try:
                new_link = Link(url=link, user_id=user.id)
                db.session.add(new_link)
                db.session.commit()
            except Exception as db_error:
                db.session.rollback()
                print(f"Erro ao salvar no banco: {db_error}")
                return jsonify({'error': 'Erro ao salvar no banco'}), 500

        print(f"🔗 Link gerado: {link}")
        print(f"👤 Usuário logado: {user_email if user else 'Nenhum'}")

        return jsonify({'link': link})  # Retorna o link gerado

    except Exception as e:
        print(f"Erro no backend: {str(e)}")
        return jsonify({'error': 'Erro interno no servidor'}), 500

@app.route('/api/user/links', methods=['GET'])
@jwt_required()
def get_user_links():
    current_user_email = get_jwt_identity()
    user = Usuario.query.filter_by(email=current_user_email).first()

    if not user:
        return jsonify({'error': 'Usuário não encontrado'}), 404

    links = Link.query.filter_by(user_id=user.id).all()
    links_list = [{'id': link.id, 'url': link.url} for link in links]

    return jsonify({'links': links_list}) 

@app.route('/api/view/<id>', methods=['GET'])
def get_text(id):
    print(f"🔍 Buscando texto para page_id: {id}")  # Debugging

    link = Link.query.filter_by(url=f'https://drop-code.netlify.app/view/{id}').first()

    if not link:
        print("❌ Texto não encontrado!")
        return jsonify({'error': 'Texto não encontrado'}), 404

    print(f"✅ Texto encontrado: {link.text}")
    return jsonify({'text': link.text})

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000)) 
    app.run(debug=True, host='0.0.0.0', port=port)
