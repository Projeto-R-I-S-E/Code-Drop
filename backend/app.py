from flask import Flask, request, jsonify, render_template, send_from_directory
from flask_cors import CORS
import uuid
import os

project_root = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
static_folder = os.path.join(project_root, 'frontend', 'dist')
template_folder = os.path.join(project_root, 'frontend', 'templates')

app = Flask(__name__, static_folder=static_folder, template_folder=template_folder)
CORS(app)

pages = {}

# Rota de teste da API
@app.route('/api/hello', methods=['GET'])
def hello():
    return jsonify({'message': 'Teste do backend (vai sair daqui)'})

@app.route('/api/submit', methods=['POST'])
def submit():
    data = request.get_json()
    text = data.get('text')

    page_id = str(uuid.uuid4())  # Gerar um ID único para a página
    pages[page_id] = text  # Armazenar o texto

    return jsonify({'link': f'http://localhost:5173/view/{page_id}'})  # Link que o frontend vai acessar

@app.route('/api/get_text/<page_id>', methods=['GET'])
def get_text(page_id):
    text = pages.get(page_id)
    if text:
        return jsonify({'text': text})
    return jsonify({'error': 'Página não encontrada'}), 404

if __name__ == '__main__':
    app.run(debug=True, port=5000)
    