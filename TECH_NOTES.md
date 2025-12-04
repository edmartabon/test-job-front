# Tech Notes – Customer Portal Frontend

## What Was Built

- Replaced the scaffolded landing page with a lightweight Customer Portal that matches the backend API contract.
- Added a persistent auth context (`useAuth`) that stores JWTs in `localStorage` and exposes login/logout helpers throughout the App Router tree.
- Implemented data-fetching hooks (`useBookings`, `useBookingDetail`) that normalize API errors and surface loading state for both the bookings list and detailed view.
- Crafted UI components for booking summaries, attachments, chat history, and the composer, all styled with Tailwind for a consistent look.
- Wired protected routing so unauthenticated visitors are redirected to `/login`, while authenticated users bounce away from the login page.

## Key Decisions & Assumptions

1. **Local storage auth** – For this MVP the JWT is stored in `localStorage`. In a hardened build we would consider HttpOnly cookies or token rotation.
2. **API contract** – Assumes the backend returns `{ success: true, data: ... }`. Errors are normalized via `apiFetch` so components only handle strings.
3. **Login identifiers** – The UI collects email + phone per the brief; the phone value is echoed into the backend `password` field for compatibility.
4. **Fetching strategy** – Hooks rely on basic `fetch` + `useEffect` to keep the implementation transparent. React Query/SWR could be swapped in later.
5. **Styling** – Tailwind-only approach keeps dependencies small and avoids Theme/Redux packages that shipped with the starter.

## Potential Enhancements

- Add optimistic updates/caching to reduce refetches after posting messages.
- Expand the auth flow with registration, passwordless login, or MFA.
- Surface attachment previews (images, PDFs) inline.
- Replace placeholder social login with a real OAuth integration.
- Add integration tests (Playwright/Cypress) for the bookings workflow.

## AI Assistance

AI (OpenAI Codex CLI) helped outline component structure, draft TypeScript types, and scaffold repetitive boilerplate (e.g., hooks, README). All code was reviewed and adjusted manually to fit the project conventions.
