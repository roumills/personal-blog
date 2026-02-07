/**
 * PortableText Component
 *
 * This component takes Sanity's "Portable Text" format and renders
 * it as styled HTML. It replaces the old NotionBlocks component.
 *
 * Portable Text is Sanity's way of storing rich content — similar
 * to Notion's blocks but more standardized. The @portabletext/react
 * library handles the parsing; we just define the styling.
 *
 * All Tailwind classes here match the old NotionBlocks exactly,
 * so the visual output stays identical.
 */

"use client";

import { PortableText as SanityPortableText } from "@portabletext/react";
import type { PortableTextComponents } from "@portabletext/react";
import { urlFor } from "@/lib/sanity";

/**
 * Custom components define how each Portable Text element renders.
 * The keys match Sanity's block types. The values are React components.
 */
const components: PortableTextComponents = {
  // Block-level elements (paragraphs, headings, blockquotes)
  block: {
    normal: ({ children }) => <p className="mb-4">{children}</p>,
    h1: ({ children }) => (
      <h1 className="text-3xl font-bold mt-8 mb-4">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-bold mt-6 mb-3">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-bold mt-4 mb-2">{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-stone-400 pl-4 italic my-4">
        {children}
      </blockquote>
    ),
  },

  // List containers (wrapping <ul> or <ol>)
  // Portable Text properly groups list items, unlike Notion where
  // each item was standalone — so we get correct HTML structure.
  list: {
    bullet: ({ children }) => <ul className="ml-4 list-disc">{children}</ul>,
    number: ({ children }) => (
      <ol className="ml-4 list-decimal">{children}</ol>
    ),
  },

  // Individual list items
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },

  // Inline text formatting (bold, italic, code, links)
  marks: {
    strong: ({ children }) => <strong>{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    code: ({ children }) => (
      <code className="bg-stone-200 text-stone-800 px-1.5 py-0.5 rounded text-sm">{children}</code>
    ),
    link: ({ children, value }) => (
      <a
        href={value?.href}
        className="text-stone-600 hover:text-stone-900 underline transition-colors"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
  },

  // Custom block types (images, code blocks)
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;

      // urlFor() builds a permanent CDN URL with automatic format
      // optimization (WebP where supported). No more expiring URLs!
      const imageUrl = urlFor(value).width(800).auto("format").url();

      return (
        <figure className="my-6">
          <img
            src={imageUrl}
            alt={value.alt || value.caption || ""}
            className="rounded-lg max-w-full h-auto"
          />
          {value.caption && (
            <figcaption className="text-center text-sm text-stone-500 mt-2">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
    code: ({ value }) => (
      <pre className="bg-stone-800 text-stone-100 p-4 rounded-lg overflow-x-auto my-4">
        <code>{value.code}</code>
      </pre>
    ),
  },
};

// Props type — same pattern as the old NotionBlocks
type Props = {
  content: any[];
};

export default function PortableTextRenderer({ content }: Props) {
  if (!content) return null;

  return (
    <div className="prose prose-lg max-w-none">
      <SanityPortableText value={content} components={components} />
    </div>
  );
}
