"use client";

import React from "react";
import { Cpu, Zap, Monitor } from "lucide-react";

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
    <div className="relative rounded-2xl glass-panel p-6 sm:p-7 border border-white/[0.08] bg-[#090c24]/90 hover:border-cyan-500/40 transition-all duration-300 hover:-translate-y-1 group shadow-[0_15px_35px_rgba(0,0,0,0.6)] flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-5">
          <span className="text-xl font-bold font-mono text-cyan-400/80 tracking-widest">
            {step}
          </span>
          <span
            className={`px-3 py-1 rounded-full text-[10px] font-mono font-semibold tracking-wide ${badgeColor}`}
          >
            {badge}
          </span>
        </div>

        <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mb-4 group-hover:scale-105 group-hover:border-cyan-500/40 transition-all">
          {icon}
        </div>

        <h3 className="text-lg font-bold text-white group-hover:text-cyan-200 transition-colors tracking-tight">
          {title}
        </h3>
        <p className="text-xs text-slate-300 mt-2 leading-relaxed font-normal">
          {subtitle}
        </p>
      </div>

      <ul className="mt-6 pt-4 border-t border-white/[0.06] space-y-2.5">
        {specs.map((spec, i) => (
          <li key={i} className="flex items-center gap-2.5 text-slate-300 text-xs font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee] shrink-0" />
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
      badge: "Dedicated Hardware",
      badgeColor: "bg-purple-950/60 text-purple-200 border border-purple-500/30",
      icon: <Cpu className="w-6 h-6 text-purple-400" />,
      title: "Dedicated Console Blades",
      subtitle:
        "Every player connects to an unshared, high-performance console blade rendering true 4K HDR at a locked 60 frames per second.",
      specs: [
        "Unshared Hardware Allocation",
        "Native 4K HDR Studio Feed",
        "Zero Local Storage Required",
      ],
    },
    {
      step: "02",
      badge: "Ultra-Low Latency",
      badgeColor: "bg-cyan-950/60 text-cyan-200 border border-cyan-500/30",
      icon: <Zap className="w-6 h-6 text-cyan-400" />,
      title: "Instant Response Protocol",
      subtitle:
        "Custom-tuned low-jitter video pipeline delivering instant steering, shooting, and controller feedback with sub-15ms frame response.",
      specs: [
        "Sub-15ms Edge Frame Delivery",
        "1:1 Mouse & Controller Precision",
        "Optimized for Standard 20 Mbps Home WiFi",
      ],
    },
    {
      step: "03",
      badge: "Universal Access",
      badgeColor: "bg-pink-950/60 text-pink-200 border border-pink-500/30",
      icon: <Monitor className="w-6 h-6 text-pink-400" />,
      title: "Instant Cloud Immersion",
      subtitle:
        "No 150GB installs. No patch downloads. Launch Vice City instantly from any standard browser on your current laptop or desktop.",
      specs: [
        "Compatible with Any Laptop or Mac",
        "Plug & Play Controller & Keyboard",
        "Encrypted Cloud Save Synchronization",
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
