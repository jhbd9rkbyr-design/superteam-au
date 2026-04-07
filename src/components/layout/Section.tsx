"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SectionProps {
  id?: string;
  children: ReactNode;
  variant?: "light" | "dark" | "gradient";
  className?: string;
  noisy?: boolean;
}

export function Section({
  id,
  children,
  variant = "light",
  className = "",
  noisy = false,
}: SectionProps) {
  const bgMap = {
    light: "bg-cream text-text-primary",
    dark: "bg-dark-green text-white",
    gradient: "bg-gradient-brand-diagonal text-deep-dark",
  };

  return (
    <section
      id={id}
      className={`relative py-20 md:py-28 overflow-hidden ${bgMap[variant]} ${
        noisy ? "noise" : ""
      } ${className}`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        {children}
      </div>
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  dark = false,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  dark?: boolean;
}) {
  const alignment = align === "center" ? "text-center mx-auto" : "";
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className={`max-w-2xl mb-12 md:mb-16 ${alignment}`}
    >
      {eyebrow && (
        <span
          className={`text-xs font-semibold uppercase tracking-[0.15em] ${
            dark ? "text-brand-gold" : "text-brand-green"
          } mb-3 block`}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={`text-3xl md:text-4xl lg:text-[44px] font-bold leading-tight tracking-tight ${
          dark ? "text-white" : "text-text-primary"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 text-lg leading-relaxed ${
            dark ? "text-white/60" : "text-text-secondary"
          }`}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}
