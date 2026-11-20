"use client";

import React, { useState } from "react";
import { Laptop, Cpu, Wifi, CheckCircle2, Gamepad2, Zap, Check, X } from "lucide-react";

export function CompatibilitySection() {
  const [scanning, setScanning] = useState(false);
  const [scanned, setScanned] = useState(false);

  const runDiagnostic = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      setScanned(true);
    }, 1000);
  };

  return (
    <section id="compatibility" className="py-20 relative z-20 border-t border-white/[0.06] bg-[#050614]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-semibold mb-3 shadow-[0_0_15px_rgba(0,210,255,0.2)]">
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            Universal Compatibility
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Can Your Current Device Run GTA VI?
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-400 font-normal max-w-xl mx-auto">
            Because our dedicated hardware blades handle 100% of game physics and ray tracing, your device simply decodes a smooth 60FPS video stream.
          </p>

          {/* Interactive Diagnostic Tool */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={runDiagnostic}
              disabled={scanning}
              className="px-6 py-2.5 rounded-xl text-xs font-bold bg-[#0d122e] border border-cyan-500/50 hover:border-cyan-400 text-cyan-200 flex items-center gap-2 hover:bg-[#12193e] active:scale-95 transition-all shadow-[0_0_15px_rgba(6,182,212,0.25)]"
            >
              <Cpu className={`w-4 h-4 ${scanning ? "animate-spin text-cyan-400" : ""}`} />
              <span>{scanning ? "Analyzing Video Decoders..." : "🔍 Run Instant Hardware Diagnostic"}</span>
            </button>
            {scanned && (
              <div className="px-4 py-2 rounded-xl bg-emerald-950/60 border border-emerald-500/50 text-emerald-300 text-xs font-mono font-bold flex items-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>VERIFIED: Your Device Supports 4K/60FPS Hardware Decoding</span>
              </div>
            )}
          </div>
        </div>

        {/* Comparison: Local Hardware vs ViceCloud Cloud PS5 */}
        <div className="mb-12 p-6 sm:p-7 rounded-3xl glass-panel border border-white/[0.08] bg-gradient-to-r from-[#070919] via-[#090e28] to-[#070919]">
          <div className="text-center mb-6">
            <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">
              Efficiency Benchmark: Local Hardware vs Cloud Blade Stream
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="p-5 rounded-2xl bg-rose-950/20 border border-rose-500/20 space-y-3">
              <span className="text-xs font-bold text-rose-300 font-mono flex items-center gap-2">
                <X className="w-4 h-4 text-rose-400" /> Traditional Hardware Route ($1,500+)
              </span>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex justify-between border-b border-white/[0.05] pb-1.5">
                  <span className="text-slate-400">Hardware Investment:</span>
                  <span className="font-semibold text-white">$500 (PS5) or $1,500+ (RTX PC)</span>
                </li>
                <li className="flex justify-between border-b border-white/[0.05] pb-1.5">
                  <span className="text-slate-400">Upfront Software:</span>
                  <span className="font-semibold text-white">$70–$100 Retail Purchase</span>
                </li>
                <li className="flex justify-between border-b border-white/[0.05] pb-1.5">
                  <span className="text-slate-400">Storage Footprint:</span>
                  <span className="font-semibold text-white">150GB Local SSD Required</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-slate-400">Setup Delay:</span>
                  <span className="font-semibold text-white">3–6 Hours Download &amp; Patching</span>
                </li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-cyan-950/30 border border-cyan-500/40 space-y-3 shadow-[0_0_20px_rgba(6,182,212,0.15)]">
              <span className="text-xs font-bold text-cyan-300 font-mono flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" /> ViceCloud Cloud Streaming
              </span>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex justify-between border-b border-white/[0.05] pb-1.5">
                  <span className="text-slate-400">Hardware Investment:</span>
                  <span className="font-semibold text-emerald-400">$0 (Use Existing PC or Laptop)</span>
                </li>
                <li className="flex justify-between border-b border-white/[0.05] pb-1.5">
                  <span className="text-slate-400">Game Access:</span>
                  <span className="font-semibold text-emerald-400">Included in All Passes (From $1.99)</span>
                </li>
                <li className="flex justify-between border-b border-white/[0.05] pb-1.5">
                  <span className="text-slate-400">Storage Footprint:</span>
                  <span className="font-semibold text-emerald-400">0 GB (Runs Natively in Browser)</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-slate-400">Setup Delay:</span>
                  <span className="font-semibold text-emerald-400">&lt;10 Seconds Immediate Launch</span>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* 3 Pillar Tech Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-2xl glass-panel p-6 border border-white/[0.08] hover:border-cyan-500/30 transition-all">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-4">
              <Laptop className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">Universal Devices</h3>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400 shrink-0" /> Windows 10 &amp; 11 (Any PC or Office Laptop)</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400 shrink-0" /> Apple macOS (Intel, M1, M2, M3, M4)</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400 shrink-0" /> Chromebooks &amp; Linux Desktops (Ubuntu/Arch)</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400 shrink-0" /> Steam Deck &amp; ROG Ally Handhelds</li>
            </ul>
          </div>

          <div className="rounded-2xl glass-panel p-6 border border-white/[0.08] hover:border-purple-500/30 transition-all">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-4">
              <Wifi className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">Network Bandwidth</h3>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400 shrink-0" /> 1080p 60FPS: 15 Mbps download</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400 shrink-0" /> 1440p / 4K HDR: 25–35 Mbps download</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400 shrink-0" /> Low-jitter connection (&lt;30ms target)</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400 shrink-0" /> Standard 5GHz Wi-Fi or Ethernet</li>
            </ul>
          </div>

          <div className="rounded-2xl glass-panel p-6 border border-white/[0.08] hover:border-pink-500/30 transition-all">
            <div className="w-10 h-10 rounded-xl bg-pink-500/10 text-pink-400 flex items-center justify-center mb-4">
              <Gamepad2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">Input &amp; Controls</h3>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400 shrink-0" /> PC Keyboard &amp; Mouse (Native Pointer Lock)</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400 shrink-0" /> PlayStation DualSense &amp; DualShock 4</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400 shrink-0" /> Xbox Wireless &amp; Series X/S Controllers</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400 shrink-0" /> Universal USB Gamepads &amp; Logitech</li>
            </ul>
          </div>
        </div>

      </div>
    </section>
  );
}
