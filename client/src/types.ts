export interface AnalysisResponse {
  atsScore: number
  matchedSkills: string[]
  missingSkills: string[]
  recommendations: string[]
  keywords: string[]
  resumeWords: number
  jobWords: number
}
