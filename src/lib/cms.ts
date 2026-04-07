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
