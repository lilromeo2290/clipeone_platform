import nodemailer from "nodemailer";

/**
 * Gmail SMTP transporter.
 * Requires the following env vars:
 *   - GMAIL_USER         (e.g. support@clipeone.com or your personal Gmail)
 *   - GMAIL_APP_PASSWORD (16-char App Password from https://myaccount.google.com/apppasswords)
 *
 * If the env vars are missing, sendMail becomes a no-op and the ticket is still
 * saved to the database — so the form works even before email is configured.
 */

const hasCreds = !!process.env.GMAIL_USER && !!process.env.GMAIL_APP_PASSWORD;

const transporter = hasCreds
  ? nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER!,
        pass: process.env.GMAIL_APP_PASSWORD!,
      },
    })
  : null;

export const emailConfigured = hasCreds;
export const supportInbox = process.env.GMAIL_USER || "support@clipeone.com";

interface SendMailArgs {
  to: string;
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
}

export async function sendMail(args: SendMailArgs): Promise<boolean> {
  if (!transporter) {
    console.warn(
      "[email] GMAIL_USER / GMAIL_APP_PASSWORD not set — skipping sendMail to",
      args.to
    );
    return false;
  }
  try {
    await transporter.sendMail({
      from: `"ClipeOne Support" <${process.env.GMAIL_USER}>`,
      to: args.to,
      subject: args.subject,
      text: args.text,
      html: args.html,
      replyTo: args.replyTo,
    });
    return true;
  } catch (err) {
    console.error("[email] sendMail failed:", err);
    return false;
  }
}
