/**
 * Live Chat helper — opens Tawk.to if loaded, otherwise falls back to WhatsApp.
 *
 * Behaviour:
 *   - If Tawk.to script has loaded (window.Tawk_API.popup exists) → open Tawk.to chat
 *   - Otherwise → open WhatsApp deep link in a new tab
 *
 * To activate Tawk.to, set these env vars (already wired in layout.tsx):
 *   NEXT_PUBLIC_TAWK_PROPERTY_ID  (24-char hex, e.g. "6848a7afe7d8d619164a2e8d")
 *   NEXT_PUBLIC_TAWK_WIDGET_ID    (short string, e.g. "1itdsu268")
 *
 * Until then, this helper gracefully falls back to WhatsApp.
 */

export const WHATSAPP_NUMBER = "233249783637"; // 024 978 3637
const WHATSAPP_PREFILL = "Hi ClipeOne Support, I have a question about...";
export const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_PREFILL
)}`;

export const tawkConfigured =
  !!process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID &&
  !!process.env.NEXT_PUBLIC_TAWK_WIDGET_ID;

/** Returns true if Tawk.to script has loaded and chat is available. */
function tawkIsReady(): boolean {
  if (typeof window === "undefined") return false;
  const api = window.Tawk_API;
  if (!api) return false;
  // popup() is what opens the chat window
  return typeof api.popup === "function" || typeof api.toggle === "function";
}

/**
 * Open the live chat — tries Tawk.to first, falls back to WhatsApp.
 * Call this from any "Live Chat" button.
 */
export function openLiveChat(): void {
  if (tawkIsReady()) {
    try {
      // popup() opens the chat window
      if (typeof window.Tawk_API!.popup === "function") {
        window.Tawk_API!.popup!();
        return;
      }
      // Fallback: toggle()
      if (typeof window.Tawk_API!.toggle === "function") {
        window.Tawk_API!.toggle!();
        return;
      }
    } catch (err) {
      console.warn("[tawk] failed to open chat, falling back to WhatsApp:", err);
    }
  }
  // Fallback: WhatsApp deep link
  if (typeof window !== "undefined") {
    window.open(whatsappHref, "_blank", "noopener,noreferrer");
  }
}

/**
 * Returns a human-readable label for the Live Chat button.
 * Lets the UI show "via Tawk.to" vs "via WhatsApp" appropriately.
 */
export function liveChatLabel(): string {
  return tawkIsReady() ? "Live Chat" : "Live Chat · WhatsApp";
}
