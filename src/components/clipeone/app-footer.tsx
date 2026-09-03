"use client";

import { Mail, MapPin, Phone } from "lucide-react";

export function AppFooter() {
  return (
    <footer className="mt-6 border-t border-[#e5e7eb] bg-white">
      <div className="mx-auto max-w-[1440px] px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6 text-center lg:flex-row lg:items-start lg:justify-between lg:text-left">
          {/* Brand */}
          <div className="flex flex-col items-center gap-3 lg:items-start">
            <a
              href="#"
              className="flex items-center gap-2.5"
              aria-label="ClipeOne home"
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
            <p className="max-w-xs text-sm leading-relaxed text-[#6b7280]">
              The unified platform to discover, subscribe, and manage every
              software application your organization needs.
            </p>
          </div>

          {/* Contact */}
          <ul className="flex flex-col gap-2 text-sm text-[#6b7280] lg:items-end lg:text-right">
            <li className="flex items-center gap-2 lg:flex-row-reverse">
              <Mail className="h-4 w-4 text-[#e31e24]" />
              support@clipeone.com
            </li>
            <li className="flex items-center gap-2 lg:flex-row-reverse">
              <Phone className="h-4 w-4 text-[#e31e24]" />
              +233 24 978 3736
            </li>
            <li className="flex items-center gap-2 lg:flex-row-reverse">
              <MapPin className="h-4 w-4 text-[#e31e24]" />
              Ho · Volta Region · Ghana
            </li>
          </ul>
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
