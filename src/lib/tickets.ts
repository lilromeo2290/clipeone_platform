import { db } from "@/lib/db";
import { sendMail, supportInbox, emailConfigured } from "@/lib/email";

export const TICKET_CATEGORIES = [
  "Account access",
  "Billing",
  "Bug report",
  "Feature request",
  "General question",
] as const;

export const TICKET_PRIORITIES = ["Low", "Normal", "Urgent"] as const;

export type TicketCategory = (typeof TICKET_CATEGORIES)[number];
export type TicketPriority = (typeof TICKET_PRIORITIES)[number];

export interface CreateTicketInput {
  name: string;
  email: string;
  phone?: string;
  category: string;
  priority: string;
  subject: string;
  description: string;
  // Honeypot — must be empty
  website?: string;
}

/**
 * Generates a human-friendly reference like "CLO-2026-0042".
 * Format: CLO-YYYY-NNNN where NNNN is the per-year sequence.
 */
async function generateReference(): Promise<string> {
  const year = new Date().getFullYear();
  // Count existing tickets this year to compute the sequence.
  // We use a substring match on the reference prefix.
  const prefix = `CLO-${year}-`;
  const existing = await db.ticket.findMany({
    where: { reference: { startsWith: prefix } },
    select: { reference: true },
  });
  const maxSeq = existing.reduce((max, t) => {
    const n = parseInt(t.reference.replace(prefix, ""), 10);
    return Number.isFinite(n) ? Math.max(max, n) : max;
  }, 0);
  const next = (maxSeq + 1).toString().padStart(4, "0");
  return `${prefix}${next}`;
}

export interface CreatedTicket {
  id: string;
  reference: string;
  status: string;
  createdAt: Date;
  emailSentToUser: boolean;
  emailSentToSupport: boolean;
}

export async function createTicket(
  input: CreateTicketInput
): Promise<CreatedTicket> {
  const reference = await generateReference();

  const ticket = await db.ticket.create({
    data: {
      reference,
      name: input.name.trim(),
      email: input.email.trim().toLowerCase(),
      phone: input.phone?.trim() || null,
      category: input.category,
      priority: input.priority,
      subject: input.subject.trim(),
      description: input.description.trim(),
      status: "Open",
    },
  });

  // Fire both emails in parallel — don't block the response on email failures.
  const [emailSentToUser, emailSentToSupport] = await Promise.all([
    sendMail({
      to: ticket.email,
      subject: `[${ticket.reference}] We received your support request`,
      replyTo: supportInbox,
      text: `Hi ${ticket.name},\n\nWe received your support request and our team will get back to you shortly.\n\nReference: ${ticket.reference}\nSubject: ${ticket.subject}\nCategory: ${ticket.category}\nPriority: ${ticket.priority}\n\nYou can reply to this email if you have additional details.\n\n— ClipeOne Support`,
      html: userConfirmationHtml(ticket),
    }),
    sendMail({
      to: supportInbox,
      subject: `[${ticket.reference}] New ${ticket.priority} ticket: ${ticket.subject}`,
      replyTo: ticket.email,
      text: `New support ticket submitted.\n\nReference: ${ticket.reference}\nName: ${ticket.name}\nEmail: ${ticket.email}\nPhone: ${ticket.phone || "—"}\nCategory: ${ticket.category}\nPriority: ${ticket.priority}\nSubject: ${ticket.subject}\n\nDescription:\n${ticket.description}\n`,
      html: supportNotificationHtml(ticket),
    }),
  ]);

  return {
    id: ticket.id,
    reference: ticket.reference,
    status: ticket.status,
    createdAt: ticket.createdAt,
    emailSentToUser,
    emailSentToSupport,
  };
}

