/**
 * Complete reviewed CMS gaps. Default is preview; --apply backs up and publishes.
 * Run from repo root: node --env-file=.env.local scripts/complete-sanity-content.mjs [--apply]
 */
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import ts from "typescript";
import { createHash } from "node:crypto";
import { createClient } from "@sanity/client";
const root = process.cwd();
const apply = process.argv.includes("--apply");
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2025-01-01",
  perspective: "raw",
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
});
const json = (p) => JSON.parse(fs.readFileSync(path.join(root, p), "utf8"));
function constants(p) {
  const exports = {};
  vm.runInNewContext(
    ts.transpileModule(fs.readFileSync(path.join(root, p), "utf8"), {
      compilerOptions: { module: ts.ModuleKind.CommonJS },
    }).outputText,
    { exports },
  );
  return exports;
}
const { company } = constants("src/lib/site-config.ts");
const { defaultHomeFaqs } = constants("src/lib/home-faqs.ts");
const defaults = json("src/lib/site-copy-defaults.json");
const imageSource = json("docs/container-ramp-image-source.json");
const productId = "product-konteyner-gecis-rampasi";
const query = "*[_id in $ids]";
const ids = [
  "siteSettings",
  "drafts.siteSettings",
  "siteCopy",
  "drafts.siteCopy",
  productId,
  "drafts." + productId,
];
const before = await client.fetch(query, { ids });
const published = before.find((d) => d._id === "siteSettings");
const draft = before.find((d) => d._id === "drafts.siteSettings");
const copy = before.find((d) => d._id === "siteCopy");
const product = before.find((d) => d._id === productId);
if (!published || product?.name !== "Konteynere Geçiş Rampası")
  throw Error("Expected documents changed.");
if (before.some((d) => d._id === "drafts.siteCopy"))
  throw Error("New copy edits exist in a draft; preserve them.");
const normalize = (value) =>
  JSON.stringify(value, (k, v) =>
    v && typeof v === "object" && !Array.isArray(v)
      ? Object.fromEntries(
          Object.entries(v).sort(([a], [b]) => a.localeCompare(b)),
        )
      : v,
  );
if (draft) {
  const changed = [
    ...new Set([...Object.keys(draft), ...Object.keys(published)]),
  ].filter(
    (k) =>
      !k.startsWith("_") && normalize(draft[k]) !== normalize(published[k]),
  );
  if (changed.some((k) => k !== "locations"))
    throw Error("Settings draft has new unrelated edits: " + changed.join(","));
}
const base = draft || published;
const validLocation = (loc) =>
  ["label", "addressLine1", "city", "district"].every(
    (k) => typeof loc[k] === "string" && loc[k].trim(),
  );
const validLocations = base.locations?.filter(validLocation) || [];
const fields = {};
if (!Array.isArray(base.homeFaqs) || !base.homeFaqs.length)
  fields.homeFaqs = defaultHomeFaqs.map((faq, i) => ({
    _key: "home-faq-" + (i + 1),
    _type: "homeFaq",
    ...faq,
  }));
if (!validLocations.length)
  fields.locations = company.locations.map((loc, i) => ({
    _key: "location-" + (i + 1),
    _type: "location",
    label: loc.label,
    type: loc.type,
    addressLine1: loc.addressLine1,
    city: loc.city,
    district: loc.district,
  }));
else if (validLocations.length !== base.locations.length)
  throw Error(
    "A partially completed location needs review; no valid entries were removed.",
  );
const needsVideo = !base.heroVideo?.asset?._ref;
const productVersions = before.filter(
  (d) => d._type === "product" && !d.mainImage?.asset?._ref,
);
const photoHash = createHash("sha1")
  .update(fs.readFileSync(path.join(root, "public", imageSource.file.slice(1))))
  .digest("hex");
const fitVersions = before.filter(
  (d) =>
    d._type === "product" &&
    d.mainImage?.asset?._ref?.startsWith("image-" + photoHash + "-") &&
    d.mainImage.fit !== "contain",
);
const missingCopy = {};
for (const [group, values] of Object.entries(defaults))
  for (const [key, value] of Object.entries(values)) {
    if (copy?.[group]?.[key] === undefined)
      missingCopy[group + "." + key] = value;
  }
