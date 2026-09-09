import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import ts from "typescript";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { parse, evaluate } from "groq-js";
const require = createRequire(import.meta.url);

function harness(stubs = {}) {
  const modules = new Map();
  const builtins = {
    "server-only": {},
    "next-sanity": {
      groq: (parts, ...values) =>
        parts.reduce((s, p, i) => s + p + (values[i] ?? ""), ""),
    },
    ...stubs,
  };
  function load(spec, parent = path.resolve("src/index.ts")) {
    if (Object.hasOwn(builtins, spec)) return builtins[spec];
    if (!spec.startsWith("@/") && !spec.startsWith(".")) return require(spec);
    let filename = spec.startsWith("@/")
      ? path.resolve("src", spec.slice(2))
      : path.resolve(path.dirname(parent), spec);
    if (!path.extname(filename))
      filename = [".ts", ".tsx"]
        .map((ext) => filename + ext)
        .find(fs.existsSync);
    if (modules.has(filename)) return modules.get(filename).exports;
    const compiledModule = { exports: {} };
    modules.set(filename, compiledModule);
    const code = ts.transpileModule(fs.readFileSync(filename, "utf8"), {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2022,
        jsx: ts.JsxEmit.ReactJSX,
        esModuleInterop: true,
      },
    }).outputText;
    new Function("require", "module", "exports", code)(
      (s) => load(s, filename),
      compiledModule,
      compiledModule.exports,
    );
    return compiledModule.exports;
  }
  return load;
}
const queries = harness()("@/sanity/lib/queries");
const timestamp = new Date("2026-09-09T12:00:00Z");
const post = (slug, publishedAt) => ({
  _type: "blogPost",
  _id: slug,
  title: slug,
  slug: { current: slug },
  publishedAt,
  _updatedAt: "2026-09-09T10:00:00Z",
});
const dataset = [
  post("live", "2026-09-09T14:00:00+03:00"),
  post("future", "2026-09-09T16:00:00+03:00"),
  post("undated", undefined),
  post("invalid-date", "not-a-date"),
  { ...post("no-slug", "2026-09-08T12:00:00Z"), slug: undefined },
];
async function query(source, params = {}) {
  return (await evaluate(parse(source), { dataset, timestamp, params })).get();
}
test("listing and sitemap expose only dated, currently published posts with a slug", async () => {
  assert.deepEqual(
    (await query(queries.allBlogPostsQuery)).map((p) => p._id),
    ["live"],
  );
  const slugs = await query(queries.blogPostSlugsQuery);
  assert.deepEqual(
    slugs.map((p) => p.slug),
    ["live"],
  );
  assert.equal(slugs[0]._updatedAt, "2026-09-09T10:00:00Z");
});
test("direct blog lookup cannot reveal future, invalid or undated content", async () => {
  for (const slug of [
    "future",
    "undated",
    "invalid-date",
    "no-slug",
    "missing",
  ]) {
    assert.equal(await query(queries.blogPostBySlugQuery, { slug }), null);
  }
  const live = await query(queries.blogPostBySlugQuery, { slug: "live" });
  assert.equal(live._id, "live");
  assert.equal(live._updatedAt, "2026-09-09T10:00:00Z");
});
test("sitemap uses known CMS updates, omits invented dates and deduplicates routes", async () => {
  const load = harness({
    "@/lib/catalog": {
      getProducts: async () => [{ slug: { current: "rampa" } }],
    },
    "@/sanity/lib/fetch": {
      sanityFetch: async (q) =>
        q === queries.blogPostSlugsQuery
          ? [
              {
                slug: "article",
                publishedAt: "2026-09-01T00:00:00Z",
                _updatedAt: "2026-09-08T00:00:00Z",
              },
            ]
          : [
              { slug: "garanti", _updatedAt: "2026-09-07T00:00:00Z" },
              { slug: "blog" },
            ],
    },
  });
  const sitemap = await load("@/app/sitemap").default();
  assert.equal(
    sitemap.find((p) => p.url.endsWith("/blog/article")).lastModified,
    "2026-09-08T00:00:00Z",
  );
  assert.equal(
    sitemap.find((p) => p.url.endsWith("/garanti")).lastModified,
    "2026-09-07T00:00:00Z",
  );
  assert.equal(
    sitemap.find((p) => p.url.endsWith("/urunler/rampa")).lastModified,
    undefined,
  );
  assert.equal(sitemap.filter((p) => p.url.endsWith("/blog")).length, 1);
  assert.equal(sitemap[0].lastModified, undefined);
});
test("blog JSON-LD preserves article facts without allowing a script-closing title", () => {
  const { BlogPostingJsonLd, ProductJsonLd } = harness({
    "@/lib/site-data": { getSiteData: async () => ({}) },
  })("@/components/seo/structured-data");
  const title = "Rampa </script><script>alert(1)</script>";
  const html = renderToStaticMarkup(
    React.createElement(BlogPostingJsonLd, {
      title,
      description: "Ölçü rehberi",
      slug: "article",
      publishedAt: "2026-09-01T12:00:00Z",
      updatedAt: "2026-09-09T12:00:00Z",
      imageUrl: "https://cdn.sanity.io/example.jpg",
      author: "Nova Rampa",
    }),
  );
  assert.equal((html.match(/<script/g) || []).length, 1);
  const data = JSON.parse(
    html.replace(/^<script[^>]*>/, "").replace(/<\/script>$/, ""),
  );
  assert.equal(data.headline, title);
  assert.equal(data.dateModified, "2026-09-09T12:00:00Z");
  assert.equal(data.image, "https://cdn.sanity.io/example.jpg");
  assert.equal(data.author["@type"], "Organization");
  const productHtml = renderToStaticMarkup(
    React.createElement(ProductJsonLd, {
      name: "Rampa",
      description: "Proje bazlı",
      slug: "rampa",
    }),
  );
  assert.ok(
    !productHtml.includes('"offers"'),
    "Quote-only products must not invent a price or stock status",
  );
});
test("common robots rule keeps admin and API exclusions for Google and AI crawlers", () => {
  const robots = harness()("@/app/robots").default();
  assert.equal(robots.rules.userAgent, "*");
  assert.deepEqual(robots.rules.disallow, ["/studio", "/api"]);
  assert.equal(robots.rules.allow, "/");
});
