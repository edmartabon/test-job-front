"use client";

import { FormEvent, useState } from "react";
import { apiFetch } from "@/lib/api";
import { ApiResponse, Message } from "@/lib/types";

interface MessageFormProps {
  bookingId: string;
  token?: string | null;
  onMessageCreated?: () => void;
}

export const MessageForm = ({
  bookingId,
  token,
  onMessageCreated,
}: MessageFormProps) => {
  const [text, setText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!text.trim() || !token) return;
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await apiFetch<ApiResponse<Message>>(
        `/api/bookings/${bookingId}/messages`,
        {
          method: "POST",
          token,
          body: { text: text.trim() },
        }
      );

      if ("success" in response && response.success) {
        setText("");
        onMessageCreated?.();
      } else {
        throw new Error(response.error?.message || "Unable to send message");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <textarea
        value={text}
        onChange={(event) => setText(event.target.value)}
        rows={3}
        placeholder="Type your message..."
        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:opacity-50"
        disabled={isSubmitting || !token}
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting || !token || !text.trim()}
          className="rounded-full bg-indigo-600 px-6 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </button>
      </div>
    </form>
  );
};
