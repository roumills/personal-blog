/**
 * PostRow Component
 *
 * A single row in the homepage post table. This is a client component
 * because we use hover effects — though they're all CSS-based via
 * Tailwind's `group-hover:` pattern, no JavaScript state needed.
 *
 * Hover effect: A black box appears behind the row and text turns white.
 * Inspired by amitlankri.com's project list hover.
 *
 * Responsive: On mobile, it switches from a 5-column row to a stacked
 * card layout since the columns don't fit on small screens.
 */

"use client";

import Link from "next/link";
import { formatDate } from "@/lib/formatDate";

type PostRowProps = {
  post: {
    slug: string;
    title: string;
    tags: string[];
    date: string | null;
    artTitle: string | null;
  };
  index: number;
};

export default function PostRow({ post, index }: PostRowProps) {
  // Pad index to always show 2 digits: 1 → "01", 12 → "12"
  const rowNumber = String(index + 1).padStart(2, "0");

  return (
    <Link
      href={`/${post.slug}`}
      className="group relative block"
    >
      {/* The black background — starts invisible, fades in on hover.
          -mx-6 px-6 makes it extend beyond the text for a padded box effect. */}
      <div className="absolute inset-0 -mx-6 bg-black rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Desktop layout — 5 columns in a row (hidden on mobile) */}
      <div className="relative hidden md:flex items-center py-5 text-[#030303] group-hover:text-white transition-colors duration-300">
        <span className="w-16 text-[18px] shrink-0">{rowNumber}</span>
        <span className="flex-1 text-[21px] tracking-[-0.42px]">{post.title}</span>
        <span className="w-44 text-[18px] text-[#030303]/60 group-hover:text-white/60 transition-colors duration-300 shrink-0">
          {post.tags?.join(", ")}
        </span>
        <span className="w-36 text-[18px] text-[#030303]/60 group-hover:text-white/60 transition-colors duration-300 shrink-0">
          {formatDate(post.date)}
        </span>
        <span className="w-48 text-right text-[18px] text-[#030303]/60 group-hover:text-white/60 transition-colors duration-300 shrink-0">
          {post.artTitle || ""}
        </span>
      </div>

      {/* Mobile layout — stacked card (hidden on desktop) */}
      <div className="relative flex md:hidden flex-col gap-1 py-4 text-[#030303] group-hover:text-white transition-colors duration-300">
        <span className="text-[19px] tracking-[-0.38px]">{post.title}</span>
        <div className="flex gap-3 text-[14px] text-[#030303]/50 group-hover:text-white/50 transition-colors duration-300">
          {post.tags?.length > 0 && <span>{post.tags.join(", ")}</span>}
          {post.date && <span>{formatDate(post.date)}</span>}
        </div>
      </div>
    </Link>
  );
}
