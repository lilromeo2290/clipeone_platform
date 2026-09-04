import { NextRequest, NextResponse } from "next/server";
import { trackTicket } from "@/lib/tickets";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const reference = (searchParams.get("reference") || "").trim().toUpperCase();
  const email = (searchParams.get("email") || "").trim().toLowerCase();

  if (!reference) {
    return NextResponse.json(
      { error: "Reference number is required." },
      { status: 400 }
    );
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "Please enter the email address used when creating the ticket." },
      { status: 400 }
    );
  }

  try {
    const ticket = await trackTicket(reference, email);
    if (!ticket) {
      // Same error for "not found" and "email mismatch" to prevent enumeration.
      return NextResponse.json(
        { error: "No ticket found with that reference and email combination." },
        { status: 404 }
      );
    }
    return NextResponse.json(ticket);
  } catch (err) {
    console.error("[api/tickets/track] failed:", err);
    return NextResponse.json(
      { error: "Could not look up ticket. Please try again." },
      { status: 500 }
    );
  }
}
