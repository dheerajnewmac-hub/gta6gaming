"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export function NeonFaq() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: "Do I need a high-end gaming PC to play GTA VI?",
      a: "No! ViceCloud runs the game on dedicated PlayStation 5 console blade clusters. Your device only streams video via WebRTC, so any normal laptop, Mac, or PC can run it at full 60FPS.",
    },
    {
      q: "How does payment and activation work?",
      a: "Choose a plan (Starter, Pro, or Ultimate), pay with Binance Pay (ID/QR) or USDT TRC-20, and upload your payment screenshot. Our operator verifies it instantly, allocating your dedicated PS5 rig.",
    },
    {
      q: "What internet speed do I need for 4K streaming?",
      a: "A standard 20 Mbps or higher connection is recommended for smooth 1080p60, and 35-50 Mbps for 4K HDR with sub-20ms latency.",
    },
    {
      q: "How do I get help if I encounter an issue?",
      a: "We offer direct 24/7 operator support on Telegram at @vicecloudspport. Our team is available around the clock.",
    },
  ];

  return (
    <section id="faq" className="relative w-full py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center space-y-2 mb-10">
          <span className="text-[11px] font-mono tracking-widest text-cyan-400 font-bold uppercase block">
            COMMON QUESTIONS
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openIdx === i;
            return (
              <div
                key={i}
                className="rounded-2xl border border-purple-500/20 bg-[#0e0726]/80 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  className="w-full p-4 sm:p-5 flex items-center justify-between text-left text-sm font-bold text-white hover:text-pink-300 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-pink-400 transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs text-slate-300 leading-relaxed border-t border-white/5 pt-3">
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
