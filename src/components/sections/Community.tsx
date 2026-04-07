'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MemberCarousel, iMember } from '@/components/ui/member-carousel';
import { ArrowRight } from 'lucide-react';

const members: (iMember & { id: string })[] = [
  {
    id: '1',
    name: 'Alex Chen',
    role: 'Founder • SolanaFlow',
    bio: 'Builds decentralised infrastructure for next-gen financial products on Solana.',
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
    skills: ['Rust', 'Solana', 'DeFi'],
    twitter: 'https://twitter.com/alexchen',
  },
  {
    id: '2',
    name: 'Sarah Williams',
    role: 'Designer • Phantom',
    bio: 'Designs intuitive crypto experiences that make Web3 accessible to everyone.',
    profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop&crop=face',
    skills: ['UI/UX', 'Branding', 'Figma'],
    twitter: 'https://twitter.com/sarahwilliams',
  },
  {
    id: '3',
    name: 'Marcus Johnson',
    role: 'Developer • Jupiter',
    bio: 'Full-stack engineer focused on DeFi aggregation and routing optimisation.',
    profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face',
    skills: ['TypeScript', 'Smart Contracts', 'DeFi'],
    twitter: 'https://twitter.com/marcusj',
  },
  {
    id: '4',
    name: 'Emma Rodriguez',
    role: 'Product Manager • Tensor',
    bio: 'Drives product strategy for NFT infrastructure across the Solana ecosystem.',
    profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop&crop=face',
    skills: ['Product', 'Strategy', 'Analytics'],
    twitter: 'https://twitter.com/emmarodriguez',
  },
  {
    id: '5',
    name: 'David Lee',
    role: 'Security Researcher • Helius',
    bio: 'Audits smart contracts and builds security tooling for Solana protocols.',
    profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
    skills: ['Security', 'Auditing', 'Rust'],
    twitter: 'https://twitter.com/davidlee',
  },
  {
    id: '6',
    name: 'Jessica Park',
    role: 'Community Lead • Marinade',
    bio: 'Grows and nurtures the Solana community in Australia through events and education.',
    profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face',
    skills: ['Community', 'Events', 'Growth'],
    twitter: 'https://twitter.com/jessicapark',
  },
  {
    id: '7',
    name: 'Ryan Cooper',
    role: 'Founder • AussieDEX',
    bio: 'Builds Australia\'s first regulated on-chain exchange bridging TradFi and DeFi.',
    profileImage: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=300&h=300&fit=crop&crop=face',
    skills: ['DeFi', 'Compliance', 'Tokenomics'],
    twitter: 'https://twitter.com/ryancooper',
  },
  {
    id: '8',
    name: 'Nina Patel',
    role: 'Developer Advocate • Solana Foundation',
    bio: 'Helps developers ship on Solana through workshops, docs and technical content.',
    profileImage: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&h=300&fit=crop&crop=face',
    skills: ['DevRel', 'Rust', 'Education'],
    twitter: 'https://twitter.com/ninapatel',
  },
];

export function Community() {
  return (
    <section className="w-full bg-cream py-20 md:py-32 overflow-hidden" data-navbar-theme="light">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <span
            className="inline-flex items-center px-5 py-2 rounded-full text-sm font-bold text-white tracking-wide mb-6"
            style={{
              backgroundColor: '#00833F',
              fontFamily: 'var(--font-display)',
            }}
          >
            Members
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold text-[#141E14] mb-4"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Meet our <span className="text-gradient">Roos</span>
          </h2>
          <p className="text-[#141E14]/60 text-lg max-w-2xl mx-auto">
            The people accelerating Solana in Australia, developers, founders, designers and operators.
          </p>
        </motion.div>

        {/* Member Carousel — infinite auto-scroll */}
        <MemberCarousel members={members} />

        {/* View Directory CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <a
            href="/members"
            className="inline-flex items-center gap-2 px-10 py-4 rounded-full bg-[#1E2C1C] text-white text-[15px] font-semibold hover:bg-[#1E2C1C]/90 transition-all"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            View Member Directory
            <ArrowRight size={14} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
