/**
 * Notion API Helper
 *
 * This file handles all communication with Notion's API.
 * It exports functions that other parts of our app can use to fetch blog posts.
 *
 * Note: As of late 2025, Notion restructured their API:
 * - A "database" is now a container that can hold multiple data sources
 * - A "data source" is the actual table of records (pages)
 * - We need to first retrieve the data source ID from the database
 */

import { Client } from "@notionhq/client";

// Create a Notion client instance
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

// The database ID from your Notion URL
const databaseId = process.env.NOTION_DATABASE_ID!;

// Cache the data source ID so we don't have to fetch it every time
let cachedDataSourceId: string | null = null;

/**
 * Gets the data source ID from the database
 * In Notion's new API, we need this ID to query the actual data
 */
async function getDataSourceId(): Promise<string> {
  if (cachedDataSourceId) {
    return cachedDataSourceId;
  }

  // Retrieve the database to get its data sources
  const database = await notion.databases.retrieve({
    database_id: databaseId,
  }) as any;

  // Get the first (usually only) data source
  // Note: The property is .id not .data_source_id
  if (database.data_sources && database.data_sources.length > 0) {
    cachedDataSourceId = database.data_sources[0].id;
    return cachedDataSourceId!;
  }

  // Fallback: if the database itself is the data source (simpler setup)
  // This happens when there's only one data source that matches the database
  cachedDataSourceId = databaseId;
  return cachedDataSourceId;
}

/**
 * Fetches all published blog posts from your Notion database
 * Returns them sorted by date (newest first)
 */
export async function getPosts() {
  const dataSourceId = await getDataSourceId();

  const response = await notion.dataSources.query({
    data_source_id: dataSourceId,
    filter: {
      // Only get posts where "Published" checkbox is checked
      property: "Published",
      checkbox: {
        equals: true,
      },
    },
    sorts: [
      // Sort by date, newest first
      {
        property: "Date",
        direction: "descending",
      },
    ],
  });

  // Transform Notion's complex response into simpler objects
  const posts = response.results.map((page: any) => {
    return {
      id: page.id,
      title: page.properties.Title?.title[0]?.plain_text || "Untitled",
      slug: page.properties.Slug?.rich_text[0]?.plain_text || page.id,
      date: page.properties.Date?.date?.start || null,
    };
  });

  return posts;
}

/**
 * Fetches a single blog post by its slug
 * Returns both the post metadata and its content
 */
export async function getPostBySlug(slug: string) {
  const dataSourceId = await getDataSourceId();

  // First, find the post with this slug
  const response = await notion.dataSources.query({
    data_source_id: dataSourceId,
    filter: {
      property: "Slug",
      rich_text: {
        equals: slug,
      },
    },
  });

  if (response.results.length === 0) {
    return null;
  }

  const page: any = response.results[0];

  // Get the page content (the blocks inside the page)
  const blocks = await notion.blocks.children.list({
    block_id: page.id,
  });

  return {
    id: page.id,
    title: page.properties.Title?.title[0]?.plain_text || "Untitled",
    slug: page.properties.Slug?.rich_text[0]?.plain_text || page.id,
    date: page.properties.Date?.date?.start || null,
    content: blocks.results,
  };
}

/**
 * Gets all slugs for static generation
 * This tells Next.js what URLs to pre-build
 */
export async function getAllPostSlugs() {
  const dataSourceId = await getDataSourceId();

  const response = await notion.dataSources.query({
    data_source_id: dataSourceId,
    filter: {
      property: "Published",
      checkbox: {
        equals: true,
      },
    },
  });

  return response.results.map((page: any) => ({
    slug: page.properties.Slug?.rich_text[0]?.plain_text || page.id,
  }));
}
