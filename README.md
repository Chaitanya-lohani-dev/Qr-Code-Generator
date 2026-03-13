![Next.js](https://img.shields.io/badge/Next.js-AppRouter-black)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-blue)
![Prisma](https://img.shields.io/badge/Prisma-ORM-green)
![Clerk](https://img.shields.io/badge/Clerk-Auth-purple)
![Vercel](https://img.shields.io/badge/Vercel-Deployment-black)

# QRify

A full-stack QR code management and student verification platform built with Next.js 15 (App Router), PostgreSQL, Prisma ORM, and Clerk authentication.

QRify lets authenticated users generate QR codes from URLs, manage a personal QR library, and verify student status via an OTP-based email workflow — unlocking a higher subscription tier automatically on successful verification.

---

## Live Deployment

Deployed on Vercel: [https://qrify.vercel.app](https://qr-code-generator-ten-taupe.vercel.app/)

---

## System Architecture

```mermaid
flowchart TD
    Users["Users (Browser)"] --> NextJS["Next.js 15\nApp Router"]
    NextJS --> ClerkMiddleware["Clerk Middleware\n(Route Protection)"]
    ClerkMiddleware --> APIRoutes["API Routes\n/api/qrcodes\n/api/student/*\n/api/contact"]
    APIRoutes --> ClerkAuth["Clerk Auth\n(Server-side userId)"]
    APIRoutes --> Prisma["Prisma ORM"]
    Prisma --> PostgreSQL["PostgreSQL\n(Neon / Supabase)"]
    APIRoutes --> Resend["Resend\n(Transactional Email)"]
```

---

## Engineering Highlights

**App Router architecture** — All pages and API handlers live under `app/`. Server Components handle data-fetching concerns at the page level while client components manage interactive UI state (QR generation, form submissions). API routes follow REST conventions and are co-located under `app/api/`.

**User-scoped data access** — Every database query against `QRCode`, `StudentVerification`, and `Subscription` is filtered by `userId` extracted from Clerk's server-side `auth()` helper. No data crosses user boundaries.

**Ownership verification before delete** — The `DELETE /api/qrcodes` handler fetches the record by `id` first and explicitly checks `qrCode.userId === userId` before issuing the delete. A missing or mismatched record returns `404`, preventing insecure direct object reference (IDOR) attacks.

**Server-side input validation** — URL format is validated with a strict `URL` constructor check (requiring `http:` or `https:` protocol) before any database write. Student emails are validated against a domain allowlist (`.edu`, `.ac.in`, `.edu.in`, `.university`, `.college`). Contact form fields are validated for presence and format before invoking Resend.

**OTP lifecycle management** — A 6-digit OTP is generated server-side, stored alongside a 10-minute expiry timestamp, and cleared from the database upon successful verification. Expired OTPs transition the verification record to an `expired` state explicitly, preventing replay.

**Subscription elevation on verification** — After OTP verification succeeds, the API atomically upserts the user's `Subscription` record from `free` to `student_pro` only if no paid plan already exists. This keeps plan upgrades idempotent and safe to retry.

**Indexed relational queries** — `QRCode`, `StudentVerification`, and `Subscription` models all carry `@@index([userId])` directives, ensuring O(log n) lookups on the most common query pattern.

**Prisma singleton pattern** — `lib/prisma.ts` caches the `PrismaClient` instance on the `global` object in development to prevent connection pool exhaustion during Next.js hot-reloads, while creating a fresh instance in production.

**Separation of UI and API layers** — The dashboard page handles rendering and client-side state. All business logic (validation, authorization, database writes) lives exclusively in API route handlers — the client never touches Prisma or Clerk server APIs directly.

---

## Core Features

- **QR code generation** — Generate a QR code from any valid HTTP/HTTPS URL with a user-supplied display name. QR images are rendered client-side using the `qrcode` library.
- **Personal QR library** — Authenticated users can view, copy, and delete all previously generated QR codes from a personal dashboard.
- **Student verification via OTP** — Users submit an institutional email address. The server sends a 6-digit OTP via Resend; successful verification unlocks the Student Pro plan automatically.
- **Subscription tier model** — Three tiers are modeled: Free (5 QR codes/month), Student Pro (unlimited, free with verified student email), and Startup. Razorpay payment integration is scaffolded via the `razorpayId` field.
- **Contact form with email delivery** — A contact form renders templated emails using `@react-email/render` and delivers them via Resend.
- **Route-level authentication** — Clerk middleware runs on every request, protecting authenticated routes and API endpoints globally.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS v4, Framer Motion |
| Backend | Next.js API Routes (Route Handlers) |
| Authentication | Clerk (`@clerk/nextjs` v6) |
| Database | PostgreSQL via Prisma ORM v6 |
| Email | Resend + `@react-email/render` |
| QR Generation | `qrcode` npm package (client-side canvas rendering) |
| Deployment | Vercel |

---

## API Design

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/qrcodes` | Required | Fetch all QR codes for the authenticated user, ordered by creation date descending |
| `POST` | `/api/qrcodes` | Required | Create a new QR code entry. Validates URL format and requires a display name |
| `DELETE` | `/api/qrcodes` | Required | Delete a QR code by ID. Ownership is verified before deletion |
| `POST` | `/api/student/send-otp` | Required | Validate institutional email domain and send a 6-digit OTP via Resend |
| `POST` | `/api/student/verify-otp` | Required | Verify submitted OTP, mark student as verified, and elevate subscription plan |
| `GET` | `/api/student/status` | Required | Return current verification status and subscription plan for the user |
| `POST` | `/api/contact` | None | Submit a contact form message; renders and sends a templated email via Resend |

---

## Database Design

Three Prisma models back the application:

**`QRCode`**
Stores each user-generated QR code entry. Fields: `id` (cuid), `url`, `name`, `userId`, `createdAt`. Indexed on `userId` for efficient per-user list queries.

**`StudentVerification`**
Tracks the full OTP lifecycle for a user. Fields: `id`, `userId` (unique), `email`, `otp` (nullable, cleared post-verification), `otpExpiry`, `status` (`pending` / `verified` / `expired`), `verifiedAt`, timestamps. Indexed on both `userId` and `email`.

**`Subscription`**
Records the user's active plan. Fields: `id`, `userId` (unique), `plan` (`free` / `student_pro` / `startup`), `status` (`active` / `cancelled` / `expired`), `razorpayId` (nullable, reserved for payment gateway), `startDate`, `endDate`, timestamps. Indexed on `userId`.

---

## Project Structure

```
app/
├── (auth)/               # Clerk sign-in and sign-up routes
├── api/
│   ├── contact/          # Contact form email handler
│   ├── qrcodes/          # QR CRUD API (GET, POST, DELETE)
│   └── student/
│       ├── send-otp/     # OTP generation and delivery
│       ├── verify-otp/   # OTP verification and plan upgrade
│       └── status/       # User verification and subscription status
├── dashboard/            # Authenticated QR management dashboard
├── pricing/              # Subscription tier display with Student Verification flow
├── contact/              # Contact form page
├── about/, blog/,        # Static content pages
│   features/, terms/,
│   privacy-policy/
├── layout.tsx            # Root layout with ClerkProvider
└── client-layout.tsx     # Client wrapper (Navbar, Footer)

components/
├── StudentVerification.tsx   # OTP request and verification UI
├── Navbar.jsx / Footer.jsx   # Shared layout components
└── emails/
    └── ContactFormEmail.tsx  # React Email template

lib/
└── prisma.ts             # Prisma client singleton

prisma/
├── schema.prisma         # Database schema and indexes
└── migrations/           # SQL migration history

middleware.js             # Clerk middleware — applied globally
```

---

## Local Setup

**Prerequisites:** Node.js 18+, a PostgreSQL database (local or hosted), a Clerk application, and a Resend account.

```bash
git clone https://github.com/Chaitanya-lohani-dev/Qr-Code-Generator.git
cd qr-tracker-app
npm install
```

Create a `.env` file in the project root:

```env
# PostgreSQL connection string
DATABASE_URL="postgresql://user:password@host:5432/dbname"

# Clerk (from clerk.com dashboard)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Clerk redirect URLs
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

# Resend (from resend.com dashboard)
RESEND_API_KEY=re_...

# Contact form recipient
CONTACT_RECEIVER_EMAIL=your@email.com
```

Apply the database schema and start the dev server:

```bash
npx prisma migrate dev
npm run dev
```

The application will be available at `http://localhost:3000`.

---

## Future Improvements

- **QR scan analytics** — Track scan counts, referrer URLs, and geographic data per QR code using edge middleware or a dedicated analytics service.
- **Rate limiting** — Apply per-user and per-IP rate limits on OTP send and QR creation endpoints to prevent abuse (e.g., using Upstash Redis with `@upstash/ratelimit`).
- **Razorpay payment integration** — The `razorpayId` field and plan structure are already in place. The remaining work is wiring up Razorpay Checkout and a webhook handler to activate paid subscriptions.
- **Background job processing** — Move OTP email delivery off the request path using a task queue (e.g., BullMQ or Inngest) to improve latency and resilience.
- **QR code customization** — Allow users to set foreground/background colors, embed a logo, or choose error correction levels before generating.
- **Bulk QR generation** — Accept a CSV of URLs and names, generate QR codes server-side, and return a ZIP archive for download.
