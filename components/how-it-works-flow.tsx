"use client";

import React from "react";
import { ChevronRight, Zap, Monitor, Cloud, Gamepad } from "lucide-react";

export function HowItWorksFlow() {
  return (
    <section id="how-it-works" className="py-8 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl glass-panel border border-white/10 p-5 sm:p-7 shadow-[0_10px_35px_rgba(0,0,0,0.5)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* Left Title: How It Works? */}
            <div className="lg:col-span-3">
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                How It Works?
              </h2>
              <p className="text-xs text-gray-400 mt-1">
                Get started in just 3 simple steps
              </p>
            </div>

            {/* Middle 3-Step Chain */}
            <div className="lg:col-span-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              
              {/* Step 01 */}
              <div className="flex items-center gap-3">
                <span className="text-xl font-black font-mono text-cyan-400">
                  01
                </span>
                <div className="w-10 h-10 rounded-xl bg-cyan-950/40 border border-cyan-500/30 flex items-center justify-center text-cyan-300 shrink-0">
                  <Gamepad className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-xs font-bold text-white leading-tight">
                    Our PS5
                  </span>
                  <span className="block text-[11px] text-gray-400 leading-tight">
                    Runs the Game
                  </span>
                </div>
              </div>

              {/* Arrow */}
              <ChevronRight className="w-4 h-4 text-cyan-400 hidden sm:block shrink-0" />

              {/* Step 02 */}
              <div className="flex items-center gap-3">
                <span className="text-xl font-black font-mono text-cyan-400">
                  02
                </span>
                <div className="w-10 h-10 rounded-xl bg-blue-950/40 border border-blue-500/30 flex items-center justify-center text-blue-300 shrink-0">
                  <Cloud className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-xs font-bold text-white leading-tight">
                    Stream to
                  </span>
                  <span className="block text-[11px] text-gray-400 leading-tight">
                    Your PC
                  </span>
                </div>
              </div>

              {/* Arrow */}
              <ChevronRight className="w-4 h-4 text-cyan-400 hidden sm:block shrink-0" />

              {/* Step 03 */}
              <div className="flex items-center gap-3">
                <span className="text-xl font-black font-mono text-cyan-400">
                  03
                </span>
                <div className="w-10 h-10 rounded-xl bg-purple-950/40 border border-purple-500/30 flex items-center justify-center text-purple-300 shrink-0">
                  <Monitor className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-xs font-bold text-white leading-tight">
                    Play GTA VI
                  </span>
                  <span className="block text-[11px] text-gray-400 leading-tight">
                    Instantly
                  </span>
                </div>
              </div>

            </div>

            {/* Right Card: No Downloads / No Hassle */}
            <div className="lg:col-span-3">
              <div className="p-3.5 rounded-xl bg-gradient-to-r from-purple-900/60 to-indigo-900/60 border border-purple-500/40 flex items-center gap-3 shadow-[0_0_20px_rgba(147,51,234,0.3)]">
                <div className="p-2 rounded-lg bg-purple-500/30 text-purple-200">
                  <Zap className="w-5 h-5 text-purple-300 fill-purple-300" />
                </div>
                <div>
                  <span className="block text-xs font-extrabold text-white leading-tight">
                    No Downloads
                  </span>
                  <span className="block text-xs font-semibold text-purple-300 leading-tight">
                    No Hassle
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
