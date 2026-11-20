"use client";

import React from "react";
import { Gamepad2, Zap, Play } from "lucide-react";

export function NeonHowItWorks() {
  const steps = [
    {
      num: "01",
      icon: <Gamepad2 className="w-5 h-5 text-white" />,
      title: "Choose a Plan",
      desc: "Pick the perfect plan for your gaming needs from 1 hour to multi-day sessions.",
      gradient: "from-purple-600 to-indigo-600",
      glow: "border-purple-500/20 hover:border-purple-400/40",
    },
    {
      num: "02",
      icon: <Zap className="w-5 h-5 text-white" />,
      title: "Click & Play",
      desc: "Get instant access directly in your browser. Zero downloads or setup required.",
      gradient: "from-pink-600 to-purple-600",
      glow: "border-pink-500/20 hover:border-pink-400/40",
    },
    {
      num: "03",
      icon: <Play className="w-5 h-5 fill-white text-white" />,
      title: "Enjoy GTA VI",
      desc: "Jump straight into Vice City at 4K 60FPS with high-fidelity sound and controls.",
      gradient: "from-cyan-600 to-blue-600",
      glow: "border-cyan-500/20 hover:border-cyan-400/40",
    },
  ];

  return (
    <section id="how-it-works" className="relative w-full py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="space-y-2 mb-10 sm:mb-14">
          <span className="text-xs font-mono tracking-widest text-cyan-400 font-bold uppercase block">
            GET STARTED IN MINUTES
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            How It Works
          </h2>
        </div>

        {/* Content Grid: 3 Steps on Left, Car Art on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: 3 Steps */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-stretch">
              {steps.map((st, i) => (
                <div
                  key={i}
                  className={`p-5 rounded-3xl bg-[#0c0722]/80 backdrop-blur-xl border ${st.glow} space-y-4 relative group transition-all duration-300 hover:-translate-y-1`}
                >
                  <div className="flex items-center justify-between">
                    <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${st.gradient} flex items-center justify-center text-white font-black text-sm shadow-[0_0_20px_rgba(168,85,247,0.4)]`}>
                      {st.icon}
                    </div>
                    <span className="text-xs font-mono font-bold text-slate-400">
                      {st.num}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-extrabold text-white mb-1.5">
                      {st.title}
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {st.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Neon Car Art & Vice City Graffiti */}
          <div className="lg:col-span-5 relative flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-lg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/neon_ui/how_it_works_car_perfect.png"
                alt="Vice City Supercar and Neon Skyline"
                className="w-full h-auto object-contain rounded-3xl drop-shadow-[0_0_35px_rgba(236,72,153,0.35)]"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
