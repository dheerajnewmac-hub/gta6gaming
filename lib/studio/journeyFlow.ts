export const AUTOPLAY_DURATION_MS = 5500;

export function getNextStepIndex(currentIndex: number, totalSteps: number): number {
  if (totalSteps <= 0) return 0;
  const normalized = ((currentIndex % totalSteps) + totalSteps) % totalSteps;
  return (normalized + 1) % totalSteps;
}

export function getPrevStepIndex(currentIndex: number, totalSteps: number): number {
  if (totalSteps <= 0) return 0;
  const normalized = ((currentIndex % totalSteps) + totalSteps) % totalSteps;
  return (normalized - 1 + totalSteps) % totalSteps;
}

export function formatStepCounter(index: number, totalSteps: number): string {
  const safeTotal = Math.max(1, totalSteps);
  const safeCurrent = Math.min(safeTotal, Math.max(1, index + 1));
  return `${String(safeCurrent).padStart(2, '0')} / ${String(safeTotal).padStart(2, '0')}`;
}

export function getCompletionPercent(index: number, totalSteps: number): number {
  if (totalSteps <= 0) return 0;
  const clamped = Math.min(totalSteps - 1, Math.max(0, index));
  return Math.round(((clamped + 1) / totalSteps) * 100);
}
