"use client";

import { useEffect, useState } from "react";
import { Menu, X, Phone, Clock, ChevronRight } from "lucide-react";

const NAV_LINKS = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Services", href: "#services" },
  { label: "Get help", href: "#support" },
  { label: "About", href: "#about" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Support utility bar */}
      <aside
        aria-label="Support contacts"
        className="bg-[#0c294c] px-4 py-2 text-xs font-medium text-white animate-slide-down sm:px-6"
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-center gap-4 sm:justify-between lg:px-2">
          <div className="hidden items-center gap-2 text-white/75 sm:flex">
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#d6ad0c] text-[#0c294c]">
              <Clock className="h-3 w-3" strokeWidth={2.25} />
            </span>
            <span>
              <strong className="font-semibold text-white">Support centre</strong>
              <span className="mx-1.5 text-white/40">·</span>
              Mon – Fri, 8:00 – 18:00
            </span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="hidden uppercase tracking-wider text-white/50 lg:inline">
              Call us
            </span>
            <a
              href="tel:0550377388"
              className="inline-flex min-h-8 items-center gap-1.5 rounded-full border border-white/20 px-3 font-semibold text-white transition-colors hover:border-[#d6ad0c] hover:bg-[#d6ad0c] hover:text-[#0c294c]"
            >
              <Phone className="h-3.5 w-3.5" />
              055 037 7388
            </a>
            <a
              href="tel:0599525926"
              className="inline-flex min-h-8 items-center gap-1.5 rounded-full border border-white/20 px-3 font-semibold text-white transition-colors hover:border-[#d6ad0c] hover:bg-[#d6ad0c] hover:text-[#0c294c]"
            >
              <Phone className="h-3.5 w-3.5" />
              059 952 5926
            </a>
          </div>
        </div>
      </aside>

      {/* Main navigation bar */}
      <header
        className={`sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-md transition-shadow duration-300 ${
          scrolled ? "shadow-md" : ""
        }`}
      >
        <div className="mx-auto flex min-h-20 max-w-[1400px] items-center justify-between gap-6 px-4 sm:min-h-24 sm:px-6 lg:px-8">
          {/* Logo */}
          <a
            href="#top"
            aria-label="Placement Portal home"
            className="flex min-w-0 items-center gap-3 py-3"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-[#0c294c] text-[#f4d84c]">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-7 w-7"
                aria-hidden="true"
              >
                <path
                  d="M12 3 1 9l11 6 9-4.91V17h2V9L12 3z"
                  fill="currentColor"
                />
                <path
                  d="M5 13.18v3.82c0 1.66 3.13 3 7 3s7-1.34 7-3v-3.82l-7 3.82-7-3.82z"
                  fill="currentColor"
                  opacity="0.7"
                />
              </svg>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-base font-extrabold tracking-tight text-[#0c294c] sm:text-lg">
                Placement Portal
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#0f6136] sm:text-[11px]">
                Smart · Fair · Transparent
              </span>
            </div>
          </a>

          {/* Desktop nav */}
          <nav
            className="hidden items-center gap-1 sm:gap-2 md:flex"
            aria-label="Main navigation"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="inline-flex min-h-11 items-center rounded-full px-4 py-2.5 text-sm font-semibold text-slate-600 transition-colors hover:bg-[#f3f7f4] hover:text-[#0f6136]"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#portal-section"
              className="ml-1 inline-flex min-h-11 items-center justify-center rounded-full border border-[#0f6136] bg-[#0f6136] px-5 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:border-[#0a4a28] hover:bg-[#0a4a28]"
            >
              Placement Services
              <ChevronRight className="ml-1 h-4 w-4" />
            </a>
          </nav>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 text-[#0c294c] transition-colors hover:bg-slate-50 md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile drawer */}
        {open && (
          <div className="border-t border-slate-200 bg-white md:hidden">
            <nav
              className="mx-auto flex max-w-[1400px] flex-col gap-1 px-4 py-4"
              aria-label="Mobile navigation"
            >
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="inline-flex min-h-11 items-center rounded-md px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-[#f3f7f4] hover:text-[#0f6136]"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#portal-section"
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex min-h-12 items-center justify-center rounded-full border border-[#0f6136] bg-[#0f6136] px-5 py-2.5 text-center text-sm font-semibold text-white"
              >
                Placement Services
                <ChevronRight className="ml-1 h-4 w-4" />
              </a>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
