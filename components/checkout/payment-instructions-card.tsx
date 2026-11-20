"use client";

import React, { useState } from "react";
import { Copy, Check, QrCode } from "lucide-react";
import { PaymentMethodConfig } from "@/lib/types";

interface PaymentInstructionsCardProps {
  method: PaymentMethodConfig;
  price: string;
}

export function PaymentInstructionsCard({ method, price }: PaymentInstructionsCardProps) {
  const [copied, setCopied] = useState(false);
  const [showQr, setShowQr] = useState(false);

  const targetValue = method.accountValue || "Contact Admin";

  const handleCopy = () => {
    navigator.clipboard.writeText(targetValue);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isBinance = method.type === "binance_pay";

  return (
    <div className="p-4 rounded-2xl bg-[#070919] border border-cyan-500/30 space-y-3 text-xs">
      {/* Header Info */}
      <div className="flex items-center justify-between border-b border-white/5 pb-2">
        <div>
          <span className="text-gray-400 block text-[11px]">
            {isBinance ? "Transfer Protocol:" : "Network:"}
          </span>
          <span className="font-bold text-white text-xs flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full ${isBinance ? "bg-amber-400" : "bg-emerald-400"}`} />
            {method.networkName || method.name}
          </span>
        </div>
        <div className="text-right">
          <span className="text-gray-400 block text-[11px]">Total Due:</span>
          <span className="text-base font-black text-cyan-400 font-mono">{price}</span>
        </div>
      </div>

      {/* Target Box (Pay ID or Wallet Address) */}
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-[11px] text-gray-400 font-mono">
            {isBinance ? "Send to Binance Pay ID / UID:" : "Send to Address:"}
          </span>
          {method.qrCodeUrl && (
            <button
              type="button"
              onClick={() => setShowQr(!showQr)}
              className="text-[11px] text-cyan-400 hover:text-cyan-300 font-mono flex items-center gap-1"
            >
              <QrCode className="w-3.5 h-3.5" />
              <span>{showQr ? "Hide QR" : "View QR Code"}</span>
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 bg-[#0c112e] p-2 rounded-xl border border-white/10 font-mono text-[11px] text-gray-200">
          <span className="truncate flex-1 select-all font-semibold">{targetValue}</span>
          <button
            type="button"
            onClick={handleCopy}
            className="px-2.5 py-1 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 font-bold border border-cyan-500/40 flex items-center gap-1 transition-all shrink-0"
          >
            {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
            <span>{copied ? "Copied" : "Copy"}</span>
          </button>
        </div>
      </div>

      {/* Optional QR Code View */}
      {showQr && method.qrCodeUrl && (
        <div className="p-3 bg-white rounded-xl flex flex-col items-center justify-center max-w-[200px] mx-auto animate-in fade-in">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={method.qrCodeUrl} alt="Payment QR Code" className="w-36 h-36 object-contain" />
          <span className="text-[10px] text-slate-800 font-bold font-mono mt-1 text-center">
            Scan with {isBinance ? "Binance App" : "Wallet App"}
          </span>
        </div>
      )}

      {/* Instructions Note */}
      {method.instructions && (
        <p className="text-[11px] text-slate-400 leading-relaxed bg-[#0c112e]/50 p-2 rounded-lg border border-white/5">
          {method.instructions}
        </p>
      )}
    </div>
  );
}
