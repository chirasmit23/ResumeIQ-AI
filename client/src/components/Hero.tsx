import { motion } from 'framer-motion'
import FeatureCard from './FeatureCard'

const features = [
  { title: 'Fast ATS scoring', description: 'Instant match rate for resume vs job description.' },
  { title: 'Skill analysis', description: 'See missing and matched skills clearly.' },
  { title: 'AI suggestions', description: 'Receive professional resume feedback.' }
]

export default function Hero() {
  return (
    <section className="grid gap-8 rounded-[2rem] border border-slate-700/60 bg-slate-950/70 p-8 shadow-glass backdrop-blur-xl lg:grid-cols-[0.85fr_0.4fr]">
      <div className="space-y-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <span className="inline-flex rounded-full bg-brand-500/10 px-4 py-2 text-sm font-semibold text-brand-100">AI Resume & ATS Match</span>
          <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">Turn your resume into a job-winning asset.</h2>
          <p className="mt-3 max-w-2xl text-slate-400">Use a modern resume analyzer to check your resume against job listings, get a clear score, and learn how to improve your profile.</p>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-3">
          {features.map((feature) => (
            <FeatureCard key={feature.title} title={feature.title} description={feature.description} />
          ))}
        </div>
      </div>

      <motion.div initial={{ scale: 0.96, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.6 }} className="rounded-[1.75rem] bg-gradient-to-br from-slate-900 to-slate-950 p-6 shadow-xl shadow-slate-950/20">
        <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Dashboard preview</p>
          <div className="mt-8 space-y-4">
            <div className="rounded-3xl bg-slate-800/90 p-4">
              <p className="text-sm text-slate-400">Resume score</p>
              <p className="mt-2 text-3xl font-semibold text-white">82%</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-3xl bg-slate-800/90 p-4">
                <p className="text-sm text-slate-400">Matched skills</p>
                <p className="mt-2 font-semibold text-white">7/10</p>
              </div>
              <div className="rounded-3xl bg-slate-800/90 p-4">
                <p className="text-sm text-slate-400">Feedback</p>
                <p className="mt-2 font-semibold text-white">Strong profile</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
