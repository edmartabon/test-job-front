"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export const AuthForm = () => {
  const router = useRouter();
  const { login } = useAuth();
  // Single identifier field that accepts either email or phone.
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      // Ensure a password is provided and an identifier was entered
      // We intentionally don't surface field-specific errors to the user;
      // failures will show a generic "Credentials invalid" message.
      if (!password) {
        // throw to be handled generically below
        throw new Error("invalid");
      }
      const id = identifier.trim();
      if (!id) {
        throw new Error("invalid");
      }

      // Simple email detection: contains '@'. Validate accordingly.
      const isEmail = /\S+@\S+\.\S+/.test(id);

      // Phone validation: strip non-digits and ensure reasonable length (7-15 digits)
      const digits = id.replace(/\D/g, "");
      const isPhone = digits.length >= 7 && digits.length <= 15;

      const creds: any = { password };
      if (isEmail) {
        // validate email shape
        if (!/\S+@\S+\.\S+/.test(id)) {
          throw new Error("The email address is invalid");
        }
        creds.email = id;
      } else {
        // treat as phone
        if (!isPhone) {
          throw new Error("The phone number is invalid");
        }
        creds.phone = id;
      }

      await login(creds as any);
      router.push("/bookings");
    } catch (err) {
      // Always show a single generic message for auth failures.
      setError("Credentials invalid");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <label className="block text-left text-sm font-medium text-slate-700">
        Email / Phone
        <input
          type="text"
          name="identifier"
          autoComplete="username"
          value={identifier}
          onChange={(event) => setIdentifier(event.target.value)}
          className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          placeholder="you@example.com or +1 555 123 4567"
          disabled={isSubmitting}
        />
      </label>

      <label className="block text-left text-sm font-medium text-slate-700">
        Password
        <input
          type="password"
          name="password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          placeholder="••••••••"
          disabled={isSubmitting}
        />
      </label>

      {error && (
        <p className="text-sm font-semibold text-red-600" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-full bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Signing in..." : "Sign in"}
      </button>

      <p className="text-center text-xs text-slate-500">
        By continuing you agree to receive important notifications about your
        bookings.
      </p>
    </form>
  );
};
