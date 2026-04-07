'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Rocket,
  Landmark,
  TrendingUp,
  Users,
  Globe,
  Building2,
} from 'lucide-react';
import {
  ContainerScroll,
  CardsContainer,
  CardTransformed,
} from '@/components/ui/animated-cards-stack';
import { TextRevealByWord } from '@/components/ui/text-reveal';

const services = [
  {
    icon: Rocket,
    title: 'Builder & Founder Support',
    description:
      'Product and technical guidance to help teams ship. Support across hackathons, bounties and ecosystem programs.',
    color: '#00833F',
  },
  {
    icon: Landmark,
    title: 'Capital & Fundraising',
    description:
      'Connecting capital with investable, scalable projects. Supporting founders with positioning and investor readiness.',
    color: '#0A5C2B',
  },
  {
    icon: TrendingUp,
    title: 'Growth & Distribution',
    description:
      'Go-to-market and growth support. Access to ecosystem distribution and community.',
    color: '#F9CC01',
  },
  {
    icon: Users,
    title: 'Talent & Hiring',
    description:
      'Connecting teams with developers, designers and operators. Supporting team formation and scaling.',
    color: '#68BD88',
  },
  {
    icon: Globe,
    title: 'Ecosystem & Community',
    description:
      'Events, education and ecosystem coordination. Showcasing Australian builders globally.',
    color: '#00833F',
  },
  {
    icon: Building2,
    title: 'Institutional & Industry Engagement',
    description:
      'Bridging builders with institutions. Engaging policymakers and supporting real-world deployments.',
    color: '#0A5C2B',
  },
];

export function WhatWeDo() {
  return (
    <section className="relative w-full bg-[#FAFAF5] pt-16 md:pt-24 pb-0" data-navbar-theme="light">
      {/* Scroll-reveal mission statement */}
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <TextRevealByWord
          text="We exist to accelerate builders, founders, creatives and institutions working towards internet capital markets on Solana."
          gradientFromWord={4}
          gradientToWord={9}
        />
      </div>

      {/* Animated cards section — pill lives inside the sticky area */}
      <ContainerScroll className="container relative z-10 mx-auto mt-16 h-[350vh] max-w-7xl px-4 md:px-8">
        <div className="sticky left-0 top-[130px] h-[calc(100svh-150px)] w-full bg-[#FAFAF5]">
          {/* Green pill */}
          <motion.div
            className="flex justify-center mb-10"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
          >
            <span
              className="inline-flex items-center px-5 py-2 rounded-full text-sm font-bold text-white tracking-wide"
              style={{
                backgroundColor: '#00833F',
                fontFamily: 'var(--font-display)',
              }}
            >
              What We Do
            </span>
          </motion.div>

          {/* Cards */}
          <CardsContainer className="mx-auto w-full h-[300px] md:h-[340px] max-w-[340px] md:max-w-[380px]">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <CardTransformed
                  key={service.title}
                  arrayLength={services.length}
                  variant="brand"
                  index={index + 1}
                  incrementY={12}
                  incrementZ={8}
                  role="article"
                  aria-labelledby={`service-${index}-title`}
                >
                  {/* Icon */}
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${service.color}15` }}
                  >
                    <Icon
                      size={24}
                      strokeWidth={2}
                      style={{ color: service.color }}
                    />
                  </div>

                  {/* Content */}
                  <div className="flex flex-col gap-2 flex-1">
                    <h3
                      id={`service-${index}-title`}
                      className="text-xl md:text-2xl font-bold text-[#141E14]"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {service.title}
                    </h3>
                    <p
                      className="text-base text-[#141E14]/60 leading-relaxed"
                      style={{ fontFamily: 'var(--font-body)' }}
                    >
                      {service.description}
                    </p>
                  </div>

                  {/* Bottom accent bar */}
                  <div
                    className="w-full h-1 rounded-full mt-auto"
                    style={{
                      background: `linear-gradient(90deg, ${service.color} 0%, ${service.color}40 100%)`,
                    }}
                  />
                </CardTransformed>
              );
            })}
          </CardsContainer>
        </div>
      </ContainerScroll>
    </section>
  );
}
