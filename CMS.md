# Superteam Australia — CMS Documentation

## Overview

The website uses **Supabase** as its content management system. All section content is editable via Supabase Studio (dashboard) without touching code. The site gracefully falls back to static defaults when Supabase is unavailable.

## Architecture

```
Luma API (live events) → fetchEvents()
                              ↓ fallback
Supabase tables       → cms.ts fetchers → React components
                              ↓ fallback
Static defaults       → hardcoded in each component
```

**Priority chain**: Luma API > Supabase table > Static fallback

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase anon/public key (safe for client) |
| `LUMA_API_KEY` | No | Luma API key for live event sync. Without it, events fall back to Supabase `events` table. |

## CMS Tables

### `members` — Member directory
| Column | Type | Description |
|---|---|---|
| name | text | Display name |
| title | text | Role/title |
| company | text | Organization |
| photo | text | Photo URL (use Google Drive or any public URL) |
| skills | text[] | Skill tags |
| filters | text[] | Filter categories for directory |
| twitter | text | Twitter/X profile URL |
| visible | boolean | Show/hide on site |
| sort_order | int | Display order |

### `events` — Events section
| Column | Type | Description |
|---|---|---|
| title | text | Event name |
| date | timestamptz | Start date/time |
| end_date | timestamptz | End date/time (optional) |
| location | text | Venue or "Online Event" |
| url | text | Registration link (Luma URL) |
| image_url | text | Cover image URL |
| source | text | `manual` or `luma` |
| luma_id | text | Luma event ID (for dedup) |
| visible | boolean | Show/hide on site |

**Note**: When `LUMA_API_KEY` is set, events are fetched live from the SuperteamAU Luma calendar. The `events` table serves as a manual fallback/override. This is by design — Luma is the source of truth for events, and the Supabase table exists for cases where the API key hasn't been provisioned yet or for manually added events not on Luma.

### `stats` — Stats counters (green card)
| Column | Type | Description |
|---|---|---|
| value | int | Counter number |
| label | text | Label below counter |
| suffix | text | Suffix (default `+`) |
| sort_order | int | Display order |

### `faq` — FAQ accordion
| Column | Type | Description |
|---|---|---|
| question | text | Question text |
| answer | text | Answer text (plain text) |
| visible | boolean | Show/hide |
| sort_order | int | Display order |

### `testimonials` — Community tweets
| Column | Type | Description |
|---|---|---|
| tweet_id | text | Twitter/X tweet ID |
| visible | boolean | Show/hide |
| sort_order | int | Display order |

### `partners` — Logo carousel
| Column | Type | Description |
|---|---|---|
| name | text | Partner name |
| logo_url | text | Logo image URL (SVG preferred) |
| link_url | text | Link on click |
| visible | boolean | Show/hide |
| sort_order | int | Display order |

### `site_copy` — Editable text (key-value)
| Key | Section | Description |
|---|---|---|
| `stats.social_proof_label` | Stats | Label above partner logos |
| `community.badge` | Community | Badge text |
| `community.heading` | Community | Section heading |
| `community.subheading` | Community | Section subheading |
| `testimonials.badge` | Testimonials | Badge text |
| `testimonials.heading` | Testimonials | Section heading |
| `testimonials.subheading` | Testimonials | Section subheading |
| `faq.badge` | FAQ | Badge text |
| `faq.heading` | FAQ | Section heading |
| `get_involved.badge` | Get Involved | Badge text |
| `get_involved.heading` | Get Involved | Section heading |
| `get_involved.subheading` | Get Involved | Section subheading |
| `get_involved.cta` | Get Involved | CTA button text |
| `what_we_do.mission` | What We Do | Mission statement |

### `submissions` — Onboarding form entries
| Column | Type | Description |
|---|---|---|
| name | text | Applicant name |
| roles | text[] | Selected roles |
| skills | text | Skills description |
| status | text | `pending`, `approved`, or `rejected` |

## Access Control (RBAC)

### Roles

| Role | Read | Write | Manage admins |
|---|---|---|---|
| Public (anon) | All visible content | Submissions only | No |
| Editor | All content + submissions | All CMS tables | No |
| Admin | Everything | Everything | Yes |

### How to add an admin

1. Create a Supabase Auth user (via dashboard: Authentication > Users > Add User)
2. Insert their `user_id` into `admin_users`:
   ```sql
   INSERT INTO admin_users (user_id, role, name)
   VALUES ('uuid-from-auth-users', 'admin', 'Person Name');
   ```
3. That user can now sign into Supabase Studio or use the Supabase client with their credentials to manage all CMS content.

### Security model

All tables use Row Level Security (RLS):
- **Public reads**: Filtered by `visible = true` where applicable
- **Writes**: Gated by `public.is_admin()` function which checks `admin_users` table
- **Submissions**: Anyone can insert (onboarding form), only admins can read/update (approve/reject)

## Media & Images

Images are referenced by URL. Recommended approach:
1. Upload images to Google Drive (or any public host)
2. Use the public sharing URL in Supabase fields (`photo`, `logo_url`, `image_url`)
3. For partner logos, SVG format is preferred

The site's `next.config.ts` allows images from: `images.unsplash.com`, `images.lumacdn.com`, `pbs.twimg.com`.
Add additional domains to `remotePatterns` in `next.config.ts` if needed.

## Migrations

SQL migrations are in `supabase/migrations/`:
- `001_initial_schema.sql` — Members + submissions tables
- `002_cms_tables.sql` — Stats, FAQ, testimonials, partners, site_copy
- `003_events_and_rbac.sql` — Events table + admin_users + write policies for all tables

Run migrations in order via Supabase SQL Editor.

## Common Admin Tasks

**Update a stat**: Edit the row in `stats` table (e.g., change `value` from 250 to 300)

**Add a testimonial**: Insert a new row in `testimonials` with the tweet ID from the URL (e.g., `https://x.com/user/status/123456` → tweet_id = `123456`)

**Add a partner logo**: Insert into `partners` with name, logo URL, and link URL

**Edit section text**: Update the `value` column in `site_copy` for the corresponding key

**Add an event manually**: Insert into `events` with title, date, location, URL, and image URL

**Approve a submission**: Update `status` from `pending` to `approved` in `submissions`

**Hide content**: Set `visible = false` on any row — it disappears from the site without deletion
