/**
 * Apply reviewed logo variants, whitespace crops and optical size adjustments.
 * node --env-file=.env.local scripts/refine-reference-logos.mjs [--apply]
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";
import { createClient } from "@sanity/client";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const apply = process.argv.includes("--apply");
const entries = JSON.parse(
  fs.readFileSync(
    path.join(root, "docs/reference-logo-refinements.json"),
    "utf8",
  ),
);
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2025-01-01",
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
});
if (apply && !process.env.SANITY_API_WRITE_TOKEN)
  throw new Error("Write token required.");
const query = '*[_type == "referenceCompany" && !(_id in path("drafts.**"))]';
const before = await client.fetch(query);
const pending = [];
for (const entry of entries) {
  const current = before.find((r) => r._id === entry.id);
  if (!current || current.name !== entry.name)
    throw new Error("Reference identity changed: " + entry.id);
  if (current.logo?.asset?._ref !== entry.expectedLogo) {
    console.log("Preserved updated logo: " + entry.name);
    continue;
  }
  const fields = {};
  if (
    entry.crop &&
    Object.entries(entry.crop).some(
      ([key, value]) => current.logo.crop?.[key] !== value,
    )
  )
    fields["logo.crop"] = entry.crop;
  if (entry.logoScale && current.logoScale !== entry.logoScale)
    fields.logoScale = entry.logoScale;
  if (entry.logoBackground && current.logoBackground !== entry.logoBackground)
    fields.logoBackground = entry.logoBackground;
  let bytes;
  if (entry.file) {
    const file = path.resolve(root, "public", entry.file.slice(1));
    if (!file.startsWith(path.join(root, "public", "references") + path.sep))
      throw new Error("Invalid path");
    bytes = fs.readFileSync(file);
    if (createHash("sha256").update(bytes).digest("hex") !== entry.sha256)
      throw new Error("Asset checksum changed: " + entry.id);
  }
  if (bytes || Object.keys(fields).length)
    pending.push({ entry, current, fields, bytes });
}
console.log(
  JSON.stringify({
    mode: apply ? "apply" : "preview",
    changes: pending.length,
    newAssets: pending.filter((p) => p.bytes).length,
  }),
);
if (!apply) process.exit(0);
const backupDir = path.join(root, ".playwright-mcp", "backups");
fs.mkdirSync(backupDir, { recursive: true });
const backup = path.join(
  backupDir,
  "references-before-refinement-" + Date.now() + ".json",
);
fs.writeFileSync(backup, JSON.stringify(before, null, 2), { flag: "wx" });
for (const { entry, current, fields, bytes } of pending) {
  if (bytes) {
    const asset = await client.assets.upload("image", bytes, {
      filename: path.basename(entry.file),
    });
    fields.logo = {
      _type: "image",
      asset: { _type: "reference", _ref: asset._id },
      alt: current.logo.alt || entry.name + " logosu",
    };
  }
  await client.patch(entry.id).ifRevisionId(current._rev).set(fields).commit();
  console.log("Updated: " + entry.name);
}
const after = await client.fetch(query);
if (after.length !== before.length) throw new Error("Reference count changed.");
for (const original of before) {
  const current = after.find((r) => r._id === original._id);
  if (!current?.logo?.asset) throw new Error("Logo missing: " + original._id);
  const retained = (r) =>
    Object.fromEntries(
      Object.entries(r).filter(
        ([k]) =>
          ![
            "_rev",
            "_updatedAt",
            "logo",
            "logoBackground",
            "logoScale",
          ].includes(k),
      ),
    );
  const a = retained(original),
    b = retained(current);
  if (
    Object.keys(a).length !== Object.keys(b).length ||
    Object.keys(a).some((k) => JSON.stringify(a[k]) !== JSON.stringify(b[k]))
  ) {
    throw new Error("Unrelated reference content changed: " + original._id);
  }
}
console.log(
  JSON.stringify({
    verified: after.length,
    darkLogoBackgrounds: after.filter((r) => r.logoBackground === "dark")
      .length,
    backup,
  }),
);
