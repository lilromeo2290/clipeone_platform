"use client";

import { Headphones, ArrowRight, Mail, Phone, MapPin } from "lucide-react";

export function NeedHelpBanner() {
  return (
    <section className="relative overflow-hidden rounded-xl bg-[#0a1f3d] shadow-soft-lg">
      {/* Background layers */}
      <div className="absolute inset-0 hero-stars opacity-50" />
      <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-[#e31e24]/20 blur-3xl" />
      <div className="absolute -bottom-32 -left-24 h-64 w-64 rounded-full bg-[#1e3a8a]/40 blur-3xl" />

      <div className="relative grid grid-cols-1 items-center gap-6 p-6 sm:p-8 lg:grid-cols-12 lg:gap-8 lg:p-10">
        {/* Left: icon + copy */}
        <div className="lg:col-span-7">
          <div className="flex items-start gap-4">
            <span className="hidden h-16 w-16 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/5 sm:flex">
              <Headphones className="h-8 w-8 text-white" />
            </span>
            <div className="flex flex-col gap-2">
              <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#f4d84c]">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#059669]" />
                Support online · 24/7
              </span>
              <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                Need Help?
              </h2>
              <p className="max-w-xl text-sm leading-relaxed text-white/75 sm:text-base">
                Our support team is ready to assist you with any question, any
                time. Reach out by phone, WhatsApp, or create a ticket — we
                typically respond in under five minutes during working hours.
              </p>
            </div>
          </div>
        </div>

        {/* Right: CTAs */}
        <div className="flex flex-col gap-2.5 lg:col-span-5">
          <button
            type="button"
            className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-white px-5 text-sm font-bold text-[#0a1f3d] transition-colors hover:bg-[#f3f4f6]"
          >
            Create Support Ticket
            <ArrowRight className="h-4 w-4" />
          </button>
          <div className="grid grid-cols-2 gap-2.5">
            <a
              href="tel:+233249783637"
              className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-md border border-white/20 bg-white/5 px-3 text-sm font-bold text-white transition-colors hover:border-[#d6ad0c] hover:bg-[#d6ad0c] hover:text-[#0a1f3d]"
            >
              <Phone className="h-4 w-4" />
              Call
            </a>
            <a
              href="https://wa.me/233249783637"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-md border border-white/20 bg-white/5 px-3 text-sm font-bold text-white transition-colors hover:border-[#25D366] hover:bg-[#25D366]"
            >
              <Mail className="h-4 w-4" />
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Contact write-up bar */}
      <div className="relative border-t border-white/10 bg-[#061528]/60 px-6 py-4 sm:px-8 lg:px-10">
        <div className="flex flex-col items-center gap-3 text-sm text-white/80 sm:flex-row sm:items-center sm:justify-center sm:gap-6 lg:gap-8">
          <a
            href="mailto:support@clipeone.com"
            className="inline-flex items-center gap-2 transition-colors hover:text-white"
          >
            <Mail className="h-4 w-4 text-[#e31e24]" />
            support@clipeone.com
          </a>
          <span className="hidden h-4 w-px bg-white/15 sm:inline-block" />
          <a
            href="tel:+233249783637"
            className="inline-flex items-center gap-2 transition-colors hover:text-white"
          >
            <Phone className="h-4 w-4 text-[#e31e24]" />
            +233 24 978 3736
          </a>
          <span className="hidden h-4 w-px bg-white/15 sm:inline-block" />
          <span className="inline-flex items-center gap-2">
            <MapPin className="h-4 w-4 text-[#e31e24]" />
            Ho · Volta Region · Ghana
          </span>
        </div>
      </div>
    </section>
  );
}

