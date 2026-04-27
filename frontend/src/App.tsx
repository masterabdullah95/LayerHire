import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from '@/components/shared/Layout'
import ProtectedRoute from './components/shared/ProtectedRoute.tsx'
import LoginPage from './features/auth/LoginPage.tsx'
import RegisterPage from './features/auth/RegisterPage.tsx'

// Pages (placeholders for now — built in later phases)
const HomePage = () => <div className="p-8 text-2xl font-medium">Home — Phase 2</div>
const DashboardPage = () => <div className="p-8 text-2xl font-medium">Dashboard</div>
const PostJobPage = () => <div className="p-8 text-2xl font-medium">Post a Job</div>
const ProfilePage = () => <div className="text-2xl font-medium">Profile</div>

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        

        {/* All pages with Navbar */}
        <Route element={<Layout />}>

        {/* Auth pages — no navbar */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

          {/* Public */}
          <Route path="/" element={<HomePage />} />

          {/* Protected — any logged-in user */}
          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
          </Route>

          {/* Protected — recruiters only */}
          <Route element={<ProtectedRoute allowedRole="recruiter" />}>
            <Route path="/post-job" element={<PostJobPage />} />
          </Route>

        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App