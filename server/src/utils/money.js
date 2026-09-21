/** Round to 2 decimal places (paise), avoiding 1.005 -> 1.00 float surprises. */
export const round2 = (value) => Math.round((Number(value) + Number.EPSILON) * 100) / 100;

/** Format ₹ crore as the "12.5 Lakh Cr" style the frontend displays. */
export function formatMarketCap(crore) {
  if (crore == null) return null;
  if (crore >= 100000) return `${round2(crore / 100000)} Lakh Cr`;
  return `${round2(crore)} Cr`;
}

/** Format a dividend yield (percent) as "1.25%". */
export const formatDividend = (pct) => (pct == null ? null : `${Number(pct).toFixed(2)}%`);
