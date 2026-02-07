/**
 * Homepage — Lists all blog posts
 *
 * This is the main page of spellbook.fyi.
 * It shows a hero illustration, a tagline, and a table of all published posts.
 * Each post row has a black-box hover effect (see PostRow component).
 */

import { getPosts } from "@/lib/sanity";
import HeroIllustration from "@/components/HeroIllustration";
import PostRow from "@/components/PostRow";
import FooterLogo from "@/components/FooterLogo";

// ISR: re-fetch data every 60 seconds so new posts appear without redeploying
export const revalidate = 60;

export default async function Home() {
  const posts = await getPosts();

  return (
    <main className="min-h-screen">
      <div className="max-w-5xl mx-auto px-6">
        {/* Hero illustration */}
        <HeroIllustration />

        {/* Headline — the big intro text from the Figma design */}
        <h1 className="text-center text-[28px] sm:text-[36px] md:text-[48px] lg:text-[58px] leading-[1.12] tracking-[-0.02em] max-w-[882px] mx-auto mb-[120px]">
          I&rsquo;m Rou. I help founders &amp; teams use design to build products people love
        </h1>

        {/* Post table */}
        {posts.length === 0 ? (
          <p className="text-stone-500">No posts yet. Add some in the Studio!</p>
        ) : (
          <div>
            {posts.map((post, index) => (
              <PostRow key={post.id} post={post} index={index} />
            ))}
          </div>
        )}

        {/* Footer logo */}
        <FooterLogo />
      </div>
    </main>
  );
}
