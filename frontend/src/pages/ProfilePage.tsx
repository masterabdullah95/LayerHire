import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { UserCircle } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { Separator } from '@/components/ui/separator'
import ResumeUpload from '@/components/shared/ResumeUpload'
const ProfilePage = () => {
    const { user } = useAuth()
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

          <Separator />

          {/* Resume upload */}
          <ResumeUpload
            onUpload={(url) => console.log('Resume uploaded:', url)}
            onDelete={() => console.log('Resume removed')}
          />
        </CardContent>
      </Card>
      </>
  )
}

export default ProfilePage