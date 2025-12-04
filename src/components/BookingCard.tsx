"use client";

import Link from "next/link";
import { Booking } from "@/lib/types";

interface BookingCardProps {
  booking: Booking;
}

const formatDate = (value?: string) => {
  if (!value) return "Not scheduled";
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: value.includes("T") ? "short" : undefined,
  }).format(new Date(value));
};

export const BookingCard = ({ booking }: BookingCardProps) => {
  return (
    <Link href={`/bookings/${booking.id}`}>
      <div className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-indigo-200">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center rounded-md bg-indigo-50 px-2.5 py-0.5 text-xs font-semibold text-indigo-700 ring-1 ring-inset ring-indigo-700/10">
                #{booking.jobNumber || booking.id}
              </span>
              {booking.status && (
                <span className="inline-flex items-center rounded-md bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-700/10 uppercase">
                  {booking.status}
                </span>
              )}
            </div>
            <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
              {booking.title}
            </h3>
          </div>
          <svg className="h-5 w-5 text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-indigo-600" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </div>

        <dl className="mt-5 space-y-3 text-sm">
          <div className="flex items-center gap-2 text-slate-600">
            <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
            </svg>
            <dt className="font-medium text-slate-500">Scheduled:</dt>
            <dd className="font-semibold">{formatDate(booking.scheduledStart)}</dd>
          </div>
          {booking.address && (
            <div className="flex items-start gap-2 text-slate-600">
              <svg className="h-4 w-4 text-slate-400 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
              <dt className="font-medium text-slate-500">Location:</dt>
              <dd className="flex-1">{booking.address}</dd>
            </div>
          )}
        </dl>

        <div className="mt-6 flex items-center gap-4 border-t border-slate-100 pt-4">
          <div className="flex items-center gap-1.5 text-sm text-slate-600">
            <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
            </svg>
            <span className="font-semibold">{booking.summary?.attachmentsCount ?? 0}</span>
            <span className="text-slate-500">files</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-slate-600">
            <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
            </svg>
            <span className="font-semibold">{booking.summary?.messagesCount ?? 0}</span>
            <span className="text-slate-500">messages</span>
          </div>
          <div className="ml-auto">
            <span className="inline-flex items-center gap-1 text-sm font-semibold text-indigo-600 group-hover:text-indigo-700">
              View Project
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};
