/**
 * Sanity Studio Configuration
 *
 * This configures the Sanity Studio editor that's embedded
 * in our Next.js app at the /studio route. It tells Sanity
 * which project to connect to and what content types we use.
 */

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { codeInput } from "@sanity/code-input";
import { schemaTypes } from "./src/sanity/schemaTypes";

export default defineConfig({
  name: "spellbook",
  title: "Spellbook Blog",

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,

  plugins: [
    structureTool(), // The main content editing interface
    visionTool(), // GROQ query playground (for debugging queries)
    codeInput(), // Adds code block support in the editor
  ],

  schema: {
    types: schemaTypes,
  },
});
