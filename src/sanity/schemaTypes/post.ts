/**
 * Post Schema
 *
 * Defines what a "blog post" looks like in Sanity.
 * This is the equivalent of your old Notion database columns.
 *
 * Each defineField() is like adding a column to a spreadsheet:
 * - title: the post headline
 * - slug: the URL-friendly version (e.g., "my-first-post")
 * - publishedAt: when the post was published
 * - published: whether it should appear on the site
 * - body: the actual content (Portable Text = Sanity's rich text format)
 */

import { defineField, defineType } from "sanity";

export default defineType({
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        // Auto-generates a slug from the title (e.g., "Hello World" → "hello-world")
        source: "title",
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
    }),
    defineField({
      name: "published",
      title: "Published",
      type: "boolean",
      initialValue: false,
    }),
    // Hover Image — a thumbnail that appears when hovering this post on the homepage.
    // Upload any image you want visitors to see as a preview.
    defineField({
      name: "hoverImage",
      title: "Hover Image",
      type: "image",
      options: { hotspot: true },
      description: "Thumbnail shown when hovering this post on the homepage",
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alt text",
        },
      ],
    }),

    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [
        {
          // "block" = Portable Text (Sanity's rich text).
          // Supports headings, lists, bold, italic, links, etc. by default.
          type: "block",
        },
        {
          // Images with optional caption and alt text
          type: "image",
          options: { hotspot: true }, // Allows smart cropping in the editor
          fields: [
            {
              name: "caption",
              type: "string",
              title: "Caption",
            },
            {
              name: "alt",
              type: "string",
              title: "Alt text",
            },
          ],
        },
        {
          // Code blocks with syntax highlighting and language selection
          // (powered by @sanity/code-input plugin)
          type: "code",
          title: "Code Block",
        },
      ],
    }),
  ],
  // Show posts sorted by date in the Studio sidebar
  orderings: [
    {
      title: "Published Date, New",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  // Preview: what you see in the Studio's post list
  preview: {
    select: { title: "title", date: "publishedAt" },
    prepare({ title, date }) {
      return {
        title,
        subtitle: date ? new Date(date).toLocaleDateString() : "No date",
      };
    },
  },
});
