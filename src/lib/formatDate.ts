/**
 * Smart Date Formatter
 *
 * Formats dates to match the Figma design:
 * - "Today" or "Yesterday" for very recent dates
 * - "February 2026" (full month) for dates in the current year
 * - "Dec 2025" (abbreviated month) for dates in previous years
 *
 * No external date library needed — just the built-in Date API.
 */

export function formatDate(dateString: string | null): string {
  if (!dateString) return "";

  const date = new Date(dateString);
  const now = new Date();

  // Calculate how many calendar days apart (ignoring time of day)
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const diffDays = Math.floor(
    (startOfToday.getTime() - startOfDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";

  // Same year → full month name + year (e.g., "February 2026")
  if (date.getFullYear() === now.getFullYear()) {
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  }

  // Different year → abbreviated month + year (e.g., "Dec 2025")
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}
