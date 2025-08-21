import { Link, useLocation } from 'wouter';
import { Bell, User, Hourglass, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/ui/theme-provider';
import { useQuery } from '@tanstack/react-query';

export default function Navigation() {
  const [location] = useLocation();
  const { theme, setTheme } = useTheme();

  // Mock user data - replace with actual API call
  const { data: user } = useQuery({
    queryKey: ['/api/user/me'],
    enabled: false, // Disable until auth is implemented
  });

  const navLinks = [
    { href: '/dashboard', label: 'Dashboard', className: 'hover:text-tva-orange' },
    { href: '/create', label: 'Create Capsule', className: 'hover:text-timeline-green' },
    { href: '/community', label: 'Community', className: 'hover:text-tva-orange' },
    { href: '/profile', label: 'Profile', className: 'hover:text-timeline-green' },
  ];

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <nav className="sticky top-0 z-40 glassmorphism border-b border-white/10" data-testid="main-navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" data-testid="logo-link">
            <div className="flex items-center space-x-3 animate-cascade-in cursor-pointer">
              <div className="w-10 h-10 bg-gradient-to-br from-tva-orange to-pruning-red rounded-lg flex items-center justify-center">
                <Hourglass className="text-white text-lg" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-tva-orange to-timeline-green bg-clip-text text-transparent">
                TimeCapsule
              </span>
            </div>
          </Link>
          
          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                data-testid={`nav-link-${link.label.toLowerCase().replace(' ', '-')}`}
              >
                <span
                  className={`text-gray-700 dark:text-gray-300 transition-all duration-300 animate-cascade-in cursor-pointer ${
                    link.className
                  } ${location === link.href ? 'text-tva-orange' : ''}`}
                  style={{ animationDelay: `${(index + 1) * 0.1}s` }}
                >
                  {link.label}
                </span>
              </Link>
            ))}
          </div>
          
          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="glassmorphism hover:bg-tva-orange/20 transition-all duration-300 animate-cascade-in"
              style={{ animationDelay: '0.4s' }}
              data-testid="theme-toggle"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
            
            {/* Notifications */}
            <Button
              variant="ghost"
              size="icon"
              className="relative glassmorphism hover:bg-timeline-green/20 transition-all duration-300 animate-cascade-in"
              style={{ animationDelay: '0.5s' }}
              data-testid="notifications-button"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-pruning-red rounded-full animate-pulse" />
            </Button>
            
            {/* User Avatar */}
            <Link href="/profile" data-testid="profile-link">
              <div
                className="w-8 h-8 bg-gradient-to-br from-timeline-green to-tva-orange rounded-full flex items-center justify-center cursor-pointer animate-cascade-in"
                style={{ animationDelay: '0.5s' }}
              >
                <User className="text-white text-sm" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
