import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildPurchaseEvent,
  getNextPurchaseIndex,
  getPurchaseTemplateCount,
  pickRandomTimeAgo,
  TIME_AGO_LABELS,
} from './purchaseFeed';

test('buildPurchaseEvent starts with Jack 53h GTA VI plan and real calculated price', () => {
  const jack = buildPurchaseEvent(0, 0);
  assert.equal(jack.buyerName, 'Jack');
  assert.equal(jack.planName, '53h GTA VI Custom Pass');
  assert.ok(jack.price > 40);
  assert.equal(jack.timeAgo, 'Just now');
});

test('pickRandomTimeAgo clamps bounds and returns valid short timestamp labels', () => {
  assert.equal(pickRandomTimeAgo(-1), TIME_AGO_LABELS[0]);
  assert.equal(pickRandomTimeAgo(0.99999), TIME_AGO_LABELS[TIME_AGO_LABELS.length - 1]);
  assert.ok(TIME_AGO_LABELS.includes(pickRandomTimeAgo(0.5) as (typeof TIME_AGO_LABELS)[number]));
});

test('getNextPurchaseIndex never repeats the immediately preceding buyer', () => {
  const total = getPurchaseTemplateCount();
  assert.ok(total >= 5);
  for (let i = 0; i < total; i += 1) {
    const nextLow = getNextPurchaseIndex(i, 0);
    const nextHigh = getNextPurchaseIndex(i, 0.99);
    assert.notEqual(nextLow, i);
    assert.notEqual(nextHigh, i);
  }
});
