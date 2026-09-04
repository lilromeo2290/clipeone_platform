"use client";

export function AppFooter() {
  return (
    <footer className="mt-6 border-t border-[#e5e7eb] bg-white">
      <div className="border-t border-[#e5e7eb] bg-[#f8fafc]">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-3 px-4 py-5 text-xs text-[#6b7280] sm:flex-row sm:px-6 lg:px-8">
          <p>© 2026 ClipeConsult. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="transition-colors hover:text-[#e31e24]">
              Privacy Policy
            </a>
            <a href="#" className="transition-colors hover:text-[#e31e24]">
              Terms of Service
            </a>
            <a href="#" className="transition-colors hover:text-[#e31e24]">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
