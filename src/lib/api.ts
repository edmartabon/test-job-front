"use client";

import { ApiErrorResponse } from "./types";

export interface ApiFetchOptions {
  method?: string;
  body?: unknown;
  token?: string | null;
  headers?: HeadersInit;
}

export class ApiError extends Error {
  status: number;
  details?: unknown;

  constructor(message: string, status: number, details?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.details = details;
  }
}

const getBaseUrl = () => {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!base) {
    throw new Error(
      "NEXT_PUBLIC_API_BASE_URL is not defined. Did you configure .env.local?"
    );
  }
  return base.replace(/\/$/, "");
};

export async function apiFetch<T>(
  path: string,
  options: ApiFetchOptions = {}
): Promise<T> {
  const { method = "GET", body, token, headers } = options;
  const baseUrl = getBaseUrl();
  const url = `${baseUrl}${path.startsWith("/") ? path : `/${path}`}`;

  const isFormData = typeof FormData !== "undefined" && body instanceof FormData;
  const requestHeaders: HeadersInit = {
    Accept: "application/json",
    ...(headers || {}),
  };

  if (!isFormData) {
    requestHeaders["Content-Type"] = "application/json";
  }

  if (token) {
    requestHeaders["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    method,
    headers: requestHeaders,
    body: body
      ? isFormData
        ? (body as BodyInit)
        : JSON.stringify(body)
      : undefined,
  });

  const text = await response.text();
  const parsed = text ? JSON.parse(text) : null;

  if (!response.ok) {
    const normalized: ApiErrorResponse | null =
      parsed && typeof parsed === "object" ? parsed : null;
    const message =
      normalized?.error?.message ||
      (response.status === 401
        ? "Unauthorized"
        : `Request failed with status ${response.status}`);

    throw new ApiError(message, response.status, normalized?.error?.details);
  }

  return parsed as T;
}
