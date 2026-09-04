import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { SupportModalProvider } from "@/components/clipeone/support-modal-context";
import { SupportLauncher } from "@/components/clipeone/support-launcher";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ClipeOne Platform — One Platform. Every Solution.",
  description:
    "Discover, subscribe, and manage the best software applications for your organization or business. ClipeOne brings every solution into one powerful platform.",
  keywords: [
    "ClipeOne",
    "SaaS platform",
    "business applications",
    "software marketplace",
    "enterprise solutions",
  ],
  authors: [{ name: "ClipeOne" }],
  icons: {
    icon: "/logo.svg",
  },
};

// Tawk.to configuration — read from env vars.
// Until these are set, the Live Chat button falls back to WhatsApp.
const TAWK_PROPERTY_ID = process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID;
const TAWK_WIDGET_ID = process.env.NEXT_PUBLIC_TAWK_WIDGET_ID;
const tawkEnabled = !!TAWK_PROPERTY_ID && !!TAWK_WIDGET_ID;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} font-sans antialiased bg-[#f8fafc] text-[#111827]`}
      >
        <SupportModalProvider>
          {children}
          <SupportLauncher />
        </SupportModalProvider>
        <Toaster />

        {/* Tawk.to live chat — only loads if env vars are set.
            Hides Tawk.to's default floating button so we can trigger chat from our own UI. */}
        {tawkEnabled && (
          <Script
            id="tawk-to-loader"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                var Tawk_API = Tawk_API || {};
                var Tawk_LoadStart = new Date();
                Tawk_API.onLoad = function () {
                  try {
                    if (typeof Tawk_API.hideTawkButton === 'function') {
                      Tawk_API.hideTawkButton();
                    }
                  } catch (e) {
                    // ignore — chat API still works without hiding the button
                  }
                };
                (function () {
                  var s1 = document.createElement("script");
                  var s0 = document.getElementsByTagName("script")[0];
                  s1.async = true;
                  s1.src = 'https://embed.tawk.to/${TAWK_PROPERTY_ID}/${TAWK_WIDGET_ID}';
                  s1.charset = 'UTF-8';
                  s1.setAttribute('crossorigin', '*');
                  s0.parentNode.insertBefore(s1, s0);
                })();
              `,
            }}
          />
        )}
      </body>
    </html>
  );
}
