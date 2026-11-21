"use client";

import React, { useState } from 'react';
import { CheckCircle2, Copy, Check, Gamepad2, ArrowRight } from 'lucide-react';

interface PaymentApprovedViewProps {
  orderId: string;
  allocatedNode: string;
  sessionPasscode: string;
  planName: string;
  onClose: () => void;
}

export function PaymentApprovedView({
  orderId,
  allocatedNode,
  sessionPasscode,
  planName,
  onClose,
}: PaymentApprovedViewProps) {
  const [copiedPass, setCopiedPass] = useState(false);

  const handleCopyPasscode = async () => {
    try {
      await navigator.clipboard.writeText(sessionPasscode);
      setCopiedPass(true);
      setTimeout(() => setCopiedPass(false), 2000);
    } catch {
      setCopiedPass(true);
    }
  };

  return (
    <div className="space-y-6 text-center py-4">
      {/* Success Badge */}
      <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/15 border border-emerald-500/40">
        <CheckCircle2 className="h-10 w-10 text-emerald-400" />
      </div>

      <div>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-bold uppercase tracking-wider">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Confirmed · Hardware Ready
        </span>
        <h3 className="mt-3 text-2xl font-black text-white tracking-tight">
          Payment Approved!
        </h3>
        <p className="mt-1 text-xs text-[#CBB8DF]">
          Your dedicated PlayStation 5 blade rig has been provisioned for <strong className="text-white">{planName}</strong>.
        </p>
      </div>

      {/* Hardware Provision Card */}
      <div className="rounded-xl border border-emerald-500/30 bg-[#0B0416] p-4 text-left space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="text-[#9D87B8]">Allocated PS5 Blade:</span>
          <span className="font-mono font-bold text-white bg-white/10 px-2 py-0.5 rounded">
            {allocatedNode}
          </span>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-[#9D87B8]">Stream Passcode:</span>
          <button
            type="button"
            onClick={handleCopyPasscode}
            className="flex items-center gap-1.5 font-mono font-bold text-[#FF2EA6] hover:text-[#ff5cc4] transition-colors"
          >
            <span>{sessionPasscode}</span>
            {copiedPass ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
        <div className="flex items-center justify-between text-xs border-t border-white/10 pt-2">
          <span className="text-[#9D87B8]">Render Resolution:</span>
          <span className="font-mono text-emerald-400 font-bold">4K 60FPS HDR · Zero Queue</span>
        </div>
      </div>

      {/* Primary Action Button */}
      <button
        type="button"
        onClick={() => {
          alert(`Connecting to ${allocatedNode} with Passcode ${sessionPasscode}... Launching WebRTC stream!`);
        }}
        className="vice-neon-btn flex min-h-[48px] w-full items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-bold shadow-[0_0_25px_rgba(255,46,166,0.5)]"
      >
        <Gamepad2 className="w-5 h-5" />
        <span>Launch PS5 GTA VI Stream Now</span>
        <ArrowRight className="w-4 h-4" />
      </button>

      <button
        type="button"
        onClick={onClose}
        className="text-xs text-gray-400 hover:text-white transition-colors"
      >
        Close &amp; Keep Session Active
      </button>
    </div>
  );
}
