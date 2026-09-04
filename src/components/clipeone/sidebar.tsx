"use client";

import {
  Bell,
  Headphones,
  ArrowRight,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { useSupportModal } from "./support-modal-context";

export function Sidebar() {
  const { openCreate } = useSupportModal();
  return (
    <aside className="flex flex-col gap-4">
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

      {/* Announcements — empty state */}
      <div className="rounded-xl border border-[#e5e7eb] bg-white p-5 shadow-soft">
        <header className="mb-3 flex items-center justify-between">
          <p className="text-sm font-bold text-[#111827]">Announcements</p>
          <span className="inline-flex items-center gap-1 rounded-full bg-[#f3f4f6] px-2 py-0.5 text-[10px] font-bold text-[#6b7280]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#9ca3af]" />
            0 new
          </span>
        </header>
        <div className="flex flex-col items-center gap-3 rounded-lg border border-dashed border-[#e5e7eb] bg-[#f8fafc] p-6 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#9ca3af] ring-1 ring-inset ring-[#e5e7eb]">
            <Bell className="h-6 w-6" />
          </span>
          <div className="flex flex-col gap-1">
            <p className="text-sm font-bold text-[#111827]">
              No announcements
            </p>
            <p className="text-[11px] leading-snug text-[#6b7280]">
              You&apos;re all caught up. New updates from ClipeOne will appear
              here as soon as they&apos;re posted.
            </p>
          </div>
        </div>
      </div>

      {/* Need Help cards — first shows contact write-up, second shows ticket CTA */}
      <div className="flex flex-col gap-4">
        <NeedHelpCard tall variant="contact" />
        <NeedHelpCard tall onButtonClick={openCreate} />
      </div>
    </aside>
  );
}

function NeedHelpCard({
  tall = false,
  variant = "ticket",
  onButtonClick,
}: {
  tall?: boolean;
  variant?: "ticket" | "contact";
  onButtonClick?: () => void;
}) {
  const isContact = variant === "contact";
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
        {!isContact && (
          <span
            className={`flex shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/5 ${
              tall ? "h-14 w-14" : "h-9 w-9"
            }`}
          >
            <Headphones className={tall ? "h-8 w-8 text-white" : "h-5 w-5 text-white"} />
          </span>
        )}
        <div className="flex min-w-0 flex-col gap-1">
          <p
            className={`font-bold leading-tight ${
              tall ? "text-lg" : "text-sm"
            }`}
          >
            {isContact ? "Contact Us" : "Need Help?"}
          </p>
          {!isContact && (
            <p
              className={`leading-snug text-white/70 ${
                tall ? "text-sm" : "text-[11px]"
              }`}
            >
              Our support team is ready to assist you with any question, any time.
            </p>
          )}
        </div>
      </div>

      {isContact ? (
        <ul
          className={`relative mt-4 flex flex-col gap-2 text-white/85 ${
            tall ? "text-sm" : "text-[11px]"
          }`}
        >
          <li>
            <a
              href="mailto:support@clipeone.com"
              className="inline-flex items-center gap-2 transition-colors hover:text-white"
            >
              <Mail className={`shrink-0 text-[#e31e24] ${tall ? "h-4 w-4" : "h-3.5 w-3.5"}`} />
              <span>
                <span className="text-white/60">Email: </span>
                support@clipeone.com
              </span>
            </a>
          </li>
          <li>
            <a
              href="tel:+233249783637"
              className="inline-flex items-center gap-2 transition-colors hover:text-white"
            >
              <Phone className={`shrink-0 text-[#e31e24] ${tall ? "h-4 w-4" : "h-3.5 w-3.5"}`} />
              <span>
                <span className="text-white/60">Phone: </span>
                +233 24 978 3736
              </span>
            </a>
          </li>
          <li className="inline-flex items-center gap-2">
            <MapPin className={`shrink-0 text-[#e31e24] ${tall ? "h-4 w-4" : "h-3.5 w-3.5"}`} />
            <span>
              <span className="text-white/60">Location: </span>
              Ho · Volta Region · Ghana
            </span>
          </li>
        </ul>
      ) : (
        <button
          type="button"
          onClick={onButtonClick}
          className={`relative mt-4 inline-flex w-full items-center justify-center gap-1.5 rounded-md bg-white font-bold text-[#0a1f3d] transition-colors hover:bg-[#f3f4f6] ${
            tall ? "min-h-11 px-4 text-sm" : "min-h-9 px-3 text-xs"
          }`}
        >
          Create Support Ticket
          <ArrowRight className={tall ? "h-4 w-4" : "h-3.5 w-3.5"} />
        </button>
      )}
    </div>
  );
}
