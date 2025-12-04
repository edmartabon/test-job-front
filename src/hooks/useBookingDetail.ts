"use client";

import { useCallback, useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import {
  ApiResponse,
  Attachment,
  Booking,
  Message,
} from "@/lib/types";

interface BookingDetailResult {
  booking: Booking | null;
  attachments: Attachment[];
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useBookingDetail = (
  bookingId?: string,
  token?: string | null
): BookingDetailResult => {
  const [booking, setBooking] = useState<Booking | null>(null);
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAll = useCallback(async () => {
    if (!bookingId || !token) return;
    setIsLoading(true);
    setError(null);
    try {
      const [bookingRes, attachmentsRes, messagesRes] = await Promise.all([
        apiFetch<ApiResponse<Booking>>(`/api/bookings/${bookingId}`, {
          token,
        }),
        apiFetch<ApiResponse<Attachment[]>>(
          `/api/bookings/${bookingId}/attachments`,
          { token }
        ),
        apiFetch<ApiResponse<Message[]>>(
          `/api/bookings/${bookingId}/messages`,
          { token }
        ),
      ]);

      if ("success" in bookingRes && bookingRes.success) {
        setBooking(bookingRes.data);
      } else {
        throw new Error(bookingRes.error?.message || "Booking not found");
      }

      if ("success" in attachmentsRes && attachmentsRes.success) {
        setAttachments(attachmentsRes.data);
      } else {
        throw new Error(
          attachmentsRes.error?.message || "Unable to load attachments"
        );
      }

      if ("success" in messagesRes && messagesRes.success) {
        setMessages(messagesRes.data);
      } else {
        throw new Error(messagesRes.error?.message || "Unable to load messages");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setIsLoading(false);
    }
  }, [bookingId, token]);

  useEffect(() => {
    if (bookingId && token) {
      fetchAll();
    } else {
      setBooking(null);
      setAttachments([]);
      setMessages([]);
    }
  }, [bookingId, token, fetchAll]);

  return {
    booking,
    attachments,
    messages,
    isLoading,
    error,
    refetch: fetchAll,
  };
};
