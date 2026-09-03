"use client";

import { useMemo, useState } from "react";
import {
  Building2,
  Briefcase,
  GraduationCap,
  HeartPulse,
  Landmark,
  Hotel,
  LayoutGrid,
  ArrowRight,
} from "lucide-react";

interface Category {
  name: string;
  desc: string;
  count: number;
  icon: React.ReactNode;
  color: string;
  tag: string;
}

const CATEGORIES: Category[] = [
  {
    name: "Government",
    desc: "Public sector tools for revenue, permits, and citizen services.",
    count: 18,
    icon: <Building2 className="h-5 w-5" />,
    color: "#1e3a8a",
    tag: "Government",
  },
  {
    name: "Business",
    desc: "Operations, sales, CRM, and inventory for growing companies.",
    count: 24,
    icon: <Briefcase className="h-5 w-5" />,
    color: "#f97316",
    tag: "Business",
  },
  {
    name: "Education",
    desc: "School, campus, and learning management for every level.",
    count: 12,
    icon: <GraduationCap className="h-5 w-5" />,
    color: "#dc2626",
    tag: "Education",
  },
  {
    name: "Health",
    desc: "Clinic, hospital, and patient management applications.",
    count: 9,
    icon: <HeartPulse className="h-5 w-5" />,
    color: "#0d9488",
    tag: "Health",
  },
  {
    name: "Finance",
    desc: "Accounting, payments, and reporting for finance teams.",
    count: 15,
    icon: <Landmark className="h-5 w-5" />,
    color: "#059669",
    tag: "Finance",
  },
  {
    name: "Hospitality",
    desc: "Hotels, restaurants, and guest-experience solutions.",
    count: 7,
    icon: <Hotel className="h-5 w-5" />,
    color: "#7c3aed",
    tag: "Hospitality",
  },
  {
    name: "Other",
    desc: "Specialized tools that don't fit a single industry vertical.",
    count: 11,
    icon: <LayoutGrid className="h-5 w-5" />,
    color: "#475569",
    tag: "Other",
  },
];

const TABS = [
  "All Categories",
  "Government",
  "Business",
  "Education",
  "Health",
  "Finance",
  "Hospitality",
  "Other",
];

export function ExploreApplications() {
  const [active, setActive] = useState("All Categories");

  const filtered = useMemo(() => {
    if (active === "All Categories") return CATEGORIES;
    return CATEGORIES.filter((c) => c.tag === active);
  }, [active]);

  return (
    <section
      id="explore"
      className="rounded-xl border border-[#e5e7eb] bg-white p-5 sm:p-6 shadow-soft"
    >
      <header className="mb-5 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold tracking-tight text-[#111827] sm:text-xl">
            Explore Applications
          </h2>
          <p className="mt-0.5 text-xs text-[#6b7280] sm:text-sm">
            Browse by industry and discover the right solution
          </p>
        </div>
        <a
          href="#"
          className="group inline-flex items-center gap-1 whitespace-nowrap text-sm font-semibold text-[#e31e24] transition-colors hover:text-[#b9141a]"
        >
          View All
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </a>
      </header>

      {/* Filter tabs */}
      <div className="mb-5 -mx-1 flex gap-2 overflow-x-auto px-1 pb-1 no-scrollbar">
        {TABS.map((tab) => {
          const isActive = tab === active;
          return (
            <button
              key={tab}
              type="button"
              onClick={() => setActive(tab)}
              className={`inline-flex h-9 shrink-0 items-center whitespace-nowrap rounded-full px-4 text-sm font-semibold transition-all ${
                isActive
                  ? "bg-[#e31e24] text-white shadow-sm"
                  : "bg-[#f3f4f6] text-[#6b7280] hover:bg-[#e5e7eb] hover:text-[#111827]"
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* Category cards */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {filtered.map((cat) => (
          <article
            key={cat.name}
            className="group flex flex-col gap-3 rounded-lg border border-[#e5e7eb] bg-white p-4 transition-all hover:-translate-y-0.5 hover:border-[#0a1f3d]/20 hover:shadow-soft-lg"
          >
            <div className="flex items-center gap-3">
              <span
                className="flex h-10 w-10 items-center justify-center rounded-lg text-white"
                style={{ backgroundColor: cat.color }}
              >
                {cat.icon}
              </span>
              <div className="flex flex-col">
                <p className="text-sm font-bold leading-tight text-[#111827]">
                  {cat.name}
                </p>
                <p className="text-xs font-semibold text-[#2563eb]">
                  {cat.count} Applications
                </p>
              </div>
            </div>

            <p className="text-xs leading-relaxed text-[#6b7280]">
              {cat.desc}
            </p>

            <button
              type="button"
              className="mt-auto inline-flex h-9 w-full items-center justify-center gap-1.5 rounded-md border border-[#2563eb]/30 bg-[#2563eb]/5 text-xs font-bold text-[#2563eb] transition-all hover:border-[#2563eb] hover:bg-[#2563eb] hover:text-white"
            >
              Explore
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
