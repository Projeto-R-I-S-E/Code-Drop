from flask import Flask, request, jsonify
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

    page_id = str(uuid.uuid4())  
    pages[page_id] = text  

    backend_url = 'code-drop-production.up.railway.app'

    return jsonify({'link': f'{backend_url}/view/{page_id}'})  

@app.route('/api/get_text/<page_id>', methods=['GET'])
def get_text(page_id):
    text = pages.get(page_id)
    if text:
        return jsonify({'text': text})
    return jsonify({'error': 'Página não encontrada'}), 404

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000)) 
    app.run(debug=True, host='0.0.0.0', port=port)

    