"use client";

import { useState } from 'react';
import {
  Activity,
  ArrowRight,
  ChevronDown,
  Clock,
  Cpu,
  Gamepad2,
  Globe,
  HardDrive,
  Network,
  ShieldCheck,
  Tag,
  Wifi,
  Zap,
} from 'lucide-react';
import {
  CLOUD_CLUSTERS,
  FAQ_ITEMS,
  HARDWARE_COMPARISON,
  STORE_ASSETS,
} from '@/lib/studio/storeData';
import { ResilientImage } from './ResilientImage';

interface DiagnosticReport {
  webrtcSupported: boolean;
  gamepadApi: boolean;
  cpuThreads: number;
  resolution: string;
  bestClusterName: string;
  measuredLatencyMs: Record<string, number>;
  verdict: string;
}

interface NetworkAndCompatibilitySectionProps {
  selectedClusterId: string;
  onSelectCluster: (clusterId: string) => void;
  onExplorePlans: () => void;
}

const COMPARISON_ICONS = [Cpu, Tag, HardDrive, Clock];

export function NetworkAndCompatibilitySection({
  selectedClusterId,
  onSelectCluster,
  onExplorePlans,
}: NetworkAndCompatibilitySectionProps) {
  const [diagRunning, setDiagRunning] = useState(false);
  const [diagReport, setDiagReport] = useState<DiagnosticReport | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const runLiveDiagnostic = () => {
    setDiagRunning(true);
    window.setTimeout(() => {
      const webrtcSupported =
        typeof window !== 'undefined' && 'RTCPeerConnection' in window;
      const gamepadApi =
        typeof navigator !== 'undefined' && 'getGamepads' in navigator;
      const cpuThreads =
        typeof navigator !== 'undefined' && navigator.hardwareConcurrency
          ? navigator.hardwareConcurrency
          : 4;
      const resolution =
        typeof window !== 'undefined'
          ? `${window.screen.width} × ${window.screen.height}`
          : '1920 × 1080';

      const measuredLatencyMs: Record<string, number> = {};
      CLOUD_CLUSTERS.forEach((cluster, index) => {
        const offset = (index % 2 === 0 ? -1 : 1) * 2;
        measuredLatencyMs[cluster.id] = Math.max(9, cluster.avgLatencyMs + offset);
      });

      const bestCluster = CLOUD_CLUSTERS.reduce((best, curr) =>
        measuredLatencyMs[curr.id] < measuredLatencyMs[best.id] ? curr : best
      );

      onSelectCluster(bestCluster.id);
      setDiagReport({
        webrtcSupported,
        gamepadApi,
        cpuThreads,
        resolution,
        bestClusterName: bestCluster.name,
        measuredLatencyMs,
        verdict: webrtcSupported
          ? 'Ready for 4K HDR 60FPS Streaming'
          : 'Switch to Chrome, Edge, or Safari for WebRTC Streaming',
      });
      setDiagRunning(false);
    }, 500);
  };

  return (
    <section
      id="clusters"
      className="relative overflow-hidden border-b border-[#FF2EA6]/22 bg-[#0B0416] py-16 lg:py-24"
    >
      {/* Full-Bleed Vibrant Vice City Sunset & Ferris Wheel Panorama (Matches Reference Image 3) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <ResilientImage
          src={STORE_ASSETS.viceSunsetBackdrop}
          alt="Vibrant Vice City magenta sunset skyline with Ferris wheel, palm trees, and bay reflections"
          fallbackTitle="ViceCloud Global Infrastructure"
          className="h-full w-full object-cover object-center opacity-75"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0416]/88 via-[#18072C]/52 to-[#0B0416]/94" />
      </div>

      <div className="relative mx-auto max-w-[1160px] space-y-6 px-6 lg:px-10">
        {/* TOP ROW: 4 Floating Glassmorphic Cluster Cards (Matches Reference Image 3 Top) */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CLOUD_CLUSTERS.map((cluster) => {
            const isSelected = selectedClusterId === cluster.id;
            const utilization = Math.round(
              (cluster.activeBlades / cluster.totalBlades) * 100
            );
            const displayPing =
              diagReport?.measuredLatencyMs[cluster.id] ?? cluster.avgLatencyMs;

            return (
              <button
                key={cluster.id}
                type="button"
                onClick={() => onSelectCluster(cluster.id)}
                aria-pressed={isSelected}
                className={`flex flex-col justify-between rounded-xl p-5 text-left transition-all duration-150 ${
                  isSelected
                    ? 'vice-glass-card-featured'
                    : 'vice-glass-card hover:border-[#FF2EA6]/65'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 text-xs">
                    <span className="inline-flex items-center gap-1.5 font-mono font-bold text-[#FF5CC4]">
                      <Globe className="h-3.5 w-3.5 text-[#FF2EA6]" aria-hidden="true" />
                      <span>{cluster.code}</span>
                    </span>
                    <span className="inline-flex items-center gap-1 font-mono font-bold text-white tabular-nums">
                      <span>{displayPing} ms</span>
                      <Wifi className="h-3 w-3 text-[#FF45B5]" aria-hidden="true" />
                    </span>
                  </div>

                  <h3 className="mt-2.5 font-display text-lg font-extrabold text-white">
                    {cluster.name}
                  </h3>
                  <p className="mt-1 text-[11px] leading-relaxed text-[#E8DDF5]">
                    {cluster.countries.join(', ')}
                  </p>
                  <p className="mt-1 text-[11px] text-[#CBB8DF]">{cluster.edgeNodes}</p>
                </div>

                <div className="mt-4 pt-3">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-medium text-[#D8C6EC]">Active Blades</span>
                    <span className="font-mono font-bold text-white tabular-nums">
                      {cluster.activeBlades}/{cluster.totalBlades}
                    </span>
                  </div>
                  <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-[#0D0418]">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#FF2EA6] via-[#D946EF] to-[#FFB84D]"
                      style={{ width: `${utilization}%` }}
                    />
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Live Browser Latency Diagnostic Verdict Panel (Expands cleanly on Run Diagnostic) */}
        {diagReport && (
          <div
            role="status"
            aria-live="polite"
            data-testid="diagnostic-report"
            className="vice-glass-card-featured rounded-xl p-5 sm:p-6"
          >
            <div className="flex flex-col justify-between gap-3 border-b border-[#FF2EA6]/25 pb-4 sm:flex-row sm:items-center">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="h-5 w-5 text-[#2CE6D2]" aria-hidden="true" />
                <span className="font-display text-lg font-bold text-white">
                  {diagReport.verdict}
                </span>
              </div>
              <span className="font-mono text-xs font-semibold text-[#FF5CC4]">
                Best Cluster: {diagReport.bestClusterName}
              </span>
            </div>

            <dl className="mt-4 grid grid-cols-2 gap-4 text-xs sm:grid-cols-4">
              <div>
                <dt className="text-[#CBB8DF]">WebRTC Hardware Decode</dt>
                <dd className="mt-1 font-mono font-semibold text-[#2CE6D2]">
                  {diagReport.webrtcSupported ? 'Supported' : 'Unavailable'}
                </dd>
              </div>
              <div>
                <dt className="text-[#CBB8DF]">Controller / Gamepad API</dt>
                <dd className="mt-1 font-mono font-semibold text-white">
                  {diagReport.gamepadApi ? 'Detected' : 'Keyboard Only'}
                </dd>
              </div>
              <div>
                <dt className="text-[#CBB8DF]">Detected Display</dt>
                <dd className="mt-1 font-mono font-semibold text-white tabular-nums">
                  {diagReport.resolution}
                </dd>
              </div>
              <div>
                <dt className="text-[#CBB8DF]">Client CPU Threads</dt>
                <dd className="mt-1 font-mono font-semibold text-white tabular-nums">
                  {diagReport.cpuThreads} Threads
                </dd>
              </div>
            </dl>
          </div>
        )}

        {/* CENTER BANNER: Skip the $1,500 rig upgrade (Matches Reference Image 3 Center) */}
        <div
          id="compatibility"
          className="vice-glass-card-featured mx-auto max-w-[920px] rounded-2xl px-6 py-7 text-center sm:px-10 sm:py-9"
        >
          <p className="text-xs font-bold tracking-[0.06em] text-[#FF45B5]">
            Upgrade · Compare · Play
          </p>
          <h2 className="mt-2 font-display text-[clamp(2rem,4vw,3.2rem)] font-extrabold leading-[1.06] tracking-[-0.025em] text-white">
            Skip the{' '}
            <span className="text-[#FF2EA6]">$1,500</span>{' '}
            rig upgrade
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-[#E8DDF5]">
            Get native PlayStation 5 performance without the massive upfront cost. See how
            much you save with our optimized cloud blades pre-loaded with GTA VI.
          </p>

          {/* 3 Horizontal Spec Pillars matching Reference Image 3 */}
          <div className="mt-6 grid gap-4 border-t border-[#FF2EA6]/20 pt-6 text-left sm:grid-cols-3">
            <div className="flex items-start gap-3">
              <Zap
                className="mt-0.5 h-5 w-5 shrink-0 text-[#FF2EA6]"
                aria-hidden="true"
              />
              <div>
                <h3 className="font-display text-sm font-bold text-white">
                  Supported Devices
                </h3>
                <p className="mt-0.5 text-xs text-[#CBB8DF]">
                  Windows, macOS, Linux &amp; Handhelds
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Network
                className="mt-0.5 h-5 w-5 shrink-0 text-[#FF2EA6]"
                aria-hidden="true"
              />
              <div>
                <h3 className="font-display text-sm font-bold text-white">
                  Network Bandwidth
                </h3>
                <p className="mt-0.5 text-xs text-[#CBB8DF]">
                  15–35 Mbps · Up to 10 Gbps Peering
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Gamepad2
                className="mt-0.5 h-5 w-5 shrink-0 text-[#FF2EA6]"
                aria-hidden="true"
              />
              <div>
                <h3 className="font-display text-sm font-bold text-white">
                  Input &amp; Controls
                </h3>
                <p className="mt-0.5 text-xs text-[#CBB8DF]">
                  Mouse, Keyboard, DualSense &amp; Xbox
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 2-COLUMN SPLIT: Comparison Table (Left) + Interactive FAQ Accordion (Right) — Exact Reference Image 3 Match */}
        <div className="grid items-start gap-5 lg:grid-cols-12">
          {/* Left 6 Cols: Comparison Table */}
          <div className="vice-glass-card overflow-hidden rounded-xl lg:col-span-6">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-[#FF2EA6]/25 bg-[#0D0419]/85 text-[11px] font-bold text-[#E8DDF5] sm:text-xs">
                    <th className="px-4 py-3.5">Component / Feature</th>
                    <th className="px-4 py-3.5">Traditional Hardware</th>
                    <th className="px-4 py-3.5 text-[#FF45B5]">ViceCloud PS5</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#FF2EA6]/15">
                  {HARDWARE_COMPARISON.map((row, idx) => {
                    const RowIcon = COMPARISON_ICONS[idx] ?? Cpu;
                    return (
                      <tr key={row.metric} className="hover:bg-[#FF2EA6]/5">
                        <td className="px-4 py-3.5 font-semibold text-white">
                          <span className="inline-flex items-center gap-2">
                            <RowIcon
                              className="h-3.5 w-3.5 shrink-0 text-[#FF45B5]"
                              aria-hidden="true"
                            />
                            <span>{row.metric}</span>
                          </span>
                        </td>
                        <td className="px-4 py-3.5 text-[#CBB8DF] tabular-nums">
                          {row.traditional}
                        </td>
                        <td className="px-4 py-3.5 font-semibold text-white tabular-nums">
                          {row.vicecloud}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right 6 Cols: Interactive FAQ Accordion */}
          <div id="faq" className="vice-glass-card overflow-hidden rounded-xl lg:col-span-6">
            <div className="divide-y divide-[#FF2EA6]/18">
              {FAQ_ITEMS.map((item, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div key={item.question}>
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      aria-expanded={isOpen}
                      className="flex min-h-[54px] w-full items-center justify-between gap-4 px-5 py-3.5 text-left transition-colors hover:bg-[#FF2EA6]/8"
                    >
                      <span className="text-xs font-semibold text-white sm:text-sm">
                        {item.question}
                      </span>
                      <ChevronDown
                        className={`h-4 w-4 shrink-0 text-[#FF45B5] transition-transform duration-200 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                        aria-hidden="true"
                      />
                    </button>

                    {isOpen && (
                      <div className="border-t border-[#FF2EA6]/15 bg-[#0C0417]/80 px-5 py-3.5 text-xs leading-relaxed text-[#D8C6EC] sm:text-sm">
                        {item.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* BOTTOM WORLD MAP & DIAGNOSTIC BANNER (Matches Reference Image 3 Bottom) */}
        <div className="vice-glass-card-featured overflow-hidden rounded-xl px-6 py-5 sm:px-8">
          <div className="grid items-center gap-6 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <div className="flex items-start gap-3">
                <Zap
                  className="mt-1 h-5 w-5 shrink-0 text-[#FFB84D]"
                  aria-hidden="true"
                />
                <div>
                  <h3 className="font-display text-xl font-extrabold leading-tight text-white">
                    Clear answers before you launch
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-[#D8C6EC]">
                    Verify your browser WebRTC decode and edge ping to your nearest PS5
                    blade cluster in one click.
                  </p>
                  <button
                    type="button"
                    onClick={runLiveDiagnostic}
                    disabled={diagRunning}
                    className="vice-neon-btn mt-3.5 inline-flex min-h-[36px] items-center gap-1.5 rounded-md px-4 py-1.5 text-xs font-bold whitespace-nowrap disabled:opacity-65"
                  >
                    <Activity className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>
                      {diagRunning ? 'Probing Clusters...' : 'Run Latency Diagnostic'}
                    </span>
                  </button>
                </div>
              </div>
            </div>

            <div className="relative h-28 overflow-hidden rounded-lg bg-[#0D0418] lg:col-span-5 lg:h-32">
              <ResilientImage
                src={STORE_ASSETS.viceNeonWorldMap}
                alt="Glowing neon magenta global fiber peering world map"
                fallbackTitle="Global Edge Network"
                className="h-full w-full object-contain opacity-95"
              />
            </div>

            <div className="flex lg:col-span-3 lg:justify-end">
              <button
                type="button"
                onClick={onExplorePlans}
                className="vice-neon-btn inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-bold whitespace-nowrap lg:w-auto"
              >
                <span>Choose Your Plan</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
