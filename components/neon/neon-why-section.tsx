"use client";

import React from "react";
import { ArrowRight, Rocket, MonitorPlay, Globe2, ShieldCheck } from "lucide-react";

export function NeonWhySection() {
  const scrollToPlans = () => {
    const el = document.getElementById("plans");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const features = [
    {
      icon: <Rocket className="w-5 h-5 text-pink-400" />,
      title: "Instant Access",
      desc: "Start playing in seconds, zero waiting, zero local game downloads required.",
      glow: "border-pink-500/20 hover:border-pink-500/50 hover:shadow-[0_0_30px_rgba(236,72,153,0.25)]",
      badgeColor: "bg-pink-500/10 border-pink-500/30",
    },
    {
      icon: <MonitorPlay className="w-5 h-5 text-purple-400" />,
      title: "4K Ultra HD 60FPS",
      desc: "Ray-traced graphics rendered on dedicated Sony PS5 hardware directly to your screen.",
      glow: "border-purple-500/20 hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.25)]",
      badgeColor: "bg-purple-500/10 border-purple-500/30",
    },
    {
      icon: <Globe2 className="w-5 h-5 text-cyan-400" />,
      title: "Play Anywhere",
      desc: "Run seamlessly on Windows, MacOS, Linux, iPads, Android and low-spec laptops.",
      glow: "border-cyan-500/20 hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.25)]",
      badgeColor: "bg-cyan-500/10 border-cyan-500/30",
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
      title: "Military-Grade Security",
      desc: "Zero-KYC, encrypted WebRTC streaming, and isolated sessions with private cloud saves.",
      glow: "border-emerald-500/20 hover:border-emerald-500/50 hover:shadow-[0_0_30px_rgba(52,211,153,0.25)]",
      badgeColor: "bg-emerald-500/10 border-emerald-500/30",
    },
  ];

  return (
    <section id="why-vicecloud" className="relative w-full py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Heading & Learn More */}
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs font-mono tracking-widest text-cyan-400 font-bold uppercase block">
              WHY VICECLOUD?
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-[1.1] tracking-tight">
              Next-Gen Cloud <br />
              Gaming{" "}
              <span className="bg-gradient-to-r from-pink-500 via-rose-400 to-purple-400 bg-clip-text text-transparent">
                Experience
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-md">
              Powerful cloud infrastructure, ultra-fast streaming, and a seamless gaming experience — all in one place.
            </p>
            <div className="pt-2">
              <button
                onClick={scrollToPlans}
                className="px-6 py-3 rounded-full border border-pink-500/40 bg-[#12082b]/90 hover:bg-pink-500/20 text-white font-bold text-xs flex items-center gap-2 transition-all group shadow-[0_0_15px_rgba(236,72,153,0.2)] active:scale-95"
              >
                <span>Choose Your Plan</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-pink-400" />
              </button>
            </div>
          </div>

          {/* Right Column: 4 Feature Cards (2x2 Grid) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((f, i) => (
              <div
                key={i}
                className={`p-6 rounded-3xl bg-[#0c0722]/80 backdrop-blur-xl border ${f.glow} transition-all duration-300 space-y-3.5 group hover:-translate-y-1`}
              >
                <div className={`w-11 h-11 rounded-2xl ${f.badgeColor} border flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  {f.icon}
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-extrabold text-white mb-1.5">{f.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Neon Light Divider Beam */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 sm:mt-16">
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-pink-500/30 to-transparent" />
      </div>
    </section>
  );
}
