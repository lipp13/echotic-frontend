"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

export default function FAQAccordion() {
  const [openIdx, setOpenIdx] = useState(0);

  const faqs = [
    {
      q: "How does EchoTic's 3D Seat Map visualizer work?",
      a: "Our 3D engine renders realistic stage lighting, seating sectors, and vantage angles directly in your browser using Three.js and WebGL. You can inspect your exact line of sight before completing your ticket reservation.",
    },
    {
      q: "Are EchoTic digital passes non-scalpable?",
      a: "Yes. Every ticket pass generates an encrypted payload tied to your account signature and dynamic QR token. Gate controllers validate the pass in real-time, preventing fake screenshots or unverified secondary reselling.",
    },
    {
      q: "Can I use the same pass on the web platform and mobile app?",
      a: "Absolutely! EchoTic provides cross-platform synchronization between our Next.js web application and React Native mobile app. Any pass purchased on the web immediately syncs to your mobile wallet.",
    },
    {
      q: "What happens if a concert is rescheduled or canceled?",
      a: "In the event of schedule changes, your digital pass automatically updates its metadata. If an event is canceled, automated refund notifications are issued instantly to your registered account.",
    },
  ];

  return (
    <section className="py-24 bg-[#080808] border-b border-white/5">
      <div className="max-w-4xl mx-auto px-6 md:px-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#9d4edd]/10 border border-[#9d4edd]/20 text-xs font-semibold text-[#b565f7] mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>FREQUENTLY ASKED QUESTIONS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">
            EVERYTHING YOU NEED TO KNOW.
          </h2>
          <p className="text-zinc-400 text-xs md:text-sm mt-2">
            Got questions about our 3D visualizer, digital passes, or gate scanning?
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-[#121212] border border-zinc-800/80 rounded-2xl overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left cursor-pointer hover:bg-zinc-800/40 transition-colors"
                >
                  <span className="text-sm font-bold text-white tracking-wide pr-4">
                    {faq.q}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center text-zinc-300 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-[#9d4edd] border-[#9d4edd]" : ""
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-1 text-xs text-zinc-400 leading-relaxed border-t border-zinc-800/50">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
