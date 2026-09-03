"use client";

import {
  Bell,
  Rocket,
  ShieldCheck,
  Headphones,
  ArrowRight,
} from "lucide-react";

const ANNOUNCEMENTS = [
  {
    icon: <Bell className="h-4 w-4" />,
    title: "System Maintenance Notice",
    desc: "Scheduled downtime on May 25, 02:00 – 04:00 UTC for security patches.",
    date: "May 20, 2025",
    color: "#e31e24",
    bg: "#fee2e2",
  },
  {
    icon: <Rocket className="h-4 w-4" />,
    title: "New Application Added",
    desc: "ClipePay is now available — accept payments across every ClipeOne app.",
    date: "May 18, 2025",
    color: "#2563eb",
    bg: "#dbeafe",
  },
  {
    icon: <ShieldCheck className="h-4 w-4" />,
    title: "Security Update",
    desc: "Two-factor authentication is now mandatory for all admin accounts.",
    date: "May 15, 2025",
    color: "#059669",
    bg: "#d1fae5",
  },
];

export function Sidebar() {
  return (
    <aside className="flex flex-col gap-4 lg:h-full">
      {/* My Organization */}
      <div className="rounded-xl border border-[#e5e7eb] bg-white p-5 shadow-soft">
        <p className="text-xs font-bold uppercase tracking-wider text-[#9ca3af]">
          My Organization
        </p>
        <a
          href="https://clipeconsult.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 block rounded-lg border border-[#e5e7eb] bg-white p-3 transition-all hover:border-[#0a1f3d]/20 hover:shadow-soft"
          aria-label="Visit Clipe Consult website"
        >
          <img
            src="/clipeone/clipe-consult-logo.png"
            alt="Clipe Consult — Building Innovations | Engineering Excellence"
            width={354}
            height={177}
            className="block h-auto max-h-20 w-full object-contain"
          />
        </a>
      </div>

      {/* Announcements */}
      <div className="rounded-xl border border-[#e5e7eb] bg-white p-5 shadow-soft">
        <header className="mb-3 flex items-center justify-between">
          <p className="text-sm font-bold text-[#111827]">Announcements</p>
          <a
            href="#"
            className="text-xs font-semibold text-[#e31e24] hover:text-[#b9141a]"
          >
            View All
          </a>
        </header>
        <ul className="flex flex-col gap-3">
          {ANNOUNCEMENTS.map((a, idx) => (
            <li
              key={idx}
              className="group flex gap-3 rounded-lg p-2 transition-colors hover:bg-[#f8fafc]"
            >
              <span
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
                style={{ backgroundColor: a.bg, color: a.color }}
              >
                {a.icon}
              </span>
              <div className="flex min-w-0 flex-col gap-0.5">
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate text-sm font-bold text-[#111827]">
                    {a.title}
                  </p>
                  <span className="shrink-0 text-[10px] font-medium text-[#9ca3af]">
                    {a.date}
                  </span>
                </div>
                <p className="text-[11px] leading-snug text-[#6b7280]">
                  {a.desc}
                </p>
              </div>
            </li>
          ))}
        </ul>
        <a
          href="#"
          className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[#e31e24] hover:text-[#b9141a]"
        >
          More Announcements
          <ArrowRight className="h-3.5 w-3.5" />
        </a>
      </div>

      {/* Need Help cards — pinned to bottom of sidebar so they sit below the TrustBar level */}
      <div className="mt-auto flex flex-col gap-4">
        <NeedHelpCard />
        <NeedHelpCard tall />
      </div>
    </aside>
  );
}

function NeedHelpCard({ tall = false }: { tall?: boolean }) {
  return (
    <div
      className={`relative overflow-hidden rounded-xl bg-[#0a1f3d] text-white shadow-soft-lg ${
        tall ? "p-6" : "p-3.5"
      }`}
    >
      <div className="absolute inset-0 hero-stars opacity-50" />
      <div
        className={`absolute rounded-full bg-[#e31e24]/20 blur-2xl ${
          tall ? "-top-16 -right-16 h-40 w-40" : "-top-10 -right-10 h-24 w-24"
        }`}
      />
      <div className="relative flex items-start gap-3">
        <span
          className={`flex shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/5 ${
            tall ? "h-14 w-14" : "h-9 w-9"
          }`}
        >
          <Headphones className={tall ? "h-8 w-8 text-white" : "h-5 w-5 text-white"} />
        </span>
        <div className="flex min-w-0 flex-col gap-1">
          <p
            className={`font-bold leading-tight ${
              tall ? "text-lg" : "text-sm"
            }`}
          >
            Need Help?
          </p>
          <p
            className={`leading-snug text-white/70 ${
              tall ? "text-sm" : "text-[11px]"
            }`}
          >
            Our support team is ready to assist you with any question, any time.
          </p>
        </div>
      </div>
      <button
        type="button"
        className={`relative mt-4 inline-flex w-full items-center justify-center gap-1.5 rounded-md bg-white font-bold text-[#0a1f3d] transition-colors hover:bg-[#f3f4f6] ${
          tall ? "min-h-11 px-4 text-sm" : "min-h-9 px-3 text-xs"
        }`}
      >
        Create Support Ticket
        <ArrowRight className={tall ? "h-4 w-4" : "h-3.5 w-3.5"} />
      </button>
    </div>
  );
}
