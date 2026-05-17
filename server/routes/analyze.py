from flask import Blueprint, jsonify, request
from services.analyzer import analyze_job_description
from utils.response import error_response

analyze_bp = Blueprint('analyze', __name__)


@analyze_bp.route('/analyze-resume', methods=['POST'])
def analyze_resume():
    payload = request.get_json() or {}
    job_description = payload.get('job_description', '').strip()

    if not job_description:
        return error_response('Job description is required', 400)

    try:
        result = analyze_job_description(job_description)
        return jsonify(result)
    except Exception as exc:
        return error_response(str(exc), 500)
