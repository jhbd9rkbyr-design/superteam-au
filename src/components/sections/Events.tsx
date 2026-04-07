'use client';

// TODO: Replace hardcoded events with Luma API integration
// - Use Luma API (https://docs.lu.ma/reference) with SuperteamAU calendar
// - Fetch events server-side (Next.js server component or API route) with revalidation
// - Auto-sort by date, filter upcoming vs past
// - Pull cover images, titles, dates, locations, and event URLs dynamically
// - Luma API key needed — store in env var LUMA_API_KEY

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/Badge';
import { Calendar, MapPin, ExternalLink, Clock } from 'lucide-react';

const events = [
  {
    title: 'Sydney Launch | Superteam Australia: The Outback Frontier',
    date: 'Apr 15, 2026',
    time: '6:30 PM – 9:30 PM AEST',
    location: 'Circular Quay, Sydney',
    url: 'https://lu.ma/stau.sydlaunch',
    image: 'https://images.lumacdn.com/event-covers/fd/27039a97-5173-49fa-a7a2-710894cba043.jpg',
  },
  {
    title: 'Sydney Developer Meetup (Colosseum Frontier Hackathon)',
    date: 'Apr 16, 2026',
    time: '5:30 PM – 8:30 PM AEST',
    location: 'Sydney, NSW',
    url: 'https://lu.ma/stau.frontiersyd',
    image: 'https://images.lumacdn.com/event-covers/es/e1459ed2-0c0a-40ef-83db-244ac8d16fea.jpg',
  },
  {
    title: 'Saturday Build Sessions – National',
    date: 'Apr 18, 2026',
    time: '10:00 AM – 1:00 PM AEST',
    location: 'Online Event',
    url: 'https://lu.ma/stau.frontiersatbuild2',
    image: 'https://images.lumacdn.com/event-covers/s4/d3064fbf-038f-4b2f-a42e-a818037197dd.jpg',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function Events() {
  return (
    <section id="events" className="w-full bg-dark-green bg-topo-dark py-20 md:py-32 scroll-mt-24" data-navbar-theme="dark">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <span
            className="inline-flex items-center px-5 py-2 rounded-full text-sm font-bold text-[#0A2010] tracking-wide mb-6"
            style={{
              backgroundColor: '#F9CC01',
              fontFamily: 'var(--font-display)',
            }}
          >
            Events
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            What&apos;s Happening
          </h2>
        </motion.div>

        {/* Event Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {events.map((event, idx) => (
            <motion.a
              key={idx}
              href={event.url}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-dark rounded-2xl overflow-hidden border border-white/10 hover:border-brand-gold/30 transition-all duration-300 group block"
              variants={itemVariants}
            >
              {/* Event Cover Image */}
              <div className="aspect-square relative overflow-hidden">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 z-10">
                  <Badge
                    variant="default"
                    dot
                    dotColor="green"
                    className="text-xs"
                  >
                    Upcoming
                  </Badge>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-white mb-4 line-clamp-2">{event.title}</h3>

                <div className="flex items-center gap-2 text-white/50 text-sm mb-2">
                  <Calendar size={16} className="shrink-0" />
                  <span>{event.date}</span>
                </div>

                <div className="flex items-center gap-2 text-white/50 text-sm mb-2">
                  <Clock size={16} className="shrink-0" />
                  <span>{event.time}</span>
                </div>

                <div className="flex items-center gap-2 text-white/50 text-sm">
                  <MapPin size={16} className="shrink-0" />
                  <span>{event.location}</span>
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* View All on Luma */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <a
            href="https://luma.com/SuperteamAU"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full border border-white/30 text-white text-sm font-semibold hover:border-white/60 transition-all"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            View All Events on Luma
            <ExternalLink size={14} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
