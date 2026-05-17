import { useState } from 'react'
import { analyzeResume } from '../services/api'
import Spinner from './Spinner'

interface JobDescriptionProps {
  jobDescription: string
  setJobDescription: (value: string) => void
  setLoading: (value: boolean) => void
  loading: boolean
  setAnalysis: (value: any) => void
  setError: (value: string) => void
  fileName: string
}

const exampleJob = `Senior Product Manager with experience in product roadmaps, stakeholder communication, SQL, analytics, and agile delivery.`

export default function JobDescription({ jobDescription, setJobDescription, setLoading, loading, setAnalysis, setError, fileName }: JobDescriptionProps) {
  const [submitted, setSubmitted] = useState(false)

  const handleAnalyze = async () => {
    setError('')
    if (!jobDescription.trim()) {
      setError('Please paste a job description to analyze.')
      return
    }
    if (!fileName) {
      setError('Please upload a resume before analyzing a job description.')
      return
    }

    setLoading(true)
    setSubmitted(true)

    try {
      const response = await analyzeResume(jobDescription)
      setAnalysis(response)
    } catch (err) {
      setError('Failed to analyze the job description. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="rounded-[2rem] border border-slate-700/60 bg-slate-950/70 p-8 shadow-glass backdrop-blur-xl">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-brand-300">Job description</p>
          <h2 className="mt-3 text-2xl font-semibold">Compare resume to your target role</h2>
        </div>
      </div>

      <textarea
        value={jobDescription}
        onChange={(event) => setJobDescription(event.target.value)}
        placeholder={exampleJob}
        rows={12}
        className="mt-8 w-full rounded-3xl border border-slate-700/70 bg-slate-900/80 p-5 text-sm text-slate-200 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-400/20"
      />

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="rounded-3xl bg-slate-900/80 p-4 text-sm text-slate-400">
          <p className="font-semibold text-slate-200">Smart analysis ready</p>
          <p className="mt-1">Paste any job description and see the matched skills instantly.</p>
        </div>

        <button
          type="button"
          onClick={handleAnalyze}
          className="inline-flex items-center justify-center rounded-full bg-brand-400 px-6 py-4 font-semibold text-slate-950 transition hover:bg-brand-300"
        >
          {submitted ? 'Re-run analysis' : 'Analyze now'}
        </button>
      </div>

      {!fileName ? (
        <p className="mt-4 text-sm text-rose-300">Upload a resume first to enable analysis.</p>
      ) : null}

      {submitted && !loading ? (
        <div className="mt-5 rounded-3xl border border-slate-700/60 bg-slate-900/80 p-4 text-sm text-slate-400">
          Ready to review your match data.
        </div>
      ) : null}

      {loading ? (
        <div className="mt-6">
          <Spinner />
        </div>
      ) : null}
    </section>
  )
}
