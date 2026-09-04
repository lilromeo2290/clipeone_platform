"use client";

import { useEffect, useState } from "react";
import {
  X,
  Send,
  Loader2,
  CheckCircle2,
  Search,
  AlertCircle,
  Mail,
  MessageCircle,
} from "lucide-react";
import { useSupportModal } from "./support-modal-context";

// WhatsApp deep link — shared across components (kept in sync manually)
const WHATSAPP_NUMBER = "233249783637";
const WHATSAPP_PREFILL = "Hi ClipeOne Support, I have a question about...";
const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_PREFILL
)}`;

type Status = "idle" | "submitting" | "success" | "error";

interface FormState {
  name: string;
  email: string;
  phone: string;
  category: string;
  priority: string;
  subject: string;
  description: string;
  website: string; // honeypot
}

const INITIAL: FormState = {
  name: "",
  email: "",
  phone: "",
  category: "",
  priority: "Normal",
  subject: "",
  description: "",
  website: "",
};

const CATEGORIES = [
  "Account access",
  "Billing",
  "Bug report",
  "Feature request",
  "General question",
];

const PRIORITIES = [
  { value: "Low", label: "Low", desc: "No rush" },
  { value: "Normal", label: "Normal", desc: "Default" },
  { value: "Urgent", label: "Urgent", desc: "ASAP" },
];

const MAX_DESC = 4000;

export function SupportTicketModal() {
  const { open, close, openTrack } = useSupportModal();
  const isOpen = open === "create";

  const [form, setForm] = useState<FormState>(INITIAL);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [reference, setReference] = useState<string>("");

  // Reset everything when the modal closes.
  useEffect(() => {
    if (!isOpen) {
      const t = setTimeout(() => {
        setForm(INITIAL);
        setStatus("idle");
        setErrors({});
        setServerError(null);
        setReference("");
      }, 200);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  // Close on Escape
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

  const update = (key: keyof FormState, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) {
      setErrors((e) => {
        const next = { ...e };
        delete next[key];
        return next;
      });
    }
  };

  const validate = (): boolean => {
    const next: Record<string, string> = {};
    if (form.name.trim().length < 2) next.name = "Please enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = "Please enter a valid email address.";
    if (!form.category) next.category = "Please select a category.";
    if (form.subject.trim().length < 4)
      next.subject = "Subject must be at least 4 characters.";
    if (form.description.trim().length < 10)
      next.description = "Description must be at least 10 characters.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);
    if (!validate()) return;
    setStatus("submitting");
    try {
      const res = await fetch("/api/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        if (data.fields) {
          setErrors(data.fields);
          setStatus("idle");
          return;
        }
        throw new Error(data.error || "Request failed");
      }
      setReference(data.reference);
      setStatus("success");
    } catch (err) {
      console.error(err);
      setServerError(
        err instanceof Error
          ? err.message
          : "Could not submit ticket. Please try again."
      );
      setStatus("error");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-0 backdrop-blur-sm sm:items-center sm:p-4 animate-fade-in"
      onClick={(e) => e.target === e.currentTarget && close()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="support-ticket-title"
    >
      <div className="relative flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-2xl bg-white shadow-2xl sm:rounded-2xl">
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
                id="support-ticket-title"
                className="mt-1 text-xl font-extrabold tracking-tight sm:text-2xl"
              >
                {status === "success" ? "Ticket submitted" : "Create Support Ticket"}
              </h2>
              <p className="mt-1 text-xs text-white/70 sm:text-sm">
                {status === "success"
                  ? "We've received your request — check your inbox."
                  : "Tell us what's going on and we'll get back to you."}
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
          {status === "success" ? (
            <SuccessView
              reference={reference}
              email={form.email}
              onTrack={() => {
                close();
                setTimeout(openTrack, 250);
              }}
              onClose={close}
            />
          ) : (
            <form onSubmit={submit} className="flex flex-col gap-4" noValidate>
              {/* Honeypot — hidden from users, bots fill it in */}
              <input
                type="text"
                name="website"
                value={form.website}
                onChange={(e) => update("website", e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute -left-[9999px] h-0 w-0 opacity-0"
              />

              {/* Name + Email */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field
                  label="Full name"
                  required
                  error={errors.name}
                  htmlFor="st-name"
                >
                  <input
                    id="st-name"
                    type="text"
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    placeholder="e.g. Ama Mensah"
                    className={inputClass(errors.name)}
                    autoComplete="name"
                  />
                </Field>
                <Field
                  label="Email"
                  required
                  error={errors.email}
                  htmlFor="st-email"
                >
                  <input
                    id="st-email"
                    type="email"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    placeholder="you@example.com"
                    className={inputClass(errors.email)}
                    autoComplete="email"
                  />
                </Field>
              </div>

              {/* Phone + Category */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Phone (optional)" htmlFor="st-phone">
                  <input
                    id="st-phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    placeholder="+233 24 000 0000"
                    className={inputClass()}
                    autoComplete="tel"
                  />
                </Field>
                <Field
                  label="Category"
                  required
                  error={errors.category}
                  htmlFor="st-category"
                >
                  <select
                    id="st-category"
                    value={form.category}
                    onChange={(e) => update("category", e.target.value)}
                    className={inputClass(errors.category)}
                  >
                    <option value="">Select…</option>
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>

              {/* Priority */}
              <Field label="Priority" htmlFor="st-priority">
                <div className="grid grid-cols-3 gap-2">
                  {PRIORITIES.map((p) => {
                    const isActive = form.priority === p.value;
                    return (
                      <button
                        key={p.value}
                        type="button"
                        onClick={() => update("priority", p.value)}
                        className={`flex flex-col items-center justify-center gap-0.5 rounded-lg border px-3 py-2.5 text-center transition-all ${
                          isActive
                            ? "border-[#0a1f3d] bg-[#0a1f3d] text-white shadow-sm"
                            : "border-[#e5e7eb] bg-white text-[#111827] hover:border-[#0a1f3d]/30"
                        }`}
                      >
                        <span className="text-sm font-bold">{p.label}</span>
                        <span
                          className={`text-[10px] ${
                            isActive ? "text-white/70" : "text-[#6b7280]"
                          }`}
                        >
                          {p.desc}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </Field>

              {/* Subject */}
              <Field
                label="Subject"
                required
                error={errors.subject}
                htmlFor="st-subject"
              >
                <input
                  id="st-subject"
                  type="text"
                  value={form.subject}
                  onChange={(e) => update("subject", e.target.value)}
                  placeholder="One-line summary of the issue"
                  className={inputClass(errors.subject)}
                  maxLength={120}
                />
              </Field>

              {/* Description */}
              <Field
                label="Description"
                required
                error={errors.description}
                htmlFor="st-description"
                hint={`${form.description.length} / ${MAX_DESC}`}
              >
                <textarea
                  id="st-description"
                  value={form.description}
                  onChange={(e) => update("description", e.target.value)}
                  placeholder="Describe the issue in detail — what you expected, what happened, and any steps to reproduce."
                  rows={5}
                  className={`${inputClass(errors.description)} resize-y min-h-[120px]`}
                  maxLength={MAX_DESC}
                />
              </Field>

              {serverError && (
                <div className="flex items-start gap-2 rounded-md border border-[#fee2e2] bg-[#fef2f2] px-4 py-3 text-sm text-[#dc2626]">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>{serverError}</span>
                </div>
              )}

              {/* Submit */}
              <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-[#6b7280]">
                  We typically respond in under 5 minutes during working hours.
                </p>
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-[#e31e24] px-6 font-bold text-white shadow-sm transition-all hover:bg-[#b9141a] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === "submitting" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Submitting…
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Submit ticket
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

function SuccessView({
  reference,
  email,
  onTrack,
  onClose,
}: {
  reference: string;
  email: string;
  onTrack: () => void;
  onClose: () => void;
}) {
  return (
    <div className="flex flex-col items-center gap-5 py-6 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#d1fae5] text-[#059669]">
        <CheckCircle2 className="h-9 w-9" />
      </div>
      <div>
        <h3 className="text-xl font-extrabold tracking-tight text-[#111827]">
          We received your ticket
        </h3>
        <p className="mt-1 text-sm text-[#6b7280]">
          A confirmation email is on its way to{" "}
          <strong className="text-[#111827]">{email}</strong>.
        </p>
      </div>

      <div className="w-full rounded-lg border border-[#e5e7eb] bg-[#f8fafc] p-4">
        <p className="text-[10px] font-bold uppercase tracking-wider text-[#9ca3af]">
          Your reference number
        </p>
        <p className="mt-1 text-2xl font-extrabold tracking-tight text-[#0a1f3d]">
          {reference}
        </p>
        <p className="mt-2 text-xs text-[#6b7280]">
          Save this number — you can use it to track the status of your ticket
          anytime.
        </p>
      </div>

      {/* Live Chat escalation — for users who want a faster reply */}
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-[#25D366] px-5 text-sm font-bold text-white transition-colors hover:bg-[#1ebe57]"
      >
        <MessageCircle className="h-4 w-4" />
        Need a faster reply? Live Chat on WhatsApp
      </a>

      <div className="flex w-full flex-col gap-2 sm:flex-row">
        <button
          type="button"
          onClick={onTrack}
          className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-md border border-[#e5e7eb] bg-white px-5 text-sm font-bold text-[#0a1f3d] transition-colors hover:bg-[#f8fafc]"
        >
          <Search className="h-4 w-4" />
          Track my ticket
        </button>
        <button
          type="button"
          onClick={onClose}
          className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-md bg-[#0a1f3d] px-5 text-sm font-bold text-white transition-colors hover:bg-[#1e3a8a]"
        >
          <Mail className="h-4 w-4" />
          Done
        </button>
      </div>
    </div>
  );
}

function Field({
  label,
  htmlFor,
  required,
  error,
  hint,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-baseline justify-between gap-2">
        <label htmlFor={htmlFor} className="text-xs font-bold text-[#111827]">
          {label}
          {required && <span className="ml-0.5 text-[#e31e24]">*</span>}
        </label>
        {hint && <span className="text-[10px] text-[#9ca3af]">{hint}</span>}
      </div>
      {children}
      {error && <p className="text-[11px] font-medium text-[#dc2626]">{error}</p>}
    </div>
  );
}

function inputClass(error?: string): string {
  return `block w-full rounded-md border bg-white px-3 text-sm text-[#111827] outline-none transition-colors focus:ring-2 min-h-11 py-2.5 ${
    error
      ? "border-[#dc2626] focus:border-[#dc2626] focus:ring-[#dc2626]/10"
      : "border-[#e5e7eb] focus:border-[#0a1f3d] focus:ring-[#0a1f3d]/10"
  }`;
}
