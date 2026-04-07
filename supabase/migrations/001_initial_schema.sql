-- ============================================================
-- Superteam Australia — Supabase Schema
-- ============================================================

-- ── Members (powers the directory) ──
create table if not exists public.members (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  title       text not null default '',
  company     text not null default '',
  photo       text not null default '',
  skills      text[] not null default '{}',
  filters     text[] not null default '{}',
  twitter     text,
  visible     boolean not null default true,
  sort_order  int not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- Index for filter queries
create index if not exists idx_members_filters on public.members using gin (filters);

-- ── Onboarding submissions ──
create table if not exists public.submissions (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  location      text not null,
  roles         text[] not null default '{}',
  skills        text not null default '',
  experience    text not null default '',
  twitter_url   text,
  github_url    text,
  portfolio_url text,
  interests     text[] not null default '{}',
  status        text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  created_at    timestamptz not null default now()
);

-- ── Row Level Security ──

-- Members: public read, admin write
alter table public.members enable row level security;

create policy "Members are publicly readable"
  on public.members for select
  using (visible = true);

-- Submissions: insert from anon, read/update requires service role
alter table public.submissions enable row level security;

create policy "Anyone can submit an application"
  on public.submissions for insert
  with check (true);

-- ── Auto-update updated_at on members ──
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger set_updated_at
  before update on public.members
  for each row execute function public.handle_updated_at();

-- ── Seed: initial member data ──
insert into public.members (name, title, company, photo, skills, filters, twitter, sort_order) values
  ('Alex Chen', 'Founder', 'SolanaFlow', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face', array['Rust','Solana','DeFi'], array['Core Team','Rust'], 'https://twitter.com/alexchen', 1),
  ('Sarah Williams', 'Lead Designer', 'Phantom', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop&crop=face', array['UI/UX','Branding','Figma'], array['Design'], 'https://twitter.com/sarahwilliams', 2),
  ('Marcus Johnson', 'Senior Engineer', 'Jupiter', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face', array['TypeScript','Smart Contracts','DeFi'], array['Frontend','Rust'], 'https://twitter.com/marcusj', 3),
  ('Emma Rodriguez', 'Product Manager', 'Tensor', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop&crop=face', array['Product','Strategy','Analytics'], array['Product'], 'https://twitter.com/emmarodriguez', 4),
  ('David Lee', 'Security Researcher', 'Helius', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face', array['Security','Auditing','Rust'], array['Rust'], 'https://twitter.com/davidlee', 5),
  ('Jessica Park', 'Community Lead', 'Marinade', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face', array['Community','Events','Growth'], array['Core Team','Community','Growth'], 'https://twitter.com/jessicapark', 6),
  ('Ryan Cooper', 'Founder', 'AussieDEX', 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=300&h=300&fit=crop&crop=face', array['DeFi','Compliance','Tokenomics'], array['Product'], 'https://twitter.com/ryancooper', 7),
  ('Nina Patel', 'Developer Advocate', 'Solana Foundation', 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&h=300&fit=crop&crop=face', array['DevRel','Rust','Education'], array['Core Team','Rust','Content'], 'https://twitter.com/ninapatel', 8),
  ('Tom Barker', 'Frontend Lead', 'Orca', 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=300&fit=crop&crop=face', array['TypeScript','UI/UX','Solana'], array['Frontend','Design'], 'https://twitter.com/tombarker', 9),
  ('Lily Nguyen', 'Content Strategist', 'Superteam AU', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&fit=crop&crop=face', array['Growth','Education','Community'], array['Core Team','Content','Growth'], 'https://twitter.com/lilynguyen', 10),
  ('Jake Morrison', 'Protocol Engineer', 'Drift', 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300&h=300&fit=crop&crop=face', array['Rust','Anchor','DeFi'], array['Rust'], 'https://twitter.com/jakemorrison', 11),
  ('Aisha Khan', 'Growth Lead', 'Superteam AU', 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=300&h=300&fit=crop&crop=face', array['Growth','Events','Ops'], array['Core Team','Growth','Community'], 'https://twitter.com/aishakhan', 12),
  ('Chris Dunlop', 'Smart Contract Dev', 'Marginfi', 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=300&h=300&fit=crop&crop=face', array['Rust','Smart Contracts','Security'], array['Rust'], 'https://twitter.com/chrisdunlop', 13),
  ('Maya Bennett', 'Brand Designer', 'Backpack', 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop&crop=face', array['Branding','Figma','UI/UX'], array['Design'], 'https://twitter.com/mayabennett', 14),
  ('Liam O''Brien', 'Head of Product', 'Pyth Network', 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=300&h=300&fit=crop&crop=face', array['Product','Strategy','Tokenomics'], array['Product'], 'https://twitter.com/liamobrien', 15),
  ('Priya Sharma', 'Full Stack Dev', 'Squads', 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=300&h=300&fit=crop&crop=face', array['TypeScript','Solana','Infrastructure'], array['Frontend','Rust'], 'https://twitter.com/priyasharma', 16);
