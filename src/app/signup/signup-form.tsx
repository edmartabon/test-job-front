"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";
import { ApiResponse, User } from "@/lib/types";

export function SignupForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const inputClasses =
    "mt-1 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:opacity-60";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);
    setIsLoading(true);
    // Capture the form element reference before any await/async work.
    // React may null out the synthetic event after an await, so using
    // `event.currentTarget` after awaits can be `null` and calling
    // `.reset()` on it will throw. Use a local `form` reference instead.
    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      first_name: formData.get("first_name") as string,
      last_name: formData.get("last_name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      password: formData.get("password") as string,
    };

    try {
      const response = await apiFetch<ApiResponse<User>>("/api/auth/register", {
        method: "POST",
        body: payload,
      });

      if ("success" in response && response.success) {
        setSuccess("Account created! Redirecting to login…");
        // Reset the captured form reference (defensive null check).
        try {
          form?.reset();
        } catch (resetErr) {
          // If reset fails for some reason, log but don't block the flow.
          // eslint-disable-next-line no-console
          console.warn("Form reset failed:", resetErr);
        }
        setTimeout(() => router.push("/login"), 1200);
      } else {
        throw new Error(response.error?.message || "Unable to create account.");
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "We couldn't sign you up just yet."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-left text-sm font-medium text-slate-700">
          First name
          <input
            name="first_name"
            placeholder="Jane"
            required
            disabled={isLoading}
            className={inputClasses}
          />
        </label>
        <label className="text-left text-sm font-medium text-slate-700">
          Last name
          <input
            name="last_name"
            placeholder="Smith"
            required
            disabled={isLoading}
            className={inputClasses}
          />
        </label>
      </div>

      <label className="block text-left text-sm font-medium text-slate-700">
        Email
        <input
          type="email"
          name="email"
          autoComplete="email"
          placeholder="you@example.com"
          required
          disabled={isLoading}
          className={inputClasses}
        />
      </label>

      <label className="block text-left text-sm font-medium text-slate-700">
        Phone number
        <input
          type="tel"
          name="phone"
          placeholder="+1 555 123 4567"
          autoComplete="tel"
          required
          disabled={isLoading}
          className={inputClasses}
        />
      </label>

      <label className="block text-left text-sm font-medium text-slate-700">
        Password
        <input
          type="password"
          name="password"
          placeholder="••••••••"
          required
          disabled={isLoading}
          className={inputClasses}
        />
      </label>

      {error && (
        <p className="text-sm font-semibold text-red-600" role="alert">
          {error}
        </p>
      )}
      {success && (
        <p className="text-sm font-semibold text-emerald-600" role="status">
          {success}
        </p>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-full bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isLoading ? "Creating account…" : "Create account"}
      </button>
    </form>
  );
}
