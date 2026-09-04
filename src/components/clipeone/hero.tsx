"use client";

import { ArrowRight, Play, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

interface Slide {
  label: string;
  title: React.ReactNode;
  sub: string;
  primary: string;
  secondary: string;
  image: {
    src: string;
    alt: string;
    captionTitle: string;
    captionSub: string;
    badge: string;
  };
}

const SLIDES: Slide[] = [
  {
    label: "Welcome to",
    title: (
      <>
        ClipeOne <span className="text-white">Platform</span>
      </>
    ),
    sub: "One powerful platform to discover, subscribe, and use the best software solutions for your organization or business.",
    primary: "Explore Websites & Platforms",
    secondary: "How It Works",
    image: {
      src: "/clipeone/hero-image.png",
      alt: "Clipe Consult headquarters — modern corporate office building",
      captionTitle: "Clipe Consult · Head Office",
      captionSub: "Home of the ClipeOne Platform",
      badge: "HQ",
    },
  },
  {
    label: "Discover",
    title: (
      <>
        Everything <span className="text-white">in one place</span>
      </>
    ),
    sub: "From government revenue tools to HR, accounting, school and inventory apps — manage every subscription from a single dashboard.",
    primary: "Browse Categories",
    secondary: "Watch Demo",
    image: {
      src: "/clipeone/hero-monitor.png",
      alt: "Code editor building a Clipe Consult website in real time",
      captionTitle: "Built by Developers",
      captionSub: "Real code, live preview, ship in minutes",
      badge: "DEV",
    },
  },
  {
    label: "Deployed",
    title: (
      <>
        Powering <span className="text-white">real assemblies</span>
      </>
    ),
    sub: "From metropolitan to municipal and district assemblies, ClipeGov RMS is in production today — collecting revenue, serving citizens, and running 24/7.",
    primary: "See Live Deployment",
    secondary: "Case Studies",
    image: {
      src: "/clipeone/hero-screenshot.png",
      alt: "ClipeGov RMS login screen deployed for Kpando Municipal Assembly",
      captionTitle: "Kpando Municipal Assembly",
      captionSub: "Live ClipeGov RMS deployment · V1.0",
      badge: "LIVE",
    },
  },
  {
    label: "Visit us",
    title: (
      <>
        Welcome to <span className="text-white">Clipe Consult</span>
      </>
    ),
    sub: "IT Solutions for a Smarter Tomorrow. Step into our office — where Technology, People, and Better Lives come together to power every product we build.",
    primary: "Get Directions",
    secondary: "Office Hours",
    image: {
      src: "/clipeone/hero-dashboard.png",
      alt: "Clipe Consult office reception area with welcome signage and tagline",
      captionTitle: "Clipe Consult · Reception",
      captionSub: "Technology · People · Better Lives",
      badge: "VISIT",
    },
  },
  {
    label: "Trusted",
    title: (
      <>
        Secure by <span className="text-white">default</span>
      </>
    ),
    sub: "Enterprise-grade encryption, role-based access, and 24/7 monitoring keep your data safe across every ClipeOne application.",
    primary: "Security Overview",
    secondary: "Compliance",
    image: {
      src: "/clipeone/hero-monitor.png",
      alt: "Code editor showing the secure ClipeOne codebase",
      captionTitle: "Engineered for Trust",
      captionSub: "Audited code, monitored 24/7",
      badge: "SEC",
    },
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

          {/* Right hero image — synced to active slide */}
          <div className="lg:col-span-5 animate-fade-in">
            <HeroImage slide={slide} active={active} />
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroImage({ slide, active }: { slide: Slide; active: number }) {
  return (
    <div className="relative mx-auto max-w-md lg:max-w-none">
      {/* Glow */}
      <div className="absolute inset-0 -z-10 translate-y-6 scale-95 rounded-[2rem] bg-[#e31e24]/25 blur-3xl" />

      {/* Framed image card */}
      <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-[#0a1f3d] p-2 shadow-2xl shadow-black/40">
        {/* Top accent bar */}
        <div className="absolute left-1/2 top-0 z-20 h-1 w-24 -translate-x-1/2 rounded-b-full bg-gradient-to-r from-transparent via-[#e31e24] to-transparent" />

        <div className="relative overflow-hidden rounded-xl">
          {/* Stacked images — crossfade between slides */}
          {SLIDES.map((s, idx) => (
            <img
              key={idx}
              src={s.image.src}
              alt={s.image.alt}
              width={1536}
              height={1024}
              draggable={false}
              className={`block w-full select-none object-cover aspect-[3/2] transition-opacity duration-700 ${
                idx === active ? "opacity-100" : "absolute inset-0 opacity-0"
              }`}
            />
          ))}

          {/* Subtle navy tint at edges to blend with hero bg */}
          <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#0a1f3d]/40 to-transparent" />

          {/* Corner badge — logo + name */}
          <div className="absolute left-3 top-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-[#0a1f3d]/70 px-3 py-1.5 backdrop-blur-md">
            <img
              src="/clipeone/logo.png"
              alt=""
              width={20}
              height={20}
              className="h-5 w-5 rounded object-cover"
            />
            <span className="text-xs font-extrabold tracking-tight text-white">
              <span className="text-white">CLIPE</span>
              <span className="text-[#e31e24]">ONE</span>
            </span>
          </div>

          {/* Bottom caption — keyed to active slide so it crossfades */}
          <div
            key={active}
            className="absolute inset-x-3 bottom-3 flex animate-fade-in items-center justify-between gap-3 rounded-lg border border-white/10 bg-[#0a1f3d]/70 px-3 py-2 backdrop-blur-md"
          >
            <div className="min-w-0">
              <p className="truncate text-xs font-bold text-white">
                {slide.image.captionTitle}
              </p>
              <p className="truncate text-[10px] text-white/70">
                {slide.image.captionSub}
              </p>
            </div>
            <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-[#e31e24] px-2.5 py-1 text-[10px] font-bold text-white">
              <span className="h-1.5 w-1.5 rounded-full bg-white" />
              {slide.image.badge}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
