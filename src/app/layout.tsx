import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

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
        {children}
        <Toaster />
      </body>
    </html>
  );
}
