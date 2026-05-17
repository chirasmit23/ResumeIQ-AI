import re
from typing import List
from utils.nlp import extract_skills_from_text, extract_keywords
from services.gemini_client import request_resume_feedback

SKILL_CANDIDATES = [
    'python', 'javascript', 'sql', 'excel', 'project management', 'communication',
    'data analysis', 'machine learning', 'leadership', 'product management',
    'react', 'flask', 'django', 'aws', 'excel', 'tableau', 'jira', 'agile'
]

LATEST_RESUME_TEXT = ''
LATEST_RESUME_SKILLS: list[str] = []


def build_initial_analysis(text: str) -> dict:
    resume_skills = extract_skills_from_text(text)
    keywords = extract_keywords(text)
    return {
        'atsScore': 0,
        'matchedSkills': resume_skills,
        'missingSkills': [],
        'recommendations': [],
        'keywords': keywords,
        'resumeWords': len(re.findall(r"\w+", text)),
        'jobWords': 0
    }


def set_latest_resume(text: str) -> None:
    global LATEST_RESUME_TEXT, LATEST_RESUME_SKILLS
    LATEST_RESUME_TEXT = text
    LATEST_RESUME_SKILLS = extract_skills_from_text(text)


def analyze_job_description(job_description: str) -> dict:
    global LATEST_RESUME_SKILLS
    resume_skills = LATEST_RESUME_SKILLS

    job_skills = extract_skills_from_text(job_description)
    matched = [skill for skill in job_skills if skill in resume_skills]
    missing = [skill for skill in job_skills if skill not in resume_skills]

    score = 0
    if job_skills:
        score = round((len(matched) / len(job_skills)) * 100)

    feedback = request_resume_feedback(job_description, matched, missing)

    if not feedback:
        feedback = [
            'Update your resume with role-specific keywords from the job description.',
            'Highlight measurable results and technology experience where possible.',
            'Proofread your summary to keep it clear and concise.'
        ]

    return {
        'atsScore': score,
        'matchedSkills': matched,
        'missingSkills': missing,
        'recommendations': feedback,
        'keywords': extract_keywords(job_description),
        'resumeWords': len(re.findall(r"\w+", job_description)),
        'jobWords': len(re.findall(r"\w+", job_description))
    }
