import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

const Layout = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className='mt-10 mx-6 sm:mx-14 lg:mx-14 mb-10'>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Layout