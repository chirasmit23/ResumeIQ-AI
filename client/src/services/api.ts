import axios from 'axios'
import { AnalysisResponse } from '../types'

const api = axios.create({
  baseURL: '/api',
  timeout: 25000
})

export async function uploadResume(file: File) {
  const formData = new FormData()
  formData.append('resume', file)

  const response = await api.post('/upload-resume', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
  return response.data
}

export async function analyzeResume(jobDescription: string) {
  const response = await api.post<AnalysisResponse>('/analyze-resume', {
    job_description: jobDescription
  })
  return response.data
}
