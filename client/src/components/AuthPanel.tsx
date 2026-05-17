import { FormEvent, useState } from 'react'

interface AuthPanelProps {
  onAuthenticate: (name: string) => void
}

export default function AuthPanel({ onAuthenticate }: AuthPanelProps) {
  const [isSignup, setIsSignup] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!email || !password || (isSignup && !name)) {
      setError('Please complete all fields.')
      return
    }

    setError('')
    onAuthenticate(isSignup ? name : email.split('@')[0])
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-xl rounded-[2rem] border border-slate-700/60 bg-slate-950/80 p-8 shadow-glass backdrop-blur-xl"
    >
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-brand-300">Welcome</p>
          <h1 className="mt-2 text-3xl font-semibold">{isSignup ? 'Create your account' : 'Login to Resume Analyzer'}</h1>
        </div>
        <button
          type="button"
          onClick={() => setIsSignup(!isSignup)}
          className="rounded-full border border-slate-700/60 px-4 py-2 text-sm text-slate-200 transition hover:border-brand-300"
        >
          {isSignup ? 'Switch to login' : 'New user? Sign up'}
        </button>
      </div>

      <div className="space-y-4">
        {isSignup ? (
          <label className="block text-sm text-slate-300">
            Full name
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="mt-2 w-full rounded-3xl border border-slate-700/60 bg-slate-900/80 px-4 py-3 text-sm text-slate-100 outline-none focus:border-brand-400"
            />
          </label>
        ) : null}

        <label className="block text-sm text-slate-300">
          Email address
          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            type="email"
            className="mt-2 w-full rounded-3xl border border-slate-700/60 bg-slate-900/80 px-4 py-3 text-sm text-slate-100 outline-none focus:border-brand-400"
          />
        </label>

        <label className="block text-sm text-slate-300">
          Password
          <input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            className="mt-2 w-full rounded-3xl border border-slate-700/60 bg-slate-900/80 px-4 py-3 text-sm text-slate-100 outline-none focus:border-brand-400"
          />
        </label>
      </div>

      {error ? <p className="mt-4 text-sm text-rose-300">{error}</p> : null}

      <button
        type="submit"
        className="mt-6 w-full rounded-full bg-brand-400 px-6 py-4 font-semibold text-slate-950 transition hover:bg-brand-300"
      >
        {isSignup ? 'Create account' : 'Login'}
      </button>
    </form>
  )
}
