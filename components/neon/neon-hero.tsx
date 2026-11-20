"use client";

import React, { useState } from "react";
import { Zap, Play, ArrowRight, ShieldCheck, Monitor, Cloud, X } from "lucide-react";

interface NeonHeroProps {
  onStartPlaying: () => void;
}

export function NeonHero({ onStartPlaying }: NeonHeroProps) {
  const [trailerModal, setTrailerModal] = useState(false);

  return (
    <section className="relative w-full overflow-hidden pt-6 pb-12 sm:pt-10 sm:pb-16">
      
      {/* Background Glow Elements */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-pink-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-20 right-10 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 left-10 w-80 h-80 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Headlines & Action Buttons */}
          <div className="lg:col-span-7 space-y-5 text-left">
            
            {/* Live Now Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-[11px] font-mono tracking-wider">
              <Zap className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400 animate-pulse" />
              <span className="font-bold">LIVE NOW</span>
              <span className="text-slate-500">|</span>
              <span>GTA VI CLOUD STREAM</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.08] font-sans">
              Play{" "}
              <span className="italic bg-gradient-to-r from-pink-500 via-purple-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(236,72,153,0.6)]">
                GTA VI
              </span>
              <br />
              <span className="text-white">on Your PC</span>
            </h1>

            {/* Sub-headline */}
            <div className="space-y-1.5 max-w-xl">
              <p className="text-base sm:text-lg font-bold italic text-slate-100">
                Experience the next-gen adventure, remotely!
              </p>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Stream uncapped 4K HDR at 60FPS directly to your current laptop or desktop. Zero downloads, zero hardware limits.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                onClick={onStartPlaying}
                className="px-6 sm:px-8 py-3.5 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 hover:brightness-110 text-white font-extrabold text-xs sm:text-sm tracking-wide shadow-[0_0_25px_rgba(236,72,153,0.5)] active:scale-95 transition-all flex items-center gap-2"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Start Playing Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setTrailerModal(true)}
                className="px-5 sm:px-6 py-3.5 rounded-full bg-[#120a2e]/90 hover:bg-[#1a0f3d] border border-white/10 text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition-all"
              >
                <Play className="w-3.5 h-3.5 text-slate-300" />
                <span>Watch Trailer</span>
              </button>
            </div>

            {/* Bottom 4 Spec Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-4">
              <div className="p-2.5 rounded-2xl bg-[#0f0928]/90 border border-purple-500/20 flex items-center gap-2 text-xs">
                <Zap className="w-4 h-4 text-purple-400 shrink-0" />
                <div className="leading-tight">
                  <span className="font-bold text-white block text-[11px]">Ultra Low Latency</span>
                  <span className="text-[10px] text-slate-400 font-mono">(14ms)</span>
                </div>
              </div>

              <div className="p-2.5 rounded-2xl bg-[#0f0928]/90 border border-pink-500/20 flex items-center gap-2 text-xs">
                <span className="px-1.5 py-0.5 rounded bg-pink-500/20 text-pink-400 text-[10px] font-mono font-bold shrink-0">4K</span>
                <div className="leading-tight">
                  <span className="font-bold text-white block text-[11px]">4K 60FPS</span>
                  <span className="text-[10px] text-slate-400">Streaming</span>
                </div>
              </div>

              <div className="p-2.5 rounded-2xl bg-[#0f0928]/90 border border-cyan-500/20 flex items-center gap-2 text-xs">
                <Cloud className="w-4 h-4 text-cyan-400 shrink-0" />
                <div className="leading-tight">
                  <span className="font-bold text-white block text-[11px]">Play Anywhere</span>
                  <span className="text-[10px] text-slate-400">On Any Device</span>
                </div>
              </div>

              <div className="p-2.5 rounded-2xl bg-[#0f0928]/90 border border-emerald-500/20 flex items-center gap-2 text-xs">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <div className="leading-tight">
                  <span className="font-bold text-white block text-[11px]">Secure &amp; Reliable</span>
                  <span className="text-[10px] text-slate-400">PS5 Cloud</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Exact Graphic Art (Jason, Lucia, GTA VI logo, Car) */}
          <div className="lg:col-span-5 relative flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-lg lg:max-w-none">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/neon_ui/hero_graphic.png"
                alt="GTA VI Vice City Characters Lucia and Jason"
                className="w-full h-auto object-cover rounded-3xl drop-shadow-[0_0_35px_rgba(236,72,153,0.4)]"
              />
              {/* Soft blend gradients */}
              <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#070414] to-transparent pointer-events-none hidden lg:block" />
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#070414] to-transparent pointer-events-none" />
            </div>
          </div>

        </div>
      </div>

      {/* Trailer Video Lightbox */}
      {trailerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="relative max-w-4xl w-full bg-[#0a071f] border border-pink-500/40 rounded-3xl p-4 shadow-2xl space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <span className="text-xs font-bold text-white font-mono flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-pink-500 animate-ping" />
                Grand Theft Auto VI — Official 4K Trailer
              </span>
              <button onClick={() => setTrailerModal(false)} className="p-1 rounded-lg text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-black">
              <iframe
                src="https://www.youtube-nocookie.com/embed/QdBZY2fkU-0?autoplay=1"
                title="Grand Theft Auto VI Trailer"
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
