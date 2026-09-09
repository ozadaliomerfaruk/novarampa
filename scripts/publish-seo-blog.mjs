/**
 * Five reviewed articles. Preview by default; --apply creates only missing posts.
 * Existing Studio edits are never overwritten.
 * node --env-file=.env.local scripts/publish-seo-blog.mjs [--apply]
 */
import fs from "node:fs/promises";
import assert from "node:assert/strict";
import { createClient } from "@sanity/client";

const apply = process.argv.includes("--apply");
const articles = JSON.parse(
  await fs.readFile("content/blog/seo-geo-2026-09.json", "utf8"),
);
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2025-01-01",
  perspective: "raw",
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
});
const publishedAt = new Date().toISOString();

function portableText(markdown) {
  return markdown.split(/\n\s*\n/).flatMap((paragraph, index) => {
    const lines = paragraph.startsWith("- ")
      ? paragraph.split("\n")
      : [paragraph];
    return lines.map((line, row) => {
      const key = "b" + index + "-" + row;
      const heading = line.match(/^(#{2,3}) /);
      const bullet = line.startsWith("- ");
      const value = line.replace(/^(#{2,3} |- )/, "");
      const children = [];
      const markDefs = [];
      const token = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*/g;
      let cursor = 0;
      function span(text, marks = []) {
        children.push({
          _type: "span",
          _key: key + "-s" + children.length,
          text,
          marks,
        });
      }
      for (const match of value.matchAll(token)) {
        if (match.index > cursor) span(value.slice(cursor, match.index));
        if (match[1]) {
          const href = match[2];
          assert.ok(
            (href.startsWith("/") && !href.startsWith("//")) ||
              href.startsWith("https://"),
            "Invalid link",
          );
          const linkKey = key + "-l" + markDefs.length;
          markDefs.push({ _type: "link", _key: linkKey, href });
          span(match[1], [linkKey]);
        } else span(match[3], ["strong"]);
        cursor = match.index + match[0].length;
      }
      if (cursor < value.length) span(value.slice(cursor));
      return {
        _type: "block",
        _key: key,
        style: heading ? "h" + heading[1].length : "normal",
        children,
        markDefs,
        ...(bullet ? { listItem: "bullet", level: 1 } : {}),
      };
    });
  });
}
assert.equal(articles.length, 5);
assert.equal(new Set(articles.map((a) => a.slug)).size, 5);
const existing = await client.fetch('*[_type == "blogPost"]{_id,slug,title}');
const imageRefs = [...new Set(articles.map((a) => a.imageRef))];
const assets = await client.fetch(
  '*[_type == "sanity.imageAsset" && _id in $ids]{_id}',
  { ids: imageRefs },
);
const documents = [];
for (const a of articles) {
  assert.match(a.slug, /^[a-z0-9-]+$/);
  assert.ok(a.title.length <= 140 && a.excerpt.length <= 280);
  assert.ok(a.seoTitle.length <= 60 && a.seoDescription.length <= 160);
  assert.ok(a.body.split(/\s+/).length >= 450);
  assert.ok(
    assets.some((asset) => asset._id === a.imageRef),
    "Missing image: " + a.slug,
  );
  const id = "blog-seo-" + a.slug;
  const conflict = existing.find(
    (p) =>
      p.slug?.current === a.slug && p._id !== id && p._id !== "drafts." + id,
  );
  assert.ok(!conflict, "Another document owns slug " + a.slug);
  if (existing.some((p) => p._id === id || p._id === "drafts." + id)) {
    console.log("Preserved existing:", a.slug);
    continue;
  }
  documents.push({
    _id: id,
    _type: "blogPost",
    title: a.title,
    slug: { _type: "slug", current: a.slug },
    excerpt: a.excerpt,
    author: "Nova Rampa",
    publishedAt,
    readTime: Math.max(1, Math.ceil(a.body.split(/\s+/).length / 180)),
    tags: a.tags,
    mainImage: {
      _type: "image",
      asset: { _type: "reference", _ref: a.imageRef },
      alt: a.imageAlt,
    },
    seo: { title: a.seoTitle, description: a.seoDescription },
    body: portableText(a.body),
  });
}
await fs.mkdir(".playwright-mcp/seo", { recursive: true });
await fs.writeFile(
  ".playwright-mcp/seo/blog-publish-" +
    (apply ? "applied" : "preview") +
    ".json",
  JSON.stringify({ publishedAt, existing, documents }, null, 2),
);
console.log(
  JSON.stringify(
    {
      apply,
      createCount: documents.length,
      titles: documents.map((d) => d.title),
    },
    null,
    2,
  ),
);
if (apply && documents.length) {
  assert.ok(process.env.SANITY_API_WRITE_TOKEN, "Write token required");
  let transaction = client.transaction();
  for (const document of documents) transaction = transaction.create(document);
  const result = await transaction.commit({ visibility: "sync" });
  console.log("Published transaction:", result.transactionId);
}
