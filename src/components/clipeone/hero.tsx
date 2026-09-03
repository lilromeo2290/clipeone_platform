"use client";

import { ArrowRight, Play, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const SLIDES = [
  {
    label: "Welcome to",
    title: <>ClipeOne <span className="text-white">Platform</span></>,
    sub: "One powerful platform to discover, subscribe, and use the best software solutions for your organization or business.",
    primary: "Explore Applications",
    secondary: "How It Works",
  },
  {
    label: "Discover",
    title: <>Everything <span className="text-white">in one place</span></>,
    sub: "From government revenue tools to HR, accounting, school and inventory apps — manage every subscription from a single dashboard.",
    primary: "Browse Categories",
    secondary: "Watch Demo",
  },
  {
    label: "Scale",
    title: <>Built to <span className="text-white">grow with you</span></>,
    sub: "Add users, switch plans, and integrate new applications as your organization expands. No hidden costs, no lock-in.",
    primary: "View Plans",
    secondary: "Talk to Sales",
  },
  {
    label: "Trusted",
    title: <>Secure by <span className="text-white">default</span></>,
    sub: "Enterprise-grade encryption, role-based access, and 24/7 monitoring keep your data safe across every ClipeOne application.",
    primary: "Security Overview",
    secondary: "Compliance",
  },
];

export function Hero() {
  const [active, setActive] = useState(0);
  const slide = SLIDES[active];

  const go = (dir: 1 | -1) => {
    setActive((cur) => (cur + dir + SLIDES.length) % SLIDES.length);
  };

  return (
    <section className="relative overflow-hidden bg-[#0a1f3d]">
      {/* Gradient + star pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#061528] via-[#0a1f3d] to-[#0a1f3d]" />
      <div className="absolute inset-0 hero-stars opacity-70" />
      <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-[#e31e24]/15 blur-3xl" />
      <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-[#1e3a8a]/30 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-[1440px] px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-8">
          {/* Left copy */}
          <div className="lg:col-span-7 animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white/80">
              {slide.label} ClipeOne
            </span>

            <h1 className="mt-5 text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-[3.4rem]">
              <span className="text-[#e31e24]">{slide.title}</span>
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
              {slide.sub}
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="#explore"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-[#e31e24] px-6 font-bold text-white shadow-lg shadow-[#e31e24]/30 transition-all hover:bg-[#b9141a] hover:shadow-[#e31e24]/40"
              >
                {slide.primary}
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-white/30 px-6 font-semibold text-white transition-colors hover:bg-white/5"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/15">
                  <Play className="h-3 w-3 fill-white text-white" />
                </span>
                {slide.secondary}
              </a>
            </div>

            {/* Pagination + arrows */}
            <div className="mt-8 flex items-center gap-4">
              <div className="flex items-center gap-2">
                {SLIDES.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    aria-label={`Go to slide ${idx + 1}`}
                    onClick={() => setActive(idx)}
                    className={`h-2 rounded-full transition-all ${
                      idx === active
                        ? "w-7 bg-[#e31e24]"
                        : "w-2 bg-white/30 hover:bg-white/50"
                    }`}
                  />
                ))}
              </div>
              <div className="ml-2 flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="Previous slide"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="Next slide"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Right laptop mockup */}
          <div className="lg:col-span-5 animate-fade-in">
            <LaptopMockup />
          </div>
        </div>
      </div>
    </section>
  );
}

function LaptopMockup() {
  return (
    <div className="relative mx-auto max-w-md lg:max-w-none">
      {/* Glow */}
      <div className="absolute inset-0 -z-10 translate-y-6 scale-95 rounded-[2rem] bg-[#e31e24]/20 blur-3xl" />

      {/* Laptop screen */}
      <div className="relative rounded-t-xl border border-white/10 bg-[#0a1f3d] p-3 shadow-2xl">
        <div className="overflow-hidden rounded-lg bg-white">
          {/* Browser bar */}
          <div className="flex items-center gap-1.5 border-b border-[#e5e7eb] bg-[#f8fafc] px-3 py-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#e31e24]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#f59e0b]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#059669]" />
            <span className="ml-2 h-5 flex-1 rounded-full bg-white" />
          </div>
          {/* Screen body */}
          <div className="relative flex h-56 flex-col items-center justify-center bg-gradient-to-br from-[#f8fafc] to-white px-6 sm:h-64">
            {/* Logo lockup */}
            <div className="flex flex-col items-center text-center">
              <img
                src="/clipeone/logo.png"
                alt="ClipeOne logo"
                width={72}
                height={72}
                className="h-16 w-16 rounded-xl object-cover shadow-lg sm:h-[4.5rem] sm:w-[4.5rem]"
              />
              <span className="mt-3 text-2xl font-extrabold tracking-tight">
                <span className="text-[#0a1f3d]">CLIPE</span>
                <span className="text-[#e31e24]">ONE</span>
              </span>
              <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#6b7280]">
                One Platform. Every Solution.
              </span>
            </div>

            {/* Red wave graphic */}
            <svg
              viewBox="0 0 400 60"
              preserveAspectRatio="none"
              className="absolute bottom-0 left-0 h-10 w-full text-[#e31e24]"
              aria-hidden="true"
            >
              <path
                d="M0,30 C50,60 100,0 150,30 C200,60 250,0 300,30 C350,60 400,10 400,30 L400,60 L0,60 Z"
                fill="currentColor"
                fillOpacity="0.15"
              />
              <path
                d="M0,40 C50,10 100,60 150,40 C200,10 250,60 300,40 C350,10 400,40 400,40 L400,60 L0,60 Z"
                fill="currentColor"
                fillOpacity="0.4"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Laptop base */}
      <div className="relative">
        <div className="h-2 rounded-b-xl bg-gradient-to-b from-[#1f2937] to-[#0a1f3d]" />
        <div className="mx-auto h-1.5 w-24 rounded-b-lg bg-[#1f2937]" />
        <div className="mx-auto h-1 w-44 rounded-b-md bg-[#0a1f3d]" />
      </div>
    </div>
  );
}
