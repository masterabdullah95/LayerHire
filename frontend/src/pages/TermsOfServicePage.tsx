import { Link } from 'react-router-dom'
import { FileText, ArrowRight, Mail } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'

// ── Data ──────────────────────────────────────────────────────────────────────

const sections = [
  {
    id: 'acceptance',
    title: '1. Acceptance of terms',
    content: [
      {
        subtitle: null,
        body: `By creating an account, accessing, or using LayerHire (the "Platform"), you agree to be bound by these Terms of Service ("Terms") and our Privacy Policy, which is incorporated herein by reference. If you do not agree to these Terms, you must not access or use the Platform. These Terms constitute a legally binding agreement between you and LayerHire Inc. ("LayerHire", "we", "us", or "our"), a corporation registered in the State of California, United States.`,
      },
      {
        subtitle: 'Changes to these Terms',
        body: `We reserve the right to modify these Terms at any time. When we make material changes, we will notify you by email and by posting a prominent notice on the Platform at least 14 days before the changes take effect. Your continued use of the Platform after the effective date of updated Terms constitutes your acceptance of those changes. If you do not agree to the revised Terms, you must stop using the Platform and delete your account.`,
      },
    ],
  },
  {
    id: 'eligibility',
    title: '2. Eligibility',
    content: [
      {
        subtitle: null,
        body: `You must be at least 16 years old to create an account or use the Platform. By using LayerHire, you represent and warrant that you meet this age requirement, that you have the legal capacity to enter into a binding contract, and that your use of the Platform does not violate any applicable law or regulation in your jurisdiction. If you are using the Platform on behalf of a company or other legal entity, you represent that you have the authority to bind that entity to these Terms.`,
      },
    ],
  },
  {
    id: 'accounts',
    title: '3. Accounts and registration',
    content: [
      {
        subtitle: 'Creating an account',
        body: `To access most features of the Platform, you must register for an account. You agree to provide accurate, current, and complete information during registration and to keep your account information up to date. You may register as a Job Seeker or as a Recruiter. Each user may maintain only one account of each type.`,
      },
      {
        subtitle: 'Account security',
        body: `You are responsible for maintaining the confidentiality of your account credentials and for all activity that occurs under your account. You agree to notify us immediately at security@layerhire.com if you become aware of any unauthorised access to or use of your account. LayerHire will not be liable for any loss or damage arising from your failure to safeguard your credentials.`,
      },
      {
        subtitle: 'Account termination by you',
        body: `You may delete your account at any time from Dashboard → Settings → Account → Delete account. Upon deletion, your profile will be removed from the Platform and your personal data will be handled in accordance with our Privacy Policy.`,
      },
    ],
  },
  {
    id: 'job-seekers',
    title: '4. Job seeker terms',
    content: [
      {
        subtitle: 'Profile and applications',
        body: `As a Job Seeker, you may create a profile, upload a CV, and apply for job listings posted on the Platform. You represent that all information in your profile and applications is truthful, accurate, and not misleading. You understand that when you apply for a role, your profile and application materials will be shared with the relevant employer or recruiter.`,
      },
      {
        subtitle: 'Profile visibility',
        body: `By default, your profile is visible to registered recruiters on the Platform. You may change your visibility settings at any time from your account settings. You acknowledge that once your profile has been viewed by a recruiter, we cannot reverse that disclosure.`,
      },
      {
        subtitle: 'No guarantee of employment',
        body: `LayerHire is a platform that facilitates connections between job seekers and employers. We do not guarantee that you will receive job interviews, offers, or employment as a result of using the Platform. We are not a staffing agency and do not participate in hiring decisions.`,
      },
    ],
  },
  {
    id: 'recruiters',
    title: '5. Recruiter and employer terms',
    content: [
      {
        subtitle: 'Posting job listings',
        body: `As a Recruiter or Employer, you may post job listings on the Platform. You represent that each listing accurately describes a genuine, available position within your organisation or a client organisation you are authorised to represent. You agree not to post listings that are misleading, fraudulent, or designed to collect personal information without genuine hiring intent.`,
      },
      {
        subtitle: 'Candidate data',
        body: `You agree to use candidate profiles and application data solely for the purpose of evaluating applicants for the specific role(s) you have posted. You must not share, sell, or use candidate data for any other purpose. You are responsible for handling candidate data in compliance with all applicable data protection laws, including GDPR where applicable.`,
      },
      {
        subtitle: 'Non-discrimination',
        body: `You agree not to use the Platform to discriminate against candidates on the basis of race, colour, religion, sex, national origin, age, disability, sexual orientation, gender identity, or any other characteristic protected by applicable law. LayerHire reserves the right to remove listings and suspend accounts that violate this requirement.`,
      },
      {
        subtitle: 'Fees and billing',
        body: `Certain recruiter features may require payment of fees as described on our pricing page. All fees are exclusive of applicable taxes. You authorise us to charge your payment method on the billing cycle you select. Fees are non-refundable except where required by law or as expressly stated in our refund policy.`,
      },
    ],
  },
  {
    id: 'prohibited-conduct',
    title: '6. Prohibited conduct',
    content: [
      {
        subtitle: 'You agree not to',
        body: `Use the Platform for any unlawful purpose or in violation of any applicable laws or regulations; post false, misleading, or fraudulent content; scrape, crawl, or use automated tools to access the Platform without our prior written consent; attempt to gain unauthorised access to any part of the Platform or its infrastructure; upload or transmit viruses, malware, or any other malicious code; harass, threaten, or abuse other users; impersonate any person or entity or misrepresent your affiliation with any person or entity; use the Platform to send unsolicited communications (spam); post or transmit content that infringes any intellectual property rights; or use the Platform in any way that could damage, disable, or impair the Platform or interfere with any other user's use of the Platform.`,
      },
      {
        subtitle: 'Consequences of violations',
        body: `Violation of these prohibitions may result in immediate suspension or termination of your account, removal of your content, and where appropriate, referral to law enforcement authorities. LayerHire reserves the right to investigate any suspected violation and to take any action we deem appropriate.`,
      },
    ],
  },
  {
    id: 'content',
    title: '7. User content',
    content: [
      {
        subtitle: 'Your content',
        body: `You retain ownership of all content you submit to the Platform, including your profile, CV, job listings, and messages ("User Content"). By submitting User Content, you grant LayerHire a non-exclusive, worldwide, royalty-free licence to use, store, display, reproduce, and distribute that content solely for the purpose of operating and improving the Platform.`,
      },
      {
        subtitle: 'Content standards',
        body: `You are solely responsible for your User Content. You represent and warrant that you own or have the necessary rights to your User Content, that it does not infringe the intellectual property rights of any third party, and that it does not violate any applicable law or these Terms.`,
      },
      {
        subtitle: 'Removal of content',
        body: `LayerHire reserves the right to remove any User Content that, in our sole discretion, violates these Terms or is otherwise objectionable. We will use reasonable efforts to notify you before removing your content, unless doing so is not practicable or would cause harm.`,
      },
    ],
  },
  {
    id: 'intellectual-property',
    title: '8. Intellectual property',
    content: [
      {
        subtitle: "LayerHire's IP",
        body: `The Platform and all of its content, features, and functionality — including but not limited to the LayerHire name, logo, software, text, graphics, and data compilations — are owned by LayerHire Inc. and are protected by copyright, trademark, and other intellectual property laws. You may not copy, modify, distribute, or create derivative works from our intellectual property without our prior written consent.`,
      },
      {
        subtitle: 'Feedback',
        body: `If you provide us with feedback, suggestions, or ideas regarding the Platform ("Feedback"), you grant LayerHire an irrevocable, perpetual, royalty-free licence to use and incorporate that Feedback into our products and services without any obligation to you.`,
      },
    ],
  },
  {
    id: 'disclaimers',
    title: '9. Disclaimers',
    content: [
      {
        subtitle: null,
        body: `THE PLATFORM IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. LAYERHIRE DOES NOT WARRANT THAT THE PLATFORM WILL BE UNINTERRUPTED, ERROR-FREE, OR FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS. WE DO NOT WARRANT THE ACCURACY, COMPLETENESS, OR USEFULNESS OF ANY CONTENT ON THE PLATFORM, INCLUDING JOB LISTINGS PROVIDED BY THIRD-PARTY EMPLOYERS.`,
      },
    ],
  },
  {
    id: 'limitation-of-liability',
    title: '10. Limitation of liability',
    content: [
      {
        subtitle: null,
        body: `TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, LAYERHIRE AND ITS OFFICERS, DIRECTORS, EMPLOYEES, AND AGENTS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, OR GOODWILL, ARISING OUT OF OR IN CONNECTION WITH YOUR USE OF OR INABILITY TO USE THE PLATFORM. IN NO EVENT SHALL OUR TOTAL LIABILITY TO YOU EXCEED THE GREATER OF (A) THE AMOUNT YOU PAID TO LAYERHIRE IN THE 12 MONTHS PRECEDING THE CLAIM, OR (B) ONE HUNDRED US DOLLARS ($100).`,
      },
    ],
  },
  {
    id: 'indemnification',
    title: '11. Indemnification',
    content: [
      {
        subtitle: null,
        body: `You agree to defend, indemnify, and hold harmless LayerHire Inc. and its officers, directors, employees, contractors, and agents from and against any claims, liabilities, damages, losses, and expenses, including reasonable legal fees, arising out of or relating to your use of the Platform, your User Content, your violation of these Terms, or your violation of any third-party rights.`,
      },
    ],
  },
  {
    id: 'governing-law',
    title: '12. Governing law and disputes',
    content: [
      {
        subtitle: 'Governing law',
        body: `These Terms are governed by the laws of the State of California, United States, without regard to its conflict-of-law provisions. The United Nations Convention on Contracts for the International Sale of Goods does not apply to these Terms.`,
      },
      {
        subtitle: 'Dispute resolution',
        body: `We encourage you to contact us first at legal@layerhire.com if you have a dispute — most issues can be resolved quickly and informally. If a dispute cannot be resolved informally, it shall be submitted to binding arbitration in San Francisco, California under the rules of the American Arbitration Association, except that either party may seek injunctive or other equitable relief in a court of competent jurisdiction.`,
      },
      {
        subtitle: 'Class action waiver',
        body: `You agree that any dispute resolution proceedings will be conducted on an individual basis only. You waive any right to bring or participate in a class action, consolidated action, or representative action against LayerHire.`,
      },
    ],
  },
  {
    id: 'general',
    title: '13. General provisions',
    content: [
      {
        subtitle: 'Entire agreement',
        body: `These Terms, together with our Privacy Policy and any additional terms applicable to specific features, constitute the entire agreement between you and LayerHire regarding your use of the Platform and supersede all prior agreements and understandings.`,
      },
      {
        subtitle: 'Severability',
        body: `If any provision of these Terms is found to be unenforceable or invalid by a court of competent jurisdiction, that provision will be limited or eliminated to the minimum extent necessary, and the remaining provisions will remain in full force and effect.`,
      },
      {
        subtitle: 'No waiver',
        body: `Our failure to enforce any right or provision of these Terms shall not constitute a waiver of that right or provision. Any waiver must be in writing and signed by an authorised representative of LayerHire.`,
      },
      {
        subtitle: 'Assignment',
        body: `You may not assign or transfer your rights or obligations under these Terms without our prior written consent. LayerHire may freely assign these Terms in connection with a merger, acquisition, or sale of assets, with notice to you.`,
      },
    ],
  },
  {
    id: 'contact',
    title: '14. Contact',
    content: [
      {
        subtitle: null,
        body: `If you have questions about these Terms of Service, please contact us at legal@layerhire.com. For general support enquiries, visit our Contact page. LayerHire Inc., 123 Market Street Suite 400, San Francisco, CA 94105, United States.`,
      },
    ],
  },
]

