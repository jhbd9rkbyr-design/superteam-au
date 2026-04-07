import { supabase, isSupabaseConfigured } from './supabase';

/* ─── Types ─── */
export interface CmsStat {
  value: number;
  label: string;
  suffix: string;
}

export interface CmsFaq {
  id: string;
  question: string;
  answer: string;
}

export interface CmsTestimonial {
  tweet_id: string;
}

export interface CmsPartner {
  name: string;
  logo_url: string;
  link_url: string;
}

export interface CmsEvent {
  id: string;
  title: string;
  date: string;
  end_date?: string;
  location: string;
  url: string;
  image_url: string;
  source: 'manual' | 'luma';
}

/* ─── Fetchers ─── */

export async function fetchStats(): Promise<CmsStat[] | null> {
  if (!isSupabaseConfigured) return null;
  const { data, error } = await supabase
    .from('stats')
    .select('value, label, suffix')
    .order('sort_order', { ascending: true });
  if (error || !data?.length) return null;
  return data;
}

export async function fetchFaq(): Promise<CmsFaq[] | null> {
  if (!isSupabaseConfigured) return null;
  const { data, error } = await supabase
    .from('faq')
    .select('id, question, answer')
    .eq('visible', true)
    .order('sort_order', { ascending: true });
  if (error || !data?.length) return null;
  return data;
}

export async function fetchTestimonials(): Promise<CmsTestimonial[] | null> {
  if (!isSupabaseConfigured) return null;
  const { data, error } = await supabase
    .from('testimonials')
    .select('tweet_id')
    .eq('visible', true)
    .order('sort_order', { ascending: true });
  if (error || !data?.length) return null;
  return data;
}

export async function fetchPartners(): Promise<CmsPartner[] | null> {
  if (!isSupabaseConfigured) return null;
  const { data, error } = await supabase
    .from('partners')
    .select('name, logo_url, link_url')
    .eq('visible', true)
    .order('sort_order', { ascending: true });
  if (error || !data?.length) return null;
  return data;
}

/* ─── Events: Luma API → Supabase fallback ─── */

const LUMA_API_KEY = process.env.LUMA_API_KEY ?? '';
const LUMA_CALENDAR_SLUG = 'SuperteamAU';

async function fetchLumaEvents(): Promise<CmsEvent[] | null> {
  if (!LUMA_API_KEY) return null;
  try {
    const res = await fetch(
      `https://api.lu.ma/public/v2/event/get-events-for-calendar?calendar_api_id=${LUMA_CALENDAR_SLUG}&period=future&pagination_limit=6`,
      {
        headers: { 'x-luma-api-key': LUMA_API_KEY },
        next: { revalidate: 3600 }, // cache 1 hour
      }
    );
    if (!res.ok) return null;
    const json = await res.json();
    const entries = json.entries ?? [];
    if (!entries.length) return null;
    return entries.map((entry: { event: { api_id: string; name: string; start_at: string; end_at: string; geo_address_info?: { city_state?: string }; url: string; cover_url?: string } }) => ({
      id: entry.event.api_id,
      title: entry.event.name,
      date: entry.event.start_at,
      end_date: entry.event.end_at,
      location: entry.event.geo_address_info?.city_state ?? 'Online Event',
      url: entry.event.url,
      image_url: entry.event.cover_url ?? '',
      source: 'luma' as const,
    }));
  } catch {
    return null;
  }
}

async function fetchSupabaseEvents(): Promise<CmsEvent[] | null> {
  if (!isSupabaseConfigured) return null;
  const { data, error } = await supabase
    .from('events')
    .select('id, title, date, end_date, location, url, image_url, source')
    .eq('visible', true)
    .order('date', { ascending: true });
  if (error || !data?.length) return null;
  return data;
}

export async function fetchEvents(): Promise<CmsEvent[] | null> {
  // Priority: Luma API (live) → Supabase events table (manual) → null (static fallback)
  const luma = await fetchLumaEvents();
  if (luma) return luma;
  return fetchSupabaseEvents();
}

export async function fetchCopy(keys: string[]): Promise<Record<string, string> | null> {
  if (!isSupabaseConfigured) return null;
  const { data, error } = await supabase
    .from('site_copy')
    .select('key, value')
    .in('key', keys);
  if (error || !data?.length) return null;
  const map: Record<string, string> = {};
  data.forEach((row) => { map[row.key] = row.value; });
  return map;
}
