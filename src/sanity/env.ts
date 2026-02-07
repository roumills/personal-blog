/**
 * Sanity Environment Config
 *
 * Centralizes Sanity settings so they're defined in one place.
 * Other files import from here instead of reading process.env directly.
 */

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;

// Sanity uses date-based API versions (not numbers like v1, v2).
// This "locks" your app to the API behavior as of this date,
// so Sanity can add features without breaking your code.
export const apiVersion = "2024-01-01";
