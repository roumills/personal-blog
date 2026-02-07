/**
 * Individual Post Page
 *
 * Displays a single blog post at /{slug}.
 * Matches the light beige theme with the hero illustration
 * at the top (linking back to home) and Portable Text body content.
 */

import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, urlFor } from "@/lib/sanity";
import PortableTextRenderer from "@/components/PortableText";
import HeroIllustration from "@/components/HeroIllustration";
import FooterLogo from "@/components/FooterLogo";
import { formatDate } from "@/lib/formatDate";

// Revalidate every 60 seconds (same as homepage)
export const revalidate = 60;

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen">
      {/* Hero header — same illustration as homepage, links back home */}
      <div className="max-w-5xl mx-auto px-6">
        <Link href="/" className="block">
          <HeroIllustration />
        </Link>
      </div>

      {/* Post content */}
      <article className="max-w-3xl mx-auto px-6 pb-16">
        {/* Back link */}
        <Link
          href="/"
          className="text-[#030303]/50 hover:text-[#030303] transition-colors text-sm mb-8 inline-block"
        >
          &larr; Back
        </Link>

        {/* Post date */}
        {post.date && (
          <div className="mt-8 mb-2">
            <time className="text-sm text-[#030303]/50 uppercase tracking-wide">
              {formatDate(post.date)}
            </time>
          </div>
        )}

        {/* Post title */}
        <h1 className="text-[32px] md:text-[40px] tracking-[-0.02em] leading-tight mt-2 mb-8">
          {post.title}
        </h1>

        {/* Hover image — if the post has one, show it on the post page too */}
        {post.hoverImage?.asset && (
          <figure className="my-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={urlFor(post.hoverImage).width(800).auto("format").url()}
              alt={post.hoverImage.alt || ""}
              className="rounded-lg max-w-full h-auto"
            />
          </figure>
        )}

        {/* Post body — rendered from Sanity Portable Text */}
        <PortableTextRenderer content={post.content} />

        <FooterLogo />
      </article>
    </main>
  );
}
