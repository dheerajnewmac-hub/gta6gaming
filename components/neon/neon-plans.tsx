"use client";

import React from "react";
import { Check, ArrowRight, Sparkles } from "lucide-react";

export interface PlanOption {
  name: string;
  price: string;
  hours: string;
}

interface NeonPlansProps {
  onSelectPlan: (plan: PlanOption) => void;
}

export function NeonPlans({ onSelectPlan }: NeonPlansProps) {
  const plans = [
    {
      id: "starter",
      name: "Starter",
      badge: "Starter",
      price: "$4.99",
      hours: "1 Hour",
      img: "/neon_ui/plan_starter.png",
      popular: false,
      features: ["Full GTA VI Access", "4K 60FPS Streaming", "Ultra Low Latency"],
      badgeColor: "bg-purple-900/60 text-purple-300 border-purple-500/30",
    },
    {
      id: "pro",
      name: "Pro",
      badge: "Pro",
      price: "$9.99",
      hours: "3 Hours",
      img: "/neon_ui/plan_pro.png",
      popular: true,
      features: ["Priority Servers", "Better Performance", "24/7 Support"],
      badgeColor: "bg-pink-600/40 text-pink-300 border-pink-400/40",
    },
    {
      id: "ultimate",
      name: "Ultimate",
      badge: "Ultimate",
      price: "$14.99",
      hours: "6 Hours",
      img: "/neon_ui/plan_ultimate.png",
      popular: false,
      features: ["Max Performance", "No Queue", "Premium Support"],
      badgeColor: "bg-cyan-900/60 text-cyan-300 border-cyan-500/30",
    },
  ];

  return (
    <section id="plans" className="relative w-full py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-[11px] font-mono tracking-wider uppercase">
            <span>CHOOSE YOUR PLAN</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Flexible{" "}
            <span className="italic bg-gradient-to-r from-pink-500 via-rose-400 to-purple-400 bg-clip-text text-transparent">
              Rental Plans
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
            Get the best value for your gaming time with our affordable plans.
          </p>
        </div>

        {/* 3 Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((p) => (
            <div
              key={p.id}
              className={`rounded-3xl overflow-hidden flex flex-col justify-between transition-all duration-300 relative ${
                p.popular
                  ? "bg-[#110728] border-2 border-pink-500 shadow-[0_0_35px_rgba(236,72,153,0.35)] md:-translate-y-2"
                  : "bg-[#0b0620]/90 border border-purple-500/20 hover:border-purple-400/40"
              }`}
            >
              {p.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                  <span className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white text-[10px] font-black uppercase tracking-wider shadow-[0_0_15px_rgba(236,72,153,0.6)]">
                    <Sparkles className="w-3 h-3" />
                    MOST POPULAR
                  </span>
                </div>
              )}

              {/* Card Thumbnail Artwork */}
              <div className="relative h-28 w-full overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.img}
                  alt={`${p.name} plan scene`}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e0726] via-transparent to-transparent opacity-80" />
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <span className={`inline-block px-3 py-1 rounded-full text-[11px] font-mono font-bold border ${p.badgeColor}`}>
                    {p.badge}
                  </span>

                  <div className="flex items-baseline gap-1.5">
                    <span className="text-3xl sm:text-4xl font-black text-white font-mono">
                      {p.price}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      / {p.hours}
                    </span>
                  </div>

                  {/* Feature checklist */}
                  <ul className="space-y-2 pt-2 border-t border-white/5 text-xs text-slate-200 font-medium">
                    {p.features.map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-pink-400 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card Button */}
                <button
                  onClick={() => onSelectPlan({ name: p.name, price: p.price, hours: p.hours })}
                  className={`w-full py-3 rounded-full font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
                    p.popular
                      ? "bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 hover:brightness-110 text-white shadow-[0_0_20px_rgba(236,72,153,0.5)]"
                      : "bg-[#160d33] hover:bg-[#201347] border border-white/10 text-slate-200"
                  }`}
                >
                  <span>Start Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Neon Cyan Light Beam Divider */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 sm:mt-14">
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-cyan-400 to-purple-600 shadow-[0_0_20px_rgba(6,182,212,0.9)] opacity-70" />
      </div>
    </section>
  );
}
