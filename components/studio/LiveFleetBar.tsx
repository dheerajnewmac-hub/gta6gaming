"use client";

import { useEffect, useState } from 'react';
import { Gamepad2 } from 'lucide-react';
import {
  LIVE_FLEET_STORAGE_KEY,
  TOTAL_PS5_BLADES,
  getFleetSnapshot,
  getNextLivePs5Count,
  pickNextFleetIntervalMs,
  resolvePersistedFleetState,
  type PersistedFleetState,
} from '@/lib/studio/liveFleet';

function readStoredFleet(): string | null {
  try {
    return window.localStorage.getItem(LIVE_FLEET_STORAGE_KEY);
  } catch {
    return null;
  }
}

function writeStoredFleet(state: PersistedFleetState): void {
  try {
    window.localStorage.setItem(LIVE_FLEET_STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Ignore storage quota or private-mode restrictions.
  }
}

export function LiveFleetBar() {
  const [fleetState, setFleetState] = useState<PersistedFleetState>(() =>
    resolvePersistedFleetState(Date.now(), readStoredFleet()),
  );

  useEffect(() => {
    writeStoredFleet(fleetState);
    const delayMs = Math.max(1000, fleetState.nextUpdateAt - Date.now());

    const timer = window.setTimeout(() => {
      const now = Date.now();
      setFleetState((prev) => ({
        activePlayers: getNextLivePs5Count(prev.activePlayers),
        lastUpdatedAt: now,
        nextUpdateAt: now + pickNextFleetIntervalMs(),
      }));
    }, delayMs);

    return () => window.clearTimeout(timer);
  }, [fleetState]);

  const snapshot = getFleetSnapshot(fleetState.activePlayers, TOTAL_PS5_BLADES);

  return (
    <div
      role="region"
      aria-label="Live PlayStation 5 Cloud Fleet Status"
      className="relative z-40 border-b border-[#FF2EA6]/20 bg-[#080213]"
    >
      <div className="mx-auto max-w-[1280px] px-3 py-2 sm:px-6 lg:px-10">
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1.5 rounded-lg border border-[#FF2EA6]/35 bg-[linear-gradient(90deg,rgba(25,9,46,0.96)_0%,rgba(44,12,68,0.94)_52%,rgba(22,8,40,0.96)_100%)] px-3 py-1.5 shadow-[0_0_20px_rgba(255,46,166,0.14)] sm:px-4 sm:py-2">
          {/* Left: Live Telemetry Signal + Active PS5 Count */}
          <div className="flex min-w-0 items-center gap-2 sm:gap-2.5">
            <span className="relative flex h-2.5 w-2.5 shrink-0" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#3EF3B3] opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#3EF3B3]" />
            </span>

            <Gamepad2
              className="hidden h-4 w-4 shrink-0 text-[#FF45B5] sm:block"
              aria-hidden="true"
            />

            <p className="text-[11px] font-medium leading-tight text-[#EADCF8] sm:text-xs">
              <span className="font-mono font-extrabold text-white tabular-nums">
                {snapshot.activePlayers}
              </span>
              <span className="font-mono text-[#B79FD0] tabular-nums">
                {' '}
                / {snapshot.totalBlades.toLocaleString()} PS5s
              </span>{' '}
              <span className="font-semibold text-[#FF5CC4]">Live Playing GTA VI</span>
            </p>
          </div>

          {/* Right: Visual Utilization Meter + Open Blades Count */}
          <div className="flex w-full items-center justify-between gap-3 sm:w-auto sm:justify-end">
            <div
              className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#24103E] sm:w-28 sm:flex-none lg:w-36"
              aria-hidden="true"
            >
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#FF2EA6] via-[#FF6B8B] to-[#FFD166] transition-transform duration-500 ease-out"
                style={{
                  transform: `scaleX(${snapshot.occupancyPercent / 100})`,
                  transformOrigin: 'left center',
                }}
              />
            </div>

            <div className="flex shrink-0 items-center gap-1.5 text-[11px] text-[#CBB8DF] sm:text-xs">
              <span className="font-mono font-bold text-[#3EF3B3] tabular-nums">
                {snapshot.availableBlades}
              </span>
              <span className="whitespace-nowrap">Blades Open</span>
              <span
                aria-hidden="true"
                className="hidden text-[#836AA1] lg:inline"
              >
                ·
              </span>
              <span className="hidden text-[11px] text-[#A992C4] whitespace-nowrap lg:inline">
                Instant Launch Ready
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
