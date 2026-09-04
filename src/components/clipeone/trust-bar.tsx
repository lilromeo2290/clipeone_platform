"use client";

import { Lock, TrendingUp, Puzzle, Headphones } from "lucide-react";

const TRUST = [
  {
    icon: <Lock className="h-6 w-6" />,
    title: "Secure & Reliable",
    desc: "Your data is safe with us",
    color: "#1e3a8a",
  },
  {
    icon: <TrendingUp className="h-6 w-6" />,
    title: "Scalable Solutions",
    desc: "Systems that grow with you",
    color: "#059669",
  },
  {
    icon: <Puzzle className="h-6 w-6" />,
    title: "Easy Integration",
    desc: "Connect and work seamlessly",
    color: "#f97316",
  },
  {
    icon: <Headphones className="h-6 w-6" />,
    title: "24/7 Support",
    desc: "We are here to help always",
    color: "#dc2626",
  },
];

export function TrustBar() {
  return (
    <section className="rounded-xl border border-[#e5e7eb] bg-white p-5 sm:p-6 shadow-soft">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {TRUST.map((item) => (
          <div
            key={item.title}
            className="flex items-center gap-3.5 lg:justify-center lg:text-center"
          >
            <span
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#f8fafc]"
              style={{ color: item.color }}
            >
              {item.icon}
            </span>
            <div className="flex flex-col">
              <p className="text-sm font-bold text-[#111827]">{item.title}</p>
              <p className="text-xs text-[#6b7280]">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
