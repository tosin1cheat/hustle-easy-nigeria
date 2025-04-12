
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from "@/components/ui/progress";
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';

const formSchema = z.object({
  email: z.string()
    .email({ message: 'Please enter a valid email address' }),
  password: z.string()
    .min(6, { message: 'Password must be at least 6 characters' }),
});

type FormData = z.infer<typeof formSchema>;

const SignIn = () => {
  const { signIn, user } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [authStatus, setAuthStatus] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  // Check if user is already logged in
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  // Progress bar animation
  useEffect(() => {
    if (isLoading) {
      const timer = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= 90) {
            clearInterval(timer);
            return 90;
          }
          return prevProgress + 10;
        });
      }, 500);
      
      return () => {
        clearInterval(timer);
      };
    } else {
      setProgress(0);
    }
  }, [isLoading]);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      setIsLoading(true);
      setAuthStatus("Signing in...");
      toast.loading('Signing in...', { id: 'signin' });
      
      // Check auth status from Supabase directly
      const { data: sessionData, error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });
      
      if (error) {
        throw error;
      }
      
      // If session data exists, we've successfully logged in
      if (sessionData.session) {
        setAuthStatus("Success! Redirecting...");
        toast.success('Successfully signed in', { id: 'signin' });
        
        // Force progress to complete
        setProgress(100);
        
        // Small delay before redirect for better UX
        setTimeout(() => {
          navigate('/dashboard');
        }, 500);
      } else {
        throw new Error("Failed to sign in - no session returned");
      }
    } catch (error: any) {
      console.error('Sign in error:', error);
      setAuthStatus("Sign in failed");
      toast.error(error.message || 'Failed to sign in', { id: 'signin' });
      setIsLoading(false);
    }
  };

  const handleCancelSignIn = () => {
    if (isLoading) {
      setIsLoading(false);
      setAuthStatus(null);
      toast.dismiss('signin');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-hustlr-light py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Sign In</CardTitle>
          <CardDescription className="text-center">
            Enter your email and password to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading && (
            <div className="mb-4">
              <Progress value={progress} className="h-2 mb-2" />
              <p className="text-sm text-center text-gray-500">{authStatus || "Processing..."}</p>
            </div>
          )}
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input 
                        type="email" 
                        placeholder="your@email.com" 
                        {...field} 
                        disabled={isLoading}
                        autoComplete="email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input 
                        type="password" 
                        placeholder="••••••••" 
                        {...field} 
                        disabled={isLoading}
                        autoComplete="current-password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex gap-2">
                <Button 
                  type="submit" 
                  className="flex-1 bg-hustlr-green hover:bg-hustlr-darkgreen" 
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Signing in...
                    </>
                  ) : (
                    'Sign In'
                  )}
                </Button>
                
                {isLoading && (
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={handleCancelSignIn}
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </form>
          </Form>
          
          <div className="mt-4 text-center text-sm">
            <Link to="/auth/forgot-password" className="text-hustlr-green hover:underline">
              Forgot your password?
            </Link>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/auth/sign-up" className="text-hustlr-green font-semibold hover:underline">
              Sign up
            </Link>
          </p>
          <p className="text-xs text-gray-500 text-center mt-2">
            Note: If verification is enabled in Supabase, you'll need to verify your email before logging in.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignIn;
