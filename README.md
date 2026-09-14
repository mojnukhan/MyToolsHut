# MyToolsHut — Free Online Tools for Everyone

> Production-ready, modern, SaaS-style online tools platform built with Next.js 15, TypeScript, Tailwind CSS, Prisma, and browser-side client APIs.

![MyToolsHut Platform](https://raw.githubusercontent.com/shadcn-ui/ui/main/apps/www/public/og.jpg)

---

## 🚀 Key Highlights & Architecture

- **Clean SaaS Aesthetic**: Designed with a sleek, minimalist aesthetic (inspired by Linear, Vercel, and Stripe) with dark/light mode toggle and micro-interactions.
- **Centralized Tool Registry (`src/lib/tools/registry.ts`)**: Single source of truth driving tool directory, dynamic categories, search indexing, breadcrumbs, and JSON-LD schemas.
- **100% Client-Side Processing**:
  - Image Compressor (Canvas quality scaling, side-by-side comparison, file size savings %)
  - Image Resizer (Width/height dimensions, aspect ratio lock, social media presets)
  - Format Converters (JPG ↔ PNG ↔ WebP)
  - Word & Character Counter (Real-time WPM reading/speaking time)
  - QR Code Generator (URL, WiFi, Email, phone with custom colors and PNG/SVG export)
  - Cryptographically Secure Password Generator (`crypto.getRandomValues` with entropy meter)
  - JSON Formatter & Validator (Beautify, minify, syntax error indicator)
  - Base64 Encoder / Decoder (UTF-8 safe)
  - Unit Converter (Length, Weight, Temperature, Digital Storage)
  - Meta Tag & Open Graph Generator (Live Google SERP & Social card previews)
- **High-Resolution YouTube Thumbnail Downloader**: Retrieves public 1080p (`maxresdefault`), Standard (`sddefault`), High (`hqdefault`), and Medium (`mqdefault`) cover images with direct downloads.
- **URL Shortener with Database Persistence**:
  - Backed by Prisma ORM (`ShortUrl` model)
  - Safe redirect handler at `/s/[shortCode]` with click tracking and protocol validation
  - In-memory rate limiting and custom alias support
  - Designed for instant zero-config local development (SQLite) and seamless production deployment (PostgreSQL).
- **Protected Admin Portal (`/admin`)**:
  - Unlocked via secret key (`ADMIN_SECRET_KEY`)
  - Real-time platform metrics: Total Tools, Shortened URLs, Click Counter, Client-side tools
  - Recent Short URLs management table with live test links
  - System health, Node environment, and heap memory telemetry.
- **Production-Grade SEO Infrastructure**:
  - Dynamic `sitemap.xml` and `robots.txt`
  - Canonical URLs, Open Graph, and Twitter Cards
  - JSON-LD schemas: `SoftwareApplication`, `BreadcrumbList`, and `FAQPage` (rendered strictly when visible FAQs exist).
- **Legal & Compliance Pages**: `/about`, `/contact`, `/privacy`, `/terms`, `/disclaimer`, `/cookies`, and custom `/not-found`.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Framework** | [Next.js 15](https://nextjs.org/) (App Router, Turbopack, React 19) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) (Strict mode) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) with CSS variables |
| **Theme** | [`next-themes`](https://github.com/pacocoursey/next-themes) (Light / Dark / System) |
| **Icons** | [`lucide-react`](https://lucide.dev/) |
| **Database & ORM** | [Prisma](https://www.prisma.io/) with SQLite (local) / PostgreSQL (production) |
| **Utilities** | `qrcode`, `clsx`, `tailwind-merge`, `canvas-confetti` |

---

## ⚙️ Environment Variables

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

| Variable | Description | Default |
|---|---|---|
| `DATABASE_URL` | Prisma connection string (SQLite for local, PostgreSQL for prod) | `file:./dev.db` |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL of your deployment | `http://localhost:3000` |
| `ADMIN_SECRET_KEY` | Secret password required to access `/admin` | `mytoolshut-admin-secure-key-2026` |

---

## 💻 Local Development Setup

### 1. Prerequisites
- Node.js 18+ or 20+ (tested on Node v22.20.0)
- npm 9+

### 2. Install Dependencies
```bash
npm install
```

### 3. Initialize Database
```bash
npx prisma db push
```
This generates the Prisma Client and initializes the local SQLite database at `prisma/dev.db`.

### 4. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Production Build
```bash
npm run build
npm run start
```

---

## 🚢 Production Deployment (Vercel / PostgreSQL)

### Switching from SQLite to PostgreSQL
In `prisma/schema.prisma`, update the datasource:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

In your production environment (e.g. Vercel, Supabase, Neon, Railway):
1. Set `DATABASE_URL` to your PostgreSQL connection string:
   ```
   DATABASE_URL="postgresql://username:password@db.supabase.co:5432/postgres?sslmode=require"
   ```
2. Set `NEXT_PUBLIC_SITE_URL` to your live domain (e.g., `https://mytoolshut.com`).
3. Set `ADMIN_SECRET_KEY` to a strong random token.
4. Run migrations:
   ```bash
   npx prisma db push
   ```

---

## 🧪 Quality Assurance & Testing

Run linter:
```bash
npm run lint
```

Run production build verification:
```bash
npm run build
```

---

## 📄 License

© 2026 MyToolsHut. All rights reserved.
