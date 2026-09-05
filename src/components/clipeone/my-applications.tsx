"use client";

import {
  Building2,
  Calculator,
  Users,
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
    preview: "/clipeone/apps/RMS.webp",
    previewAlt: "ClipeGov RMS login screen",
  },
  {
    name: "ClipeBooks",
    tagline: "Accounting & Finance",
    icon: <Calculator className="h-6 w-6" />,
    color: "#059669",
    status: "Pending",
    href: "#",
    preview: "/clipeone/apps/Acount.webp",
    previewAlt: "ClipeBooks accounting application login screen",
  },
  {
    name: "ClipeCRM",
    tagline: "Customer Relationship Management",
    icon: <Users className="h-6 w-6" />,
    color: "#dc2626",
    status: "Pending",
    href: "#",
    preview: "/clipeone/apps/CRM.webp",
    previewAlt: "ClipeCRM customer relationship management application login screen",
  },
  {
    name: "ClipeSchool",
    tagline: "School Management System",
    icon: <GraduationCap className="h-6 w-6" />,
    color: "#0d9488",
    status: "Pending",
    href: "#",
    preview: "/clipeone/apps/school.webp",
    previewAlt: "ClipeSchool management system login screen",
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
            href={app.href}
            {...(app.external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            className="group flex flex-col overflow-hidden rounded-lg border border-[#e5e7eb] bg-white transition-all hover:-translate-y-0.5 hover:border-[#0a1f3d]/20 hover:shadow-soft-lg"
          >
            {/* Preview image — taller aspect, object-contain so the full
                login screen is visible without cropping/squishing.
                Icon + status badge float on top of the image. */}
            {app.preview && (
              <div className="relative aspect-[3/4] overflow-hidden border-b border-[#e5e7eb] bg-[#0a1f3d]">
                <img
                  src={app.preview}
                  alt={app.previewAlt || app.name}
                  className="absolute inset-0 h-full w-full object-contain object-top transition-transform duration-500 group-hover:scale-[1.02]"
                  loading="lazy"
                />
                {/* Top-left floating icon badge */}
                <span
                  className="absolute left-2 top-2 flex h-8 w-8 items-center justify-center rounded-md text-white shadow-md ring-2 ring-white/80"
                  style={{ backgroundColor: app.color }}
                >
                  {/* shrink icon to fit the smaller badge */}
                  <span className="[&>svg]:h-4 [&>svg]:w-4">{app.icon}</span>
                </span>
                {/* Top-right floating status badge */}
                <span
                  className={`absolute right-2 top-2 rounded-full px-2 py-0.5 text-[10px] font-bold shadow-sm ring-1 ring-black/5 ${STATUS_STYLES[app.status]}`}
                >
                  {app.status}
                </span>
                {/* Bottom gradient for legibility of any text near bottom of image */}
                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#0a1f3d]/60 to-transparent"
                  aria-hidden="true"
                />
              </div>
            )}
            {/* Name + tagline below the image — cleaner, more breathing room */}
            <div className="flex flex-col gap-0.5 p-3.5">
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
