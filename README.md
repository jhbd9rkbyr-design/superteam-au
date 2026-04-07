# Superteam Australia

The official web presence for Superteam Australia — Solana's builder network in Australia. A fully responsive, production-ready Next.js application with a custom brand system, animated interactions, and community-first design.

## Project Overview

Superteam Australia connects builders, designers, founders, and operators across the Solana ecosystem in Australia. This site serves as the primary landing page, member directory, and onboarding flow for the community.

### Pages

- **Landing Page** (`/`) — Hero with Uluru backdrop, animated stats, social proof carousel, event listings, member carousel, tweet testimonials, CTA with animated SVG paths, FAQ
- **Member Directory** (`/members`) — Searchable, filterable directory with skill-based categories and animated card grid
- **Get Involved** (`/get-involved`) — Multi-step onboarding form collecting name, location, role, skills, experience, links, and interests

### Key Features

- Animated text gradients, floating SVG paths, and staggered card entrances (Framer Motion)
- Infinite auto-scroll member carousel and logo marquee
- Server-rendered tweet embeds via `react-tweet` (no Twitter JS SDK)
- CSS masonry layout for variable-height testimonials
- Dynamic navbar theme switching based on scroll position (dark/light sections)
- Responsive across all breakpoints

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS 4 |
| Animation | Framer Motion 12 |
| Tweets | react-tweet |
| Fonts | Satoshi (display), Inter (body) |
| Icons | Lucide React |
| Database | Supabase (optional, for onboarding) |
| Deployment | Vercel |

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Landing page
│   ├── layout.tsx            # Root layout (Navbar + Footer)
│   ├── globals.css           # Brand tokens, gradients, animations
│   ├── members/page.tsx      # Member directory
│   └── get-involved/page.tsx # Onboarding form
├── components/
│   ├── layout/               # Navbar, Footer, Section
│   ├── sections/             # Hero, Stats, WhatWeDo, Events, Community,
│   │                         # Testimonials, GetInvolved, FAQ
│   ├── members/              # MemberDirectory, member-data
│   ├── onboarding/           # OnboardingForm
│   └── ui/                   # Reusable: InfiniteSlider, BackgroundPaths,
│                             # MemberCarousel, PixelTrail, etc.
├── lib/
│   ├── fonts.ts              # Font config (Satoshi + Inter)
│   └── utils.ts              # cn() utility
└── fonts/                    # Satoshi variable woff2 files
```

## Installation

```bash
# Clone the repository
git clone https://github.com/your-org/superteam-au.git
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
| `NEXT_PUBLIC_SUPABASE_URL` | No | Supabase project URL (onboarding form persistence) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | No | Supabase anonymous key |
| `LUMA_API_KEY` | No | Luma API key for dynamic event listings |

The site runs fully without any env vars — Supabase and Luma integrations are optional enhancements.

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
4. Add environment variables in Vercel dashboard (if using Supabase/Luma)
5. Deploy

### Manual

```bash
npm run build
npm run start
```

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
