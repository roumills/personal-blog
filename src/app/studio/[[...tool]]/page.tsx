/**
 * Sanity Studio Page
 *
 * This embeds the Sanity content editor inside our Next.js app.
 * Visit /studio to write and manage blog posts.
 *
 * The [[...tool]] folder name is a "catch-all route" — it means
 * this single page handles /studio, /studio/structure, /studio/vision, etc.
 * Sanity Studio uses its own client-side routing, so we catch all
 * sub-paths and hand them to the Studio component.
 */

"use client";

import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
