"use client";

import { useState, useEffect, type FormEvent } from 'react';
import { X, Check, Copy, Lock, CreditCard, ShieldCheck, QrCode, AlertCircle, UserCheck } from 'lucide-react';
import { CLOUD_CLUSTERS } from '@/lib/studio/storeData';
import { useAuth } from '@/context/auth-context';
import type { SelectedCheckoutPass } from './PricingSection';
import {
  generateBladeAssignment,
  validateCheckoutForm,
} from '@/lib/studio/pricing';

interface CheckoutDrawerProps {
  pass: SelectedCheckoutPass | null;
  selectedClusterId: string;
  onSelectCluster: (clusterId: string) => void;
  onClose: () => void;
}

export type PaymentMethod = 'binance-pay' | 'trc20' | 'card' | 'apple-pay';

interface ConfirmedReceipt {
  orderId: string;
  bladeId: string;
  sessionUrl: string;
  clusterName: string;
  email: string;
  gamerTag: string;
  paidAmount: number;
  paymentMethod: PaymentMethod;
  txHash?: string;
}

export function CheckoutDrawer({
  pass,
  selectedClusterId,
  onSelectCluster,
  onClose,
}: CheckoutDrawerProps) {
  const { user } = useAuth();
  const [email, setEmail] = useState('');
  const [gamerTag, setGamerTag] = useState('');
  const [txHash, setTxHash] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('binance-pay');
  const [errors, setErrors] = useState<{ email?: string; gamerTag?: string; txHash?: string }>({});
  const [receipt, setReceipt] = useState<ConfirmedReceipt | null>(null);
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [copiedPayId, setCopiedPayId] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState(false);

  const BINANCE_PAY_ID = '1231019201';
  const USDT_TRC20_ADDRESS = 'TFH1z3sC2MHPGZpw3KvTt9QegbJJCyD8ii';

  useEffect(() => {
    if (user) {
      if (user.email) setEmail(user.email);
      if (user.gamerTag) setGamerTag(user.gamerTag);
    }
  }, [user, pass?.id]);

  useEffect(() => {
    setErrors({});
    setReceipt(null);
    setCopiedUrl(false);
    setTxHash('');
  }, [pass?.id]);

  useEffect(() => {
    if (!pass) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [pass, onClose]);

  if (!pass) return null;

  const activeCluster =
    CLOUD_CLUSTERS.find((c) => c.id === selectedClusterId) ?? CLOUD_CLUSTERS[0];

  const finalTotal = pass.price;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (paymentMethod === 'card' || paymentMethod === 'apple-pay') {
      return;
    }

    const validation = validateCheckoutForm(email, gamerTag);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    const assignment = generateBladeAssignment(activeCluster.code, gamerTag.trim());
    setReceipt({
      ...assignment,
      clusterName: activeCluster.name,
      email: email.trim(),
      gamerTag: gamerTag.trim(),
      paidAmount: finalTotal,
      paymentMethod,
      txHash: txHash.trim() || undefined,
    });
  };

  const handleCopySession = async () => {
    if (!receipt) return;
    try {
      await navigator.clipboard.writeText(receipt.sessionUrl);
      setCopiedUrl(true);
      window.setTimeout(() => setCopiedUrl(false), 2000);
    } catch {
      setCopiedUrl(true);
    }
  };

  const handleCopyPayId = async () => {
    try {
      await navigator.clipboard.writeText(BINANCE_PAY_ID);
      setCopiedPayId(true);
      window.setTimeout(() => setCopiedPayId(false), 2000);
    } catch {
      setCopiedPayId(true);
    }
  };

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(USDT_TRC20_ADDRESS);
      setCopiedAddress(true);
      window.setTimeout(() => setCopiedAddress(false), 2000);
    } catch {
      setCopiedAddress(true);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-[#080212]/88"
      role="presentation"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="checkout-drawer-title"
        className="flex h-full w-full max-w-lg flex-col border-l border-[#FF2EA6]/35 bg-[#10051F] text-white shadow-[0_0_50px_rgba(255,46,166,0.2)]"
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-4 border-b border-[#FF2EA6]/20 px-6 py-5">
          <div>
            <p className="text-xs font-bold text-[#FF45B5]">
              {receipt ? 'Blade Reserved' : 'Instant Blade Allocation'}
            </p>
            <h2
              id="checkout-drawer-title"
              className="mt-0.5 font-display text-2xl font-extrabold text-white"
            >
              {receipt ? `Order ${receipt.orderId} Confirmed` : pass.name}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close pass checkout drawer"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#FF2EA6]/30 text-[#D8C6EC] transition-colors hover:border-[#FF2EA6] hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {receipt ? (
            <div data-testid="order-confirmation" className="space-y-6">
              <div className="rounded-xl border border-[#2CE6D2]/45 bg-[#17092B] p-5">
                <div className="flex items-center gap-2.5 text-[#2CE6D2]">
                  <ShieldCheck className="h-5 w-5" aria-hidden="true" />
                  <span className="font-semibold">
                    Dedicated PS5 Blade Provisioned &amp; Ready
                  </span>
                </div>
                <p className="mt-2 text-sm text-[#D8C6EC]">
                  Session credentials sent to{' '}
                  <strong className="text-white">{receipt.email}</strong>. Your isolated
                  sandbox profile{' '}
                  <strong className="font-mono text-white">{receipt.gamerTag}</strong> is
                  pre-loaded with GTA VI.
                </p>
              </div>

              <dl className="divide-y divide-[#FF2EA6]/15 rounded-xl border border-[#FF2EA6]/25 bg-[#0B0416] px-5 text-sm">
                <div className="flex items-center justify-between py-3.5">
                  <dt className="text-[#CBB8DF]">Order Reference</dt>
                  <dd className="font-mono font-semibold text-white tabular-nums">
                    {receipt.orderId}
                  </dd>
                </div>
                <div className="flex items-center justify-between py-3.5">
                  <dt className="text-[#CBB8DF]">Assigned Console Blade</dt>
                  <dd className="font-mono font-semibold text-[#FF45B5] tabular-nums">
                    {receipt.bladeId}
                  </dd>
                </div>
                <div className="flex items-center justify-between py-3.5">
                  <dt className="text-[#CBB8DF]">Cluster Region</dt>
                  <dd className="font-medium text-white">{receipt.clusterName}</dd>
                </div>
                <div className="flex items-center justify-between py-3.5">
                  <dt className="text-[#CBB8DF]">Pass Tier</dt>
                  <dd className="font-medium text-white">{pass.name}</dd>
                </div>
                <div className="flex items-center justify-between py-3.5">
                  <dt className="text-[#CBB8DF]">Payment Method</dt>
                  <dd className="font-mono font-semibold text-[#2CE6D2] uppercase">
                    {receipt.paymentMethod === 'binance-pay' ? 'Binance Pay' : 'USDT TRC-20'}
                  </dd>
                </div>
                <div className="flex items-center justify-between py-3.5">
                  <dt className="text-[#CBB8DF]">Amount Paid</dt>
                  <dd className="font-mono font-bold text-[#FF5CC4] tabular-nums">
                    ${receipt.paidAmount.toFixed(2)} USD
                  </dd>
                </div>
              </dl>

              <div className="rounded-xl border border-[#FF2EA6]/25 bg-[#0B0416] p-4">
                <p className="text-xs font-medium text-[#CBB8DF]">
                  Private WebRTC Stream Launch URL
                </p>
                <div className="mt-2 flex items-center justify-between gap-2">
                  <code className="truncate font-mono text-xs text-[#2CE6D2]">
                    {receipt.sessionUrl}
                  </code>
                  <button
                    type="button"
                    onClick={handleCopySession}
                    className="vice-outline-btn inline-flex min-h-[34px] shrink-0 items-center gap-1.5 rounded-md border border-[#FF2EA6]/35 px-3 py-1 text-xs font-semibold text-white hover:border-[#FF2EA6]"
                  >
                    {copiedUrl ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-[#2CE6D2]" aria-hidden="true" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>Copy URL</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="vice-neon-btn flex min-h-[48px] w-full items-center justify-center rounded-lg px-6 py-3 text-sm font-bold"
              >
                Return to ViceCloud Storefront
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              {/* Pass Summary Box */}
              <div className="rounded-xl border border-[#FF2EA6]/30 bg-[#0B0416] p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-bold text-white">{pass.name}</p>
                    <p className="mt-0.5 text-xs text-[#CBB8DF]">
                      {pass.summary} · {pass.qualityLabel}
                    </p>
                    {pass.originalPrice && pass.originalPrice > pass.price && (
                      <span className="vice-discount-tag mt-2 rounded px-2 py-0.5 font-mono text-[10px] font-extrabold uppercase tracking-[0.03em]">
                        <span>{pass.firstTimeDiscountPercent ?? 25}% OFF · 1st Buy</span>
                      </span>
                    )}
                  </div>
                  <div className="text-right">
                    {pass.originalPrice && pass.originalPrice > pass.price && (
                      <div className="font-mono text-xs text-[#B39AC9] line-through tabular-nums">
                        ${pass.originalPrice.toFixed(2)}
                      </div>
                    )}
                    <span className="font-mono text-xl font-bold text-[#FF45B5] tabular-nums">
                      ${pass.price.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Cluster Selector */}
              <div>
                <label
                  htmlFor="checkout-cluster"
                  className="block text-xs font-semibold text-white"
                >
                  Preferred PS5 Edge Cluster
                </label>
                <select
                  id="checkout-cluster"
                  value={selectedClusterId}
                  onChange={(e) => onSelectCluster(e.target.value)}
                  className="mt-2 min-h-[44px] w-full rounded-lg border border-[#FF2EA6]/30 bg-[#0B0416] px-3.5 text-sm text-white"
                >
                  {CLOUD_CLUSTERS.map((cluster) => (
                    <option key={cluster.id} value={cluster.id}>
                      {cluster.name} ({cluster.avgLatencyMs} ms avg — {cluster.edgeNodes})
                    </option>
                  ))}
                </select>
              </div>

              {/* Gamer Account Inputs */}
              <div className="space-y-4">
                {user && (
                  <div className="flex items-center gap-2 p-2.5 rounded-lg bg-[#1B0B33] border border-emerald-500/40 text-emerald-300 text-xs">
                    <UserCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>
                      Authenticated as <strong>{user.gamerTag}</strong> ({user.email})
                    </span>
                  </div>
                )}
                <div>
                  <label
                    htmlFor="checkout-email"
                    className="block text-xs font-semibold text-white"
                  >
                    Email Address (Session Token Delivery)
                  </label>
                  <input
                    id="checkout-email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                    }}
                    placeholder="player@domain.com"
                    aria-invalid={Boolean(errors.email)}
                    className="mt-2 min-h-[44px] w-full rounded-lg border border-[#FF2EA6]/30 bg-[#0B0416] px-3.5 text-sm text-white placeholder:text-[#9D87B8]"
                  />
                  {errors.email && (
                    <p role="alert" className="mt-1.5 text-xs text-[#FF5CC4]">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="checkout-gamertag"
                    className="block text-xs font-semibold text-white"
                  >
                    Cloud Save Gamer Tag
                  </label>
                  <input
                    id="checkout-gamertag"
                    type="text"
                    value={gamerTag}
                    onChange={(e) => {
                      setGamerTag(e.target.value);
                      if (errors.gamerTag)
                        setErrors((prev) => ({ ...prev, gamerTag: undefined }));
                    }}
                    placeholder="Lucia_VC6"
                    aria-invalid={Boolean(errors.gamerTag)}
                    className="mt-2 min-h-[44px] w-full rounded-lg border border-[#FF2EA6]/30 bg-[#0B0416] px-3.5 text-sm text-white placeholder:text-[#9D87B8]"
                  />
                  {errors.gamerTag && (
                    <p role="alert" className="mt-1.5 text-xs text-[#FF5CC4]">
                      {errors.gamerTag}
                    </p>
                  )}
                </div>
              </div>

              {/* Payment Method Selector */}
              <div>
                <span className="block text-xs font-semibold text-white mb-2">
                  Select Payment Method
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {/* Binance Pay - ACTIVE */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('binance-pay')}
                    className={`flex flex-col items-start p-3 rounded-xl border text-left transition-all ${
                      paymentMethod === 'binance-pay'
                        ? 'border-[#F0B90B] bg-[#F0B90B]/15 text-white shadow-[0_0_15px_rgba(240,185,11,0.25)]'
                        : 'border-[#FF2EA6]/25 bg-[#0B0416] text-[#CBB8DF] hover:border-[#F0B90B]/50'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="font-bold text-xs text-[#F0B90B]">Binance Pay</span>
                      <span className="text-[9px] font-mono font-bold bg-[#F0B90B]/20 text-[#F0B90B] px-1.5 py-0.5 rounded">
                        0% Fee
                      </span>
                    </div>
                    <span className="text-[10px] text-[#CBB8DF] mt-1">Instant via Pay ID</span>
                  </button>

                  {/* USDT TRC-20 - ACTIVE */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('trc20')}
                    className={`flex flex-col items-start p-3 rounded-xl border text-left transition-all ${
                      paymentMethod === 'trc20'
                        ? 'border-[#2CE6D2] bg-[#2CE6D2]/15 text-white shadow-[0_0_15px_rgba(44,230,210,0.25)]'
                        : 'border-[#FF2EA6]/25 bg-[#0B0416] text-[#CBB8DF] hover:border-[#2CE6D2]/50'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="font-bold text-xs text-[#2CE6D2]">USDT (TRC-20)</span>
                      <span className="text-[9px] font-mono font-bold bg-[#2CE6D2]/20 text-[#2CE6D2] px-1.5 py-0.5 rounded">
                        Instant
                      </span>
                    </div>
                    <span className="text-[10px] text-[#CBB8DF] mt-1">Tron Network</span>
                  </button>

                  {/* Card / Stripe - COMING SOON */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`flex flex-col items-start p-3 rounded-xl border text-left transition-all relative opacity-75 ${
                      paymentMethod === 'card'
                        ? 'border-[#FF2EA6] bg-[#FF2EA6]/15 text-white'
                        : 'border-[#FF2EA6]/20 bg-[#0B0416] text-[#8F7BAA]'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="font-semibold text-xs">Card / Stripe</span>
                      <span className="text-[8px] font-mono font-bold bg-pink-900/60 text-pink-300 px-1.5 py-0.5 rounded">
                        Coming Soon
                      </span>
                    </div>
                    <span className="text-[10px] text-[#8F7BAA] mt-1">Visa / MasterCard</span>
                  </button>

                  {/* Apple Pay - COMING SOON */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('apple-pay')}
                    className={`flex flex-col items-start p-3 rounded-xl border text-left transition-all relative opacity-75 ${
                      paymentMethod === 'apple-pay'
                        ? 'border-[#FF2EA6] bg-[#FF2EA6]/15 text-white'
                        : 'border-[#FF2EA6]/20 bg-[#0B0416] text-[#8F7BAA]'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="font-semibold text-xs">Apple Pay</span>
                      <span className="text-[8px] font-mono font-bold bg-pink-900/60 text-pink-300 px-1.5 py-0.5 rounded">
                        Coming Soon
                      </span>
                    </div>
                    <span className="text-[10px] text-[#8F7BAA] mt-1">1-Click iOS / Mac</span>
                  </button>
                </div>
              </div>

              {/* Payment Details Container */}
              {paymentMethod === 'binance-pay' && (
                <div className="rounded-xl border border-[#F0B90B]/35 bg-[#171207] p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#F0B90B] flex items-center gap-1.5">
                      <QrCode className="w-3.5 h-3.5" />
                      Binance Pay Direct
                    </span>
                    <span className="text-[11px] font-mono font-bold text-white">
                      ${finalTotal.toFixed(2)} USD
                    </span>
                  </div>

                  {/* Binance QR Code Display */}
                  <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-black/40 border border-[#F0B90B]/20">
                    <img
                      src="/binance_qr.png"
                      alt="Scan with Binance App to pay"
                      className="w-44 h-auto rounded-lg shadow-[0_0_20px_rgba(240,185,11,0.2)] border border-[#F0B90B]/30"
                    />
                    <span className="text-[10px] text-[#CBB8DF] font-medium mt-2">
                      Scan with Binance App to Pay Instant (0% Fee)
                    </span>
                  </div>

                  <div>
                    <label className="text-[10px] text-[#D8C6EC] block mb-1">
                      Merchant Binance Pay ID / UID:
                    </label>
                    <div className="flex items-center justify-between bg-[#0B0416] border border-[#F0B90B]/30 rounded-lg p-2.5">
                      <span className="font-mono text-sm font-bold text-white tracking-wider">
                        {BINANCE_PAY_ID}
                      </span>
                      <button
                        type="button"
                        onClick={handleCopyPayId}
                        className="text-xs font-bold text-[#F0B90B] hover:text-white flex items-center gap-1 px-2.5 py-1 rounded bg-[#F0B90B]/10 hover:bg-[#F0B90B]/20 transition-colors"
                      >
                        {copiedPayId ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedPayId ? 'Copied' : 'Copy Pay ID'}</span>
                      </button>
                    </div>
                  </div>

                  <p className="text-[11px] text-[#D8C6EC] leading-relaxed">
                    Open your <strong>Binance App</strong> ➔ Tap <strong>Pay</strong> (or scan the QR code above) ➔ Send <strong>${finalTotal.toFixed(2)} USDT</strong> to Pay ID <code className="text-[#F0B90B] font-mono font-bold">{BINANCE_PAY_ID}</code> with zero transaction fees.
                  </p>
                </div>
              )}

              {paymentMethod === 'trc20' && (
                <div className="rounded-xl border border-[#2CE6D2]/35 bg-[#061715] p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#2CE6D2]">
                      USDT TRC-20 (Tron Network)
                    </span>
                    <span className="text-[11px] font-mono font-bold text-white">
                      ${finalTotal.toFixed(2)} USDT
                    </span>
                  </div>

                  <div>
                    <label className="text-[10px] text-[#D8C6EC] block mb-1">
                      Tron TRC-20 Deposit Address:
                    </label>
                    <div className="flex items-center justify-between bg-[#0B0416] border border-[#2CE6D2]/30 rounded-lg p-2.5">
                      <span className="font-mono text-xs font-bold text-white truncate max-w-[240px]">
                        {USDT_TRC20_ADDRESS}
                      </span>
                      <button
                        type="button"
                        onClick={handleCopyAddress}
                        className="text-xs font-bold text-[#2CE6D2] hover:text-white flex items-center gap-1 px-2 py-0.5 rounded bg-[#2CE6D2]/10 hover:bg-[#2CE6D2]/20 transition-colors shrink-0"
                      >
                        {copiedAddress ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedAddress ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                  </div>

                  <p className="text-[11px] text-[#D8C6EC] leading-relaxed">
                    Send exactly <strong>${finalTotal.toFixed(2)} USDT</strong> on the <strong>TRC-20 (Tron)</strong> network.
                  </p>
                </div>
              )}

              {(paymentMethod === 'card' || paymentMethod === 'apple-pay') && (
                <div className="rounded-xl border border-pink-500/30 bg-pink-950/20 p-4 space-y-2">
                  <div className="flex items-center gap-2 text-pink-400 font-bold text-xs">
                    <AlertCircle className="w-4 h-4" />
                    <span>Card &amp; Apple Pay Coming Soon</span>
                  </div>
                  <p className="text-xs text-[#D8C6EC] leading-relaxed">
                    Credit/Debit Card &amp; Apple Pay checkout is currently undergoing regulatory compliance integration.
                  </p>
                  <p className="text-xs text-[#FF5CC4] font-semibold">
                    👉 Please select <strong>Binance Pay</strong> or <strong>USDT TRC-20</strong> above for instant 10-second activation.
                  </p>
                </div>
              )}

              {/* Totals */}
              <div className="space-y-2 border-t border-[#FF2EA6]/20 pt-4 text-sm">
                <div className="flex items-center justify-between text-[#CBB8DF]">
                  <span>Pass Subtotal</span>
                  <span className="font-mono tabular-nums">${pass.price.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between border-t border-[#FF2EA6]/20 pt-3 text-base font-bold text-white">
                  <span>Total Due Now</span>
                  <span
                    data-testid="checkout-final-total"
                    className="font-mono text-xl text-[#FF45B5] tabular-nums"
                  >
                    ${finalTotal.toFixed(2)} USD
                  </span>
                </div>
              </div>

              {/* Submit Button */}
              {paymentMethod === 'card' || paymentMethod === 'apple-pay' ? (
                <button
                  type="button"
                  disabled
                  className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-lg bg-white/10 px-6 py-3 text-sm font-bold text-slate-400 cursor-not-allowed border border-white/10"
                >
                  <CreditCard className="h-4 w-4" aria-hidden="true" />
                  <span>Coming Soon — Select Binance Pay / Crypto</span>
                </button>
              ) : (
                <button
                  type="submit"
                  className="vice-neon-btn flex min-h-[48px] w-full items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-bold"
                >
                  <CreditCard className="h-4 w-4" aria-hidden="true" />
                  <span>
                    I Have Paid ${finalTotal.toFixed(2)} · Provision PS5 Blade
                  </span>
                </button>
              )}

              <p className="flex items-center justify-center gap-1.5 text-center text-xs text-[#CBB8DF]">
                <Lock className="h-3.5 w-3.5 text-[#FF45B5]" aria-hidden="true" />
                <span>AES-256 encrypted checkout · 15-minute ping swap guarantee</span>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
