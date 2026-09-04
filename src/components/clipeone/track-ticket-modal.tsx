"use client";

import { useEffect, useState } from "react";
import {
  X,
  Search,
  Loader2,
  AlertCircle,
  ArrowLeft,
  Clock,
  CheckCircle2,
  AlertTriangle,
  XCircle,
} from "lucide-react";
import { useSupportModal } from "./support-modal-context";

type Status = "idle" | "loading" | "found" | "not_found" | "error";

interface TrackedTicket {
  reference: string;
  name: string;
  subject: string;
  category: string;
  priority: string;
  status: string;
  description: string;
  reply: string | null;
  createdAt: string;
  updatedAt: string;
  resolvedAt: string | null;
}

const STATUS_META: Record<
  string,
  { label: string; color: string; bg: string; icon: React.ReactNode }
> = {
  Open: {
    label: "Open",
    color: "#1e3a8a",
    bg: "#dbeafe",
    icon: <Clock className="h-3.5 w-3.5" />,
  },
  "In Progress": {
    label: "In Progress",
    color: "#d97706",
    bg: "#fef3c7",
    icon: <AlertTriangle className="h-3.5 w-3.5" />,
  },
  Resolved: {
    label: "Resolved",
    color: "#059669",
    bg: "#d1fae5",
    icon: <CheckCircle2 className="h-3.5 w-3.5" />,
  },
  Closed: {
    label: "Closed",
    color: "#6b7280",
    bg: "#f3f4f6",
    icon: <XCircle className="h-3.5 w-3.5" />,
  },
};

