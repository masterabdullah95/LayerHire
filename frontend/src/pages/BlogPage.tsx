import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Clock,
  ArrowRight,
  BookOpen,
  TrendingUp,
  Briefcase,
  Users,
  Megaphone,
  Search,
  Rss,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

// ── Types ─────────────────────────────────────────────────────────────────────

type Category = 'All' | 'Career Advice' | 'Hiring Tips' | 'Product Updates' | 'Company News'

interface Article {
  id: string
  title: string
  excerpt: string
  category: Category
  author: string
  authorRole: string
  authorInitials: string
  authorColor: string
  date: string
  readTime: string
  featured?: boolean
  tags: string[]
}

// ── Data ──────────────────────────────────────────────────────────────────────

const articles: Article[] = [
  {
    id: '1',
    title: 'How to write a CV that actually gets read in 2026',
    excerpt:
      'Recruiters spend an average of 7 seconds on a CV — and in that time, they\'ve already decided whether you move forward or get filtered out. It\'s a brutal reality, but understanding it is the first step to beating it. The good news? Those 7 seconds follow a predictable pattern. Recruiters aren\'t reading; they\'re scanning. They dart to your most recent role, your job title, your company name, and your education — in roughly that order. Everything else is noise until you earn a second look. That means the layout, hierarchy, and first few words of every bullet point matter far more than most candidates realise. In this guide, we break down exactly what a recruiter\'s eyes land on, which common CV mistakes kill your chances before you\'ve even been considered, and the small but high-impact changes — from font choice to bullet structure — that turn a skimmed CV into a scheduled interview.',
    category: 'Career Advice',
    author: 'Priya Nair',
    authorRole: 'CPO, LayerHire',
    authorInitials: 'PN',
    authorColor: 'bg-emerald-100 text-emerald-700',
    date: 'Apr 28, 2025',
    readTime: '6 min read',
    featured: true,
    tags: ['CV', 'Job Search', 'Tips'],
  },
  {
    id: '2',
    title: 'The 5 interview questions every candidate should prepare for',
    excerpt:
      'From "tell me about yourself" to behavioural questions — master these five and walk in with confidence.',
    category: 'Career Advice',
    author: 'Sarah Chen',
    authorRole: 'CEO, LayerHire',
    authorInitials: 'SC',
    authorColor: 'bg-violet-100 text-violet-700',
    date: 'Apr 21, 2025',
    readTime: '5 min read',
    tags: ['Interview', 'Preparation'],
  },
  {
    id: '3',
    title: 'What top recruiters look for beyond the job description',
    excerpt:
      'Skills are table stakes. The candidates who get hired fast share a set of less obvious traits that most job posts never mention.',
    category: 'Hiring Tips',
    author: 'James Okafor',
    authorRole: 'Head of Growth',
    authorInitials: 'JO',
    authorColor: 'bg-orange-100 text-orange-700',
    date: 'Apr 14, 2025',
    readTime: '7 min read',
    tags: ['Recruiting', 'Hiring'],
  },
  {
    id: '4',
    title: 'Introducing AI-powered job matching on LayerHire',
    excerpt:
      'We just shipped our most requested feature. Here\'s how our new matching engine works and what it means for your job search.',
    category: 'Product Updates',
    author: 'Marcus Webb',
    authorRole: 'CTO, LayerHire',
    authorInitials: 'MW',
    authorColor: 'bg-blue-100 text-blue-700',
    date: 'Apr 7, 2025',
    readTime: '4 min read',
    tags: ['Product', 'AI', 'New Feature'],
  },
  {
    id: '5',
    title: 'How to build a hiring pipeline that doesn\'t burn out your team',
    excerpt:
      'Most hiring processes waste everyone\'s time. Here\'s the lightweight, high-signal pipeline we recommend to growing teams.',
    category: 'Hiring Tips',
    author: 'Sarah Chen',
    authorRole: 'CEO, LayerHire',
    authorInitials: 'SC',
    authorColor: 'bg-violet-100 text-violet-700',
    date: 'Mar 31, 2025',
    readTime: '8 min read',
    tags: ['Hiring', 'Process', 'Teams'],
  },
  {
    id: '6',
    title: 'LayerHire crosses 1 million successful placements',
    excerpt:
      'A milestone, a reflection, and a thank-you to every candidate and company who trusted us to be part of their story.',
    category: 'Company News',
    author: 'Sarah Chen',
    authorRole: 'CEO, LayerHire',
    authorInitials: 'SC',
    authorColor: 'bg-violet-100 text-violet-700',
    date: 'Mar 20, 2025',
    readTime: '3 min read',
    tags: ['Milestone', 'Company'],
  },
  {
    id: '7',
    title: 'Remote vs hybrid in 2025: what candidates actually want',
    excerpt:
      'We surveyed 12,000 job seekers on their work preferences. The results might surprise hiring managers.',
    category: 'Career Advice',
    author: 'James Okafor',
    authorRole: 'Head of Growth',
    authorInitials: 'JO',
    authorColor: 'bg-orange-100 text-orange-700',
    date: 'Mar 12, 2025',
    readTime: '5 min read',
    tags: ['Remote Work', 'Trends', 'Data'],
  },
  {
    id: '8',
    title: 'How to write a job post that attracts the right people',
    excerpt:
      'Vague job descriptions attract vague applications. A few small changes can dramatically improve the quality of your pipeline.',
    category: 'Hiring Tips',
    author: 'Priya Nair',
    authorRole: 'CPO, LayerHire',
    authorInitials: 'PN',
    authorColor: 'bg-emerald-100 text-emerald-700',
    date: 'Mar 3, 2025',
    readTime: '6 min read',
    tags: ['Job Post', 'Recruiting'],
  },
]

