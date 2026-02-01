/**
 * Individual Post Page
 *
 * This page displays a single blog post.
 * The URL looks like: yourdomain.com/my-first-post
 *
 * The [slug] folder name means this is a "dynamic route" -
 * Next.js will match any URL like /anything and pass
 * "anything" to us as params.slug
 */

import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, getAllPostSlugs } from "@/lib/notion";
import NotionBlocks from "@/components/NotionBlocks";

// Re-fetch data every 60 seconds for fresh content
export const revalidate = 60;

// Tell Next.js what pages to pre-build at compile time
// This makes the pages load faster
export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs;
}

// The page component
// params.slug contains the URL segment (e.g., "my-first-post")
export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Fetch the post from Notion
  const post = await getPostBySlug(slug);

  // If no post found, show 404 page
  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Header with back link */}
      <header className="border-b border-gray-100">
        <div className="max-w-2xl mx-auto px-6 py-4">
          <Link
            href="/"
            className="text-gray-500 hover:text-gray-900 text-sm"
          >
            ← Back to all posts
          </Link>
        </div>
      </header>

      {/* Post content */}
      <article className="max-w-2xl mx-auto px-6 py-12">
        {/* Post date */}
        {post.date && (
          <time className="text-sm text-gray-500">
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        )}

        {/* Post title */}
        <h1 className="text-4xl font-bold text-gray-900 mt-2 mb-8">
          {post.title}
        </h1>

        {/* Post body - rendered from Notion blocks */}
        <NotionBlocks blocks={post.content} />
      </article>
    </main>
  );
}
