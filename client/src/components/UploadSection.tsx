import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { uploadResume } from '../services/api'
import Spinner from './Spinner'

interface UploadSectionProps {
  fileName: string
  setFileName: (value: string) => void
  setLoading: (value: boolean) => void
  setAnalysis: (value: any) => void
  setError: (value: string) => void
}

export default function UploadSection({ fileName, setFileName, setLoading, setAnalysis, setError }: UploadSectionProps) {
  const [progress, setProgress] = useState(0)

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setError('')
    if (!acceptedFiles.length) {
      setError('Please upload a PDF file only.')
      return
    }

    const file = acceptedFiles[0]
    setFileName(file.name)
    setLoading(true)
    setProgress(10)

    try {
      const data = await uploadResume(file)
      setProgress(100)
      setAnalysis(data)
    } catch (err) {
      setError('Could not upload resume. Please try again.')
    } finally {
      setLoading(false)
      setTimeout(() => setProgress(0), 500)
    }
  }, [setAnalysis, setError, setFileName, setLoading])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: { 'application/pdf': ['.pdf'] }
  })

  return (
    <section className="rounded-[2rem] border border-slate-700/60 bg-slate-950/70 p-8 shadow-glass backdrop-blur-xl">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-brand-300">Resume Upload</p>
          <h2 className="mt-3 text-2xl font-semibold">Upload your PDF resume</h2>
        </div>
      </div>

      <div
        {...getRootProps()}
        className="mt-8 flex h-56 flex-col items-center justify-center gap-3 rounded-3xl border-2 border-dashed border-brand-500/40 bg-slate-900/70 px-6 text-center transition hover:border-brand-300/80"
      >
        <input {...getInputProps()} />
        <p className="text-sm text-slate-400">Drag & drop a PDF here, or click to select a file.</p>
        <p className="text-xs text-slate-500">Only PDF resumes are supported.</p>
      </div>

      {fileName ? (
        <div className="mt-6 rounded-3xl border border-slate-700/50 bg-slate-900/80 p-4">
          <p className="text-sm text-slate-400">Selected file</p>
          <p className="mt-2 font-semibold text-white">{fileName}</p>
          <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-800">
            <div className="h-full rounded-full bg-brand-400 transition-all" style={{ width: `${progress}%` }} />
          </div>
        </div>
      ) : null}

      <div className="mt-6">
        <p className="text-sm text-slate-400">Upload progress and analysis are handled on the server so you can get accurate skill insights.</p>
        {isDragActive ? <p className="mt-3 text-sm text-brand-200">Drop your resume to start.</p> : null}
      </div>

      {progress > 0 && progress < 100 ? (
        <div className="mt-6">
          <Spinner />
        </div>
      ) : null}
    </section>
  )
}
