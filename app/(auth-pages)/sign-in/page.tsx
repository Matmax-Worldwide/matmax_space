"use client";

import { signInAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ThemeSwitcher } from "@/components/theme-switcher";
import Link from "next/link";
import { AuthLayout } from "@/src/core/ui/layouts/templates/AuthLayout";
import { useSearchParams } from "next/navigation";
import { useMemo, Suspense } from "react";

// Client component that uses search params
function SignInForm() {
  const searchParams = useSearchParams();
  const message = useMemo<Message | null>(() => {
    const errorMessage = searchParams?.get("error");
    const successMessage = searchParams?.get("message");
    
    if (errorMessage) {
      return { error: errorMessage };
    } else if (successMessage) {
      return { success: successMessage };
    }
    return null;
  }, [searchParams]);

  return (
    <form className="flex flex-col gap-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-center">Sign In</h1>
        <ThemeSwitcher />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input name="email" placeholder="you@example.com" required />
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label htmlFor="password">Password</Label>
          <Link
            className="text-xs text-foreground/70 hover:text-foreground underline"
            href="/forgot-password"
          >
            Forgot Password?
          </Link>
        </div>
        <Input
          type="password"
          name="password"
          placeholder="Your password"
          required
        />
      </div>
      
      <SubmitButton pendingText="Signing In..." formAction={signInAction} className="mt-2 w-full">
        Sign in
      </SubmitButton>
      
      {message && <FormMessage message={message} />}
      
      <div className="text-center text-sm text-muted-foreground mt-4">
        Don't have an account?{" "}
        <Link className="text-primary hover:underline font-medium" href="/sign-up">
          Sign up
        </Link>
      </div>
    </form>
  );
}

// Loading fallback
function SignInFormLoading() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-center">Sign In</h1>
        <div className="w-8 h-8"></div> {/* Placeholder for ThemeSwitcher */}
      </div>
      <div className="animate-pulse space-y-4">
        <div className="h-10 bg-gray-200 rounded"></div>
        <div className="h-10 bg-gray-200 rounded"></div>
        <div className="h-10 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
}

export default function Login() {
  return (
    <AuthLayout showLogo={true} contentClassName="mt-0">
      <Suspense fallback={<SignInFormLoading />}>
        <SignInForm />
      </Suspense>
    </AuthLayout>
  );
}