export interface TrackedTicket {
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

export async function trackTicket(
  reference: string,
  email: string
): Promise<TrackedTicket | null> {
  const ticket = await db.ticket.findUnique({
    where: { reference: reference.trim().toUpperCase() },
  });
  if (!ticket) return null;
  // Require the email to match — prevents enumeration of references.
  if (ticket.email !== email.trim().toLowerCase()) return null;
  return {
    reference: ticket.reference,
    name: ticket.name,
    subject: ticket.subject,
    category: ticket.category,
    priority: ticket.priority,
    status: ticket.status,
    description: ticket.description,
    reply: ticket.reply,
    createdAt: ticket.createdAt.toISOString(),
    updatedAt: ticket.updatedAt.toISOString(),
    resolvedAt: ticket.resolvedAt?.toISOString() || null,
  };
}

// ===== Email HTML templates =====

function userConfirmationHtml(t: {
  reference: string;
  name: string;
  subject: string;
  category: string;
  priority: string;
  description: string;
}): string {
  return `<!doctype html>
<html>
  <body style="font-family:Inter,Arial,sans-serif;background:#f8fafc;padding:32px 0;margin:0;">
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">
      <tr><td style="background:#0a1f3d;padding:24px 32px;">
        <p style="margin:0;color:#ffffff;font-size:18px;font-weight:700;">ClipeOne Support</p>
        <p style="margin:4px 0 0;color:#f4d84c;font-size:11px;font-weight:600;letter-spacing:0.18em;text-transform:uppercase;">One Platform. Every Solution.</p>
      </td></tr>
      <tr><td style="padding:32px;color:#111827;">
        <p style="margin:0 0 8px;font-size:18px;font-weight:700;">Hi ${escapeHtml(t.name)},</p>
        <p style="margin:0 0 16px;color:#374151;font-size:14px;line-height:1.6;">We received your support request and our team will get back to you shortly. Keep your reference number handy — you can use it to track the status of your ticket.</p>
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:#f8fafc;border:1px solid #e5e7eb;border-radius:8px;padding:16px;margin:16px 0;">
          <tr><td style="color:#6b7280;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;">Reference</td><td style="color:#0a1f3d;font-size:14px;font-weight:700;text-align:right;">${t.reference}</td></tr>
          <tr><td style="padding-top:8px;color:#6b7280;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;">Subject</td><td style="padding-top:8px;color:#111827;font-size:14px;text-align:right;">${escapeHtml(t.subject)}</td></tr>
          <tr><td style="padding-top:8px;color:#6b7280;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;">Category</td><td style="padding-top:8px;color:#111827;font-size:14px;text-align:right;">${escapeHtml(t.category)}</td></tr>
          <tr><td style="padding-top:8px;color:#6b7280;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;">Priority</td><td style="padding-top:8px;color:#111827;font-size:14px;text-align:right;">${escapeHtml(t.priority)}</td></tr>
        </table>
        <p style="margin:16px 0 0;color:#6b7280;font-size:12px;line-height:1.6;">You can reply to this email if you have additional details. Our typical response time is under five minutes during working hours (Mon–Fri, 8:00–18:00).</p>
      </td></tr>
      <tr><td style="background:#f8fafc;border-top:1px solid #e5e7eb;padding:16px 32px;">
        <p style="margin:0;color:#9ca3af;font-size:11px;">© 2026 ClipeConsult. All rights reserved.</p>
      </td></tr>
    </table>
  </body>
</html>`;
}

function supportNotificationHtml(t: {
  reference: string;
  name: string;
  email: string;
  phone: string | null;
  category: string;
  priority: string;
  subject: string;
  description: string;
}): string {
  const priorityColor =
    t.priority === "Urgent" ? "#dc2626" : t.priority === "Low" ? "#6b7280" : "#059669";
  return `<!doctype html>
<html>
  <body style="font-family:Inter,Arial,sans-serif;background:#f8fafc;padding:32px 0;margin:0;">
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">
      <tr><td style="background:#0a1f3d;padding:20px 32px;">
        <p style="margin:0;color:#ffffff;font-size:16px;font-weight:700;">New support ticket — ${t.reference}</p>
        <p style="margin:4px 0 0;color:#f4d84c;font-size:11px;font-weight:600;letter-spacing:0.18em;text-transform:uppercase;">${escapeHtml(t.priority)} priority</p>
      </td></tr>
      <tr><td style="padding:24px 32px;color:#111827;">
        <p style="margin:0 0 4px;font-size:18px;font-weight:700;">${escapeHtml(t.subject)}</p>
        <p style="margin:0 0 16px;color:#6b7280;font-size:12px;">${escapeHtml(t.category)} · <span style="color:${priorityColor};font-weight:700;">${escapeHtml(t.priority)}</span></p>
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:#f8fafc;border:1px solid #e5e7eb;border-radius:8px;padding:12px 16px;margin:16px 0;">
          <tr><td style="color:#6b7280;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;">From</td><td style="color:#0a1f3d;font-size:14px;font-weight:700;text-align:right;">${escapeHtml(t.name)}</td></tr>
          <tr><td style="padding-top:6px;color:#6b7280;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;">Email</td><td style="padding-top:6px;color:#2563eb;font-size:14px;text-align:right;">${escapeHtml(t.email)}</td></tr>
          <tr><td style="padding-top:6px;color:#6b7280;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;">Phone</td><td style="padding-top:6px;color:#111827;font-size:14px;text-align:right;">${t.phone ? escapeHtml(t.phone) : "—"}</td></tr>
        </table>
        <p style="margin:16px 0 4px;color:#6b7280;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;">Description</p>
        <p style="margin:0;color:#111827;font-size:14px;line-height:1.6;white-space:pre-wrap;">${escapeHtml(t.description)}</p>
      </td></tr>
      <tr><td style="background:#f8fafc;border-top:1px solid #e5e7eb;padding:16px 32px;">
        <p style="margin:0;color:#9ca3af;font-size:11px;">Reply directly to this email to respond to the customer.</p>
      </td></tr>
    </table>
  </body>
</html>`;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export { emailConfigured };
