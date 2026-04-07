'use client';

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Check, Loader2 } from 'lucide-react';
import { FloatingPaths } from '@/components/ui/background-paths';

/* ─── Types ─── */
type Role = 'Builder' | 'Designer' | 'Founder' | 'Creative' | 'Operator' | 'Institution';
type Experience = 'New to Web3' | 'Some experience' | 'Experienced' | 'Expert';
type Interest =
  | 'Bounties & Earn'
  | 'Events & Meetups'
  | 'Mentorship'
  | 'Hiring / Getting Hired'
  | 'Grants & Funding'
  | 'Building a Project';

interface FormData {
  name: string;
  location: string;
  roles: Role[];
  skills: string;
  experience: Experience | '';
  twitterUrl: string;
  githubUrl: string;
  portfolioUrl: string;
  interests: Interest[];
}

const INITIAL_DATA: FormData = {
  name: '',
  location: '',
  roles: [],
  skills: '',
  experience: '',
  twitterUrl: '',
  githubUrl: '',
  portfolioUrl: '',
  interests: [],
};

const ROLES: { label: Role; icon: string }[] = [
  { label: 'Builder', icon: '</>' },
  { label: 'Designer', icon: '✎' },
  { label: 'Founder', icon: '◆' },
  { label: 'Creative', icon: '✦' },
  { label: 'Operator', icon: '⬡' },
  { label: 'Institution', icon: '🏛' },
];

const EXPERIENCE_LEVELS: Experience[] = [
  'New to Web3',
  'Some experience',
  'Experienced',
  'Expert',
];

const INTERESTS: Interest[] = [
  'Bounties & Earn',
  'Events & Meetups',
  'Mentorship',
  'Hiring / Getting Hired',
  'Grants & Funding',
  'Building a Project',
];

const LOCATIONS = [
  'Sydney',
  'Melbourne',
  'Brisbane',
  'Perth',
  'Adelaide',
  'Hobart',
  'Darwin',
  'Canberra',
  'Gold Coast',
  'Other',
];

const TOTAL_STEPS = 4;

/* ─── Step transition ─── */
const stepVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
};

