-- ============================================================
-- Superteam Australia — Events table + RBAC for all CMS tables
-- ============================================================

-- ── Events table ──
create table if not exists public.events (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  date        timestamptz not null,
  end_date    timestamptz,
  location    text not null default '',
  url         text not null default '',
  image_url   text not null default '',
  source      text not null default 'manual' check (source in ('manual', 'luma')),
  luma_id     text,
  visible     boolean not null default true,
  sort_order  int not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index if not exists idx_events_date on public.events (date desc);

alter table public.events enable row level security;

-- Public can read visible events
create policy "Events are publicly readable"
  on public.events for select
  using (visible = true);

-- Auto-update updated_at
create trigger set_events_updated_at
  before update on public.events
  for each row execute function public.handle_updated_at();

-- Seed with current hardcoded events
insert into public.events (title, date, location, url, image_url, source, sort_order) values
  ('Sydney Launch | Superteam Australia: The Outback Frontier', '2026-04-15T18:30:00+10:00', 'Circular Quay, Sydney', 'https://lu.ma/stau.sydlaunch', 'https://images.lumacdn.com/event-covers/fd/27039a97-5173-49fa-a7a2-710894cba043.jpg', 'manual', 1),
  ('Sydney Developer Meetup (Colosseum Frontier Hackathon)', '2026-04-16T17:30:00+10:00', 'Sydney, NSW', 'https://lu.ma/stau.frontiersyd', 'https://images.lumacdn.com/event-covers/es/e1459ed2-0c0a-40ef-83db-244ac8d16fea.jpg', 'manual', 2),
  ('Saturday Build Sessions - National', '2026-04-18T10:00:00+10:00', 'Online Event', 'https://lu.ma/stau.frontiersatbuild2', 'https://images.lumacdn.com/event-covers/s4/d3064fbf-038f-4b2f-a42e-a818037197dd.jpg', 'manual', 3);

-- ============================================================
-- RBAC: Admin users table + write policies for all CMS tables
-- ============================================================

-- Admin users table — add Supabase auth user IDs here to grant write access
create table if not exists public.admin_users (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null unique,  -- references auth.users(id)
  role        text not null default 'editor' check (role in ('editor', 'admin')),
  name        text not null default '',
  created_at  timestamptz not null default now()
);

alter table public.admin_users enable row level security;

-- Only authenticated admins can read the admin list
create policy "Admins can read admin list"
  on public.admin_users for select
  using (auth.uid() in (select user_id from public.admin_users));

-- ── Helper function: check if current user is admin ──
create or replace function public.is_admin()
returns boolean as $$
begin
  return exists (
    select 1 from public.admin_users
    where user_id = auth.uid()
  );
end;
$$ language plpgsql security definer;

-- ── Write policies for all CMS tables ──

-- Members: admins can insert, update, delete
create policy "Admins can insert members"
  on public.members for insert
  with check (public.is_admin());

create policy "Admins can update members"
  on public.members for update
  using (public.is_admin());

create policy "Admins can delete members"
  on public.members for delete
  using (public.is_admin());

-- Stats
create policy "Admins can insert stats"
  on public.stats for insert
  with check (public.is_admin());

create policy "Admins can update stats"
  on public.stats for update
  using (public.is_admin());

create policy "Admins can delete stats"
  on public.stats for delete
  using (public.is_admin());

-- FAQ
create policy "Admins can insert faq"
  on public.faq for insert
  with check (public.is_admin());

create policy "Admins can update faq"
  on public.faq for update
  using (public.is_admin());

create policy "Admins can delete faq"
  on public.faq for delete
  using (public.is_admin());

-- Testimonials
create policy "Admins can insert testimonials"
  on public.testimonials for insert
  with check (public.is_admin());

create policy "Admins can update testimonials"
  on public.testimonials for update
  using (public.is_admin());

create policy "Admins can delete testimonials"
  on public.testimonials for delete
  using (public.is_admin());

-- Partners
create policy "Admins can insert partners"
  on public.partners for insert
  with check (public.is_admin());

create policy "Admins can update partners"
  on public.partners for update
  using (public.is_admin());

create policy "Admins can delete partners"
  on public.partners for delete
  using (public.is_admin());

-- Site copy
create policy "Admins can insert site_copy"
  on public.site_copy for insert
  with check (public.is_admin());

create policy "Admins can update site_copy"
  on public.site_copy for update
  using (public.is_admin());

create policy "Admins can delete site_copy"
  on public.site_copy for delete
  using (public.is_admin());

-- Events
create policy "Admins can insert events"
  on public.events for insert
  with check (public.is_admin());

create policy "Admins can update events"
  on public.events for update
  using (public.is_admin());

create policy "Admins can delete events"
  on public.events for delete
  using (public.is_admin());

-- Submissions: admins can read and update (approve/reject)
create policy "Admins can read submissions"
  on public.submissions for select
  using (public.is_admin());

create policy "Admins can update submissions"
  on public.submissions for update
  using (public.is_admin());
