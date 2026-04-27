import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth.ts'
import type { Role } from '../../types/index.ts'

interface Props {
  allowedRole?: Role
}

const ProtectedRoute = ({ allowedRole }: Props) => {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  if (!user) return <Navigate to="/login" replace />

  if (allowedRole && user.role !== allowedRole) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}

export default ProtectedRoute