import os
from pathlib import Path
from flask import Flask, send_from_directory
from flask_cors import CORS
from config import Config
from routes.upload import upload_bp
from routes.analyze import analyze_bp
from routes.health import health_bp

build_dir = Path(__file__).resolve().parents[1] / 'client' / 'dist'
app = Flask(__name__, static_folder=str(build_dir), static_url_path='')
app.config.from_object(Config)
app.config['UPLOAD_FOLDER'] = Config.UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = Config.MAX_CONTENT_LENGTH
CORS(app, resources={r"/api/*": {"origins": "*"}})

# Ensure upload folder exists
Path(app.config['UPLOAD_FOLDER']).mkdir(parents=True, exist_ok=True)

app.register_blueprint(health_bp, url_prefix='/api')
app.register_blueprint(upload_bp, url_prefix='/api')
app.register_blueprint(analyze_bp, url_prefix='/api')

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_frontend(path: str):
    if path and (build_dir / path).exists():
        return send_from_directory(app.static_folder, path)
    return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
