/**
 * Homepage - Lists all blog posts
 *
 * This is the main page of your blog (yourdomain.com/).
 * It fetches all published posts from Notion and displays them as a list.
 */

import Link from "next/link";
import { getPosts } from "@/lib/notion";

// This tells Next.js to re-fetch data periodically (every 60 seconds)
// So new posts appear without needing to redeploy
export const revalidate = 60;

export default async function Home() {
  // Fetch all published posts from Notion
  const posts = await getPosts();

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100">
        <div className="max-w-2xl mx-auto px-6 py-8">
          <h1 className="text-2xl font-bold text-gray-900">My Blog</h1>
          <p className="text-gray-600 mt-1">Thoughts and ideas</p>
        </div>
      </header>

      {/* Posts list */}
      <div className="max-w-2xl mx-auto px-6 py-12">
        {posts.length === 0 ? (
          <p className="text-gray-500">No posts yet. Add some in Notion!</p>
        ) : (
          <ul className="space-y-8">
            {posts.map((post) => (
              <li key={post.id}>
                <article>
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

                  {/* Post title - links to full post */}
                  <h2 className="text-xl font-semibold text-gray-900 mt-1 hover:text-gray-600">
                    <Link href={`/posts/${post.slug}`}>{post.title}</Link>
                  </h2>
                </article>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
