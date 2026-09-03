"use client";

import { useState } from "react";
import {
  FileCheck2,
  Hand,
  ClipboardCheck,
  PencilLine,
  RotateCcw,
  Globe2,
  ChevronRight,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

type ServiceKey =
  | "check"
  | "self"
  | "confirm"
  | "edit"
  | "reentry"
  | "foreign";

interface Service {
  key: ServiceKey;
  title: string;
  blurb: string;
  icon: React.ReactNode;
  status: "Open" | "Closed";
  accent: string;
}

const SERVICES: Service[] = [
  {
    key: "check",
    title: "Check placement",
    blurb: "View your assigned school, programme, and placement documents.",
    icon: <FileCheck2 className="h-5 w-5" />,
    status: "Open",
    accent: "#0f6136",
  },
  {
    key: "self",
    title: "Self-placement",
    blurb: "If you are unplaced, choose a school and programme with space.",
    icon: <Hand className="h-5 w-5" />,
    status: "Open",
    accent: "#0f6136",
  },
  {
    key: "confirm",
    title: "Choices confirmation",
    blurb: "Review your school choices and confirm them when everything is correct.",
    icon: <ClipboardCheck className="h-5 w-5" />,
    status: "Closed",
    accent: "#0c294c",
  },
  {
    key: "edit",
    title: "Edit choices",
    blurb: "Correct or replace your school choices before you confirm them.",
    icon: <PencilLine className="h-5 w-5" />,
    status: "Closed",
    accent: "#0c294c",
  },
  {
    key: "reentry",
    title: "Re-entry",
    blurb: "Eligible previous-year candidates can register and apply again.",
    icon: <RotateCcw className="h-5 w-5" />,
    status: "Closed",
    accent: "#0c294c",
  },
  {
    key: "foreign",
    title: "Foreign student",
    blurb: "Apply with a foreign qualification and track your application status.",
    icon: <Globe2 className="h-5 w-5" />,
    status: "Open",
    accent: "#0f6136",
  },
];

export function Hero() {
  const [active, setActive] = useState<ServiceKey>("check");

  const activeService = SERVICES.find((s) => s.key === active)!;

  return (
    <section
      id="top"
      className="relative overflow-hidden bg-[#0c294c] py-12 sm:py-16 lg:py-20"
    >
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#08203d] via-[#0c294c] to-[#0c294c]" />
      <div className="absolute inset-0 hero-grid opacity-60" />
      <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-[#d6ad0c] opacity-10 blur-3xl" />
      <div className="absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-[#0f6136] opacity-30 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-8 xl:gap-12">
          {/* Left copy */}
          <div className="flex flex-col gap-6 text-center lg:col-span-5 lg:text-left">
            <span className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#f4d84c] animate-fade-up lg:mx-0">
              <Sparkles className="h-3.5 w-3.5" />
              2026 placement cycle now open
            </span>

            <h1
              className="text-4xl font-extrabold uppercase leading-[0.95] tracking-[-0.02em] text-white sm:text-6xl lg:text-6xl xl:text-7xl animate-fade-up"
              style={{ animationDelay: "0.1s" }}
            >
              2026 school{" "}
              <span className="text-[#f4d84c]">placement portal</span>
            </h1>

            <p
              className="mx-auto max-w-xl text-base leading-relaxed text-white/85 sm:text-lg lg:mx-0 animate-fade-up"
              style={{ animationDelay: "0.25s" }}
            >
              Smart, fair &amp; transparent placement for senior high school and
              TVET institutions. Check your status, confirm your choices, or
              self-place — all in one secure place.
            </p>

            <div
              className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start animate-fade-up"
              style={{ animationDelay: "0.4s" }}
            >
              <a
                href="#portal-section"
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#d6ad0c] px-6 font-bold text-[#0c294c] transition-all hover:bg-[#f4d84c] hover:shadow-lg hover:shadow-[#d6ad0c]/30 sm:w-auto"
              >
                Start placement check
                <ChevronRight className="h-4 w-4" />
              </a>
              <a
                href="#how-it-works"
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-white/25 px-6 font-semibold text-white transition-colors hover:bg-white/5 sm:w-auto"
              >
                See how it works
              </a>
            </div>

            <div
              className="flex flex-wrap items-center justify-center gap-6 pt-4 text-xs text-white/60 lg:justify-start animate-fade-up"
              style={{ animationDelay: "0.55s" }}
            >
              <span className="inline-flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-[#d6ad0c]" />
                Government-grade security
              </span>
              <span className="inline-flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-[#d6ad0c]" />
                24/7 online access
              </span>
            </div>
          </div>

          {/* Right: Portal access panel */}
          <div
            id="portal-section"
            className="lg:col-span-7 animate-fade-right"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="portal-glow relative overflow-hidden rounded-md border border-white/20 bg-white text-[#0c294c]">
              {/* Panel header */}
              <div className="border-b border-[#0c294c]/10 p-4 sm:p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex max-w-xl flex-col gap-2">
                    <h2 className="text-3xl font-light leading-tight tracking-tight text-[#0c294c] sm:text-4xl">
                      Choose a service
                    </h2>
                    <p
                      id="service-help"
                      className="text-sm leading-relaxed text-slate-500 sm:text-base"
                    >
                      Select a service below to begin. Each card opens a guided
                      form — your data is never shared.
                    </p>
                  </div>
                  <span
                    className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-md bg-[#d6ad0c] text-[#0c294c] sm:flex"
                    aria-hidden="true"
                  >
                    <ShieldCheck className="h-6 w-6" strokeWidth={2.5} />
                  </span>
                </div>
              </div>

              {/* Service cards grid */}
              <div className="bg-[#f7f7f4] p-4 sm:p-6">
                <div
                  className="grid grid-cols-1 gap-3 sm:grid-cols-2"
                  aria-label="Placement services"
                  aria-describedby="service-help"
                >
                  {SERVICES.map((svc) => {
                    const isActive = svc.key === active;
                    const isOpen = svc.status === "Open";
                    return (
                      <button
                        key={svc.key}
                        type="button"
                        onClick={() => setActive(svc.key)}
                        aria-pressed={isActive}
                        className={`group flex min-h-32 flex-col justify-between gap-5 rounded-md border p-4 text-left transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d6ad0c] ${
                          isActive
                            ? "border-[#0c294c] bg-white shadow-lg shadow-[#0c294c]/5"
                            : "border-slate-200 bg-white text-[#0c294c] hover:border-[#0c294c]/40 hover:shadow-md"
                        } ${!isOpen ? "opacity-70" : ""}`}
                      >
                        <span className="flex items-start justify-between gap-4">
                          <span
                            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md text-white"
                            style={{ backgroundColor: svc.accent }}
                          >
                            {svc.icon}
                          </span>
                          <span
                            className={`rounded-full px-3 py-1 text-[11px] font-bold ${
                              isOpen
                                ? "bg-[#0f6136]/10 text-[#0f6136]"
                                : "bg-slate-200 text-slate-600"
                            }`}
                          >
                            {svc.status}
                          </span>
                        </span>
                        <span className="flex flex-col gap-1">
                          <span className="text-lg font-bold leading-tight">
                            {svc.title}
                          </span>
                          <span className="text-sm leading-relaxed text-slate-500">
                            {svc.blurb}
                          </span>
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Active service action bar */}
                <div className="mt-4 flex flex-col gap-3 rounded-md border border-[#0c294c]/10 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    <span
                      className="flex h-9 w-9 items-center justify-center rounded-md text-white"
                      style={{ backgroundColor: activeService.accent }}
                    >
                      {activeService.icon}
                    </span>
                    <div>
                      <p className="text-sm font-bold text-[#0c294c]">
                        {activeService.title}
                      </p>
                      <p className="text-xs text-slate-500">
                        {activeService.status === "Open"
                          ? "Available now — typical session under 3 minutes"
                          : "Opens when the placement cycle reaches this stage"}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    disabled={activeService.status === "Closed"}
                    className={`inline-flex min-h-11 items-center justify-center gap-1.5 rounded-full px-5 text-sm font-bold transition-colors ${
                      activeService.status === "Open"
                        ? "bg-[#0f6136] text-white hover:bg-[#0a4a28]"
                        : "cursor-not-allowed bg-slate-200 text-slate-500"
                    }`}
                  >
                    {activeService.status === "Open"
                      ? "Continue"
                      : "Unavailable"}
                    {activeService.status === "Open" && (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Trust strip */}
            <div className="mt-4 grid grid-cols-3 gap-2 text-center">
              {[
                { k: "530k+", v: "Candidates placed" },
                { k: "928", v: "Schools available" },
                { k: "<3 min", v: "Average check time" },
              ].map((s) => (
                <div
                  key={s.v}
                  className="rounded-md border border-white/10 bg-white/5 px-3 py-3 text-white"
                >
                  <p className="text-lg font-extrabold text-[#f4d84c] sm:text-2xl">
                    {s.k}
                  </p>
                  <p className="text-[11px] font-medium text-white/70 sm:text-xs">
                    {s.v}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
