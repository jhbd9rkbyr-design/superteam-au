import { ArrowUpRight } from "lucide-react";

const footerLinks = {
  navigate: [
    { label: "Events", href: "#events" },
    { label: "Members", href: "#community" },
    { label: "Opportunities", href: "https://superteam.fun/earn/s/superteamaustralia", external: true },
    { label: "Get Involved", href: "#get-involved" },
  ],
};

// Social platforms with inline SVG icons
const socials = [
  {
    label: "Twitter / X",
    href: "https://twitter.com/SuperteamAU",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "Discord",
    href: "#",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
      </svg>
    ),
  },
  {
    label: "Telegram",
    href: "#",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "#",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

export function Footer() {
  return (
    <footer className="bg-dark-green relative overflow-hidden">
      {/* Gradient top border */}
      <div className="h-[2px] bg-gradient-brand-diagonal" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto_auto] gap-y-10 gap-x-16">
          {/* Brand column — actual logo */}
          <div className="md:col-auto">

            <a href="/" className="inline-block mb-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/ST Aus White.png"
                alt="Superteam Australia"
                className="h-[40px] w-auto"
              />
            </a>
            <p
              className="text-white/50 text-sm leading-relaxed max-w-xs"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Accelerating builders on Solana in Australia. Part of the global
              Superteam network.
            </p>
            <a
              href="https://superteam.fun"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-brand-gold text-sm font-medium mt-4 hover:opacity-80 transition-opacity"
            >
              superteam.fun
              <ArrowUpRight size={14} />
            </a>
          </div>

          {/* Navigate */}
          <div className="md:col-auto">

            <h4
              className="text-white/30 text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Navigate
            </h4>
            <ul className="space-y-3">
              {footerLinks.navigate.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="text-white/60 text-sm hover:text-white transition-colors inline-flex items-center gap-1"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    {link.label}
                    {link.external && <ArrowUpRight size={12} className="opacity-50" />}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect — pill buttons with icons */}
          <div className="md:col-auto">

            <h4
              className="text-white/30 text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Connect
            </h4>
            <div className="flex flex-col gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-medium text-white/70 border border-white/10 bg-white/[0.04] hover:bg-white/[0.1] hover:text-white hover:border-white/20 transition-all duration-200 w-fit"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {s.icon}
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Legal */}
          <div className="md:col-auto">

            <h4
              className="text-white/30 text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Legal
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="/terms"
                  className="text-white/60 text-sm hover:text-white transition-colors"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  Terms of Use
                </a>
              </li>
              <li>
                <a
                  href="/privacy"
                  className="text-white/60 text-sm hover:text-white transition-colors"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  Privacy Notice
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/30 text-xs">
            &copy; {new Date().getFullYear()} Superteam Australia.
          </p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/powered.png"
            alt="Powered by Solana"
            className="h-[20px] w-auto opacity-50"
          />
        </div>
      </div>
    </footer>
  );
}
