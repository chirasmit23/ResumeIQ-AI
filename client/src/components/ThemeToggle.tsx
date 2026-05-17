interface ThemeToggleProps {
  theme: 'light' | 'dark'
  setTheme: (value: 'light' | 'dark') => void
}

export default function ThemeToggle({ theme, setTheme }: ThemeToggleProps) {
  const handleSwitch = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    document.body.classList.toggle('light', next === 'light')
  }

  return (
    <button
      type="button"
      onClick={handleSwitch}
      className="inline-flex items-center gap-3 rounded-full border border-slate-700/70 bg-slate-900/80 px-5 py-3 text-sm font-medium text-slate-200 transition hover:border-brand-300/50 hover:text-white"
    >
      <span>{theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</span>
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 text-brand-300">{theme === 'dark' ? '🌙' : '☀️'}</span>
    </button>
  )
}
