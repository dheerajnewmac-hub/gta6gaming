"use client";

import { useState, type PointerEvent } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Activity,
  Zap,
  BarChart3,
  Globe,
  Users,
} from 'lucide-react';
import { STORE_ASSETS } from '@/lib/studio/storeData';
import { ResilientImage } from './ResilientImage';

interface HeroSectionProps {
  onExplorePlans: () => void;
  onRunDiagnosticJump: () => void;
}

const HERO_METRICS = [
  { value: '14 ms', label: 'Low Latency', icon: Zap },
  { value: '4K 60FPS', label: 'Ultra HD Streaming', icon: BarChart3 },
  { value: '0 GB', label: 'Local Downloads', icon: Globe },
  { value: '1,000', label: 'Dedicated Blades', icon: Users },
];

export function HeroSection({
  onExplorePlans,
  onRunDiagnosticJump,
}: HeroSectionProps) {
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;
    setParallax({
      x: Number((relX * -14).toFixed(2)),
      y: Number((relY * -8).toFixed(2)),
    });
  };

  const handlePointerLeave = () => {
    setParallax({ x: 0, y: 0 });
  };

  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-[#FF2EA6]/22 bg-[#0B0416]"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <div className="relative mx-auto min-h-[690px] w-full max-w-[1600px] lg:min-h-[760px]">
        {/* Full-bleed GTA VI Duo Artwork with Vice Magenta-Sunset Grading & Parallax */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          {/* Mobile & Tablet (< md): Vertical 2:3 GTA VI Duo Artwork */}
          <div className="h-full w-full md:hidden">
            <div className="animate-gta6-ken-burns h-full w-full will-change-transform">
              <ResilientImage
                src={STORE_ASSETS.heroGta6DuoMobile}
                alt="GTA VI male and female protagonists against a glowing Leonida sunset"
                fallbackTitle="GTA VI — Leonida Edition"
                className="h-full w-full object-cover object-[84%_14%] sm:object-[72%_14%]"
              />
            </div>
          </div>

          {/* Desktop (md+): Wide 16:9 GTA VI Duo Artwork */}
          <div
            className="hidden h-full w-full transition-transform duration-300 ease-out will-change-transform md:block"
            style={{
              transform: `translate3d(${parallax.x}px, ${parallax.y}px, 0) scale(1.03)`,
            }}
          >
            <div className="animate-gta6-ken-burns h-full w-full will-change-transform">
              <ResilientImage
                src={STORE_ASSETS.heroGta6Duo}
                alt="GTA VI male and female protagonists leaning on a turquoise muscle coupe along a palm-lined Leonida beachfront at sunset"
                fallbackTitle="GTA VI — Leonida Edition"
                className="h-full w-full object-cover object-[78%_18%]"
              />
            </div>
          </div>

          {/* Vibrant Vice City Magenta & Violet Sunset Atmosphere Overlay */}
          <div className="animate-gta6-sunset-sweep absolute inset-0 bg-[radial-gradient(ellipse_at_72%_28%,rgba(255,46,166,0.34),rgba(139,34,196,0.18)_48%,transparent_76%)] will-change-transform" />
          <div className="absolute inset-0 bg-[linear-gradient(125deg,rgba(17,5,34,0.45)_0%,rgba(255,46,166,0.12)_55%,rgba(124,42,232,0.16)_100%)]" />
        </div>

        {/* Mobile & Tablet Scrim */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#0B0416]/90 via-[#0B0416]/52 via-56% to-transparent md:hidden"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0B0416]/96 via-[#0B0416]/26 via-34% to-[#0B0416]/32 md:hidden"
        />

        {/* Desktop Scrim */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 hidden bg-gradient-to-r from-[#0B0416]/95 via-[#0E051D]/74 via-44% to-transparent md:block"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 hidden bg-gradient-to-t from-[#0B0416]/96 via-[#0B0416]/16 via-24% to-[#0B0416]/30 md:block"
        />

        {/* Stylized GTA VI Right-Edge Emblem (Desktop xl+, matching Reference Image 1) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-8 top-14 hidden select-none text-right xl:block"
        >
          <div className="relative inline-flex flex-col items-end leading-none">
            <span className="font-display text-[22px] font-black uppercase tracking-[-0.04em] text-white [text-shadow:0_2px_10px_#0B0416]">
              grand
            </span>
            <span className="-mt-1.5 font-display text-[22px] font-black uppercase tracking-[-0.04em] text-white [text-shadow:0_2px_10px_#0B0416]">
              theft
            </span>
            <span className="-mt-1.5 font-display text-[22px] font-black uppercase tracking-[-0.04em] text-white [text-shadow:0_2px_10px_#0B0416]">
              auto
            </span>
            <span className="vice-text-gradient -mt-3 font-display text-[56px] font-black tracking-[-0.05em]">
              VI
            </span>
          </div>
        </div>

        {/* Main Hero Content Container */}
        <div className="relative mx-auto flex max-w-[1280px] flex-col justify-between px-6 pb-8 pt-10 sm:pt-12 md:min-h-[690px] md:py-14 lg:min-h-[760px] lg:px-10 lg:py-16">
          <div className="max-w-xl sm:max-w-[380px] md:max-w-xl lg:max-w-[540px]">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="mb-3 text-xs font-bold tracking-[0.04em] text-[#FF45B5] md:mb-4"
            >
              PlayStation 5 Cloud Gaming
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-[clamp(2.35rem,5.2vw,4.35rem)] font-extrabold leading-[1.03] tracking-[-0.03em] text-white [text-shadow:0_4px_20px_rgba(11,4,22,0.85)]"
            >
              Play{' '}
              <span className="whitespace-nowrap text-[#FF2EA6]">
                GTA VI
              </span>{' '}
              on Any PC or Laptop
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
              className="mt-4 max-w-md text-sm leading-relaxed text-[#E9DDF7] sm:text-[15px] md:mt-5 md:text-base"
            >
              Dedicated PlayStation 5 hardware blades pre-loaded with Grand Theft Auto VI.
              Stream native 4K HDR at a locked 60FPS directly inside Chrome, Edge, or
              Safari—no $1,500 GPU, no 150GB install.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 flex flex-wrap items-center gap-3.5 md:mt-7"
            >
              <button
                type="button"
                onClick={onExplorePlans}
                className="vice-neon-btn inline-flex min-h-[46px] items-center justify-center gap-2 rounded-lg px-6 py-2.5 text-sm font-bold whitespace-nowrap shrink-0"
              >
                <span>Choose Your Plan</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={onRunDiagnosticJump}
                className="vice-outline-btn inline-flex min-h-[46px] items-center justify-center gap-2 rounded-lg border border-[#FF2EA6]/40 bg-[#140825]/88 px-5 py-2.5 text-sm font-semibold text-white whitespace-nowrap shrink-0 hover:border-[#FF2EA6] hover:bg-[#1E0D36]"
              >
                <Activity className="h-4 w-4 text-[#FF45B5]" aria-hidden="true" />
                <span>Check My Latency</span>
              </button>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.32 }}
              className="mt-4 flex items-center gap-1.5 text-xs font-medium text-[#D6C4EA]"
            >
              <Zap className="h-3.5 w-3.5 shrink-0 text-[#FFB84D]" aria-hidden="true" />
              <span>
                Powered by next-gen PS5 cloud hardware · First-time passes from{' '}
                <span className="font-mono text-[#B39AC9] line-through tabular-nums">
                  $6.65
                </span>{' '}
                <span className="font-mono font-bold text-[#FFD166] tabular-nums">
                  $4.99
                </span>
              </span>
            </motion.p>
          </div>

          {/* Bottom Floating Neon-Glass Metric Strip + Promo Card (Matches Reference Image 1) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 grid gap-4 lg:mt-16 lg:grid-cols-12 lg:items-stretch"
          >
            {/* 4 Metrics Glass Bar */}
            <div className="vice-glass-card grid grid-cols-2 gap-4 rounded-xl px-5 py-4 sm:grid-cols-4 lg:col-span-7 lg:flex lg:items-center lg:justify-between lg:px-6">
              {HERO_METRICS.map((metric) => {
                const Icon = metric.icon;
                return (
                  <div key={metric.label} className="flex items-center gap-3 shrink-0">
                    <Icon
                      className="h-5 w-5 shrink-0 text-[#FF2EA6]"
                      aria-hidden="true"
                    />
                    <div>
                      <div className="font-display text-lg font-extrabold leading-tight text-white whitespace-nowrap tabular-nums sm:text-xl">
                        {metric.value}
                      </div>
                      <div className="text-[11px] font-medium text-[#CBB8DF] whitespace-nowrap">
                        {metric.label}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Value Promo Glass Card */}
            <div className="vice-glass-card flex flex-col justify-between gap-4 rounded-xl px-5 py-4 sm:flex-row sm:items-center lg:col-span-5">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-white">
                  <span>
                    Start at{' '}
                    <span className="font-mono text-[#B39AC9] line-through tabular-nums">
                      $6.65
                    </span>{' '}
                    <span className="font-mono text-sm text-[#FF5CC4] tabular-nums">
                      $4.99
                    </span>
                  </span>
                  <span className="vice-discount-tag rounded px-2 py-0.5 font-mono text-[10px] font-extrabold uppercase tracking-[0.03em] whitespace-nowrap">
                    <span>25% OFF · 1st Buy</span>
                  </span>
                </div>
                <p className="mt-1 text-[11px] leading-snug text-[#CBB8DF]">
                  First-Time Drop · Instant 25% OFF your first GTA VI cloud pass.
                </p>
              </div>
              <button
                type="button"
                onClick={onExplorePlans}
                className="vice-neon-btn inline-flex min-h-[38px] shrink-0 items-center justify-center gap-1.5 rounded-lg px-4 py-2 text-xs font-bold whitespace-nowrap"
              >
                <span>View Plans</span>
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
