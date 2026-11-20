"use client";

import React from "react";
import { ArrowRight, Rocket, MonitorPlay, Globe2, ShieldCheck } from "lucide-react";

export function NeonWhySection() {
  const scrollToPlans = () => {
    const el = document.getElementById("plans");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="why-vicecloud" className="relative w-full py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Heading & Learn More */}
          <div className="lg:col-span-5 space-y-4">
            <span className="text-[11px] font-mono tracking-widest text-cyan-400 font-bold uppercase block">
              WHY VICECLOUD?
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-[1.1] tracking-tight">
              Next-Gen Cloud <br />
              Gaming <span className="bg-gradient-to-r from-pink-500 via-rose-400 to-purple-400 bg-clip-text text-transparent">Experience</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-md">
              Powerful cloud infrastructure, ultra-fast streaming, and a seamless gaming experience — all in one place.
            </p>
            <div className="pt-2">
              <button
                onClick={scrollToPlans}
                className="px-5 py-2.5 rounded-full border border-pink-500/40 bg-[#12082b]/80 hover:bg-pink-500/10 text-white font-bold text-xs flex items-center gap-2 transition-all group"
              >
                <span>Learn More</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-pink-400" />
              </button>
            </div>
          </div>

          {/* Right Column: 4 Feature Cards (2x2 Grid) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            
            {/* Card 1: Instant Access */}
            <div className="p-5 rounded-2xl bg-[#0e0726]/90 border border-purple-500/20 hover:border-pink-500/40 transition-all space-y-3 group shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
              <div className="w-10 h-10 rounded-xl bg-pink-500/15 border border-pink-500/30 flex items-center justify-center text-pink-400 group-hover:scale-110 transition-transform">
                <Rocket className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-extrabold text-white mb-1">Instant Access</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Start playing in seconds, no downloads.
                </p>
              </div>
            </div>

            {/* Card 2: 4K Ultra HD */}
            <div className="p-5 rounded-2xl bg-[#0e0726]/90 border border-purple-500/20 hover:border-purple-500/40 transition-all space-y-3 group shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
              <div className="w-10 h-10 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform font-mono font-bold text-xs">
                <MonitorPlay className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-extrabold text-white mb-1">4K Ultra HD</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Stunning visuals at 60FPS.
                </p>
              </div>
            </div>

            {/* Card 3: Play Anywhere */}
            <div className="p-5 rounded-2xl bg-[#0e0726]/90 border border-purple-500/20 hover:border-cyan-500/40 transition-all space-y-3 group shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                <Globe2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-extrabold text-white mb-1">Play Anywhere</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  PC, Mac, Tablet &amp; More Devices.
                </p>
              </div>
            </div>

            {/* Card 4: Military-Grade Security */}
            <div className="p-5 rounded-2xl bg-[#0e0726]/90 border border-purple-500/20 hover:border-emerald-500/40 transition-all space-y-3 group shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-extrabold text-white mb-1">Military-Grade Security</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Your data, our priority.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Neon Light Beam Divider */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 sm:mt-14">
        <div className="h-[2px] w-full bg-gradient-to-r from-pink-500 via-purple-500 to-transparent shadow-[0_0_20px_rgba(236,72,153,0.9)] opacity-80" />
      </div>
    </section>
  );
}
