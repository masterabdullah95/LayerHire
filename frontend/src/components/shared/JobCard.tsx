import { Link } from 'react-router-dom'
import { MapPin, Clock, Briefcase, BadgeDollarSign } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import type { IJob } from '@/features/jobs/jobs.types'

interface Props {
  job: IJob
}

const typeColors: Record<string, string> = {
  'full-time': 'bg-green-100 text-green-800',
  'part-time': 'bg-blue-100 text-blue-800',
  'contract': 'bg-orange-100 text-orange-800',
  'internship': 'bg-purple-100 text-purple-800',
  'remote': 'bg-teal-100 text-teal-800',
}

const formatSalary = (min: number, max: number) => {
  const fmt = (n: number) =>
    n >= 1000 ? `$${(n / 1000).toFixed(0)}k` : `$${n}`
  return `${fmt(min)} — ${fmt(max)}`
}

const timeAgo = (date: string) => {
  const diff = Date.now() - new Date(date).getTime()
  const days = Math.floor(diff / 86400000)
  if (days === 0) return 'Today'
  if (days === 1) return 'Yesterday'
  if (days < 7) return `${days} days ago`
  if (days < 30) return `${Math.floor(days / 7)}w ago`
  return `${Math.floor(days / 30)}mo ago`
}

const JobCard = ({ job }: Props) => {
  return (
    <Link to={`/jobs/${job._id}`}>
      <Card className="group cursor-pointer transition-all hover:shadow-md hover:-translate-y-0.5">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-semibold text-base group-hover:text-primary transition-colors">
                {job.title}
              </h3>
              <p className="text-sm text-muted-foreground mt-0.5">{job.company}</p>
            </div>
            <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${typeColors[job.type]}`}>
              {job.type}
            </span>
          </div>
        </CardHeader>

        <CardContent className="space-y-3">
          <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {job.location}
            </span>
            <span className="flex items-center gap-1">
              <BadgeDollarSign className="h-3 w-3" />
              {formatSalary(job.salaryMin, job.salaryMax)}
            </span>
            <span className="flex items-center gap-1">
              <Briefcase className="h-3 w-3" />
              <span className="capitalize">{job.experienceLevel}</span>
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {timeAgo(job.createdAt)}
            </span>
          </div>

          <p className="text-sm text-muted-foreground line-clamp-2">
            {job.description}
          </p>

          <div className="flex flex-wrap gap-1.5">
            {job.requirements.slice(0, 4).map((req) => (
              <Badge key={req} variant="secondary" className="text-xs">
                {req}
              </Badge>
            ))}
            {job.requirements.length > 4 && (
              <Badge variant="outline" className="text-xs">
                +{job.requirements.length - 4} more
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

export default JobCard