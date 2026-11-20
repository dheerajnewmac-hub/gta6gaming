"use client";

import React from "react";
import { Gamepad2, Zap, Play, ChevronRight } from "lucide-react";

export function NeonHowItWorks() {
  return (
    <section id="how-it-works" className="relative w-full py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="space-y-2 mb-8 sm:mb-12">
          <span className="text-[11px] font-mono tracking-widest text-cyan-400 font-bold uppercase block">
            GET STARTED IN MINUTES
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            How It Works
          </h2>
        </div>

        {/* Main Content Grid: 3 Steps on Left, Car Art on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: 3 Steps */}
          <div className="lg:col-span-7 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-start">
              
              {/* Step 1 */}
              <div className="p-4 rounded-2xl bg-[#0e0726]/80 border border-purple-500/20 space-y-3 relative group">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white font-black text-sm shadow-[0_0_15px_rgba(168,85,247,0.5)]">
                    <Gamepad2 className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono font-bold text-purple-400">01</span>
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-white mb-1">Choose a Plan</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Pick the perfect plan for your gaming needs.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="p-4 rounded-2xl bg-[#0e0726]/80 border border-purple-500/20 space-y-3 relative group">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white font-black text-sm shadow-[0_0_15px_rgba(168,85,247,0.5)]">
                    <Zap className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono font-bold text-pink-400">02</span>
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-white mb-1">Click &amp; Play</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Get instant access no installation required.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="p-4 rounded-2xl bg-[#0e0726]/80 border border-purple-500/20 space-y-3 relative group">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white font-black text-sm shadow-[0_0_15px_rgba(168,85,247,0.5)]">
                    <Play className="w-5 h-5 fill-white" />
                  </div>
                  <span className="text-xs font-mono font-bold text-cyan-400">03</span>
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-white mb-1">Enjoy GTA VI</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Jump into the game and start playing!
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Neon Car Art & Vice City Graffiti */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="relative w-full max-w-md">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/neon_ui/how_it_works_car.png"
                alt="Vice City Sports Car and Neon Skyline"
                className="w-full h-auto object-contain rounded-2xl drop-shadow-[0_0_35px_rgba(168,85,247,0.35)]"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