const tableOfContents = sections.map((s) => ({ id: s.id, label: s.title }))

// ── Component ─────────────────────────────────────────────────────────────────

const TermsOfServicePage = () => {
  return (
    <div className="pb-20">
      <div className="grid gap-12 lg:grid-cols-4">

        {/* ── Sticky sidebar TOC ── */}
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
              <p className="text-xs text-muted-foreground">Legal questions?</p>
              <Button variant="outline" size="sm" asChild className="w-full gap-2">
                <a href="mailto:legal@layerhire.com">
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
              <FileText className="h-5 w-5 text-primary" />
              <Badge variant="secondary" className="text-xs font-medium">Legal</Badge>
            </div>
            <h1 className="text-3xl font-semibold tracking-tight">Terms of Service</h1>
            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <span>Effective date: <span className="font-medium text-foreground">1 May 2025</span></span>
              <Separator orientation="vertical" className="h-4" />
              <span>Last updated: <span className="font-medium text-foreground">1 May 2027</span></span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
              Please read these Terms of Service carefully before using LayerHire. They govern
              your access to and use of our platform and set out the rights and obligations of
              both you and LayerHire. If you have questions, contact us at{' '}
              <a href="mailto:legal@layerhire.com" className="text-primary underline underline-offset-4">
                legal@layerhire.com
              </a>{' '}
              before using the Platform.
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
            <h3 className="font-semibold">Have a legal question?</h3>
            <p className="text-sm text-muted-foreground">
              Our legal team is happy to clarify anything in these Terms before you use the Platform.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild className="gap-2">
                <a href="mailto:legal@layerhire.com">
                  <Mail className="h-4 w-4" /> Contact legal team
                </a>
              </Button>
              <Button variant="outline" asChild className="gap-2">
                <Link to="/privacy">
                  Privacy Policy <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

        </main>
      </div>
    </div>
  )
}

export default TermsOfServicePage
