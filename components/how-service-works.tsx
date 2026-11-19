"use client";

import React from "react";
import { Zap } from "lucide-react";
import { ServicePipelineCards } from "./service-pipeline-cards";
import { PlayerJourneyRoadmap } from "./player-journey-roadmap";

interface HowServiceWorksProps {
  onSelectPlan: () => void;
}

export function HowServiceWorks({ onSelectPlan }: HowServiceWorksProps) {
  return (
    <section id="how-service-works" className="py-16 relative z-20 bg-[#060818]/80 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/50 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-bold uppercase tracking-wider mb-3 shadow-[0_0_15px_rgba(6,182,212,0.25)]">
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            <span>Smart Cloud Architecture</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
            How ViceCloud Works: Zero Downloads, Pure 4K PS5 Power
          </h2>
          <p className="mt-2.5 text-xs sm:text-sm text-gray-400 leading-relaxed max-w-2xl mx-auto">
            You don&apos;t need a $600 console or an expensive GPU. Our server racks run Grand Theft Auto VI and stream the live video to your browser with sub-30ms response times.
          </p>
        </div>

        {/* 3 Architecture Pillars */}
        <ServicePipelineCards />

        {/* 4-Step Player Journey & Comparison */}
        <PlayerJourneyRoadmap onSelectPlan={onSelectPlan} />

      </div>
    </section>
  );
}
