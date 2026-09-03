"use client";

import { useState } from "react";
import { ChevronDown, Phone, HelpCircle, MessageCircle } from "lucide-react";

const FAQS = [
  {
    q: "What if I was not placed in any of my selected schools?",
    a: "Use Self-Placement to choose a school with available space. The list of schools with vacancies is shown in real time, and you can pick any programme that still has seats. Once you confirm a Self-Placement, it becomes final.",
  },
  {
    q: "Can I change my school after being placed?",
    a: "Automatic placement is final. Self-Placement is available only when you are unplaced. If you believe there is an error with your placement, contact the support centre with your index number and date of birth for a review.",
  },
  {
    q: "My index number says 'not found'. What should I do?",
    a: "First, double-check your Index Number and Date of Birth — both must match exactly what was used during registration. If the error continues, contact support through the phone lines at the top of the page or visit your nearest regional education office.",
  },
  {
    q: "What documents do I need to bring to my placed school?",
    a: "After placement is confirmed, download and print your Placement Form and Enrolment Form from the portal. Bring both, along with your BECE result slip, birth certificate, and four recent passport-sized photographs, to the school on reporting day.",
  },
  {
    q: "I am a foreign student. How do I apply?",
    a: "Open the Foreign Student service from the portal panel. You will need a scanned copy of your foreign examination results, a valid passport, and a transcript from your previous school. The verification process typically takes 5–10 working days.",
  },
  {
    q: "When does the placement cycle open and close?",
    a: "The 2026 cycle opens in August and runs through the end of September. Specific dates for each service — Check Placement, Self-Placement, Choice Confirmation, and Re-Entry — are announced on this portal and through the Ministry of Education's official channels.",
  },
];

export function SupportCentre() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section
      id="support"
      className="relative overflow-hidden bg-[#f7f7f4] py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left column — heading + contact */}
          <div className="lg:col-span-5">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#d6ad0c]/30 bg-[#d6ad0c]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#0c294c]">
              <HelpCircle className="h-3.5 w-3.5" />
              Support centre
            </span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[#0c294c] sm:text-4xl lg:text-5xl">
              Questions about placement?
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
              We have answered the most common questions below. For anything
              specific to your account, call our support lines — agents are
              standing by during working hours.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href="tel:0550377388"
                className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-md border border-[#0c294c]/15 bg-white px-5 font-bold text-[#0c294c] transition-all hover:border-[#0f6136] hover:shadow-md"
              >
                <Phone className="h-4 w-4 text-[#0f6136]" />
                055 037 7388
              </a>
              <a
                href="tel:0599525926"
                className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-md border border-[#0c294c]/15 bg-white px-5 font-bold text-[#0c294c] transition-all hover:border-[#0f6136] hover:shadow-md"
              >
                <Phone className="h-4 w-4 text-[#0f6136]" />
                059 952 5926
              </a>
            </div>

            <div className="mt-4 flex items-start gap-3 rounded-md border border-[#0f6136]/15 bg-[#0f6136]/5 p-4">
              <MessageCircle className="mt-0.5 h-5 w-5 shrink-0 text-[#0f6136]" />
              <p className="text-sm leading-relaxed text-slate-700">
                <strong className="text-[#0c294c]">Need a real human?</strong>{" "}
                Use the live chat bubble at the bottom-right of this page. Our
                team responds in under two minutes during working hours.
              </p>
            </div>
          </div>

          {/* Right column — FAQ accordion */}
          <div className="lg:col-span-7">
            <div className="flex flex-col gap-3">
              {FAQS.map((faq, idx) => {
                const isOpen = openIdx === idx;
                return (
                  <div
                    key={idx}
                    className={`overflow-hidden rounded-md border bg-white transition-all ${
                      isOpen
                        ? "border-[#0c294c]/30 shadow-md"
                        : "border-slate-200"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenIdx(isOpen ? null : idx)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-4 p-5 text-left transition-colors hover:bg-slate-50"
                    >
                      <span className="flex items-start gap-3">
                        <span
                          className={`mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                            isOpen
                              ? "bg-[#0f6136] text-white"
                              : "bg-slate-100 text-[#0c294c]"
                          }`}
                        >
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                        <span className="text-base font-bold text-[#0c294c]">
                          {faq.q}
                        </span>
                      </span>
                      <ChevronDown
                        className={`h-5 w-5 shrink-0 text-[#0f6136] transition-transform ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <div
                      className={`grid transition-all duration-300 ${
                        isOpen
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="px-5 pb-5 pl-16 text-sm leading-relaxed text-slate-600">
                          {faq.a}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
