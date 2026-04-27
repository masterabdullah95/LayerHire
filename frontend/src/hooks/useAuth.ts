import { useEffect } from 'react'
import { useSession } from '../lib/auth-client.ts'
import { setUser, clearUser } from '../features/auth/auth.slice.ts'
import { useAppDispatch, useAppSelector } from '../store/index.ts'
import type { User, Role } from '../types/index.ts'

export const useAuth = () => {
  const dispatch = useAppDispatch()
  const { data: session, isPending } = useSession()
  const { user, isLoading } = useAppSelector((s) => s.auth)

  useEffect(() => {
    if (isPending) return

    if (session?.user) {
      // cast to our own User type — matches what betterauth returns
      //dispatch(setUser(session.user as User))
      const u = session.user
      dispatch(setUser({
        id: u.id,
        name: u.name,
        email: u.email,
        emailVerified: u.emailVerified,
        image: u.image,
        role: (u as unknown as { role: Role }).role ?? 'seeker',
        createdAt: new Date(u.createdAt).toISOString(),
        updatedAt: new Date(u.updatedAt).toISOString(),
      }))

    } else {
      dispatch(clearUser())
    }
  }, [session, isPending, dispatch])

  return {
    user,
    isLoading: isLoading || isPending,
    isAuthenticated: !!user,
    isRecruiter: user?.role === 'recruiter',
    isSeeker: user?.role === 'seeker',
  }
}