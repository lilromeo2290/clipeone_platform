"use client";

import {
  FileCheck2,
  Hand,
  ClipboardCheck,
  PencilLine,
  RotateCcw,
  Globe2,
  ArrowRight,
} from "lucide-react";

const STEPS = [
  {
    n: "01",
    title: "Check placement",
    body: "View your assigned school, programme, and placement documents. Use this first to see your automatic placement result.",
    icon: <FileCheck2 className="h-5 w-5" />,
    accent: "#0f6136",
  },
  {
    n: "02",
    title: "Self-placement",
    body: "If you are unplaced, choose a school and programme with available space. The list updates in real time as seats fill.",
    icon: <Hand className="h-5 w-5" />,
    accent: "#0c294c",
  },
  {
    n: "03",
    title: "Choice confirmation",
    body: "Review your school choices and confirm them when every detail is correct. Confirmation locks your preferences for processing.",
    icon: <ClipboardCheck className="h-5 w-5" />,
    accent: "#0c294c",
  },
  {
    n: "04",
    title: "Edit choices",
    body: "Correct or replace your school choices before you confirm them. Reordering is allowed only during the open window.",
    icon: <PencilLine className="h-5 w-5" />,
    accent: "#0c294c",
  },
  {
    n: "05",
    title: "Re-entry",
    body: "Eligible previous-year candidates can register and apply for placement again. Documentation is verified before approval.",
    icon: <RotateCcw className="h-5 w-5" />,
    accent: "#0c294c",
  },
  {
    n: "06",
    title: "Foreign student",
    body: "Apply with a foreign qualification and track your application status. Results from recognised exam bodies are accepted.",
    icon: <Globe2 className="h-5 w-5" />,
    accent: "#0f6136",
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-24"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#0c294c]/15 to-transparent" />
      </div>

      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="mx-auto mb-12 max-w-3xl text-center sm:mb-16">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#0f6136]/20 bg-[#0f6136]/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#0f6136]">
            Six candidate services
          </span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[#0c294c] sm:text-4xl lg:text-5xl">
            Find the service you need
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
            Start by checking your placement, then use another service only when
            it applies to you. Each step is designed to take less than three
            minutes from a phone or computer.
          </p>
        </div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {STEPS.map((step, idx) => (
            <article
              key={step.n}
              className="group relative flex flex-col gap-4 rounded-lg border border-slate-200 bg-white p-6 transition-all hover:-translate-y-1 hover:border-[#0c294c]/30 hover:shadow-xl hover:shadow-[#0c294c]/5"
              style={{ animationDelay: `${idx * 60}ms` }}
            >
              {/* Top row: number + icon */}
              <div className="flex items-start justify-between">
                <span className="step-number text-5xl font-extrabold leading-none tracking-tight">
                  {step.n}
                </span>
                <span
                  className="flex h-11 w-11 items-center justify-center rounded-md text-white"
                  style={{ backgroundColor: step.accent }}
                >
                  {step.icon}
                </span>
              </div>

              {/* Title + body */}
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-bold leading-tight text-[#0c294c]">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-600">
                  {step.body}
                </p>
              </div>

              {/* Footer link */}
              <a
                href="#portal-section"
                className="mt-auto inline-flex items-center gap-1 text-sm font-bold text-[#0f6136] transition-colors hover:text-[#0a4a28]"
              >
                Open service
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>

              {/* Bottom accent line */}
              <span
                className="absolute bottom-0 left-0 h-1 w-0 transition-all duration-500 group-hover:w-full"
                style={{ backgroundColor: step.accent }}
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
