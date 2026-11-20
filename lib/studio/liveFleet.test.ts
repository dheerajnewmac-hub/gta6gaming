import test from 'node:test';
import assert from 'node:assert/strict';
import {
  MIN_LIVE_PS5,
  MAX_LIVE_PS5,
  MIN_UPDATE_INTERVAL_MS,
  MAX_UPDATE_INTERVAL_MS,
  TOTAL_PS5_BLADES,
  computeInitialLivePs5Count,
  pickNextFleetIntervalMs,
  getNextLivePs5Count,
  resolvePersistedFleetState,
  getFleetSnapshot,
} from './liveFleet.ts';

test('computeInitialLivePs5Count stays strictly inside 567..683 bounds', () => {
  assert.equal(computeInitialLivePs5Count(() => 0), MIN_LIVE_PS5);
  assert.equal(computeInitialLivePs5Count(() => 0.9999), MAX_LIVE_PS5);
  const mid = computeInitialLivePs5Count(() => 0.5);
  assert.ok(mid >= MIN_LIVE_PS5 && mid <= MAX_LIVE_PS5);
});

test('pickNextFleetIntervalMs stays strictly inside 10 to 15 minutes', () => {
  assert.equal(pickNextFleetIntervalMs(() => 0), MIN_UPDATE_INTERVAL_MS);
  assert.equal(pickNextFleetIntervalMs(() => 0.999999), MAX_UPDATE_INTERVAL_MS);
  const mid = pickNextFleetIntervalMs(() => 0.4);
  assert.ok(mid >= MIN_UPDATE_INTERVAL_MS && mid <= MAX_UPDATE_INTERVAL_MS);
});

test('getNextLivePs5Count fluctuates organically up and down within 567..683', () => {
  const lowerEdge = getNextLivePs5Count(MIN_LIVE_PS5, () => 0.25);
  assert.ok(lowerEdge > MIN_LIVE_PS5 && lowerEdge <= MAX_LIVE_PS5);

  const upperEdge = getNextLivePs5Count(MAX_LIVE_PS5, () => 0.25);
  assert.ok(upperEdge < MAX_LIVE_PS5 && upperEdge >= MIN_LIVE_PS5);

  const down = getNextLivePs5Count(625, () => 0.2);
  assert.ok(down < 625 && down >= MIN_LIVE_PS5);

  const up = getNextLivePs5Count(625, () => 0.8);
  assert.ok(up > 625 && up <= MAX_LIVE_PS5);
});

test('resolvePersistedFleetState preserves count before 10-15 min expiry and steps after expiry', () => {
  const now = 1_700_000_000_000;
  const fresh = resolvePersistedFleetState(now, null, () => 0.5);
  assert.ok(fresh.activePlayers >= MIN_LIVE_PS5 && fresh.activePlayers <= MAX_LIVE_PS5);
  assert.ok(fresh.nextUpdateAt - now >= MIN_UPDATE_INTERVAL_MS);
  assert.ok(fresh.nextUpdateAt - now <= MAX_UPDATE_INTERVAL_MS);

  const withinWindow = resolvePersistedFleetState(
    now + 3 * 60 * 1000,
    JSON.stringify(fresh),
    () => 0.1,
  );
  assert.equal(withinWindow.activePlayers, fresh.activePlayers);
  assert.equal(withinWindow.nextUpdateAt, fresh.nextUpdateAt);

  const afterWindow = resolvePersistedFleetState(
    fresh.nextUpdateAt + 1000,
    JSON.stringify(fresh),
    () => 0.85,
  );
  assert.notEqual(afterWindow.activePlayers, fresh.activePlayers);
  assert.ok(
    afterWindow.activePlayers >= MIN_LIVE_PS5 &&
      afterWindow.activePlayers <= MAX_LIVE_PS5,
  );
});

test('getFleetSnapshot computes open blades and occupancy percentage accurately', () => {
  const snap = getFleetSnapshot(624, TOTAL_PS5_BLADES);
  assert.equal(snap.activePlayers, 624);
  assert.equal(snap.availableBlades, 376);
  assert.equal(snap.totalBlades, 1000);
  assert.equal(snap.occupancyPercent, 62);
});
