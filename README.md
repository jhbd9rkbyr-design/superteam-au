# Superteam Australia

The official web presence for **Superteam Australia** — Solana's builder network in Australia. A fully responsive, production-ready Next.js application with a Supabase CMS, custom brand system, animated interactions, and community-first design.

**Live Demo**: [superteam-au.vercel.app](https://superteam-au.vercel.app)
**Repository**: [github.com/jhbd9rkbyr-design/superteam-au](https://github.com/jhbd9rkbyr-design/superteam-au)

## Project Overview

Superteam Australia connects builders, designers, founders, and operators across the Solana ecosystem in Australia. This site serves as the primary landing page, member directory, onboarding flow, and CMS-powered content platform for the community.

### Pages

- **Landing Page** (`/`) — Hero with parallax Uluru backdrop, animated stats counter, social proof logo carousel, event listings (Luma API), member carousel, scrolling tweet testimonials, CTA section, FAQ accordion
- **Member Directory** (`/members`) — Searchable, filterable directory with skill-based categories and animated card grid
- **Get Involved** (`/get-involved`) — Multi-step onboarding form with Supabase persistence and admin review workflow

### Key Features

- Full CMS via Supabase — all content editable without code changes
- Luma API integration for live event sync (with Supabase fallback)
- Role-based access control (RBAC) for admin content management
- Animated text gradients, floating SVG paths, and staggered card entrances (Framer Motion)
- Infinite auto-scroll member carousel and logo marquee
- Server-rendered tweet embeds via `react-tweet` (no Twitter JS SDK)
- Auto-scrolling testimonial columns with gradient masks
- Dynamic navbar theme switching based on scroll position (dark/light sections)
- Responsive across all breakpoints (mobile-first)
- OpenGraph and Twitter Card meta for social sharing

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS 4 |
| Animation | Framer Motion 12 |
| CMS / Database | Supabase (Postgres + RLS + Auth) |
| Events | Luma API (live sync) |
| Tweets | react-tweet |
| Fonts | Satoshi (display), Inter (body) |
| Icons | Lucide React |
| Deployment | Vercel |

## Architecture

```
┌─────────────────────────────────────────────────────┐
│                    Vercel (Edge)                     │
│  Next.js 16 App Router · ISR · Image Optimization   │
├─────────────────────────────────────────────────────┤
│  Landing Page    │  Members Page   │  Get Involved   │
│  (/)             │  (/members)     │  (/get-involved) │
├─────────────────────────────────────────────────────┤
│                  CMS Data Layer                      │
│  cms.ts fetchers · static fallbacks · type-safe      │
├──────────┬──────────────┬───────────────────────────┤
│ Luma API │  Supabase    │  Static Defaults          │
│ (events) │  (all CMS)   │  (fallback)               │
│          │              │                           │
│          ├── members    │  Hardcoded arrays in      │
│          ├── events     │  each component for       │
│          ├── stats      │  zero-config operation    │
│          ├── faq        │                           │
│          ├── partners   │                           │
│          ├── testimonials│                          │
│          ├── site_copy  │                           │
│          ├── submissions│                           │
│          └── admin_users│                           │
└──────────┴──────────────┴───────────────────────────┘
```

**Data priority**: Luma API (live events) → Supabase tables → Static fallbacks

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Landing page
│   ├── layout.tsx            # Root layout (Navbar + Footer)
│   ├── globals.css           # Brand tokens, gradients, animations
│   ├── favicon.ico           # Favicon (multi-size)
│   ├── opengraph-image.png   # OG image (1200×630)
│   ├── members/page.tsx      # Member directory
│   └── get-involved/page.tsx # Onboarding form
├── components/
│   ├── layout/               # Navbar, Footer, Section
│   ├── sections/             # Hero, Stats, WhatWeDo, Events, Community,
│   │                         # Testimonials, GetInvolved, FAQ
│   ├── members/              # MemberDirectory, member-data
│   ├── onboarding/           # OnboardingForm
│   └── ui/                   # Reusable: InfiniteSlider, BackgroundPaths,
│                             # MemberCarousel, TestimonialsColumn, Badge, etc.
├── lib/
│   ├── cms.ts                # CMS data fetchers (Supabase + Luma)
│   ├── supabase.ts           # Supabase client singleton
│   ├── fonts.ts              # Font config (Satoshi + Inter)
│   └── utils.ts              # cn() utility
└── fonts/                    # Satoshi variable woff2 files

supabase/
└── migrations/
    ├── 001_initial_schema.sql   # Members + submissions tables
    ├── 002_cms_tables.sql       # Stats, FAQ, testimonials, partners, site_copy
    └── 003_events_and_rbac.sql  # Events table + admin_users + write policies
```

## Installation

```bash
# Clone the repository
git clone https://github.com/jhbd9rkbyr-design/superteam-au.git
cd superteam-au

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local
```

## Environment Variables

Create a `.env.local` file from `.env.example`:

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | No | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | No | Supabase anonymous key |
| `LUMA_API_KEY` | No | Luma API key for live event sync from SuperteamAU calendar |

The site runs fully without any env vars — all CMS integrations have static fallbacks baked in.

## Local Development

```bash
# Start dev server
npm run dev

# Type check
npx tsc --noEmit

# Lint
npm run lint

# Production build
npm run build
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Deployment

### Vercel (Recommended)

1. Push the repo to GitHub
2. Import the project on [vercel.com/new](https://vercel.com/new)
3. Vercel auto-detects Next.js — no config needed
4. Add environment variables in Vercel dashboard (optional)
5. Deploy

### Manual

```bash
npm run build
npm run start
```

## Content Management System (CMS)

The website uses Supabase as a full CMS. All section content is editable via Supabase Studio without touching code.

See **[CMS.md](./CMS.md)** for complete documentation including:
- Table schemas for all content types
- RBAC setup (admin roles and permissions)
- Luma API integration for events
- Common admin tasks (updating stats, adding testimonials, managing members)
- Media handling (Google Drive URLs)

### CMS-Managed Content

| Content | Table | Capabilities |
|---------|-------|-------------|
| Members | `members` | Add, edit, hide, reorder profiles |
| Events | `events` + Luma API | Auto-sync from Luma or manual entry |
| Stats | `stats` | Update counters and labels |
| FAQ | `faq` | Add, edit, reorder, hide questions |
| Testimonials | `testimonials` | Add/remove tweet IDs |
| Partners | `partners` | Update logos and links |
| Page Copy | `site_copy` | Edit any section heading, badge, or CTA |
| Applications | `submissions` | Review and approve/reject |

### Setup

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Run migrations in order via SQL Editor (`001` → `002` → `003`)
3. Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` to env vars
4. (Optional) Add `LUMA_API_KEY` for live event sync
5. Add admin users to `admin_users` table for write access

## Brand System

### Colors

| Token | Hex | Usage |
|-------|-----|-------|
| Brand Green | `#00833F` | Primary actions, accents |
| Brand Gold | `#F9CC01` | Highlights, pills, secondary accent |
| Green Light | `#68BD88` | Gradient midpoints |
| Deep Dark | `#0A2010` | Dark section backgrounds |
| Dark Green | `#20573A` | Card backgrounds, badges |
| Cream | `#FAFAF5` | Light section backgrounds |
| Text Primary | `#141E14` | Body text |

### Typography

| Role | Font | Weight | Usage |
|------|------|--------|-------|
| Display | Satoshi | 700 | Headings, nav, CTAs, labels |
| Body | Inter | 400–500 | Body text, descriptions, form inputs |

### Components

- **Pills/Badges**: `bg-[rgba(32,87,58,0.08)]`, `border-[rgba(32,87,58,0.15)]`, `text-[#20573a]`, rounded-[14px], with icon prefixes per skill type
- **Gold Pill**: `bg-[#F9CC01]`, `text-[#0A2010]`, used for section labels
- **Green Pill**: `bg-[#00833F]`, `text-white`, used for category markers
- **Frosted Glass**: `bg-white/5`, `backdrop-blur-xl`, used on dark sections
- **Text Gradient**: Animated 5-stop gradient (green → gold → green), seamless loop

## License

Built for the Superteam Australia community.
