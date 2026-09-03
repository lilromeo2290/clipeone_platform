"use client";

import { Search, Menu, X } from "lucide-react";
import { useState } from "react";

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
          <span className="flex h-10 w-10 items-center justify-center rounded-md bg-gradient-to-br from-[#0a1f3d] to-[#1e3a8a] text-white">
            <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
              <path
                d="M12 2 3 7v10l9 5 9-5V7l-9-5Z"
                stroke="#e31e24"
                strokeWidth="2"
                strokeLinejoin="round"
                fill="rgba(227,30,36,0.15)"
              />
              <path
                d="M8.5 10.5a3.5 3.5 0 1 1 0 3"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
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

        {/* Right actions — mobile menu toggle only */}
        <div className="ml-auto flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-[#6b7280] transition-colors hover:bg-[#f3f4f6] md:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile search drawer */}
      {mobileOpen && (
        <div className="border-t border-[#e5e7eb] bg-white px-4 py-3 md:hidden">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9ca3af]" />
            <input
              type="search"
              placeholder="Search applications..."
              aria-label="Search"
              className="h-10 w-full rounded-full bg-[#f3f4f6] pl-10 pr-4 text-sm outline-none"
            />
          </div>
        </div>
      )}
    </header>
  );
}
