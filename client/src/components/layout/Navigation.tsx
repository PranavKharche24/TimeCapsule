import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Home, Calendar, Users, User, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import { useAuthStore } from "@/store/authStore";

export default function Navigation() {
  const [location] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuthStore();

  const navigation = [
    { name: "Home", href: "/", icon: Home },
    { name: "Dashboard", href: "/dashboard", icon: Calendar, auth: true },
    { name: "Community", href: "/community", icon: Users },
    { name: "Profile", href: "/profile", icon: User, auth: true },
  ];

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-orange-950/90 via-amber-900/90 to-yellow-800/90 backdrop-blur-lg border-b border-orange-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center space-x-3 cursor-pointer group" data-testid="nav-logo">
              <div className="relative">
                <Clock className="w-8 h-8 text-orange-300 group-hover:text-orange-200 transition-colors" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
              </div>
              <div>
                <div className="text-xl font-bold text-orange-100 font-mono tracking-wider">TIME CAPSULE</div>
                <div className="text-xs text-orange-300/60">TVA PROTOCOL</div>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => {
              if (item.auth && !isAuthenticated) return null;
              
              const isActive = location === item.href;
              const Icon = item.icon;
              
              return (
                <Link key={item.name} href={item.href}>
                  <Button
                    variant="ghost"
                    className={`flex items-center space-x-2 transition-all duration-300 ${
                      isActive
                        ? "bg-orange-600/20 text-orange-200 border border-orange-500/30"
                        : "text-orange-300/80 hover:text-orange-200 hover:bg-orange-800/20"
                    }`}
                    data-testid={`nav-${item.name.toLowerCase()}`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Button>
                </Link>
              );
            })}
          </div>

          {/* Auth Buttons / User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Badge variant="outline" className="bg-orange-900/30 border-orange-500/40 text-orange-200" data-testid="user-badge">
                  <User className="w-3 h-3 mr-1" />
                  {user?.username}
                </Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="text-orange-300/80 hover:text-orange-200 hover:bg-orange-800/20"
                  data-testid="button-logout"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link href="/auth/login">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-orange-300/80 hover:text-orange-200 hover:bg-orange-800/20"
                    data-testid="nav-login"
                  >
                    Login
                  </Button>
                </Link>
                <Link href="/auth/register">
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white"
                    data-testid="nav-register"
                  >
                    Register
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-orange-300 hover:text-orange-200"
              data-testid="mobile-menu-toggle"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-orange-500/20" data-testid="mobile-menu">
            <div className="space-y-2">
              {navigation.map((item) => {
                if (item.auth && !isAuthenticated) return null;
                
                const isActive = location === item.href;
                const Icon = item.icon;
                
                return (
                  <Link key={item.name} href={item.href}>
                    <Button
                      variant="ghost"
                      className={`w-full justify-start space-x-2 ${
                        isActive
                          ? "bg-orange-600/20 text-orange-200"
                          : "text-orange-300/80 hover:text-orange-200 hover:bg-orange-800/20"
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                      data-testid={`mobile-nav-${item.name.toLowerCase()}`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.name}</span>
                    </Button>
                  </Link>
                );
              })}
              
              {/* Mobile Auth */}
              <div className="pt-4 border-t border-orange-500/20">
                {isAuthenticated ? (
                  <div className="space-y-2">
                    <div className="px-3 py-2 text-sm text-orange-200">
                      Signed in as {user?.username}
                    </div>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-orange-300/80 hover:text-orange-200 hover:bg-orange-800/20"
                      onClick={handleLogout}
                      data-testid="mobile-logout"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Link href="/auth/login">
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-orange-300/80 hover:text-orange-200 hover:bg-orange-800/20"
                        onClick={() => setIsMenuOpen(false)}
                        data-testid="mobile-login"
                      >
                        Login
                      </Button>
                    </Link>
                    <Link href="/auth/register">
                      <Button
                        className="w-full bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white"
                        onClick={() => setIsMenuOpen(false)}
                        data-testid="mobile-register"
                      >
                        Register
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}