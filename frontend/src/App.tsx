import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from '@/components/shared/Layout'
import ProtectedRoute from './components/shared/ProtectedRoute.tsx'
import LoginPage from './features/auth/LoginPage.tsx'
import RegisterPage from './features/auth/RegisterPage.tsx'
import JobsPage from '@/pages/JobsPage'
import JobDetailPage from '@/pages/JobDetailPage'
import PostJobPage from '@/pages/PostJobPage'
import DashboardPage from '@/pages/DashboardPage'
import MyApplicationsPage from '@/pages/MyApplicationsPage'
import ContactPage from './pages/ContactPage.tsx'
import CareersPage from './pages/CareersPage.tsx'

// Pages (placeholders for now — built in later phases)
const ProfilePage = () => <div className="text-2xl font-medium">Profile — coming soon</div>

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
          <Route path="/" element={<JobsPage />} />
          <Route path="/jobs/:id" element={<JobDetailPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/careers" element={<CareersPage />} />

          {/* Protected — any logged-in user */}
          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/my-applications" element={<MyApplicationsPage />} />
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