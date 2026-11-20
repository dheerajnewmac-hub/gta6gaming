"use client";

import React, { useRef, useState } from "react";
import { Zap, Cloud, Globe, Shield, Play, Pause, Volume2, VolumeX, ArrowRight, CheckCircle2, Server } from "lucide-react";

interface HeroNeonDeskProps {
  onOpenPlans: () => void;
  onOpenHowItWorks: () => void;
}

export function HeroNeonDesk({ onOpenPlans, onOpenHowItWorks }: HeroNeonDeskProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <section id="home" className="relative pt-24 sm:pt-28 pb-10 overflow-hidden">
      {/* Background Ambience Neon Glow */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[500px] bg-purple-600/15 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[500px] bg-cyan-500/15 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ========================================================================= */}
        {/* ROCKSTAR GAMES STYLE AAA HERO STAGE WITH REAL LIVE ANIMATION VIDEO */}
        {/* ========================================================================= */}
        <div className="relative rounded-3xl overflow-hidden border border-white/15 shadow-[0_0_80px_rgba(0,0,0,0.9)] bg-[#050612]">
          
          {/* Main Video Viewport (16:9 Aspect Ratio) */}
          <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] lg:aspect-[21/10] min-h-[460px] sm:min-h-[540px] overflow-hidden flex flex-col justify-between p-4 sm:p-8">
            
            {/* The Actual Real Animation Video Running */}
            <video
              ref={videoRef}
              src="/gta6-animation.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover object-center"
            />

            {/* Cinematic Rockstar Dark Gradients to make typography pop */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#060714] via-[#060714]/40 to-[#060714]/80 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#060714]/90 via-[#060714]/30 to-[#060714]/80 pointer-events-none" />

            {/* TOP HUD BAR: Real-Time Stream Telemetry */}
            <div className="relative z-20 flex items-center justify-between gap-3 text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-black/80 backdrop-blur-md text-emerald-400 font-bold border border-emerald-500/40 flex items-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  LIVE PS5 CLOUD STREAM (60.0 FPS)
                </span>
                <span className="hidden md:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md text-cyan-300 font-semibold border border-white/10">
                  <Server className="w-3.5 h-3.5 text-cyan-400" />
                  NODE #PS5-ARRAY-08
                </span>
              </div>

              {/* Video Play/Pause & Sound Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={togglePlay}
                  aria-label={isPlaying ? "Pause Video" : "Play Video"}
                  className="p-2 rounded-xl bg-black/80 backdrop-blur-md border border-white/15 text-gray-300 hover:text-white transition-all hover:scale-105"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
                <button
                  onClick={toggleMute}
                  aria-label={isMuted ? "Unmute Video" : "Mute Video"}
                  className="p-2 rounded-xl bg-black/80 backdrop-blur-md border border-white/15 text-gray-300 hover:text-white transition-all hover:scale-105"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* CENTER CONTENT: The Core Messaging matching Mockup & Rockstar Polish */}
            <div className="relative z-20 max-w-2xl my-auto text-left sm:text-center sm:mx-auto py-6">
              
              {/* Green Pill Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0a231b]/90 border border-emerald-500/60 backdrop-blur-md mb-4 shadow-[0_0_20px_rgba(16,185,129,0.35)]">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-bold text-emerald-400 tracking-wide">
                  Remote Console Gaming
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-none drop-shadow-[0_4px_25px_rgba(0,0,0,0.9)]">
                Play{" "}
                <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-300 to-cyan-300 drop-shadow-[0_0_35px_rgba(217,38,255,0.9)]">
                  GTA VI
                </span>
                <br />
                <span className="text-white">on Your PC</span>
              </h1>

              {/* Subheadline & Description */}
              <p className="mt-3.5 text-sm sm:text-base italic text-purple-200 font-semibold drop-shadow-md">
                Experience the next-gen adventure, remotely!
              </p>
              <p className="mt-2 text-xs sm:text-sm text-slate-200 max-w-lg sm:mx-auto font-normal leading-relaxed drop-shadow-md">
                Stream uncompressed 4K HDR at 60FPS directly to your current laptop or desktop. Zero downloads, zero hardware limits. Pure next-generation performance.
              </p>

              {/* Action Buttons */}
              <div className="mt-6 flex flex-wrap items-center sm:justify-center gap-3.5">
                <button
                  onClick={onOpenPlans}
                  className="px-7 py-3 rounded-full font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 hover:from-cyan-300 hover:to-indigo-500 shadow-[0_0_25px_rgba(0,210,255,0.6)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                >
                  <span>View Plans</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={onOpenHowItWorks}
                  className="px-7 py-3 rounded-full font-bold text-xs text-white bg-black/70 hover:bg-black/90 border border-white/25 backdrop-blur-md shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>How It Works</span>
                </button>
              </div>

            </div>

            {/* BOTTOM FEATURE BADGES: Single Horizontal Row */}
            <div className="relative z-20 pt-4 border-t border-white/10 flex items-center justify-between gap-2 text-[10px] sm:text-[11px] font-semibold text-gray-200 flex-wrap sm:flex-nowrap">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10">
                <Zap className="w-3.5 h-3.5 text-cyan-400" />
                <span>Ultra Low Latency (14ms)</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10">
                <Cloud className="w-3.5 h-3.5 text-purple-400" />
                <span>High Quality 4K 60FPS</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10">
                <Globe className="w-3.5 h-3.5 text-blue-400" />
                <span>Play Anywhere On Earth</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span>Secure &amp; Reliable PS5 Cloud</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
