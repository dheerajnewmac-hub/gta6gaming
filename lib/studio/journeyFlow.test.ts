import test from 'node:test';
import assert from 'node:assert/strict';
import {
  formatStepCounter,
  getCompletionPercent,
  getNextStepIndex,
  getPrevStepIndex,
} from './journeyFlow';

test('getNextStepIndex advances sequentially and wraps around', () => {
  assert.equal(getNextStepIndex(0, 4), 1);
  assert.equal(getNextStepIndex(2, 4), 3);
  assert.equal(getNextStepIndex(3, 4), 0);
});

test('getPrevStepIndex steps backward and wraps from 0 to last step', () => {
  assert.equal(getPrevStepIndex(3, 4), 2);
  assert.equal(getPrevStepIndex(0, 4), 3);
});

test('formatStepCounter pads single-digit indices cleanly', () => {
  assert.equal(formatStepCounter(0, 4), '01 / 04');
  assert.equal(formatStepCounter(3, 4), '04 / 04');
  assert.equal(formatStepCounter(99, 4), '04 / 04');
});

test('getCompletionPercent returns accurate stage completion percentages', () => {
  assert.equal(getCompletionPercent(0, 4), 25);
  assert.equal(getCompletionPercent(1, 4), 50);
  assert.equal(getCompletionPercent(2, 4), 75);
  assert.equal(getCompletionPercent(3, 4), 100);
});
