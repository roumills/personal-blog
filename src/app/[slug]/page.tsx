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
import AsciiLogo from "@/components/AsciiLogo";

// Fetch fresh data on every request (no caching)
// This ensures Notion image URLs are always valid
export const dynamic = "force-dynamic";

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
    <main className="min-h-screen bg-black">
      {/* Header with ASCII logo (links back to home) */}
      <header className="px-4">
        <div className="max-w-3xl mx-auto">
          <Link href="/" className="block [&_pre]:hover:text-white [&_pre]:transition-colors">
            <AsciiLogo />
          </Link>
        </div>
      </header>

      {/* Post content */}
      <article className="max-w-3xl mx-auto px-4 pb-16">
        {/* Post date */}
        {post.date && (
          <time className="text-sm text-gray-600 uppercase tracking-wide">
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </time>
        )}

        {/* Post title */}
        <h1 className="text-2xl text-white mt-2 mb-8">
          {post.title}
        </h1>

        {/* Post body - rendered from Notion blocks */}
        <NotionBlocks blocks={post.content} />
      </article>
    </main>
  );
}
