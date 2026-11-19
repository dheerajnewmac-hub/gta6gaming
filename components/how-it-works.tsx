"use client";

import React from "react";
import { CreditCard, Cpu, Gamepad2, Sparkles, CheckCircle2 } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      number: "01",
      icon: CreditCard,
      title: "Choose Your Game Pass",
      description:
        "Select an hourly trial ($1.99) or unlimited weekend pass. Pay securely via Card, Apple Pay, Google Pay, or Crypto.",
      highlight: "No commitment • Instant activation",
      color: "from-pink-500 to-rose-600",
    },
    {
      number: "02",
      icon: Cpu,
      title: "Instant PS5 Rig Allocation",
      description:
        "Our cloud broker immediately assigns an idle PlayStation 5 console from our 1,000 unit array and prepares your isolated GTA 6 session.",
      highlight: "< 10 seconds standby time",
      color: "from-purple-500 to-indigo-600",
    },
    {
      number: "03",
      icon: Gamepad2,
      title: "Connect & Play 4K 60FPS",
      description:
        "Play directly in your Chrome browser or our lightweight client. Plug in any controller (Xbox/PlayStation) or use native Keyboard & Mouse.",
      highlight: "Cloud saves backed up automatically",
      color: "from-cyan-400 to-blue-600",
    },
  ];

  return (
    <section id="how-it-works" className="py-24 relative overflow-hidden bg-[#07070f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Zero Setup • Zero Installs
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            How You Play GTA VI In 3 Simple Steps
          </h2>
          <p className="mt-4 text-gray-400 text-base">
            No 150GB game download. No $500 console. No GPU upgrade required.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div
                key={step.number}
                className="relative rounded-2xl bg-gradient-to-b from-[#121222] to-[#0a0a14] border border-white/10 p-8 shadow-xl hover:border-pink-500/50 transition-all duration-300 group hover:-translate-y-1"
              >
                {/* Step Number Watermark */}
                <span className="absolute top-4 right-6 font-mono text-5xl font-black text-white/5 pointer-events-none group-hover:text-pink-500/10 transition-colors">
                  {step.number}
                </span>

                {/* Icon */}
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${step.color} p-[2px] mb-6 shadow-lg shadow-pink-500/20`}
                >
                  <div className="w-full h-full bg-[#0d0d1a] rounded-[14px] flex items-center justify-center">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                </div>

                {/* Title & Desc */}
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed mb-6">
                  {step.description}
                </p>

                {/* Bottom Highlight Badge */}
                <div className="pt-4 border-t border-white/5 flex items-center gap-2 text-xs font-semibold text-emerald-400">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{step.highlight}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Comparison Callout: Buying Console vs ViceCloud */}
        <div className="mt-16 rounded-2xl bg-[#0e0e1c] border border-white/10 p-6 sm:p-8">
          <h3 className="text-lg font-bold text-white text-center mb-6">
            Traditional Gaming vs ViceCloud PS5 Cloud Rental
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl bg-red-950/20 border border-red-500/20">
              <span className="text-xs font-bold text-red-400 uppercase tracking-wider block mb-2">
                Traditional Approach
              </span>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-center gap-2">❌ Buy PlayStation 5 Console ($499 - $549)</li>
                <li className="flex items-center gap-2">❌ Buy GTA VI Disc or Digital ($69.99)</li>
                <li className="flex items-center gap-2">❌ Buy 4K TV / Gaming Monitor ($250+)</li>
                <li className="flex items-center gap-2">❌ Wait 4 hours for 150GB download & patches</li>
                <li className="pt-2 font-bold text-red-400">Total Upfront Cost: $800+ USD</li>
              </ul>
            </div>

            <div className="p-5 rounded-xl bg-emerald-950/20 border border-emerald-500/30">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block mb-2">
                ViceCloud PS5 Cloud Gaming
              </span>
              <ul className="space-y-2 text-sm text-gray-200">
                <li className="flex items-center gap-2">✅ Play on your existing laptop, PC, Mac, or phone</li>
                <li className="flex items-center gap-2">✅ GTA VI pre-installed & pre-updated on all 1,000 PS5s</li>
                <li className="flex items-center gap-2">✅ Full 1080p/4K 60FPS with Ray Tracing enabled</li>
                <li className="flex items-center gap-2">✅ Start playing in 30 seconds</li>
                <li className="pt-2 font-bold text-emerald-400">Total Cost to Start: Only $1.99 USD</li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
