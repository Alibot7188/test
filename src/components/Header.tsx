
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home, Users, Calendar, UserCircle, Brain, GraduationCap, LayoutDashboard } from 'lucide-react';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/alumni', label: 'Alumni', icon: Users },
  { href: '/events', label: 'Events', icon: Calendar },
  { href: '/recommendations', label: 'Recommendations', icon: Brain },
  { href: '/profile', label: 'Profile', icon: UserCircle },
  { href: '/alumni-dashboard', label: 'Dashboard', icon: LayoutDashboard }, // New Dashboard link
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center mx-auto px-4">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <GraduationCap className="h-8 w-8 text-primary" />
          <span className="font-bold text-xl sm:inline-block">
            NexusConnect
          </span>
        </Link>
        <nav className="flex flex-1 items-center space-x-1 sm:space-x-3">
          {navItems.map((item) => (
            <Button key={item.label} variant="ghost" asChild className="text-sm sm:text-base">
              <Link href={item.href} className="flex items-center">
                <item.icon className="h-4 w-4 mr-0 sm:mr-2" />
                <span className="hidden sm:inline">{item.label}</span>
              </Link>
            </Button>
          ))}
        </nav>
        <div className="flex items-center space-x-2">
          {/* Placeholder for Login/User Actions if needed in future */}
          {/* <Button variant="outline">Login</Button> */}
        </div>
      </div>
    </header>
  );
}

