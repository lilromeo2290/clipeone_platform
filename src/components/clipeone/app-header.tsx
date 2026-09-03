"use client";

import { Search, Menu, X, Phone, MessageCircle } from "lucide-react";
import { useState } from "react";

const PHONE_1 = "024 978 3637";
const PHONE_2 = "053 539 9562";

// Strip non-digits for tel: / wa.me links
const telHref = (num: string) => `tel:+233${num.replace(/\D/g, "").replace(/^0/, "")}`;
const waHref = (num: string) =>
  `https://wa.me/233${num.replace(/\D/g, "").replace(/^0/, "")}`;

export function AppHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-[#e5e7eb] bg-white">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center gap-4 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <a
          href="#"
          aria-label="ClipeOne home"
          className="flex shrink-0 items-center gap-2.5"
        >
          <img
            src="/clipeone/logo.png"
            alt="ClipeOne logo"
            width={40}
            height={40}
            className="h-10 w-10 rounded-md object-cover"
          />
          <span className="flex flex-col leading-none">
            <span className="text-lg font-extrabold tracking-tight">
              <span className="text-[#0a1f3d]">CLIPE</span>
              <span className="text-[#e31e24]">ONE</span>
            </span>
            <span className="mt-0.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#6b7280]">
              One Platform. Every Solution.
            </span>
          </span>
        </a>

        {/* Search bar */}
        <div className="relative hidden flex-1 max-w-[520px] md:block">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9ca3af]" />
          <input
            type="search"
            placeholder="Search for applications, features, solutions..."
            aria-label="Search"
            className="h-10 w-full rounded-full border border-transparent bg-[#f3f4f6] pl-10 pr-4 text-sm text-[#111827] placeholder:text-[#9ca3af] outline-none transition-colors focus:border-[#e31e24]/40 focus:bg-white focus:ring-2 focus:ring-[#e31e24]/10"
          />
        </div>

        {/* Right actions — Call / WhatsApp + mobile toggle */}
        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <div className="hidden items-stretch gap-2 md:flex">
            {/* Phone 1 — Call + WhatsApp */}
            <div className="flex items-center gap-1 rounded-full border border-[#e5e7eb] bg-white p-1 transition-colors hover:border-[#0a1f3d]/20">
              <a
                href={telHref(PHONE_1)}
                aria-label={`Call ${PHONE_1}`}
                className="inline-flex h-8 items-center gap-1.5 rounded-full bg-[#0a1f3d] px-3 text-xs font-bold text-white transition-colors hover:bg-[#1e3a8a]"
              >
                <Phone className="h-3.5 w-3.5" />
                Call
              </a>
              <a
                href={waHref(PHONE_1)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`WhatsApp ${PHONE_1}`}
                className="inline-flex h-8 items-center gap-1.5 rounded-full bg-[#25D366] px-3 text-xs font-bold text-white transition-colors hover:bg-[#1ebe57]"
              >
                <MessageCircle className="h-3.5 w-3.5" />
                {PHONE_1}
              </a>
            </div>

            {/* Phone 2 — Call + WhatsApp */}
            <div className="flex items-center gap-1 rounded-full border border-[#e5e7eb] bg-white p-1 transition-colors hover:border-[#0a1f3d]/20">
              <a
                href={telHref(PHONE_2)}
                aria-label={`Call ${PHONE_2}`}
                className="inline-flex h-8 items-center gap-1.5 rounded-full bg-[#0a1f3d] px-3 text-xs font-bold text-white transition-colors hover:bg-[#1e3a8a]"
              >
                <Phone className="h-3.5 w-3.5" />
                Call
              </a>
              <a
                href={waHref(PHONE_2)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`WhatsApp ${PHONE_2}`}
                className="inline-flex h-8 items-center gap-1.5 rounded-full bg-[#25D366] px-3 text-xs font-bold text-white transition-colors hover:bg-[#1ebe57]"
              >
                <MessageCircle className="h-3.5 w-3.5" />
                {PHONE_2}
              </a>
            </div>
          </div>

          {/* Compact phone actions for tablet */}
          <div className="hidden items-center gap-1.5 sm:flex md:hidden">
            <a
              href={telHref(PHONE_1)}
              aria-label={`Call ${PHONE_1}`}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#0a1f3d] text-white transition-colors hover:bg-[#1e3a8a]"
            >
              <Phone className="h-4 w-4" />
            </a>
            <a
              href={waHref(PHONE_1)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`WhatsApp ${PHONE_1}`}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#25D366] text-white transition-colors hover:bg-[#1ebe57]"
            >
              <MessageCircle className="h-4 w-4" />
            </a>
            <a
              href={telHref(PHONE_2)}
              aria-label={`Call ${PHONE_2}`}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#0a1f3d] text-white transition-colors hover:bg-[#1e3a8a]"
            >
              <Phone className="h-4 w-4" />
            </a>
            <a
              href={waHref(PHONE_2)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`WhatsApp ${PHONE_2}`}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#25D366] text-white transition-colors hover:bg-[#1ebe57]"
            >
              <MessageCircle className="h-4 w-4" />
            </a>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-[#6b7280] transition-colors hover:bg-[#f3f4f6] sm:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer — search + call / WhatsApp */}
      {mobileOpen && (
        <div className="border-t border-[#e5e7eb] bg-white px-4 py-3 sm:hidden">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9ca3af]" />
            <input
              type="search"
              placeholder="Search applications..."
              aria-label="Search"
              className="h-10 w-full rounded-full bg-[#f3f4f6] pl-10 pr-4 text-sm outline-none"
            />
          </div>
          <div className="mt-3 flex flex-col gap-2">
            <p className="px-1 text-[10px] font-bold uppercase tracking-wider text-[#9ca3af]">
              Call / WhatsApp us
            </p>
            {[PHONE_1, PHONE_2].map((num) => (
              <div
                key={num}
                className="flex items-center gap-1.5"
              >
                <a
                  href={telHref(num)}
                  aria-label={`Call ${num}`}
                  className="inline-flex h-9 flex-1 items-center justify-center gap-1.5 rounded-full bg-[#0a1f3d] text-xs font-bold text-white"
                >
                  <Phone className="h-3.5 w-3.5" />
                  Call {num}
                </a>
                <a
                  href={waHref(num)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`WhatsApp ${num}`}
                  className="inline-flex h-9 flex-1 items-center justify-center gap-1.5 rounded-full bg-[#25D366] text-xs font-bold text-white"
                >
                  <MessageCircle className="h-3.5 w-3.5" />
                  WhatsApp
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
