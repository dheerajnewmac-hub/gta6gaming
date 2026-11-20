"use client";

import React, { useState } from "react";
import { Copy, Check, QrCode, CreditCard, UploadCloud, X, AlertCircle, ArrowRight, Loader2 } from "lucide-react";
import { useAuth } from "@/context/auth-context";
import { compressImage } from "@/lib/image-compress";

interface CryptoCheckoutProps {
  planName: string;
  price: string;
  hours: string;
  onPaymentSubmitted: (paymentId: string) => void;
}

const TRC20_WALLET =
  process.env.NEXT_PUBLIC_USDT_TRC20_WALLET ||
  "TFH1z3sC2MHPGZpw3KvTt9QegbJJCyD8ii";

export function CryptoCheckoutView({
  planName,
  price,
  hours,
  onPaymentSubmitted,
}: CryptoCheckoutProps) {
  const { user } = useAuth();
  const [tab, setTab] = useState<"CRYPTO" | "CARD">("CRYPTO");
  const [copied, setCopied] = useState(false);
  const [email, setEmail] = useState(user?.email || "");
  const [txid, setTxid] = useState("");
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [compressing, setCompressing] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(TRC20_WALLET);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setErrorMsg(null);
    setCompressing(true);

    try {
      const compressedDataUrl = await compressImage(file);
      setScreenshot(compressedDataUrl);
    } catch {
      setErrorMsg("Failed to read image. Please try a different photo format.");
    } finally {
      setCompressing(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setErrorMsg("Please enter your email to receive session access.");
      return;
    }
    if (!screenshot) {
      setErrorMsg("Please upload your payment screenshot before verifying.");
      return;
    }

    setSubmitting(true);
    setErrorMsg(null);

    try {
      const res = await fetch("/api/payments/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userEmail: email,
          gamerTag: user?.gamerTag || `Gamer_${email.split("@")[0]}`,
          planName,
          amount: price,
          hours,
          walletAddress: TRC20_WALLET,
          txid: txid.trim() || undefined,
          screenshotUrl: screenshot,
        }),
      });

      if (!res.ok) {
        const errText = await res.text();
        let parsed = "Failed to submit payment verification.";
        try {
          const j = JSON.parse(errText);
          parsed = j.error || parsed;
        } catch {
          if (res.status === 413) parsed = "Image file is too large. Please select a smaller photo.";
        }
        throw new Error(parsed);
      }

      const data = await res.json();
      if (!data.success) {
        throw new Error(data.error || "Submission failed");
      }
      onPaymentSubmitted(data.payment.id);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error submitting payment";
      setErrorMsg(msg);
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Tab Switcher */}
      <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-[#070919] border border-white/10 text-xs font-bold">
        <button
          type="button"
          onClick={() => setTab("CRYPTO")}
          className={`py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
            tab === "CRYPTO"
              ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
              : "text-gray-400 hover:text-white"
          }`}
        >
          <QrCode className="w-3.5 h-3.5" />
          <span>USDT (TRC-20)</span>
        </button>
        <button
          type="button"
          onClick={() => setTab("CARD")}
          className={`py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
            tab === "CARD"
              ? "bg-purple-500/20 text-purple-300 border border-purple-500/40"
              : "text-gray-400 hover:text-white"
          }`}
        >
          <CreditCard className="w-3.5 h-3.5" />
          <span>Card / Apple Pay</span>
          <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
            Soon
          </span>
        </button>
      </div>

      {/* CARD TAB - COMING SOON */}
      {tab === "CARD" && (
        <div className="p-5 rounded-2xl bg-[#080b22] border border-amber-500/30 text-center space-y-2.5">
          <span className="inline-block px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[11px] font-mono font-bold uppercase">
            Payment Gateway Onboarding
          </span>
          <h4 className="text-sm font-bold text-white">Cards &amp; Apple Pay Coming Soon</h4>
          <p className="text-xs text-slate-300 leading-relaxed max-w-md mx-auto">
            Visa, MasterCard &amp; Apple Pay integration is currently undergoing compliance setup. For instant node unlock, please use the <strong>USDT (TRC-20)</strong> option.
          </p>
          <button
            type="button"
            onClick={() => setTab("CRYPTO")}
            className="mt-2 inline-flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 font-bold"
          >
            <span>Switch to USDT (TRC-20)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* CRYPTO TAB */}
      {tab === "CRYPTO" && (
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {/* Wallet Address Box */}
          <div className="p-4 rounded-2xl bg-[#070919] border border-cyan-500/30 space-y-3 text-xs">
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <div>
                <span className="text-gray-400 block text-[11px]">Network:</span>
                <span className="font-bold text-white text-xs flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  USDT (Tron TRC-20)
                </span>
              </div>
              <div className="text-right">
                <span className="text-gray-400 block text-[11px]">Amount:</span>
                <span className="text-base font-black text-cyan-400 font-mono">{price}</span>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] text-gray-400 font-mono">Send to this TRC20 Address:</span>
              <div className="flex items-center gap-2 bg-[#0c112e] p-2 rounded-xl border border-white/10 font-mono text-[11px] text-gray-200">
                <span className="truncate flex-1 select-all">{TRC20_WALLET}</span>
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
          </div>

          {/* User Email & Optional TXID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
            <div>
              <label className="block text-[11px] text-gray-400 mb-1">Your Email (for Node Access)</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                className="w-full px-3 py-2 rounded-xl bg-[#070919] border border-white/10 text-white focus:border-cyan-400 outline-none"
              />
            </div>
            <div>
              <label className="block text-[11px] text-gray-400 mb-1">TRC20 TXID (Optional)</label>
              <input
                type="text"
                value={txid}
                onChange={(e) => setTxid(e.target.value)}
                placeholder="Tron transaction hash"
                className="w-full px-3 py-2 rounded-xl bg-[#070919] border border-white/10 text-white focus:border-cyan-400 outline-none font-mono text-[11px]"
              />
            </div>
          </div>

          {/* Screenshot Upload Field */}
          <div>
            <label className="block text-[11px] text-gray-400 mb-1">
              Upload Payment Screenshot (Proof) <span className="text-pink-400">*</span>
            </label>
            {compressing ? (
              <div className="p-3 rounded-xl border border-cyan-500/40 bg-[#070919] flex items-center justify-center gap-2 text-cyan-300 text-xs">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Optimizing photo...</span>
              </div>
            ) : screenshot ? (
              <div className="relative rounded-xl overflow-hidden border border-emerald-500/40 p-2 bg-[#0c132c] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={screenshot} alt="Payment proof preview" className="w-12 h-12 object-cover rounded-lg border border-white/10" />
                  <div>
                    <span className="text-xs text-emerald-400 font-mono font-bold block">Screenshot attached</span>
                    <span className="text-[10px] text-slate-400">Ready to verify</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setScreenshot(null)}
                  className="p-1 rounded-lg bg-white/10 hover:bg-red-500/20 text-gray-400 hover:text-red-400"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <label className="border-2 border-dashed border-white/15 hover:border-cyan-500/50 rounded-xl p-3 flex flex-col items-center justify-center cursor-pointer bg-[#070919]/60 transition-colors">
                <UploadCloud className="w-5 h-5 text-cyan-400 mb-1" />
                <span className="text-xs text-slate-300 font-medium">Click to upload screenshot</span>
                <span className="text-[10px] text-slate-500">Supports all image formats (PNG, JPG, HEIC, WEBP, etc.)</span>
                <input
                  type="file"
                  accept="image/*,.png,.jpg,.jpeg,.webp,.heic,.heif,.bmp,.svg"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            )}
          </div>

          {errorMsg && (
            <div className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Verify / Submit Button */}
          <button
            type="submit"
            disabled={submitting || compressing}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 hover:brightness-110 text-white font-extrabold text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(0,210,255,0.4)] active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {submitting ? (
              <span>Submitting Verification...</span>
            ) : (
              <span>Submit Screenshot &amp; Verify Payment</span>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
