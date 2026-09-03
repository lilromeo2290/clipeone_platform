"use client";

import { AppHeader } from "@/components/clipeone/app-header";
import { Hero } from "@/components/clipeone/hero";
import { MyApplications } from "@/components/clipeone/my-applications";
import { ExploreApplications } from "@/components/clipeone/explore-applications";
import { TrustBar } from "@/components/clipeone/trust-bar";
import { Sidebar } from "@/components/clipeone/sidebar";
import { AppFooter } from "@/components/clipeone/app-footer";
import { NeedHelpBanner } from "@/components/clipeone/need-help-banner";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-[#f8fafc]">
      <AppHeader />
      <main className="grow" tabIndex={-1}>
        <Hero />

        <div className="mx-auto max-w-[1440px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-12 lg:gap-6">
            {/* Left main column */}
            <div className="flex flex-col gap-5 lg:col-span-9 lg:gap-6">
              <MyApplications />
              <ExploreApplications />
              <TrustBar />
              <NeedHelpBanner />
            </div>

            {/* Right sidebar */}
            <div className="lg:col-span-3">
              <Sidebar />
            </div>
          </div>
        </div>
      </main>
      <AppFooter />
    </div>
  );
}
