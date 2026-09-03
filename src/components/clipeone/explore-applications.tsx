"use client";

import { useMemo, useState } from "react";
import { Globe, LayoutGrid, ArrowRight, ExternalLink, ChevronUp } from "lucide-react";

interface Category {
  name: string;
  desc: string;
  count: number;
  icon: React.ReactNode;
  color: string;
  tag: string;
  metricLabel: string;
}

interface WebsiteEntry {
  name: string;
  url: string;
  domain: string;
  category: string;
}

const CATEGORIES: Category[] = [
  {
    name: "Websites",
    desc: "Public-facing websites, portals, and online presence for organizations and businesses.",
    count: 9,
    icon: <Globe className="h-5 w-5" />,
    color: "#1e3a8a",
    tag: "Websites",
    metricLabel: "Websites",
  },
  {
    name: "Platforms",
    desc: "Operational platforms, dashboards, and internal systems for growing companies.",
    count: 1,
    icon: <LayoutGrid className="h-5 w-5" />,
    color: "#f97316",
    tag: "Platforms",
    metricLabel: "Platform",
  },
];

const WEBSITES: WebsiteEntry[] = [
  {
    name: "Global Experience GH",
    url: "https://globalexperiencegh.org/",
    domain: "globalexperiencegh.org",
    category: "Non-profit",
  },
  {
    name: "Dwell Chronicles GH",
    url: "https://dwellchroniclesgh.com/",
    domain: "dwellchroniclesgh.com",
    category: "Lifestyle",
  },
  {
    name: "SIV Engineering",
    url: "https://sivengineering.com/",
    domain: "sivengineering.com",
    category: "Engineering",
  },
  {
    name: "PYC Club",
    url: "https://pycclub.org/",
    domain: "pycclub.org",
    category: "Community",
  },
  {
    name: "Rasmuta Foundation",
    url: "https://rasmutafoundation.org/",
    domain: "rasmutafoundation.org",
    category: "Foundation",
  },
  {
    name: "24 Hour News Online",
    url: "https://24hournewsonline.com/",
    domain: "24hournewsonline.com",
    category: "News & Media",
  },
  {
    name: "Volta Tourism Hub",
    url: "https://voltatourismhub.com/",
    domain: "voltatourismhub.com",
    category: "Tourism",
  },
  {
    name: "Fafa AFM Online",
    url: "https://fafaafmonline.com/",
    domain: "fafaafmonline.com",
    category: "Faith",
  },
  {
    name: "Duamene Fafa Foundation",
    url: "https://www.duamenefafafoundation.org/",
    domain: "duamenefafafoundation.org",
    category: "Foundation",
  },
];

const PLATFORMS: WebsiteEntry[] = [
  {
    name: "ClipeGov RMS",
    url: "https://rms.clipeconsult.com/",
    domain: "rms.clipeconsult.com",
    category: "Government",
  },
];

const TABS = ["All Categories", "Websites", "Platforms"];

const CATEGORY_COLORS: Record<string, string> = {
  "Non-profit": "#059669",
  Lifestyle: "#7c3aed",
  Engineering: "#0d9488",
  Community: "#2563eb",
  Foundation: "#dc2626",
  "News & Media": "#f97316",
  Tourism: "#0d9488",
  Faith: "#1e3a8a",
  Government: "#1e3a8a",
};

const faviconFor = (url: string) =>
  `https://www.google.com/s2/favicons?domain=${encodeURIComponent(
    url
  )}&sz=64`;

