"use client";

import React from 'react';
import { AlertTriangle, RotateCcw, Send } from 'lucide-react';

interface PaymentRejectedViewProps {
  orderId: string;
  rejectionReason?: string;
  onRetry: () => void;
  onClose: () => void;
}

export function PaymentRejectedView({
  orderId,
  rejectionReason,
  onRetry,
  onClose,
}: PaymentRejectedViewProps) {
  return (
    <div className="space-y-6 text-center py-4">
      {/* Alert Icon */}
      <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-500/15 border border-red-500/40">
        <AlertTriangle className="h-10 w-10 text-red-400" />
      </div>

      <div>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/15 border border-red-500/30 text-red-300 text-xs font-mono font-bold uppercase tracking-wider">
          Verification Unsuccessful
        </span>
        <h3 className="mt-3 text-2xl font-black text-white tracking-tight">
          Payment Not Verified
        </h3>
        <p className="mt-1 text-xs text-[#CBB8DF]">
          Order Reference: <span className="font-mono text-white">{orderId}</span>
        </p>
      </div>

      {/* Rejection Note */}
      <div className="rounded-xl border border-red-500/30 bg-red-950/20 p-4 text-left space-y-1.5">
        <p className="text-xs font-bold text-red-300">Operator Review Note:</p>
        <p className="text-xs text-gray-300 leading-relaxed">
          {rejectionReason || 'The payment proof or transaction ID could not be matched with our blockchain records. Please verify that the exact amount was transferred.'}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2.5">
        <button
          type="button"
          onClick={onRetry}
          className="vice-neon-btn flex min-h-[46px] w-full items-center justify-center gap-2 rounded-lg px-6 py-2.5 text-sm font-bold"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Re-Submit Payment Proof</span>
        </button>

        <a
          href={`https://t.me/vicecloudspport?text=${encodeURIComponent(`Hi Admin, my payment for Order ${orderId} was rejected. Please review my transaction manually.`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-white/5 border border-white/10 text-xs font-bold text-[#229ED9] hover:bg-white/10 transition-all"
        >
          <Send className="w-3.5 h-3.5" />
          <span>Appeal on 24/7 Telegram Support</span>
        </a>
      </div>

      <button
        type="button"
        onClick={onClose}
        className="text-xs text-gray-400 hover:text-white transition-colors"
      >
        Dismiss
      </button>
    </div>
  );
}
