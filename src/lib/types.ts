export type SenderType = 'customer' | 'staff';

export interface User {
  id: number;
  email: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  serviceM8ClientUuid?: string | null;
}

export interface AuthPayload {
  tokenType: string;
  accessToken: string;
  expiresIn: number;
  issuedAt: string;
  expiresAt: string;
  user: User;
}

export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
  meta?: Record<string, unknown>;
}

export interface ApiErrorResponse {
  success: false;
  error: {
    message: string;
    code?: string;
    details?: unknown;
  };
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

export interface BookingSummaryInfo {
  attachmentsCount: number;
  messagesCount: number;
  lastMessageAt: string | null;
}

export type BookingStatus = string;

export interface Booking {
  id: string;
  title: string;
  description?: string;
  status?: BookingStatus;
  scheduledStart?: string;
  scheduledEnd?: string;
  address?: string;
  clientName?: string;
  jobNumber?: string;
  metadata?: {
    clientUuid?: string;
    lastModified?: string;
  };
  summary?: BookingSummaryInfo;
}

export interface Attachment {
  id: string;
  filename: string;
  url?: string;
  mimeType?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Message {
  id: number;
  bookingId: string;
  senderType: SenderType;
  text: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginCredentials {
  // Either `email` or `phone` should be provided along with `password`.
  // Either `email` or `phone` (or both) may be provided. Password is required
  // for authentication flows.
  email?: string;
  phone?: string;
  password: string;
}
