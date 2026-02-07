/**
 * Studio Layout
 *
 * A minimal layout for the Sanity Studio page.
 * We don't import globals.css here because our site's styles
 * (black background, monospace font) would interfere with
 * the Studio's own UI. This gives the Studio a clean slate.
 */

export const metadata = {
  title: "Sanity Studio",
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
