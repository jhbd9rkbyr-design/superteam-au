'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/Badge';
import { Calendar, MapPin, ExternalLink, Clock } from 'lucide-react';
import { fetchEvents, type CmsEvent } from '@/lib/cms';

const defaultEvents = [
  {
    id: 'seed-1',
    title: 'Sydney Launch | Superteam Australia: The Outback Frontier',
    date: '2026-04-15T18:30:00+10:00',
    end_date: '2026-04-15T21:30:00+10:00',
    location: 'Circular Quay, Sydney',
    url: 'https://lu.ma/stau.sydlaunch',
    image_url: 'https://images.lumacdn.com/event-covers/fd/27039a97-5173-49fa-a7a2-710894cba043.jpg',
    source: 'manual' as const,
  },
  {
    id: 'seed-2',
    title: 'Sydney Developer Meetup (Colosseum Frontier Hackathon)',
    date: '2026-04-16T17:30:00+10:00',
    end_date: '2026-04-16T20:30:00+10:00',
    location: 'Sydney, NSW',
    url: 'https://lu.ma/stau.frontiersyd',
    image_url: 'https://images.lumacdn.com/event-covers/es/e1459ed2-0c0a-40ef-83db-244ac8d16fea.jpg',
    source: 'manual' as const,
  },
  {
    id: 'seed-3',
    title: 'Saturday Build Sessions - National',
    date: '2026-04-18T10:00:00+10:00',
    end_date: '2026-04-18T13:00:00+10:00',
    location: 'Online Event',
    url: 'https://lu.ma/stau.frontiersatbuild2',
    image_url: 'https://images.lumacdn.com/event-covers/s4/d3064fbf-038f-4b2f-a42e-a818037197dd.jpg',
    source: 'manual' as const,
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

function formatEventDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('en-AU', { month: 'short', day: 'numeric', year: 'numeric' });
}

function formatEventTime(iso: string, endIso?: string): string {
  const fmt = (s: string) => new Date(s).toLocaleTimeString('en-AU', { hour: 'numeric', minute: '2-digit', hour12: true, timeZoneName: 'short' });
  if (endIso) return `${fmt(iso)} – ${fmt(endIso)}`;
  return fmt(iso);
}

function isUpcoming(iso: string): boolean {
  return new Date(iso) >= new Date();
}

export function Events() {
  const [events, setEvents] = useState<CmsEvent[]>(defaultEvents);

  useEffect(() => {
    fetchEvents().then((d) => d && setEvents(d));
  }, []);

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
          {events.map((event) => (
            <motion.a
              key={event.id}
              href={event.url}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-dark rounded-2xl overflow-hidden border border-white/10 hover:border-brand-gold/30 transition-all duration-300 group block"
              variants={itemVariants}
            >
              {/* Event Cover Image */}
              <div className="aspect-square relative overflow-hidden">
                {event.image_url && (
                  <Image
                    src={event.image_url}
                    alt={event.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                )}
                <div className="absolute top-4 right-4 z-10">
                  <Badge
                    variant="default"
                    dot
                    dotColor={isUpcoming(event.date) ? 'green' : undefined}
                    className="text-xs"
                  >
                    {isUpcoming(event.date) ? 'Upcoming' : 'Past'}
                  </Badge>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-white mb-4 line-clamp-2">{event.title}</h3>

                <div className="flex items-center gap-2 text-white/50 text-sm mb-2">
                  <Calendar size={16} className="shrink-0" />
                  <span>{formatEventDate(event.date)}</span>
                </div>

                <div className="flex items-center gap-2 text-white/50 text-sm mb-2">
                  <Clock size={16} className="shrink-0" />
                  <span>{formatEventTime(event.date, event.end_date)}</span>
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
