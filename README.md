# Kingston Complex

Website and booking-management system for Kingston Complex — a hotel,
bar, restaurant, and conference hall in Makindu, Kenya, on the
Nairobi–Mombasa highway.

This isn't just a marketing site: it's paired with a staff-only admin
system that runs the actual day-to-day operations — room and
conference hall availability, bar reservations, payments (including
deposits and balances), and revenue reporting.

## Features

**Public site**
- Homepage: hero, about, accommodation/conference/restaurant/bar
  teasers, guest reviews (with live submission), location/map, footer
- Dedicated pages for Rooms, Conference Hall, Restaurant, and Bar, each
  with a WhatsApp/call booking or ordering flow
- Fully responsive, built around a shared design system (see
  `src/index.css` for design tokens)

**Admin system** (`/admin`, not linked from the public site)
- Staff login, no public sign-up
- Calendars for the conference hall and each room tier, showing
  real-time availability
- Bar private-event reservations
- Deposit/partial-payment support — a booking has a total price and
  any number of payments against it, with outstanding balances tracked
  and payable later
- A combined Bookings table (Upcoming / History) across all three
  services
- Dashboard with today's status, this week's schedule, and recent
  activity
- Finance page with revenue broken down by service, filterable by
  period, and a trend chart — revenue is attributed to each booking's
  **service date** (when the room/hall/bar is actually used), not the
  payment date, so it reflects which weeks/months the business is
  actually busiest in

## Tech stack

- **React + Vite** — build tooling
- **React Router** — client-side routing, including protected
  `/admin/*` routes
- **Tailwind CSS v4** — styling, design tokens in `src/index.css`
- **Supabase** — Postgres database, auth, and row-level security
- **Recharts** — the revenue trend chart on the Finance page
- **Vercel** — hosting

## Project structure

```
src/
├── components/
│   ├── layout/       Navbar, Footer, Layout (public site shell)
│   ├── sections/     Homepage sections (Hero, About, Accommodation, ...)
│   ├── ui/           Shared primitives (Badge, RoomCard, StarRating, ...)
│   └── admin/         Admin-only shell (AdminLayout, RequireAuth, MiniMonthCalendar)
├── pages/            Route-level pages — both public (Rooms, Bar, ...)
│                     and admin (AdminDashboard, AdminFinance, ...)
├── hooks/            Data hooks (useRoomBookings, usePayments, useAuth, ...)
├── utils/            Pure helpers (date formatting, WhatsApp links, ...)
├── lib/              supabaseClient.js — the one shared Supabase connection
└── data/
    └── siteData.js   Single source of truth for all site copy, menus,
                       room/conference/bar content, and brand info
supabase/
└── schema.sql        Full database schema — run this on a fresh
                       Supabase project to recreate all tables/policies
```

**`siteData.js` is the file to edit for content changes** — room
prices, menu items, business hours, phone numbers, photos. Almost
nothing else needs touching for day-to-day content updates.

## Getting started

```bash
npm install
```

Copy `.env.example` to `.env` and fill in your Supabase project's
values:

```
VITE_SUPABASE_URL=your_project_url_here
VITE_SUPABASE_ANON_KEY=your_anon_public_key_here
```

**Never use the `service_role` key here** — only the `anon`/`public`
key belongs in frontend code. Table access is controlled by the RLS
policies in `supabase/schema.sql`, not by keeping the anon key secret.

```bash
npm run dev
```

## Setting up Supabase from scratch

1. Create a new Supabase project.
2. Open the **SQL Editor** and run the entire contents of
   `supabase/schema.sql`.
3. Go to **Authentication → Users → Add user** and create at least one
   staff login (email + password). There's no public sign-up page —
   this is the only way to create admin accounts.
4. Copy your project's URL and `anon public` key (Project Settings →
   API) into `.env`.

## Admin access

The admin system lives at `/admin` but is never linked from the public
site's navigation — staff bookmark the URL directly. This isn't the
security mechanism (that's the login + RLS policies), just tidiness:
no reason for a regular visitor to see a "Staff Login" link.

## Deployment

Deployed on Vercel. `vercel.json` handles the client-side routing
rewrite React Router needs (without it, refreshing or deep-linking to
any inner page like `/rooms` or `/admin/conference` would 404 on
Vercel's static hosting).

When deploying, add the same two environment variables from `.env` to
the Vercel project's **Settings → Environment Variables** — they don't
get committed to git, so Vercel needs its own copy.