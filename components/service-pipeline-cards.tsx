"use client";

import React from "react";
import { Server, Wifi, Laptop, ArrowRight } from "lucide-react";

interface PipelineCardProps {
  step: string;
  badge: string;
  badgeColor: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  specs: string[];
}

function PipelineCard({
  step,
  badge,
  badgeColor,
  icon,
  title,
  subtitle,
  specs,
}: PipelineCardProps) {
  return (
    <div className="relative rounded-2xl glass-panel p-6 border border-white/10 bg-[#090c24]/90 hover:border-cyan-500/50 transition-all duration-300 hover:-translate-y-1 group shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-black font-mono text-white/30 group-hover:text-cyan-400 transition-colors">
            {step}
          </span>
          <span
            className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider ${badgeColor}`}
          >
            {badge}
          </span>
        </div>

        <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
          {icon}
        </div>

        <h3 className="text-lg font-black text-white group-hover:text-cyan-300 transition-colors">
          {title}
        </h3>
        <p className="text-xs text-gray-400 mt-1 leading-relaxed">
          {subtitle}
        </p>
      </div>

      <ul className="mt-5 pt-4 border-t border-white/5 space-y-2 text-xs">
        {specs.map((spec, i) => (
          <li key={i} className="flex items-center gap-2 text-gray-300 font-mono text-[11px]">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
            <span>{spec}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ServicePipelineCards() {
  const cards: PipelineCardProps[] = [
    {
      step: "01",
      badge: "Our Data Center",
      badgeColor: "bg-purple-950/60 text-purple-300 border border-purple-500/30",
      icon: <Server className="w-6 h-6 text-purple-400" />,
      title: "Real PS5 Hardware Fleet",
      subtitle:
        "1,000+ custom liquid-cooled PlayStation 5 consoles running physical GTA VI discs.",
      specs: [
        "AMD RDNA 2 Custom GPU",
        "4K Native 60FPS Video Feed",
        "Zero Storage Used On Your PC",
      ],
    },
    {
      step: "02",
      badge: "The WebRTC Bridge",
      badgeColor: "bg-cyan-950/60 text-cyan-300 border border-cyan-500/30",
      icon: <Wifi className="w-6 h-6 text-cyan-400" />,
      title: "Sub-30ms Ultra-Low Ping",
      subtitle:
        "Encrypted WebRTC UDP channels stream video frames with zero perceptible input lag.",
      specs: [
        "Sub-30ms Global Edge Routing",
        "1000Hz Mouse/Keyboard Mapping",
        "Works on Basic 15-25 Mbps WiFi",
      ],
    },
    {
      step: "03",
      badge: "Your Low-End Screen",
      badgeColor: "bg-pink-950/60 text-pink-300 border border-pink-500/30",
      icon: <Laptop className="w-6 h-6 text-pink-400" />,
      title: "Instant In-Browser Immersion",
      subtitle:
        "Runs inside Google Chrome, Edge, or Safari. Press F11 for full console gameplay.",
      specs: [
        "Intel i3 / 4GB RAM Supported",
        "Automatic DualSense & Xbox Gamepad",
        "Encrypted Cloud Save Sync",
      ],
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
      {cards.map((c) => (
        <PipelineCard key={c.step} {...c} />
      ))}
    </div>
  );
}
