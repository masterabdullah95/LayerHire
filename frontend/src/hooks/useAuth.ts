import { useEffect } from 'react'
import { useSession } from '../lib/auth-client.ts'
import { setUser, clearUser } from '../features/auth/auth.slice.ts'
import { useAppDispatch, useAppSelector } from '../store/index.ts'
import type { User } from '../types/index.ts'

export const useAuth = () => {
  const dispatch = useAppDispatch()
  const { data: session, isPending } = useSession()
  const { user, isLoading } = useAppSelector((s) => s.auth)

  useEffect(() => {
    if (isPending) return

    if (session?.user) {
      // cast to our own User type — matches what betterauth returns
      dispatch(setUser(session.user as User))

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