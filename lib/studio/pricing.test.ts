import test from 'node:test';
import assert from 'node:assert/strict';
import {
  applyFirstTimeDiscount,
  applyPromoCode,
  calculateCustomPassQuote,
  FIRST_TIME_DISCOUNT_PERCENT,
  generateBladeAssignment,
  getFirstTimeAnchorPricing,
  MIN_PASS_PRICE,
  validateCheckoutForm,
} from './pricing';

test('calculateCustomPassQuote applies volume discounts, quality tiers, and $4.99 minimum floor', () => {
  assert.equal(MIN_PASS_PRICE, 4.99);

  const quick1080 = calculateCustomPassQuote(2, 7, '1080p');
  assert.equal(quick1080.hours, 2);
  assert.equal(quick1080.effectiveRatePerHour, 2.5);
  assert.equal(quick1080.subtotal, 5);
  assert.ok(quick1080.subtotal >= MIN_PASS_PRICE);
  assert.equal(quick1080.savingsPercent, 0);

  const mid1080 = calculateCustomPassQuote(8, 15, '1080p');
  assert.equal(mid1080.hours, 8);
  assert.equal(mid1080.effectiveRatePerHour, 1.58);
  assert.equal(mid1080.subtotal, 12.64);
  assert.equal(mid1080.savingsPercent, 37);

  const ultra4k = calculateCustomPassQuote(20, 30, '4k');
  assert.equal(ultra4k.quality, '4k');
  assert.ok(ultra4k.effectiveRatePerHour < ultra4k.baseRatePerHour);
  assert.ok(ultra4k.subtotal > 30);
  assert.ok(ultra4k.savingsPercent >= 35);
});

test('calculateCustomPassQuote clamps out-of-range inputs safely', () => {
  const low = calculateCustomPassQuote(-5, 1, '1080p');
  assert.equal(low.hours, 2);
  assert.equal(low.validityDays, 7);
  assert.ok(low.subtotal >= MIN_PASS_PRICE);

  const high = calculateCustomPassQuote(200, 180, '4k');
  assert.equal(high.hours, 80);
  assert.equal(high.validityDays, 60);
});

test('getFirstTimeAnchorPricing preserves exact selling price and computes higher 25% display anchor', () => {
  const quick = getFirstTimeAnchorPricing(4.99);
  assert.equal(quick.finalPrice, 4.99);
  assert.equal(quick.anchorPrice, 6.65);
  assert.equal(quick.savingsAmount, 1.66);

  const campaign = getFirstTimeAnchorPricing(11.99);
  assert.equal(campaign.finalPrice, 11.99);
  assert.equal(campaign.anchorPrice, 15.99);
  assert.equal(campaign.savingsAmount, 4);

  const custom = getFirstTimeAnchorPricing(14.56);
  assert.equal(custom.finalPrice, 14.56);
  assert.equal(custom.anchorPrice, 19.41);
  assert.equal(custom.savingsAmount, 4.85);
});

test('applyFirstTimeDiscount computes penny-exact 25% first-order savings and clamps invalid inputs', () => {
  assert.equal(FIRST_TIME_DISCOUNT_PERCENT, 25);

  const quick = applyFirstTimeDiscount(1.99);
  assert.equal(quick.originalPrice, 1.99);
  assert.equal(quick.discountAmount, 0.5);
  assert.equal(quick.discountedPrice, 1.49);

  const campaign = applyFirstTimeDiscount(8.99);
  assert.equal(campaign.discountAmount, 2.25);
  assert.equal(campaign.discountedPrice, 6.74);

  const custom = applyFirstTimeDiscount(10.8);
  assert.equal(custom.discountAmount, 2.7);
  assert.equal(custom.discountedPrice, 8.1);

  const clamped = applyFirstTimeDiscount(-10, 120);
  assert.equal(clamped.originalPrice, 0);
  assert.equal(clamped.discountPercent, 90);
  assert.equal(clamped.discountedPrice, 0);
});

test('applyPromoCode validates known codes and rejects unknown codes', () => {
  const valid = applyPromoCode(14.99, ' vice10 ');
  assert.equal(valid.valid, true);
  assert.equal(valid.discountPercent, 10);
  assert.equal(valid.discountAmount, 1.5);
  assert.equal(valid.finalTotal, 13.49);

  const invalid = applyPromoCode(14.99, 'FAKECODE');
  assert.equal(invalid.valid, false);
  assert.equal(invalid.discountAmount, 0);
  assert.equal(invalid.finalTotal, 14.99);
});

test('validateCheckoutForm rejects empty and malformed inputs', () => {
  const empty = validateCheckoutForm('', '');
  assert.equal(empty.isValid, false);
  assert.ok(empty.errors.email);
  assert.ok(empty.errors.gamerTag);

  const badEmail = validateCheckoutForm('not-an-email', 'Lucia_VC');
  assert.equal(badEmail.isValid, false);
  assert.ok(badEmail.errors.email);
  assert.equal(badEmail.errors.gamerTag, undefined);

  const badTag = validateCheckoutForm('player@vicecloud.gg', 'a!');
  assert.equal(badTag.isValid, false);
  assert.equal(badTag.errors.email, undefined);
  assert.ok(badTag.errors.gamerTag);

  const ok = validateCheckoutForm('jason@leonida.io', 'Jason_VC6');
  assert.equal(ok.isValid, true);
  assert.deepEqual(ok.errors, {});
});

test('generateBladeAssignment returns deterministic formatted identifiers', () => {
  const a = generateBladeAssignment('us-east', 'Lucia_06');
  const b = generateBladeAssignment('us-east', 'Lucia_06');
  assert.deepEqual(a, b);
  assert.match(a.orderId, /^VC-\d+$/);
  assert.match(a.bladeId, /^PS5-US--\d+|^PS5-USE-\d+|^PS5-[A-Z-]{3}-\d+$/);
  assert.ok(a.sessionUrl.startsWith('https://play.vicecloud.gg/stream/session-'));
});