/* ─── Shared UI bits ─── */
function Pill({
  label,
  icon,
  selected,
  onClick,
}: {
  label: string;
  icon?: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium
        border transition-all duration-200 cursor-pointer select-none
        ${
          selected
            ? 'bg-brand-green/20 border-brand-green/50 text-white'
            : 'bg-white/[0.06] border-white/15 text-white/80 hover:border-white/30 hover:text-white'
        }
      `}
    >
      {icon && <span className="text-xs">{icon}</span>}
      {label}
      {selected && <Check size={14} className="text-brand-green ml-1" />}
    </button>
  );
}

function InputField({
  label,
  placeholder,
  value,
  onChange,
  type = 'text',
  required = false,
  prefix,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  prefix?: string;
}) {
  return (
    <div className="space-y-2">
      <label
        className="text-white text-sm font-medium"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        {label}
        {required && <span className="text-brand-gold ml-1">*</span>}
      </label>
      <div className="relative">
        {prefix && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 text-sm">
            {prefix}
          </span>
        )}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`
            w-full rounded-xl border border-white/15 bg-white/[0.06] px-4 py-3
            text-white text-sm placeholder:text-white/35
            focus:outline-none focus:border-brand-green/60 focus:bg-white/[0.08]
            transition-all duration-200
            ${prefix ? 'pl-10' : ''}
          `}
          style={{ fontFamily: 'var(--font-body)' }}
        />
      </div>
    </div>
  );
}

/* ─── Main Component ─── */
export function OnboardingForm() {
  const [step, setStep] = useState(1);
  const [dir, setDir] = useState(1);
  const [data, setData] = useState<FormData>(INITIAL_DATA);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const update = useCallback(
    <K extends keyof FormData>(key: K, value: FormData[K]) => {
      setData((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  const toggleArrayItem = useCallback(
    <K extends keyof FormData>(key: K, item: string) => {
      setData((prev) => {
        const arr = prev[key] as string[];
        return {
          ...prev,
          [key]: arr.includes(item)
            ? arr.filter((i) => i !== item)
            : [...arr, item],
        };
      });
    },
    [],
  );

  const canProceed = (): boolean => {
    switch (step) {
      case 1:
        return data.name.trim().length > 0 && data.location.length > 0;
      case 2:
        return data.roles.length > 0 && data.experience !== '';
      case 3:
        return true; // links are optional
      case 4:
        return data.interests.length > 0;
      default:
        return false;
    }
  };

  const goNext = () => {
    if (step < TOTAL_STEPS) {
      setDir(1);
      setStep((s) => s + 1);
    }
  };

  const goBack = () => {
    if (step > 1) {
      setDir(-1);
      setStep((s) => s - 1);
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    // Simulate API call — swap with Supabase insert later
    await new Promise((r) => setTimeout(r, 1200));
    // TODO: Supabase integration
    // const { error } = await supabase.from('onboarding').insert([data]);
    setSubmitting(false);
    setSubmitted(true);
  };

  /* ─── Confirmation screen ─── */
  if (submitted) {
    return (
      <div
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ backgroundColor: '#0A2010' }}
        data-navbar-theme="dark"
      >
        <div className="absolute inset-0 text-[#00833F]">
          <FloatingPaths position={1} />
          <FloatingPaths position={-1} />
        </div>
        <motion.div
          className="relative z-10 text-center px-6 max-w-lg"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="w-20 h-20 rounded-full bg-brand-green/20 flex items-center justify-center mx-auto mb-8"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
          >
            <Check size={36} className="text-brand-green" />
          </motion.div>
          <h1
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Good on ya, <span className="text-gradient">{data.name.split(' ')[0]}</span>.
          </h1>
          <p
            className="text-white text-lg mb-10"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            We&apos;ll be in touch. Jump into Discord and say g&apos;day in the meantime.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/[0.08] border border-white/15 text-white text-sm font-medium hover:bg-white/[0.12] transition-all"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Back to Home
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-brand-green text-white text-sm font-medium hover:bg-brand-green/90 transition-all"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Join Discord
              <ArrowRight size={14} />
            </a>
          </div>
        </motion.div>
      </div>
    );
  }

  /* ─── Form steps ─── */
  return (
    <div
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: '#0A2010' }}
      data-navbar-theme="dark"
    >
      {/* Background */}
      <div className="absolute inset-0 text-[#00833F] opacity-50">
        <FloatingPaths position={1} />
        <FloatingPaths position={-1} />
      </div>

      {/* Form card */}
      <div className="relative z-10 w-full max-w-xl mx-auto px-4 py-24 md:py-32">
        {/* Progress */}
        <div className="flex items-center gap-2 mb-10">
          {Array.from({ length: TOTAL_STEPS }, (_, i) => (
            <div
              key={i}
              className="h-1 flex-1 rounded-full transition-all duration-500"
              style={{
                background:
                  i < step
                    ? 'linear-gradient(90deg, #00833F, #F9CC01)'
                    : 'rgba(255,255,255,0.12)',
              }}
            />
          ))}
          <span className="text-white/50 text-xs ml-2 tabular-nums">
            {step}/{TOTAL_STEPS}
          </span>
        </div>

        {/* Step content */}
        <div className="relative min-h-[420px]">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={step}
              custom={dir}
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="space-y-8"
            >
              {step === 1 && (
                <>
                  <div>
                    <span
                      className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold tracking-wide mb-5"
                      style={{
                        backgroundColor: '#F9CC01',
                        color: '#0A2010',
                        fontFamily: 'var(--font-display)',
                      }}
                    >
                      About You
                    </span>
                    <h2
                      className="text-3xl md:text-4xl font-bold text-white"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      Let&apos;s start with the basics
                    </h2>
                  </div>

                  <InputField
                    label="Full Name"
                    placeholder="e.g. Alex Chen"
                    value={data.name}
                    onChange={(v) => update('name', v)}
                    required
                  />

                  <div className="space-y-2">
                    <label
                      className="text-white text-sm font-medium"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      Location<span className="text-brand-gold ml-1">*</span>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {LOCATIONS.map((loc) => (
                        <Pill
                          key={loc}
                          label={loc}
                          selected={data.location === loc}
                          onClick={() => update('location', loc)}
                        />
                      ))}
                    </div>
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <div>
                    <span
                      className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold tracking-wide mb-5"
                      style={{
                        backgroundColor: '#F9CC01',
                        color: '#0A2010',
                        fontFamily: 'var(--font-display)',
                      }}
                    >
                      Your Profile
                    </span>
                    <h2
                      className="text-3xl md:text-4xl font-bold text-white"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      What do you do?
                    </h2>
                  </div>

                  <div className="space-y-2">
                    <label
                      className="text-white text-sm font-medium"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      Role / Area<span className="text-brand-gold ml-1">*</span>
                      <span className="text-white/50 ml-2 font-normal text-xs">(select all that apply)</span>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {ROLES.map((role) => (
                        <Pill
                          key={role.label}
                          label={role.label}
                          icon={role.icon}
                          selected={data.roles.includes(role.label)}
                          onClick={() => toggleArrayItem('roles', role.label)}
                        />
                      ))}
                    </div>
                  </div>

                  <InputField
                    label="Skills"
                    placeholder="e.g. Rust, React, Solidity, UI/UX, Marketing..."
                    value={data.skills}
                    onChange={(v) => update('skills', v)}
                  />

                  <div className="space-y-2">
                    <label
                      className="text-white text-sm font-medium"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      Web3 Experience<span className="text-brand-gold ml-1">*</span>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {EXPERIENCE_LEVELS.map((exp) => (
                        <Pill
                          key={exp}
                          label={exp}
                          selected={data.experience === exp}
                          onClick={() => update('experience', exp)}
                        />
                      ))}
                    </div>
                  </div>
                </>
              )}

              {step === 3 && (
                <>
                  <div>
                    <span
                      className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold tracking-wide mb-5"
                      style={{
                        backgroundColor: '#F9CC01',
                        color: '#0A2010',
                        fontFamily: 'var(--font-display)',
                      }}
                    >
                      Your Links
                    </span>
                    <h2
                      className="text-3xl md:text-4xl font-bold text-white"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      Where can we find you?
                    </h2>
                    <p
                      className="text-white/70 text-sm mt-2"
                      style={{ fontFamily: 'var(--font-body)' }}
                    >
                      All optional — add what you&apos;re comfortable sharing.
                    </p>
                  </div>

                  <InputField
                    label="Twitter / X"
                    placeholder="username"
                    value={data.twitterUrl}
                    onChange={(v) => update('twitterUrl', v)}
                    prefix="@"
                  />

                  <InputField
                    label="GitHub"
                    placeholder="username"
                    value={data.githubUrl}
                    onChange={(v) => update('githubUrl', v)}
                    prefix="@"
                  />

                  <InputField
                    label="Portfolio / Website"
                    placeholder="https://yoursite.com"
                    value={data.portfolioUrl}
                    onChange={(v) => update('portfolioUrl', v)}
                  />
                </>
              )}

              {step === 4 && (
                <>
                  <div>
                    <span
                      className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold tracking-wide mb-5"
                      style={{
                        backgroundColor: '#F9CC01',
                        color: '#0A2010',
                        fontFamily: 'var(--font-display)',
                      }}
                    >
                      Almost Done
                    </span>
                    <h2
                      className="text-3xl md:text-4xl font-bold text-white"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      What are you looking for?
                    </h2>
                  </div>

                  <div className="space-y-2">
                    <label
                      className="text-white text-sm font-medium"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      Interests<span className="text-brand-gold ml-1">*</span>
                      <span className="text-white/50 ml-2 font-normal text-xs">(select all that apply)</span>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {INTERESTS.map((interest) => (
                        <Pill
                          key={interest}
                          label={interest}
                          selected={data.interests.includes(interest)}
                          onClick={() => toggleArrayItem('interests', interest)}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Summary preview */}
                  <div className="rounded-xl border border-white/10 bg-white/[0.04] p-5 space-y-3">
                    <p className="text-white/50 text-xs font-semibold uppercase tracking-widest"
                       style={{ fontFamily: 'var(--font-display)' }}>
                      Summary
                    </p>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="text-white/60">Name</span>
                        <p className="text-white">{data.name || '—'}</p>
                      </div>
                      <div>
                        <span className="text-white/60">Location</span>
                        <p className="text-white">{data.location || '—'}</p>
                      </div>
                      <div>
                        <span className="text-white/60">Role</span>
                        <p className="text-white">{data.roles.join(', ') || '—'}</p>
                      </div>
                      <div>
                        <span className="text-white/60">Experience</span>
                        <p className="text-white">{data.experience || '—'}</p>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation buttons */}
        <div className="flex items-center justify-between mt-10">
          <button
            type="button"
            onClick={goBack}
            disabled={step === 1}
            className={`
              inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium
              border border-white/15 transition-all duration-200 cursor-pointer
              ${step === 1 ? 'opacity-0 pointer-events-none' : 'text-white hover:border-white/30'}
            `}
            style={{ fontFamily: 'var(--font-display)' }}
          >
            <ArrowLeft size={14} />
            Back
          </button>

          {step < TOTAL_STEPS ? (
            <button
              type="button"
              onClick={goNext}
              disabled={!canProceed()}
              className={`
                inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold
                transition-all duration-200 cursor-pointer
                ${
                  canProceed()
                    ? 'bg-brand-green text-white hover:bg-brand-green/90'
                    : 'bg-white/[0.08] text-white/40 cursor-not-allowed'
                }
              `}
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Continue
              <ArrowRight size={14} />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!canProceed() || submitting}
              className={`
                inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold
                transition-all duration-200 cursor-pointer
                ${
                  canProceed() && !submitting
                    ? 'bg-brand-green text-white hover:bg-brand-green/90'
                    : 'bg-white/[0.08] text-white/40 cursor-not-allowed'
                }
              `}
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {submitting ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  Submit
                  <Check size={14} />
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
