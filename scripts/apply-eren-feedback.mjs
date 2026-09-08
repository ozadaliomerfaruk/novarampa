/**
 * Eren feedback 15/17. Default: inspect only; --apply backs up then applies exact IDs.
 * Run from repo root: node --env-file=.env.local scripts/apply-eren-feedback.mjs [--apply]
 * Never runs as part of build/deploy.
 */
import fs from "node:fs";
import { createClient } from "@sanity/client";
const targets = new Map([
  ["sparePart-elik-halat", "Rampa Takozu"],
  ["sparePart-lastik-flap", "Lastik Flap"],
  ["sparePart-kap-contas", "Kapı Contası"],
  ["sparePart-arpma-tamponu", "Çarpma Tamponu"],
  ["sparePart-k-e-koruyucu", "Köşe Koruyucu"],
]);
const productId = "product-makasli-platform";
const token = process.env.SANITY_API_WRITE_TOKEN;
if (!token) throw new Error("SANITY_API_WRITE_TOKEN eksik.");
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2025-01-01",
  token,
  useCdn: false,
  perspective: "raw",
});
const ids = [...targets.keys(), productId];
const docs = await client.fetch("*[_id in $ids]", {
  ids: [...ids, ...ids.map((id) => "drafts." + id)],
});
const protectedPart = await client.getDocument("sparePart-yay-sistemi");
if (protectedPart?.name !== "Rampa Takozu" || !protectedPart.image?.asset)
  throw new Error(
    "Korunacak fotoğraflı Rampa Takozu beklenen kayıtla eşleşmiyor.",
  );
const removals = docs.filter((d) =>
  targets.has(d._id.replace(/^drafts\./, "")),
);
for (const d of removals) {
  const expected = targets.get(d._id.replace(/^drafts\./, ""));
  const emptyDraft =
    d._id.startsWith("drafts.") &&
    !d.name &&
    !d.slug?.current &&
    !d.description &&
    docs.some(
      (p) => p._id === d._id.replace(/^drafts\./, "") && p.name === expected,
    );
  if (
    d._type !== "sparePart" ||
    (!emptyDraft && d.name !== expected) ||
    d.image?.asset
  )
    throw new Error("Kayıt değişmiş; silme durduruldu: " + d._id);
}
console.log(
  JSON.stringify(
    {
      remove: removals.map((d) => ({ id: d._id, name: d.name })),
      hide: docs.filter((d) => d._type === "product").map((d) => d._id),
      preserve: protectedPart._id,
    },
    null,
    2,
  ),
);
if (process.argv.includes("--apply")) {
  const backup =
    ".playwright-mcp/cms-eren-backup-" +
    new Date().toISOString().replace(/[:.]/g, "-") +
    ".json";
  fs.mkdirSync(".playwright-mcp", { recursive: true });
  fs.writeFileSync(backup, JSON.stringify({ docs, protectedPart }, null, 2), {
    flag: "wx",
  });
  let tx = client.transaction();
  for (const d of removals)
    tx = tx
      .patch(d._id, (p) =>
        p.ifRevisionId(d._rev).set({ feedbackRemoval: true }),
      )
      .delete(d._id);
  for (const d of docs.filter(
    (d) => d._type === "product" && d.visible !== false,
  ))
    tx = tx.patch(d._id, (p) => p.ifRevisionId(d._rev).set({ visible: false }));
  if (tx.serialize().length) await tx.commit();
  const remaining = await client.fetch("*[_id in $ids]{_id,visible}", {
    ids: [
      ...targets.keys(),
      ...Array.from(targets.keys(), (id) => "drafts." + id),
    ],
  });
  const preserved = await client.getDocument(protectedPart._id);
  if (remaining.length || preserved?._rev !== protectedPart._rev)
    throw new Error("Son kontrol başarısız.");
  console.log(
    "Doğrulandı: 5 fazla ürün kaldırıldı; fotoğraflı Rampa Takozu değişmedi. Yedek: " +
      backup,
  );
}
