"use client";

import React, { useState } from "react";
import { Laptop, Cpu, Wifi, CheckCircle2, Gamepad2, Shield } from "lucide-react";

export function CompatibilitySection() {
  const [tested, setTested] = useState(false);

  return (
    <section id="compatibility" className="py-16 relative z-20 border-t border-white/5 bg-[#060714]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-block px-3.5 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-400 text-xs font-bold mb-3">
            Hardware &amp; Regional Compatibility
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Can Your PC Run GTA VI With Us?
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-gray-400">
            Because our 1,000 PS5 consoles do all the heavy rendering, your computer only needs to decode a video stream.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="rounded-2xl glass-panel p-6 border border-white/10 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-4">
                <Laptop className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">Supported Devices</h3>
              <ul className="space-y-2 text-xs text-gray-300">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Windows 10 / 11 (Any PC or Laptop)</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Apple macOS (Intel &amp; Apple Silicon M1-M4)</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Chromebooks &amp; Linux Desktops</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Chrome, Edge, Brave, Safari browsers</li>
              </ul>
            </div>
          </div>

          <div className="rounded-2xl glass-panel p-6 border border-white/10 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-4">
                <Wifi className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">Network Speeds</h3>
              <ul className="space-y-2 text-xs text-gray-300">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> 1080p 60FPS: Minimum 15 Mbps</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> 1440p / 4K HDR: Minimum 25 Mbps</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Ping &lt; 40ms to nearest edge node</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Wi-Fi 5GHz or Ethernet Cable recommended</li>
              </ul>
            </div>
          </div>

          <div className="rounded-2xl glass-panel p-6 border border-white/10 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-pink-500/10 text-pink-400 flex items-center justify-center mb-4">
                <Gamepad2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">Controllers &amp; Keys</h3>
              <ul className="space-y-2 text-xs text-gray-300">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> PC Keyboard &amp; Mouse (WASD + Mouse Aim)</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> PlayStation DualSense / DualShock 4</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Xbox Wireless / Series X / One Controllers</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Generic USB Gamepads &amp; Joysticks</li>
              </ul>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
