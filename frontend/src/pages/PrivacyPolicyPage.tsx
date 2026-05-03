import { Link } from 'react-router-dom'
import { Shield, ArrowRight, Mail } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'

// ── Data ──────────────────────────────────────────────────────────────────────

const sections = [
  {
    id: 'information-we-collect',
    title: '1. Information we collect',
    content: [
      {
        subtitle: 'Information you provide directly',
        body: `When you create an account, we collect your name, email address, and password. Job seekers may also provide a CV, work history, education, skills, and any other information included in their profile. Recruiters and employers provide company name, job listings, and billing information where applicable.`,
      },
      {
        subtitle: 'Information collected automatically',
        body: `When you use LayerHire, we automatically collect certain technical information including your IP address, browser type, operating system, referring URLs, pages viewed, and the dates and times of your visits. We use cookies and similar tracking technologies to collect this data — see Section 6 for more detail.`,
      },
      {
        subtitle: 'Information from third parties',
        body: `If you choose to sign in using a third-party service such as Google, we receive basic profile information (name, email address, and profile picture) from that service in accordance with their privacy policies and your privacy settings. We do not receive your password from third-party providers.`,
      },
    ],
  },
  {
    id: 'how-we-use-information',
    title: '2. How we use your information',
    content: [
      {
        subtitle: 'To provide and improve our service',
        body: `We use the information we collect to operate LayerHire, match candidates with relevant job listings, process applications, send notifications about application status updates, and improve the overall performance and features of the platform.`,
      },
      {
        subtitle: 'Communications',
        body: `We may use your email address to send transactional messages such as account confirmations, password resets, and application updates. With your consent, we may also send marketing emails about new features, job recommendations, and career resources. You can opt out of marketing communications at any time using the unsubscribe link in any email.`,
      },
      {
        subtitle: 'Safety and compliance',
        body: `We use your information to detect and prevent fraud, abuse, and other harmful activity, to enforce our Terms of Service, and to comply with applicable legal obligations including responding to valid legal process from law enforcement or regulatory authorities.`,
      },
    ],
  },
  {
    id: 'how-we-share-information',
    title: '3. How we share your information',
    content: [
      {
        subtitle: 'With employers and recruiters',
        body: `When you apply for a job on LayerHire, your profile and application materials are shared with the employer or recruiter who posted that listing. By submitting an application, you consent to this sharing. You can control the visibility of your profile in your account settings.`,
      },
      {
        subtitle: 'Service providers',
        body: `We share information with trusted third-party vendors who perform services on our behalf, including cloud hosting (Supabase), email delivery, analytics, and payment processing. These providers are contractually obligated to use your data only to provide services to us and may not use it for their own purposes.`,
      },
      {
        subtitle: 'Business transfers',
        body: `If LayerHire is involved in a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction. We will notify you via email and a prominent notice on the platform before your information is transferred and becomes subject to a different privacy policy.`,
      },
      {
        subtitle: 'Legal requirements',
        body: `We may disclose your information if required to do so by law or in good-faith belief that such disclosure is necessary to comply with a court order, subpoena, or other legal process, to protect the rights or property of LayerHire, or to protect the personal safety of our users or the public.`,
      },
      {
        subtitle: 'We do not sell your data',
        body: `LayerHire does not sell, rent, or trade your personal information to third parties for their own marketing purposes. Ever.`,
      },
    ],
  },
  {
    id: 'data-retention',
    title: '4. Data retention',
    content: [
      {
        subtitle: 'How long we keep your data',
        body: `We retain your personal information for as long as your account is active or as needed to provide you with our services. If you delete your account, we will delete or anonymise your personal data within 30 days, except where we are required by law to retain it for longer (for example, billing records which we may retain for up to 7 years for tax purposes).`,
      },
      {
        subtitle: 'Inactive accounts',
        body: `If your account has been inactive for 24 consecutive months, we may send you a notice and, if we receive no response, delete your account and associated data. We will always give you at least 30 days' notice before taking this action.`,
      },
    ],
  },
  {
    id: 'your-rights',
    title: '5. Your rights',
    content: [
      {
        subtitle: 'Access and portability',
        body: `You have the right to request a copy of the personal information we hold about you in a structured, machine-readable format. You can export your data at any time from Dashboard → Settings → Account → Export my data.`,
      },
      {
        subtitle: 'Correction',
        body: `You can update or correct most of your personal information directly in your account settings. If you need help correcting information that you cannot update yourself, contact us at privacy@layerhire.com.`,
      },
      {
        subtitle: 'Deletion',
        body: `You may request deletion of your account and personal data at any time from Dashboard → Settings → Account → Delete account. Some data may be retained where we have a legitimate legal basis to do so, such as fraud prevention or legal compliance.`,
      },
      {
        subtitle: 'Objection and restriction',
        body: `You have the right to object to or request restriction of certain types of processing of your personal data, including processing based on our legitimate interests. Where processing is based on your consent, you may withdraw that consent at any time without affecting the lawfulness of processing before withdrawal.`,
      },
      {
        subtitle: 'EU/EEA and UK residents',
        body: `If you are located in the European Economic Area or the United Kingdom, you have additional rights under the General Data Protection Regulation (GDPR) or UK GDPR, including the right to lodge a complaint with your local supervisory authority. Our legal bases for processing include contract performance, legitimate interests, legal obligations, and consent.`,
      },
    ],
  },
  {
    id: 'cookies',
    title: '6. Cookies and tracking',
    content: [
      {
        subtitle: 'What we use cookies for',
        body: `We use essential cookies to keep you logged in and remember your preferences. We use analytics cookies (such as those provided by PostHog) to understand how users navigate the platform so we can improve it. We do not use advertising or third-party tracking cookies.`,
      },
      {
        subtitle: 'Your choices',
        body: `You can control cookies through your browser settings. Disabling essential cookies may affect your ability to use certain features of the platform. You can also opt out of analytics tracking by visiting our cookie settings page or by using browser-level opt-out mechanisms.`,
      },
    ],
  },
  {
    id: 'security',
    title: '7. Security',
    content: [
      {
        subtitle: 'How we protect your data',
        body: `We implement industry-standard security measures including encryption in transit (TLS 1.2+), encryption at rest, access controls, regular security audits, and monitoring for unauthorised access. Passwords are hashed using bcrypt and are never stored in plaintext.`,
      },
      {
        subtitle: 'Data breach notification',
        body: `In the event of a data breach that affects your personal information, we will notify affected users and relevant supervisory authorities within 72 hours of becoming aware of the breach, in accordance with applicable law.`,
      },
    ],
  },
  {
    id: 'children',
    title: '8. Children\'s privacy',
    content: [
      {
        subtitle: null,
        body: `LayerHire is not directed at children under the age of 16. We do not knowingly collect personal information from anyone under 16. If you believe we have inadvertently collected information from a child under 16, please contact us immediately at privacy@layerhire.com and we will delete that information promptly.`,
      },
    ],
  },
  {
    id: 'changes',
    title: '9. Changes to this policy',
    content: [
      {
        subtitle: null,
        body: `We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. When we make material changes, we will notify you by email and by posting a prominent notice on the platform at least 14 days before the changes take effect. Your continued use of LayerHire after the effective date constitutes acceptance of the updated policy.`,
      },
    ],
  },
  {
    id: 'contact',
    title: '10. Contact us',
    content: [
      {
        subtitle: null,
        body: `If you have questions, concerns, or requests regarding this Privacy Policy or your personal data, please contact our Privacy team at privacy@layerhire.com. We aim to respond to all privacy-related enquiries within 5 business days. You can also write to us at: LayerHire Inc., 123 Market Street Suite 400, San Francisco, CA 94105, United States.`,
      },
    ],
  },
]

