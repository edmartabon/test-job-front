"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AuthForm } from "./auth-form";
import { useAuth } from "@/hooks/useAuth";

export default function LoginPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace("/bookings");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isAuthenticated) {
    return <p className="text-center text-sm text-slate-500">Redirecting…</p>;
  }

  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-xl">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold text-slate-900">Sign in</h1>
          <p className="text-sm text-slate-500">
            Enter the email and phone number linked to your account.
          </p>
        </div>
        <div className="mt-6 space-y-6">
          <AuthForm />
          <p className="text-center text-sm text-slate-500">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
