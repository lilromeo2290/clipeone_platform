"use client";

import {
  Building2,
  Calculator,
  GraduationCap,
  ArrowRight,
} from "lucide-react";

interface App {
  name: string;
  tagline: string;
  icon: React.ReactNode;
  color: string;
  status: "Active" | "Trial" | "Expired" | "Pending";
}

const APPS: App[] = [
  {
    name: "ClipeGov RMS",
    tagline: "Revenue Management System",
    icon: <Building2 className="h-6 w-6" />,
    color: "#1e3a8a",
    status: "Active",
  },
  {
    name: "ClipeBooks",
    tagline: "Accounting & Finance",
    icon: <Calculator className="h-6 w-6" />,
    color: "#059669",
    status: "Pending",
  },
  {
    name: "ClipeSchool",
    tagline: "School Management",
    icon: <GraduationCap className="h-6 w-6" />,
    color: "#dc2626",
    status: "Pending",
  },
];

const STATUS_STYLES: Record<App["status"], string> = {
  Active: "bg-[#d1fae5] text-[#059669]",
  Pending: "bg-[#fef3c7] text-[#d97706]",
  Trial: "bg-[#e0e7ff] text-[#4f46e5]",
  Expired: "bg-[#fee2e2] text-[#dc2626]",
};

export function MyApplications() {
  return (
    <section className="rounded-xl border border-[#e5e7eb] bg-white p-5 sm:p-6 shadow-soft">
      <header className="mb-5 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold tracking-tight text-[#111827] sm:text-xl">
            My Applications
          </h2>
          <p className="mt-0.5 text-xs text-[#6b7280] sm:text-sm">
            Applications your organization is currently subscribed to
          </p>
        </div>
        <a
          href="#"
          className="group inline-flex items-center gap-1 whitespace-nowrap text-sm font-semibold text-[#e31e24] transition-colors hover:text-[#b9141a]"
        >
          View All Applications
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </a>
      </header>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
        {APPS.map((app) => (
          <a
            key={app.name}
            href="#"
            className="group flex flex-col gap-3 rounded-lg border border-[#e5e7eb] bg-white p-3.5 transition-all hover:-translate-y-0.5 hover:border-[#0a1f3d]/20 hover:shadow-soft-lg"
          >
            <div className="flex items-start justify-between">
              <span
                className="flex h-11 w-11 items-center justify-center rounded-lg text-white shadow-sm"
                style={{ backgroundColor: app.color }}
              >
                {app.icon}
              </span>
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${STATUS_STYLES[app.status]}`}
              >
                {app.status}
              </span>
            </div>
            <div className="flex flex-col gap-0.5">
              <p className="text-sm font-bold leading-tight text-[#111827]">
                {app.name}
              </p>
              <p className="text-[11px] leading-snug text-[#6b7280]">
                {app.tagline}
              </p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
