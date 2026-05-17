import { motion } from 'framer-motion'
import { Pie, PieChart, ResponsiveContainer, Cell } from 'recharts'
import { AnalysisResponse } from '../types'

interface ResultsDashboardProps {
  analysis: AnalysisResponse
  onReset: () => void
}

const chartData = (score: number) => [
  { name: 'Match', value: score },
  { name: 'Gap', value: 100 - score }
]

const colors = ['#3b82f6', '#334155']

export default function ResultsDashboard({ analysis, onReset }: ResultsDashboardProps) {
  const { atsScore, matchedSkills, missingSkills, recommendations, keywords, resumeWords, jobWords } = analysis

  const downloadReport = () => {
    const content = `ATS Score: ${atsScore}%\nMatched Skills: ${matchedSkills.join(', ')}\nMissing Skills: ${missingSkills.join(', ')}\n\nRecommendations:\n- ${recommendations.join('\n- ')}\n\nTop keywords:\n- ${keywords.join('\n- ')}`
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = 'resume-analysis-report.txt'
    link.click()
    URL.revokeObjectURL(link.href)
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-[2rem] border border-slate-700/60 bg-slate-950/70 p-8 shadow-glass backdrop-blur-xl"
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-brand-300">Analysis results</p>
          <h2 className="mt-3 text-3xl font-semibold">ATS match dashboard</h2>
          <p className="mt-2 text-slate-400">Review matched and missing skills, plus actionable resume improvement suggestions.</p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button type="button" onClick={downloadReport} className="rounded-full bg-brand-400 px-6 py-3 font-semibold text-slate-950 transition hover:bg-brand-300">
            Download report
          </button>
          <button type="button" onClick={onReset} className="rounded-full border border-slate-600 px-6 py-3 text-slate-200 transition hover:border-brand-300">
            Reset analysis
          </button>
        </div>
      </div>

      <div className="mt-10 grid gap-8 xl:grid-cols-[0.75fr_1fr]">
        <div className="grid gap-6">
          <div className="rounded-3xl border border-slate-700/70 bg-slate-900/80 p-6 shadow-glass">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm text-slate-400">ATS Score</p>
                <p className="mt-2 text-4xl font-semibold text-white">{atsScore}%</p>
              </div>
              <div className="h-32 w-32">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={chartData(atsScore)} innerRadius={38} outerRadius={52} dataKey="value">
                      {chartData(atsScore).map((entry, index) => (
                        <Cell key={entry.name} fill={colors[index]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="rounded-3xl bg-slate-950/70 p-4">
                <p className="text-sm text-slate-400">Resume words</p>
                <p className="mt-2 text-lg font-semibold">{resumeWords}</p>
              </div>
              <div className="rounded-3xl bg-slate-950/70 p-4">
                <p className="text-sm text-slate-400">Job description words</p>
                <p className="mt-2 text-lg font-semibold">{jobWords}</p>
              </div>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-slate-700/70 bg-slate-900/80 p-6 shadow-glass">
              <h3 className="text-lg font-semibold">Matched skills</h3>
              <p className="mt-3 text-sm text-slate-400">Skills your resume already highlights well.</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {matchedSkills.map((skill) => (
                  <span key={skill} className="rounded-full bg-brand-500/15 px-3 py-1 text-xs text-brand-100">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="rounded-3xl border border-slate-700/70 bg-slate-900/80 p-6 shadow-glass">
              <h3 className="text-lg font-semibold">Missing skills</h3>
              <p className="mt-3 text-sm text-slate-400">Key skills to add when tailoring to this role.</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {missingSkills.map((skill) => (
                  <span key={skill} className="rounded-full bg-rose-500/15 px-3 py-1 text-xs text-rose-200">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-700/70 bg-slate-900/80 p-6 shadow-glass">
            <h3 className="text-lg font-semibold">Improvement suggestions</h3>
            <ul className="mt-5 space-y-3 text-sm text-slate-300">
              {recommendations.map((item, index) => (
                <li key={`${item}-${index}`} className="rounded-2xl bg-slate-950/60 p-4">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-slate-700/70 bg-slate-900/80 p-6 shadow-glass">
            <h3 className="text-lg font-semibold">Top keywords</h3>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {keywords.map((keyword) => (
                <span key={keyword} className="rounded-2xl bg-slate-950/60 px-4 py-3 text-sm text-slate-200">
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
