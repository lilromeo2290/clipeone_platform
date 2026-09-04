"use client";

import { useState } from "react";
import { LifeBuoy, X, MessageSquare } from "lucide-react";
import { useSupportModal } from "./support-modal-context";
import { SupportTicketModal } from "./support-ticket-modal";
import { TrackTicketModal } from "./track-ticket-modal";
import { openLiveChat, tawkConfigured } from "@/lib/tawk";

/**
 * Renders TWO floating buttons (bottom-right):
 *   1. Indigo Tawk.to Live Chat button (standalone)
 *   2. Red Support menu button (opens popover with Create ticket / Track ticket)
 *
 * Plus the two modals. Mount this once near the root of the layout.
 */
export function SupportLauncher() {
  const { open, openCreate, openTrack } = useSupportModal();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleCreate = () => {
    setMenuOpen(false);
    openCreate();
  };
  const handleTrack = () => {
    setMenuOpen(false);
    openTrack();
  };
  const handleTawk = () => {
    if (!tawkConfigured) return;
    openLiveChat();
  };

  return (
    <>
      {/* Floating buttons — stacked vertically, bottom-right */}
      <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-2 sm:bottom-6 sm:right-6">
        {/* Support menu popover (only when menu is open and no modal is open) */}
        {menuOpen && !open && (
          <div className="flex w-64 flex-col gap-1 rounded-xl border border-[#e5e7eb] bg-white p-2 shadow-2xl animate-fade-up">
            <div className="px-3 py-2">
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#9ca3af]">
                Support
              </p>
              <p className="text-sm font-bold text-[#0a1f3d]">How can we help?</p>
            </div>
            <button
              type="button"
              onClick={handleCreate}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-[#f8fafc]"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e31e24] text-white">
                <LifeBuoy className="h-4 w-4" />
              </span>
              <span className="flex flex-col">
                <span className="text-sm font-bold text-[#111827]">
                  Create ticket
                </span>
                <span className="text-[11px] text-[#6b7280]">
                  Tell us what&apos;s wrong
                </span>
              </span>
            </button>
            <button
              type="button"
              onClick={handleTrack}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-[#f8fafc]"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0a1f3d] text-white">
                <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
                  <path
                    d="M21 12a9 9 0 1 1-3.5-7.1"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M21 4v5h-5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className="flex flex-col">
                <span className="text-sm font-bold text-[#111827]">
                  Track ticket
                </span>
                <span className="text-[11px] text-[#6b7280]">
                  Check status with reference
                </span>
              </span>
            </button>
          </div>
        )}

        {/* Tawk.to Live Chat — standalone floating button (indigo) */}
        <button
          type="button"
          onClick={handleTawk}
          disabled={!tawkConfigured}
          aria-label={
            tawkConfigured
              ? "Open live chat (Tawk.to)"
              : "Live chat coming soon"
          }
          title={
            tawkConfigured
              ? "Live Chat · Online now"
              : "Live Chat · Coming soon"
          }
          className={`group inline-flex h-12 w-12 items-center justify-center rounded-full shadow-lg transition-all ${
            tawkConfigured
              ? "bg-[#4f46e5] text-white hover:bg-[#4338ca] hover:shadow-[#4f46e5]/40"
              : "cursor-not-allowed bg-[#4f46e5]/60 text-white/80"
          }`}
        >
          <MessageSquare className="h-5 w-5" />
          {/* "Coming soon" pill — only shows when not configured */}
          {!tawkConfigured && (
            <span className="absolute -top-1 -right-1 inline-flex items-center rounded-full bg-[#f97316] px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider text-white shadow-sm">
              Soon
            </span>
          )}
          {/* Online indicator dot — only shows when configured */}
          {tawkConfigured && (
            <span className="absolute -top-0.5 -right-0.5 inline-flex h-3 w-3 items-center justify-center">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#059669] opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#059669] ring-2 ring-white" />
            </span>
          )}
        </button>

        {/* Support menu button (red) */}
        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Close support menu" : "Open support menu"}
          aria-expanded={menuOpen}
          className="group inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#e31e24] text-white shadow-xl shadow-[#e31e24]/30 transition-all hover:bg-[#b9141a] hover:shadow-[#e31e24]/40"
        >
          {menuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <LifeBuoy className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Modals */}
      <SupportTicketModal />
      <TrackTicketModal />
    </>
  );
}
