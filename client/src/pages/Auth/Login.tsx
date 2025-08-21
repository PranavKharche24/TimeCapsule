import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Eye, EyeOff, LogIn, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuthStore } from '@/store/authStore';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { login } = useAuthStore();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      // Simulate TVA authentication process
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo purposes, accept any valid email/password combination
      const userData = {
        id: 'tva-agent-001',
        username: data.email.split('@')[0],
        email: data.email,
        firstName: 'Agent',
        lastName: data.email.split('@')[0].toUpperCase(),
      };
      
      login(userData);
      
      toast({
        title: "Temporal Access Granted",
        description: "Welcome back to the Time Variance Authority",
      });
      
      setLocation('/dashboard');
    } catch (error) {
      toast({
        title: "Temporal Authentication Failed",
        description: "Invalid credentials. Access denied by TVA security protocols.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-950 via-amber-900 to-yellow-800 relative overflow-hidden flex items-center justify-center px-4 py-12">
      {/* TVA Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#f97316_1px,transparent_1px),linear-gradient(180deg,#f97316_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      {/* Sacred Timeline Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-orange-400/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <Card className="w-full max-w-md relative z-10 bg-gradient-to-br from-orange-900/60 to-amber-900/60 backdrop-blur-lg border-orange-500/30" data-testid="login-card">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="relative">
              <Clock className="w-12 h-12 text-orange-300" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-100 font-mono tracking-wider">TIME CAPSULE</div>
              <div className="text-xs text-orange-300/60">TVA TEMPORAL ACCESS</div>
            </div>
          </div>
          
          <Badge variant="outline" className="bg-orange-900/30 border-orange-500/40 text-orange-200 mb-4">
            <LogIn className="w-3 h-3 mr-1" />
            Agent Authentication Required
          </Badge>
          
          <CardTitle className="text-2xl font-bold text-orange-100">Temporal Login Portal</CardTitle>
          <CardDescription className="text-orange-200/70">
            Access your timeline management interface
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-orange-200">Agent Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="agent@tva.gov"
                {...form.register('email')}
                className="bg-orange-900/20 border-orange-500/30 text-orange-100 placeholder:text-orange-300/50 focus:border-orange-400"
                data-testid="input-email"
              />
              {form.formState.errors.email && (
                <p className="text-sm text-red-400 mt-1 flex items-center">
                  <AlertTriangle className="w-3 h-3 mr-1" />
                  {form.formState.errors.email.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="password" className="text-orange-200">Temporal Access Code</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your access code"
                  {...form.register('password')}
                  className="bg-orange-900/20 border-orange-500/30 text-orange-100 placeholder:text-orange-300/50 focus:border-orange-400 pr-10"
                  data-testid="input-password"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 text-orange-300 hover:text-orange-200"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
              {form.formState.errors.password && (
                <p className="text-sm text-red-400 mt-1 flex items-center">
                  <AlertTriangle className="w-3 h-3 mr-1" />
                  {form.formState.errors.password.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-semibold py-3 transition-all duration-300"
              data-testid="button-login"
            >
              {isLoading ? (
                <>
                  <Clock className="w-4 h-4 mr-2 animate-spin" />
                  Authenticating...
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4 mr-2" />
                  Access Temporal Interface
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-orange-200/70 text-sm">
              New TVA operative?{' '}
              <Link href="/auth/register">
                <span className="text-orange-300 hover:text-orange-200 font-semibold cursor-pointer">
                  Register for Timeline Access
                </span>
              </Link>
            </p>
          </div>
          
          <div className="mt-4 p-3 bg-orange-900/20 rounded-lg border border-orange-500/20">
            <p className="text-orange-200/60 text-xs text-center">
              Demo Mode: Use any valid email and password (6+ characters) to access the system
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}