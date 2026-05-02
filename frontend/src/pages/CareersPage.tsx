import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Briefcase,
  MapPin,
  Clock,
  BadgeDollarSign,
  Heart,
  Zap,
  Globe,
  Users,
  TrendingUp,
  Coffee,
  Shield,
  ChevronRight,
  ArrowRight,
  Search,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

// ── Types ─────────────────────────────────────────────────────────────────────

type Department = 'All' | 'Engineering' | 'Design' | 'Product' | 'Marketing' | 'Operations'
type JobType = 'Full-time' | 'Contract' | 'Part-time';

interface Opening {
  id: string
  title: string
  department: Department
  location: string
  type: JobType
  salary: string
  isNew?: boolean
}

// ── Static data ────────────────────────────────────────────────────────────────

const openings: Opening[] = [
  {
    id: '1',
    title: 'Senior Full-Stack Engineer',
    department: 'Engineering',
    location: 'San Francisco, CA / Remote',
    type: 'Contract',
    salary: '$140k – $180k',
    isNew: true,
  },
  {
    id: '2',
    title: 'Frontend Engineer (React)',
    department: 'Engineering',
    location: 'Remote',
    type: 'Part-time',
    salary: '$120k – $155k',
  },
  {
    id: '3',
    title: 'Product Designer',
    department: 'Design',
    location: 'San Francisco, CA',
    type: 'Full-time',
    salary: '$110k – $145k',
    isNew: true,
  },
  {
    id: '4',
    title: 'Product Manager',
    department: 'Product',
    location: 'New York, NY / Remote',
    type: 'Full-time',
    salary: '$130k – $165k',
  },
  {
    id: '5',
    title: 'Growth Marketing Manager',
    department: 'Marketing',
    location: 'Remote',
    type: 'Full-time',
    salary: '$95k – $125k',
  },
  {
    id: '6',
    title: 'DevOps / Infrastructure Engineer',
    department: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
    salary: '$130k – $160k',
  },
  {
    id: '7',
    title: 'Customer Success Manager',
    department: 'Operations',
    location: 'San Francisco, CA',
    type: 'Full-time',
    salary: '$80k – $105k',
  },
  {
    id: '8',
    title: 'UX Researcher',
    department: 'Design',
    location: 'Remote',
    type: 'Contract',
    salary: '$85k – $110k',
  },
]

const perks = [
  { icon: Heart, label: 'Health & wellness', desc: 'Full medical, dental, and vision coverage' },
  { icon: Zap, label: 'Fast growth', desc: 'Clear career ladders and regular promotions' },
  { icon: Globe, label: 'Work anywhere', desc: 'Remote-first with optional offices' },
  { icon: Coffee, label: 'Flexible hours', desc: 'Async-friendly culture, no 9-to-5 grind' },
  { icon: TrendingUp, label: 'Equity', desc: 'Meaningful ownership in what we build' },
  { icon: Shield, label: 'Job security', desc: 'Profitable & venture-backed since day one' },
  { icon: Users, label: 'Great team', desc: 'Exceptional, kind people who raise the bar' },
  { icon: Briefcase, label: 'L&D budget', desc: '$2,000/year for courses, books, conferences' },
]

const values = [
  {
    title: 'Ship fast, learn faster',
    desc: 'We bias towards action. A good decision today beats a perfect one next quarter.',
  },
  {
    title: 'Radical transparency',
    desc: 'We share context openly — financials, strategy, and hard truths.',
  },
  {
    title: 'Hire for impact',
    desc: 'We care about what you build, not where you went to school.',
  },
  {
    title: 'Respectful directness',
    desc: 'We give honest feedback kindly, because growth depends on it.',
  },
]

const departments: Department[] = ['All', 'Engineering', 'Design', 'Product', 'Marketing', 'Operations']

const typeColors: Record<string, string> = {
  'Full-time': 'bg-green-100 text-green-800',
  'Part-time': 'bg-blue-100 text-blue-800',
  'Contract': 'bg-orange-100 text-orange-800',
}

// ── Component ─────────────────────────────────────────────────────────────────

