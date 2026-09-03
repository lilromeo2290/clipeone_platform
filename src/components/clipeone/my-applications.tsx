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
  href: string;
  external?: boolean;
  preview?: string;
  previewAlt?: string;
}

const APPS: App[] = [
  {
    name: "ClipeGov RMS",
    tagline: "Revenue Management System",
    icon: <Building2 className="h-6 w-6" />,
    color: "#1e3a8a",
    status: "Active",
    href: "https://rms.clipeconsult.com/",
    external: true,
    preview: "/clipeone/clipegov-rms-preview.png",
    previewAlt:
      "ClipeGov RMS login screen — Kpando Municipal Assembly revenue management system",
  },
  {
    name: "ClipeBooks",
    tagline: "Accounting & Finance",
    icon: <Calculator className="h-6 w-6" />,
    color: "#059669",
    status: "Pending",
    href: "#",
  },
  {
    name: "ClipeSchool",
    tagline: "School Management",
    icon: <GraduationCap className="h-6 w-6" />,
    color: "#dc2626",
    status: "Pending",
    href: "#",
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

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
        {APPS.map((app) => (
          <a
            key={app.name}
            href={app.href}
            {...(app.external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            className="group flex flex-col gap-3 overflow-hidden rounded-lg border border-[#e5e7eb] bg-white transition-all hover:-translate-y-0.5 hover:border-[#0a1f3d]/20 hover:shadow-soft-lg"
          >
            {/* Optional preview image */}
            {app.preview && (
              <div className="relative aspect-[4/3] overflow-hidden border-b border-[#e5e7eb] bg-[#f8fafc]">
                <img
                  src={app.preview}
                  alt={app.previewAlt || app.name}
                  className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                  loading="lazy"
                />
                {/* Color tint overlay matching the app color */}
                <div
                  className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background: `linear-gradient(to top, ${app.color}30, transparent 60%)`,
                  }}
                />
              </div>
            )}
            <div className="flex flex-col gap-3 p-3.5">
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
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
