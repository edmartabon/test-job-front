"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useBookingDetail } from "@/hooks/useBookingDetail";
import { BookingSummary } from "@/components/BookingSummary";
import { AttachmentList } from "@/components/AttachmentList";
import { MessageList } from "@/components/MessageList";
import { MessageForm } from "@/components/MessageForm";

export default function BookingDetailPage() {
  const params = useParams<{ id: string }>();
  const bookingId = Array.isArray(params?.id) ? params?.id[0] : params?.id;
  const router = useRouter();
  const { token, isAuthenticated, isLoading: authLoading } = useAuth();
  const {
    booking,
    attachments,
    messages,
    isLoading,
    error,
    refetch,
  } = useBookingDetail(bookingId, token);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [authLoading, isAuthenticated, router]);

  if (!bookingId) {
    return <p className="text-sm text-slate-500">Booking ID is missing.</p>;
  }

  if (!isAuthenticated) {
    return (
      <div className="py-16 text-center text-sm text-slate-500">
        Checking your session…
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="h-40 animate-pulse rounded-2xl bg-slate-200/60" />
        <div className="h-32 animate-pulse rounded-2xl bg-slate-200/60" />
        <div className="h-48 animate-pulse rounded-2xl bg-slate-200/60" />
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
        {error || "We couldn't find that booking."}
        <button
          onClick={refetch}
          className="ml-4 underline transition hover:text-red-800"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center text-sm text-slate-600">
        <button
          onClick={() => router.push('/bookings')}
          className="flex items-center gap-1 hover:text-slate-900 transition"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          Back to Bookings
        </button>
      </nav>

      {/* Booking Summary */}
      <BookingSummary booking={booking} />

      {/* Quick Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl bg-gradient-to-br from-indigo-50 to-indigo-100 p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-indigo-600">Attachments</p>
              <p className="mt-1 text-2xl font-bold text-indigo-900">{attachments.length}</p>
            </div>
            <svg className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
            </svg>
          </div>
        </div>
        
        <div className="rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100 p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-emerald-600">Messages</p>
              <p className="mt-1 text-2xl font-bold text-emerald-900">{messages.length}</p>
            </div>
            <svg className="h-8 w-8 text-emerald-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
            </svg>
          </div>
        </div>
        
        <div className="rounded-xl bg-gradient-to-br from-amber-50 to-amber-100 p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-amber-600">Status</p>
              <p className="mt-1 text-2xl font-bold text-amber-900">{booking.status || 'Active'}</p>
            </div>
            <svg className="h-8 w-8 text-amber-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Attachments Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-indigo-100 p-2">
              <svg className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-slate-900">
              Project Files & Attachments
            </h2>
          </div>
          <button
            onClick={refetch}
            className="flex items-center gap-2 rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-200"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
            Refresh
          </button>
        </div>
        <AttachmentList attachments={attachments} />
      </section>

      {/* Messages Section */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-emerald-100 p-2">
            <svg className="h-5 w-5 text-emerald-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            Project Communication
          </h2>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 bg-slate-50 px-6 py-4 rounded-t-2xl">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-700">
                {messages.length} {messages.length === 1 ? 'message' : 'messages'}
              </p>
              <span className="text-xs text-slate-500">Real-time updates</span>
            </div>
          </div>
          <div className="p-6">
            <div className="max-h-[400px] space-y-4 overflow-y-auto pr-2 mb-6">
              <MessageList messages={messages} />
            </div>
            <div className="border-t border-slate-200 pt-6">
              <MessageForm
                bookingId={bookingId}
                token={token}
                onMessageCreated={refetch}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
