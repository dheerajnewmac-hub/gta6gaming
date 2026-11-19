"use client";

import React, { useRef, useState } from "react";
import { Play, Pause, Radio, Activity, Eye, Zap } from "lucide-react";

interface ServerMapProps {
  selectedCluster: string;
  onSelectCluster: (id: string) => void;
}

interface NodeBadge {
  id: string;
  label: string;
  code: string;
  ping: string;
  color: string;
  left: string;
  top: string;
}

const NODES: NodeBadge[] = [
  { id: "us", label: "US-East", code: "Equinix NY5", ping: "10-14ms", color: "#06b6d4", left: "22%", top: "36%" },
  { id: "eu", label: "EU-Central", code: "Equinix FR2", ping: "16-20ms", color: "#3b82f6", left: "50%", top: "32%" },
  { id: "latam", label: "LATAM-South", code: "Equinix SP4", ping: "24-28ms", color: "#a855f7", left: "32%", top: "70%" },
  { id: "apac", label: "APAC-East", code: "Equinix TY8", ping: "22-26ms", color: "#ec4899", left: "85%", top: "42%" },
];

export function ServerMapCanvas({ selectedCluster, onSelectCluster }: ServerMapProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  return (
    <div className="relative w-full rounded-3xl bg-[#03040c] border border-cyan-500/30 p-2 sm:p-3 shadow-[0_0_60px_rgba(6,182,212,0.18)] overflow-hidden">
      
      {/* 3D Map Video Container */}
      <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] rounded-2xl overflow-hidden bg-black">
        <video
          ref={videoRef}
          src="/global-map-animation.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover select-none"
        />

        {/* Cinematic Gradient Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#03040c] via-transparent to-[#03040c]/40 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#03040c]/60 via-transparent to-[#03040c]/60 pointer-events-none" />

        {/* Telemetry Header HUD */}
        <div className="absolute top-3 left-3 sm:top-5 sm:left-5 flex flex-wrap items-center gap-2 z-20">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-cyan-500/40 text-cyan-300 text-[10px] sm:text-xs font-mono font-bold shadow-lg">
            <Radio className="w-3 h-3 text-cyan-400 animate-pulse" />
            <span>GLOBAL FIBER TELEMETRY • LIVE</span>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-emerald-400 text-[10px] sm:text-xs font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span>SUB-30MS SPEED ACTIVE</span>
          </div>
        </div>

        {/* Video Control Toggle */}
        <div className="absolute top-3 right-3 sm:top-5 sm:right-5 z-20">
          <button
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause Map Animation" : "Play Map Animation"}
            className="w-8 h-8 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition-all shadow-md"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
          </button>
        </div>

        {/* Interactive Clickable Node Hotspots */}
        {NODES.map((node) => {
          const isSelected = selectedCluster === node.id;
          return (
            <button
              key={node.id}
              onClick={() => onSelectCluster(node.id)}
              style={{ left: node.left, top: node.top }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center group transition-all ${
                isSelected ? "scale-110" : "hover:scale-105"
              }`}
            >
              <div
                className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center border transition-all ${
                  isSelected
                    ? "bg-white text-black border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.8)] scale-110"
                    : "bg-black/60 backdrop-blur-md text-white border-white/30 hover:border-cyan-400"
                }`}
              >
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: node.color }} />
              </div>
              <div
                className={`mt-1 px-2 py-0.5 rounded-md font-mono text-[9px] sm:text-[10px] font-bold backdrop-blur-md border whitespace-nowrap shadow-lg transition-all ${
                  isSelected
                    ? "bg-cyan-950/90 text-cyan-200 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                    : "bg-black/70 text-gray-300 border-white/10 group-hover:border-cyan-500/50"
                }`}
              >
                {node.label} • {node.ping}
              </div>
            </button>
          );
        })}

        {/* Bottom Banner Status Bar */}
        <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-6 sm:right-6 flex items-center justify-between z-20 px-4 py-2 rounded-xl bg-black/70 backdrop-blur-md border border-white/10 font-mono text-[10px] sm:text-xs">
          <div className="flex items-center gap-2 text-gray-300">
            <span className="text-cyan-400 font-bold">1,000 PS5 HARDWARE UNITS:</span>
            <span className="hidden sm:inline text-gray-400">Direct 10Gbps Edge Peering via Equinix Datacenters</span>
          </div>
          <span className="text-emerald-400 font-bold">ZERO VPN NEEDED</span>
        </div>

      </div>
    </div>
  );
}
