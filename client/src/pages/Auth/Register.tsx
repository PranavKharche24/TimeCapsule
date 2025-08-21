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
import { Checkbox } from '@/components/ui/checkbox';
import { Clock, Eye, EyeOff, UserPlus, AlertTriangle, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuthStore } from '@/store/authStore';

const registerSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  username: z.string().min(3, 'Username must be at least 3 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: 'You must accept the TVA temporal protocols',
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { login } = useAuthStore();

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false,
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    try {
      // Simulate TVA registration process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create new TVA agent profile
      const userData = {
        id: `tva-agent-${Date.now()}`,
        username: data.username,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
      };
      
      login(userData);
      
      toast({
        title: "TVA Agent Registration Complete",
        description: "Welcome to the Time Variance Authority. Your temporal access has been activated.",
      });
      
      setLocation('/dashboard');
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: "Unable to process TVA agent registration. Please try again.",
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
        {[...Array(25)].map((_, i) => (
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

      <Card className="w-full max-w-lg relative z-10 bg-gradient-to-br from-orange-900/60 to-amber-900/60 backdrop-blur-lg border-orange-500/30" data-testid="register-card">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="relative">
              <Clock className="w-12 h-12 text-orange-300" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-100 font-mono tracking-wider">TIME CAPSULE</div>
              <div className="text-xs text-orange-300/60">TVA AGENT RECRUITMENT</div>
            </div>
          </div>
          
          <Badge variant="outline" className="bg-orange-900/30 border-orange-500/40 text-orange-200 mb-4">
            <Shield className="w-3 h-3 mr-1" />
            New Agent Registration
          </Badge>
          
          <CardTitle className="text-2xl font-bold text-orange-100">Join the TVA</CardTitle>
          <CardDescription className="text-orange-200/70">
            Begin your temporal operative training
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName" className="text-orange-200">First Name</Label>
                <Input
                  id="firstName"
                  placeholder="Agent first name"
                  {...form.register('firstName')}
                  className="bg-orange-900/20 border-orange-500/30 text-orange-100 placeholder:text-orange-300/50 focus:border-orange-400"
                  data-testid="input-firstName"
                />
                {form.formState.errors.firstName && (
                  <p className="text-sm text-red-400 mt-1 flex items-center">
                    <AlertTriangle className="w-3 h-3 mr-1" />
                    {form.formState.errors.firstName.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="lastName" className="text-orange-200">Last Name</Label>
                <Input
                  id="lastName"
                  placeholder="Agent last name"
                  {...form.register('lastName')}
                  className="bg-orange-900/20 border-orange-500/30 text-orange-100 placeholder:text-orange-300/50 focus:border-orange-400"
                  data-testid="input-lastName"
                />
                {form.formState.errors.lastName && (
                  <p className="text-sm text-red-400 mt-1 flex items-center">
                    <AlertTriangle className="w-3 h-3 mr-1" />
                    {form.formState.errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="username" className="text-orange-200">Agent Codename</Label>
              <Input
                id="username"
                placeholder="Choose your operative codename"
                {...form.register('username')}
                className="bg-orange-900/20 border-orange-500/30 text-orange-100 placeholder:text-orange-300/50 focus:border-orange-400"
                data-testid="input-username"
              />
              {form.formState.errors.username && (
                <p className="text-sm text-red-400 mt-1 flex items-center">
                  <AlertTriangle className="w-3 h-3 mr-1" />
                  {form.formState.errors.username.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="email" className="text-orange-200">TVA Email Address</Label>
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
                  placeholder="Create secure access code"
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

            <div>
              <Label htmlFor="confirmPassword" className="text-orange-200">Confirm Access Code</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm your access code"
                  {...form.register('confirmPassword')}
                  className="bg-orange-900/20 border-orange-500/30 text-orange-100 placeholder:text-orange-300/50 focus:border-orange-400 pr-10"
                  data-testid="input-confirmPassword"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 text-orange-300 hover:text-orange-200"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
              {form.formState.errors.confirmPassword && (
                <p className="text-sm text-red-400 mt-1 flex items-center">
                  <AlertTriangle className="w-3 h-3 mr-1" />
                  {form.formState.errors.confirmPassword.message}
                </p>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="acceptTerms"
                checked={form.watch('acceptTerms')}
                onCheckedChange={(checked) => form.setValue('acceptTerms', !!checked)}
                className="border-orange-500/30 data-[state=checked]:bg-orange-600"
                data-testid="checkbox-terms"
              />
              <Label htmlFor="acceptTerms" className="text-orange-200/80 text-sm">
                I accept the TVA temporal protocols and Sacred Timeline regulations
              </Label>
            </div>
            {form.formState.errors.acceptTerms && (
              <p className="text-sm text-red-400 mt-1 flex items-center">
                <AlertTriangle className="w-3 h-3 mr-1" />
                {form.formState.errors.acceptTerms.message}
              </p>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-semibold py-3 transition-all duration-300"
              data-testid="button-register"
            >
              {isLoading ? (
                <>
                  <Clock className="w-4 h-4 mr-2 animate-spin" />
                  Processing Registration...
                </>
              ) : (
                <>
                  <UserPlus className="w-4 h-4 mr-2" />
                  Join TVA Operations
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-orange-200/70 text-sm">
              Already a TVA operative?{' '}
              <Link href="/auth/login">
                <span className="text-orange-300 hover:text-orange-200 font-semibold cursor-pointer">
                  Access your interface
                </span>
              </Link>
            </p>
          </div>
          
          <div className="mt-4 p-3 bg-orange-900/20 rounded-lg border border-orange-500/20">
            <p className="text-orange-200/60 text-xs text-center">
              Demo Mode: Registration will create a temporary account for testing purposes
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}