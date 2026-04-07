'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { members as staticMembers, FILTER_CATEGORIES, type Member, type FilterCategory } from './member-data';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

/* ─── Skill icon map (same as carousel) ─── */
const skillIconMap: Record<string, string> = {
  Rust: '</>', TypeScript: '</>', Solana: '</>', 'Smart Contracts': '</>', Anchor: '</>', Infrastructure: '</>',
  'UI/UX': '✎', Branding: '✎', Figma: '✎', Education: '✎',
  Growth: '✦', Events: '✦', DevRel: '✦', Ops: '✦',
  Product: '⬡', Strategy: '⬡', Analytics: '⬡', Tokenomics: '⬡', Compliance: '⬡',
  Community: '♡', Web3: '♡',
  DeFi: '</>', NFTs: '⬡', Security: '</>', Auditing: '</>',
};
const getSkillIcon = (skill: string): string => skillIconMap[skill] ?? '✦';

/* ─── X / Twitter icon ─── */
const XIcon = ({ size = 12 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

/* ─── Filter pill on sidebar ─── */
function FilterPill({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'inline-flex items-center justify-between w-full px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer',
        active
          ? 'bg-brand-green/10 text-brand-green border border-brand-green/25'
          : 'bg-white border border-[#141E14]/8 text-[#141E14]/70 hover:border-[#141E14]/15 hover:text-[#141E14]',
      )}
    >
      <span>{label}</span>
      <span
        className={cn(
          'text-xs tabular-nums rounded-full px-2 py-0.5',
          active ? 'bg-brand-green/15 text-brand-green' : 'bg-[#141E14]/5 text-[#141E14]/40',
        )}
      >
        {count}
      </span>
    </button>
  );
}

