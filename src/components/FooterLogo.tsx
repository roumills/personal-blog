/**
 * Footer Logo
 *
 * A small centered wishbone illustration at the bottom of each page.
 * Links back to the homepage. Keeps the design bookended —
 * illustration at top, logo at bottom.
 */

import Link from "next/link";
import Image from "next/image";

export default function FooterLogo() {
  return (
    <footer className="flex justify-center py-16">
      <Link href="/">
        <Image
          src="/images/footer-logo.png"
          alt="Spellbook logo — back to home"
          width={100}
          height={93}
        />
      </Link>
    </footer>
  );
}
