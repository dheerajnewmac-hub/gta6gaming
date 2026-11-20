"use client";

import React from "react";
import { PaymentMethodConfig } from "@/lib/types";
import { QrCode, CreditCard, Wallet, Smartphone } from "lucide-react";

interface CheckoutTabsProps {
  methods: PaymentMethodConfig[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export function CheckoutTabs({ methods, selectedId, onSelect }: CheckoutTabsProps) {
  const getIcon = (type: PaymentMethodConfig["type"]) => {
    switch (type) {
      case "binance_pay":
        return <Smartphone className="w-3.5 h-3.5 text-amber-400" />;
      case "card":
        return <CreditCard className="w-3.5 h-3.5 text-purple-400" />;
      default:
        return <QrCode className="w-3.5 h-3.5 text-cyan-400" />;
    }
  };

  return (
    <div className="flex flex-wrap gap-1.5 p-1 rounded-xl bg-[#070919] border border-white/10 text-xs font-bold">
      {methods.map((m) => {
        const isSelected = m.id === selectedId;
        return (
          <button
            key={m.id}
            type="button"
            onClick={() => onSelect(m.id)}
            className={`flex-1 min-w-[120px] py-2 px-2.5 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
              isSelected
                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_12px_rgba(6,182,212,0.2)]"
                : "text-slate-400 hover:text-white border border-transparent"
            }`}
          >
            {getIcon(m.type)}
            <span className="truncate">{m.name}</span>
            {m.badge && (
              <span
                className={`text-[9px] px-1.5 py-0.2 rounded font-mono ${
                  m.isComingSoon
                    ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                    : "bg-cyan-500/10 text-cyan-300 border border-cyan-500/20"
                }`}
              >
                {m.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
