import re
from typing import List

COMMON_SKILLS = [
    'python', 'javascript', 'sql', 'excel', 'project management', 'communication',
    'data analysis', 'machine learning', 'leadership', 'product management',
    'react', 'flask', 'django', 'aws', 'tableau', 'jira', 'agile', 'cloud', 'aws'
]


def normalize_text(text: str) -> str:
    return re.sub(r"[^a-zA-Z0-9\s]", ' ', text).lower()


def extract_skills_from_text(text: str) -> List[str]:
    content = normalize_text(text)
    skills_found = []
    for skill in COMMON_SKILLS:
        token = normalize_text(skill)
        if token in content and skill not in skills_found:
            skills_found.append(skill)
    return skills_found


def extract_keywords(text: str) -> List[str]:
    content = normalize_text(text)
    words = [word for word in content.split() if len(word) > 3]
    frequency = {}
    for word in words:
        frequency[word] = frequency.get(word, 0) + 1
    top = sorted(frequency.items(), key=lambda item: item[1], reverse=True)[:6]
    return [word for word, _ in top]
