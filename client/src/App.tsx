import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Hero from './components/Hero'
import UploadSection from './components/UploadSection'
import JobDescription from './components/JobDescription'
import ResultsDashboard from './components/ResultsDashboard'
import ThemeToggle from './components/ThemeToggle'
import AuthPanel from './components/AuthPanel'
import { useLocalStorage } from './hooks/useLocalStorage'
import { AnalysisResponse } from './types'

function App() {
  const [jobDescription, setJobDescription] = useState('')
  const [analysis, setAnalysis] = useState<AnalysisResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [fileName, setFileName] = useState('')
  const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('resume-analyzer-theme', 'dark')
  const [user, setUser] = useLocalStorage<string | null>('resume-analyzer-user', null)
  const [error, setError] = useState('')

  const isReady = useMemo(() => !!analysis || !!fileName, [analysis, fileName])

  useEffect(() => {
    document.body.classList.toggle('light', theme === 'light')
  }, [theme])

  const handleReset = () => {
    setAnalysis(null)
    setJobDescription('')
    setFileName('')
    setError('')
  }

  const handleAuthenticate = (name: string) => {
    setUser(name)
  }

  if (!user) {
    return (
      <div className={theme === 'dark' ? 'min-h-screen bg-slate-950 text-slate-100' : 'min-h-screen bg-slate-50 text-slate-950'}>
        <div className="mx-auto flex min-h-screen items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
          <AuthPanel onAuthenticate={handleAuthenticate} />
        </div>
      </div>
    )
  }

  return (
    <div className={theme === 'dark' ? 'min-h-screen bg-slate-950 text-slate-100' : 'min-h-screen bg-slate-50 text-slate-900'}>
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-8 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-brand-300">Resume Analyzer</p>
            <h1 className="mt-3 text-4xl font-semibold sm:text-5xl">Modern ATS resume feedback and job match dashboard</h1>
            <p className="mt-4 max-w-2xl text-slate-400">Upload your resume, paste a job description, and receive fast analysis with AI improvements and skill matching.</p>
          </div>
          <div className="flex items-center gap-4">
            <p className="text-sm text-slate-400">Signed in as {user}</p>
            <ThemeToggle theme={theme} setTheme={setTheme} />
          </div>
        </header>

        <Hero />

        <div className="grid gap-8 xl:grid-cols-[1.2fr_0.8fr]">
          <UploadSection
            fileName={fileName}
            setFileName={setFileName}
            setLoading={setLoading}
            setAnalysis={setAnalysis}
            setError={setError}
          />

          <JobDescription
            jobDescription={jobDescription}
            setJobDescription={setJobDescription}
            setLoading={setLoading}
            loading={loading}
            setAnalysis={setAnalysis}
            setError={setError}
            fileName={fileName}
          />
        </div>

        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="rounded-3xl border border-slate-700/60 bg-slate-900/60 p-8 shadow-glass backdrop-blur-xl"
            >
              <p className="text-lg font-medium">Analyzing your resume and job description...</p>
              <p className="mt-2 text-slate-400">This may take a few seconds while our backend generates a score and recommendations.</p>
            </motion.div>
          )}
        </AnimatePresence>

        {error ? (
          <div className="rounded-3xl border border-rose-500/30 bg-rose-500/10 p-6 text-rose-100 shadow-glass">
            <p className="font-semibold">Error</p>
            <p className="mt-2 text-sm text-rose-100/90">{error}</p>
          </div>
        ) : null}

        {analysis ? (
          <ResultsDashboard analysis={analysis} onReset={handleReset} />
        ) : isReady ? (
          <div className="rounded-3xl border border-slate-700/60 bg-slate-900/60 p-8 shadow-glass">
            <p className="text-slate-300">Upload a resume and paste a job description to generate your first report.</p>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default App
