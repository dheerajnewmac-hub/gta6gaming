"use client";

import React, { useState } from "react";
import { Check, X, CreditCard, ShieldCheck, Gamepad2, ArrowRight } from "lucide-react";

export function PlayerJourneyRoadmap({ onSelectPlan }: { onSelectPlan: () => void }) {
  const [showComparison, setShowComparison] = useState(false);

  const steps = [
    {
      num: "1",
      title: "Pick Your Pass",
      desc: "Choose 1h, 5h, or Weekend Pass starting from $4.99.",
      icon: <CreditCard className="w-4 h-4 text-cyan-400" />,
    },
    {
      num: "2",
      title: "Zero-KYC Pay",
      desc: "Direct USDT (TRC-20) address copy or Apple/Visa Card.",
      icon: <ShieldCheck className="w-4 h-4 text-emerald-400" />,
    },
    {
      num: "3",
      title: "PS5 Node Unlock",
      desc: "Automated mempool check yields node ID & passcode in <10s.",
      icon: <Gamepad2 className="w-4 h-4 text-pink-400" />,
    },
    {
      num: "4",
      title: "Play GTA VI",
      desc: "Fullscreen 60FPS stream starts in browser. Driving begins!",
      icon: <ArrowRight className="w-4 h-4 text-yellow-400" />,
    },
  ];

  return (
    <div className="mt-10 rounded-2xl glass-panel p-6 border border-white/10 bg-[#070a1e]/90">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <span className="text-[11px] font-mono font-bold text-cyan-400 uppercase tracking-widest">
            The 45-Second Player Journey
          </span>
          <h4 className="text-lg font-black text-white mt-0.5">
            How You Go From Visitor to Playing in Vice City
          </h4>
        </div>
        <button
          type="button"
          onClick={() => setShowComparison(!showComparison)}
          className="px-3.5 py-1.5 rounded-xl text-xs font-bold border border-cyan-500/40 bg-cyan-950/40 hover:bg-cyan-900/60 text-cyan-300 transition-all shadow-[0_0_15px_rgba(6,182,212,0.2)]"
        >
          {showComparison ? "Show 4-Step Flow" : "Compare: PC vs ViceCloud"}
        </button>
      </div>

      {!showComparison ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          {steps.map((s) => (
            <div
              key={s.num}
              className="p-4 rounded-xl bg-slate-900/70 border border-white/5 hover:border-cyan-500/30 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-mono font-bold flex items-center justify-center">
                    {s.num}
                  </span>
                  {s.icon}
                </div>
                <h5 className="text-sm font-bold text-white">{s.title}</h5>
                <p className="text-[11px] text-gray-400 mt-1 leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div className="p-4 rounded-xl bg-red-950/20 border border-red-500/30">
            <span className="text-xs font-bold text-red-400 flex items-center gap-1.5 mb-2">
              <X className="w-4 h-4" /> Traditional Setup ($600+)
            </span>
            <ul className="space-y-1.5 text-xs text-gray-300">
              <li>• Buy $500 PS5 console or $2000 RTX gaming PC</li>
              <li>• 150GB download (takes 6-12 hours on normal WiFi)</li>
              <li>• System updates, storage bloat, fan noise &amp; heat</li>
            </ul>
          </div>
          <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/40">
            <span className="text-xs font-bold text-cyan-400 flex items-center gap-1.5 mb-2">
              <Check className="w-4 h-4 text-emerald-400" /> ViceCloud Cloud Streaming ($4.99)
            </span>
            <ul className="space-y-1.5 text-xs text-gray-300">
              <li>• Runs on your current student laptop / work PC</li>
              <li>• 0 GB download, 0 GB storage used, launches in 10s</li>
              <li>• Full 4K 60FPS fidelity with cloud game saves</li>
            </ul>
          </div>
        </div>
      )}

      <div className="mt-6 pt-5 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <span className="text-gray-400">Ready to test latency in your region?</span>
        <button
          type="button"
          onClick={onSelectPlan}
          className="w-full sm:w-auto px-5 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-400 hover:to-rose-500 text-white font-bold transition-all shadow-[0_0_20px_rgba(244,63,94,0.3)]"
        >
          View Rental Passes &amp; Play
        </button>
      </div>
    </div>
  );
}
