import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { UserCircle } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { Separator } from '@/components/ui/separator'
import ResumeUpload from '@/components/shared/ResumeUpload'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'

const ProfilePage = () => {
  const [form, setForm] = useState({
    company: '',
    description: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const { user, updateCompanyInfo, getCompanyInfo } = useAuth()
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  useEffect(() => {
    async function fetchCompanyInfo() {
      if (user && user.role === 'recruiter') {
        const data = await getCompanyInfo()
        setForm({
          company: data.company,
          description: data.description
        })
      }
    }
    fetchCompanyInfo()
  }, [])

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)
    try {
      await updateCompanyInfo(form)
      
    } catch {
      setError('Failed to update info. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
    {/* Profile & Resume */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center gap-2">
            <UserCircle className="h-5 w-5 text-muted-foreground" />
            <CardTitle className="text-base font-medium">Profile</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-5">
          {/* Basic info */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Full name</p>
              <p className="text-sm font-medium">{user?.name}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Email address</p>
              <p className="text-sm font-medium">{user?.email}</p>
            </div>
          </div>

          {/* Resume upload only when user is seeker */}
          {user && user.role === 'seeker' && (
            <>
              <Separator />
              <ResumeUpload
                onUpload={(url) => console.log('Resume uploaded:', url)}
                onDelete={() => console.log('Resume removed')}
              />
            </>
          )}

          {/* Add/update recruiter info */}
          {user && user.role === 'recruiter' && (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Company Name*/}
              <div className="space-y-1.5">
                <Label htmlFor="company">Company</Label>
                <Input id="company" name="company" placeholder="e.g. Acme Inc."
                  value={form.company} onChange={handleChange} required />
              </div>
              
              {/* Company Description */}
              <div className="space-y-1.5">
                <Label htmlFor="description">Job description</Label>
                <Textarea id="description" name="description"
                  placeholder="Describe the role, responsibilities, and what you're looking for..."
                  className="min-h-32 resize-none"
                  value={form.description} onChange={handleChange} required />
              </div>

              {error && <p className="text-sm text-destructive">{error}</p>}
              <Button type="submit"  disabled={isLoading}>
                Update
              </Button>
             </form>
            )}



        </CardContent>
      </Card>
      </>
  )
}

export default ProfilePage