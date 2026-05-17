import os
from flask import Blueprint, current_app, jsonify, request
from werkzeug.utils import secure_filename
from services.pdf_parser import extract_text_from_pdf
from services.analyzer import build_initial_analysis, set_latest_resume
from utils.response import error_response

upload_bp = Blueprint('upload', __name__)

ALLOWED_EXTENSIONS = {'pdf'}


def allowed_file(filename: str) -> bool:
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@upload_bp.route('/upload-resume', methods=['POST'])
def upload_resume():
    if 'resume' not in request.files:
        return error_response('Resume file is required', 400)

    file = request.files['resume']

    if file.filename == '':
        return error_response('A valid PDF is required', 400)

    if not allowed_file(file.filename):
        return error_response('Only PDF files are supported', 400)

    filename = secure_filename(file.filename)
    save_path = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)
    file.save(save_path)

    text = extract_text_from_pdf(save_path)
    set_latest_resume(text)
    analysis = build_initial_analysis(text)

    return jsonify(analysis)
