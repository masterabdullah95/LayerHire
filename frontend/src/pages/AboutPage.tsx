import { Link } from 'react-router-dom'
import {
  Target,
  Users,
  Rocket,
  Globe,
  BarChart2,
  Handshake,
  ArrowRight,
  Linkedin,
  Twitter,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

// ── Data ──────────────────────────────────────────────────────────────────────

const stats = [
  { value: '120k+', label: 'Jobs posted' },
  { value: '2.4M', label: 'Job seekers' },
  { value: '18k', label: 'Companies hiring' },
  { value: '94%', label: 'Placement rate' },
]

const milestones = [
  { year: '2021', title: 'LayerHire founded', desc: 'Three engineers quit their jobs to fix hiring. First commit pushed from a coffee shop.' },
  { year: '2022', title: 'Seed round', desc: 'Raised $3.2M to build the platform. Hit 1,000 companies in the first year.' },
  { year: '2023', title: 'Series A', desc: '$18M raised. Expanded to 40 countries and launched the recruiter dashboard.' },
  { year: '2024', title: '1 million placements', desc: 'Crossed 1M successful hires. Launched AI-powered job matching.' },
  { year: '2025', title: 'Going global', desc: 'Opened offices in London and Singapore. 35 team members across 18 countries.' },
]

const team = [
  {
    name: 'Sarah Chen',
    role: 'Co-founder & CEO',
    bio: 'Former engineering lead at Stripe. Obsessed with making hiring less painful for everyone.',
    twitter: '#',
    linkedin: '#',
    initials: 'SC',
    color: 'bg-violet-100 text-violet-700',
  },
  {
    name: 'Marcus Webb',
    role: 'Co-founder & CTO',
    bio: 'Built distributed systems at AWS for 6 years. Now building the infra that powers LayerHire.',
    twitter: '#',
    linkedin: '#',
    initials: 'MW',
    color: 'bg-blue-100 text-blue-700',
  },
  {
    name: 'Priya Nair',
    role: 'Co-founder & CPO',
    bio: 'Product veteran from LinkedIn and AngelList. Turned two years of candidate interviews into our UX.',
    twitter: '#',
    linkedin: '#',
    initials: 'PN',
    color: 'bg-emerald-100 text-emerald-700',
  },
  {
    name: 'James Okafor',
    role: 'Head of Growth',
    bio: 'Scaled three B2B SaaS companies from 0 to Series B. Loves data, hates vanity metrics.',
    twitter: '#',
    linkedin: '#',
    initials: 'JO',
    color: 'bg-orange-100 text-orange-700',
  },
]

const values = [
  {
    icon: Target,
    title: 'Candidate-first',
    desc: 'Every product decision starts with one question: does this make life easier for the person looking for a job?',
  },
  {
    icon: BarChart2,
    title: 'Transparency by default',
    desc: 'Salaries, processes, timelines — we believe candidates deserve full context, not guesswork.',
  },
  {
    icon: Handshake,
    title: 'Fair outcomes',
    desc: 'Great work should speak for itself. We build tools that surface talent based on skill, not connections.',
  },
  {
    icon: Globe,
    title: 'Global from day one',
    desc: 'Talent is everywhere. Our platform works for a developer in Lagos as well as one in San Francisco.',
  },
]

// ── Component ─────────────────────────────────────────────────────────────────

const AboutPage = () => {
  return (
    <div className="space-y-20 pb-20">

      {/* ── Hero ── */}
      <section className="space-y-6 pt-4 text-center mx-auto max-w-2xl">
        <Badge variant="secondary" className="text-xs font-medium">Our story</Badge>
        <h1 className="text-4xl font-semibold tracking-tight leading-tight">
          Hiring is broken.<br />We're fixing it.
        </h1>
        <p className="text-muted-foreground text-lg leading-relaxed">
          LayerHire started as a frustration and became a mission. We're building the hiring
          platform that treats candidates like people — and gives teams the tools to find
          them faster.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Button size="lg" asChild className="gap-2">
            <Link to="/jobs">Browse jobs <ArrowRight className="h-4 w-4" /></Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link to="/careers">Join our team</Link>
          </Button>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map(({ value, label }) => (
          <div
            key={label}
            className="flex flex-col items-center justify-center rounded-xl border p-6 text-center gap-1"
          >
            <span className="text-3xl font-semibold tracking-tight">{value}</span>
            <span className="text-sm text-muted-foreground">{label}</span>
          </div>
        ))}
      </section>

      {/* ── Mission ── */}
      <section className="grid gap-8 lg:grid-cols-2 items-center">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Rocket className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              Our mission
            </span>
          </div>
          <h2 className="text-3xl font-semibold tracking-tight leading-snug">
            Connect every person with work that's right for them
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            The hiring process is full of friction — ghosting, black-box decisions, endless
            applications into the void. We believe it doesn't have to be that way.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            LayerHire gives job seekers real visibility into where they stand, and gives
            hiring teams the context to make faster, fairer decisions. Less noise. Better
            matches. Actual outcomes.
          </p>
        </div>
        {/* Visual block */}
        <div className="grid grid-cols-2 gap-3">
          {values.map(({ icon: Icon, title, desc }) => (
            <Card key={title} className="border-dashed">
              <CardContent className="p-5 space-y-2">
                <div className="rounded-lg bg-primary/10 p-2 w-fit">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <p className="font-medium text-sm">{title}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="space-y-8">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">How we got here</h2>
          <p className="text-muted-foreground">Four years of building, learning, and shipping.</p>
        </div>
        <div className="relative space-y-0">
          {milestones.map(({ year, title, desc }, i) => (
            <div key={year} className="flex gap-6 group">
              {/* Line + dot */}
              <div className="flex flex-col items-center">
                <div className="mt-1 h-3 w-3 rounded-full border-2 border-primary bg-background shrink-0 z-10" />
                {i < milestones.length - 1 && (
                  <div className="w-px flex-1 bg-border mt-1" />
                )}
              </div>
              {/* Content */}
              <div className={`space-y-1 ${i < milestones.length - 1 ? 'pb-8' : ''}`}>
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant="outline" className="text-xs font-mono">{year}</Badge>
                  <span className="font-medium text-sm">{title}</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Team ── */}
      <section className="space-y-8">
        <div className="flex items-end justify-between flex-wrap gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                The team
              </span>
            </div>
            <h2 className="text-2xl font-semibold tracking-tight">Meet the founders</h2>
          </div>
          <Button variant="outline" asChild className="gap-2">
            <Link to="/careers">We're hiring <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {team.map(({ name, role, bio, twitter, linkedin, initials, color }) => (
            <Card key={name} className="group transition-all hover:shadow-md hover:-translate-y-0.5">
              <CardContent className="p-5 space-y-4">
                {/* Avatar */}
                <div className={`h-14 w-14 rounded-2xl flex items-center justify-center text-lg font-semibold ${color}`}>
                  {initials}
                </div>
                <div className="space-y-1">
                  <p className="font-medium text-sm">{name}</p>
                  <p className="text-xs text-primary font-medium">{role}</p>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{bio}</p>
                <Separator />
                <div className="flex items-center gap-3">
                  <a
                    href={twitter}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={`${name} on Twitter`}
                  >
                    <Twitter className="h-4 w-4" />
                  </a>
                  <a
                    href={linkedin}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={`${name} on LinkedIn`}
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="rounded-2xl border border-dashed p-10 text-center space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Ready to find your next role?</h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Join over 2.4 million job seekers who use LayerHire to find work that actually fits.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Button size="lg" asChild className="gap-2">
            <Link to="/jobs">Browse jobs <ArrowRight className="h-4 w-4" /></Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link to="/contact">Contact us</Link>
          </Button>
        </div>
      </section>

    </div>
  )
}

export default AboutPage
