import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useApplications } from '@/hooks/useApplications'
import { Building2, Clock, ArrowUpRight } from 'lucide-react'
import type { ApplicationStatus } from '@/features/applications/applications.types'

const statusStyles: Record<ApplicationStatus, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  reviewing: 'bg-blue-100 text-blue-800',
  accepted: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
}

const MyApplicationsPage = () => {
  const { myApplications, isLoading, fetchMyApplications } = useApplications()

  useEffect(() => {
    fetchMyApplications()
  }, [])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">My Applications</h1>
        <p className="text-muted-foreground mt-1">
          Track all your job applications
        </p>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-24 rounded-xl bg-muted animate-pulse" />
          ))}
        </div>
      ) : myApplications.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <p className="text-lg font-medium">No applications yet</p>
          <p className="text-sm text-muted-foreground mt-1">
            Start applying to jobs to track them here
          </p>
          <Link
            to="/"
            className="mt-4 text-sm text-primary hover:underline"
          >
            Browse jobs
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {myApplications.map((app) => (
            <div
              key={app._id}
              className="rounded-xl border bg-card p-5 flex items-start justify-between gap-4"
            >
              <div className="space-y-1.5 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium truncate">{app.jobTitle}</h3>
                  <Link to={`/jobs/${app.jobId}`}>
                    <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground hover:text-foreground" />
                  </Link>
                </div>
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Building2 className="h-3.5 w-3.5" />
                  {app.company}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  Applied {new Date(app.createdAt).toLocaleDateString()}
                </div>
              </div>

              <span
                className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium capitalize ${statusStyles[app.status]}`}
              >
                {app.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MyApplicationsPage