'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { fetchFaq, fetchCopy, type CmsFaq } from '@/lib/cms';

const defaultFaqs: CmsFaq[] = [
  { id: '1', question: 'What is Superteam Australia?', answer: 'Superteam Australia is a community of builders, designers, and operators working on Solana. We provide resources, mentorship, bounties, and networking opportunities to help you succeed in Web3.' },
  { id: '2', question: 'How do I join the community?', answer: 'Join our Discord server and attend our events. There\'s no formal membership process — just show up, introduce yourself, and start building with us.' },
  { id: '3', question: 'How can I earn bounties?', answer: 'Browse available opportunities on Superteam Earn (superteam.fun/earn/s/superteamaustralia). Submit your proposal, get approved, and start building. Bounties range from 1,000 to 10,000+ USDC depending on complexity.' },
  { id: '4', question: 'Are there events in other Australian cities?', answer: 'Yes! We host events regularly in Sydney, Melbourne, Brisbane, and Perth. Check our events on Luma (lu.ma/SuperteamAU) for upcoming meetups, workshops, and hackathons near you.' },
  { id: '5', question: 'Is there mentorship available?', answer: 'Absolutely. We have experienced builders and founders available for mentorship. Connect with community members at events or reach out on Discord.' },
];

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
  index: number;
}

function FAQItem({ question, answer, isOpen, onClick, index }: FAQItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      viewport={{ once: true }}
      className={`bg-white rounded-xl border transition-all duration-300 ${
        isOpen ? 'border-gradient' : 'border-dark-green/8'
      } px-6 py-5`}
    >
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between text-left cursor-pointer"
      >
        <h3 className="font-medium text-text-primary text-lg">{question}</h3>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0 ml-4"
        >
          <ChevronDown size={20} className="text-brand-green" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-text-secondary text-[15px] leading-relaxed mt-4 pt-4 border-t border-dark-green/8">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FAQ() {
  const [faqs, setFaqs] = useState<CmsFaq[]>(defaultFaqs);
  const [badge, setBadge] = useState('FAQ');
  const [heading, setHeading] = useState('Common Questions');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useEffect(() => {
    fetchFaq().then((d) => d && setFaqs(d));
    fetchCopy(['faq.badge', 'faq.heading']).then((d) => {
      if (d?.['faq.badge']) setBadge(d['faq.badge']);
      if (d?.['faq.heading']) setHeading(d['faq.heading']);
    });
  }, []);

  return (
    <section className="w-full bg-cream py-20 md:py-32" data-navbar-theme="light">
      <div className="max-w-3xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16 md:mb-20"
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
            className="text-4xl md:text-5xl font-bold text-text-primary mb-4"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {heading}
          </h2>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <FAQItem
              key={faq.id}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === idx}
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              index={idx}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
