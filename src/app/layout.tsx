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
  title: "Placement Portal — Smart, Fair & Transparent School Placement",
  description:
    "Easily check your senior high school placement status. Enter your index number and date of birth to view your school placement. Fast, secure, and accessible 24/7.",
  keywords: [
    "school placement",
    "SHS placement",
    "education portal",
    "student placement",
    "placement checker",
  ],
  authors: [{ name: "Placement Portal" }],
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
        className={`${inter.variable} font-sans antialiased bg-white text-[#0c294c]`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
