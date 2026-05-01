import { useAuth } from '@/hooks/useAuth'
import RecruiterDashboard from './RecruiterDashboard'
import SeekerDashboard from './SeekerDashboard'

const DashboardPage = () => {
  const { isRecruiter } = useAuth()

  return isRecruiter ? <RecruiterDashboard /> : <SeekerDashboard />
}

export default DashboardPage