export function TrackTicketModal() {
  const { open, close, openCreate } = useSupportModal();
  const isOpen = open === "track";

  const [reference, setReference] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [ticket, setTicket] = useState<TrackedTicket | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) {
      const t = setTimeout(() => {
        setReference("");
        setEmail("");
        setStatus("idle");
        setTicket(null);
        setError(null);
      }, 200);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, close]);

  if (!isOpen) return null;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!reference.trim() || !email.trim()) {
      setError("Please enter both your reference number and email.");
      return;
    }
    setStatus("loading");
    try {
      const params = new URLSearchParams({
        reference: reference.trim().toUpperCase(),
        email: email.trim().toLowerCase(),
      });
      const res = await fetch(`/api/tickets/track?${params}`, {
        method: "GET",
      });
      const data = await res.json();
      if (res.status === 404) {
        setStatus("not_found");
        setTicket(null);
        return;
      }
      if (!res.ok) {
        throw new Error(data.error || "Lookup failed");
      }
      setTicket(data);
      setStatus("found");
    } catch (err) {
      console.error(err);
      setError(
        err instanceof Error ? err.message : "Could not look up ticket."
      );
      setStatus("error");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm sm:items-center sm:p-4 animate-fade-in"
      onClick={(e) => e.target === e.currentTarget && close()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="track-ticket-title"
    >
      <div className="relative flex max-h-[92vh] w-full max-w-xl flex-col overflow-hidden rounded-t-2xl bg-white shadow-2xl sm:rounded-2xl">
        {/* Header */}
        <div className="relative shrink-0 overflow-hidden bg-[#0a1f3d] px-6 py-5 text-white sm:px-8">
          <div className="absolute inset-0 hero-stars opacity-50" />
          <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-[#e31e24]/20 blur-2xl" />
          <div className="relative flex items-start justify-between gap-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#f4d84c]">
                Support
              </p>
              <h2
                id="track-ticket-title"
                className="mt-1 text-xl font-extrabold tracking-tight sm:text-2xl"
              >
                Track your ticket
              </h2>
              <p className="mt-1 text-xs text-white/70 sm:text-sm">
                Enter your reference number and email to see the current status.
              </p>
            </div>
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:bg-white/10"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="custom-scroll flex-1 overflow-y-auto px-6 py-6 sm:px-8">
          {status === "found" && ticket ? (
            <TicketDetails
              ticket={ticket}
              onBack={() => {
                setStatus("idle");
                setTicket(null);
              }}
            />
          ) : (
            <form onSubmit={submit} className="flex flex-col gap-4" noValidate>
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="tt-reference"
                  className="text-xs font-bold text-[#111827]"
                >
                  Reference number
                  <span className="ml-0.5 text-[#e31e24]">*</span>
                </label>
                <input
                  id="tt-reference"
                  type="text"
                  value={reference}
                  onChange={(e) => setReference(e.target.value)}
                  placeholder="e.g. CLO-2026-0042"
                  className="block w-full rounded-md border border-[#e5e7eb] bg-white px-3 py-2.5 text-sm font-mono uppercase text-[#111827] outline-none transition-colors focus:border-[#0a1f3d] focus:ring-2 focus:ring-[#0a1f3d]/10 min-h-11"
                  autoCapitalize="characters"
                  autoCorrect="off"
                  spellCheck={false}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="tt-email"
                  className="text-xs font-bold text-[#111827]"
                >
                  Email used when creating the ticket
                  <span className="ml-0.5 text-[#e31e24]">*</span>
                </label>
                <input
                  id="tt-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="block w-full rounded-md border border-[#e5e7eb] bg-white px-3 py-2.5 text-sm text-[#111827] outline-none transition-colors focus:border-[#0a1f3d] focus:ring-2 focus:ring-[#0a1f3d]/10 min-h-11"
                  autoComplete="email"
                />
              </div>

              {error && (
                <div className="flex items-start gap-2 rounded-md border border-[#fee2e2] bg-[#fef2f2] px-4 py-3 text-sm text-[#dc2626]">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {status === "not_found" && (
                <div className="flex items-start gap-2 rounded-md border border-[#fef3c7] bg-[#fffbeb] px-4 py-3 text-sm text-[#d97706]">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>
                    No ticket found with that reference and email combination.
                    Please double-check both fields.
                  </span>
                </div>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="mt-2 inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-[#e31e24] px-6 font-bold text-white shadow-sm transition-all hover:bg-[#b9141a] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Looking up…
                  </>
                ) : (
                  <>
                    <Search className="h-4 w-4" />
                    Track ticket
                  </>
                )}
              </button>

              <div className="mt-2 border-t border-[#e5e7eb] pt-4 text-center">
                <p className="text-xs text-[#6b7280]">Don&apos;t have a ticket yet?</p>
                <button
                  type="button"
                  onClick={() => {
                    close();
                    setTimeout(openCreate, 250);
                  }}
                  className="mt-1 text-sm font-bold text-[#e31e24] transition-colors hover:text-[#b9141a]"
                >
                  Create a new support ticket →
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

function TicketDetails({
  ticket,
  onBack,
}: {
  ticket: TrackedTicket;
  onBack: () => void;
}) {
  const meta = STATUS_META[ticket.status] || STATUS_META.Open;
  const created = new Date(ticket.createdAt).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  const updated = new Date(ticket.updatedAt).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="flex flex-col gap-4">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex w-fit items-center gap-1 text-xs font-bold text-[#6b7280] transition-colors hover:text-[#0a1f3d]"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Look up another ticket
      </button>

      {/* Status banner */}
      <div
        className="flex items-center justify-between rounded-lg border px-4 py-3"
        style={{ backgroundColor: meta.bg, borderColor: meta.bg }}
      >
        <div className="flex items-center gap-2">
          <span
            className="inline-flex h-7 w-7 items-center justify-center rounded-full"
            style={{ backgroundColor: meta.color, color: "#fff" }}
          >
            {meta.icon}
          </span>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#6b7280]">
              Current status
            </p>
            <p className="text-sm font-bold" style={{ color: meta.color }}>
              {meta.label}
            </p>
          </div>
        </div>
        <span className="font-mono text-sm font-bold text-[#0a1f3d]">
          {ticket.reference}
        </span>
      </div>

      {/* Ticket info */}
      <div className="rounded-lg border border-[#e5e7eb] bg-[#f8fafc] p-4">
        <p className="text-sm font-bold text-[#111827]">{ticket.subject}</p>
        <div className="mt-2 flex flex-wrap gap-2 text-[11px] font-semibold">
          <span className="rounded-full bg-white px-2.5 py-0.5 text-[#6b7280] ring-1 ring-inset ring-[#e5e7eb]">
            {ticket.category}
          </span>
          <span className="rounded-full bg-white px-2.5 py-0.5 text-[#6b7280] ring-1 ring-inset ring-[#e5e7eb]">
            {ticket.priority} priority
          </span>
          <span className="rounded-full bg-white px-2.5 py-0.5 text-[#6b7280] ring-1 ring-inset ring-[#e5e7eb]">
            Submitted by {ticket.name}
          </span>
        </div>
      </div>

      {/* Description */}
      <div>
        <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-[#9ca3af]">
          Your description
        </p>
        <p className="whitespace-pre-wrap rounded-lg border border-[#e5e7eb] bg-white p-4 text-sm leading-relaxed text-[#111827]">
          {ticket.description}
        </p>
      </div>

      {/* Reply */}
      {ticket.reply && (
        <div>
          <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-[#9ca3af]">
            Reply from our team
          </p>
          <div className="whitespace-pre-wrap rounded-lg border border-[#d1fae5] bg-[#f0fdf4] p-4 text-sm leading-relaxed text-[#111827]">
            {ticket.reply}
          </div>
        </div>
      )}

      {/* Timestamps */}
      <div className="border-t border-[#e5e7eb] pt-4 text-[11px] text-[#6b7280]">
        <p>Submitted: {created}</p>
        <p>Last updated: {updated}</p>
        {ticket.resolvedAt && (
          <p>
            Resolved:{" "}
            {new Date(ticket.resolvedAt).toLocaleString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        )}
      </div>
    </div>
  );
}
