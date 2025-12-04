"use client";

import { Booking } from "@/lib/types";

interface BookingSummaryProps {
  booking: Booking;
}

const formatDateTime = (value?: string) => {
  if (!value) return "Not scheduled";
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: value.includes("T") ? "short" : undefined,
  }).format(new Date(value));
};

export const BookingSummary = ({ booking }: BookingSummaryProps) => {
  return (
    <section className="rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 shadow-md overflow-hidden">
      {/* Header with gradient background */}
      <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 px-8 py-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center rounded-md bg-white/20 backdrop-blur-sm px-3 py-1 text-xs font-semibold text-white ring-1 ring-inset ring-white/30">
                Job #{booking.jobNumber || booking.id}
              </span>
              {booking.status && (
                <span className="inline-flex items-center rounded-md bg-emerald-400/90 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white shadow-sm">
                  {booking.status}
                </span>
              )}
            </div>
            <h1 className="text-3xl font-bold text-white sm:text-4xl">{booking.title}</h1>
            {booking.description && (
              <p className="mt-3 text-base text-indigo-50 leading-relaxed max-w-3xl">
                {booking.description}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Details Grid */}
      <div className="px-8 py-6">
        <dl className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 rounded-lg bg-indigo-100 p-3">
              <svg className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1">Start Date & Time</dt>
              <dd className="text-base font-semibold text-slate-900">{formatDateTime(booking.scheduledStart)}</dd>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 rounded-lg bg-emerald-100 p-3">
              <svg className="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1">End Date & Time</dt>
              <dd className="text-base font-semibold text-slate-900">{formatDateTime(booking.scheduledEnd)}</dd>
            </div>
          </div>
          
          {booking.address && (
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 rounded-lg bg-amber-100 p-3">
                <svg className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1">Project Location</dt>
                <dd className="text-base font-semibold text-slate-900">{booking.address}</dd>
              </div>
            </div>
          )}
          
          {booking.clientName && (
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 rounded-lg bg-purple-100 p-3">
                <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1">Client Name</dt>
                <dd className="text-base font-semibold text-slate-900">{booking.clientName}</dd>
              </div>
            </div>
          )}
        </dl>
      </div>
    </section>
  );
};