/* ─── Member Card (directory version) ─── */
function DirectoryCard({ member, index }: { member: Member; index: number }) {
  const [imgLoading, setImgLoading] = useState(true);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      className="rounded-2xl bg-white border border-[#141E14]/8 overflow-hidden flex flex-col hover:border-brand-green/25 hover:shadow-lg hover:shadow-brand-green/5 transition-all duration-300 group"
    >
      {/* Top accent */}
      <div className="w-full h-1 bg-gradient-to-r from-brand-green via-brand-green-light to-brand-gold opacity-60 group-hover:opacity-100 transition-opacity" />

      <div className="flex flex-col items-center px-5 pt-7 pb-6">
        {/* Photo */}
        <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-brand-green/15 relative mb-4">
          <Image
            src={member.photo}
            alt={member.name}
            width={80}
            height={80}
            className={cn(
              'object-cover w-full h-full transition-all duration-300',
              imgLoading ? 'blur-sm scale-105' : 'blur-0 scale-100',
            )}
            onLoad={() => setImgLoading(false)}
          />
        </div>

        {/* Name */}
        <h3
          className="text-[#141E14] text-base font-bold text-center leading-tight"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {member.name}
        </h3>

        {/* Title • Company */}
        <p
          className="text-[#141E14]/50 text-sm text-center mt-1"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          {member.title} &bull; {member.company}
        </p>

        {/* X link */}
        {member.twitter && (
          <a
            href={member.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 mt-3 px-3 py-1 rounded-full text-[11px] font-medium transition-all hover:bg-[#141E14] hover:text-white"
            style={{
              fontFamily: 'var(--font-body)',
              backgroundColor: 'rgba(20, 30, 20, 0.06)',
              color: '#141E14',
            }}
          >
            <XIcon size={10} />
            @{member.twitter.split('/').pop()}
            <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-40">
              <path d="M7 17L17 7" /><path d="M7 7h10v10" />
            </svg>
          </a>
        )}

        {/* Skills */}
        <div className="flex flex-wrap justify-center gap-1.5 mt-4">
          {member.skills.slice(0, 3).map((skill) => (
            <span
              key={skill}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-[12px] text-[11px] font-medium border"
              style={{
                fontFamily: 'var(--font-body)',
                backgroundColor: 'rgba(32, 87, 58, 0.08)',
                borderColor: 'rgba(32, 87, 58, 0.15)',
                color: '#20573a',
              }}
            >
              <span className="text-[9px] leading-none opacity-50">{getSkillIcon(skill)}</span>
              {skill}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Main Directory ─── */
export function MemberDirectory() {
  const [members, setMembers] = useState<Member[]>(staticMembers);
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterCategory | null>(null);

  /* Fetch from Supabase if configured, otherwise use static data */
  useEffect(() => {
    if (!isSupabaseConfigured) return;
    (async () => {
      const { data, error } = await supabase
        .from('members')
        .select('*')
        .eq('visible', true)
        .order('sort_order', { ascending: true });
      if (!error && data && data.length > 0) {
        setMembers(data.map((m) => ({
          id: m.id,
          name: m.name,
          title: m.title,
          company: m.company,
          photo: m.photo,
          skills: m.skills,
          filters: m.filters,
          twitter: m.twitter ?? undefined,
        })));
      }
    })();
  }, []);

  const toggleFilter = (f: FilterCategory) => {
    setActiveFilter((prev) => (prev === f ? null : f));
  };

  /* Count members per filter */
  const filterCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    FILTER_CATEGORIES.forEach((f) => {
      counts[f] = members.filter((m) => m.filters.includes(f)).length;
    });
    return counts;
  }, [members]);

  /* Filtered + searched members */
  const filtered = useMemo(() => {
    let result = members;

    if (activeFilter) {
      result = result.filter((m) => m.filters.includes(activeFilter));
    }

    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(
        (m) =>
          m.name.toLowerCase().includes(q) ||
          m.title.toLowerCase().includes(q) ||
          m.company.toLowerCase().includes(q) ||
          m.skills.some((s) => s.toLowerCase().includes(q)),
      );
    }

    return result;
  }, [members, query, activeFilter]);

  return (
    <div className="min-h-screen bg-cream" data-navbar-theme="light">
      {/* Header */}
      <div className="w-full bg-cream pt-28 md:pt-36 pb-10 md:pb-14">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <a
              href="/"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-[#141E14]/70 bg-[#141E14]/[0.04] border border-[#141E14]/8 hover:bg-[#141E14]/[0.08] hover:text-[#141E14] transition-all mb-6"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              <ArrowLeft size={14} />
              Back to Home
            </a>
            <div>
              <span
                className="inline-flex items-center px-5 py-2 rounded-full text-sm font-bold text-white tracking-wide mb-5"
                style={{ backgroundColor: '#00833F', fontFamily: 'var(--font-display)' }}
              >
                Directory
              </span>
            </div>
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#141E14]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Meet the <span className="text-gradient">Roos</span>
            </h1>
            <p
              className="text-[#141E14]/60 text-lg mt-3 max-w-xl"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Builders, designers, founders and operators driving Solana in Australia.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pb-24">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar — filters */}
          <motion.aside
            className="lg:w-64 shrink-0"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <div className="lg:sticky lg:top-28 space-y-6">
              {/* Search */}
              <div className="relative">
                <Search
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#141E14]/30"
                />
                <input
                  type="text"
                  placeholder="Search members..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full rounded-xl border border-[#141E14]/10 bg-white pl-10 pr-9 py-3 text-sm text-[#141E14] placeholder:text-[#141E14]/35 focus:outline-none focus:border-brand-green/40 transition-all"
                  style={{ fontFamily: 'var(--font-body)' }}
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#141E14]/30 hover:text-[#141E14] cursor-pointer"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              {/* Filter pills */}
              <div className="space-y-2">
                <p
                  className="text-[#141E14]/40 text-xs font-semibold uppercase tracking-widest px-1 mb-3"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  Filter by skill
                </p>
                {FILTER_CATEGORIES.map((f) => (
                  <FilterPill
                    key={f}
                    label={f}
                    count={filterCounts[f]}
                    active={activeFilter === f}
                    onClick={() => toggleFilter(f)}
                  />
                ))}
              </div>

              {/* Active filter clear */}
              {activeFilter && (
                <button
                  type="button"
                  onClick={() => setActiveFilter(null)}
                  className="text-sm text-brand-green hover:underline underline-offset-2 cursor-pointer"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  Clear filter
                </button>
              )}
            </div>
          </motion.aside>

          {/* Grid */}
          <div className="flex-1">
            {/* Result count */}
            <div className="flex items-center justify-between mb-6">
              <p
                className="text-[#141E14]/50 text-sm"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {filtered.length} {filtered.length === 1 ? 'member' : 'members'}
                {activeFilter ? ` in ${activeFilter}` : ''}
              </p>
            </div>

            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              <AnimatePresence mode="popLayout">
                {filtered.map((member, i) => (
                  <DirectoryCard key={member.id} member={member} index={i} />
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Empty state */}
            {filtered.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <p
                  className="text-[#141E14]/40 text-lg"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  No members found
                </p>
                <p
                  className="text-[#141E14]/30 text-sm mt-2"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  Try a different search or filter.
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
