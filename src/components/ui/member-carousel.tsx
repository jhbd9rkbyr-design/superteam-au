"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { ImageProps } from "next/image";
import { cn } from "@/lib/utils";

const XTwitterIcon = ({ size = 14, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

// ===== Types =====
export interface iMember {
  name: string;
  role: string;
  bio: string;
  profileImage: string;
  skills: string[];
  twitter?: string;
}

// ===== Skill Icon Prefixes (Figma Badges & Tags system) =====
const skillIconMap: Record<string, string> = {
  // Code / Engineering
  'Rust': '</>',
  'TypeScript': '</>',
  'Solana': '</>',
  'Smart Contracts': '</>',
  'Anchor': '</>',
  'Infrastructure': '</>',
  // Design / Content
  'UI/UX': '✎',
  'Branding': '✎',
  'Figma': '✎',
  'Education': '✎',
  // Growth / Marketing
  'Growth': '✦',
  'Events': '✦',
  'DevRel': '✦',
  'Ops': '✦',
  // Product / BizDev
  'Product': '⬡',
  'Strategy': '⬡',
  'Analytics': '⬡',
  'Tokenomics': '⬡',
  'Compliance': '⬡',
  // Community
  'Community': '♡',
  'Web3': '♡',
  // DeFi
  'DeFi': '</>',
  'NFTs': '⬡',
  'Security': '</>',
  'Auditing': '</>',
};

const getSkillIcon = (skill: string): string =>
  skillIconMap[skill] ?? '✦';

// ===== Infinite Auto-Scroll Carousel with Manual Scroll Support =====
const MemberCarousel = ({ members, speed = 1 }: { members: iMember[]; speed?: number }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isPaused = useRef(false);
  const rafId = useRef<number>(0);

  // Duplicate for seamless infinite loop
  const duplicated = [...members, ...members, ...members];

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    // Start in the middle set
    const singleSetWidth = el.scrollWidth / 3;
    el.scrollLeft = singleSetWidth;

    const tick = () => {
      if (!isPaused.current && el) {
        el.scrollLeft += speed;

        // Seamless loop
        if (el.scrollLeft >= singleSetWidth * 2) {
          el.scrollLeft -= singleSetWidth;
        }
        if (el.scrollLeft <= 0) {
          el.scrollLeft += singleSetWidth;
        }
      }
      rafId.current = requestAnimationFrame(tick);
    };

    rafId.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId.current);
  }, [speed, members]);

  // Seamless loop check during manual scroll
  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el || !isPaused.current) return;

    const singleSetWidth = el.scrollWidth / 3;
    if (el.scrollLeft >= singleSetWidth * 2) {
      el.scrollLeft -= singleSetWidth;
    }
    if (el.scrollLeft <= 0) {
      el.scrollLeft += singleSetWidth;
    }
  }, []);

  return (
    <div className="relative w-full mt-10">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-r from-cream to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-l from-cream to-transparent z-10 pointer-events-none" />

      <div
        ref={scrollRef}
        className="flex gap-5 py-4 overflow-x-auto [scrollbar-width:none] [-webkit-overflow-scrolling:touch]"
        style={{ scrollbarWidth: "none" }}
        onMouseEnter={() => { isPaused.current = true; }}
        onMouseLeave={() => { isPaused.current = false; }}
        onTouchStart={() => { isPaused.current = true; }}
        onTouchEnd={() => { isPaused.current = false; }}
        onScroll={handleScroll}
      >
        {duplicated.map((member, index) => (
          <MemberCard key={`${member.name}-${index}`} member={member} />
        ))}
      </div>
    </div>
  );
};

// No truncation — bios should be written as complete sentences that fit 2 lines

// ===== Member Card =====
const MemberCard = ({ member }: { member: iMember }) => {
  return (
    <div className="rounded-2xl bg-[#FAFAF5] w-72 md:w-80 overflow-hidden flex flex-col items-center relative shrink-0 border border-[#00833F]/10 shadow-sm pb-8">
      {/* Top accent bar — brand gradient */}
      <div className="w-full h-1.5 bg-gradient-to-r from-[#00833F] via-[#68BD88] to-[#F9CC01]" />

      <div className="flex flex-col items-center px-6 pt-8">
        <MemberProfileImage src={member.profileImage} alt={member.name} />

        <h3
          className="text-[#141E14] text-lg font-bold text-center mt-4"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {member.name}
        </h3>

        <p
          className="text-[#141E14]/50 text-sm text-center mt-1"
          style={{ fontFamily: "var(--font-body)" }}
        >
          {member.role}
        </p>

        {member.twitter && (
          <a
            href={member.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-3 px-4 py-[6px] rounded-full text-[12px] font-medium transition-all hover:bg-[#141E14] hover:text-white"
            style={{
              fontFamily: "var(--font-body)",
              backgroundColor: "rgba(20, 30, 20, 0.06)",
              color: "#141E14",
            }}
          >
            <XTwitterIcon size={11} />
            @{member.twitter.split("/").pop()}
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-40">
              <path d="M7 17L17 7" /><path d="M7 7h10v10" />
            </svg>
          </a>
        )}

        {/* Bio — complete sentences, 2 lines max */}
        <p
          className="text-[#141E14]/50 text-[13px] text-center mt-4 leading-relaxed line-clamp-2"
          style={{ fontFamily: "var(--font-body)" }}
        >
          {member.bio}
        </p>

        {/* Skills — Figma Badges & Tags system, max 3 */}
        <div className="flex flex-wrap justify-center gap-[6px] mt-5">
          {member.skills.slice(0, 3).map((skill, sidx) => (
            <span
              key={sidx}
              className="inline-flex items-center gap-[5px] px-[10px] py-[5px] rounded-[14px] text-[12px] font-medium border"
              style={{
                fontFamily: "var(--font-body)",
                backgroundColor: "rgba(32, 87, 58, 0.08)",
                borderColor: "rgba(32, 87, 58, 0.15)",
                color: "#20573a",
              }}
            >
              <span className="text-[10px] leading-none opacity-50">{getSkillIcon(skill)}</span>
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

// ===== Profile Image =====
const MemberProfileImage = ({ src, alt, ...rest }: ImageProps) => {
  const [isLoading, setLoading] = useState(true);
  return (
    <div className="w-[80px] h-[80px] md:w-[110px] md:h-[110px] overflow-hidden rounded-full border-[3px] border-[#00833F]/20 relative">
      <Image
        className={cn(
          "transition duration-300 absolute top-0 inset-0 rounded-full object-cover z-10",
          isLoading ? "blur-sm" : "blur-0"
        )}
        onLoad={() => setLoading(false)}
        src={src}
        width={110}
        height={110}
        loading="lazy"
        decoding="async"
        blurDataURL={typeof src === "string" ? src : undefined}
        alt={alt || "Profile image"}
        {...rest}
      />
    </div>
  );
};

export { MemberCarousel, MemberCard, MemberProfileImage };
