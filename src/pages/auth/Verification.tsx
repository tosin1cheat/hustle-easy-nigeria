
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, ArrowRight } from "lucide-react";

const Verification = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-hustlr-light py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Check your email</CardTitle>
          <CardDescription className="text-center">
            We've sent a verification link to your email address
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4">
          <div className="bg-blue-50 p-3 rounded-full">
            <Mail className="h-10 w-10 text-hustlr-green" />
          </div>
          <div className="text-center space-y-2">
            <p className="text-gray-600">
              Please check your email inbox and click on the verification link to complete your registration.
            </p>
            <p className="text-gray-500 text-sm">
              If you don't see the email, check your spam folder.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Link to="/auth/sign-in" className="w-full">
            <Button variant="outline" className="w-full flex items-center justify-center">
              <span>Continue to Sign In</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <p className="text-sm text-gray-600 text-center">
            Didn't receive an email?{' '}
            <Link to="/auth/sign-up" className="text-hustlr-green font-semibold hover:underline">
              Try again
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Verification;
