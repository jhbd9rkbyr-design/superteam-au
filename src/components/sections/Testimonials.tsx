'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { fetchTestimonials, fetchCopy } from '@/lib/cms';
import { TestimonialsColumn } from '@/components/ui/testimonials-column';

const defaultTweetIds = [
  '2040960063054156028',
  '2040678169980891444',
  '2040395485123620999',
  '2039271545885835739',
  '2039279581249798643',
  '2041131896600731680',
];

export function Testimonials() {
  const [tweetIds, setTweetIds] = useState(defaultTweetIds);
  const [badge, setBadge] = useState('Community Love');
  const [heading, setHeading] = useState('What Our Mates Say');
  const [subheading, setSubheading] = useState('Straight from the timeline.');

  useEffect(() => {
    fetchTestimonials().then((d) => d && setTweetIds(d.map((t) => t.tweet_id)));
    fetchCopy(['testimonials.badge', 'testimonials.heading', 'testimonials.subheading']).then((d) => {
      if (d?.['testimonials.badge']) setBadge(d['testimonials.badge']);
      if (d?.['testimonials.heading']) setHeading(d['testimonials.heading']);
      if (d?.['testimonials.subheading']) setSubheading(d['testimonials.subheading']);
    });
  }, []);

  /* Split tweets across columns — 1 col mobile, 2 tablet, 3 desktop */
  const [col1, col2, col3] = useMemo(() => {
    const c1: string[] = [];
    const c2: string[] = [];
    const c3: string[] = [];
    tweetIds.forEach((id, i) => {
      if (i % 3 === 0) c1.push(id);
      else if (i % 3 === 1) c2.push(id);
      else c3.push(id);
    });
    return [c1, c2, c3];
  }, [tweetIds]);

  return (
    <section className="w-full bg-dark-green bg-topo-dark py-20 md:py-32 overflow-hidden" data-navbar-theme="dark">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <span
            className="inline-flex items-center px-5 py-2 rounded-full text-sm font-bold tracking-wide mb-6"
            style={{
              backgroundColor: '#F9CC01',
              color: '#0A2010',
              fontFamily: 'var(--font-display)',
            }}
          >
            {badge}
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold text-white mb-3"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {heading}
          </h2>
          <p
            className="text-white/40 text-lg max-w-md mx-auto"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            {subheading}
          </p>
        </motion.div>

        {/* Scrolling columns with gradient mask */}
        <div
          className="flex justify-center gap-5 max-h-[700px] overflow-hidden"
          style={{
            maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)',
          }}
        >
          <TestimonialsColumn tweetIds={col1} duration={25} />
          <TestimonialsColumn tweetIds={col2} duration={30} className="hidden md:block" />
          <TestimonialsColumn tweetIds={col3} duration={22} className="hidden lg:block" />
        </div>
      </div>
    </section>
  );
}
