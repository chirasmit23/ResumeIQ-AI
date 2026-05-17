# Resume Analyzer + Job Matcher

A modern full-stack Resume Analyzer web app built with React, Tailwind CSS, Framer Motion, Flask, and simple NLP.

## Features

- Signup and login UI flow
- Drag-and-drop PDF upload for resume parsing
- Job description comparison and ATS match scoring
- Matched skills, missing skills, and improvement suggestions
- AI-enhanced feedback integration via Gemini API
- Responsive dark/light dashboard with animated components
- Downloadable text report

## Project Structure

- `client/` - React frontend powered by Vite and Tailwind CSS
- `server/` - Flask backend with REST endpoints and PDF parsing

## Setup

### Backend

1. Open a terminal in `server/`
2. Create a virtual environment:
   - `python -m venv venv`
3. Activate the environment:
   - Windows PowerShell: `venv\Scripts\Activate.ps1`
4. Install dependencies:
   - `pip install -r requirements.txt`
5. Create a `.env` file in `server/` based on `.env.example`
6. Run the API:
   - `python app.py`

### Frontend

1. Open a terminal in `client/`
2. Install node modules:
   - `npm install`
3. Start the app:
   - `npm run dev`
4. Open the local URL shown in the terminal (default `http://localhost:3000`)

## API Endpoints

- `GET /api/health` - API health check
- `POST /api/upload-resume` - Upload a PDF resume
- `POST /api/analyze-resume` - Analyze the job description against the uploaded resume

## Environment Variables

Create `server/.env` with:

```env
GEMINI_API_KEY=your_openai_or_gemini_api_key_here
```

## Notes

- The frontend proxy forwards `/api` requests to `http://127.0.0.1:5000` during local development
- The backend stores resume text in memory for demo analysis
- Gemini API is used only for generating suggestions when the API key is configured

## Render Single-Service Deployment

This repo can deploy as a single Render web service. The Flask app serves the built React frontend from `client/dist`, while API routes remain available under `/api`.

### Render setup

1. Push your repo to GitHub.
2. Create a new Render web service and connect the repo.
3. Set the root directory to the repo root.
4. Configure the build command:

```bash
cd client && npm install && npm run build
cd ../server && python -m pip install -r requirements.txt
```

5. Configure the start command:

```bash
cd server && python app.py
```

6. Add the environment variable on Render:

```text
GEMINI_API_KEY=<your-api-key>
```

### How it works

- The Flask app serves frontend assets from `client/dist`
- API requests still use `/api/*`
- No cross-domain proxy configuration is required in production



https://github.com/user-attachments/assets/f2354751-b212-45a2-8fa2-529fa6a8994f


