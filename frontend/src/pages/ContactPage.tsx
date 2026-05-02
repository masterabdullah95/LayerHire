import { useState } from 'react'
import { Mail, MapPin, Phone, Send, MessageSquare, Clock, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

type FormState = {
  name: string
  email: string
  subject: string
  category: string
  message: string
}

const initialForm: FormState = {
  name: '',
  email: '',
  subject: '',
  category: '',
  message: '',
}

const contactInfo = [
  {
    icon: Mail,
    label: 'Email us',
    value: 'hello@layerhire.com',
    description: 'We reply within 24 hours',
    href: 'mailto:hello@layerhire.com',
  },
  {
    icon: Phone,
    label: 'Call us',
    value: '+1 (555) 000-0000',
    description: 'Mon–Fri, 9am–6pm EST',
    href: 'tel:+15550000000',
  },
  {
    icon: MapPin,
    label: 'Visit us',
    value: 'San Francisco, CA',
    description: '123 Market Street, Suite 400',
    href: '#',
  },
]

const faqs = [
  {
    q: 'How do I post a job listing?',
    a: 'Register as a recruiter, then navigate to "Post a Job" in the navigation bar.',
  },
  {
    q: 'Is LayerHire free for job seekers?',
    a: 'Yes — browsing and applying to jobs is completely free for candidates.',
  },
  {
    q: 'How long does it take to hear back after applying?',
    a: 'Response times vary per company. You can track all applications in "My Applications".',
  },
  {
    q: 'How do I delete my account?',
    a: 'Go to Dashboard → Settings → Account, and select "Delete account".',
  },
]

const ContactPage = () => {
  const [form, setForm] = useState<FormState>(initialForm)
  const [submitted, setSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Partial<FormState>>({})

  const validate = (): boolean => {
    const newErrors: Partial<FormState> = {}
    if (!form.name.trim()) newErrors.name = 'Name is required'
    if (!form.email.trim()) newErrors.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = 'Enter a valid email address'
    if (!form.subject.trim()) newErrors.subject = 'Subject is required'
    if (!form.message.trim()) newErrors.message = 'Message is required'
    else if (form.message.trim().length < 20)
      newErrors.message = 'Message must be at least 20 characters'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setIsLoading(true)
    // Simulate API call
    await new Promise((res) => setTimeout(res, 1200))
    setIsLoading(false)
    setSubmitted(true)
  }

  const handleReset = () => {
    setForm(initialForm)
    setErrors({})
    setSubmitted(false)
  }

  return (
    <div className="space-y-12 pb-16">

      {/* Header */}
      <div className="space-y-2 text-center mx-auto">
        <div className="flex items-center gap-2 justify-center">
          <MessageSquare className="h-5 w-5 text-primary" />
          <Badge variant="secondary" className="text-xs font-medium">Support</Badge>
        </div>
        <h1 className="text-3xl font-semibold tracking-tight">Get in touch</h1>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Have a question, feedback, or need help? We're here for you. Fill out the form and our
          team will get back to you as soon as possible.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">

{/* Right — Form */}
        <div className="lg:col-span-2">
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
            Contact Us
          </h2>
          <Card>
            <CardContent className="p-6 sm:p-8">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
                  <div className="rounded-full bg-primary/10 p-4">
                    <CheckCircle className="h-8 w-8 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-semibold">Message sent!</h3>
                    <p className="text-muted-foreground text-sm max-w-xs">
                      Thanks for reaching out, {form.name.split(' ')[0]}. We'll get back to you at{' '}
                      <span className="font-medium text-foreground">{form.email}</span> within 24
                      hours.
                    </p>
                  </div>
                  <Button variant="outline" onClick={handleReset} className="mt-2">
                    Send another message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  {/* Name + Email */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">
                        Full name <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="name"
                        placeholder="Jane Smith"
                        value={form.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        className={errors.name ? 'border-destructive' : ''}
                      />
                      {errors.name && (
                        <p className="text-xs text-destructive">{errors.name}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">
                        Email address <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="jane@example.com"
                        value={form.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        className={errors.email ? 'border-destructive' : ''}
                      />
                      {errors.email && (
                        <p className="text-xs text-destructive">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  {/* Category + Subject */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select
                        value={form.category}
                        onValueChange={(v) => handleChange('category', v)}
                      >
                        <SelectTrigger id="category">
                          <SelectValue placeholder="Select a topic" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">General inquiry</SelectItem>
                          <SelectItem value="job-seeker">Job seeker support</SelectItem>
                          <SelectItem value="recruiter">Recruiter / hiring</SelectItem>
                          <SelectItem value="billing">Billing & pricing</SelectItem>
                          <SelectItem value="bug">Report a bug</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">
                        Subject <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="subject"
                        placeholder="Brief description of your issue"
                        value={form.subject}
                        onChange={(e) => handleChange('subject', e.target.value)}
                        className={errors.subject ? 'border-destructive' : ''}
                      />
                      {errors.subject && (
                        <p className="text-xs text-destructive">{errors.subject}</p>
                      )}
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="message">
                        Message <span className="text-destructive">*</span>
                      </Label>
                      <span className="text-xs text-muted-foreground">
                        {form.message.length} / 1000
                      </span>
                    </div>
                    <Textarea
                      id="message"
                      placeholder="Describe your question or issue in detail..."
                      rows={6}
                      maxLength={1000}
                      value={form.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                      className={`resize-none ${errors.message ? 'border-destructive' : ''}`}
                    />
                    {errors.message && (
                      <p className="text-xs text-destructive">{errors.message}</p>
                    )}
                  </div>

                  {/* Submit */}
                  <div className="flex items-center justify-between pt-1">
                    <p className="text-xs text-muted-foreground">
                      <span className="text-destructive">*</span> Required fields
                    </p>
                    <Button type="submit" disabled={isLoading} className="gap-2 min-w-32">
                      {isLoading ? (
                        <>
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          Send message
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Left — Contact Info */}
        <div className="space-y-4">
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Contact information
          </h2>

          <div className="space-y-3">
            {contactInfo.map(({ icon: Icon, label, value, description, href }) => (
              <a
                key={label}
                href={href}
                className="group flex items-start gap-4 rounded-xl border p-4 transition-colors hover:bg-muted/50"
              >
                <div className="mt-0.5 rounded-lg bg-primary/10 p-2">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <div className="space-y-0.5">
                  <p className="text-xs text-muted-foreground">{label}</p>
                  <p className="text-sm font-medium group-hover:text-primary transition-colors">
                    {value}
                  </p>
                  <p className="text-xs text-muted-foreground">{description}</p>
                </div>
              </a>
            ))}
          </div>

          {/* Response time note */}
          <div className="flex items-center gap-2 rounded-lg border border-dashed p-3 text-sm text-muted-foreground">
            <Clock className="h-4 w-4 shrink-0" />
            <span>Average response time is under 24 hours on business days.</span>
          </div>

          
        </div>

        {/* FAQ */}
        <div className="space-y-3 pt-4">
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Common questions
          </h2>
          <div className="space-y-3">
            {faqs.map(({ q, a }) => (
              <div key={q} className="space-y-1">
                <p className="text-sm font-medium">{q}</p>
                <p className="text-sm text-muted-foreground">{a}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}

export default ContactPage
