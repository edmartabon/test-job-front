# Customer Portal Frontend

Next.js App Router frontend for the Customer Portal MVP. It provides a minimal experience for customers to sign in, review bookings, download attachments, and message the operations team. The UI is built with React, TypeScript, and Tailwind CSS and is designed to talk to the Express backend described in the project brief.

## Features

- JWT-based authentication with email + phone login flow.
- Global auth context (`useAuth`) that persists tokens in `localStorage`.
- Bookings list page that consumes `/api/bookings`.
- Booking detail page with attachments, historical messages, and a message composer.
- Shared API client and typed hooks (`useBookings`, `useBookingDetail`) for consistent data fetching.
- Responsive Tailwind UI with a fixed header and simple states for loading/errors.

## Getting Started

### 1. Install dependencies

```bash
cd front
npm install
```

### 2. Configure environment variables

Create `.env.local` in the `front/` directory and point it at the running backend:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
```

Update the value if your Express API listens on a different port or domain.

### 3. Run the development server

```bash
npm run dev
```

Visit `http://localhost:3000` (or the port reported by Next.js) to use the portal.

## Project Structure

```
src/
  app/
    page.tsx                 # Landing page – routes authenticated users to /bookings
    login/                   # Login flow (form + placeholder social login)
    bookings/                # Bookings list and booking detail routes
    layout.tsx               # Root layout that wraps the app in AuthProvider + header
  components/
    AppHeader.tsx            # Top navigation with logout
    BookingCard.tsx          # Card used on the bookings list
    BookingSummary.tsx       # Summary block on booking detail
    AttachmentList.tsx       # Lists ServiceM8 attachments
    MessageList.tsx          # Chat-like list of messages
    MessageForm.tsx          # Message composer posting to the backend
  hooks/
    useAuth.ts               # Auth context + localStorage persistence
    useBookings.ts           # Fetches GET /api/bookings
    useBookingDetail.ts      # Fetches booking detail, attachments, and messages
  lib/
    api.ts                   # `apiFetch` helper with error normalization
    types.ts                 # Shared TypeScript types for API contracts
```

## Pages

- `/` – Welcome screen that redirects authenticated users to `/bookings`.
- `/login` – Email + phone login form. On success the JWT is stored client-side and the user is redirected to `/bookings`.
- `/bookings` – Protected list of the customer’s jobs. Shows counts of attachments/messages and links to the detail view.
- `/bookings/[id]` – Protected detail route. Displays booking summary, attachments, conversation history, and a composer to send a new message.

Attempting to access `/bookings*` routes without a token redirects back to `/login`.

## Notes & Assumptions

- All API requests read `NEXT_PUBLIC_API_BASE_URL` at runtime and attach the stored JWT via `Authorization: Bearer <token>`.
- The login call expects `{ email, phone }`. Because the backend also accepts a `password` field, the client mirrors the phone number into that field when necessary.
- The project intentionally keeps dependencies light—fetching is done with built-in `fetch` + a thin helper, and Tailwind handles styling.

## Further Improvements

- Swap the placeholder social login buttons with real OAuth flows.
- Add optimistic UI updates or SWR/React Query for caching.
- Integrate toast notifications instead of inline text for errors.
- Add tests for hooks and components.
