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
      features: ["Full GTA VI Access", "4K 60FPS Streaming", "Ultra Low Latency", "Zero Local Install"],
      border: "border-purple-500/20 hover:border-purple-400/40",
      btnBg: "bg-purple-600/30 hover:bg-purple-600/50 text-purple-200 border border-purple-500/40",
    },
    {
      id: "pro",
      name: "Pro",
      badge: "Pro",
      price: "$9.99",
      hours: "3 Hours",
      img: "/neon_ui/plan_pro.png",
      popular: true,
      features: ["Priority Servers", "Better Performance", "24/7 Dedicated Support", "Instant Session Save"],
      border: "border-2 border-pink-500 shadow-[0_0_40px_rgba(236,72,153,0.4)]",
      btnBg: "bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 hover:brightness-110 text-white shadow-[0_0_20px_rgba(236,72,153,0.6)]",
    },
    {
      id: "ultimate",
      name: "Ultimate",
      badge: "Ultimate",
      price: "$14.99",
      hours: "6 Hours",
      img: "/neon_ui/plan_ultimate.png",
      popular: false,
      features: ["Max Performance Rigs", "Zero Queue Priority", "VIP Cloud Storage", "Full Controller Support"],
      border: "border-cyan-500/20 hover:border-cyan-400/40",
      btnBg: "bg-cyan-600/30 hover:bg-cyan-600/50 text-cyan-200 border border-cyan-500/40",
    },
  ];

  return (
    <section id="plans" className="relative w-full py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-xs font-mono tracking-wider uppercase">
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto items-stretch">
          {plans.map((p) => (
            <div
              key={p.id}
              className={`rounded-3xl overflow-hidden flex flex-col justify-between transition-all duration-300 relative bg-[#0b0620]/90 backdrop-blur-xl ${p.border} ${
                p.popular ? "md:-translate-y-2.5 z-10" : "hover:-translate-y-1"
              }`}
            >
              {p.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                  <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 text-white text-[10.5px] font-black uppercase tracking-wider shadow-[0_0_20px_rgba(236,72,153,0.7)]">
                    <Sparkles className="w-3 h-3" />
                    MOST POPULAR
                  </span>
                </div>
              )}

              {/* Card Thumbnail Artwork */}
              <div className="relative h-32 sm:h-36 w-full overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.img}
                  alt={`${p.name} plan scene`}
                  className="w-full h-full object-cover object-center scale-105 hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0620] via-transparent to-transparent" />
                <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-md bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono font-bold text-white uppercase">
                  {p.badge}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-3xl sm:text-4xl font-black text-white font-mono tracking-tight">
                      {p.price}
                    </span>
                    <span className="text-xs sm:text-sm text-slate-400 font-mono">
                      / {p.hours}
                    </span>
                  </div>

                  {/* Features List */}
                  <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
                    {p.features.map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2.5">
                        <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Start Now Button */}
                <button
                  onClick={() => onSelectPlan({ name: p.name, price: p.price, hours: p.hours })}
                  className={`w-full py-3.5 rounded-full font-extrabold text-xs tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 active:scale-95 ${p.btnBg}`}
                >
                  <span>Start Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Neon Cyan Beam Divider */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 sm:mt-16">
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
      </div>
    </section>
  );
}
