import { useEffect, useState } from 'react'
import { useJobs } from '@/hooks/useJobs'
import JobCard from '@/components/shared/JobCard'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search, X } from 'lucide-react'
import type { JobType, ExperienceLevel } from '@/features/jobs/jobs.types'

const JobsPage = () => {
  const { jobs, total, totalPages, isLoading, filters, fetchJobs } = useJobs()
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetchJobs()
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    fetchJobs({ search, page: 1 })
  }

  const handleFilter = (key: string, value: string) => {
    fetchJobs({ [key]: value === 'all' ? undefined : value, page: 1 })
  }

  const handleClearFilters = () => {
    setSearch('')
    fetchJobs({ search: undefined, type: undefined, experienceLevel: undefined, page: 1 })
  }

  const handlePageChange = (newPage: number) => {
    fetchJobs({ page: newPage })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold">Browse Jobs</h1>
        <p className="text-muted-foreground mt-1">{total} jobs available</p>
      </div>

      {/* Search + Filters */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <form onSubmit={handleSearch} className="flex flex-1 gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search jobs, companies..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button type="submit">Search</Button>
        </form>

        <div className="flex gap-2">
          <Select onValueChange={(v) => handleFilter('type', v)}>
            <SelectTrigger className="w-36">
              <SelectValue placeholder="Job type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All types</SelectItem>
              <SelectItem value="full-time">Full-time</SelectItem>
              <SelectItem value="part-time">Part-time</SelectItem>
              <SelectItem value="contract">Contract</SelectItem>
              <SelectItem value="internship">Internship</SelectItem>
              <SelectItem value="remote">Remote</SelectItem>
            </SelectContent>
          </Select>

          <Select onValueChange={(v) => handleFilter('experienceLevel', v)}>
            <SelectTrigger className="w-36">
              <SelectValue placeholder="Experience" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All levels</SelectItem>
              <SelectItem value="entry">Entry</SelectItem>
              <SelectItem value="mid">Mid</SelectItem>
              <SelectItem value="senior">Senior</SelectItem>
              <SelectItem value="lead">Lead</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="ghost" size="icon" onClick={handleClearFilters} title="Clear filters">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Jobs Grid */}
      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-52 rounded-xl bg-muted animate-pulse" />
          ))}
        </div>
      ) : jobs.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <p className="text-lg font-medium">No jobs found</p>
          <p className="text-muted-foreground text-sm mt-1">Try adjusting your search or filters</p>
          <Button variant="outline" className="mt-4" onClick={handleClearFilters}>
            Clear filters
          </Button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-4">
          <Button
            variant="outline"
            size="sm"
            disabled={filters.page === 1}
            onClick={() => handlePageChange((filters.page ?? 1) - 1)}
          >
            Previous
          </Button>
          <span className="text-sm text-muted-foreground">
            Page {filters.page} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={filters.page === totalPages}
            onClick={() => handlePageChange((filters.page ?? 1) + 1)}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  )
}

export default JobsPage