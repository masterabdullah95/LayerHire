import { useState, useEffect } from 'react'
import { useApplications } from '@/hooks/useApplications'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'

interface Props {
  jobId: string
  jobTitle: string
  company: string
  open: boolean
  onClose: () => void
}

const ApplyModal = ({ jobId, jobTitle, company, open, onClose }: Props) => {
  const { applyToJob } = useApplications()
  const { user } = useAuth()
  const [coverLetter, setCoverLetter] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  // Reset state when modal opens
  useEffect(() => {
    if (open) {
      setCoverLetter('')
      setError('')
      setSuccess(false)
    }
  }, [open])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (coverLetter.trim().length < 50) {
      setError('Cover letter must be at least 50 characters')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      await applyToJob({ jobId, coverLetter })
      setSuccess(true)
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Failed to submit application'
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Apply for {jobTitle}</DialogTitle>
          <DialogDescription>{company}</DialogDescription>
        </DialogHeader>

        {success ? (
          <div className="flex flex-col items-center gap-3 py-6 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600 text-2xl">
              ✓
            </div>
            <p className="font-medium">Application submitted!</p>
            <p className="text-sm text-muted-foreground">
              We've sent your application to {company}. You can track its
              status in your dashboard.
            </p>
            <Button className="mt-2" onClick={onClose}>
              Close
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            {/* Applicant info */}
            <div className="rounded-lg bg-muted px-4 py-3 text-sm space-y-0.5">
              <p className="font-medium">{user?.name}</p>
              <p className="text-muted-foreground">{user?.email}</p>
            </div>

            {/* Cover letter */}
            <div className="space-y-1.5">
              <Label htmlFor="coverLetter">
                Cover letter
                <span className="ml-1 text-muted-foreground font-normal">
                  ({coverLetter.length}/2000)
                </span>
              </Label>
              <Textarea
                id="coverLetter"
                placeholder="Tell the recruiter why you're a great fit for this role..."
                className="min-h-36 resize-none"
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value.slice(0, 2000))}
                required
              />
            </div>

            {error && <p className="text-sm text-destructive">{error}</p>}

            <div className="flex gap-3 pt-1">
              <Button type="submit" className="flex-1" disabled={isLoading}>
                {isLoading ? 'Submitting...' : 'Submit application'}
              </Button>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default ApplyModal