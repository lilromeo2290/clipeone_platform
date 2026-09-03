"use client";

import { CheckCircle2, GraduationCap, Scale, Users } from "lucide-react";

const PILLARS = [
  {
    icon: <Scale className="h-5 w-5" />,
    title: "Fair",
    body: "Placement is determined by a transparent algorithm using your raw score, school choices, and available vacancies.",
  },
  {
    icon: <GraduationCap className="h-5 w-5" />,
    title: "Smart",
    body: "The system matches every candidate to the best-fit school and programme based on performance and capacity.",
  },
  {
    icon: <Users className="h-5 w-5" />,
    title: "Inclusive",
    body: "Re-entry and foreign-student services ensure no qualifying candidate is left behind each cycle.",
  },
  {
    icon: <CheckCircle2 className="h-5 w-5" />,
    title: "Verified",
    body: "Every placement is digitally signed and traceable. Documents generated on the portal are valid for enrolment.",
  },
];

export function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-[#0c294c] py-16 sm:py-20 lg:py-24"
    >
      <div className="absolute inset-0 hero-grid opacity-50" />
      <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-[#d6ad0c] opacity-10 blur-3xl" />
      <div className="absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-[#0f6136] opacity-40 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left — narrative */}
          <div className="lg:col-span-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#f4d84c]">
              About the portal
            </span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
              A computerized platform built for every candidate
            </h2>
            <p className="mt-5 text-base leading-relaxed text-white/80 sm:text-lg">
              The Placement Portal is a computerized platform designed to match
              graduating junior high school students with senior high schools
              and TVET institutions based on their academic performance,
              programme preferences, and available vacancies.
            </p>
            <p className="mt-4 text-base leading-relaxed text-white/70">
              Every cycle, more than half a million candidates rely on the
              portal to discover their next step in education. The platform
              runs on a transparent scoring system, publishes results in real
              time, and provides every candidate with printable placement and
              enrolment documents recognised by all partner institutions.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#portal-section"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#d6ad0c] px-6 font-bold text-[#0c294c] transition-all hover:bg-[#f4d84c] hover:shadow-lg hover:shadow-[#d6ad0c]/30"
              >
                Try the portal
              </a>
              <a
                href="#support"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/25 px-6 font-semibold text-white transition-colors hover:bg-white/5"
              >
                Read the FAQs
              </a>
            </div>
          </div>

          {/* Right — pillars */}
          <div className="lg:col-span-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {PILLARS.map((p, idx) => (
                <div
                  key={p.title}
                  className="group rounded-lg border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all hover:border-[#d6ad0c]/40 hover:bg-white/[0.07]"
                  style={{ animationDelay: `${idx * 80}ms` }}
                >
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-md bg-[#d6ad0c] text-[#0c294c]">
                    {p.icon}
                  </span>
                  <h3 className="mt-4 text-lg font-bold text-white">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">
                    {p.body}
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
