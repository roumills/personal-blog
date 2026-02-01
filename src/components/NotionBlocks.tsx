/**
 * NotionBlocks Component
 *
 * This component takes Notion "blocks" (paragraphs, headings, etc.)
 * and renders them as HTML elements.
 *
 * Notion stores content in a special format. For example, a paragraph
 * looks like: { type: "paragraph", paragraph: { rich_text: [...] } }
 *
 * We convert these into regular HTML: <p>Your text here</p>
 */

// Props type - we use 'any' for blocks because Notion's API types are complex
// and vary between SDK versions. This is a pragmatic choice for a blog.
type Props = {
  blocks: any[];
};

/**
 * Renders the text content from Notion's "rich_text" format
 * Handles bold, italic, code, and links
 */
function renderRichText(richText: any[]) {
  if (!richText) return null;

  return richText.map((text, index) => {
    // Get the actual text content
    let content: React.ReactNode = text.plain_text;

    // Apply formatting
    if (text.annotations.bold) {
      content = <strong key={`bold-${index}`}>{content}</strong>;
    }
    if (text.annotations.italic) {
      content = <em key={`italic-${index}`}>{content}</em>;
    }
    if (text.annotations.code) {
      content = (
        <code key={`code-${index}`} className="bg-gray-100 px-1 rounded text-sm">
          {content}
        </code>
      );
    }

    // Handle links
    if (text.href) {
      content = (
        <a
          key={`link-${index}`}
          href={text.href}
          className="text-blue-600 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {content}
        </a>
      );
    }

    return <span key={index}>{content}</span>;
  });
}

/**
 * Main component that renders all blocks
 */
export default function NotionBlocks({ blocks }: Props) {
  return (
    <div className="prose prose-lg max-w-none">
      {blocks.map((block) => {
        // Handle each block type differently
        switch (block.type) {
          case "paragraph":
            return (
              <p key={block.id} className="mb-4">
                {renderRichText(block.paragraph.rich_text)}
              </p>
            );

          case "heading_1":
            return (
              <h1 key={block.id} className="text-3xl font-bold mt-8 mb-4">
                {renderRichText(block.heading_1.rich_text)}
              </h1>
            );

          case "heading_2":
            return (
              <h2 key={block.id} className="text-2xl font-bold mt-6 mb-3">
                {renderRichText(block.heading_2.rich_text)}
              </h2>
            );

          case "heading_3":
            return (
              <h3 key={block.id} className="text-xl font-bold mt-4 mb-2">
                {renderRichText(block.heading_3.rich_text)}
              </h3>
            );

          case "bulleted_list_item":
            return (
              <li key={block.id} className="ml-4 list-disc">
                {renderRichText(block.bulleted_list_item.rich_text)}
              </li>
            );

          case "numbered_list_item":
            return (
              <li key={block.id} className="ml-4 list-decimal">
                {renderRichText(block.numbered_list_item.rich_text)}
              </li>
            );

          case "quote":
            return (
              <blockquote
                key={block.id}
                className="border-l-4 border-gray-300 pl-4 italic my-4"
              >
                {renderRichText(block.quote.rich_text)}
              </blockquote>
            );

          case "code":
            return (
              <pre
                key={block.id}
                className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-4"
              >
                <code>{block.code.rich_text[0]?.plain_text}</code>
              </pre>
            );

          case "divider":
            return <hr key={block.id} className="my-8 border-gray-200" />;

          case "image": {
            const image = block.image;
            const src = image.type === "external"
              ? image.external.url
              : image.file.url;
            const caption = image.caption?.[0]?.plain_text;

            return (
              <figure key={block.id} className="my-6">
                <img
                  src={src}
                  alt={caption || ""}
                  className="rounded-lg max-w-full h-auto"
                />
                {caption && (
                  <figcaption className="text-center text-sm text-gray-500 mt-2">
                    {caption}
                  </figcaption>
                )}
              </figure>
            );
          }

          default:
            // For unsupported block types, show nothing (or you could log them)
            return null;
        }
      })}
    </div>
  );
}
