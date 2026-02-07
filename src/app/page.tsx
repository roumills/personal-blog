/**
 * Homepage - Lists all blog posts
 *
 * This is the main page of your blog (yourdomain.com/).
 * It fetches all published posts from Sanity and displays them as a list.
 */

import Link from "next/link";
import { getPosts } from "@/lib/sanity";
import AsciiLogo from "@/components/AsciiLogo";

// This tells Next.js to re-fetch data periodically (every 60 seconds)
// So new posts appear without needing to redeploy
export const revalidate = 60;

export default async function Home() {
  // Fetch all published posts from Sanity
  const posts = await getPosts();

  return (
    <main className="min-h-screen bg-black">
      {/* Header with ASCII logo */}
      <header className="px-4">
        <div className="max-w-3xl mx-auto">
          <Link href="/" className="block [&_pre]:hover:text-white [&_pre]:transition-colors">
            <AsciiLogo />
          </Link>
        </div>
      </header>

      {/* Posts list */}
      <div className="max-w-3xl mx-auto px-4">
        {posts.length === 0 ? (
          <p className="text-gray-500">No posts yet. Add some in the Studio!</p>
        ) : (
          <div>
            {/* Column headers */}
            <div className="flex items-center py-3 border-b border-gray-800 text-xs uppercase tracking-wide text-gray-600">
              <span className="w-12">#</span>
              <span className="flex-1">Title</span>
              <span className="w-32 text-right">Date</span>
            </div>

            {/* Post rows */}
            {posts.map((post, index) => (
              <Link
                key={post.id}
                href={`/${post.slug}`}
                className="flex items-center py-4 border-b border-gray-800/50 text-gray-500 hover:text-white transition-colors group"
              >
                <span className="w-12 text-gray-600">{index + 1}</span>
                <span className="flex-1 font-medium">{post.title}</span>
                <span className="w-32 text-right text-sm">
                  {post.date
                    ? new Date(post.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })
                    : ""}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
