"use client";

import React from "react";
import { Check, Crown, Rocket, ShieldCheck } from "lucide-react";

interface PricingPlansProps {
  onSelectPlan: (plan: { name: string; price: string; hours: string }) => void;
}

export function PricingPlans({ onSelectPlan }: PricingPlansProps) {
  const plans = [
    {
      name: "Solo Pass",
      price: "$4.99",
      period: "/USD",
      hours: "1 hour of remote PS5 session time",
      features: [
        "1 hour of remote PS5 session time",
        "Valid for 14 days",
        "Flexible split: use in 30-min blocks",
      ],
      isPopular: false,
    },
    {
      name: "Starter Pack",
      price: "$19.99",
      period: "/USD",
      hours: "5 hours of remote PS5 session time",
      features: [
        "5 hours of remote PS5 session time",
        "Save 20% vs hourly rate",
        "Valid for 30 days",
      ],
      isPopular: true,
    },
    {
      name: "Weekend Pack",
      price: "$34.99",
      period: "/USD",
      hours: "10 hours of remote PS5 session time",
      features: [
        "10 hours of remote PS5 session time",
        "Save 30% vs hourly rate",
        "Valid for 45 days",
      ],
      isPopular: false,
    },
  ];

  return (
    <section id="plans" className="py-12 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Heading & Subtitle (3 Cols) */}
          <div className="lg:col-span-3">
            <div className="inline-block px-3.5 py-1 rounded-full bg-[#0d222b] border border-cyan-500/40 text-cyan-400 text-xs font-bold mb-3 shadow-[0_0_12px_rgba(0,210,255,0.25)]">
              Affordable Plans
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight tracking-tight">
              Choose Your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-300">
                Perfect Plan
              </span>
            </h2>
            <p className="mt-2.5 text-xs sm:text-sm text-gray-400 leading-relaxed">
              Flexible plans to fit your gaming needs.
            </p>
          </div>

          {/* Center Column: 3 Pricing Cards (6 Cols) */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-3 gap-4 items-stretch">
            {plans.map((plan) => {
              return (
                <div
                  key={plan.name}
                  className={`relative rounded-2xl p-4 sm:p-5 flex flex-col justify-between transition-all duration-300 ${
                    plan.isPopular
                      ? "bg-[#0b1333] border-2 border-cyan-400 shadow-[0_0_35px_rgba(0,210,255,0.4),inset_0_0_20px_rgba(0,210,255,0.2)] scale-105 z-10"
                      : "bg-[#0b0f24]/90 border border-white/10 hover:border-white/25"
                  }`}
                >
                  {/* Top Popular Floating Pill */}
                  {plan.isPopular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-[10px] font-black uppercase text-white tracking-widest shadow-[0_0_15px_rgba(147,51,234,0.6)]">
                      Most Popular
                    </div>
                  )}

                  <div>
                    <h3 className="text-sm font-bold text-white mb-2">
                      {plan.name}
                    </h3>

                    {/* Price */}
                    <div className="flex items-baseline gap-1 my-2">
                      <span className="text-2xl font-black text-white tracking-tight">
                        {plan.price}
                      </span>
                      <span className="text-[11px] text-gray-400 font-semibold">
                        {plan.period}
                      </span>
                    </div>

                    {/* Features List with green checkmarks */}
                    <ul className="space-y-2.5 my-4 pt-2 border-t border-white/5">
                      {plan.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-1.5 text-[11px] text-gray-300 leading-tight">
                          <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Button */}
                  <button
                    onClick={() =>
                      onSelectPlan({
                        name: plan.name,
                        price: plan.price,
                        hours: plan.hours,
                      })
                    }
                    className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all mt-3 ${
                      plan.isPopular
                        ? "bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-[0_0_20px_rgba(59,130,246,0.6)] active:scale-95"
                        : "bg-white/5 hover:bg-white/10 text-gray-200 border border-white/10 active:scale-95"
                    }`}
                  >
                    Select Plan
                  </button>
                </div>
              );
            })}
          </div>

          {/* Right Column: Key Value Pillars & Script Signature (3 Cols) */}
          <div className="lg:col-span-3 space-y-4 lg:pl-4">
            
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 shrink-0">
                <Crown className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-xs font-bold text-white">
                  Play the Latest Games
                </span>
                <span className="block text-[11px] text-gray-400">
                  Like GTA VI
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-pink-500/10 text-pink-400 border border-pink-500/20 shrink-0">
                <Rocket className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-xs font-bold text-white">
                  No Hardware Limits
                </span>
                <span className="block text-[11px] text-gray-400">
                  Just a PC
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-xs font-bold text-white">
                  100% Secure &amp; Reliable
                </span>
                <span className="block text-[11px] text-gray-400">
                  Gaming Service
                </span>
              </div>
            </div>

            {/* Handwritten Signature: Your Game. Our Power. */}
            <div className="pt-2">
              <p className="script-signature text-3xl sm:text-4xl leading-tight font-bold">
                <span className="text-cyan-300 drop-shadow-[0_0_12px_rgba(0,210,255,0.7)] block">
                  Your Game.
                </span>
                <span className="text-pink-400 drop-shadow-[0_0_12px_rgba(244,63,94,0.7)] block">
                  Our Power.
                </span>
              </p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
