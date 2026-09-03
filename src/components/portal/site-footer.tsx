"use client";

import { Phone, MapPin, FileText, BookOpen, ChevronRight } from "lucide-react";

const FOOTER_LINKS = [
  {
    title: "Portal",
    links: [
      "Check Placement",
      "Self Placement",
      "Re Entry",
      "Foreign Placement",
    ],
  },
  {
    title: "How It Works",
    links: [
      "Check Placement",
      "Self-Placement",
      "Choice Confirmation",
      "Edit Choices",
      "Re-entry",
      "Foreign Student",
    ],
  },
  {
    title: "FAQs",
    links: [
      "Not placed in any school",
      "Change after placement",
      "Index number not found",
      "Foreign student application",
      "Cycle dates",
    ],
  },
];

const PARTNERS = [
  "Ministry of Education",
  "Ghana Education Service",
  "TVET Service",
  "Free SHS Secretariat",
];

const RESOURCES = [
  { label: "Candidate User Manual", icon: BookOpen },
  { label: "Placement & Selection Guide (PDF)", icon: FileText },
];

export function SiteFooter() {
  return (
    <footer className="bg-[#08203d] text-white">
      {/* Support lines strip */}
      <div className="border-b border-white/10">
        <div className="mx-auto flex max-w-[1400px] flex-col items-start gap-4 px-4 py-8 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#f4d84c]">
              Support lines
            </p>
            <p className="mt-1 text-sm text-white/70">
              Mon – Fri, 8:00 – 18:00. Live chat available 24/7.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href="tel:0550377388"
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/20 px-5 font-bold text-white transition-colors hover:border-[#d6ad0c] hover:bg-[#d6ad0c] hover:text-[#0c294c]"
            >
              <Phone className="h-4 w-4" />
              055 037 7388
            </a>
            <a
              href="tel:0599525926"
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/20 px-5 font-bold text-white transition-colors hover:border-[#d6ad0c] hover:bg-[#d6ad0c] hover:text-[#0c294c]"
            >
              <Phone className="h-4 w-4" />
              059 952 5926
            </a>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="mx-auto max-w-[1400px] px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-2">
            <a href="#top" className="flex items-center gap-3" aria-label="Home">
              <div className="flex h-12 w-12 items-center justify-center rounded-md bg-[#0c294c] text-[#f4d84c] ring-1 ring-white/10">
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
                <span className="text-base font-extrabold tracking-tight">
                  Placement Portal
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#f4d84c]">
                  Smart · Fair · Transparent
                </span>
              </div>
            </a>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-white/70">
              The official computerized placement platform matching junior high
              school graduates with senior high schools and TVET institutions.
            </p>

            <div className="mt-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-white/50">
                Partner institutions
              </p>
              <ul className="mt-3 grid grid-cols-2 gap-2">
                {PARTNERS.map((p) => (
                  <li
                    key={p}
                    className="flex items-center gap-2 text-sm text-white/75"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-[#d6ad0c]" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Link groups */}
          {FOOTER_LINKS.map((group) => (
            <div key={group.title}>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#f4d84c]">
                {group.title}
              </p>
              <ul className="mt-4 flex flex-col gap-2.5">
                {group.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#portal-section"
                      className="group inline-flex items-center gap-1 text-sm text-white/75 transition-colors hover:text-white"
                    >
                      <ChevronRight className="h-3.5 w-3.5 text-[#d6ad0c] opacity-0 transition-opacity group-hover:opacity-100" />
                      <span className="-ml-1 group-hover:ml-0 transition-all">
                        {link}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Resources row */}
        <div className="mt-10 border-t border-white/10 pt-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-white/50">
                Resources
              </p>
              <div className="mt-3 flex flex-wrap gap-3">
                {RESOURCES.map((r) => (
                  <a
                    key={r.label}
                    href="#"
                    className="inline-flex min-h-10 items-center gap-2 rounded-md border border-white/15 bg-white/5 px-4 text-sm font-medium text-white transition-colors hover:border-[#d6ad0c]/50 hover:bg-white/10"
                  >
                    <r.icon className="h-4 w-4 text-[#d6ad0c]" />
                    {r.label}
                  </a>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-white/60">
              <MapPin className="h-4 w-4 text-[#d6ad0c]" />
              <span>Accra, Ghana · Online</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 bg-[#06162b]">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-white/55 sm:flex-row sm:px-6 lg:px-8">
          <p>© 2026 Placement Portal. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            <span className="inline-flex h-2 w-2 animate-pulse rounded-full bg-[#0f6136]" />
            Portal online
            <span className="mx-2 text-white/20">·</span>
            Built with care
          </p>
        </div>
      </div>
    </footer>
  );
}
