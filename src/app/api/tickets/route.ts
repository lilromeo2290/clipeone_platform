import { NextRequest, NextResponse } from "next/server";
import { createTicket, TICKET_CATEGORIES, TICKET_PRIORITIES } from "@/lib/tickets";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_SUBJECT = 120;
const MAX_DESCRIPTION = 4000;

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  // Honeypot — silently accept but discard if filled (bot bait).
  const website = typeof body.website === "string" ? body.website : "";
  if (website) {
    // Pretend success so bots don't retry.
    return NextResponse.json({
      reference: "CLO-0000-0000",
      status: "Open",
      createdAt: new Date().toISOString(),
      emailSentToUser: false,
      emailSentToSupport: false,
    });
  }

  const name = String(body.name || "").trim();
  const email = String(body.email || "").trim().toLowerCase();
  const phone = String(body.phone || "").trim();
  const category = String(body.category || "").trim();
  const priority = String(body.priority || "Normal").trim();
  const subject = String(body.subject || "").trim();
  const description = String(body.description || "").trim();

  // Validation
  const errors: Record<string, string> = {};
  if (name.length < 2) errors.name = "Please enter your full name.";
  if (!EMAIL_RE.test(email)) errors.email = "Please enter a valid email address.";
  if (!TICKET_CATEGORIES.includes(category as never))
    errors.category = "Please select a category.";
  if (!TICKET_PRIORITIES.includes(priority as never))
    errors.priority = "Please select a priority.";
  if (subject.length < 4) errors.subject = "Subject must be at least 4 characters.";
  if (subject.length > MAX_SUBJECT) errors.subject = `Subject must be under ${MAX_SUBJECT} characters.`;
  if (description.length < 10)
    errors.description = "Description must be at least 10 characters.";
  if (description.length > MAX_DESCRIPTION)
    errors.description = `Description must be under ${MAX_DESCRIPTION} characters.`;

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ error: "Validation failed", fields: errors }, { status: 422 });
  }

  try {
    const ticket = await createTicket({
      name,
      email,
      phone: phone || undefined,
      category,
      priority,
      subject,
      description,
    });
    return NextResponse.json(ticket, { status: 201 });
  } catch (err) {
    console.error("[api/tickets] createTicket failed:", err);
    return NextResponse.json(
      { error: "Could not create ticket. Please try again." },
      { status: 500 }
    );
  }
}
