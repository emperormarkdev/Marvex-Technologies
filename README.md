# Marvex Technologies

Official website for **Marvex Technologies** — designing and building modern websites, mobile apps, online stores, and custom business software.

## Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Typography:** Poppins (`next/font/google`)
- **Email Delivery:** Resend (`app/api/contact/route.ts`)

## Getting Started

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

Create a `.env.local` file in the root directory to enable direct contact form emails via Resend:

```env
RESEND_API_KEY=re_your_api_key_here
RESEND_FROM_EMAIL="Marvex Technologies <onboarding@resend.dev>"
```
