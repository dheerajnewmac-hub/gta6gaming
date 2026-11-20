"use client";

import React, { useState } from "react";
import { Check, X, Clock, ShieldCheck, Cpu, Play } from "lucide-react";

export function PlayerJourneyRoadmap({ onSelectPlan }: { onSelectPlan: () => void }) {
  const [showComparison, setShowComparison] = useState(false);

  const steps = [
    {
      num: "01",
      title: "Select Access Window",
      desc: "Choose flexible on-demand hours. Zero recurring contracts or hidden fees.",
      icon: <Clock className="w-4 h-4 text-cyan-400" />,
    },
    {
      num: "02",
      title: "Instant Activation",
      desc: "Fast, encrypted 1-click checkout with immediate session token delivery.",
      icon: <ShieldCheck className="w-4 h-4 text-emerald-400" />,
    },
    {
      num: "03",
      title: "Dedicated Blade Handoff",
      desc: "Dedicated console hardware allocated to your private session in under 10 seconds.",
      icon: <Cpu className="w-4 h-4 text-purple-400" />,
    },
    {
      num: "04",
      title: "Launch 4K Stream",
      desc: "Studio-grade 60FPS stream starts in browser. Your Vice City adventure begins.",
      icon: <Play className="w-4 h-4 text-pink-400" />,
    },
  ];

  return (
    <div className="mt-10 rounded-2xl glass-panel p-6 sm:p-7 border border-white/[0.08] bg-[#070a1e]/90 shadow-[0_15px_35px_rgba(0,0,0,0.5)]">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.06]">
        <div>
          <span className="text-[11px] font-mono font-bold text-cyan-400 uppercase tracking-widest">
            Frictionless Onboarding
          </span>
          <h4 className="text-lg font-bold text-white mt-1 tracking-tight">
            From Landing Page to Vice City in Under 45 Seconds
          </h4>
        </div>
        <button
          type="button"
          onClick={() => setShowComparison(!showComparison)}
          className="px-4 py-2 rounded-xl text-xs font-semibold border border-cyan-500/40 bg-cyan-950/40 hover:bg-cyan-900/60 text-cyan-200 transition-all shadow-[0_0_15px_rgba(6,182,212,0.15)] active:scale-95"
        >
          {showComparison ? "Show 4-Step Player Flow" : "Compare: Traditional vs ViceCloud"}
        </button>
      </div>

      {!showComparison ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          {steps.map((s) => (
            <div
              key={s.num}
              className="p-4 rounded-xl bg-slate-900/80 border border-white/[0.05] hover:border-cyan-500/30 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-bold text-cyan-400/90">
                    STEP {s.num}
                  </span>
                  <div className="w-7 h-7 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center">
                    {s.icon}
                  </div>
                </div>
                <h5 className="text-sm font-semibold text-white tracking-tight">{s.title}</h5>
                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed font-normal">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
          <div className="p-5 rounded-xl bg-rose-950/20 border border-rose-500/20">
            <span className="text-xs font-bold text-rose-300 flex items-center gap-2 mb-3">
              <X className="w-4 h-4 text-rose-400" /> Traditional Gaming Setup ($600+)
            </span>
            <ul className="space-y-2 text-xs text-slate-300 font-normal">
              <li>• Upfront $500–$1,500 investment in gaming console or GPU</li>
              <li>• 150GB download and painful installation wait times</li>
              <li>• Continuous storage management and hardware heat/fan noise</li>
            </ul>
          </div>
          <div className="p-5 rounded-xl bg-cyan-950/25 border border-cyan-500/30">
            <span className="text-xs font-bold text-cyan-300 flex items-center gap-2 mb-3">
              <Check className="w-4 h-4 text-emerald-400" /> ViceCloud Cloud Streaming
            </span>
            <ul className="space-y-2 text-xs text-slate-200 font-normal">
              <li>• Zero hardware upgrades: runs smoothly on your existing laptop</li>
              <li>• 0 GB downloaded: launches directly inside your web browser</li>
              <li>• High-bitrate 4K 60FPS stream with persistent cloud saves</li>
            </ul>
          </div>
        </div>
      )}

      <div className="mt-6 pt-5 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <span className="text-slate-400 font-normal">Ready to experience next-generation cloud gaming?</span>
        <button
          type="button"
          onClick={onSelectPlan}
          className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-400 hover:to-rose-500 text-white font-bold transition-all shadow-[0_0_20px_rgba(244,63,94,0.3)] active:scale-95"
        >
          Explore Rental Passes
        </button>
      </div>
    </div>
  );
}
