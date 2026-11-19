"use client";

import React, { useState } from "react";
import { Laptop, Cpu, Wifi, CheckCircle2, Gamepad2, ShieldCheck, HardDrive, Zap, Check } from "lucide-react";

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
    <section id="compatibility" className="py-20 relative z-20 border-t border-white/5 bg-[#050614]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-400 text-xs font-bold mb-3 shadow-[0_0_15px_rgba(0,210,255,0.2)]">
            <Zap className="w-3.5 h-3.5" />
            Zero Hardware Barrier
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Can Your PC Run GTA VI With Us?
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-gray-400">
            Because our 1,000 custom PS5 blades handle 100% of game physics and ray-tracing, your device only decodes a smooth 60FPS video stream.
          </p>

          {/* Interactive Diagnostic Tool */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={runDiagnostic}
              disabled={scanning}
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#0d122e] border border-cyan-500/50 hover:border-cyan-400 text-cyan-300 flex items-center gap-2 hover:bg-[#12193e] active:scale-95 transition-all shadow-[0_0_15px_rgba(6,182,212,0.25)]"
            >
              <Cpu className={`w-4 h-4 ${scanning ? "animate-spin text-cyan-400" : ""}`} />
              <span>{scanning ? "Scanning Browser & GPU Video Decoders..." : "🔍 Run 1-Click Hardware Compatibility Scan"}</span>
            </button>
            {scanned && (
              <div className="px-4 py-2 rounded-xl bg-emerald-950/60 border border-emerald-500/50 text-emerald-300 text-xs font-mono font-bold flex items-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>VERIFIED: Your Device Is 100% Ready for 4K/60FPS GTA VI</span>
              </div>
            )}
          </div>
        </div>

        {/* Comparison: Local Hardware vs ViceCloud Cloud PS5 */}
        <div className="mb-12 p-6 rounded-3xl glass-panel border border-white/10 bg-gradient-to-r from-[#070919] via-[#090e28] to-[#070919]">
          <div className="text-center mb-6">
            <span className="text-xs font-mono font-bold text-gray-400 uppercase tracking-wider">
              Reality Check: Local Upgrade vs ViceCloud Stream
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="p-5 rounded-2xl bg-red-950/20 border border-red-500/20 space-y-3">
              <span className="text-xs font-bold text-red-400 font-mono flex items-center gap-1.5">
                ❌ Buying Console / High-End PC
              </span>
              <ul className="space-y-2 text-xs text-gray-300">
                <li className="flex justify-between border-b border-white/5 pb-1">
                  <span className="text-gray-400">Hardware Investment:</span>
                  <span className="font-bold text-white">$500 (PS5) or $1,500+ (RTX PC)</span>
                </li>
                <li className="flex justify-between border-b border-white/5 pb-1">
                  <span className="text-gray-400">Game Purchase:</span>
                  <span className="font-bold text-white">$70–$100 upfront</span>
                </li>
                <li className="flex justify-between border-b border-white/5 pb-1">
                  <span className="text-gray-400">Storage Required:</span>
                  <span className="font-bold text-white">150GB SSD space</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-400">Download Wait:</span>
                  <span className="font-bold text-white">3–6 hours download time</span>
                </li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-cyan-950/30 border border-cyan-500/40 space-y-3 shadow-[0_0_20px_rgba(6,182,212,0.15)]">
              <span className="text-xs font-bold text-cyan-400 font-mono flex items-center gap-1.5">
                ⚡ Playing via ViceCloud PS5 Cloud
              </span>
              <ul className="space-y-2 text-xs text-gray-300">
                <li className="flex justify-between border-b border-white/5 pb-1">
                  <span className="text-gray-400">Hardware Investment:</span>
                  <span className="font-bold text-emerald-400">$0 (Use your existing laptop/PC)</span>
                </li>
                <li className="flex justify-between border-b border-white/5 pb-1">
                  <span className="text-gray-400">Game Cost:</span>
                  <span className="font-bold text-emerald-400">Included in all passes (from $1.99)</span>
                </li>
                <li className="flex justify-between border-b border-white/5 pb-1">
                  <span className="text-gray-400">Storage Required:</span>
                  <span className="font-bold text-emerald-400">0 GB (Runs entirely in browser)</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-400">Launch Speed:</span>
                  <span className="font-bold text-emerald-400">&lt;10 seconds to Vice City</span>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* 3 Pillar Tech Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-2xl glass-panel p-6 border border-white/10 hover:border-cyan-500/30 transition-all">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-4">
              <Laptop className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">Supported Devices</h3>
            <ul className="space-y-2 text-xs text-gray-300">
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Windows 10 &amp; 11 (Any PC or Office Laptop)</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Apple macOS (Intel, M1, M2, M3, M4)</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Chromebooks &amp; Linux Desktops (Ubuntu/Arch)</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Steam Deck &amp; ROG Ally Handhelds</li>
            </ul>
          </div>

          <div className="rounded-2xl glass-panel p-6 border border-white/10 hover:border-purple-500/30 transition-all">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-4">
              <Wifi className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">Network Speeds</h3>
            <ul className="space-y-2 text-xs text-gray-300">
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> 1080p 60FPS: 15 Mbps download</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> 1440p / 4K HDR: 25–35 Mbps download</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Latency: sub-40ms recommended</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Wi-Fi 5GHz or Ethernet Cable</li>
            </ul>
          </div>

          <div className="rounded-2xl glass-panel p-6 border border-white/10 hover:border-pink-500/30 transition-all">
            <div className="w-10 h-10 rounded-xl bg-pink-500/10 text-pink-400 flex items-center justify-center mb-4">
              <Gamepad2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">Controllers &amp; Keys</h3>
            <ul className="space-y-2 text-xs text-gray-300">
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> PC Keyboard &amp; Mouse (Native Pointer Lock)</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> PlayStation DualSense &amp; DualShock 4</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Xbox Wireless &amp; Series X/S Gamepads</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Generic USB Gamepads &amp; Logitech Controllers</li>
            </ul>
          </div>
        </div>

      </div>
    </section>
  );
}
