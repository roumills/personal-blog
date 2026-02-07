/**
 * PostRow Component
 *
 * A single row in the homepage post list, styled like a book's
 * table of contents with dot leaders:
 *
 *   Post Title . . . . . . . . . . . . . . 01
 *
 * On hover, a thumbnail image fades in centered over the post list.
 * Inspired by clownshowprison.com's table of contents.
 *
 * The dot leaders use a CSS trick: a flex-1 span filled with dots,
 * with overflow:hidden so extra dots get clipped. This way the dots
 * always fill exactly the space between the title and the number.
 */

"use client";

import Link from "next/link";

type PostRowProps = {
  post: {
    slug: string;
    title: string;
    hoverImageUrl: string | null;
  };
  index: number;
};

export default function PostRow({ post, index }: PostRowProps) {
  const rowNumber = String(index + 1).padStart(2, "0");

  return (
    <Link
      href={`/${post.slug}`}
      className="group relative flex items-baseline gap-2 py-3 text-[#030303] hover:text-[#030303]/60 transition-colors duration-300"
    >
      {/* Title */}
      <span className="text-[21px] tracking-[-0.02em] shrink-0">
        {post.title}
      </span>

      {/* Dot leaders — fills the space between title and number.
          flex-1 makes it stretch, overflow-hidden clips extra dots. */}
      <span className="flex-1 overflow-hidden whitespace-nowrap text-[16px] text-[#030303]/30 leading-none translate-y-[-2px]">
        {" . ".repeat(200)}
      </span>

      {/* Row number */}
      <span className="text-[18px] shrink-0">
        {rowNumber}
      </span>

      {/* Hover image — centered over the list, fades in on hover.
          pointer-events-none so it doesn't block clicking the link.
          Hidden on mobile (no hover on touch devices). */}
      {post.hoverImageUrl && (
        <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.hoverImageUrl}
            alt=""
            className="w-[300px] h-auto rounded-sm"
          />
        </div>
      )}
    </Link>
  );
}
