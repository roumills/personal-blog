/**
 * Root Layout
 *
 * This wraps every page on your site. It includes:
 * - The <html> and <body> tags
 * - Global metadata (title, description)
 * - Anything that appears on every page
 *
 * The {children} prop is where each page's content gets inserted.
 */

import type { Metadata } from "next";
import "./globals.css";

// Site metadata - shows up in browser tabs and search results
export const metadata: Metadata = {
  title: "My Blog",
  description: "Personal blog powered by Notion",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
