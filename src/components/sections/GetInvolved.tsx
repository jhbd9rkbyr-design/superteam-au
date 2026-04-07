'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FloatingPaths } from '@/components/ui/background-paths';
import { ArrowRight } from 'lucide-react';
import { fetchCopy } from '@/lib/cms';

export function GetInvolved() {
  const [badge, setBadge] = useState('Join Us');
  const [title, setTitle] = useState('Ready to Build?');
  const [subtitle, setSubtitle] = useState("Join Australia's most active Solana community and start building today.");
  const [cta, setCta] = useState('Get Involved');

  useEffect(() => {
    fetchCopy(['get_involved.badge', 'get_involved.heading', 'get_involved.subheading', 'get_involved.cta']).then((d) => {
      if (d?.['get_involved.badge']) setBadge(d['get_involved.badge']);
      if (d?.['get_involved.heading']) setTitle(d['get_involved.heading']);
      if (d?.['get_involved.subheading']) setSubtitle(d['get_involved.subheading']);
      if (d?.['get_involved.cta']) setCta(d['get_involved.cta']);
    });
  }, []);

  const words = title.split(" ");

  return (
    <section
      id="get-involved"
      className="relative w-full min-h-[70vh] flex items-center justify-center overflow-hidden"
      data-navbar-theme="dark"
      style={{ backgroundColor: '#0A2010' }}
    >
      {/* Animated path lines */}
      <div className="absolute inset-0 text-[#00833F]">
        <FloatingPaths position={1} />
        <FloatingPaths position={-1} />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-6 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          {/* Pill */}
          <motion.span
            className="inline-flex items-center px-5 py-2 rounded-full text-sm font-bold tracking-wide mb-8"
            style={{
              backgroundColor: '#F9CC01',
              color: '#0A2010',
              fontFamily: 'var(--font-display)',
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            {badge}
          </motion.span>

          {/* Animated title — letter by letter */}
          <h2
            className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 tracking-tight"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {words.map((word, wordIndex) => (
              <span key={wordIndex} className="inline-block mr-4 last:mr-0">
                {word.split("").map((letter, letterIndex) => (
                  <motion.span
                    key={`${wordIndex}-${letterIndex}`}
                    initial={{ y: 80, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{
                      delay: wordIndex * 0.1 + letterIndex * 0.03,
                      type: "spring",
                      stiffness: 150,
                      damping: 25,
                    }}
                    viewport={{ once: true }}
                    className="inline-block text-gradient"
                  >
                    {letter}
                  </motion.span>
                ))}
              </span>
            ))}
          </h2>

          {/* Subtitle */}
          <motion.p
            className="text-white text-lg max-w-xl mx-auto mb-10"
            style={{ fontFamily: 'var(--font-body)' }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            {subtitle}
          </motion.p>

          {/* CTA Button — frosted glass style */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <a
              href="/get-involved"
              className="inline-flex items-center gap-3 group"
            >
              <div
                className="relative rounded-2xl p-px overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(0,131,63,0.4), rgba(249,204,1,0.4))',
                }}
              >
                <div
                  className="rounded-[0.9rem] px-8 py-4 backdrop-blur-md flex items-center gap-3 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:shadow-lg"
                  style={{
                    backgroundColor: 'rgba(10, 32, 16, 0.9)',
                    fontFamily: 'var(--font-display)',
                  }}
                >
                  <span className="text-white text-[16px] font-semibold opacity-90 group-hover:opacity-100 transition-opacity">
                    {cta}
                  </span>
                  <ArrowRight
                    size={16}
                    className="text-[#F9CC01] opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300"
                  />
                </div>
              </div>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
