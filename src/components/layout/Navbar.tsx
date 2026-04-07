"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Events", href: "/#events" },
  { label: "Members", href: "/members" },
  { label: "Opportunities", href: "https://superteam.fun/earn/s/superteamaustralia", external: true },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const checkTheme = () => {
      const sections = document.querySelectorAll("[data-navbar-theme]");
      const navbarBottom = 90; // approximate navbar bottom in px

      let currentTheme: "dark" | "light" = "dark";

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        // If the section covers the navbar area
        if (rect.top <= navbarBottom && rect.bottom > navbarBottom) {
          currentTheme = (section as HTMLElement).dataset.navbarTheme as "dark" | "light";
        }
      });

      setTheme(currentTheme);
    };

    checkTheme();
    window.addEventListener("scroll", checkTheme, { passive: true });
    return () => window.removeEventListener("scroll", checkTheme);
  }, []);

  const isDark = theme === "dark";
  const logoSrc = isDark ? "/images/ST Aus White.png" : "/images/ST Aus Dark.png";

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav className="mx-auto max-w-[1400px] px-4 lg:px-6 pt-4">
        {/* Desktop navbar */}
        <div
          className="hidden md:flex items-center justify-between h-[78px] rounded-full bg-white/[0.28] backdrop-blur-xl pl-[26px] pr-[12px]"
        >
          {/* Logo — swaps based on section background */}
          <a href="/" className="shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logoSrc}
              alt="Superteam Australia"
              className="h-[36px] w-auto transition-opacity duration-300"
            />
          </a>

          {/* Center pill — dark nav links */}
          <div
            className="flex items-center gap-[49px] py-[18px] px-[50px] rounded-full bg-[#1E2C1C]"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="inline-flex items-center gap-[6px] text-[15px] font-medium text-white hover:text-white/80 transition-colors whitespace-nowrap"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {link.label}
                {link.external && (
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-50">
                    <path d="M7 17L17 7" /><path d="M7 7h10v10" />
                  </svg>
                )}
              </a>
            ))}
          </div>

          {/* CTA pill */}
          <a
            href="/get-involved"
            className="flex items-center justify-center py-[18px] px-[50px] rounded-full text-[15px] font-bold text-white whitespace-nowrap hover:scale-[1.03] hover:opacity-90 transition-all"
            style={{
              fontFamily: "var(--font-display)",
              backgroundImage: "linear-gradient(129deg, #01833F 2%, #FECE00 100%)",
            }}
          >
            Get Involved
          </a>
        </div>

        {/* Mobile navbar */}
        <div className="flex md:hidden items-center justify-between h-[56px] rounded-full bg-white/[0.28] backdrop-blur-xl px-5">
          {/* Logo */}
          <a href="/" className="shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logoSrc}
              alt="Superteam Australia"
              className="h-[28px] w-auto transition-opacity duration-300"
            />
          </a>

          {/* Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`p-2 -mr-1 transition-colors duration-300 ${isDark ? "text-white" : "text-[#1E2C1C]"}`}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="md:hidden fixed inset-0 top-[72px] z-40"
            style={{ backgroundColor: "rgba(10, 32, 16, 0.97)" }}
          >
            <div className="px-6 py-10 flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, type: "spring", stiffness: 300, damping: 30 }}
                  className="inline-flex items-center gap-2 text-[28px] font-medium text-white/90 hover:text-white py-3 transition-colors"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {link.label}
                  {link.external && (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-50">
                      <path d="M7 17L17 7" /><path d="M7 7h10v10" />
                    </svg>
                  )}
                </motion.a>
              ))}
              <motion.a
                href="/get-involved"
                onClick={() => setMobileOpen(false)}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 300, damping: 30 }}
                className="mt-8 flex items-center justify-center h-[56px] rounded-full text-[16px] font-bold text-white"
                style={{
                  fontFamily: "var(--font-display)",
                  backgroundImage: "linear-gradient(129deg, #01833F 2%, #FECE00 100%)",
                }}
              >
                Get Involved
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
