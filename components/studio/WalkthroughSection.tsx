"use client";

import { useState, useRef, useEffect } from 'react';
import {
  ArrowRight,
  Flag,
  Pause,
  Play,
  Star,
  Zap,
} from 'lucide-react';
import { JOURNEY_STEPS, STORE_ASSETS } from '@/lib/studio/storeData';
import {
  AUTOPLAY_DURATION_MS,
  formatStepCounter,
  getNextStepIndex,
} from '@/lib/studio/journeyFlow';
import {
  JourneyStageCanvas,
  type InputPreviewMode,
} from './JourneyStageCanvas';
import { ResilientImage } from './ResilientImage';

const HANDSHAKE_LINES = [
  'Allocating private PlayStation 5 blade #PS5-MIA-408 [Miami Tier-4 Cluster]...',
  'Exchanging WebRTC ICE/SDP candidates over UDP Port 443...',
  'Locking hardware H.265 4K HDR pipeline — 60.0 FPS · 14.2 ms RTT',
  '1000Hz controller & pointer lock active. GTA VI session ready.',
];

const STEP_ICONS = [Flag, Zap, Play, Star];

interface WalkthroughSectionProps {
  onExplorePlans: () => void;
}

export function WalkthroughSection({ onExplorePlans }: WalkthroughSectionProps) {
  const [activeIndex, setActiveIndex] = useState(2);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [inputMode, setInputMode] = useState<InputPreviewMode>('controller');
  const [simStep, setSimStep] = useState<number>(HANDSHAKE_LINES.length);
  const [simRunning, setSimRunning] = useState(false);
  const timersRef = useRef<number[]>([]);

  const activeStep = JOURNEY_STEPS[activeIndex];

  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setIsAutoPlaying(false);
    }
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const id = window.setInterval(() => {
      setActiveIndex((prev) => getNextStepIndex(prev, JOURNEY_STEPS.length));
    }, AUTOPLAY_DURATION_MS);

    return () => window.clearInterval(id);
  }, [isAutoPlaying]);

  useEffect(() => {
    return () => {
      timersRef.current.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  const handleManualStepSelect = (index: number) => {
    setActiveIndex(index);
    setIsAutoPlaying(false);
  };

  const handleChangeInputMode = (mode: InputPreviewMode) => {
    setInputMode(mode);
    setIsAutoPlaying(false);
  };

  const runStreamSimulation = () => {
    setIsAutoPlaying(false);
    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];
    setSimRunning(true);
    setSimStep(1);

    HANDSHAKE_LINES.forEach((_, idx) => {
      if (idx === 0) return;
      const timerId = window.setTimeout(() => {
        setSimStep(idx + 1);
        if (idx === HANDSHAKE_LINES.length - 1) {
          setSimRunning(false);
        }
      }, idx * 450);
      timersRef.current.push(timerId);
    });
  };

  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden border-b border-[#FF2EA6]/22 bg-[#0B0416] py-16 lg:py-24"
    >
      {/* Full-bleed Vice City Night Skyline & Palms Backdrop (Matches Reference Image 1 Bottom) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <ResilientImage
          src={STORE_ASSETS.viceNightBackdrop}
          alt="GTA VI neon purple and magenta skyline at night framed by palm trees"
          fallbackTitle="The ViceCloud Hub"
          className="h-full w-full object-cover object-center opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0416]/90 via-[#100520]/58 to-[#0B0416]/92" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(14,5,28,0.62)_0%,rgba(11,4,22,0.28)_70%)]" />
      </div>

      <div className="relative mx-auto max-w-[1160px] px-6 lg:px-10">
        {/* Section Header + Auto-Play Control */}
        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div className="max-w-xl">
            <p className="text-xs font-bold tracking-[0.08em] uppercase text-[#FF45B5]">
              THE VICECLOUD HUB
            </p>
            <h2 className="mt-2 font-display text-[clamp(1.9rem,3.4vw,2.9rem)] font-extrabold leading-[1.08] tracking-[-0.025em] text-white">
              From pass checkout to{' '}
              <span className="whitespace-nowrap text-[#FF2EA6]">GTA VI</span> in 45 seconds
            </h2>
            <p className="mt-2.5 text-sm leading-relaxed text-[#D8C6EC]">
              Follow the four steps below and launch GTA VI inside your browser in under
              45 seconds. No downloads, no waiting.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start lg:self-auto">
            <span className="font-mono text-xs text-[#D8C6EC] tabular-nums">
              {formatStepCounter(activeIndex, JOURNEY_STEPS.length)}
            </span>
            <button
              type="button"
              onClick={() => setIsAutoPlaying((prev) => !prev)}
              aria-pressed={isAutoPlaying}
              className="vice-outline-btn inline-flex min-h-[38px] items-center gap-2 rounded-lg border border-[#FF2EA6]/35 bg-[#150826]/90 px-3.5 py-2 text-xs font-semibold text-white whitespace-nowrap hover:border-[#FF2EA6]"
            >
              {isAutoPlaying ? (
                <>
                  <Pause className="h-3.5 w-3.5 text-[#FF45B5]" aria-hidden="true" />
                  <span>Pause Auto-Play</span>
                </>
              ) : (
                <>
                  <Play className="h-3.5 w-3.5 text-[#FF45B5]" aria-hidden="true" />
                  <span>Resume Auto-Play</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* 12-Column Interactive Split (Matches Reference Image 1 Bottom) */}
        <div className="mt-8 grid items-stretch gap-6 lg:grid-cols-12">
          {/* Left 5 Columns: 4 Stacked Translucent Neon Step Cards */}
          <div
            role="tablist"
            aria-label="Pass-to-Play journey steps"
            className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1"
          >
            {JOURNEY_STEPS.map((step, index) => {
              const isActive = index === activeIndex;
              const StepIcon = STEP_ICONS[index] ?? Zap;
              return (
                <button
                  key={step.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => handleManualStepSelect(index)}
                  className={`relative overflow-hidden rounded-xl px-4 py-4 text-left transition-all duration-150 ${
                    isActive
                      ? 'vice-glass-card-featured text-white'
                      : 'vice-glass-card text-[#D8C6EC] hover:border-[#FF2EA6]/60 hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3.5">
                      <span
                        className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                          isActive
                            ? 'bg-[#FF2EA6]/25 text-[#FF45B5]'
                            : 'bg-[#220E3B] text-[#FF45B5]/85'
                        }`}
                      >
                        <StepIcon className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <div>
                        <span className="block font-display text-base font-bold text-white">
                          {step.shortLabel}
                        </span>
                        <span className="mt-0.5 block text-xs text-[#CBB8DF]">
                          {step.shortBenefit}
                        </span>
                      </div>
                    </div>

                    <span className="font-mono text-[11px] font-medium text-[#CBB8DF] whitespace-nowrap tabular-nums">
                      {step.timeWindow}
                    </span>
                  </div>

                  {/* Subtle Neon Auto-Play Progress Bar on Active Step */}
                  <div
                    aria-hidden="true"
                    className="mt-3.5 h-[2px] w-full overflow-hidden rounded-full bg-[#FF2EA6]/15"
                  >
                    {isActive && (
                      <div
                        key={`progress-${activeIndex}-${isAutoPlaying ? 'run' : 'paused'}`}
                        className={`h-full w-full bg-gradient-to-r from-[#FF2EA6] via-[#FF5CC4] to-[#A855F7] ${
                          isAutoPlaying ? 'animate-journey-progress' : ''
                        }`}
                      />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right 7 Columns: Live Zero-Image Interactive Console */}
          <div className="lg:col-span-7">
            <JourneyStageCanvas
              step={activeStep}
              handshakeLines={HANDSHAKE_LINES}
              simStep={simStep}
              simRunning={simRunning}
              onSimulateHandshake={runStreamSimulation}
              inputMode={inputMode}
              onChangeInputMode={handleChangeInputMode}
            />
          </div>
        </div>

        {/* Bottom Floating Conversion Bar with VI Emblem (Matches Reference Image 1 Bottom) */}
        <div className="vice-glass-card-featured relative mt-8 overflow-hidden rounded-xl px-5 py-4 sm:px-7 sm:py-5">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-4">
              <div
                aria-hidden="true"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-[#FF2EA6]/45 bg-[#1B0930] font-display text-2xl font-black tracking-tighter"
              >
                <span className="vice-text-gradient">VI</span>
              </div>
              <div>
                <p className="font-display text-base font-bold text-white sm:text-lg">
                  Ready to launch GTA VI on your screen?
                </p>
                <p className="mt-0.5 text-xs text-[#D8C6EC]">
                  No console required. No 150GB downloads. Choose your plan and start
                  playing instantly.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onExplorePlans}
              className="vice-neon-btn inline-flex min-h-[44px] w-full shrink-0 items-center justify-center gap-2 rounded-lg px-6 py-2.5 text-sm font-bold whitespace-nowrap sm:w-auto"
            >
              <span>Choose Your Plan</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
