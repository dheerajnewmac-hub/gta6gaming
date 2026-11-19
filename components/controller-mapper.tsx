"use client";

import React, { useState } from "react";
import { Gamepad2, Keyboard, Mouse, CheckCircle2 } from "lucide-react";

export function ControllerMapper() {
  const [activeTab, setActiveTab] = useState<"KEYBOARD" | "CONTROLLER">("KEYBOARD");

  const keyboardControls = [
    { key: "W A S D", action: "Character / Vehicle Steering", category: "Movement" },
    { key: "Mouse Aim + Left Click", action: "Precision Aiming & Shoot", category: "Combat" },
    { key: "Spacebar", action: "Handbrake (Driving) / Jump (On Foot)", category: "Action" },
    { key: "F Key", action: "Enter / Steal Vehicle", category: "Action" },
    { key: "Left Shift", action: "Sprint / Boost", category: "Movement" },
    { key: "Tab / Scroll Wheel", action: "Weapon Wheel Selector", category: "Weapons" },
    { key: "C Key", action: "Look Behind / Cinematic Camera", category: "Camera" },
    { key: "R Key", action: "Reload Weapon", category: "Combat" },
  ];

  const controllerControls = [
    { key: "Left Stick (L3)", action: "Movement / Sprint", category: "Movement" },
    { key: "Right Stick (R3)", action: "Camera Look / Sneak", category: "Camera" },
    { key: "L2 / LT", action: "Aim Weapon / Brake Vehicle", category: "Combat" },
    { key: "R2 / RT", action: "Fire Weapon / Accelerate Vehicle", category: "Combat" },
    { key: "Triangle / Y", action: "Enter / Exit Vehicle", category: "Action" },
    { key: "Square / X", action: "Jump / Climb / Reload", category: "Action" },
    { key: "Circle / B", action: "Melee / Handbrake", category: "Action" },
    { key: "L1 / LB", action: "Weapon Radial Wheel", category: "Weapons" },
  ];

  return (
    <section id="controls" className="py-24 relative overflow-hidden bg-[#090914] border-t border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Gamepad2 className="w-3.5 h-3.5" />
            Universal Input Compatibility
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Play With Any Keyboard, Mouse or Controller
          </h2>
          <p className="mt-4 text-gray-400 text-base">
            Don&apos;t have a PS5 controller? No problem. Our cloud bridge maps standard PC keys seamlessly with zero latency.
          </p>

          {/* Tab Switcher */}
          <div className="mt-8 inline-flex items-center p-1 rounded-xl bg-[#121222] border border-white/10">
            <button
              onClick={() => setActiveTab("KEYBOARD")}
              className={`px-5 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-all ${
                activeTab === "KEYBOARD"
                  ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md shadow-pink-500/30"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <Keyboard className="w-4 h-4" />
              Keyboard & Mouse Layout
            </button>
            <button
              onClick={() => setActiveTab("CONTROLLER")}
              className={`px-5 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-all ${
                activeTab === "CONTROLLER"
                  ? "bg-gradient-to-r from-cyan-400 to-blue-600 text-white shadow-md shadow-cyan-500/30"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <Gamepad2 className="w-4 h-4" />
              Xbox / PlayStation Controller
            </button>
          </div>
        </div>

        {/* Controls Layout Showcase */}
        <div className="bg-[#0e0e1c] rounded-2xl border border-white/10 p-6 sm:p-8 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(activeTab === "KEYBOARD" ? keyboardControls : controllerControls).map((ctrl, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3.5 rounded-xl bg-[#090912] border border-white/5 hover:border-pink-500/30 transition-all"
              >
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-1 rounded bg-[#16162a] border border-white/10 text-cyan-300 font-mono text-xs font-bold shadow-inner">
                    {ctrl.key}
                  </span>
                  <span className="text-sm font-semibold text-gray-200">
                    {ctrl.action}
                  </span>
                </div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-gray-500 font-semibold px-2 py-0.5 rounded bg-black/40">
                  {ctrl.category}
                </span>
              </div>
            ))}
          </div>

          {/* Quick Compatibility Highlights */}
          <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="p-3 rounded-xl bg-black/30">
              <span className="text-xs font-bold text-white block">Plug & Play</span>
              <span className="text-[11px] text-gray-400">Works with any $10 USB gamepad</span>
            </div>
            <div className="p-3 rounded-xl bg-black/30">
              <span className="text-xs font-bold text-emerald-400 block">Raw Mouse Input</span>
              <span className="text-[11px] text-gray-400">1000Hz polling rate for precise headshots</span>
            </div>
            <div className="p-3 rounded-xl bg-black/30">
              <span className="text-xs font-bold text-pink-400 block">Custom Remapping</span>
              <span className="text-[11px] text-gray-400">Change any key in your dashboard settings</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
