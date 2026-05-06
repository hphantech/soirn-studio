# SOIRN Studio Web

A premium fashion e-commerce and brand experience built with Next.js App Router, custom motion, and a Shopify + Supabase backend workflow.

This project is designed to feel editorial and high-end while still shipping practical commerce features (product browsing, cart, checkout redirect, and waitlist capture).

## What This Project Demonstrates

- Building a modern storefront with `Next.js 16` + `React 19` + `TypeScript`
- Designing a distinct visual identity with custom UI and animation (`GSAP`, `Framer Motion`)
- Implementing end-to-end commerce flow with Shopify Storefront API
- Creating production-oriented API routes (validation, duplicate handling, and rate limiting)
- Integrating Supabase for waitlist capture and lead collection

## Core Features

- Editorial-style landing page and brand-first storytelling
- Shop with filtering, sorting, search, and animated product reveal
- Product detail experience with selectable variants/sizes
- Client-side cart state with persistent local storage
- Checkout handoff to secure Shopify checkout
- Waitlist flow with API validation + in-memory per-IP rate limiting
- Lookbook gallery to support campaign/drop presentation

## Tech Stack

- **Framework:** `Next.js` (App Router)
- **Frontend:** `React`, `TypeScript`, `Tailwind CSS v4`
- **Animation:** `GSAP`, `Framer Motion`
- **Commerce:** `@shopify/storefront-api-client`
- **Backend/Data:** `Supabase` (`@supabase/supabase-js`)
- **Tooling:** ESLint

## Project Structure

```txt
app/
  (site)/
    page.tsx              # Landing page
    shop/                 # Catalog + product data
    product/[slug]/       # PDP
    checkout/             # Checkout review + redirect
    waitlist/             # Waitlist campaign page
    lookbook/             # Lookbook gallery
  api/
    checkout/create/      # Shopify checkout creation endpoint
    waitlist/             # Supabase waitlist endpoint
  components/
    cart/                 # Cart context, drawer, actions
    layout/               # Navbar, footer, banners, popups
    ui/                   # Reusable UI and interaction components
src/
  config/brand.ts         # Brand tokens/content config
```

## Local Setup

### 1) Install dependencies

```bash
npm install
```

### 2) Configure environment variables

Create `.env.local` in the `web` directory:

```bash
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=
SHOPIFY_STOREFRONT_ACCESS_TOKEN=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

### 3) Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build production bundle
- `npm run start` - Run production server
- `npm run lint` - Run ESLint

## API Notes

### `POST /api/waitlist`

- Validates email format
- Normalizes input (`trim` + lowercase)
- Applies in-memory IP rate limiting
- Stores signups in Supabase table `waitlist_signups`
- Handles duplicate email inserts gracefully

### `POST /api/checkout/create`

- Accepts cart line items with Shopify variant IDs
- Creates a checkout via Storefront API mutation
- Returns `checkoutUrl` for redirect

## Why This Matters For Product Teams

This project balances brand expression and engineering discipline: custom visuals, robust client interactions, and API boundaries that are production-minded. It is intentionally built to show practical frontend architecture, integration capability, and UX polish in one cohesive product.

## Next Improvements

- Add automated tests for API routes and cart logic
- Add CMS-backed product/lookbook content
- Add analytics and conversion event tracking
- Add deployment + preview workflow documentation
