export const TOTAL_PS5_BLADES = 1000;
export const MIN_LIVE_PS5 = 567;
export const MAX_LIVE_PS5 = 683;
export const MIN_UPDATE_INTERVAL_MS = 10 * 60 * 1000; // 10 minutes
export const MAX_UPDATE_INTERVAL_MS = 15 * 60 * 1000; // 15 minutes
export const LIVE_FLEET_STORAGE_KEY = 'vicecloud_live_ps5_fleet_v1';

export interface PersistedFleetState {
  activePlayers: number;
  lastUpdatedAt: number;
  nextUpdateAt: number;
}

export interface FleetSnapshot {
  activePlayers: number;
  availableBlades: number;
  totalBlades: number;
  occupancyPercent: number;
}

function clampUnit(value: number): number {
  if (!Number.isFinite(value)) return 0.5;
  return Math.min(0.999999, Math.max(0, value));
}

export function clampLivePs5Count(count: number): number {
  if (!Number.isFinite(count)) return Math.round((MIN_LIVE_PS5 + MAX_LIVE_PS5) / 2);
  return Math.min(MAX_LIVE_PS5, Math.max(MIN_LIVE_PS5, Math.round(count)));
}

/**
 * Picks a random update cadence strictly between 10 and 15 minutes (600,000–900,000 ms).
 */
export function pickNextFleetIntervalMs(rng: () => number = Math.random): number {
  const unit = clampUnit(rng());
  const span = MAX_UPDATE_INTERVAL_MS - MIN_UPDATE_INTERVAL_MS;
  return Math.round(MIN_UPDATE_INTERVAL_MS + unit * span);
}

/**
 * Computes an initial live PS5 player count strictly within [567, 683].
 */
export function computeInitialLivePs5Count(rng: () => number = Math.random): number {
  const unit = clampUnit(rng());
  const span = MAX_LIVE_PS5 - MIN_LIVE_PS5 + 1;
  return clampLivePs5Count(MIN_LIVE_PS5 + Math.floor(unit * span));
}

/**
 * Steps the live PS5 player count up or down organically by 7–24 players,
 * staying strictly inside [567, 683] and always changing from the current count.
 */
export function getNextLivePs5Count(
  currentCount: number,
  rng: () => number = Math.random,
): number {
  const safeCurrent = clampLivePs5Count(currentCount);
  const magnitude = 7 + Math.floor(clampUnit(rng()) * 18); // 7..24 players

  let direction: 1 | -1;
  if (safeCurrent <= MIN_LIVE_PS5 + 12) {
    direction = 1;
  } else if (safeCurrent >= MAX_LIVE_PS5 - 12) {
    direction = -1;
  } else {
    direction = clampUnit(rng()) < 0.5 ? -1 : 1;
  }

  let candidate = clampLivePs5Count(safeCurrent + direction * magnitude);
  if (candidate === safeCurrent) {
    candidate = safeCurrent + (safeCurrent < MAX_LIVE_PS5 ? 1 : -1);
  }
  return candidate;
}

/**
 * Resolves persisted state so refreshing the page does not randomly jump numbers
 * before the 10–15 minute window elapses.
 */
export function resolvePersistedFleetState(
  nowMs: number,
  storedRaw: string | null,
  rng: () => number = Math.random,
): PersistedFleetState {
  if (storedRaw) {
    try {
      const parsed = JSON.parse(storedRaw) as Partial<PersistedFleetState>;
      const validActive =
        typeof parsed.activePlayers === 'number' &&
        Number.isFinite(parsed.activePlayers) &&
        parsed.activePlayers >= MIN_LIVE_PS5 &&
        parsed.activePlayers <= MAX_LIVE_PS5;
      const validNext =
        typeof parsed.nextUpdateAt === 'number' && Number.isFinite(parsed.nextUpdateAt);
      const validLast =
        typeof parsed.lastUpdatedAt === 'number' && Number.isFinite(parsed.lastUpdatedAt);

      if (validActive && validNext && validLast) {
        const active = clampLivePs5Count(parsed.activePlayers!);
        const maxFuture = nowMs + MAX_UPDATE_INTERVAL_MS;
        if (parsed.nextUpdateAt! > nowMs && parsed.nextUpdateAt! <= maxFuture) {
          return {
            activePlayers: active,
            lastUpdatedAt: parsed.lastUpdatedAt!,
            nextUpdateAt: parsed.nextUpdateAt!,
          };
        }

        const stepped = getNextLivePs5Count(active, rng);
        return {
          activePlayers: stepped,
          lastUpdatedAt: nowMs,
          nextUpdateAt: nowMs + pickNextFleetIntervalMs(rng),
        };
      }
    } catch {
      // Ignore malformed storage and fall through to fresh initialization.
    }
  }

  return {
    activePlayers: computeInitialLivePs5Count(rng),
    lastUpdatedAt: nowMs,
    nextUpdateAt: nowMs + pickNextFleetIntervalMs(rng),
  };
}

export function getFleetSnapshot(
  activePlayers: number,
  totalBlades: number = TOTAL_PS5_BLADES,
): FleetSnapshot {
  const safeTotal = Math.max(1, Math.round(totalBlades));
  const safeActive = Math.min(safeTotal, clampLivePs5Count(activePlayers));
  const availableBlades = Math.max(0, safeTotal - safeActive);
  const occupancyPercent = Math.round((safeActive / safeTotal) * 100);

  return {
    activePlayers: safeActive,
    availableBlades,
    totalBlades: safeTotal,
    occupancyPercent,
  };
}
