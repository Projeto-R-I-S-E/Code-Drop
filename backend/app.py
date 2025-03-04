from flask import Flask, request, jsonify
from flask_cors import CORS
import uuid
import os
from flask_sqlalchemy import SQLAlchemy

project_root = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
static_folder = os.path.join(project_root, 'frontend', 'dist')
template_folder = os.path.join(project_root, 'frontend', 'templates')

app = Flask(__name__, static_folder=static_folder, template_folder=template_folder)
CORS(app)

#confiuração db

pages = {}

#rotas para gerar urls
@app.route('/api/submit', methods=['POST'])
def submit():
    data = request.get_json()
    text = data.get('text')

    page_id = str(uuid.uuid4())  
    pages[page_id] = text  

    frontend_url = 'https://drop-code.netlify.app'

    return jsonify({'link': f'{frontend_url}/view/{page_id}'})  

@app.route('/api/get_text/<page_id>', methods=['GET'])
def get_text(page_id):
    text = pages.get(page_id)
    if text:
        return jsonify({'text': text})
    else:
        return jsonify({'error': 'Página não encontrada'}), 404

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000)) 
    app.run(debug=True, host='0.0.0.0', port=port)
