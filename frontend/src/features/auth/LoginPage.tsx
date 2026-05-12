import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signIn } from '../../lib/auth-client.ts'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const LoginPage = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    const { error } = await signIn.email({
      email: form.email,
      password: form.password,
    })

    if (error) {
      setError(error.message ?? 'Login failed. Please try again.')
      setIsLoading(false)
      return
    }

    navigate('/')
  }

  const handleGoogle = async () => {
    await signIn.social({
      provider: 'google',
      callbackURL: import.meta.env.VITE_APP_URL,   // ← redirect here after google auth, should be frontend url
    })
  }

  const handleGithub = async () => {
    await signIn.social({
      provider: 'github',
      callbackURL: import.meta.env.VITE_APP_URL,   // ← redirect here after google auth, should be frontend url
    })
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Welcome back</CardTitle>
          <CardDescription>Sign in to your account</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Google OAuth */}
          <Button
            variant="outline"
            className="w-full cursor-pointer"
            onClick={handleGoogle}
          >
            <img src="/google.svg" className="mr-2 h-4 w-4" alt="" />
            Continue with Google
          </Button>

          {/* Github OAuth */}
          <Button
            variant="outline"
            className="w-full cursor-pointer"
            onClick={handleGithub}
          >
            <img src="/github.svg" className="mr-2 h-4 w-4" alt="" />
            Continue with Github
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs text-muted-foreground">
              <span className="bg-background px-2">or</span>
            </div>
          </div>

          {/* Email + Password */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}

            <Button type="submit" className="cursor-pointer w-full" disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign in'}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            Don't have an account?{' '}
            <Link to="/register" className="text-primary hover:underline">
              Register
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

export default LoginPage