/**
 * Sanity CMS Helper
 *
 * This file handles all communication with Sanity's API.
 * It replaces the old notion.ts file.
 *
 * It exports the same function names (getPosts, getPostBySlug, etc.)
 * so the page components barely need to change — just the import line.
 *
 * GROQ is Sanity's query language. If you know CSS selectors, GROQ
 * is similar in spirit — you describe the shape of data you want,
 * and Sanity returns it.
 */

import { createClient } from "next-sanity";
import { createImageUrlBuilder } from "@sanity/image-url";
import { projectId, dataset, apiVersion } from "@/sanity/env";

// Type for post data (used by page components).
// tags, artTitle, artImage are new fields for the redesign.
type Post = {
  id: string;
  title: string;
  slug: string;
  date: string | null;
  tags: string[];
  artTitle: string | null;
  artImage: any | null;
};

// Create a Sanity client instance.
// useCdn: true means we read from Sanity's global CDN (fast, cached).
const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});

// Image URL builder — turns Sanity image references into actual CDN URLs.
// This is what makes images permanent (unlike Notion's expiring URLs).
const builder = createImageUrlBuilder({ projectId, dataset });

export function urlFor(source: any) {
  return builder.image(source);
}

/**
 * Fetches all published blog posts, sorted newest first.
 *
 * GROQ breakdown:
 *   *                          = "get everything"
 *   [_type == "post"]          = "where the type is post"
 *   [published == true]        = "and published is true"
 *   | order(publishedAt desc)  = "sort newest first"
 *   { ... }                    = "return only these fields"
 *   "slug": slug.current       = "extract slug string from slug object"
 */
export async function getPosts(): Promise<Post[]> {
  const query = `*[_type == "post" && published == true] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    "date": publishedAt,
    tags,
    artTitle,
    artImage
  }`;

  const posts = await client.fetch(query);

  return posts.map((post: any) => ({
    id: post._id,
    title: post.title,
    slug: post.slug,
    date: post.date,
    tags: post.tags || [],
    artTitle: post.artTitle || null,
    artImage: post.artImage || null,
  }));
}

/**
 * Fetches a single blog post by its slug.
 * Returns the post metadata and its body content (Portable Text).
 *
 * GROQ breakdown:
 *   [slug.current == $slug]  = "where slug matches the parameter"
 *   [0]                       = "get the first (only) result"
 *   body[]{ ... }             = "expand body blocks with image details"
 */
export async function getPostBySlug(slug: string) {
  const query = `*[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    "date": publishedAt,
    tags,
    artTitle,
    artImage {
      ...,
      "url": asset->url,
      "dimensions": asset->metadata.dimensions
    },
    body[] {
      ...,
      _type == "image" => {
        ...,
        "url": asset->url,
        "dimensions": asset->metadata.dimensions
      }
    }
  }`;

  const post = await client.fetch(query, { slug });

  if (!post) return null;

  return {
    id: post._id,
    title: post.title,
    slug: post.slug,
    date: post.date,
    tags: post.tags || [],
    artTitle: post.artTitle || null,
    artImage: post.artImage || null,
    content: post.body,
  };
}

/**
 * Gets all slugs for static generation.
 * This tells Next.js what URLs to pre-build.
 */
export async function getAllPostSlugs() {
  const query = `*[_type == "post" && published == true] {
    "slug": slug.current
  }`;

  return client.fetch(query);
}
