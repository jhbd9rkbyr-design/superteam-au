'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { InfiniteSlider } from '@/components/ui/infinite-slider';
import { fetchStats, fetchPartners, fetchCopy, type CmsStat, type CmsPartner } from '@/lib/cms';

const defaultStats: CmsStat[] = [
  { value: 250, label: 'Members', suffix: '+' },
  { value: 40, label: 'Events hosted', suffix: '+' },
  { value: 80, label: 'Projects built', suffix: '+' },
  { value: 120, label: 'Bounties completed', suffix: '+' },
];

const defaultLogos: CmsPartner[] = [
  { name: 'Jupiter', logo_url: '/images/logos/jupiter.svg', link_url: 'https://x.com/JupiterExchange' },
  { name: 'Orca', logo_url: '/images/logos/orca.svg', link_url: 'https://x.com/orca_so' },
  { name: 'Pyth Network', logo_url: '/images/logos/pyth.svg', link_url: 'https://x.com/PythNetwork' },
  { name: 'Raydium', logo_url: '/images/logos/raydium.svg', link_url: 'https://x.com/RaydiumProtocol' },
  { name: 'Wormhole', logo_url: '/images/logos/wormhole.svg', link_url: 'https://x.com/wormhole' },
  { name: 'Bonk', logo_url: '/images/logos/bonk.svg', link_url: 'https://x.com/bonk_inu' },
];

function StatCounter({
  value,
  label,
  suffix = '+',
}: {
  value: number;
  label: string;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView) return;

    let current = 0;
    const increment = Math.ceil(value / 50);
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, 30);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      className="flex flex-col items-center justify-center text-center"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      viewport={{ once: true }}
    >
      <div
        className="text-4xl md:text-5xl lg:text-6xl font-bold text-center w-full bg-clip-text text-transparent"
        style={{
          fontFamily: 'var(--font-display)',
          backgroundImage: 'linear-gradient(135deg, #FCE266 0%, #F9CC01 40%, #E5A800 100%)',
        }}
      >
        {count.toLocaleString()}
        {suffix}
      </div>
      <p
        className="text-base md:text-lg text-[#FAF7ED]/70 mt-2 font-bold text-center w-full"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        {label}
      </p>
    </motion.div>
  );
}

export function Stats() {
  const [stats, setStats] = useState<CmsStat[]>(defaultStats);
  const [logos, setLogos] = useState<CmsPartner[]>(defaultLogos);
  const [socialLabel, setSocialLabel] = useState('Building with the best');

  useEffect(() => {
    fetchStats().then((d) => d && setStats(d));
    fetchPartners().then((d) => d && setLogos(d));
    fetchCopy(['stats.social_proof_label']).then((d) => d?.['stats.social_proof_label'] && setSocialLabel(d['stats.social_proof_label']));
  }, []);

  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'start 0.3'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [120, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full -mt-24 z-10 px-4 md:px-6"
      data-navbar-theme="dark"
    >
      <motion.div
        className="w-full max-w-[1400px] mx-auto rounded-[32px] md:rounded-[48px] py-16 md:py-20 lg:py-24 overflow-hidden"
        style={{
          y,
          backgroundColor: '#00833F',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Subtitle */}
          <p
            className="text-center text-lg md:text-xl text-[#FAF7ED]/80 mb-10 max-w-xl mx-auto leading-relaxed"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Australia&apos;s most active community of builders, designers, and operators on Solana.
          </p>

          {/* Stats counters */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6 place-items-center">
            {stats.map((stat, idx) => (
              <StatCounter
                key={idx}
                value={stat.value}
                label={stat.label}
                suffix={stat.suffix}
              />
            ))}
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-[#FAF7ED]/15 mt-14 mb-10" />

          {/* Social proof label */}
          <p
            className="text-center text-base font-bold text-white mb-8"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {socialLabel}
          </p>
        </div>

        {/* Full-width infinite logo carousel — repeat 3× so content always exceeds viewport */}
        <div className="relative h-[56px]">
          <InfiniteSlider
            className="flex h-full w-full items-center"
            duration={25}
            gap={64}
          >
            {[...logos, ...logos, ...logos].map((logo, i) => (
              <a
                key={`${logo.name}-${i}`}
                href={logo.link_url}
                target="_blank"
                rel="noopener noreferrer"
                title={logo.name}
                className="group relative shrink-0 flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-300 hover:scale-110"
              >
                {/* Glow on hover */}
                <div className="absolute inset-[-4px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ boxShadow: '0 0 24px rgba(255, 255, 255, 0.3)' }}
                />
                <Image
                  src={logo.logo_url}
                  alt={logo.name}
                  width={44}
                  height={44}
                  className="relative z-10 w-11 h-11 object-contain opacity-100"
                />
              </a>
            ))}
          </InfiniteSlider>

          {/* Fade edges to green */}
          <div
            className="pointer-events-none absolute top-0 left-0 h-full w-[80px] md:w-[160px] z-10"
            style={{ background: 'linear-gradient(to right, #00833F, transparent)' }}
          />
          <div
            className="pointer-events-none absolute top-0 right-0 h-full w-[80px] md:w-[160px] z-10"
            style={{ background: 'linear-gradient(to left, #00833F, transparent)' }}
          />
        </div>
      </motion.div>
    </section>
  );
}
