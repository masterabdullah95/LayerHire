import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useJobs } from '@/hooks/useJobs'
import { useAuth } from '@/hooks/useAuth'
import { useApplications } from '@/hooks/useApplications'
import ApplyModal from '@/features/applications/ApplyModal'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { MapPin, Briefcase, BadgeDollarSign, Clock, Building2, ArrowLeft } from 'lucide-react'



const formatSalary = (min: number, max: number) =>
  `$${min.toLocaleString()} — $${max.toLocaleString()}`

const JobDetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { selectedJob: job, isLoading, fetchJobById } = useJobs()
  const { isAuthenticated, isSeeker } = useAuth()
  const { checkHasApplied } = useApplications()
  const [applyOpen, setApplyOpen] = useState(false)
  const [hasApplied, setHasApplied] = useState(false)

  useEffect(() => {
    
    if (id) fetchJobById(id)
      
  }, [id])

  useEffect(() => {
    if (id && isSeeker) {
      checkHasApplied(id).then(setHasApplied)
    }
  }, [id, isSeeker])

  if (isLoading) {
    return (
      <div className="mx-auto max-w-3xl space-y-4">
        <div className="h-8 w-64 rounded-lg bg-muted animate-pulse" />
        <div className="h-64 rounded-xl bg-muted animate-pulse" />
      </div>
    )
  }

  if (!job) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <p className="text-lg font-medium">Job not found</p>
        <Button variant="outline" className="mt-4 cursor-pointer" onClick={() => navigate('/')}>
          Back to jobs
        </Button>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">

      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to jobs
      </button>

      <div className="rounded-xl border bg-card p-6 space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">{job.title}</h1>
            <div className="flex items-center gap-1.5 mt-1 text-muted-foreground">
              <Building2 className="h-4 w-4" />
              <span>{job.company}</span>
            </div>
          </div>
          <Badge className="capitalize shrink-0">{job.type}</Badge>
        </div>

        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <MapPin className="h-4 w-4" />{job.location}
          </span>
          <span className="flex items-center gap-1.5">
            <BadgeDollarSign className="h-4 w-4" />
            {formatSalary(job.salaryMin, job.salaryMax)}
          </span>
          <span className="flex items-center gap-1.5">
            <Briefcase className="h-4 w-4" />
            <span className="capitalize">{job.experienceLevel} level</span>
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            Posted {new Date(job.createdAt).toLocaleDateString()}
          </span>
        </div>

        <Separator />

        {/* Apply button — role aware */}
        {!isAuthenticated && (
          <Button size="lg" onClick={() => navigate('/login')}>
            Sign in to apply
          </Button>
        )}
        {isSeeker && (
          <Button
            size="lg"
            disabled={hasApplied}
            onClick={() => setApplyOpen(true)}
          >
            {hasApplied ? 'Already applied' : 'Apply for this position'}
          </Button>
        )}
      </div>

      <div className="rounded-xl border bg-card p-6 space-y-3">
        <h2 className="font-semibold text-lg">Job description</h2>
        <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
          {job.description}
        </p>
      </div>

      {job.requirements.length > 0 && (
        <div className="rounded-xl border bg-card p-6 space-y-3">
          <h2 className="font-semibold text-lg">Requirements & skills</h2>
          <div className="flex flex-wrap gap-2">
            {job.requirements.map((req) => (
              <Badge key={req} variant="secondary">{req}</Badge>
            ))}
          </div>
        </div>
      )}

      <div className="rounded-xl border bg-card p-6">
        <p className="text-sm text-muted-foreground">
          Posted by{' '}
          <span className="font-medium text-foreground">{job.recruiterName}</span>
        </p>
      </div>

      {/* Apply Modal */}
      <ApplyModal
        jobId={job._id}
        jobTitle={job.title}
        company={job.company}
        open={applyOpen}
        onClose={() => {
          setApplyOpen(false)
          if (id) checkHasApplied(id).then(setHasApplied)
        }}
      />
    </div>
  )
}

export default JobDetailPage