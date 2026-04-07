'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Tweet } from 'react-tweet';
import { fetchTestimonials, fetchCopy } from '@/lib/cms';

const defaultTweetIds = [
  '2040960063054156028',
  '2040678169980891444',
  '2040395485123620999',
  '2039271545885835739',
  '2039279581249798643',
  '2041131896600731680',
];

const floatPresets = [
  { rot: '-1.2deg', y: '-6px', dur: '6s', delay: '0s' },
  { rot: '0.8deg',  y: '5px',  dur: '7s', delay: '-2s' },
  { rot: '-0.6deg', y: '-5px', dur: '5.5s', delay: '-3.5s' },
  { rot: '1deg',    y: '6px',  dur: '6.5s', delay: '-1s' },
  { rot: '-0.8deg', y: '-4px', dur: '6s', delay: '-4s' },
  { rot: '0.5deg',  y: '5px',  dur: '7.5s', delay: '-0.5s' },
  { rot: '-0.9deg', y: '-5px', dur: '5s', delay: '-3s' },
  { rot: '1.1deg',  y: '4px',  dur: '6.5s', delay: '-2.5s' },
  { rot: '-0.7deg', y: '-6px', dur: '7s', delay: '-1.5s' },
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

  return (
    <section className="w-full bg-dark-green bg-topo-dark py-20 md:py-32 overflow-hidden" data-navbar-theme="dark">
      <div className="max-w-5xl mx-auto px-4 md:px-8">
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

        {/* Auto-balanced masonry — CSS columns handles height optimization */}
        <div className="tweet-masonry">
          {tweetIds.map((id, idx) => {
            const fc = floatPresets[idx % floatPresets.length];
            return (
              <motion.div
                key={id}
                className="tweet-float break-inside-avoid mb-3"
                style={{
                  '--rot': fc.rot,
                  '--float-y': fc.y,
                  '--float-dur': fc.dur,
                  '--float-delay': fc.delay,
                } as React.CSSProperties}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                viewport={{ once: true }}
              >
                <div data-theme="dark" className="tweet-embed-compact">
                  <Tweet id={id} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
