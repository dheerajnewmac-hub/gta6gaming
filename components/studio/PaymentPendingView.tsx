"use client";

import React, { useState } from 'react';
import { Loader2, Copy, Check, ShieldAlert, Send } from 'lucide-react';

interface PaymentPendingViewProps {
  orderId: string;
  planName: string;
  amount: string;
  paymentMethod: string;
  txHash?: string;
  onClose: () => void;
}

export function PaymentPendingView({
  orderId,
  planName,
  amount,
  paymentMethod,
  txHash,
  onClose,
}: PaymentPendingViewProps) {
  const [copiedId, setCopiedId] = useState(false);

  const handleCopyId = async () => {
    try {
      await navigator.clipboard.writeText(orderId);
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    } catch {
      setCopiedId(true);
    }
  };

  return (
    <div className="space-y-6 text-center py-4">
      {/* Animated Pending Radar Icon */}
      <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-amber-500/10 border border-amber-500/30">
        <span className="absolute h-full w-full rounded-full bg-amber-400/20 animate-ping opacity-75" />
        <Loader2 className="h-10 w-10 text-amber-400 animate-spin" />
      </div>

      <div>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-mono font-bold uppercase tracking-wider">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          Awaiting Admin Confirmation
        </span>
        <h3 className="mt-3 text-xl font-black text-white tracking-tight">
          Payment Proof Submitted
        </h3>
        <p className="mt-1.5 text-xs text-[#CBB8DF] max-w-sm mx-auto leading-relaxed">
          Your payment has been logged. Our node operator is verifying the blockchain transaction.
          This window will <strong className="text-white">automatically activate</strong> once confirmed.
        </p>
      </div>

      {/* Order Info Card */}
      <div className="rounded-xl border border-white/10 bg-[#0B0416] p-4 text-left space-y-2.5">
        <div className="flex items-center justify-between text-xs">
          <span className="text-[#9D87B8]">Order Reference:</span>
          <button
            type="button"
            onClick={handleCopyId}
            className="flex items-center gap-1 font-mono font-bold text-amber-400 hover:text-amber-300 transition-colors"
          >
            <span>{orderId}</span>
            {copiedId ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-[#9D87B8]">Reserved Plan:</span>
          <span className="font-semibold text-white">{planName}</span>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-[#9D87B8]">Total Amount:</span>
          <span className="font-mono font-bold text-[#FF2EA6]">{amount}</span>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-[#9D87B8]">Method:</span>
          <span className="font-semibold text-[#F0B90B]">{paymentMethod}</span>
        </div>
        {txHash && (
          <div className="flex items-center justify-between text-xs border-t border-white/10 pt-2">
            <span className="text-[#9D87B8]">TxID:</span>
            <span className="font-mono text-[11px] text-gray-300 truncate max-w-[180px]">{txHash}</span>
          </div>
        )}
      </div>

      {/* Operator Notification Note */}
      <div className="rounded-lg bg-white/5 border border-white/10 p-3 text-left flex items-start gap-2.5 text-xs text-gray-300">
        <ShieldAlert className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
        <span>
          Verification usually takes <strong className="text-white">1–5 minutes</strong>. Do not close your browser or navigate away.
        </span>
      </div>

      {/* Telegram Operator Fast-Track */}
      <a
        href={`https://t.me/ViceCloudSupport?text=${encodeURIComponent(`Hi Admin, I just submitted payment for ${planName} (${amount}). My Order ID is ${orderId}. Please approve my PS5 rig.`)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-[#229ED9]/15 border border-[#229ED9]/40 text-[#229ED9] text-xs font-bold hover:bg-[#229ED9]/25 transition-all"
      >
        <Send className="w-3.5 h-3.5" />
        <span>Need Urgent Activation? Telegram @ViceCloudSupport</span>
      </a>

      <button
        type="button"
        onClick={onClose}
        className="text-xs text-gray-400 hover:text-white transition-colors"
      >
        Minimize Window
      </button>
    </div>
  );
}
