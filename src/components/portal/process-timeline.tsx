"use client";

import { Search, ListChecks, GraduationCap } from "lucide-react";

const TIMELINE = [
  {
    step: "Step 1",
    title: "Check your result",
    body: "Enter your BECE index number and date of birth on the portal to see your placement status in real time.",
    icon: <Search className="h-5 w-5" />,
  },
  {
    step: "Step 2",
    title: "Confirm or self-place",
    body: "If placed, confirm your school. If unplaced, use Self-Placement to choose from schools with available vacancies.",
    icon: <ListChecks className="h-5 w-5" />,
  },
  {
    step: "Step 3",
    title: "Print & enrol",
    body: "Download your Placement Form and Enrolment Form, then report to your school with the required documents.",
    icon: <GraduationCap className="h-5 w-5" />,
  },
];

export function ProcessTimeline() {
  return (
    <section
      id="process"
      className="relative overflow-hidden bg-white py-16 sm:py-20"
    >
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#0c294c]/15 bg-[#0c294c]/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#0c294c]">
            The placement journey
          </span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[#0c294c] sm:text-4xl">
            Three steps from result to enrolment
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
            Every candidate follows the same simple path. Most students complete
            the journey in a single sitting — all you need is your index number
            and date of birth.
          </p>
        </div>

        <div className="relative">
          {/* Connecting line (desktop only) */}
          <div className="absolute left-0 right-0 top-12 hidden h-px bg-gradient-to-r from-transparent via-[#0c294c]/20 to-transparent lg:block" />

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-6">
            {TIMELINE.map((item, idx) => (
              <div
                key={item.step}
                className="relative flex flex-col items-center text-center"
              >
                {/* Icon circle */}
                <div className="relative z-10 flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-gradient-to-br from-[#0c294c] to-[#0a4a28] text-[#f4d84c] shadow-xl shadow-[#0c294c]/15">
                  {item.icon}
                  {/* Step badge */}
                  <span className="absolute -bottom-2 rounded-full bg-[#d6ad0c] px-3 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-[#0c294c]">
                    {item.step}
                  </span>
                </div>

                <h3 className="mt-6 text-xl font-bold text-[#0c294c]">
                  {item.title}
                </h3>
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-slate-600">
                  {item.body}
                </p>

                {/* Arrow between items (desktop) */}
                {idx < TIMELINE.length - 1 && (
                  <div className="absolute right-0 top-12 hidden h-px w-1/2 translate-x-full lg:block">
                    <div className="h-full bg-gradient-to-r from-[#0c294c]/20 to-transparent" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
