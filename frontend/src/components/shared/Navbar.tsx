import { Link, useNavigate } from 'react-router-dom'
import { signOut } from '@/lib/auth-client'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Briefcase, LogOut, LayoutDashboard, PlusCircle, User } from 'lucide-react'

const Navbar = () => {
  const { user, isAuthenticated, isRecruiter } = useAuth()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut()
    navigate('/login')
  }

  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 font-semibold text-lg"
        >
          <Briefcase className="h-5 w-5 text-primary" />
          <span>JobBoard</span>
        </Link>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
          <Link
            to="/"
            className="transition-colors hover:text-foreground"
          >
            Browse Jobs
          </Link>
          
          {isAuthenticated && !isRecruiter && (
            <Link to="/my-applications" className="transition-colors hover:text-foreground">
              My Applications
            </Link>
          )}

          {isRecruiter && (
            <Link
              to="/post-job"
              className="transition-colors hover:text-foreground"
            >
              Post a Job
            </Link>
          )}
          {isAuthenticated && (
            <Link
              to="/dashboard"
              className="transition-colors hover:text-foreground"
            >
              Dashboard
            </Link>
          )}
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {!isAuthenticated ? (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/login">Sign in</Link>
              </Button>
              <Button size="sm" asChild>
                <Link to="/register">Get started</Link>
              </Button>
            </>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 rounded-full outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                  <Avatar className="h-8 w-8 cursor-pointer">
                    <AvatarImage src={user?.image ?? ''} alt={user?.name ?? ''} />
                    <AvatarFallback className="text-xs">
                      {user?.name ? getInitials(user.name) : 'U'}
                    </AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-56">
                {/* User info */}
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user?.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                    <span className="mt-1 w-fit rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium capitalize text-primary">
                      {user?.role}
                    </span>
                  </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                {/* Navigation items */}
                <DropdownMenuItem asChild>
                  <Link to="/dashboard" className="cursor-pointer">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    Dashboard
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link to="/profile" className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>

                {isRecruiter && (
                  <DropdownMenuItem asChild>
                    <Link to="/post-job" className="cursor-pointer">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Post a Job
                    </Link>
                  </DropdownMenuItem>
                )}

                <DropdownMenuSeparator />

                {/* Sign out */}
                <DropdownMenuItem
                  onClick={handleSignOut}
                  className="cursor-pointer text-destructive focus:text-destructive"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  )
}

export default Navbar