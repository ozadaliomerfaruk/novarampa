import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import ts from "typescript";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
const require = createRequire(import.meta.url);
const defaults = JSON.parse(
  fs.readFileSync("src/lib/site-copy-defaults.json", "utf8"),
);
function harness(document) {
  const modules = new Map();
  const stubs = {
    "server-only": {},
    react: { ...React, cache: (fn) => fn },
    "@/sanity/lib/fetch": { sanityFetch: async () => document },
    "@/components/layout/header": { Header: () => null },
    "@/components/layout/footer": { Footer: () => null },
    "@/components/layout/breadcrumb": { Breadcrumb: () => null },
    "@/components/home/cta-section": { CtaSection: () => null },
    "@/components/layout/page-intro": {
      PageIntro: ({ title }) => React.createElement("h1", null, title),
    },
  };
  function load(spec, parent = process.cwd() + "/src/") {
    if (Object.hasOwn(stubs, spec)) return stubs[spec];
    if (!spec.startsWith("@/") && !spec.startsWith(".")) return require(spec);
    let filename = spec.startsWith("@/")
      ? path.resolve("src", spec.slice(2))
      : path.resolve(path.dirname(parent), spec);
    if (!path.extname(filename))
      filename = [".ts", ".tsx"]
        .map((ext) => filename + ext)
        .find((p) => fs.existsSync(p));
    if (filename.endsWith(".json"))
      return JSON.parse(fs.readFileSync(filename, "utf8"));
    if (modules.has(filename)) return modules.get(filename).exports;
    const compiledModule = { exports: {} };
    modules.set(filename, compiledModule);
    const compiled = ts.transpileModule(fs.readFileSync(filename, "utf8"), {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2022,
        jsx: ts.JsxEmit.ReactJSX,
        esModuleInterop: true,
      },
    }).outputText;
    new Function("require", "module", "exports", compiled)(
      (s) => load(s, filename),
      compiledModule,
      compiledModule.exports,
    );
    return compiledModule.exports;
  }
  return load;
}
test("CMS edits override defaults while missing neighboring fields retain their content", async () => {
  const load = harness({
    home: { whyTitle: "CMS üzerinden değişti" },
    about: { body: "Yeni metin" },
  });
  const result = await load("@/lib/site-copy-server").getSiteCopy();
  assert.equal(result.home.whyTitle, "CMS üzerinden değişti");
  assert.equal(
    result.home.warrantyDescription,
    defaults.home.warrantyDescription,
  );
  assert.equal(result.about.body, "Yeni metin");
  assert.equal(result.about.title, defaults.about.title);
});
test("empty optional text remains empty; malformed fields do not leak into the page", () => {
  const { resolveSiteCopy } = harness(null)("@/lib/site-copy");
  const result = resolveSiteCopy({
    sharedCta: { description: "", title: 42 },
    home: null,
    unexpected: { secret: "ignore" },
  });
  assert.equal(result.sharedCta.description, "");
  assert.equal(result.sharedCta.title, defaults.sharedCta.title);
  assert.deepEqual(result.home, defaults.home);
  assert.equal(result.unexpected, undefined);
  assert.deepEqual(resolveSiteCopy(null), defaults);
});
test("the migration defaults preserve Eren's original four paragraphs exactly", () => {
  const original = harness(null)("@/lib/about").aboutParagraphs;
  assert.equal(defaults.about.body, original.join("\n\n"));
  assert.ok(defaults.about.body.includes("her montajda  verilen emek"));
});
test("the actual About page displays CMS title/body, keeps spacing and updates metadata", async () => {
  const body = "İlk paragraf.\n\nİki  boşluk korunur.";
  const load = harness({ about: { title: "Stüdyo başlığı", body } });
  const page = load("@/app/hakkimizda/page");
  const html = renderToStaticMarkup(await page.default());
  assert.ok(html.includes("Stüdyo başlığı"));
  assert.ok(html.includes("İki  boşluk korunur."));
  assert.equal((html.match(/<p /g) || []).length, 2);
  assert.equal((await page.generateMetadata()).description, "İlk paragraf.");
});
