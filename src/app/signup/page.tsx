import Link from "next/link";
import { SignupForm } from "./signup-form";

export default function SignUpPage() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-xl">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold text-slate-900">
            Create your account
          </h1>
          <p className="text-sm text-slate-500">
            Fill in the details below to access the customer portal.
          </p>
        </div>
        <div className="mt-6 space-y-6">
          <SignupForm />
          <p className="text-center text-sm text-slate-500">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
