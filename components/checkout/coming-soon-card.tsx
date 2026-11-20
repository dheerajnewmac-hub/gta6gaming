"use client";

import React from "react";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { PaymentMethodConfig } from "@/lib/types";

interface ComingSoonCardProps {
  method: PaymentMethodConfig;
  onSwitchToActive: () => void;
}

export function ComingSoonCard({ method, onSwitchToActive }: ComingSoonCardProps) {
  return (
    <div className="p-5 rounded-2xl bg-[#080b22] border border-amber-500/30 text-center space-y-2.5">
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[11px] font-mono font-bold uppercase">
        <ShieldCheck className="w-3.5 h-3.5" />
        <span>Payment Gateway Compliance</span>
      </div>
      <h4 className="text-sm font-bold text-white">{method.name} Coming Soon</h4>
      <p className="text-xs text-slate-300 leading-relaxed max-w-md mx-auto">
        {method.instructions ||
          "Direct card and mobile gateway onboarding is underway. For instant PS5 node access, please pay using our active instant transfer methods."}
      </p>
      <button
        type="button"
        onClick={onSwitchToActive}
        className="mt-2 inline-flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 font-bold"
      >
        <span>Switch to Instant Payment</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
