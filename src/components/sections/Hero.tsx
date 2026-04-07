'use client';

import React, { useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useScreenSize } from '@/hooks/use-screen-size';
import { PixelTrail } from '@/components/ui/pixel-trail';

// ── Spring configs ──
// Gentle, cinematic spring — slow settle, no bounce
const SLOW_SPRING = { type: 'spring' as const, stiffness: 50, damping: 30, mass: 1.2 };
// Responsive spring for text — slightly snappier
const TEXT_SPRING = { type: 'spring' as const, stiffness: 80, damping: 28, mass: 1 };
// Quick spring for CTA
const CTA_SPRING = { type: 'spring' as const, stiffness: 100, damping: 22, mass: 0.8 };

// ── Orbiting radial gradient for "on Solana" ──
// The gradient center orbits in a smooth circle via requestAnimationFrame.
// Period in ms — one full orbit. Larger = slower.
const ORBIT_PERIOD = 15000;
// How far the center travels from 50% (in percentage points). 30 = orbits between 20% and 80%.
const ORBIT_RADIUS = 30;

function useOrbitingGradient(ref: React.RefObject<HTMLElement | null>, period = ORBIT_PERIOD, radius = ORBIT_RADIUS) {
  const raf = useRef<number>(0);

  const tick = useCallback((start: number) => {
    const el = ref.current;
    if (!el) { raf.current = requestAnimationFrame(() => tick(start)); return; }
    const t = ((performance.now() - start) % period) / period; // 0→1 continuously
    const angle = t * Math.PI * 2;
    const cx = 50 + Math.cos(angle) * radius;
    const cy = 50 + Math.sin(angle) * radius;
    el.style.backgroundImage = `radial-gradient(ellipse at ${cx}% ${cy}%, #FCE266 0%, #F9CC01 20%, #68BD88 45%, #00833F 70%, #0A5C2B 100%)`;
    raf.current = requestAnimationFrame(() => tick(start));
  }, [ref, period, radius]);

  useEffect(() => {
    const start = performance.now();
    raf.current = requestAnimationFrame(() => tick(start));
    return () => cancelAnimationFrame(raf.current);
  }, [tick]);
}

export function Hero() {
  const screenSize = useScreenSize();
  const prefersReducedMotion = useReducedMotion();
  const gradientRef = useRef<HTMLSpanElement>(null);
  useOrbitingGradient(gradientRef);
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // Scroll-driven — smooth transforms
  const textOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.3], [0, -40]);
  const ctaOpacity = useTransform(scrollYProgress, [0.05, 0.35], [1, 0]);
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '6%']);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-black"
      style={{ height: '115vh' }}
      data-navbar-theme="dark"
    >
      {/* ═══ LAYER 1 — Full hero image (back) ═══ */}
      {/* Gentle zoom-out: 1.08 → 1 over ~3s with soft spring */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={prefersReducedMotion ? false : { scale: 1.08, opacity: 0.7 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          scale: { ...SLOW_SPRING, duration: 3 },
          opacity: { duration: 1.5, ease: 'easeOut' },
        }}
        style={{ y: bgY }}
      >
        <Image
          src="/images/uluru-full.webp"
          alt="Uluru at sunset with a builder working remotely in the Australian outback"
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: 'center 30%' }}
        />
      </motion.div>

      {/* ═══ LAYER 2 — Heading text (behind foreground) ═══ */}
      <motion.div
        className="absolute left-0 right-0 z-[1] flex justify-center pointer-events-none"
        style={{ top: '22%', opacity: textOpacity, y: textY }}
      >
        <div className="text-center px-6" style={{ fontFamily: 'var(--font-display)' }}>
          <h1>
            {/* Line 1 — slides up from behind Uluru */}
            <motion.span
              className="block text-5xl md:text-6xl lg:text-[80px] xl:text-[90px] font-bold text-[#FAF7ED] leading-[1.05] tracking-tight drop-shadow-[0_2px_40px_rgba(0,0,0,0.6)]"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 150 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 40, damping: 22, mass: 1.4, delay: 0.8 }}
            >
              Australia&apos;s Home for
            </motion.span>
            {/* Line 2 — gradient on "Solana Builders", slides up staggered */}
            <motion.span
              className="block text-5xl md:text-6xl lg:text-[80px] xl:text-[90px] font-bold text-[#FAF7ED] leading-[1.05] tracking-tight drop-shadow-[0_2px_40px_rgba(0,0,0,0.6)]"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 150 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 40, damping: 22, mass: 1.4, delay: 1.0 }}
            >
              <span
                ref={gradientRef}
                className="inline-block"
                style={{
                  backgroundImage: 'radial-gradient(ellipse at 50% 50%, #FCE266 0%, #F9CC01 20%, #68BD88 45%, #00833F 70%, #0A5C2B 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                Solana Builders
              </span>
            </motion.span>
          </h1>
        </div>
      </motion.div>

      {/* ═══ LAYER 3 — Foreground (masks text behind Uluru) ═══ */}
      <motion.div
        className="absolute inset-0 z-[2] pointer-events-none"
        initial={prefersReducedMotion ? false : { scale: 1.08, opacity: 0.7 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          scale: { ...SLOW_SPRING, duration: 3 },
          opacity: { duration: 1.5, ease: 'easeOut' },
        }}
      >
        <Image
          src="/images/uluru-foreground.webp"
          alt=""
          aria-hidden={true}
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: 'center 30%' }}
        />
      </motion.div>

      {/* ═══ LAYER 4 — CTA (in front of pixel trail) ═══ */}
      <motion.div
        className="absolute left-0 right-0 z-[5] flex justify-center pointer-events-none"
        style={{ top: '62%', opacity: ctaOpacity }}
      >
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...CTA_SPRING, delay: 1.8 }}
        >
          <a
            href="#get-involved"
            className="pointer-events-auto inline-flex items-center gap-2.5 font-semibold text-base px-8 py-4 rounded-full hover:scale-[1.03] transition-transform duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.25)]"
            style={{ backgroundColor: '#FEFEF0', color: '#3E4742', fontFamily: 'var(--font-display)' }}
          >
            Join the Community
            <ArrowRight size={18} strokeWidth={2.5} />
          </a>
        </motion.div>
      </motion.div>

      {/* ═══ LAYER 5 — Pixel trail ═══ */}
      <div className="absolute inset-0 z-[4]">
        <PixelTrail
          pixelSize={screenSize.lessThan('md') ? 28 : 36}
          fadeDuration={0}
          delay={500}
          pixelClassName="bg-white pixel-boomerang"
        />
      </div>

    </section>
  );
}
