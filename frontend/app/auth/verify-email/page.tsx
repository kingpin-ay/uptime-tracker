"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle, CheckCheck, XCircle, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function VerifyEmailPage() {
  const [verificationState, setVerificationState] = useState<
    "loading" | "success" | "error"
  >("loading");
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  // Get the token from the URL query parameters
  const token = searchParams.get("token");

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        setVerificationState("error");
        return;
      }

      try {
        // In a real application, you would call your API to verify the email
        // await fetch('/api/auth/verify-email', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({ token }),
        // })

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000));

        setVerificationState("success");
        toast({
          title: "Email verified",
          description: "Your email has been verified successfully.",
        });

        // Redirect to login after 3 seconds
        setTimeout(() => {
          router.push("/login");
        }, 3000);
      } catch (error) {
        setVerificationState("error");
        toast({
          title: "Verification failed",
          description: "Failed to verify your email. Please try again.",
          variant: "destructive",
        });
      }
    };

    verifyEmail();
  }, [token, router, toast]);

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Link
        href="/"
        className="absolute right-4 top-4 md:right-8 md:top-8 flex items-center gap-2 font-bold text-lg"
      >
        <CheckCircle className="h-6 w-6 text-primary" />
        <span>UptimeMonitor</span>
      </Link>

      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          {verificationState === "loading" && (
            <>
              <div className="flex justify-center mb-4">
                <Loader2 className="h-8 w-8 text-primary animate-spin" />
              </div>
              <CardTitle className="text-2xl text-center">
                Verifying your email
              </CardTitle>
              <CardDescription className="text-center">
                Please wait while we verify your email address...
              </CardDescription>
            </>
          )}

          {verificationState === "success" && (
            <>
              <div className="flex justify-center mb-4">
                <div className="rounded-full bg-green-100 p-3">
                  <CheckCheck className="h-8 w-8 text-green-600" />
                </div>
              </div>
              <CardTitle className="text-2xl text-center">
                Email Verified
              </CardTitle>
              <CardDescription className="text-center">
                Your email has been verified successfully. You will be
                redirected to the login page shortly.
              </CardDescription>
            </>
          )}

          {verificationState === "error" && (
            <>
              <div className="flex justify-center mb-4">
                <div className="rounded-full bg-red-100 p-3">
                  <XCircle className="h-8 w-8 text-red-600" />
                </div>
              </div>
              <CardTitle className="text-2xl text-center">
                Verification Failed
              </CardTitle>
              <CardDescription className="text-center">
                The verification link is invalid or has expired.
              </CardDescription>
            </>
          )}
        </CardHeader>

        <CardFooter className="flex justify-center">
          {verificationState === "loading" ? (
            <p className="text-sm text-muted-foreground">
              This may take a few moments...
            </p>
          ) : verificationState === "success" ? (
            <Button asChild>
              <Link href="/login">Go to login</Link>
            </Button>
          ) : (
            <Button asChild>
              <Link href="/login">Back to login</Link>
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
