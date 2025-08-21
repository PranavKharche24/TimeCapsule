import { useState } from 'react';
import { Link } from 'wouter';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Hourglass, Eye, EyeOff } from 'lucide-react';

const registerSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  username: z.string().min(3, 'Username must be at least 3 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: 'You must accept the terms and conditions',
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
      // TODO: Implement register API call
      console.log('Register data:', data);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Register error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cosmic-black via-cosmic-gray to-temporal-smoke opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-timeline-green/5 to-transparent animate-timeline-flow" />
      </div>

      <Card className="w-full max-w-md glassmorphism animate-cascade-in relative z-10" data-testid="register-card">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-timeline-green to-tva-orange rounded-lg flex items-center justify-center">
              <Hourglass className="text-white text-xl" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-timeline-green to-tva-orange bg-clip-text text-transparent">
              TimeCapsule
            </span>
          </div>
          <CardTitle className="text-2xl font-bold">Join the Timeline</CardTitle>
          <CardDescription>
            Create your account to start your temporal journey
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  placeholder="John"
                  {...form.register('firstName')}
                  className="glassmorphism border-white/20 focus:border-timeline-green"
                  data-testid="input-first-name"
                />
                {form.formState.errors.firstName && (
                  <p className="text-sm text-pruning-red mt-1" data-testid="error-first-name">
                    {form.formState.errors.firstName.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  placeholder="Doe"
                  {...form.register('lastName')}
                  className="glassmorphism border-white/20 focus:border-timeline-green"
                  data-testid="input-last-name"
                />
                {form.formState.errors.lastName && (
                  <p className="text-sm text-pruning-red mt-1" data-testid="error-last-name">
                    {form.formState.errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="temporal_traveler"
                {...form.register('username')}
                className="glassmorphism border-white/20 focus:border-timeline-green"
                data-testid="input-username"
              />
              {form.formState.errors.username && (
                <p className="text-sm text-pruning-red mt-1" data-testid="error-username">
                  {form.formState.errors.username.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                {...form.register('email')}
                className="glassmorphism border-white/20 focus:border-timeline-green"
                data-testid="input-email"
              />
              {form.formState.errors.email && (
                <p className="text-sm text-pruning-red mt-1" data-testid="error-email">
                  {form.formState.errors.email.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Create a strong password"
                  {...form.register('password')}
                  className="glassmorphism border-white/20 focus:border-timeline-green pr-10"
                  data-testid="input-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  data-testid="toggle-password-visibility"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {form.formState.errors.password && (
                <p className="text-sm text-pruning-red mt-1" data-testid="error-password">
                  {form.formState.errors.password.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm your password"
                  {...form.register('confirmPassword')}
                  className="glassmorphism border-white/20 focus:border-timeline-green pr-10"
                  data-testid="input-confirm-password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  data-testid="toggle-confirm-password-visibility"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {form.formState.errors.confirmPassword && (
                <p className="text-sm text-pruning-red mt-1" data-testid="error-confirm-password">
                  {form.formState.errors.confirmPassword.message}
                </p>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="acceptTerms"
                {...form.register('acceptTerms')}
                data-testid="checkbox-accept-terms"
              />
              <label htmlFor="acceptTerms" className="text-sm text-gray-600 dark:text-gray-400">
                I accept the{' '}
                <Link href="/terms">
                  <span className="text-timeline-green hover:text-timeline-green/80 cursor-pointer">
                    Terms of Service
                  </span>
                </Link>{' '}
                and{' '}
                <Link href="/privacy">
                  <span className="text-timeline-green hover:text-timeline-green/80 cursor-pointer">
                    Privacy Policy
                  </span>
                </Link>
              </label>
            </div>
            {form.formState.errors.acceptTerms && (
              <p className="text-sm text-pruning-red" data-testid="error-accept-terms">
                {form.formState.errors.acceptTerms.message}
              </p>
            )}

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-timeline-green to-tva-orange hover:opacity-90 transition-opacity"
              disabled={isLoading}
              data-testid="button-register"
            >
              {isLoading ? (
                <div className="tva-spinner" />
              ) : (
                'Create Account'
              )}
            </Button>

            <div className="text-center text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{' '}
              <Link href="/login" data-testid="link-login">
                <span className="text-tva-orange hover:text-tva-orange/80 cursor-pointer font-semibold">
                  Sign in here
                </span>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
