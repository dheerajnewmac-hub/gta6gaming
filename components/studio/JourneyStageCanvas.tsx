"use client";

import {
  Check,
  Gamepad2,
  Keyboard,
  Play,
  ShieldCheck,
  Server,
  Monitor,
  ArrowRight,
  HardDrive,
} from 'lucide-react';
import type { JourneyStep } from '@/lib/studio/storeData';

export type InputPreviewMode = 'controller' | 'keyboard';

interface JourneyStageCanvasProps {
  step: JourneyStep;
  handshakeLines: string[];
  simStep: number;
  simRunning: boolean;
  onSimulateHandshake: () => void;
  inputMode: InputPreviewMode;
  onChangeInputMode: (mode: InputPreviewMode) => void;
}

const PASS_OPTIONS = [
  { label: 'Quick Session', price: '$4.99', detail: '2 hrs · 25% OFF 1st buy' },
  {
    label: 'GTA VI Campaign',
    price: '$11.99',
    detail: '5 hrs · 25% OFF 1st buy',
    highlight: true,
  },
  { label: '15-Day GTA VI Pass', price: '$34.99', detail: 'No hourly cap · 25% OFF' },
];

export function JourneyStageCanvas({
  step,
  handshakeLines,
  simStep,
  simRunning,
  onSimulateHandshake,
  inputMode,
  onChangeInputMode,
}: JourneyStageCanvasProps) {
  return (
    <div className="vice-glass-card flex h-full flex-col justify-between rounded-xl p-6 lg:p-7">
      <div>
        {/* Stage Top Header matching Reference Image 1 right console panel */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#FF2EA6]/20 pb-4 text-xs">
          <div className="flex items-center gap-2 font-semibold">
            <span className="text-[#FF45B5]">Step {step.index}</span>
            <span aria-hidden="true" className="text-[#FF2EA6]/55">
              ·
            </span>
            <span className="text-[#E8DDF5]">{step.kicker}</span>
          </div>
          <span className="font-mono font-semibold text-[#FF5CC4] tabular-nums">
            {step.timeWindow}
          </span>
        </div>

        {/* Live Zero-Image Interactive Stage Preview */}
        <div className="mt-5">
          {step.stageType === 'pass' && (
            <div className="rounded-lg border border-[#FF2EA6]/25 bg-[#0D051A]/90 p-4 sm:p-5">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                <span className="font-semibold text-white">
                  Pass Selection · Instant Token Delivery
                </span>
                <span className="font-mono font-semibold text-[#FF5CC4]">
                  GTA VI License Included
                </span>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {PASS_OPTIONS.map((option) => (
                  <div
                    key={option.label}
                    className={`rounded-lg border p-3.5 ${
                      option.highlight
                        ? 'border-[#FF2EA6] bg-[#210C3A]'
                        : 'border-[#FF2EA6]/20 bg-[#150826]'
                    }`}
                  >
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="text-xs font-semibold text-white">
                        {option.label}
                      </span>
                      <span className="font-mono text-sm font-bold text-[#FF45B5] tabular-nums">
                        {option.price}
                      </span>
                    </div>
                    <p className="mt-1 text-[11px] text-[#CBB8DF]">{option.detail}</p>
                  </div>
                ))}
              </div>

              <div className="mt-4 grid grid-cols-3 gap-3 border-t border-[#FF2EA6]/15 pt-4 text-xs">
                <div>
                  <span className="text-[#CBB8DF]">Console Cost</span>
                  <p className="mt-0.5 font-mono font-semibold text-white tabular-nums">
                    $0 (vs $500)
                  </p>
                </div>
                <div>
                  <span className="text-[#CBB8DF]">Game Copy</span>
                  <p className="mt-0.5 font-mono font-semibold text-[#FF5CC4]">
                    Included ($70 saved)
                  </p>
                </div>
                <div>
                  <span className="text-[#CBB8DF]">Activation</span>
                  <p className="mt-0.5 font-mono font-semibold text-white tabular-nums">
                    Under 10 sec
                  </p>
                </div>
              </div>
            </div>
          )}

          {step.stageType === 'blade' && (
            <div className="rounded-lg border border-[#FF2EA6]/25 bg-[#0D051A]/90 p-4 sm:p-5">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="rounded-lg border border-[#FF2EA6]/20 bg-[#150826] p-3">
                  <div className="flex items-center gap-2 text-xs font-semibold text-white">
                    <Monitor className="h-3.5 w-3.5 text-[#FF45B5]" aria-hidden="true" />
                    <span>Your PC / Mac</span>
                  </div>
                  <p className="mt-1 font-mono text-[11px] text-[#CBB8DF]">
                    0 GB local disk used
                  </p>
                </div>

                <div className="rounded-lg border border-[#FF2EA6]/45 bg-[#210C3A] p-3">
                  <div className="flex items-center justify-between text-xs font-semibold text-white">
                    <span>Tier-4 Fiber Edge</span>
                    <ArrowRight className="h-3.5 w-3.5 text-[#FF45B5]" aria-hidden="true" />
                  </div>
                  <p className="mt-1 font-mono text-[11px] text-[#FF5CC4] tabular-nums">
                    14 ms avg · UDP 443
                  </p>
                </div>

                <div className="rounded-lg border border-[#FF2EA6]/20 bg-[#150826] p-3">
                  <div className="flex items-center gap-2 text-xs font-semibold text-white">
                    <Server className="h-3.5 w-3.5 text-[#FF45B5]" aria-hidden="true" />
                    <span>PS5-MIA-408</span>
                  </div>
                  <p className="mt-1 font-mono text-[11px] text-[#CBB8DF]">
                    Unshared 4K HDR Blade
                  </p>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <code className="font-mono text-xs text-[#CBB8DF]">
                  play.vicecloud.gg/stream/session-408
                </code>
                <button
                  type="button"
                  onClick={onSimulateHandshake}
                  disabled={simRunning}
                  className="vice-neon-btn inline-flex min-h-[34px] items-center gap-1.5 rounded-md px-3.5 py-1.5 text-xs font-bold whitespace-nowrap disabled:opacity-65"
                >
                  <Play className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>{simRunning ? 'Allocating Blade...' : 'Simulate Blade Handoff'}</span>
                </button>
              </div>

              <div
                aria-live="polite"
                className="mt-3 rounded-lg border border-[#FF2EA6]/20 bg-[#080212] p-3.5 font-mono text-[11px] leading-relaxed"
              >
                {handshakeLines.slice(0, simStep).map((line, idx) => (
                  <div
                    key={line}
                    className={
                      idx === handshakeLines.length - 1
                        ? 'text-[#FF5CC4]'
                        : 'text-[#D8C6EC]'
                    }
                  >
                    &gt; {line}
                  </div>
                ))}
              </div>
            </div>
          )}

          {step.stageType === 'stream' && (
            <div className="rounded-lg border border-[#FF2EA6]/25 bg-[#0D051A]/90 p-4 sm:p-5">
              {/* Matches Reference Image 1 Play in Browser right-hand panel */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#FF2EA6]/18 pb-3.5">
                <div className="flex items-center gap-2 text-xs font-semibold text-white">
                  <Gamepad2 className="h-4 w-4 text-[#FF45B5]" aria-hidden="true" />
                  <span>Play with controller, keyboard or mouse</span>
                </div>

                <div
                  role="group"
                  aria-label="Preview control scheme"
                  className="inline-flex rounded-lg border border-[#FF2EA6]/25 bg-[#150826] p-0.5"
                >
                  <button
                    type="button"
                    aria-pressed={inputMode === 'controller'}
                    onClick={() => onChangeInputMode('controller')}
                    className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-bold whitespace-nowrap transition-colors ${
                      inputMode === 'controller'
                        ? 'vice-neon-btn'
                        : 'text-[#CBB8DF] hover:text-white'
                    }`}
                  >
                    <Gamepad2 className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Controller</span>
                  </button>
                  <button
                    type="button"
                    aria-pressed={inputMode === 'keyboard'}
                    onClick={() => onChangeInputMode('keyboard')}
                    className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-bold whitespace-nowrap transition-colors ${
                      inputMode === 'keyboard'
                        ? 'vice-neon-btn'
                        : 'text-[#CBB8DF] hover:text-white'
                    }`}
                  >
                    <Keyboard className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Keyboard &amp; Mouse</span>
                  </button>
                </div>
              </div>

              {inputMode === 'controller' ? (
                <div className="mt-4 space-y-3">
                  <div>
                    <p className="text-sm font-bold text-white">Performance Mode</p>
                    <p className="mt-0.5 text-xs text-[#CBB8DF]">
                      PlayStation DualSense, DualShock 4 &amp; Xbox Wireless
                    </p>
                    <p className="mt-1 font-mono text-xs font-semibold text-[#FF45B5] tabular-nums">
                      3840×2160 HDR10 · 60FPS · 5.1 Surround
                    </p>
                  </div>
                  <div className="grid grid-cols-3 gap-2 border-t border-[#FF2EA6]/15 pt-3 font-mono text-[11px] text-[#D8C6EC] tabular-nums">
                    <span>Polling: 1000 Hz</span>
                    <span>Adaptive Triggers: Active</span>
                    <span>Cluster: US / EU</span>
                  </div>
                </div>
              ) : (
                <div className="mt-4 space-y-3">
                  <div>
                    <p className="text-sm font-bold text-white">Precision Pointer Lock</p>
                    <p className="mt-0.5 text-xs text-[#CBB8DF]">
                      Native PC WASD movement + 1:1 raw mouse aiming inside Chrome, Edge,
                      or Safari
                    </p>
                    <p className="mt-1 font-mono text-xs font-semibold text-[#FF45B5] tabular-nums">
                      1000Hz Mouse Input · Zero Acceleration · 14ms RTT
                    </p>
                  </div>
                  <div className="grid grid-cols-3 gap-2 border-t border-[#FF2EA6]/15 pt-3 font-mono text-[11px] text-[#D8C6EC] tabular-nums">
                    <span>WASD + Shift</span>
                    <span>F11 Fullscreen</span>
                    <span>Cluster: US / EU</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {step.stageType === 'saves' && (
            <div className="rounded-lg border border-[#FF2EA6]/25 bg-[#0D051A]/90 p-4 sm:p-5">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                <span className="flex items-center gap-1.5 font-semibold text-white">
                  <ShieldCheck className="h-4 w-4 text-[#FF45B5]" aria-hidden="true" />
                  <span>AES-256 Encrypted Save Vault</span>
                </span>
                <span className="font-mono font-semibold text-[#FF5CC4]">
                  Synced · 0.8s ago
                </span>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg border border-[#FF2EA6]/25 bg-[#150826] p-3.5">
                  <div className="flex items-center gap-2 text-xs font-semibold text-white">
                    <HardDrive className="h-3.5 w-3.5 text-[#FF45B5]" aria-hidden="true" />
                    <span>Story Mode Checkpoint</span>
                  </div>
                  <p className="mt-1 font-mono text-[11px] text-[#CBB8DF]">
                    Vice Beach · Chapter 04 · 48.2 MB mirrored
                  </p>
                </div>

                <div className="rounded-lg border border-[#FF2EA6]/25 bg-[#150826] p-3.5">
                  <div className="flex items-center gap-2 text-xs font-semibold text-white">
                    <Monitor className="h-3.5 w-3.5 text-[#FF45B5]" aria-hidden="true" />
                    <span>Cross-Screen Resume</span>
                  </div>
                  <p className="mt-1 font-mono text-[11px] text-[#CBB8DF]">
                    Windows PC ↔ MacBook ↔ Handheld
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Step Explanation + 3 Neon-Pink Checkmarks */}
      <div className="mt-5 border-t border-[#FF2EA6]/18 pt-5">
        <h3 className="font-display text-lg font-bold tracking-[-0.02em] text-white sm:text-xl">
          {step.title}
        </h3>
        <ul className="mt-3 space-y-2 text-xs text-[#E8DDF5] sm:text-sm">
          {step.bullets.map((bullet) => (
            <li key={bullet} className="flex items-start gap-2.5">
              <Check
                className="mt-0.5 h-4 w-4 shrink-0 text-[#FF2EA6]"
                aria-hidden="true"
              />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
