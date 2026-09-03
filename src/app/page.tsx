"use client";

import { SiteHeader } from "@/components/portal/site-header";
import { Hero } from "@/components/portal/hero";
import { HowItWorks } from "@/components/portal/how-it-works";
import { SupportCentre } from "@/components/portal/support-centre";
import { About } from "@/components/portal/about";
import { SiteFooter } from "@/components/portal/site-footer";
import { ProcessTimeline } from "@/components/portal/process-timeline";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <SiteHeader />
      <main className="grow" tabIndex={-1}>
        <Hero />
        <ProcessTimeline />
        <HowItWorks />
        <SupportCentre />
        <About />
      </main>
      <SiteFooter />
    </div>
  );
}