const tableOfContents = sections.map((s) => ({
  id: s.id,
  label: s.title,
}))

// ── Component ─────────────────────────────────────────────────────────────────

const PrivacyPolicyPage = () => {
  return (
    <div className="pb-20">
      <div className="grid gap-12 lg:grid-cols-4">

        {/* ── Sidebar TOC (sticky) ── */}
        <aside className="hidden lg:block">
          <div className="sticky top-8 space-y-4">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              On this page
            </p>
            <nav className="space-y-1">
              {tableOfContents.map(({ id, label }) => (
                <a
                  key={id}
                  href={`#${id}`}
                  className="block rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  {label}
                </a>
              ))}
            </nav>
            <Separator />
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">Questions about your data?</p>
              <Button variant="outline" size="sm" asChild className="w-full gap-2">
                <a href="mailto:privacy@layerhire.com">
                  <Mail className="h-3.5 w-3.5" /> Email us
                </a>
              </Button>
            </div>
          </div>
        </aside>

        {/* ── Main content ── */}
        <main className="lg:col-span-3 space-y-10">

          {/* Header */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <Badge variant="secondary" className="text-xs font-medium">Legal</Badge>
            </div>
            <h1 className="text-3xl font-semibold tracking-tight">Privacy Policy</h1>
            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <span>Effective date: <span className="font-medium text-foreground">1 May 2025</span></span>
              <Separator orientation="vertical" className="h-4" />
              <span>Last updated: <span className="font-medium text-foreground">1 May 2027</span></span>
            </div>
            <p className="text-muted-foreground leading-relaxed text-sm max-w-2xl">
              At LayerHire, your privacy matters. This policy explains what personal information
              we collect, why we collect it, how we use and protect it, and what rights you
              have over your data. Please read it carefully — it applies to all users of
              layerhire.com and our mobile applications.
            </p>
          </div>

          <Separator />

          {/* Sections */}
          {sections.map((section) => (
            <section key={section.id} id={section.id} className="space-y-5 scroll-mt-6">
              <h2 className="text-lg font-semibold tracking-tight">{section.title}</h2>
              <div className="space-y-5">
                {section.content.map((block, i) => (
                  <div key={i} className="space-y-1.5">
                    {block.subtitle && (
                      <h3 className="text-sm font-medium">{block.subtitle}</h3>
                    )}
                    <p className="text-sm text-muted-foreground leading-relaxed">{block.body}</p>
                  </div>
                ))}
              </div>
              <Separator />
            </section>
          ))}

          {/* Footer CTA */}
          <div className="rounded-2xl border border-dashed p-8 space-y-3">
            <h3 className="font-semibold">Still have questions?</h3>
            <p className="text-sm text-muted-foreground">
              Our team is happy to answer any questions you have about how we handle your data.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild className="gap-2">
                <a href="mailto:privacy@layerhire.com">
                  <Mail className="h-4 w-4" /> Contact privacy team
                </a>
              </Button>
              <Button variant="outline" asChild className="gap-2">
                <Link to="/contact">
                  General enquiries <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

        </main>
      </div>
    </div>
  )
}

export default PrivacyPolicyPage
