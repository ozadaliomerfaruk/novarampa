/**
 * Fill missing reference logos without overwriting images edited in Studio.
 * Preview: node --env-file=.env.local scripts/import-reference-logos.mjs
 * Apply:   node --env-file=.env.local scripts/import-reference-logos.mjs --apply
 */
import fs from "node:fs";
import path from "node:path";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
import { createClient } from "@sanity/client";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const apply = process.argv.includes("--apply");
const manifest = JSON.parse(
  fs.readFileSync(path.join(root, "docs/reference-logo-manifest.json"), "utf8"),
);
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2025-01-01",
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
});
if (apply && !process.env.SANITY_API_WRITE_TOKEN) {
  throw new Error("SANITY_API_WRITE_TOKEN is required to apply the import.");
}
const before = await client.fetch(
  '*[_type == "referenceCompany" && !(_id in path("drafts.**"))]',
);
const byId = new Map(before.map((r) => [r._id, r]));
const pending = [];
for (const entry of manifest) {
  const current = byId.get(entry.id);
  if (!current || current.name !== entry.name)
    throw new Error("Reference identity changed: " + entry.id);
  const file = path.resolve(root, "public", entry.file.slice(1));
  if (!file.startsWith(path.join(root, "public", "references") + path.sep))
    throw new Error("Invalid asset path");
  const bytes = fs.readFileSync(file);
  if (createHash("sha256").update(bytes).digest("hex") !== entry.sha256)
    throw new Error("Asset checksum mismatch: " + entry.id);
  if (!current.logo?.asset?._ref) pending.push({ entry, current, bytes });
}
// Existing white artwork needs a dark surface, without changing its uploaded image.
const backgroundOnly = before.filter(
  (r) =>
    r._id === "reference-g-n-z-tekstil" && r.logo?.asset && !r.logoBackground,
);
console.log(
  JSON.stringify({
    mode: apply ? "apply" : "preview",
    references: before.length,
    missingLogos: pending.length,
    preservedLogos: before.filter((r) => r.logo?.asset?._ref).length,
    backgroundOnly: backgroundOnly.length,
  }),
);
if (!apply) process.exit(0);
const backupDir = path.join(root, ".playwright-mcp", "backups");
fs.mkdirSync(backupDir, { recursive: true });
const backup = path.join(
  backupDir,
  "references-before-logos-" + Date.now() + ".json",
);
fs.writeFileSync(backup, JSON.stringify(before, null, 2), { flag: "wx" });
for (const { entry, current, bytes } of pending) {
  const asset = await client.assets.upload("image", bytes, {
    filename: path.basename(entry.file),
  });
  await client
    .patch(entry.id)
    .ifRevisionId(current._rev)
    .set({
      logo: {
        _type: "image",
        asset: { _type: "reference", _ref: asset._id },
        alt: entry.name + " logosu",
      },
      logoBackground: current.logoBackground || entry.background,
    })
    .commit();
  console.log("Added: " + entry.name);
}
for (const current of backgroundOnly) {
  await client
    .patch(current._id)
    .ifRevisionId(current._rev)
    .setIfMissing({ logoBackground: "dark" })
    .commit();
}
const after = await client.fetch(
  '*[_type == "referenceCompany" && !(_id in path("drafts.**"))]',
);
if (after.length !== before.length)
  throw new Error("Reference count changed during import.");
for (const original of before) {
  const current = after.find((r) => r._id === original._id);
  if (!current)
    throw new Error("Reference missing after import: " + original._id);
  if (
    original.logo?.asset?._ref &&
    JSON.stringify(original.logo) !== JSON.stringify(current.logo)
  ) {
    throw new Error("Existing logo changed: " + original._id);
  }
  const unchanged = (r) =>
    Object.fromEntries(
      Object.entries(r).filter(
        ([key]) =>
          !["_rev", "_updatedAt", "logo", "logoBackground"].includes(key),
      ),
    );
  if (
    JSON.stringify(unchanged(original)) !== JSON.stringify(unchanged(current))
  ) {
    // Object key order is not meaningful in Content Lake.
    const a = unchanged(original),
      b = unchanged(current);
    if (
      Object.keys(a).length !== Object.keys(b).length ||
      Object.keys(a).some((k) => JSON.stringify(a[k]) !== JSON.stringify(b[k]))
    ) {
      throw new Error(
        "Reference content changed during import: " + original._id,
      );
    }
  }
}
console.log(
  JSON.stringify({
    verifiedReferences: after.length,
    logos: after.filter((r) => r.logo?.asset?._ref).length,
    backup,
  }),
);
