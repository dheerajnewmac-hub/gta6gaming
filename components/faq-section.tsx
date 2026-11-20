"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "Do I need to own GTA VI or have a PS5 account?",
      a: "No! Every single one of our 1,000 PlayStation 5 consoles comes pre-installed with Grand Theft Auto VI and official licenses. You don't need to buy the $70 game or own a console. You simply rent the stream time.",
    },
    {
      q: "What are the minimum PC/laptop system requirements?",
      a: "If your computer can play a YouTube 1080p video, it can run GTA VI through ViceCloud. Even an old 2015 laptop, Intel integrated graphics, Mac, or Chromebook works at full 60 FPS. All graphics rendering happens on our PS5 hardware.",
    },
    {
      q: "What happens to my story mode saves & mission progress?",
      a: "Your save files are tied to your personal ViceCloud account. When your rental session ends, your progress is automatically saved to our cloud backup. The next time you rent or resume, your game loads right where you stopped.",
    },
    {
      q: "Can I use Keyboard & Mouse or do I need a controller?",
      a: "Both work perfectly! You can plug in any standard Xbox, PlayStation, or generic USB controller. If you don't have a controller, our low-latency input engine maps standard PC Keyboard & Mouse (WASD + Mouse Aim) seamlessly.",
    },
    {
      q: "What internet speed do I need?",
      a: "We recommend a stable internet connection of at least 15 Mbps for 1080p 60FPS streaming, and 25 Mbps for 1440p/4K HDR. Use our free 1-click Ping Benchmark on this page to test your connection before renting.",
    },
    {
      q: "What payment methods do you accept internationally?",
      a: "We accept all major International Credit/Debit Cards, Apple Pay, Google Pay via Stripe, and Crypto (USDT, Solana, Bitcoin) for instant anonymous checkout.",
    },
  ];

  return (
    <section id="faq" className="py-24 relative overflow-hidden bg-[#07070f] border-t border-white/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-bold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            Frequently Asked Questions
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Got Questions? We Have Answers.
          </h2>
        </div>

        {/* Accordion */}
        <div className="space-y-3.5">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className="rounded-2xl bg-[#0d0d1a] border border-white/10 overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 text-white hover:text-cyan-300 transition-colors"
                >
                  <span className="font-bold text-base sm:text-lg">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-pink-400" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-sm sm:text-base text-gray-300 leading-relaxed border-t border-white/5 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* 24/7 Telegram Support Banner */}
        <div className="mt-10 p-6 rounded-3xl bg-gradient-to-r from-sky-950/40 via-[#0a1233] to-indigo-950/40 border border-sky-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left shadow-[0_0_35px_rgba(14,165,233,0.15)]">
          <div className="space-y-1">
            <span className="inline-block px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-300 font-mono text-[10px] font-bold uppercase tracking-wider">
              24/7 Telegram Helpdesk
            </span>
            <h4 className="text-base font-extrabold text-white">Have Questions or Need Help?</h4>
            <p className="text-xs text-slate-300">
              Our operator team is available 24/7 on Telegram for instant setup, custom hour plans, and rig diagnostics.
            </p>
          </div>
          <a
            href="https://t.me/vicecloudspport"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-full bg-gradient-to-r from-[#0088cc] to-[#00a2f5] hover:brightness-110 text-white font-extrabold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(0,136,204,0.4)] transition-all flex items-center gap-2 whitespace-nowrap active:scale-95 shrink-0"
          >
            <span>Chat on Telegram (@vicecloudspport) &rarr;</span>
          </a>
        </div>

      </div>
    </section>
  );
}
