# QRify – QR Code Management & Verification Platform

QRify is a fullstack QR code generation and management platform built with Next.js (App Router), PostgreSQL, and Prisma ORM.

It allows authenticated users to generate, manage, and organize dynamic QR codes while supporting student verification and subscription-based access control.

---

## 🚀 Features

- 🔐 Authentication powered by Clerk
- 📦 Dynamic QR Code generation
- 📚 Personal QR code library
- 📊 PostgreSQL database with Prisma ORM
- ✉ OTP-based student verification workflow
- 🧾 Subscription model structure (Free / Pro / Startup)
- 📬 Email integration using Resend
- 🌍 Deployed on Vercel

---

## 🏗 Tech Stack

### Frontend & Backend
- Next.js (App Router)
- TypeScript

### Authentication
- Clerk

### Database
- PostgreSQL
- Prisma ORM

### Email Service
- Resend

### Deployment
- Vercel

---

## 📁 Project Structure

- `app/` – App Router pages and API routes
- `components/` – Reusable UI components
- `prisma/` – Database schema and migrations
- `lib/prisma.ts` – Prisma client configuration

---

## 🗄 Database Models

- **QRCode** – Stores user-generated QR entries
- **StudentVerification** – Handles OTP-based email verification
- **Subscription** – Manages user subscription tiers

Indexed fields are used for optimized user-based queries.

---

## 🛠 API Routes

- `GET /api/qrcodes` – Fetch user QR codes
- `POST /api/qrcodes` – Create new QR code
- `DELETE /api/qrcodes` – Delete QR code (ownership validated)
- OTP verification endpoints under `/api/student/*`

---

## 🧠 Architecture Highlights

- User-scoped data isolation using Clerk authentication
- Server-side input validation
- Ownership checks before data deletion
- Indexed relational queries for performance
- Separation between UI layer and API layer

---

## ⚙️ Setup & Installation

```bash
npm install
npm run dev
```

Configure environment variables:

```
DATABASE_URL=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
RESEND_API_KEY=
```

---

## 🌐 Live Deployment

Application is deployed on Vercel.

---

## 📌 Future Enhancements

- Advanced QR analytics dashboard
- Payment gateway integration
- Role-based access controls
- Usage-based subscription enforcement