const changes = {
  settingsFields: [
    ...Object.keys(fields),
    ...(needsVideo ? ["heroVideo"] : []),
  ],
  publishSettingsDraft: !!draft,
  copyFields: Object.keys(missingCopy).length,
  productImages: productVersions.length,
  productImageFit: fitVersions.length,
};
console.log(JSON.stringify({ mode: apply ? "apply" : "preview", ...changes }));
if (!apply) process.exit(0);
if (!process.env.SANITY_API_WRITE_TOKEN) throw Error("Write token required.");
const backupDir = path.join(root, ".playwright-mcp/backups");
fs.mkdirSync(backupDir, { recursive: true });
const backup = path.join(
  backupDir,
  "sanity-content-before-" + Date.now() + ".json",
);
fs.writeFileSync(backup, JSON.stringify(before, null, 2), { flag: "wx" });
if (needsVideo) {
  const asset = await client.assets.upload(
    "file",
    fs.createReadStream(
      path.join(root, "public/videos/hero-workshop-loop.mp4"),
    ),
    { filename: "novarampa-atolye-loop.mp4", contentType: "video/mp4" },
  );
  fields.heroVideo = {
    _type: "file",
    asset: { _type: "reference", _ref: asset._id },
  };
}
if (Object.keys(fields).length || draft) {
  let revision = base._rev;
  if (Object.keys(fields).length) {
    const updated = await client
      .patch(base._id)
      .ifRevisionId(revision)
      .set(fields)
      .commit();
    revision = updated._rev;
  }
  if (draft)
    await client.action({
      actionType: "sanity.action.document.publish",
      draftId: draft._id,
      publishedId: published._id,
      ifDraftRevisionId: revision,
      ifPublishedRevisionId: published._rev,
    });
  console.log("Settings completed and published.");
}
if (!copy) {
  await client.createIfNotExists({
    _id: "siteCopy",
    _type: "siteCopy",
    ...defaults,
  });
} else if (Object.keys(missingCopy).length) {
  // Fill missing objects first so dotted paths have valid parents.
  const groups = Object.fromEntries(
    Object.keys(defaults)
      .filter((g) => !copy[g])
      .map((g) => [g, defaults[g]]),
  );
  const leafFields = Object.fromEntries(
    Object.entries(missingCopy).filter(([p]) => !groups[p.split(".")[0]]),
  );
  await client
    .patch(copy._id)
    .ifRevisionId(copy._rev)
    .setIfMissing({ ...groups, ...leafFields })
    .commit();
}
if (productVersions.length) {
  const file = path.resolve(root, "public", imageSource.file.slice(1));
  if (!file.startsWith(path.join(root, "public", "products") + path.sep))
    throw Error("Invalid product image path.");
  const bytes = fs.readFileSync(file);
  if (createHash("sha256").update(bytes).digest("hex") !== imageSource.sha256)
    throw Error("Product image checksum changed.");
  const asset = await client.assets.upload("image", bytes, {
    filename: path.basename(file),
  });
  for (const doc of productVersions)
    await client
      .patch(doc._id)
      .ifRevisionId(doc._rev)
      .set({
        mainImage: {
          _type: "image",
          fit: "contain",
          asset: { _type: "reference", _ref: asset._id },
          alt: "Konteynere Geçiş Rampası — kaymaz yüzeyli çelik geçiş rampası",
        },
      })
      .commit();
}
for (const doc of fitVersions)
  await client
    .patch(doc._id)
    .ifRevisionId(doc._rev)
    .set({ "mainImage.fit": "contain" })
    .commit();
const after = await client.fetch(query, { ids });
const settings = after.find((d) => d._id === "siteSettings");
const currentCopy = after.find((d) => d._id === "siteCopy");
if (after.some((d) => d._id === "drafts.siteSettings"))
  throw Error("Settings draft still exists.");
if (
  !settings?.heroVideo?.asset ||
  !settings.homeFaqs?.length ||
  !settings.locations?.every(validLocation)
)
  throw Error("Settings completeness check failed.");
if (!currentCopy?.about?.body) throw Error("Site copy missing.");
if (!copy && currentCopy.about.body !== defaults.about.body)
  throw Error("About text changed.");
for (const original of before.filter((d) => d._type === "product")) {
  const current = after.find((d) => d._id === original._id);
  for (const key of Object.keys(original).filter(
    (k) => !["_rev", "_updatedAt", "mainImage"].includes(k),
  )) {
    if (normalize(original[key]) !== normalize(current?.[key]))
      throw Error("Unrelated product content changed: " + key);
  }
  if (!current?.mainImage?.asset) throw Error("Product image missing.");
}
for (const key of Object.keys(base).filter(
  (k) => !k.startsWith("_") && !Object.keys(fields).includes(k),
)) {
  if (normalize(base[key]) !== normalize(settings[key]))
    throw Error("Unrelated settings changed: " + key);
}
console.log(
  JSON.stringify({
    verified: true,
    faqs: settings.homeFaqs.length,
    locations: settings.locations.length,
    copyGroups: Object.keys(defaults).length,
    backup,
  }),
);
