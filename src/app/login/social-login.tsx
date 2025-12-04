"use client";

export function SocialLogin() {
  return (
    <div className="space-y-3 text-center">
      <div className="flex items-center gap-3 text-xs uppercase tracking-wide text-slate-400">
        <span className="h-px flex-1 bg-slate-200" />
        Or continue with
        <span className="h-px flex-1 bg-slate-200" />
      </div>
      <button
        type="button"
        className="w-full rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
        disabled
      >
        Social login coming soon
      </button>
    </div>
  );
}
