import { useEffect } from 'react'
import { useApplications } from '@/hooks/useApplications'
import { useAuth } from '@/hooks/useAuth'
import { Building2, Users, Clock, UserCircle } from 'lucide-react'
import type { ApplicationStatus } from '@/features/applications/applications.types'

const statusStyles: Record<ApplicationStatus, string> = {
  pending:   'bg-yellow-100 text-yellow-800',
  reviewing: 'bg-blue-100 text-blue-800',
  accepted:  'bg-green-100 text-green-800',
  rejected:  'bg-red-100 text-red-800',
}

const SeekerDashboard = () => {
  const { user } = useAuth()
  const { myApplications, fetchMyApplications } = useApplications()

  useEffect(() => {
    fetchMyApplications()
  }, [])

  const stats = {
    total:     myApplications.length,
    pending:   myApplications.filter(a => a.status === 'pending').length,
    reviewing: myApplications.filter(a => a.status === 'reviewing').length,
    accepted:  myApplications.filter(a => a.status === 'accepted').length,
  }

  return (
    <div className="space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Welcome back, {user?.name}</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Total applications', value: stats.total,     icon: Users },
          { label: 'Pending',            value: stats.pending,   icon: Clock },
          { label: 'Reviewing',          value: stats.reviewing, icon: Building2 },
          { label: 'Accepted',           value: stats.accepted,  icon: Users },
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

      {/* Applications list */}
      <div className="space-y-4">
        <h2 className="text-lg font-medium">My Applications</h2>

        {myApplications.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border py-16 text-center">
            <p className="font-medium">No applications yet</p>
            <p className="text-sm text-muted-foreground mt-1">
              Start applying to jobs to track them here
            </p>
          </div>
        ) : (
          <div className="rounded-xl border overflow-hidden">
            <table className="w-full text-sm">
              <thead className="border-b bg-muted/50">
                <tr>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Job</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Company</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Applied</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {myApplications.map((app) => (
                  <tr key={app._id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3 font-medium">{app.jobTitle}</td>
                    <td className="px-4 py-3 text-muted-foreground">{app.company}</td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {new Date(app.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${statusStyles[app.status]}`}>
                        {app.status}
                      </span>
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

export default SeekerDashboard
