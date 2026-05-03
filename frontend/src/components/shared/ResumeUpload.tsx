import { useCallback, useEffect, useRef, useState } from 'react'
import {
  Upload,
  FileText,
  Trash2,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  Loader2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { uploadResume, getResumeUrl, deleteResume } from '@/lib/resume.api'

const ACCEPTED = '.pdf,.docx'
const MAX_MB = 5
const MAX_BYTES = MAX_MB * 1024 * 1024

type Status = 'idle' | 'loading' | 'uploading' | 'success' | 'error'

interface ResumeUploadProps {
  /** Called with the new public URL after a successful upload */
  onUpload?: (url: string) => void
  /** Called after a successful delete */
  onDelete?: () => void
}

const ResumeUpload = ({ onUpload, onDelete }: ResumeUploadProps) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [status, setStatus] = useState<Status>('loading')
  const [resumeUrl, setResumeUrl] = useState<string | null>(null)
  const [fileName, setFileName] = useState<string | null>(null)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  // Fetch existing resume on mount
  useEffect(() => {
    getResumeUrl()
      .then((url) => {
        setResumeUrl(url)
        if (url) {
          // Extract filename from URL path
          const parts = url.split('/')
          setFileName(parts[parts.length - 1].replace(/^\d+-[^-]+-/, '') ?? 'resume')
        }
        setStatus('idle')
      })
      .catch(() => setStatus('idle'))
  }, [])

  const handleError = (msg: string) => {
    setErrorMsg(msg)
    setStatus('error')
  }

  const processFile = useCallback(async (file: File) => {
    setErrorMsg(null)

    // Client-side validations
    if (!['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.type)) {
      handleError('Only PDF and DOCX files are accepted.')
      return
    }
    if (file.size > MAX_BYTES) {
      handleError(`File must be under ${MAX_MB} MB.`)
      return
    }

    setStatus('uploading')
    setUploadProgress(0)

    // Simulate progress for UX (real progress needs XHR / axios onUploadProgress)
    const ticker = setInterval(() => {
      setUploadProgress((p) => (p < 85 ? p + 12 : p))
    }, 180)

    try {
      const { resumeUrl: url } = await uploadResume(file)
      clearInterval(ticker)
      setUploadProgress(100)
      setResumeUrl(url)
      setFileName(file.name)
      setStatus('success')
      onUpload?.(url)
      // Reset to idle after showing success tick
      setTimeout(() => setStatus('idle'), 2500)
    } catch (err: unknown) {
      clearInterval(ticker)
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ??
        'Upload failed. Please try again.'
      handleError(message)
    }
  }, [onUpload])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) processFile(file)
    // Reset input so same file can be re-selected
    e.target.value = ''
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file) processFile(file)
  }

  const handleDelete = async () => {
    setStatus('loading')
    try {
      await deleteResume()
      setResumeUrl(null)
      setFileName(null)
      setStatus('idle')
      onDelete?.()
    } catch {
      handleError('Failed to delete resume. Please try again.')
    }
  }

  const isUploading = status === 'uploading'
  const isLoading = status === 'loading'

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium">Resume</p>
          <p className="text-xs text-muted-foreground">PDF or DOCX · Max {MAX_MB} MB</p>
        </div>
        {resumeUrl && !isUploading && (
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="gap-1.5 text-xs text-muted-foreground"
            >
              <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-3.5 w-3.5" />
                View
              </a>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDelete}
              disabled={isLoading}
              className="gap-1.5 text-xs text-destructive hover:text-destructive"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Remove
            </Button>
          </div>
        )}
      </div>

      {/* Drop zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => !isUploading && !isLoading && inputRef.current?.click()}
        className={`relative flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed p-8 text-center transition-colors cursor-pointer
          ${isDragging ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50 hover:bg-muted/30'}
          ${isUploading || isLoading ? 'pointer-events-none opacity-70' : ''}
        `}
      >
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPTED}
          onChange={handleFileChange}
          className="hidden"
        />

        {/* State: loading existing resume */}
        {isLoading && (
          <>
            <Loader2 className="h-8 w-8 text-muted-foreground animate-spin" />
            <p className="text-sm text-muted-foreground">Loading...</p>
          </>
        )}

        {/* State: uploading */}
        {isUploading && (
          <div className="w-full space-y-3">
            <Loader2 className="h-8 w-8 text-primary animate-spin mx-auto" />
            <p className="text-sm font-medium">Uploading...</p>
            <div className="w-full h-1.5 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground">{uploadProgress}%</p>
          </div>
        )}

        {/* State: success flash */}
        {status === 'success' && (
          <>
            <CheckCircle className="h-8 w-8 text-green-500" />
            <p className="text-sm font-medium text-green-600">Uploaded successfully!</p>
            <p className="text-xs text-muted-foreground">{fileName}</p>
          </>
        )}

        {/* State: has existing resume (idle) */}
        {status === 'idle' && resumeUrl && (
          <>
            <div className="rounded-full bg-primary/10 p-3">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <div className="space-y-0.5">
              <p className="text-sm font-medium truncate max-w-xs">{fileName ?? 'resume'}</p>
              <p className="text-xs text-muted-foreground">Click to replace</p>
            </div>
          </>
        )}

        {/* State: no resume yet (idle) */}
        {status === 'idle' && !resumeUrl && (
          <>
            <div className="rounded-full bg-muted p-3">
              <Upload className="h-6 w-6 text-muted-foreground" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">
                Drop your resume here, or{' '}
                <span className="text-primary underline underline-offset-2">browse</span>
              </p>
              <p className="text-xs text-muted-foreground">PDF or DOCX up to {MAX_MB} MB</p>
            </div>
          </>
        )}

        {/* State: error */}
        {status === 'error' && (
          <>
            <div className="rounded-full bg-destructive/10 p-3">
              <AlertCircle className="h-6 w-6 text-destructive" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-destructive">{errorMsg}</p>
              <p className="text-xs text-muted-foreground">Click to try again</p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default ResumeUpload
