"use client";

import { useState, useMemo } from 'react';
import {
  Check,
  ArrowRight,
  Clock,
  Calendar,
  SlidersHorizontal,
  Sparkles,
} from 'lucide-react';
import {
  RENTAL_PLANS,
  STORE_ASSETS,
  type RentalPlan,
} from '@/lib/studio/storeData';
import {
  calculateCustomPassQuote,
  FIRST_TIME_DISCOUNT_PERCENT,
  getFirstTimeAnchorPricing,
  type StreamQuality,
} from '@/lib/studio/pricing';
import { ResilientImage } from './ResilientImage';

export interface SelectedCheckoutPass {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  firstTimeDiscountPercent?: number;
  summary: string;
  qualityLabel: string;
  isCustom?: boolean;
}

interface PricingSectionProps {
  onSelectPass: (pass: SelectedCheckoutPass) => void;
  onViewClusters: () => void;
}

const HOUR_PRESETS = [2, 8, 20, 40, 80];
const VALIDITY_PRESETS = [7, 15, 30, 60];

export function PricingSection({
  onSelectPass,
  onViewClusters,
}: PricingSectionProps) {
  const [activeTier, setActiveTier] = useState<'hourly' | 'unlimited'>('hourly');
  const [customQuality, setCustomQuality] = useState<StreamQuality>('4k');
  const [customHours, setCustomHours] = useState<number>(8);
  const [customValidity, setCustomValidity] = useState<number>(15);

  const visiblePlans = useMemo(
    () => RENTAL_PLANS.filter((plan) => plan.tier === activeTier),
    [activeTier]
  );

  const customQuote = useMemo(
    () => calculateCustomPassQuote(customHours, customValidity, customQuality),
    [customHours, customValidity, customQuality]
  );

  const customAnchor = useMemo(
    () => getFirstTimeAnchorPricing(customQuote.subtotal),
    [customQuote.subtotal]
  );

  const handlePlanChoose = (plan: RentalPlan) => {
    const deal = getFirstTimeAnchorPricing(plan.price);
    onSelectPass({
      id: plan.id,
      name: plan.name,
      price: deal.finalPrice,
      originalPrice: deal.anchorPrice,
      firstTimeDiscountPercent: deal.discountPercent,
      summary: plan.unitLabel,
      qualityLabel: plan.qualityLabel,
    });
  };

  const handleDeployCustom = () => {
    const qualityName =
      customQuality === '4k' ? '4K HDR Ultra 60FPS' : '1080p 60FPS';
    onSelectPass({
      id: `custom-${customQuote.hours}h-${customQuote.validityDays}d-${customQuote.quality}`,
      name: `Custom GTA VI Pass (${customQuote.hours} hrs)`,
      price: customAnchor.finalPrice,
      originalPrice: customAnchor.anchorPrice,
      firstTimeDiscountPercent: customAnchor.discountPercent,
      summary: `${customQuote.hours} hours · Valid ${customQuote.validityDays} days`,
      qualityLabel: qualityName,
      isCustom: true,
    });
  };

  return (
    <>
      {/* UPPER BAND: Pricing Plans floating over Vibrant Vice City Sunset Skyline (Matches Reference Image 2 Top) */}
      <section
        id="plans"
        className="relative overflow-hidden border-b border-[#FF2EA6]/22 bg-[#0B0416] py-16 lg:py-24"
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <ResilientImage
            src={STORE_ASSETS.viceSunsetBackdrop}
            alt="Vibrant neon-magenta and coral GTA VI sunset skyline with palm trees and helicopters"
            fallbackTitle="ViceCloud GTA VI Passes"
            className="h-full w-full object-cover object-center opacity-72"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B0416]/86 via-[#160728]/58 to-[#0B0416]/94" />
        </div>

        <div className="relative mx-auto max-w-[1160px] px-6 lg:px-10">
          {/* Header + Segmented Tier Switcher */}
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-lg">
              <p className="text-xs font-bold tracking-[0.06em] text-[#FF45B5]">
                GTA VI Passes &amp; Custom Hours
              </p>
              <h2 className="mt-2 font-display text-[clamp(2rem,3.6vw,3.1rem)] font-extrabold leading-[1.06] tracking-[-0.025em] text-white [text-shadow:0_3px_16px_rgba(11,4,22,0.85)]">
                Choose your{' '}
                <span className="whitespace-nowrap text-[#FF2EA6]">GTA VI</span> access window
              </h2>
              <p className="mt-2.5 text-sm leading-relaxed text-[#E8DDF5]">
                Pay only for the playtime you need. Zero auto-renew traps, official GTA VI
                game license included on every blade.
              </p>
            </div>

            <div
              role="tablist"
              aria-label="Pass billing mode"
              className="grid w-full grid-cols-2 rounded-lg border border-[#FF2EA6]/35 bg-[#120622]/90 p-1 md:inline-flex md:w-auto"
            >
              <button
                type="button"
                role="tab"
                aria-selected={activeTier === 'hourly'}
                onClick={() => setActiveTier('hourly')}
                className={`min-h-[40px] truncate rounded-md px-4 py-2 text-xs font-bold whitespace-nowrap transition-all duration-150 sm:text-sm ${
                  activeTier === 'hourly'
                    ? 'vice-neon-btn'
                    : 'text-[#D8C6EC] hover:text-white'
                }`}
              >
                Hourly (From $4.99)
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeTier === 'unlimited'}
                onClick={() => setActiveTier('unlimited')}
                className={`min-h-[40px] truncate rounded-md px-4 py-2 text-xs font-bold whitespace-nowrap transition-all duration-150 sm:text-sm ${
                  activeTier === 'unlimited'
                    ? 'vice-neon-btn'
                    : 'text-[#D8C6EC] hover:text-white'
                }`}
              >
                Unlimited (15d / 30d)
              </button>
            </div>
          </div>

          {/* Catchy Animated First-Time Buyer Spotlight Banner */}
          <div
            data-testid="first-time-offer-banner"
            className="vice-offer-banner mt-7 flex flex-col justify-between gap-3 rounded-xl px-5 py-3.5 sm:flex-row sm:items-center sm:px-6"
          >
            <div className="flex flex-wrap items-center gap-3">
              <span className="vice-discount-tag rounded-md px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-[0.04em] whitespace-nowrap">
                <Sparkles className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                <span>{FIRST_TIME_DISCOUNT_PERCENT}% OFF · 1st Buy</span>
              </span>
              <p className="text-sm font-bold text-white sm:text-[15px]">
                First-Time Drop:{' '}
                <span className="text-[#FFD166]">Instant 25% OFF your first GTA VI pass</span>
              </p>
            </div>
            <p className="font-mono text-xs font-semibold text-[#F1DCFF] whitespace-nowrap">
              Auto-applied · No code needed
            </p>
          </div>

          {/* 3-Column Floating Neon Glass Pass Grid */}
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {visiblePlans.map((plan) => {
              const deal = getFirstTimeAnchorPricing(plan.price);
              return (
                <article
                  key={plan.id}
                  className={`relative flex flex-col justify-between rounded-xl p-6 transition-transform duration-200 hover:-translate-y-0.5 sm:p-7 ${
                    plan.featured ? 'vice-glass-card-featured' : 'vice-glass-card'
                  }`}
                >
                  {/* Floating Centered 'Most Popular' Cap matching Reference Image 2 */}
                  {plan.featured && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-[#FF2EA6] px-4 py-1 text-[11px] font-bold text-white shadow-[0_0_16px_rgba(255,46,166,0.75)] whitespace-nowrap">
                      Most Popular
                    </div>
                  )}

                  <div>
                    <div className="flex items-center justify-between gap-3 text-xs">
                      <span className="font-semibold text-[#FF45B5]">{plan.kicker}</span>
                      <span className="font-mono text-[11px] text-[#D8C6EC]">
                        {plan.qualityLabel}
                      </span>
                    </div>

                    <h3 className="mt-2.5 font-display text-2xl font-extrabold tracking-[-0.02em] text-white">
                      {plan.name}
                    </h3>

                    <div className="mt-3 border-b border-[#FF2EA6]/20 pb-5">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span className="font-mono text-sm font-semibold text-[#B39AC9] line-through tabular-nums">
                          ${deal.anchorPrice.toFixed(2)}
                        </span>
                        <span className="vice-discount-tag rounded px-2 py-0.5 font-mono text-[10px] font-extrabold uppercase tracking-[0.03em] whitespace-nowrap">
                          <span>{deal.discountPercent}% OFF · 1st Buy</span>
                        </span>
                      </div>

                      <div className="mt-1.5 flex items-baseline gap-2">
                        <span className="font-mono text-4xl font-bold text-white tabular-nums">
                          ${deal.finalPrice.toFixed(2)}
                        </span>
                        <span className="text-xs text-[#CBB8DF]">/ {plan.unitLabel}</span>
                      </div>

                      <p className="mt-1.5 text-xs font-semibold text-[#FFD166] tabular-nums">
                        Save ${deal.savingsAmount.toFixed(2)} on your first order
                      </p>
                    </div>

                    <ul className="mt-5 space-y-2.5 text-sm text-[#EFE7FA]">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2.5">
                          <Check
                            className="mt-0.5 h-4 w-4 shrink-0 text-[#FF2EA6]"
                            aria-hidden="true"
                          />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    type="button"
                    onClick={() => handlePlanChoose(plan)}
                    className={`mt-7 flex min-h-[46px] w-full items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-bold whitespace-nowrap ${
                      plan.featured
                        ? 'vice-neon-btn'
                        : 'vice-outline-btn border border-[#FF2EA6]/35 bg-[#120622]/85 text-white hover:border-[#FF2EA6] hover:bg-[#220B3C]'
                    }`}
                  >
                    <span>Select {plan.name}</span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* LOWER BAND: Custom Hours Calculator + Worldwide Clusters Map Banner over Night Skyline (Matches Reference Image 2 Middle/Bottom) */}
      <section
        id="calculator"
        className="relative overflow-hidden border-b border-[#FF2EA6]/22 bg-[#0B0416] py-16 lg:py-20"
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <ResilientImage
            src={STORE_ASSETS.viceNightBackdrop}
            alt="GTA VI neon night bay skyline with glowing purple skyscrapers and palm trees"
            fallbackTitle="Custom GTA VI Hours Calculator"
            className="h-full w-full object-cover object-center opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B0416]/90 via-[#120622]/55 to-[#0B0416]/92" />
        </div>

        <div className="relative mx-auto max-w-[1160px] space-y-6 px-6 lg:px-10">
          {/* Custom Gaming Hours & Validity Calculator Card */}
          <div className="vice-glass-card rounded-xl p-6 sm:p-8">
            <div className="flex flex-col justify-between gap-4 border-b border-[#FF2EA6]/20 pb-5 md:flex-row md:items-center">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-[#D8C6EC]">
                  <SlidersHorizontal
                    className="h-3.5 w-3.5 text-[#FF45B5]"
                    aria-hidden="true"
                  />
                  <span>Custom Rig Pass Builder</span>
                </div>
                <h3 className="mt-1 font-display text-2xl font-extrabold tracking-[-0.02em] text-[#FF38B0] sm:text-3xl">
                  Custom Gaming Hours &amp; Validity Calculator
                </h3>
                <p className="mt-1 text-xs text-[#D8C6EC] sm:text-sm">
                  Dial in your exact playtime and expiry window. More hours unlock a lower
                  hourly rate automatically.
                </p>
              </div>

              <div
                role="group"
                aria-label="Custom rig stream resolution"
                className="inline-flex self-start rounded-lg border border-[#FF2EA6]/35 bg-[#0D051A] p-1 md:self-auto"
              >
                <button
                  type="button"
                  aria-pressed={customQuality === '1080p'}
                  onClick={() => setCustomQuality('1080p')}
                  className={`min-h-[36px] rounded-md px-3.5 py-1.5 text-xs font-bold whitespace-nowrap transition-colors ${
                    customQuality === '1080p'
                      ? 'vice-neon-btn'
                      : 'text-[#CBB8DF] hover:text-white'
                  }`}
                >
                  1080p 60FPS
                </button>
                <button
                  type="button"
                  aria-pressed={customQuality === '4k'}
                  onClick={() => setCustomQuality('4k')}
                  className={`min-h-[36px] rounded-md px-3.5 py-1.5 text-xs font-bold whitespace-nowrap transition-colors ${
                    customQuality === '4k'
                      ? 'vice-neon-btn'
                      : 'text-[#CBB8DF] hover:text-white'
                  }`}
                >
                  4K HDR Ultra
                </button>
              </div>
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-12 lg:items-stretch">
              {/* Sliders & Presets */}
              <div className="space-y-6 rounded-xl border border-[#FF2EA6]/25 bg-[#0E051C]/85 p-5 lg:col-span-7">
                <div>
                  <div className="flex items-center justify-between gap-4">
                    <label
                      htmlFor="custom-hours-slider"
                      className="flex items-center gap-2 text-sm font-semibold text-white"
                    >
                      <Clock className="h-4 w-4 text-[#FF45B5]" aria-hidden="true" />
                      <span>Total Gaming Hours</span>
                    </label>
                    <span className="font-mono text-base font-bold text-[#FF45B5] tabular-nums">
                      {customQuote.hours} Hours
                    </span>
                  </div>
                  <input
                    id="custom-hours-slider"
                    type="range"
                    min={2}
                    max={80}
                    step={1}
                    value={customHours}
                    onChange={(e) => setCustomHours(Number(e.target.value))}
                    className="vice-slider mt-3"
                  />
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    {HOUR_PRESETS.map((hrs) => (
                      <button
                        key={hrs}
                        type="button"
                        onClick={() => setCustomHours(hrs)}
                        className={`rounded-md border px-3 py-1.5 font-mono text-xs font-semibold tabular-nums transition-all ${
                          customHours === hrs
                            ? 'vice-neon-btn border-transparent'
                            : 'border-[#FF2EA6]/28 bg-[#17092B] text-[#D8C6EC] hover:border-[#FF2EA6] hover:text-white'
                        }`}
                      >
                        {hrs} hrs
                      </button>
                    ))}
                  </div>
                </div>

                <div className="border-t border-[#FF2EA6]/15 pt-5">
                  <div className="flex items-center justify-between gap-4">
                    <label
                      htmlFor="custom-validity-slider"
                      className="flex items-center gap-2 text-sm font-semibold text-white"
                    >
                      <Calendar className="h-4 w-4 text-[#FF45B5]" aria-hidden="true" />
                      <span>Validity Period (Days to use hours)</span>
                    </label>
                    <span className="font-mono text-base font-bold text-[#FFB84D] tabular-nums">
                      {customQuote.validityDays} Days
                    </span>
                  </div>
                  <input
                    id="custom-validity-slider"
                    type="range"
                    min={7}
                    max={60}
                    step={1}
                    value={customValidity}
                    onChange={(e) => setCustomValidity(Number(e.target.value))}
                    className="vice-slider mt-3"
                  />
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    {VALIDITY_PRESETS.map((days) => (
                      <button
                        key={days}
                        type="button"
                        onClick={() => setCustomValidity(days)}
                        className={`rounded-md border px-3 py-1.5 font-mono text-xs font-semibold tabular-nums transition-all ${
                          customValidity === days
                            ? 'vice-outline-btn border-[#FF2EA6] bg-[#FF2EA6]/25 text-white'
                            : 'border-[#FF2EA6]/28 bg-[#17092B] text-[#D8C6EC] hover:border-[#FF2EA6] hover:text-white'
                        }`}
                      >
                        {days} Days
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Calculated Estimate Panel */}
              <div className="flex flex-col justify-between rounded-xl border border-[#FF2EA6]/35 bg-[#0E051C]/90 p-6 lg:col-span-5">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-semibold text-[#D8C6EC]">
                      First-Time Estimate
                    </span>
                    <div className="flex flex-wrap items-center gap-2">
                      {customQuote.savingsPercent > 0 && (
                        <span className="rounded-md border border-[#FF2EA6]/50 bg-[#FF2EA6]/20 px-2 py-0.5 font-mono text-[11px] font-bold text-[#FF70C8] tabular-nums">
                          Volume -{customQuote.savingsPercent}%
                        </span>
                      )}
                      <span className="vice-discount-tag rounded px-2 py-0.5 font-mono text-[10px] font-extrabold uppercase tracking-[0.03em] whitespace-nowrap">
                        <span>{customAnchor.discountPercent}% OFF · 1st Buy</span>
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 flex flex-wrap items-baseline gap-2.5">
                    <span className="font-mono text-base font-semibold text-[#B39AC9] line-through tabular-nums">
                      ${customAnchor.anchorPrice.toFixed(2)}
                    </span>
                    <span
                      data-testid="custom-quote-total"
                      className="font-mono text-4xl font-bold text-white tabular-nums"
                    >
                      ${customAnchor.finalPrice.toFixed(2)}
                    </span>
                    <span className="font-mono text-sm text-[#CBB8DF] tabular-nums">
                      (${customQuote.effectiveRatePerHour.toFixed(2)}/hr)
                    </span>
                  </div>

                  <p className="mt-1.5 text-xs font-semibold text-[#FFD166] tabular-nums">
                    Save ${customAnchor.savingsAmount.toFixed(2)} on your first GTA VI pass
                  </p>

                  <p className="mt-3 text-xs leading-relaxed text-[#D8C6EC]">
                    Includes <strong className="text-white">{customQuote.hours} hours</strong>{' '}
                    of dedicated PS5 blade streaming at{' '}
                    <strong className="text-white">
                      {customQuality === '4k' ? '4K HDR Ultra' : '1080p 60FPS'}
                    </strong>
                    , valid for{' '}
                    <strong className="text-white">
                      {customQuote.validityDays} full days
                    </strong>{' '}
                    with encrypted cloud saves.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleDeployCustom}
                  className="vice-neon-btn mt-6 flex min-h-[46px] w-full items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-bold whitespace-nowrap"
                >
                  <span>
                    Deploy Custom Pass (${customAnchor.finalPrice.toFixed(2)})
                  </span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>

          {/* Worldwide Low-Latency Cloud Clusters Banner with Glowing Neon World Map (Matches Reference Image 2 Bottom) */}
          <div className="vice-glass-card relative overflow-hidden rounded-xl px-6 py-5 sm:px-8">
            <div className="grid items-center gap-6 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <h3 className="font-display text-2xl font-extrabold leading-tight tracking-[-0.02em] text-[#FF38B0]">
                  Worldwide low-latency cloud clusters
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-[#D8C6EC] sm:text-sm">
                  Direct 10Gbps Equinix Tier-4 fiber peering delivers ultra-low latency
                  response across four global gaming regions.
                </p>
              </div>

              <div className="relative h-28 overflow-hidden rounded-lg bg-[#0D0418] lg:col-span-4 lg:h-32">
                <ResilientImage
                  src={STORE_ASSETS.viceNeonWorldMap}
                  alt="Glowing neon magenta world map showing ViceCloud global PS5 server nodes"
                  fallbackTitle="Global PS5 Clusters"
                  className="h-full w-full object-contain opacity-95"
                />
              </div>

              <div className="flex lg:col-span-3 lg:justify-end">
                <button
                  type="button"
                  onClick={onViewClusters}
                  className="vice-neon-btn inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-bold whitespace-nowrap lg:w-auto"
                >
                  <span>View Our Clusters</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
