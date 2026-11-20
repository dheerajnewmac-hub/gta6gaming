"use client";

import React, { useEffect, useState } from "react";
import { Loader2, ShieldCheck, Clock, AlertTriangle, ArrowLeft } from "lucide-react";

interface WaitlistReviewProps {
  paymentId: string;
  onApproved: (data: { allocatedNode: string; sessionPasscode: string }) => void;
  onBackToCheckout: () => void;
}

export function WaitlistReviewView({
  paymentId,
  onApproved,
  onBackToCheckout,
}: WaitlistReviewProps) {
  const [status, setStatus] = useState<"pending" | "approved" | "rejected">("pending");
  const [rejectionReason, setRejectionReason] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const checkStatus = async () => {
      try {
        const res = await fetch(`/api/payments/status?id=${paymentId}`);
        const data = await res.json();
        if (data.success && isMounted) {
          if (data.status === "approved") {
            setStatus("approved");
            onApproved({
              allocatedNode: data.payment.allocatedNode,
              sessionPasscode: data.payment.sessionPasscode,
            });
          } else if (data.status === "rejected") {
            setStatus("rejected");
            setRejectionReason(data.payment.rejectionReason || "Payment could not be verified on TronScan.");
          }
        }
      } catch (err) {
        console.error("Poll error:", err);
      }
    };

    const interval = setInterval(checkStatus, 3000);
    checkStatus();

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [paymentId, onApproved]);

  return (
    <div className="space-y-4 py-3">
      {status === "pending" && (
        <div className="text-center space-y-4">
          {/* Animated Radar Pulse */}
          <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
            <span className="absolute inset-0 rounded-full bg-cyan-500/20 animate-ping" />
            <span className="absolute inset-2 rounded-full bg-purple-500/30 animate-pulse" />
            <div className="relative w-12 h-12 rounded-full bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center text-white shadow-[0_0_30px_rgba(6,182,212,0.6)]">
              <Loader2 className="w-6 h-6 animate-spin" />
            </div>
          </div>

          <div className="space-y-1">
            <span className="inline-block px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold uppercase">
              Queue Waitlist Active
            </span>
            <h4 className="text-lg font-black text-white">Payment Proof Under Review</h4>
            <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
              Our node operator is verifying your TRC-20 transaction on the Tron blockchain. Please keep this screen open.
            </p>
          </div>

          {/* Ticket Information Card */}
          <div className="p-4 rounded-2xl bg-[#040614] border border-cyan-500/30 space-y-2 text-xs font-mono text-left">
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-slate-400">Order Reference:</span>
              <span className="text-cyan-300 font-bold">{paymentId}</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-slate-400">Verification Status:</span>
              <span className="text-amber-400 font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                Pending Operator Review
              </span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-slate-400">Estimated Wait:</span>
              <span className="text-slate-200 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                1 - 5 Minutes
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">PS5 Blade Hold:</span>
              <span className="text-emerald-400 font-semibold">Reserved in High-Priority Queue</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 font-mono">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Encrypted WebRTC handoff activates automatically upon approval</span>
          </div>
        </div>
      )}

      {status === "rejected" && (
        <div className="text-center space-y-4 py-2">
          <div className="w-14 h-14 rounded-2xl bg-red-500/20 border border-red-500/40 text-red-400 flex items-center justify-center mx-auto shadow-[0_0_25px_rgba(239,68,68,0.4)]">
            <AlertTriangle className="w-7 h-7" />
          </div>

          <div className="space-y-1">
            <h4 className="text-lg font-black text-white">Verification Declined</h4>
            <p className="text-xs text-red-300 max-w-sm mx-auto">
              {rejectionReason || "We could not find a matching TRC-20 deposit for your submission."}
            </p>
          </div>

          <button
            onClick={onBackToCheckout}
            className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs uppercase tracking-wider border border-white/10 flex items-center justify-center gap-2 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Re-upload Screenshot or Re-check TXID</span>
          </button>
        </div>
      )}
    </div>
  );
}
