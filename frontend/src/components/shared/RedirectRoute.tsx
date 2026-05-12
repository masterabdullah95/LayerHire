import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth.ts'
import type { Role } from '../../types/index.ts'

interface Props {
  allowedRole?: Role
}

const RedirectRoute = ({ allowedRole }: Props) => {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  // If this is login or register page, and user is logged in, redirect to dashboard
  if (user && ['/login', '/register'].includes(location.pathname)) {
    return <Navigate to="/dashboard" replace />
  }

  return <Outlet />
}

export default RedirectRoute