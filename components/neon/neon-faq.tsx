"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export function NeonFAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: "Do I need a high-end gaming PC or a PS5 console to play?",
      a: "Not at all! You only need an ordinary office laptop, desktop, Mac, or tablet with a standard internet browser. GTA VI is rendered on our enterprise Sony PS5 blade servers and streamed directly to your screen.",
    },
    {
      q: "How does the stream work without downloading GTA VI?",
      a: "Our infrastructure uses ultra-low latency WebRTC video streaming (<14ms). The game is already pre-installed and patched on our high-speed NVMe blade rigs, so you click 'Play' and are inside Vice City within seconds.",
    },
    {
      q: "Can I use an Xbox, PlayStation, or generic USB controller?",
      a: "Yes! ViceCloud provides native plug-and-play controller support. PS5 DualSense, Xbox Wireless, Nintendo Switch Pro, and standard USB/Bluetooth controllers are mapped automatically with zero driver setup.",
    },
    {
      q: "How do I receive my session pass after payment?",
      a: "Your session credentials, allocated PS5 Blade Node, and instant launch button are unlocked automatically on the screen as soon as your payment is confirmed. You can also view them anytime in your session modal.",
    },
    {
      q: "Is my game save progress preserved between sessions?",
      a: "Yes! Every user is allocated a private cloud save slot. When your timer concludes or you take a break, your latest story mode checkpoints are encrypted and stored for your next session.",
    },
  ];

  return (
    <section id="faq" className="relative w-full py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-xs font-mono tracking-wider uppercase">
            <span>FREQUENTLY ASKED QUESTIONS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Got Questions?{" "}
            <span className="italic bg-gradient-to-r from-pink-500 via-rose-400 to-purple-400 bg-clip-text text-transparent">
              We&apos;ve Got Answers
            </span>
          </h2>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openIdx === i;
            return (
              <div
                key={i}
                className={`rounded-2xl transition-all duration-300 overflow-hidden bg-[#0c0722]/80 backdrop-blur-xl border ${
                  isOpen ? "border-pink-500/40 shadow-[0_0_25px_rgba(236,72,153,0.15)]" : "border-purple-500/15 hover:border-purple-500/30"
                }`}
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  className="w-full p-4 sm:p-5 flex items-center justify-between text-left gap-4"
                >
                  <span className="text-sm sm:text-base font-extrabold text-white">
                    {faq.q}
                  </span>
                  <div className={`p-1.5 rounded-xl bg-white/5 border border-white/10 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180 text-pink-400" : "text-slate-400"}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>
                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/5 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
