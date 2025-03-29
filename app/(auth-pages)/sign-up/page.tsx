"use client";

import { signUpAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, Suspense } from "react";
import { AuthLayout } from "@/src/core/ui/layouts/templates/AuthLayout";
import { SmtpMessage } from "../smtp-message";

// Client component that uses search params
function SignUpForm() {
  const searchParams = useSearchParams();
  const message = useMemo<Message | null>(() => {
    const errorMessage = searchParams?.get("error");
    const successMessage = searchParams?.get("message");
    
    if (errorMessage) {
      return { error: errorMessage };
    } else if (successMessage) {
      return { message: successMessage };
    }
    return null;
  }, [searchParams]);
  
  // Show confirmation message if user signed up
  if (message && "message" in message) {
    return (
      <div className="w-full flex-1 flex items-center justify-center gap-2 p-4">
        <FormMessage message={message} />
      </div>
    );
  }

  return (
    <>
      <form className="flex flex-col gap-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input name="email" placeholder="you@example.com" required />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            name="password"
            placeholder="Your password"
            minLength={6}
            required
          />
        </div>
        
        <SubmitButton formAction={signUpAction} pendingText="Signing up..." className="mt-2 w-full">
          Sign up
        </SubmitButton>
        
        {message && "error" in message && <FormMessage message={message} />}
      </form>
      <div className="mt-4">
        <SmtpMessage />
      </div>
    </>
  );
}

// Loading fallback
function SignUpFormLoading() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Create Account</h1>
      <div className="animate-pulse space-y-4">
        <div className="h-10 bg-gray-200 rounded"></div>
        <div className="h-10 bg-gray-200 rounded"></div>
        <div className="h-10 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
}

export default function Signup() {
  return (
    <AuthLayout
      title="Create Your Account"
      description="Join MatMax Wellness Studio and start your wellness journey"
      footer={
        <div>
          Already have an account?{" "}
          <Link className="text-primary hover:underline font-medium" href="/sign-in">
            Sign in
          </Link>
        </div>
      }
    >
      <Suspense fallback={<SignUpFormLoading />}>
        <SignUpForm />
      </Suspense>
    </AuthLayout>
  );
}
