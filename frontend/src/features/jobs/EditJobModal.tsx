import { useState, useEffect } from 'react'
import { useJobs } from '@/hooks/useJobs'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { X } from 'lucide-react'
import type { IJob, JobType, ExperienceLevel } from './jobs.types'

interface Props {
  job: IJob
  open: boolean
  onClose: () => void
}

const EditJobModal = ({ job, open, onClose }: Props) => {
  const { updateJob } = useJobs()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [requirementInput, setRequirementInput] = useState('')

  const [form, setForm] = useState({
    title: job.title,
    company: job.company,
    location: job.location,
    type: job.type as JobType,
    experienceLevel: job.experienceLevel as ExperienceLevel,
    salaryMin: String(job.salaryMin),
    salaryMax: String(job.salaryMax),
    description: job.description,
    requirements: job.requirements,
  })

  // sync if job prop changes
  useEffect(() => {
    setForm({
      title: job.title,
      company: job.company,
      location: job.location,
      type: job.type,
      experienceLevel: job.experienceLevel,
      salaryMin: String(job.salaryMin),
      salaryMax: String(job.salaryMax),
      description: job.description,
      requirements: job.requirements,
    })
  }, [job])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSelect = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const addRequirement = () => {
    const trimmed = requirementInput.trim()
    if (!trimmed || form.requirements.includes(trimmed)) return
    setForm((prev) => ({ ...prev, requirements: [...prev.requirements, trimmed] }))
    setRequirementInput('')
  }

  const removeRequirement = (req: string) => {
    setForm((prev) => ({
      ...prev,
      requirements: prev.requirements.filter((r) => r !== req),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (Number(form.salaryMin) > Number(form.salaryMax)) {
      setError('Minimum salary cannot be greater than maximum salary')
      return
    }

    setIsLoading(true)
    try {
      await updateJob(job._id, {
        ...form,
        salaryMin: Number(form.salaryMin),
        salaryMax: Number(form.salaryMax),
      })
      onClose()
    } catch {
      setError('Failed to update job. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Job</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 mt-2">

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="title">Job title</Label>
              <Input id="title" name="title" value={form.title} onChange={handleChange} required />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="company">Company</Label>
              <Input id="company" name="company" value={form.company} onChange={handleChange} required />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="location">Location</Label>
              <Input id="location" name="location" value={form.location} onChange={handleChange} required />
            </div>
            <div className="space-y-1.5">
              <Label>Job type</Label>
              <Select value={form.type} onValueChange={(v) => handleSelect('type', v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="full-time">Full-time</SelectItem>
                  <SelectItem value="part-time">Part-time</SelectItem>
                  <SelectItem value="contract">Contract</SelectItem>
                  <SelectItem value="internship">Internship</SelectItem>
                  <SelectItem value="remote">Remote</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-1.5">
              <Label>Experience level</Label>
              <Select value={form.experienceLevel} onValueChange={(v) => handleSelect('experienceLevel', v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="entry">Entry</SelectItem>
                  <SelectItem value="mid">Mid</SelectItem>
                  <SelectItem value="senior">Senior</SelectItem>
                  <SelectItem value="lead">Lead</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="salaryMin">Min salary ($)</Label>
              <Input id="salaryMin" name="salaryMin" type="number" value={form.salaryMin} onChange={handleChange} required />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="salaryMax">Max salary ($)</Label>
              <Input id="salaryMax" name="salaryMax" type="number" value={form.salaryMax} onChange={handleChange} required />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="description">Job description</Label>
            <Textarea id="description" name="description"
              className="min-h-32 resize-none"
              value={form.description} onChange={handleChange} required />
          </div>

          <div className="space-y-1.5">
            <Label>Requirements / skills</Label>
            <div className="flex gap-2">
              <Input
                placeholder="e.g. React, TypeScript"
                value={requirementInput}
                onChange={(e) => setRequirementInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') { e.preventDefault(); addRequirement() }
                }}
              />
              <Button type="button" variant="outline" onClick={addRequirement}>Add</Button>
            </div>
            {form.requirements.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {form.requirements.map((req) => (
                  <span key={req} className="flex items-center gap-1 rounded-full bg-secondary px-3 py-1 text-sm">
                    {req}
                    <button type="button" onClick={() => removeRequirement(req)}
                      className="ml-1 text-muted-foreground hover:text-foreground">
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <div className="flex gap-3 pt-2">
            <Button type="submit" className="flex-1" disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Save changes'}
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default EditJobModal