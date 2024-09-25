import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { MenuIcon, MountainIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

const NAV_LINKS = [
  { href: '/', label: 'Animals' },
  { href: '/admin', label: 'Admin' },
]

const AUTH_LINKS = [
  { href: '/login', label: 'Log in' },
  { href: '/register', label: 'Register' },
]

const NavLink = ({ href, label }: { href: string; label: string }) => (
  <Link
    to={href}
    className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
    aria-label={label}
  >
    {label}
  </Link>
)

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setIsLoggedIn(true)
    }
  }, [])

  return (
    <header className="flex absolute z-10 h-20 w-full shrink-0 items-center px-4 md:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="top">
          <a href="/" className="mr-6 hidden md:flex">
            <MountainIcon className="h-6 w-6" />
            <span className="sr-only">Acme Inc</span>
          </a>
          <div className="grid gap-2 py-6">
            {NAV_LINKS.map((link) => (
              <NavLink key={link.label} href={link.href} label={link.label} />
            ))}
            {!isLoggedIn &&
              AUTH_LINKS.map((link) => (
                <NavLink key={link.label} href={link.href} label={link.label} />
              ))}
            {isLoggedIn && (
              <NavLink key="User Profile" href="/user" label="User Profile" />
            )}
          </div>
        </SheetContent>
      </Sheet>
      <a href="#" className="mr-6 hidden md:flex">
        <MountainIcon className="h-6 w-6" />
        <span className="sr-only">Acme Inc</span>
      </a>
      <nav className="ml-auto hidden md:flex gap-6">
        {NAV_LINKS.map((link) => (
          <NavLink key={link.label} href={link.href} label={link.label} />
        ))}
        {!isLoggedIn &&
          AUTH_LINKS.map((link) => (
            <NavLink key={link.label} href={link.href} label={link.label} />
          ))}
        {isLoggedIn && <NavLink key="Profile" href="/user" label="Profile" />}
      </nav>
    </header>
  )
}