const categories: { label: Category; icon: React.ElementType }[] = [
  { label: 'All', icon: BookOpen },
  { label: 'Career Advice', icon: TrendingUp },
  { label: 'Hiring Tips', icon: Briefcase },
  { label: 'Product Updates', icon: Megaphone },
  { label: 'Company News', icon: Users },
]

const categoryColors: Record<string, string> = {
  'Career Advice': 'bg-violet-100 text-violet-700',
  'Hiring Tips': 'bg-blue-100 text-blue-700',
  'Product Updates': 'bg-emerald-100 text-emerald-700',
  'Company News': 'bg-orange-100 text-orange-700',
}

// ── Component ─────────────────────────────────────────────────────────────────

const BlogPage = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('All')
  const [search, setSearch] = useState('')
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const featured = articles.find((a) => a.featured)

  const filtered = articles.filter((a) => {
    if (a.featured) return false
    const matchesCategory = activeCategory === 'All' || a.category === activeCategory
    const matchesSearch =
      search.trim() === '' ||
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.category.toLowerCase().includes(search.toLowerCase()) ||
      a.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) setSubscribed(true)
  }

  return (
    <div className="space-y-14 pb-20">

      {/* ── Header ── */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Rss className="h-5 w-5 text-primary" />
          <Badge variant="secondary" className="text-xs font-medium">Blog</Badge>
        </div>
        <h1 className="text-3xl font-semibold tracking-tight">Resources & insights</h1>
        <p className="text-muted-foreground max-w-lg">
          Career advice, hiring best practices, and product news — from the LayerHire team.
        </p>
      </div>

      {/* ── Featured Article ── */}
      {featured && (
        <Link to={`/blog/${featured.id}`} className="group block">
          <Card className="overflow-hidden transition-all hover:shadow-md hover:-translate-y-0.5">
            <CardContent className="p-0">
              <div className="grid lg:grid-cols-5">
                {/* Featured image */}
                <div className="lg:col-span-2 min-h-48 overflow-hidden rounded-l-xl">
                  <img
                    src="https://improveworkspace.com/wp-content/uploads/2025/05/virtual_professional_organizer_opportunities-768x432.jpg"
                    alt="Person writing a CV at a laptop"
                    className="h-full w-full object-cover"
                  />
                </div>
                {/* Content */}
                <div className="lg:col-span-3 p-7 flex flex-col justify-between gap-5">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${categoryColors[featured.category]}`}>
                        {featured.category}
                      </span>
                      <Badge variant="outline" className="text-xs">Featured</Badge>
                    </div>
                    <h2 className="text-xl font-semibold tracking-tight leading-snug group-hover:text-primary transition-colors">
                      {featured.title}
                    </h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {featured.excerpt}
                    </p>
                  </div>
                  <div className="flex items-center justify-between flex-wrap gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 ${featured.authorColor}`}>
                        {featured.authorInitials}
                      </div>
                      <div>
                        <p className="text-xs font-medium">{featured.author}</p>
                        <p className="text-xs text-muted-foreground">{featured.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {featured.readTime}
                      </span>
                      <span className="flex items-center gap-1 font-medium text-primary group-hover:gap-2 transition-all">
                        Read article <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      )}

      {/* ── Filters ── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Category tabs */}
        <div className="flex flex-wrap gap-2">
          {categories.map(({ label, icon: Icon }) => (
            <button
              key={label}
              onClick={() => setActiveCategory(label)}
              className={`cursor-pointer flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                activeCategory === label
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              {label}
            </button>
          ))}
        </div>
        {/* Search */}
        <div className="relative w-full sm:w-56 shrink-0">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search articles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* ── Article Grid ── */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center gap-3">
          <p className="text-lg font-medium">No articles found</p>
          <p className="text-sm text-muted-foreground">Try a different search or category.</p>
          <Button
            variant="outline"
            onClick={() => { setSearch(''); setActiveCategory('All') }}
          >
            Clear filters
          </Button>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((article) => (
            <Link key={article.id} to={`/blog/${article.id}`} className="group block h-full">
              <Card className="h-full transition-all hover:shadow-md hover:-translate-y-0.5">
                {/* Color bar */}
                <div className={`h-1 w-full rounded-t-xl ${
                  article.category === 'Career Advice' ? 'bg-violet-400' :
                  article.category === 'Hiring Tips' ? 'bg-blue-400' :
                  article.category === 'Product Updates' ? 'bg-emerald-400' :
                  'bg-orange-400'
                }`} />
                <CardContent className="p-5 flex flex-col gap-4 h-full">
                  <div className="space-y-3 flex-1">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${categoryColors[article.category]}`}>
                      {article.category}
                    </span>
                    <h3 className="font-semibold text-sm leading-snug group-hover:text-primary transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                      {article.excerpt}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {article.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <Separator />

                  {/* Author + meta */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 ${article.authorColor}`}>
                        {article.authorInitials}
                      </div>
                      <div>
                        <p className="text-xs font-medium leading-none">{article.author}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{article.date}</p>
                      </div>
                    </div>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground shrink-0">
                      <Clock className="h-3 w-3" />
                      {article.readTime}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}

      {/* ── Newsletter CTA ── */}
      <section className="rounded-2xl border border-dashed p-10 text-center space-y-4">
        <div className="flex justify-center">
          <div className="rounded-full bg-primary/10 p-3">
            <Rss className="h-5 w-5 text-primary" />
          </div>
        </div>
        <h2 className="text-2xl font-semibold tracking-tight">Stay in the loop</h2>
        <p className="text-muted-foreground max-w-sm mx-auto text-sm">
          Get our best career advice and hiring insights delivered to your inbox — no spam, ever.
        </p>
        {subscribed ? (
          <p className="text-sm font-medium text-primary">
            🎉 You're subscribed! We'll be in touch soon.
          </p>
        ) : (
          <form onSubmit={handleSubscribe} className="flex items-center gap-2 justify-center max-w-sm mx-auto">
            <Input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1"
            />
            <Button type="submit" className="shrink-0">Subscribe</Button>
          </form>
        )}
      </section>

    </div>
  )
}

export default BlogPage
