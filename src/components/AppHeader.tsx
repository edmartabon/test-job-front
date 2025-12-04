"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export const AppHeader = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <header className="bg-white/90 shadow-sm backdrop-blur border-b border-slate-200">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-lg font-semibold text-slate-900">
          Customer Portal
        </Link>

        {isAuthenticated ? (
          <div className="flex items-center gap-4 text-sm">
            <nav className="flex items-center gap-3 text-slate-600">
              <Link
                href="/bookings"
                className={`hover:text-slate-900 ${
                  pathname?.startsWith("/bookings")
                    ? "text-slate-900 font-medium"
                    : ""
                }`}
              >
                My Bookings
              </Link>
            </nav>
            <span className="hidden text-slate-500 sm:inline">
              {user?.email}
            </span>
            <button
              onClick={handleLogout}
              className="rounded-full border border-slate-200 px-4 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link
            href="/login"
            className="rounded-full border border-slate-900 px-4 py-1.5 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
          >
            Login
          </Link>
        )}
      </div>
    </header>
  );
};
