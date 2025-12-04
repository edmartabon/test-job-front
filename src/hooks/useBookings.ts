"use client";

import { useCallback, useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import { ApiResponse, Booking } from "@/lib/types";
import { useAuth } from "./useAuth";

interface UseBookingsResult {
  bookings: Booking[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useBookings = (): UseBookingsResult => {
  const { token } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBookings = useCallback(async () => {
    if (!token) return;
    setIsLoading(true);
    setError(null);
    try {
      const response = await apiFetch<ApiResponse<Booking[]>>(
        "/api/bookings",
        {
          token,
        }
      );

      if ("success" in response && response.success) {
        setBookings(response.data);
      } else {
        throw new Error(response.error?.message || "Unable to load bookings");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      fetchBookings();
    } else {
      setBookings([]);
    }
  }, [fetchBookings, token]);

  return {
    bookings,
    isLoading,
    error,
    refetch: fetchBookings,
  };
};
