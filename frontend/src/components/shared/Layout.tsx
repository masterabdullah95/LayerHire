import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

const Layout = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className='mt-4 mx-14'>
        <Outlet />
      </main>
    </div>
  )
}

export default Layout