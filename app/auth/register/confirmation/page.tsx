import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle, Mail } from "lucide-react";
import Link from "next/link";

export default function RegistrationConfirmation() {
  return (
    <div className="container flex items-center justify-center min-h-screen px-4">
      <Card className="w-full max-w-md border-t-4 border-t-primary">
        <CardHeader className="space-y-1 flex flex-col items-center pt-8">
          <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl text-center">
            Registration Successful!
          </CardTitle>
        </CardHeader>

        <CardContent className="text-center space-y-6 pb-6">
          <p className="text-muted-foreground">
            Thank you for registering with Zenith. We&apos;ve sent an activation
            link to your email address.
          </p>

          <div className="bg-muted/50 rounded-lg p-4 flex items-center space-x-4 mx-auto max-w-xs">
            <Mail className="h-6 w-6 text-primary" />
            <div className="text-left">
              <p className="text-sm font-medium">Check your inbox</p>
              <p className="text-xs text-muted-foreground">
                Please click the link in the email to activate your account
              </p>
            </div>
          </div>

          <div className="text-sm text-muted-foreground">
            <p>Didn&apos;t receive an email? Check your spam folder or</p>
            <p>
              contact support at{" "}
              <span className="font-medium">support@zenith.com</span>
            </p>
          </div>
        </CardContent>

        <CardFooter className="flex justify-center pb-8">
          <Button asChild variant="outline">
            <Link href="/auth/login">Return to Login</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
