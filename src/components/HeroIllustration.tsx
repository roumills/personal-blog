/**
 * Hero Illustration
 *
 * The hand-drawn illustration at the top of the page.
 * Uses a plain <img> tag to avoid Next.js image optimization caching
 * issues during development. The image is a static PNG in /public/.
 */

export default function HeroIllustration() {
  return (
    <div className="flex justify-center pt-[110px] pb-[40px]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/hero-illustration.png"
        alt="Illustration of a person with headphones reading next to a dog and a boombox"
        width={600}
        height={336}
        className="w-full max-w-[600px] h-auto"
      />
    </div>
  );
}
