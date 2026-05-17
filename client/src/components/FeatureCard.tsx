interface FeatureCardProps {
  title: string
  description: string
}

export default function FeatureCard({ title, description }: FeatureCardProps) {
  return (
    <div className="rounded-3xl border border-slate-700/60 bg-slate-900/80 p-6 shadow-glass">
      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-200">{title}</p>
      <p className="mt-3 text-sm leading-6 text-slate-400">{description}</p>
    </div>
  )
}
