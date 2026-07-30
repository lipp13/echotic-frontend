/**
 * Combines multiple Tailwind CSS classes dynamically, filtering out falsy values.
 */
export function cn(...inputs) {
  return inputs.filter(Boolean).join(" ");
}

/**
 * Formats a number as IDR (Indonesian Rupiah) currency.
 * E.g. 1500000 => "Rp 1.500.000"
 */
export function formatPrice(price) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

/**
 * Formats a date string to a human-readable format.
 * E.g. "2026-08-25" => "Tuesday, 25 Aug 2026"
 */
export function formatDate(dateStr) {
  const options = { weekday: "long", year: "numeric", month: "short", day: "numeric" };
  return new Date(dateStr).toLocaleDateString("id-ID", options);
}
