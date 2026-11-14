# Marvex Technologies

Official web platform for **Marvex Technologies** ([marvextechnologies.vercel.app](https://marvextechnologies.vercel.app/)) — a software and digital product company designing and building modern company websites, mobile apps (iOS & Android), online stores, retail POS systems, and custom business management software.

---

## What We Build

1. **Company Websites** — High-converting, mobile-responsive websites with search engine setup and easy content updates.
2. **Mobile Apps (iOS & Android)** — Custom apps built for the Apple App Store and Google Play Store.
3. **Custom Web Apps & Portals** — Client portals, booking platforms, and internal web applications.
4. **Online Stores & Marketplaces** — E-commerce storefronts integrated with Paystack, Flutterwave, card payments, and delivery tracking.
5. **Business & Operations Software** — Custom platforms for inventory, staff records, approvals, and daily operations.
6. **POS & Retail Systems** — Fast checkout, barcode scanning, receipt printing, and multi-branch stock synchronization.
7. **Product & UI/UX Design** — Interactive prototypes and modern interface design for web and mobile products.
8. **Business Automation & Integrations** — Automated invoicing, alerts, payment webhooks, and third-party tool connections.
9. **Cloud Setup & Ongoing Support** — Custom domains, business email setup, automated backups, and continuous technical care.

---

## Tech Stack & Highlights

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router, Server Components, TypeScript)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) with native CSS `light-dark()` tokens
- **Typography:** `Poppins` (`400`, `500`, `600`, `700`) via `next/font/google` with tight display tracking (`-0.04em` to `-0.06em`)
- **Theme System:** Zero-flash Light & True-Black Dark Mode (`#000000`) synced with `<meta name="color-scheme">` and `localStorage`
- **Icons:** [Lucide React](https://lucide.dev/)
- **SEO & Discovery:**
  - Dynamic OpenGraph social card (`app/opengraph-image.tsx`)
  - Structured Data (`JSON-LD` for `ProfessionalService`, `OfferCatalog`, `WebSite`, and `FAQPage`)
  - Canonical URLs, OpenGraph & Twitter Cards on every route
  - Auto-generated `sitemap.xml` (`app/sitemap.ts`), `robots.txt` (`app/robots.ts`), and Web App Manifest (`app/manifest.ts`)

---

## Project Structure

```text
marvex-site/
├── app/
│   ├── clients/             # Companies We Keep & industry sectors page
│   ├── contact/             # Project inquiry form & direct contact details
│   ├── process/             # 5-step delivery process & post-launch support SLAs
│   ├── services/            # Full breakdown of all 9 services & deliverables
│   ├── globals.css          # Theme tokens (Light & True-Black Dark Mode) & animations
│   ├── icon.svg             # Marvex "M." vector favicon
│   ├── layout.tsx           # Root layout, Poppins font, global SEO & JSON-LD schema
│   ├── manifest.ts          # Web App Manifest
│   ├── opengraph-image.tsx  # Dynamic 1200x630 OpenGraph social preview card
│   ├── page.tsx             # Homepage + FAQPage JSON-LD schema
│   ├── robots.ts            # Search engine crawler rules
│   └── sitemap.ts           # XML sitemap generator
├── components/
│   ├── home/                # Hero, TrustBar, ServicesGrid, WhyMarvex, Sections, Closing
│   ├── layout/              # Navbar (with floating pill nav & theme toggle) & Footer
│   └── ui/                  # Reusable layout primitives & scroll reveal observer
├── data/
│   └── content.ts           # Centralized site configuration, services, FAQs & copy
└── public/
    ├── clients/             # Client brand SVG logos
    └── marvex-wordmark.svg  # Standalone Marvex vector wordmark
```

---

## Local Development

Install dependencies and launch the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build & Type Check

```bash
npx tsc --noEmit
npm run build
npm start
```

---

## Contact

- **Website:** [https://marvextechnologies.vercel.app](https://marvextechnologies.vercel.app/)
- **Email:** `engage@marvextechnologies.com`
- **Phone / WhatsApp:** `+234 904 044 7548`
- **Address:** Nde Street, Rumukwurushi Pipeline, Port Harcourt, Nigeria
