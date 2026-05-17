import os
import requests
from config import Config

GEMINI_ENDPOINT = 'https://api.openai.com/v1/chat/completions'


def request_resume_feedback(job_description: str, matched: list[str], missing: list[str]) -> list[str]:
    api_key = Config.GEMINI_API_KEY
    if not api_key:
        return []

    prompt = (
        f'Analyze the following job description and provide three concise resume improvement bullet points. '
        f'Highlight how a candidate should emphasize matched skills: {matched}. '
        f'Also recommend missing skills: {missing}. '
        f'Job description: {job_description}'
    )

    headers = {
        'Authorization': f'Bearer {api_key}',
        'Content-Type': 'application/json'
    }

    body = {
        'model': 'gpt-4o-mini',
        'messages': [
            {'role': 'system', 'content': 'You are a helpful resume and ATS assistant.'},
            {'role': 'user', 'content': prompt}
        ],
        'max_tokens': 180,
        'temperature': 0.7
    }

    try:
        response = requests.post(GEMINI_ENDPOINT, headers=headers, json=body, timeout=20)
        response.raise_for_status()
        data = response.json()
        message = data.get('choices', [])[0].get('message', {}).get('content', '')
        return [line.strip() for line in message.split('\n') if line.strip()][:5]
    except Exception:
        return []
