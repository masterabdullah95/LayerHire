import { useCallback } from 'react'
import api from '@/lib/axios'
import { useEffect } from 'react'
import { useSession } from '../lib/auth-client.ts'
import { setUser, clearUser } from '../features/auth/auth.slice.ts'
import { useAppDispatch, useAppSelector } from '../store/index.ts'
import type { Role } from '../types/index.ts'
import { RecruiterCompany } from '@/features/auth/auth.types.ts'

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

   const updateCompanyInfo = useCallback(async (companyData: RecruiterCompany) => {
      const { data } = await api.put<{ data: RecruiterCompany }>('/recruiter/update/'+user?.id, companyData)
      return data.data
    }, [])

    const getCompanyInfo = useCallback(async () => {
      const { data } = await api.get<{ data: RecruiterCompany }>('/recruiter/'+user?.id)
      console.log('from useAuth hook, ',data);
      return data.data
    }, [])

  return {
    user,
    isLoading: isLoading || isPending,
    isAuthenticated: !!user,
    isRecruiter: user?.role === 'recruiter',
    isSeeker: user?.role === 'seeker',
    updateCompanyInfo,
    getCompanyInfo,
  }
}