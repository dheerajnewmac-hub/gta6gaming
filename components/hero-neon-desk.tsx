"use client";

import React from "react";
import Image from "next/image";
import { Zap, Cloud, Globe, Shield, Play, ArrowRight } from "lucide-react";

interface HeroNeonDeskProps {
  onOpenPlans: () => void;
  onOpenHowItWorks: () => void;
}

export function HeroNeonDesk({ onOpenPlans, onOpenHowItWorks }: HeroNeonDeskProps) {
  return (
    <section id="home" className="relative pt-24 sm:pt-28 pb-6 overflow-hidden">
      {/* Background Ambience Neon Glow */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[500px] bg-purple-600/20 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[500px] bg-cyan-500/20 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ========================================================================= */}
        {/* SEAMLESS HERO DESK STAGE MATCHING USER MOCKUP EXACTLY */}
        {/* ========================================================================= */}
        <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_60px_rgba(0,0,0,0.85)] bg-gradient-to-b from-[#0a0d24] via-[#060716] to-[#04050e] p-4 sm:p-6 lg:p-7">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-2 items-center">
            
            {/* LEFT COLUMN: PS5 Console on Illuminated Disc (Seamless, No harsh box) */}
            <div className="lg:col-span-3 flex justify-center order-2 lg:order-1">
              <div className="relative w-full max-w-[340px] aspect-[4/5] sm:aspect-square lg:aspect-[4/5] rounded-2xl overflow-hidden drop-shadow-[0_15px_30px_rgba(0,210,255,0.3)]">
                <Image
                  src="/ps5-console.png"
                  alt="1K+ PS5 Powered Servers"
                  fill
                  priority
                  className="object-cover object-center"
                />
              </div>
            </div>

            {/* CENTER COLUMN: The Core Messaging & Badges (6 Cols) */}
            <div className="lg:col-span-5 text-center flex flex-col items-center order-1 lg:order-2 py-2">
              
              {/* Green Pill Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0a231b] border border-emerald-500/60 backdrop-blur-md mb-4 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-bold text-emerald-400 tracking-wide">
                  Remote Console Gaming
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-none drop-shadow-lg">
                Play{" "}
                <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-300 to-cyan-300 drop-shadow-[0_0_30px_rgba(217,38,255,0.9)]">
                  GTA VI
                </span>
                <br />
                <span className="text-white">on Your PC</span>
              </h1>

              {/* Subheadline & Description */}
              <p className="mt-3.5 text-sm sm:text-base italic text-purple-200 font-semibold">
                Experience the next-gen adventure, remotely!
              </p>
              <p className="mt-2 text-xs sm:text-[13px] text-gray-300 max-w-md mx-auto font-normal leading-relaxed">
                With our powerful PS5 fleet, play GTA VI and more from anywhere on your low-end PC. No expensive console. Just pure gaming.
              </p>

              {/* Action Buttons */}
              <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={onOpenPlans}
                  className="px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 hover:from-cyan-300 hover:to-indigo-500 shadow-[0_0_20px_rgba(0,210,255,0.6)] hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5"
                >
                  <span>View Plans</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={onOpenHowItWorks}
                  className="px-6 py-2.5 rounded-full font-bold text-xs text-white bg-[#0e112a] hover:bg-[#161a3d] border border-white/20 backdrop-blur-md shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>How It Works</span>
                </button>
              </div>

              {/* 4 Feature Badges in ONE SINGLE ROW */}
              <div className="mt-6 pt-3 border-t border-white/10 flex items-center justify-center gap-1.5 sm:gap-2.5 text-[10px] sm:text-[11px] font-semibold text-gray-200 flex-nowrap overflow-x-auto max-w-full">
                <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 shrink-0">
                  <Zap className="w-3 h-3 text-cyan-400" />
                  <span>Ultra Low Latency</span>
                </div>
                <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 shrink-0">
                  <Cloud className="w-3 h-3 text-purple-400" />
                  <span>High Quality Streaming</span>
                </div>
                <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 shrink-0">
                  <Globe className="w-3 h-3 text-blue-400" />
                  <span>Play Anywhere</span>
                </div>
                <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 shrink-0">
                  <Shield className="w-3 h-3 text-emerald-400" />
                  <span>Secure &amp; Reliable</span>
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: PC Gaming Desk Setup (Seamless, No harsh box) */}
            <div className="lg:col-span-4 flex justify-center order-3">
              <div className="relative w-full max-w-[360px] aspect-[4/5] sm:aspect-square lg:aspect-[4/5] rounded-2xl overflow-hidden drop-shadow-[0_15px_30px_rgba(59,130,246,0.35)]">
                <Image
                  src="/pc-setup.png"
                  alt="Your PC = GTA VI Ready"
                  fill
                  priority
                  className="object-cover object-center"
                />
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
