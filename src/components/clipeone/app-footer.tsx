"use client";

import { Mail, Phone, MapPin, ChevronRight } from "lucide-react";

const FOOTER_COLUMNS = [
  {
    title: "Platform",
    links: [
      "My Applications",
      "Explore Categories",
      "Pricing",
      "Integrations",
      "What's New",
    ],
  },
  {
    title: "Solutions",
    links: [
      "Government",
      "Business",
      "Education",
      "Health",
      "Finance",
      "Hospitality",
    ],
  },
  {
    title: "Resources",
    links: [
      "Documentation",
      "API Reference",
      "Help Centre",
      "Community",
      "Status",
    ],
  },
  {
    title: "Company",
    links: ["About ClipeOne", "Careers", "Partners", "Contact", "Blog"],
  },
];

export function AppFooter() {
  return (
    <footer className="mt-6 border-t border-[#e5e7eb] bg-white">
      {/* Main */}
      <div className="mx-auto max-w-[1440px] px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6 lg:gap-10">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-2">
            <a href="#" className="flex items-center gap-2.5" aria-label="ClipeOne home">
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
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-[#6b7280]">
              The unified platform to discover, subscribe, and manage every
              software application your organization needs.
            </p>

            <ul className="mt-5 flex flex-col gap-2 text-sm text-[#6b7280]">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-[#e31e24]" />
                support@clipeone.com
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-[#e31e24]" />
                +233 30 123 4567
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[#e31e24]" />
                Accra · Lagos · Nairobi
              </li>
            </ul>
          </div>

          {/* Link columns */}
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title}>
              <p className="text-xs font-bold uppercase tracking-wider text-[#9ca3af]">
                {col.title}
              </p>
              <ul className="mt-4 flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="group inline-flex items-center gap-1 text-sm text-[#6b7280] transition-colors hover:text-[#e31e24]"
                    >
                      <ChevronRight className="h-3 w-3 text-[#e31e24] opacity-0 transition-opacity group-hover:opacity-100" />
                      <span className="-ml-1 transition-all group-hover:ml-0">
                        {link}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#e5e7eb] bg-[#f8fafc]">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-3 px-4 py-5 text-xs text-[#6b7280] sm:flex-row sm:px-6 lg:px-8">
          <p>© 2025 ClipeOne. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="transition-colors hover:text-[#e31e24]">
              Privacy Policy
            </a>
            <a href="#" className="transition-colors hover:text-[#e31e24]">
              Terms of Service
            </a>
            <a href="#" className="transition-colors hover:text-[#e31e24]">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
