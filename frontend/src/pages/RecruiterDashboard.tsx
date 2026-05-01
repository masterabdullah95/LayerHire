import { useEffect, useState } from 'react'
import { useApplications } from '@/hooks/useApplications'
import { useJobs } from '@/hooks/useJobs'
import { useAuth } from '@/hooks/useAuth'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Building2, Users, Clock } from 'lucide-react'
import type { ApplicationStatus } from '@/features/applications/applications.types'

const statusStyles: Record<ApplicationStatus, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  reviewing: 'bg-blue-100 text-blue-800',
  accepted: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
}

const RecruiterDashboard = () => {
  const { user, isRecruiter } = useAuth()
  const { recruiterApplications, stats, fetchRecruiterApplications, fetchStats, changeStatus } =
    useApplications()
  const { fetchJobs } = useJobs()
  const [updatingId, setUpdatingId] = useState<string | null>(null)

  useEffect(() => {
    if (isRecruiter) {
      fetchRecruiterApplications()
      fetchStats()
      fetchJobs()
    }
  }, [isRecruiter])

  const handleStatusChange = async (appId: string, status: ApplicationStatus) => {
    setUpdatingId(appId)
    try {
      await changeStatus(appId, status)
      await fetchStats()              // ← re-fetch stats after every status change
    } finally {
      setUpdatingId(null)
    }
  }

  return (
    <div className="space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Welcome back, {user?.name}
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Total applications', value: stats.total, icon: Users },
          { label: 'Pending', value: stats.pending, icon: Clock },
          { label: 'Reviewing', value: stats.reviewing, icon: Building2 },
          { label: 'Accepted', value: stats.accepted, icon: Users },
        ].map(({ label, value, icon: Icon }) => (
          <div key={label} className="rounded-xl border bg-card p-5 space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">{label}</p>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="text-2xl font-semibold">{value}</p>
          </div>
        ))}
      </div>

      {/* Applications table */}
      <div className="space-y-4">
        <h2 className="text-lg font-medium">All applications</h2>

        {recruiterApplications.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border py-16 text-center">
            <p className="font-medium">No applications yet</p>
            <p className="text-sm text-muted-foreground mt-1">
              Applications will appear here once seekers apply to your jobs
            </p>
          </div>
        ) : (
          <div className="rounded-xl border overflow-hidden">
            <table className="w-full text-sm">
              <thead className="border-b bg-muted/50">
                <tr>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Applicant</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Job</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Applied</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Status</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {recruiterApplications.map((app) => (
                  <tr key={app._id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3">
                      <p className="font-medium">{app.seekerName}</p>
                      <p className="text-muted-foreground text-xs">{app.seekerEmail}</p>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{app.jobTitle}</td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {new Date(app.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${statusStyles[app.status]}`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <Select
                        defaultValue={app.status}
                        disabled={updatingId === app._id}
                        onValueChange={(v) =>
                          handleStatusChange(app._id, v as ApplicationStatus)
                        }
                      >
                        <SelectTrigger className="h-8 w-32 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="reviewing">Reviewing</SelectItem>
                          <SelectItem value="accepted">Accepted</SelectItem>
                          <SelectItem value="rejected">Rejected</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default RecruiterDashboard