const CareersPage = () => {
  const [activeDept, setActiveDept] = useState<Department>('All')
  const [search, setSearch] = useState('')

  const filtered = openings.filter((o) => {
    const matchesDept = activeDept === 'All' || o.department === activeDept
    const matchesSearch =
      search.trim() === '' ||
      o.title.toLowerCase().includes(search.toLowerCase()) ||
      o.department.toLowerCase().includes(search.toLowerCase())
    return matchesDept && matchesSearch
  })

  return (
    <div className="space-y-20 pb-20">

      {/* ── Hero ── */}
      <section className="space-y-6 pt-4 text-center mx-auto max-w-2xl">
        <Badge variant="secondary" className="text-xs font-medium">
          We're hiring
        </Badge>
        <h1 className="text-4xl font-semibold tracking-tight leading-tight">
          Help us connect people<br />with great work
        </h1>
        <p className="text-muted-foreground text-lg leading-relaxed">
          LayerHire is building the hiring platform teams actually love. Join a small,
          high-output team that ships fast and cares deeply about craft.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Button
            size="lg"
            onClick={() => document.getElementById('openings')?.scrollIntoView({ behavior: 'smooth' })}
            className="gap-2"
          >
            See open roles <ArrowRight className="h-4 w-4" />
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link to="/contact">Get in touch</Link>
          </Button>
        </div>
        {/* Social proof */}
        <div className="flex items-center justify-center gap-6 pt-2 text-sm text-muted-foreground">
          <span>🏢 35 team members</span>
          <Separator orientation="vertical" className="h-4" />
          <span>🌍 18 countries</span>
          <Separator orientation="vertical" className="h-4" />
          <span>⭐ 4.8 Glassdoor</span>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">How we work</h2>
          <p className="text-muted-foreground">The principles that guide every decision we make.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {values.map(({ title, desc }) => (
            <Card key={title} className="border-dashed">
              <CardContent className="p-5 space-y-2">
                <p className="font-medium text-sm">{title}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* ── Perks ── */}
      <section className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">Benefits & perks</h2>
          <p className="text-muted-foreground">We take care of our people, full stop.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {perks.map(({ icon: Icon, label, desc }) => (
            <div key={label} className="flex items-start gap-3 rounded-xl border p-4">
              <div className="mt-0.5 rounded-lg bg-primary/10 p-2 shrink-0">
                <Icon className="h-4 w-4 text-primary" />
              </div>
              <div className="space-y-0.5">
                <p className="text-sm font-medium">{label}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Open Roles ── */}
      <section id="openings" className="space-y-6 scroll-mt-20">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">Open roles</h2>
            <p className="text-muted-foreground">
              {filtered.length} position{filtered.length !== 1 ? 's' : ''} available
            </p>
          </div>
          {/* Search */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search roles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        {/* Department filter */}
        <div className="flex flex-wrap gap-2">
          {departments.map((dept) => (
            <button
              key={dept}
              onClick={() => setActiveDept(dept)}
              className={`cursor-pointer rounded-full px-3 py-1 text-sm font-medium transition-colors ${
                activeDept === dept
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {dept}
            </button>
          ))}
        </div>

        {/* Listings */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center gap-3">
            <p className="text-lg font-medium">No roles found</p>
            <p className="text-sm text-muted-foreground">
              Try a different search or check back later.
            </p>
            <Button
              variant="outline"
              onClick={() => { setSearch(''); setActiveDept('All') }}
            >
              Clear filters
            </Button>
          </div>
        ) : (
          <div className="divide-y rounded-xl border overflow-hidden">
            {filtered.map((opening) => (
              <div
                key={opening.id}
                className="group flex items-center justify-between gap-4 bg-background px-5 py-4 transition-colors hover:bg-muted/40"
              >
                <div className="space-y-1.5 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-medium text-sm group-hover:text-primary transition-colors">
                      {opening.title}
                    </span>
                    {opening.isNew && (
                      <Badge className="text-xs px-1.5 py-0">New</Badge>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Briefcase className="h-3 w-3" />
                      {opening.department}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {opening.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <BadgeDollarSign className="h-3 w-3" />
                      {opening.salary}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${typeColors[opening.type] ?? 'bg-muted text-muted-foreground'}`}>
                        {opening.type}
                      </span>
                    </span>
                  </div>
                </div>
                <Button variant="ghost" size="sm" asChild className="shrink-0 gap-1 text-muted-foreground group-hover:text-foreground">
                  <Link to="/contact">
                    Apply <ChevronRight className="h-3.5 w-3.5" />
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ── CTA ── */}
      <section className="rounded-2xl border border-dashed p-10 text-center space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Don't see the right role?</h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          We're always looking for exceptional people. Send us your CV and tell us how
          you'd contribute — we read every message.
        </p>
        <Button asChild size="lg" variant="outline" className="gap-2">
          <Link to="/contact">
            Send a speculative application <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </section>

    </div>
  )
}

export default CareersPage