export function ExploreApplications() {
  const [active, setActive] = useState("All Categories");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (active === "All Categories") return CATEGORIES;
    return CATEGORIES.filter((c) => c.tag === active);
  }, [active]);

  const expandedEntries: WebsiteEntry[] =
    expanded === "Websites"
      ? WEBSITES
      : expanded === "Platforms"
        ? PLATFORMS
        : [];

  return (
    <section
      id="explore"
      className="rounded-xl border border-[#e5e7eb] bg-white p-5 sm:p-6 shadow-soft"
    >
      <header className="mb-5 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold tracking-tight text-[#111827] sm:text-xl">
            Websites and Platforms
          </h2>
          <p className="mt-0.5 text-xs text-[#6b7280] sm:text-sm">
            Browse our websites and platforms to find the right solution
          </p>
        </div>
        <a
          href="#"
          className="group inline-flex items-center gap-1 whitespace-nowrap text-sm font-semibold text-[#e31e24] transition-colors hover:text-[#b9141a]"
        >
          View All
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </a>
      </header>

      {/* Filter tabs */}
      <div className="mb-5 -mx-1 flex gap-2 overflow-x-auto px-1 pb-1 no-scrollbar">
        {TABS.map((tab) => {
          const isActive = tab === active;
          return (
            <button
              key={tab}
              type="button"
              onClick={() => setActive(tab)}
              className={`inline-flex h-9 shrink-0 items-center whitespace-nowrap rounded-full px-4 text-sm font-semibold transition-all ${
                isActive
                  ? "bg-[#e31e24] text-white shadow-sm"
                  : "bg-[#f3f4f6] text-[#6b7280] hover:bg-[#e5e7eb] hover:text-[#111827]"
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* Category cards */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {filtered.map((cat) => {
          const isExpanded = expanded === cat.tag;
          return (
            <article
              key={cat.name}
              className={`group flex flex-col gap-3 rounded-lg border bg-white p-4 transition-all hover:-translate-y-0.5 hover:shadow-soft-lg ${
                isExpanded
                  ? "border-[#0a1f3d]/30 shadow-soft-lg"
                  : "border-[#e5e7eb] hover:border-[#0a1f3d]/20"
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-lg text-white"
                  style={{ backgroundColor: cat.color }}
                >
                  {cat.icon}
                </span>
                <div className="flex flex-col">
                  <p className="text-sm font-bold leading-tight text-[#111827]">
                    {cat.name}
                  </p>
                  <p className="text-xs font-semibold text-[#2563eb]">
                    {cat.count} {cat.metricLabel}
                  </p>
                </div>
              </div>

              <p className="text-xs leading-relaxed text-[#6b7280]">
                {cat.desc}
              </p>

              <button
                type="button"
                onClick={() => setExpanded(isExpanded ? null : cat.tag)}
                aria-expanded={isExpanded}
                aria-controls={`entries-${cat.tag}`}
                className={`mt-auto inline-flex h-9 w-full items-center justify-center gap-1.5 rounded-md text-xs font-bold transition-all ${
                  isExpanded
                    ? "border border-[#0a1f3d]/20 bg-[#0a1f3d] text-white hover:bg-[#1e3a8a]"
                    : "border border-[#2563eb]/30 bg-[#2563eb]/5 text-[#2563eb] hover:border-[#2563eb] hover:bg-[#2563eb] hover:text-white"
                }`}
              >
                {isExpanded ? (
                  <>
                    <ChevronUp className="h-3.5 w-3.5" />
                    Hide
                  </>
                ) : (
                  <>
                    Explore
                    <ArrowRight className="h-3.5 w-3.5" />
                  </>
                )}
              </button>
            </article>
          );
        })}
      </div>

      {/* Expanded entries grid */}
      {expandedEntries.length > 0 && (
        <div
          id={`entries-${expanded}`}
          className="mt-5 animate-fade-up rounded-lg border border-[#e5e7eb] bg-[#f8fafc] p-4 sm:p-5"
        >
          <header className="mb-4 flex items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-bold tracking-tight text-[#111827]">
                {expanded} we&rsquo;ve built
              </h3>
              <p className="mt-0.5 text-xs text-[#6b7280]">
                {expandedEntries.length} {expanded === "Websites" ? "websites" : "platforms"} · click any card to open in a new tab
              </p>
            </div>
            <span
              className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#0a1f3d] shadow-soft"
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{
                  backgroundColor:
                    expanded === "Websites" ? "#1e3a8a" : "#f97316",
                }}
              />
              {expanded}
            </span>
          </header>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {expandedEntries.map((entry) => {
              const catColor =
                CATEGORY_COLORS[entry.category] || "#475569";
              return (
                <a
                  key={entry.url}
                  href={entry.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 rounded-lg border border-[#e5e7eb] bg-white p-3 transition-all hover:-translate-y-0.5 hover:border-[#0a1f3d]/20 hover:shadow-soft-lg"
                >
                  <span
                    className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-md bg-[#f8fafc] ring-1 ring-inset ring-[#e5e7eb]"
                    style={{ backgroundColor: `${catColor}10` }}
                  >
                    <img
                      src={faviconFor(entry.url)}
                      alt=""
                      width={28}
                      height={28}
                      className="h-7 w-7 object-contain"
                      loading="lazy"
                    />
                  </span>
                  <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                    <p className="truncate text-sm font-bold leading-tight text-[#111827]">
                      {entry.name}
                    </p>
                    <p className="truncate text-[11px] text-[#6b7280]">
                      {entry.domain}
                    </p>
                  </div>
                  <span
                    className="hidden shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold sm:inline-block"
                    style={{
                      backgroundColor: `${catColor}15`,
                      color: catColor,
                    }}
                  >
                    {entry.category}
                  </span>
                  <ExternalLink className="h-4 w-4 shrink-0 text-[#9ca3af] transition-colors group-hover:text-[#e31e24]" />
                </a>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
