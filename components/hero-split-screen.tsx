"use client";

import React, { useState } from "react";
import { Server, Laptop, Wifi, Cpu, Play, CheckCircle2, Zap, ArrowRight, Shield } from "lucide-react";
import { FiberStreamCanvas } from "@/components/fiber-stream-canvas";
import { ViceCityCanvasSimulator } from "@/components/vice-city-canvas-simulator";
import { BandwidthOscilloscope } from "@/components/bandwidth-oscilloscope";

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
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[550px] bg-gradient-to-b from-pink-600/20 via-purple-600/10 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute top-1/4 left-5 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/4 right-5 w-80 h-80 bg-pink-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Headline & Value Prop */}
        <div className="text-center max-w-4xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-pink-500/40 backdrop-blur-md mb-5 shadow-lg shadow-pink-500/15">
            <span className="w-2 h-2 rounded-full bg-pink-500 animate-ping" />
            <span className="text-xs font-bold uppercase tracking-wider text-pink-400">
              1,000 High-Speed PS5 Cloud Racks
            </span>
            <span className="text-gray-500">|</span>
            <span className="text-xs font-semibold text-cyan-300">
              GTA VI 4K 60FPS On Any Device
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
            Play <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-300 to-cyan-400">Grand Theft Auto VI</span>
            <br />
            On Your Everyday Laptop, PC or Mac
          </h1>

          <p className="mt-5 text-base sm:text-lg text-gray-300 max-w-2xl mx-auto font-normal leading-relaxed">
            No $500 PlayStation 5. No $70 game disc. We stream real PS5 hardware directly into your browser with sub-20ms response time.
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
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-sm text-gray-200 bg-[#121222]/90 hover:bg-[#1a1a30] border border-white/10 hover:border-cyan-400/50 backdrop-blur-md transition-all flex items-center justify-center gap-2 shadow-lg"
            >
              <Zap className="w-4 h-4 text-yellow-400" />
              <span>Check My Ping & Speed</span>
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* INTERACTIVE SPLIT-SCREEN ANIMATION CONTAINER */}
        {/* ========================================================================= */}
        <div className="relative rounded-3xl border border-white/15 bg-[#090914]/90 backdrop-blur-2xl p-4 sm:p-8 shadow-2xl shadow-purple-950/50">
          
          {/* Region Switcher Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs sm:text-sm font-bold text-white tracking-wide">
                Live Cloud Pipeline Telemetry (Zero Fake Latency)
              </span>
            </div>

            <div className="flex items-center gap-1.5 bg-[#05050c] p-1 rounded-xl border border-white/10">
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
            <div className="lg:col-span-5 bg-gradient-to-b from-[#111122] to-[#0a0a14] border border-cyan-500/40 rounded-2xl p-5 sm:p-6 relative overflow-hidden shadow-2xl shadow-cyan-950/30">
              <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

              {/* Title & Badge */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                    <Server className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm text-white tracking-wide uppercase">
                      PS5 Cloud Rack Array #08
                    </h3>
                    <p className="text-[11px] text-gray-400">
                      Tier-4 Equinix Datacenter Node • 10 Gbps Uplink
                    </p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-black bg-cyan-400/15 text-cyan-300 border border-cyan-400/40">
                  REAL PS5 HARDWARE
                </span>
              </div>

              {/* LIVE BITSTREAM OSCILLOSCOPE */}
              <div className="my-3">
                <BandwidthOscilloscope />
              </div>

              {/* Physical PS5 Server Blades Stack */}
              <div className="space-y-2 my-4">
                {[
                  { id: "PS5-BLADE-401", status: "STREAMING 4K", load: "78%", active: true },
                  { id: "PS5-BLADE-402", status: "STANDBY (GTA VI)", load: "12%", active: false },
                  { id: "PS5-BLADE-403", status: "STREAMING 4K", load: "84%", active: true },
                ].map((blade) => (
                  <div
                    key={blade.id}
                    className="flex items-center justify-between px-3.5 py-2 rounded-xl bg-[#06060e] border border-white/5 relative overflow-hidden"
                  >
                    <div
                      className={`absolute left-0 top-0 bottom-0 w-1.5 ${
                        blade.active ? "bg-pink-500 shadow-sm shadow-pink-500" : "bg-cyan-400"
                      }`}
                    />
                    <div className="flex items-center gap-3 pl-2">
                      <Cpu className={`w-3.5 h-3.5 ${blade.active ? "text-pink-400" : "text-cyan-400"}`} />
                      <span className="font-mono text-xs font-semibold text-gray-200">
                        {blade.id}
                      </span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <span className="text-[10px] font-mono font-medium text-gray-400">
                        GPU: {blade.load}
                      </span>
                      <span
                        className={`text-[9px] font-bold px-2 py-0.5 rounded ${
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

              {/* Hardware Specs Footer */}
              <div className="mt-3 pt-3 border-t border-white/5 grid grid-cols-3 gap-2 text-center">
                <div className="p-2 rounded-lg bg-black/50">
                  <span className="block text-[10px] text-gray-400">Render Res</span>
                  <span className="text-xs font-bold text-cyan-300 font-mono">4K / 60 FPS</span>
                </div>
                <div className="p-2 rounded-lg bg-black/50">
                  <span className="block text-[10px] text-gray-400">Console Pool</span>
                  <span className="text-xs font-bold text-white font-mono">1,000 Units</span>
                </div>
                <div className="p-2 rounded-lg bg-black/50">
                  <span className="block text-[10px] text-gray-400">Direct Uplink</span>
                  <span className="text-xs font-bold text-emerald-400 font-mono">10 Gbps</span>
                </div>
              </div>
            </div>

            {/* CENTER: ANIMATED FIBER STREAM CONDUIT (1 Column) */}
            <div className="lg:col-span-1 flex flex-col items-center justify-center py-2 lg:py-0 w-full h-full min-h-[90px]">
              <FiberStreamCanvas latency={regionPings[selectedRegion].ping} />
            </div>

            {/* RIGHT SIDE: PLAYABLE USER POTATO PC SIMULATOR (5 Columns) */}
            <div className="lg:col-span-5 bg-gradient-to-b from-[#151026] to-[#0c0918] border border-pink-500/40 rounded-2xl p-5 sm:p-6 relative overflow-hidden shadow-2xl shadow-pink-950/30">
              <div className="absolute top-0 right-0 w-40 h-40 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />

              {/* Title & Badge */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-pink-500/20 text-pink-400 border border-pink-500/30">
                    <Laptop className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm text-white tracking-wide uppercase">
                      Your Everyday PC / Laptop
                    </h3>
                    <p className="text-[11px] text-gray-400">
                      2016 Intel Celeron / Core i3 / Mac / Phone
                    </p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-black bg-pink-400/15 text-pink-300 border border-pink-400/40">
                  0 GB DOWNLOAD
                </span>
              </div>

              {/* LIVE PLAYABLE CANVAS SIMULATOR */}
              <div className="w-full aspect-video rounded-xl overflow-hidden border border-white/10 shadow-2xl relative">
                <ViceCityCanvasSimulator />
              </div>

              {/* Hardware Stress Breakdown */}
              <div className="mt-4 pt-3 border-t border-white/5 grid grid-cols-3 gap-2 text-center">
                <div className="p-2 rounded-lg bg-black/50">
                  <span className="block text-[10px] text-gray-400">Your CPU Load</span>
                  <span className="text-xs font-bold text-emerald-400 font-mono">&lt; 4%</span>
                </div>
                <div className="p-2 rounded-lg bg-black/50">
                  <span className="block text-[10px] text-gray-400">Laptop Temp</span>
                  <span className="text-xs font-bold text-cyan-300 font-mono">38°C (Cool)</span>
                </div>
                <div className="p-2 rounded-lg bg-black/50">
                  <span className="block text-[10px] text-gray-400">Controls</span>
                  <span className="text-xs font-bold text-pink-300 font-mono">Keybd + Pad</span>
                </div>
              </div>

            </div>

          </div>

          {/* Bottom Fast Info Banner */}
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs text-gray-400">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Full Story Mode Progress Backed Up</span>
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
