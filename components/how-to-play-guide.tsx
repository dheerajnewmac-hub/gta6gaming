"use client";

import React, { useState } from "react";
import { Laptop, Keyboard, Gamepad2, Save, CheckCircle2, Zap, Play, Terminal } from "lucide-react";

export function HowToPlayGuide() {
  const [activeTab, setActiveTab] = useState<"BROWSER" | "CONTROLLER" | "KEYBOARD" | "SAVES">("BROWSER");
  const [simulating, setSimulating] = useState(false);
  const [simStep, setSimStep] = useState(0);

  const startSimulation = () => {
    setSimulating(true);
    setSimStep(1);
    setTimeout(() => setSimStep(2), 700);
    setTimeout(() => setSimStep(3), 1400);
    setTimeout(() => {
      setSimStep(4);
      setSimulating(false);
    }, 2100);
  };

  const tabs = [
    { id: "BROWSER", label: "1. Instant Browser Play", icon: Laptop },
    { id: "CONTROLLER", label: "2. Controller Setup", icon: Gamepad2 },
    { id: "KEYBOARD", label: "3. Keyboard & Mouse", icon: Keyboard },
    { id: "SAVES", label: "4. Cloud Saves & Resume", icon: Save },
  ] as const;

  return (
    <section id="how-to-play" className="py-20 relative z-20 border-t border-white/5 bg-[#040614]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-400 text-xs font-bold mb-3 shadow-[0_0_15px_rgba(0,210,255,0.2)]">
            <Zap className="w-3.5 h-3.5" />
            Complete A to Z Gamer Walkthrough
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            How to Play GTA VI On Your PC: Step-by-Step
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-gray-400">
            From picking your pass to driving supercars in Vice City in under 45 seconds. Zero downloads required.
          </p>

          {/* Tab Switchers */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl bg-[#080b22] border border-white/10 max-w-2xl mx-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_15px_rgba(6,182,212,0.4)] scale-105"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Card */}
        <div className="rounded-3xl glass-panel p-6 sm:p-8 border border-white/10 bg-[#07091d] shadow-[0_15px_50px_rgba(0,0,0,0.7)]">
          
          {/* TAB 1: BROWSER */}
          {activeTab === "BROWSER" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-xs font-mono font-bold">
                  STEP 01: ZERO DOWNLOAD ACCESS
                </span>
                <h3 className="text-2xl font-black text-white">
                  Launch In Google Chrome, Edge, or Safari
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                  No 150GB game install. Stream studio-grade 4K 60FPS video directly from dedicated hardware console blades via low-latency WebRTC.
                </p>
                <ul className="space-y-2 text-xs text-gray-300">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Open ViceCloud in any standard web browser</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Pick your pass and get an allocated PS5 blade in &lt;10 seconds</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Press F11 for Fullscreen 4K/60FPS cinematic immersion</li>
                </ul>
              </div>

              {/* Realistic Browser Window Frame with Interactive Simulation */}
              <div className="rounded-2xl border border-cyan-500/40 bg-[#03040a] overflow-hidden shadow-[0_0_30px_rgba(6,182,212,0.15)]">
                <div className="flex items-center justify-between px-4 py-2.5 bg-[#090d24] border-b border-white/10">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                  </div>
                  <span className="text-[11px] font-mono text-gray-400 truncate max-w-[200px]">
                    https://play.vicecloud.gg/stream/session-408
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold">60.0 FPS LOCKED</span>
                </div>
                <div className="p-5 font-mono text-xs space-y-2.5">
                  <div className="flex items-center justify-between pb-2 border-b border-white/5 text-gray-400">
                    <span className="flex items-center gap-1.5"><Terminal className="w-3.5 h-3.5 text-cyan-400" /> WEBRTC SIGNALING</span>
                    <button
                      onClick={startSimulation}
                      disabled={simulating}
                      className="px-2.5 py-1 rounded-md bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 text-[10px] font-bold border border-cyan-500/40 transition-all flex items-center gap-1"
                    >
                      <Play className="w-3 h-3" />
                      <span>{simulating ? "Connecting..." : "Simulate Stream Connect"}</span>
                    </button>
                  </div>
                  <p className="text-gray-400">&gt; Allocating PS5 Hardware Node #408 [Miami Cluster]...</p>
                  <p className={simStep >= 1 ? "text-cyan-300" : "text-gray-600"}>&gt; SDP Offer / Answer Exchange: Success (UDP Port 443)</p>
                  <p className={simStep >= 2 ? "text-cyan-300" : "text-gray-600"}>&gt; Hardware H.265 60FPS Video Pipeline: 14.2ms Latency</p>
                  <p className={simStep >= 3 ? "text-emerald-400 font-bold" : "text-gray-600"}>&gt; Input Polling 1000Hz Active. Vice City Session Ready!</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: CONTROLLER */}
          {activeTab === "CONTROLLER" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/30 text-xs font-mono font-bold">
                  STEP 02: GAMEPAD AUTODETECT
                </span>
                <h3 className="text-2xl font-black text-white">Plug &amp; Play Any Controller</h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                  Connect PlayStation DualSense, Xbox Wireless, or USB gamepads. Browser automatically bridges rumble and analog triggers.
                </p>
                <ul className="space-y-2 text-xs text-gray-300">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Zero software drivers needed — browser native WebHID</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> DualSense haptic rumble emulation supported</li>
                </ul>
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-[#0a0d26] border border-white/10 text-center">
                  <span className="text-xs font-bold text-cyan-400 block">Left Stick (L3)</span>
                  <span className="text-gray-400 text-[11px]">Drive / Sprint</span>
                </div>
                <div className="p-3.5 rounded-xl bg-[#0a0d26] border border-white/10 text-center">
                  <span className="text-xs font-bold text-cyan-400 block">Right Stick (R3)</span>
                  <span className="text-gray-400 text-[11px]">Camera Pan</span>
                </div>
                <div className="p-3.5 rounded-xl bg-[#0a0d26] border border-white/10 text-center">
                  <span className="text-xs font-bold text-pink-400 block">L2 Trigger</span>
                  <span className="text-gray-400 text-[11px]">Aim Weapon / Brake</span>
                </div>
                <div className="p-3.5 rounded-xl bg-[#0a0d26] border border-white/10 text-center">
                  <span className="text-xs font-bold text-pink-400 block">R2 Trigger</span>
                  <span className="text-gray-400 text-[11px]">Accelerate / Fire</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: KEYBOARD */}
          {activeTab === "KEYBOARD" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <span className="px-3 py-1 rounded-full bg-pink-500/10 text-pink-400 border border-pink-500/30 text-xs font-mono font-bold">
                  STEP 03: PC NATIVE CONTROLS
                </span>
                <h3 className="text-2xl font-black text-white">No Controller? Play with Keyboard &amp; Mouse</h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                  Our cloud input translator converts standard PC mouse aiming and keyboard strokes into sub-millisecond PS5 stick inputs.
                </p>
                <ul className="space-y-2 text-xs text-gray-300">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Native Pointer Lock for 1:1 mouse aim precision</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Fully remappable keys inside the in-stream HUD</li>
                </ul>
              </div>
              <div className="grid grid-cols-3 gap-2.5 text-center text-xs">
                <div className="p-3 rounded-xl bg-[#0a0d26] border border-cyan-500/30">
                  <span className="font-mono text-cyan-400 font-bold block">WASD</span>
                  <span className="text-[10px] text-gray-400">Movement / Steer</span>
                </div>
                <div className="p-3 rounded-xl bg-[#0a0d26] border border-cyan-500/30">
                  <span className="font-mono text-pink-400 font-bold block">MOUSE L / R</span>
                  <span className="text-[10px] text-gray-400">Shoot / Aim</span>
                </div>
                <div className="p-3 rounded-xl bg-[#0a0d26] border border-cyan-500/30">
                  <span className="font-mono text-white font-bold block">SPACE / F</span>
                  <span className="text-[10px] text-gray-400">Handbrake / Enter</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: SAVES */}
          {activeTab === "SAVES" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-mono font-bold">
                  STEP 04: PERSISTENT PROFILE VAULT
                </span>
                <h3 className="text-2xl font-black text-white">Save Anywhere, Resume Anytime</h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                  Your GTA VI storyline missions, weapons, supercars, and money are auto-synced to your encrypted cloud profile vault.
                </p>
                <ul className="space-y-2 text-xs text-gray-300">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> End-to-end AES-256 cloud save encryption</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Switch seamlessly between laptop, desktop, and tablet</li>
                </ul>
              </div>
              <div className="p-5 rounded-2xl bg-[#0a0d26] border border-emerald-500/30 text-xs space-y-2.5 font-mono">
                <div className="flex justify-between text-emerald-400 font-bold border-b border-white/10 pb-2">
                  <span>GAMER CLOUD PROFILE #8821</span>
                  <span>SYNC: ACTIVE</span>
                </div>
                <p className="text-gray-300">• Mission Progress: &quot;Vice City Vice&quot; (42% Completed)</p>
                <p className="text-gray-300">• Bank Balance: $2,450,000 (Vice National Bank)</p>
                <p className="text-cyan-300">• Last Checkpoint: Ocean Beach Penthouse (Auto-saved 2m ago)</p>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
