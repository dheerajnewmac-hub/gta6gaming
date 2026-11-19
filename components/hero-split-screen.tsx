"use client";

import React, { useState } from "react";
import { Server, Laptop, Wifi, Cpu, Play, CheckCircle2, Zap, ArrowRight, Shield } from "lucide-react";

interface HeroSplitScreenProps {
  onOpenPingTest: () => void;
  onOpenPlans: () => void;
  onLaunchDemo: () => void;
}

export function HeroSplitScreen({
  onOpenPingTest,
  onOpenPlans,
  onLaunchDemo,
}: HeroSplitScreenProps) {
  const [selectedRegion, setSelectedRegion] = useState<"US" | "EU" | "ASIA" | "LATAM">("US");

  const regionPings = {
    US: { ping: "14ms", location: "Virginia & Oregon Data Center" },
    EU: { ping: "19ms", location: "Frankfurt & London Data Center" },
    ASIA: { ping: "26ms", location: "Tokyo & Singapore Data Center" },
    LATAM: { ping: "31ms", location: "São Paulo Data Center" },
  };

  return (
    <div className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      {/* Background Neon Gradients & Cyber Grid */}
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-b from-pink-600/20 via-purple-600/10 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-10 w-72 h-72 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-72 h-72 bg-pink-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Headline & Value Prop */}
        <div className="text-center max-w-4xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-pink-500/30 backdrop-blur-md mb-5 shadow-lg shadow-pink-500/10">
            <span className="w-2 h-2 rounded-full bg-pink-500 animate-ping" />
            <span className="text-xs font-bold uppercase tracking-wider text-pink-400">
              GTA VI Global PS5 Cloud Array
            </span>
            <span className="text-gray-500">|</span>
            <span className="text-xs font-semibold text-cyan-300">
              No Console or $70 Game Needed
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
            Play <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-300 to-cyan-400">GTA VI In 4K 60FPS</span>
            <br />
            On Any Potato PC, Old Laptop or Mac
          </h1>

          <p className="mt-5 text-base sm:text-lg text-gray-300 max-w-2xl mx-auto font-normal leading-relaxed">
            We run 1,000 real PlayStation 5 consoles in our high-speed cloud racks.
            Rent a dedicated rig in 1-click and stream Grand Theft Auto VI straight to your browser or screen with zero input lag.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onLaunchDemo}
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-extrabold text-sm uppercase tracking-wider text-white bg-gradient-to-r from-pink-500 via-purple-600 to-cyan-500 hover:from-pink-600 hover:to-cyan-600 shadow-xl shadow-pink-500/30 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2.5 group"
            >
              <Play className="w-4 h-4 fill-white group-hover:scale-110 transition-transform" />
              <span>Launch 2-Min Live Demo</span>
            </button>

            <button
              onClick={onOpenPingTest}
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-sm text-gray-200 bg-[#121222]/80 hover:bg-[#1a1a30] border border-white/10 hover:border-cyan-400/50 backdrop-blur-md transition-all flex items-center justify-center gap-2 shadow-lg"
            >
              <Zap className="w-4 h-4 text-yellow-400" />
              <span>Benchmark My Connection</span>
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* INTERACTIVE SPLIT-SCREEN ANIMATION CONTAINER */}
        {/* ========================================================================= */}
        <div className="relative rounded-3xl border border-white/10 bg-[#0c0c18]/80 backdrop-blur-xl p-4 sm:p-8 shadow-2xl shadow-purple-950/40">
          
          {/* Region Switcher Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs sm:text-sm font-bold text-white tracking-wide">
                Live Cloud Pipeline Telemetry
              </span>
            </div>

            <div className="flex items-center gap-1.5 bg-[#07070f] p-1 rounded-xl border border-white/10">
              {(["US", "EU", "ASIA", "LATAM"] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => setSelectedRegion(r)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    selectedRegion === r
                      ? "bg-pink-500 text-white shadow-md shadow-pink-500/40"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {r} ({regionPings[r].ping})
                </button>
              ))}
            </div>
          </div>

          {/* Dual Split Visual Showcase */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-11 gap-6 items-center">
            
            {/* LEFT SIDE: THE PS5 SERVER DATA RACK (5 Columns) */}
            <div className="lg:col-span-5 bg-gradient-to-b from-[#141424] to-[#0d0d1a] border border-cyan-500/30 rounded-2xl p-5 sm:p-6 relative overflow-hidden shadow-xl shadow-cyan-950/20 group hover:border-cyan-400 transition-all">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

              {/* Title & Badge */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400">
                    <Server className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm text-white tracking-wide uppercase">
                      ViceCloud Server Rack #08
                    </h3>
                    <p className="text-[11px] text-gray-400">
                      Tier-4 Ultra-Fast Datacenter Node
                    </p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-cyan-400/10 text-cyan-300 border border-cyan-400/30">
                  REAL PS5 HARDWARE
                </span>
              </div>

              {/* Graphical PS5 Server Blades Stack */}
              <div className="space-y-2.5 my-4">
                {[
                  { id: "PS5-NODE-401", status: "STREAMING 4K", load: "78%", active: true },
                  { id: "PS5-NODE-402", status: "READY (GTA VI)", load: "12%", active: false },
                  { id: "PS5-NODE-403", status: "STREAMING 4K", load: "84%", active: true },
                  { id: "PS5-NODE-404", status: "READY (GTA VI)", load: "9%", active: false },
                ].map((blade, idx) => (
                  <div
                    key={blade.id}
                    className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-[#090912] border border-white/5 relative overflow-hidden"
                  >
                    {/* Glowing LED stripe */}
                    <div
                      className={`absolute left-0 top-0 bottom-0 w-1.5 ${
                        blade.active ? "bg-pink-500 shadow-sm shadow-pink-500" : "bg-cyan-400"
                      }`}
                    />
                    <div className="flex items-center gap-3 pl-2">
                      <Cpu className={`w-4 h-4 ${blade.active ? "text-pink-400" : "text-cyan-400"}`} />
                      <span className="font-mono text-xs font-semibold text-gray-200">
                        {blade.id}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-mono font-medium text-gray-400">
                        GPU: {blade.load}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          blade.active
                            ? "bg-pink-500/20 text-pink-300 border border-pink-500/30"
                            : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                        }`}
                      >
                        {blade.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Hardware Specifications Footer */}
              <div className="mt-4 pt-3 border-t border-white/5 grid grid-cols-3 gap-2 text-center">
                <div className="p-2 rounded-lg bg-black/40">
                  <span className="block text-[10px] text-gray-400">Render Res</span>
                  <span className="text-xs font-bold text-cyan-300">4K / 60 FPS</span>
                </div>
                <div className="p-2 rounded-lg bg-black/40">
                  <span className="block text-[10px] text-gray-400">Console Fleet</span>
                  <span className="text-xs font-bold text-white">1,000 Units</span>
                </div>
                <div className="p-2 rounded-lg bg-black/40">
                  <span className="block text-[10px] text-gray-400">Direct Uplink</span>
                  <span className="text-xs font-bold text-emerald-400">10 Gbps Fiber</span>
                </div>
              </div>
            </div>

            {/* CENTER: FIBER CONDUIT & STREAM PULSE (1 Column) */}
            <div className="lg:col-span-1 flex flex-col items-center justify-center py-2 lg:py-0">
              <div className="flex lg:flex-col items-center justify-center gap-2">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-pink-500 p-[2px] shadow-lg shadow-pink-500/40 animate-pulse">
                  <div className="w-full h-full bg-[#0b0b14] rounded-full flex items-center justify-center">
                    <Wifi className="w-5 h-5 text-cyan-400" />
                  </div>
                </div>
                <div className="text-center">
                  <span className="font-mono text-xs font-extrabold text-pink-400 block">
                    {regionPings[selectedRegion].ping}
                  </span>
                  <span className="text-[9px] uppercase tracking-wider text-gray-400 font-bold block">
                    Ultra Low Ping
                  </span>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE: USER'S POTATO PC / OLD LAPTOP (5 Columns) */}
            <div className="lg:col-span-5 bg-gradient-to-b from-[#161224] to-[#0f0c1a] border border-pink-500/30 rounded-2xl p-5 sm:p-6 relative overflow-hidden shadow-xl shadow-pink-950/20 group hover:border-pink-400 transition-all">
              <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 rounded-full blur-2xl pointer-events-none" />

              {/* Title & Badge */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-pink-500/20 text-pink-400">
                    <Laptop className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm text-white tracking-wide uppercase">
                      Your Everyday Setup
                    </h3>
                    <p className="text-[11px] text-gray-400">
                      Old 2016 Laptop / Intel Celeron / Mac / Phone
                    </p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-pink-400/10 text-pink-300 border border-pink-400/30">
                  NO EXPENSIVE GPU REQUIRED
                </span>
              </div>

              {/* Simulated In-Game Screen */}
              <div className="relative rounded-xl overflow-hidden border border-white/10 bg-black aspect-video flex flex-col justify-between p-3.5 group-hover:shadow-lg group-hover:shadow-pink-500/20 transition-all">
                {/* GTA 6 Vice City Simulated Backdrop */}
                <div className="absolute inset-0 bg-gradient-to-tr from-pink-900/60 via-purple-900/40 to-cyan-900/40" />
                
                {/* Neon Palm Trees & Cyber Sunset graphic vibes */}
                <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-t from-pink-500 to-yellow-400 blur-sm" />
                </div>

                {/* In-Game HUD Overlays */}
                <div className="relative z-10 flex items-center justify-between text-[11px] font-mono">
                  <span className="px-2 py-0.5 rounded bg-black/70 text-emerald-400 font-bold border border-emerald-500/30 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    FPS: 60.0
                  </span>
                  <span className="px-2 py-0.5 rounded bg-black/70 text-cyan-300 font-semibold border border-white/10">
                    RES: 1080P 60HZ
                  </span>
                </div>

                {/* Center In-Game Prompt */}
                <div className="relative z-10 text-center my-auto">
                  <div className="inline-block px-3 py-1.5 rounded-lg bg-black/80 backdrop-blur-md border border-pink-500/40">
                    <p className="text-xs font-extrabold text-white tracking-wider uppercase flex items-center gap-2">
                      <span className="text-pink-400">GTA VI:</span> Vice City Online
                    </p>
                    <p className="text-[10px] text-gray-300">
                      Connected to PS5 Rig #401 • Controls: Active
                    </p>
                  </div>
                </div>

                {/* Bottom Game Controls status */}
                <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-gray-300">
                  <span className="bg-black/60 px-2 py-0.5 rounded">
                    Input: Xbox / PS / Keyboard
                  </span>
                  <span className="bg-black/60 px-2 py-0.5 rounded text-pink-300 font-bold">
                    Laptop Temp: 38°C (Zero Heat)
                  </span>
                </div>
              </div>

              {/* Hardware Stress Breakdown */}
              <div className="mt-4 pt-3 border-t border-white/5 grid grid-cols-3 gap-2 text-center">
                <div className="p-2 rounded-lg bg-black/40">
                  <span className="block text-[10px] text-gray-400">Your CPU Load</span>
                  <span className="text-xs font-bold text-emerald-400">&lt; 4% (Zero Lag)</span>
                </div>
                <div className="p-2 rounded-lg bg-black/40">
                  <span className="block text-[10px] text-gray-400">Storage Used</span>
                  <span className="text-xs font-bold text-cyan-300">0 GB (Cloud)</span>
                </div>
                <div className="p-2 rounded-lg bg-black/40">
                  <span className="block text-[10px] text-gray-400">Controls</span>
                  <span className="text-xs font-bold text-pink-300">Full Keyboard/Pad</span>
                </div>
              </div>

            </div>

          </div>

          {/* Bottom Fast Info Banner */}
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs text-gray-400">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Full Story Mode & Save State Protection</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Works directly in Chrome, Edge, Safari, or App</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Instant Rig Allocation (No Waiting Lines with Heist Pass)</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
