import os
from pathlib import Path
from flask import Flask, send_from_directory
from flask_cors import CORS
from config import Config
from routes.upload import upload_bp
from routes.analyze import analyze_bp
from routes.health import health_bp


server_dir = Path(__file__).resolve().parent
project_root = server_dir.parent
build_dir = project_root / 'client' / 'dist'

if not build_dir.exists():
    print(f"Warning: {build_dir} does not exist. Static files won't be served.")
    build_dir = server_dir 

app = Flask(__name__, static_folder=str(build_dir), static_url_path='')
app.config.from_object(Config)
app.config['UPLOAD_FOLDER'] = Config.UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = Config.MAX_CONTENT_LENGTH
CORS(app, resources={r"/api/*": {"origins": "*"}})

Path(app.config['UPLOAD_FOLDER']).mkdir(parents=True, exist_ok=True)

app.register_blueprint(health_bp, url_prefix='/api')
app.register_blueprint(upload_bp, url_prefix='/api')
app.register_blueprint(analyze_bp, url_prefix='/api')

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_frontend(path: str):
    file_path = build_dir / path
    if path and file_path.exists() and file_path.is_file():
        return send_from_directory(str(build_dir), path)
    return send_from_directory(str(build_dir), 'index.html')

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)
