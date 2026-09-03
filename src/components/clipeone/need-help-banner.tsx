"use client";

import { Headphones, ArrowRight, Mail, Phone } from "lucide-react";

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
          <p className="mt-1 text-center text-[11px] text-white/55 lg:text-right">
            024 978 3637 · 053 539 9562
          </p>
        </div>
      </div>
    </section>
  );
}
