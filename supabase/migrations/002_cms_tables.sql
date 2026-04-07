-- ============================================================
-- Superteam Australia — CMS Tables
-- ============================================================

-- ── Stats (counters on the green card) ──
create table if not exists public.stats (
  id          uuid primary key default gen_random_uuid(),
  value       int not null,
  label       text not null,
  suffix      text not null default '+',
  sort_order  int not null default 0,
  created_at  timestamptz not null default now()
);

alter table public.stats enable row level security;
create policy "Stats are publicly readable" on public.stats for select using (true);

insert into public.stats (value, label, suffix, sort_order) values
  (250, 'Members', '+', 1),
  (40, 'Events hosted', '+', 2),
  (80, 'Projects built', '+', 3),
  (120, 'Bounties completed', '+', 4);

-- ── FAQ items ──
create table if not exists public.faq (
  id          uuid primary key default gen_random_uuid(),
  question    text not null,
  answer      text not null,
  sort_order  int not null default 0,
  visible     boolean not null default true,
  created_at  timestamptz not null default now()
);

alter table public.faq enable row level security;
create policy "FAQ is publicly readable" on public.faq for select using (visible = true);

insert into public.faq (question, answer, sort_order) values
  ('What is Superteam Australia?', 'Superteam Australia is a community of builders, designers, and operators working on Solana. We provide resources, mentorship, bounties, and networking opportunities to help you succeed in Web3.', 1),
  ('How do I join the community?', 'Join our Discord server and attend our events. There''s no formal membership process — just show up, introduce yourself, and start building with us.', 2),
  ('How can I earn bounties?', 'Browse available opportunities on Superteam Earn (superteam.fun/earn/s/superteamaustralia). Submit your proposal, get approved, and start building. Bounties range from 1,000 to 10,000+ USDC depending on complexity.', 3),
  ('Are there events in other Australian cities?', 'Yes! We host events regularly in Sydney, Melbourne, Brisbane, and Perth. Check our events on Luma (lu.ma/SuperteamAU) for upcoming meetups, workshops, and hackathons near you.', 4),
  ('Is there mentorship available?', 'Absolutely. We have experienced builders and founders available for mentorship. Connect with community members at events or reach out on Discord.', 5);

-- ── Testimonial tweet IDs ──
create table if not exists public.testimonials (
  id          uuid primary key default gen_random_uuid(),
  tweet_id    text not null,
  sort_order  int not null default 0,
  visible     boolean not null default true,
  created_at  timestamptz not null default now()
);

alter table public.testimonials enable row level security;
create policy "Testimonials are publicly readable" on public.testimonials for select using (visible = true);

insert into public.testimonials (tweet_id, sort_order) values
  ('2040960063054156028', 1),
  ('2040678169980891444', 2),
  ('2040395485123620999', 3),
  ('2039271545885835739', 4),
  ('2039279581249798643', 5),
  ('2041131896600731680', 6);

-- ── Partner logos (social proof carousel) ──
create table if not exists public.partners (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  logo_url    text not null,
  link_url    text not null default '',
  sort_order  int not null default 0,
  visible     boolean not null default true,
  created_at  timestamptz not null default now()
);

alter table public.partners enable row level security;
create policy "Partners are publicly readable" on public.partners for select using (visible = true);

insert into public.partners (name, logo_url, link_url, sort_order) values
  ('Jupiter', '/images/logos/jupiter.svg', 'https://x.com/JupiterExchange', 1),
  ('Orca', '/images/logos/orca.svg', 'https://x.com/orca_so', 2),
  ('Pyth Network', '/images/logos/pyth.svg', 'https://x.com/PythNetwork', 3),
  ('Raydium', '/images/logos/raydium.svg', 'https://x.com/RaydiumProtocol', 4),
  ('Wormhole', '/images/logos/wormhole.svg', 'https://x.com/wormhole', 5),
  ('Bonk', '/images/logos/bonk.svg', 'https://x.com/bonk_inu', 6);

-- ── Site copy (key-value pairs for editable text) ──
create table if not exists public.site_copy (
  key         text primary key,
  value       text not null,
  updated_at  timestamptz not null default now()
);

alter table public.site_copy enable row level security;
create policy "Site copy is publicly readable" on public.site_copy for select using (true);

-- Section copy seeds
insert into public.site_copy (key, value) values
  ('stats.social_proof_label', 'Building with the best in Solana'),
  ('community.badge', 'Members'),
  ('community.heading', 'Meet our Roos'),
  ('community.subheading', 'The people accelerating Solana in Australia, developers, founders, designers and operators.'),
  ('testimonials.badge', 'Community Love'),
  ('testimonials.heading', 'What Our Mates Say'),
  ('testimonials.subheading', 'Straight from the timeline.'),
  ('faq.badge', 'FAQ'),
  ('faq.heading', 'Common Questions'),
  ('get_involved.badge', 'Join Us'),
  ('get_involved.heading', 'Ready to Build?'),
  ('get_involved.subheading', 'Join Australia''s most active Solana community and start building today.'),
  ('get_involved.cta', 'Get Involved'),
  ('what_we_do.mission', 'We exist to accelerate builders, founders, creatives and institutions working towards internet capital markets on Solana.');

-- Auto-update updated_at on site_copy
create trigger set_copy_updated_at
  before update on public.site_copy
  for each row execute function public.handle_updated_at();
