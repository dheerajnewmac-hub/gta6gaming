"use client";

import React, { useState } from "react";
import { Laptop, Keyboard, Gamepad2, Save, CheckCircle2, ArrowRight, ShieldCheck, Zap } from "lucide-react";

export function HowToPlayGuide() {
  const [activeTab, setActiveTab] = useState<"BROWSER" | "CONTROLLER" | "KEYBOARD" | "SAVES">("BROWSER");

  const tabs = [
    { id: "BROWSER", label: "1. Instant Browser Play", icon: Laptop },
    { id: "CONTROLLER", label: "2. Controller Setup", icon: Gamepad2 },
    { id: "KEYBOARD", label: "3. Keyboard & Mouse", icon: Keyboard },
    { id: "SAVES", label: "4. Cloud Saves & Resume", icon: Save },
  ] as const;

  return (
    <section id="how-to-play" className="py-16 relative z-20 border-t border-white/5 bg-[#050612]/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-400 text-xs font-bold mb-3 shadow-[0_0_15px_rgba(0,210,255,0.2)]">
            <Zap className="w-3.5 h-3.5" />
            Complete A to Z Gamer Walkthrough
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            How to Play GTA VI On Your PC: Step-by-Step
          </h2>
          <p className="mt-2.5 text-xs sm:text-sm text-gray-400 leading-relaxed">
            Everything you need to know from picking a pass to shooting and driving in Vice City with zero lag.
          </p>

          {/* Interactive Step Switcher Tabs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl bg-[#090c22] border border-white/10 max-w-2xl mx-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-[0_0_15px_rgba(59,130,246,0.5)] scale-105"
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

        {/* Tab Content Panes */}
        <div className="rounded-3xl glass-panel p-6 sm:p-8 border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.6)]">
          
          {/* TAB 1: BROWSER PLAY */}
          {activeTab === "BROWSER" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-xs font-mono font-bold">
                  STEP 01: ZERO DOWNLOAD ACCESS
                </span>
                <h3 className="text-2xl font-black text-white">
                  Launch In Google Chrome, Edge, or Safari
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                  You don&apos;t need to download 150GB of GTA VI game files. You stream direct video output from our PlayStation 5 cloud blades via hardware-accelerated WebRTC.
                </p>
                <ul className="space-y-2.5 text-xs text-gray-300">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Open ViceCloud in any standard web browser</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Click &apos;Launch Rig&apos; — an idle PS5 node is assigned in &lt;10 seconds</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Press F11 for Fullscreen 4K/60FPS cinematic immersion</li>
                </ul>
              </div>

              <div className="p-5 rounded-2xl bg-[#080a1a] border border-cyan-500/30 font-mono text-xs text-gray-300 space-y-3 shadow-inner">
                <div className="flex items-center justify-between text-cyan-400 font-bold border-b border-white/10 pb-2">
                  <span>SESSION HANDSHAKE LOG</span>
                  <span className="text-emerald-400">STATUS: 200 OK</span>
                </div>
                <p className="text-gray-400">&gt; Allocating PS5 Blade Node #408 [Miami Cluster]...</p>
                <p className="text-gray-400">&gt; Initializing WebRTC UDP Socket (48.4 Mbps stream)...</p>
                <p className="text-cyan-300">&gt; Latency: 14.2ms • Frame Pacing: 60.00 FPS Locked</p>
                <p className="text-emerald-400 font-bold">&gt; GTA VI Ready. Input stream active.</p>
              </div>
            </div>
          )}

          {/* TAB 2: CONTROLLER SETUP */}
          {activeTab === "CONTROLLER" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/30 text-xs font-mono font-bold">
                  STEP 02: GAMEPAD AUTODETECT
                </span>
                <h3 className="text-2xl font-black text-white">
                  Plug &amp; Play Any Controller
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                  Connect your PlayStation DualSense, DualShock 4, Xbox Wireless Controller, or generic USB gamepad. Our browser bridge automatically maps the buttons.
                </p>
                <ul className="space-y-2.5 text-xs text-gray-300">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> USB Cable or Bluetooth connection supported</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> DualSense haptic rumble emulation enabled</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> 1000Hz polling rate for zero stick drift delay</li>
                </ul>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-[#090b1e] border border-white/10 text-center">
                  <span className="text-sm font-bold text-white block">Left Stick (L3)</span>
                  <span className="text-gray-400 text-[11px]">Drive / Sprint</span>
                </div>
                <div className="p-3.5 rounded-xl bg-[#090b1e] border border-white/10 text-center">
                  <span className="text-sm font-bold text-white block">Right Stick (R3)</span>
                  <span className="text-gray-400 text-[11px]">Free Camera Look</span>
                </div>
                <div className="p-3.5 rounded-xl bg-[#090b1e] border border-white/10 text-center">
                  <span className="text-sm font-bold text-pink-400 block">L2 Trigger</span>
                  <span className="text-gray-400 text-[11px]">Aim Weapon / Brake</span>
                </div>
                <div className="p-3.5 rounded-xl bg-[#090b1e] border border-white/10 text-center">
                  <span className="text-sm font-bold text-cyan-400 block">R2 Trigger</span>
                  <span className="text-gray-400 text-[11px]">Fire Gun / Accelerate</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: KEYBOARD & MOUSE */}
          {activeTab === "KEYBOARD" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <span className="px-3 py-1 rounded-full bg-pink-500/10 text-pink-400 border border-pink-500/30 text-xs font-mono font-bold">
                  STEP 03: PC NATIVE CONTROLS
                </span>
                <h3 className="text-2xl font-black text-white">
                  No Controller? Play with Keyboard &amp; Mouse
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                  You don&apos;t need to spend $70 on a console controller. Our cloud input translator converts standard PC mouse aiming and keyboard strokes into sub-millisecond PS5 stick inputs.
                </p>
                <ul className="space-y-2.5 text-xs text-gray-300">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> WASD for movement &amp; vehicle steering</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Mouse cursor pointer lock for raw 1:1 aiming</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Spacebar for handbrake drifts &amp; jump</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-[#080a1a] border border-white/10 grid grid-cols-2 gap-3 text-xs">
                <div className="p-2.5 rounded-lg bg-black/40">
                  <span className="font-bold text-cyan-300">W A S D</span>
                  <p className="text-gray-400 text-[11px]">Move Character / Drive</p>
                </div>
                <div className="p-2.5 rounded-lg bg-black/40">
                  <span className="font-bold text-pink-400">Left Click</span>
                  <p className="text-gray-400 text-[11px]">Shoot Weapon / Punch</p>
                </div>
                <div className="p-2.5 rounded-lg bg-black/40">
                  <span className="font-bold text-purple-400">Right Click</span>
                  <p className="text-gray-400 text-[11px]">Precision Weapon Aim</p>
                </div>
                <div className="p-2.5 rounded-lg bg-black/40">
                  <span className="font-bold text-emerald-400">F Key</span>
                  <p className="text-gray-400 text-[11px]">Enter / Hijack Car</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: CLOUD SAVES */}
          {activeTab === "SAVES" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-mono font-bold">
                  STEP 04: AUTOMATIC PROGRESS BACKUP
                </span>
                <h3 className="text-2xl font-black text-white">
                  Your Story Missions Never Get Overwritten
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                  Every user is assigned an isolated sandboxed profile slot. When your rental time ends, your GTA VI save file is encrypted and stored in your cloud vault.
                </p>
                <ul className="space-y-2.5 text-xs text-gray-300">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Resume right where you left off tomorrow or next week</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Multiple story branches &amp; manual save slots supported</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Zero chance of another player tampering with your progress</li>
                </ul>
              </div>

              <div className="p-5 rounded-2xl bg-[#090c20] border border-emerald-500/30 text-xs space-y-3">
                <div className="flex items-center gap-2 text-emerald-400 font-bold">
                  <ShieldCheck className="w-5 h-5" />
                  <span>SECURE PROFILE VAULT ACTIVE</span>
                </div>
                <p className="text-gray-300">
                  Profile Slot: <span className="font-mono text-cyan-300">USER_VAULT_#7741</span>
                </p>
                <p className="text-gray-400">
                  Current Quest: <span className="text-white font-semibold">Vice Port Cargo Heist (Chapter 3)</span>
                </p>
                <p className="text-gray-400">
                  Last Saved: <span className="text-white font-semibold">Automatic Cloud Sync Completed</span>
                </p>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
