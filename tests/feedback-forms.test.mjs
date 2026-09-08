import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import ts from "typescript";
const require = createRequire(import.meta.url);
const projectRoot = process.cwd();

// Compile the actual handlers in memory; only external delivery/catalog adapters are replaced.
// Tests never contact Sanity or send email.
function harness({ storageFails = false, mailFails = false } = {}) {
  const records = [];
  const emails = [];
  const modules = new Map();
  const adapters = {
    "next-sanity": {
      createClient: () => ({
        create: async (doc) => {
          if (storageFails) throw Error("storage unavailable");
          records.push(doc);
          return doc;
        },
      }),
    },
    resend: {
      Resend: class {
        emails = {
          send: async (message) => {
            emails.push(message);
            return mailFails
              ? { error: { message: "mail unavailable" } }
              : { data: { id: "test" } };
          },
        };
      },
    },
    "next/server": {
      NextResponse: { json: (body, init) => Response.json(body, init) },
    },
    "@/lib/catalog": {
      getProducts: async () => [{ name: "Mobil Rampa" }],
      getSpareParts: async () => [
        { name: "Kontrol Panosu" },
        { name: "Rampa Takozu" },
      ],
    },
  };
  function load(spec) {
    if (spec in adapters) return adapters[spec];
    if (!spec.startsWith("@/")) return require(spec);
    const filename =
      path.join(projectRoot, "src", spec.slice(2)) +
      (spec.endsWith(".json") ? "" : ".ts");
    if (filename.endsWith(".json"))
      return JSON.parse(fs.readFileSync(filename, "utf8"));
    if (modules.has(filename)) return modules.get(filename).exports;
    const compiledModule = { exports: {} };
    modules.set(filename, compiledModule);
    const code = ts.transpileModule(fs.readFileSync(filename, "utf8"), {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2022,
        esModuleInterop: true,
      },
    }).outputText;
    new Function("require", "compiledModule", "exports", code)(
      load,
      compiledModule,
      compiledModule.exports,
    );
    return compiledModule.exports;
  }
  return {
    records,
    emails,
    support: load("@/lib/support-request-handler").handleSupportRequest,
    quote: load("@/app/api/quote/route").POST,
  };
}
const service = {
  fullName: "Form Test",
  phone: "05340000000",
  email: "",
  requestKind: "service",
  city: "İstanbul",
  district: "Kadıköy",
  brand: "novarampa",
  serialNumber: "NR-123",
  productType: "Mobil Rampa",
  issueDescription: "Hidrolik sistem için örnek talep.",
  preferredDate: "2026-10-01",
};
const request = (data) =>
  new Request("http://localhost/api/test", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
const envKeys = [
  "NEXT_PUBLIC_SANITY_PROJECT_ID",
  "SANITY_API_WRITE_TOKEN",
  "RESEND_API_KEY",
];
const previous = Object.fromEntries(
  envKeys.map((key) => [key, process.env[key]]),
);
test.beforeEach(() => {
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID = "testproject";
  process.env.SANITY_API_WRITE_TOKEN = "mock-only";
  delete process.env.RESEND_API_KEY;
});
test.after(() => {
  for (const key of envKeys) {
    if (previous[key] === undefined) delete process.env[key];
    else process.env[key] = previous[key];
  }
});
test("service persists location and Novarampa serial number", async () => {
  const h = harness();
  const res = await h.support(request(service), "service");
  assert.equal(res.status, 200);
  assert.equal(h.records[0]._type, "serviceRequest");
  assert.equal(h.records[0].district, "Kadıköy");
  assert.equal(h.records[0].serialNumber, "NR-123");
  assert.equal(h.records[0].preferredDate, "2026-10-01");
  assert.equal("website" in h.records[0], false);
});
test("other brand requires its name and strips stale serial number", async () => {
  const h = harness();
  assert.equal(
    (await h.support(request({ ...service, brand: "other" }), "service"))
      .status,
    400,
  );
  const res = await h.support(
    request({ ...service, brand: "other", brandName: "Başka marka" }),
    "service",
  );
  assert.equal(res.status, 200);
  assert.equal(h.records[0].brandName, "Başka marka");
  assert.equal(h.records[0].serialNumber, undefined);
});
test("unknown brand does not retain hidden fields", async () => {
  const h = harness();
  await h.support(
    request({ ...service, brand: "unknown", brandName: "Eski değer" }),
    "service",
  );
  assert.equal(h.records[0].serialNumber, undefined);
  assert.equal(h.records[0].brandName, undefined);
});
test("spare parts use their own record type and never retain a preferred date", async () => {
  const h = harness();
  const res = await h.support(
    request({
      ...service,
      requestKind: "service",
      sparePart: "Kontrol Panosu",
    }),
    "sparePart",
  );
  assert.equal(res.status, 200);
  assert.equal(h.records[0]._type, "sparePartRequest");
  assert.equal(h.records[0].sparePart, "Kontrol Panosu");
  assert.equal(h.records[0].preferredDate, undefined);
});
test("missing/deleted spare parts and cross-province districts are rejected", async () => {
  const h = harness();
  for (const data of [
    { ...service },
    { ...service, sparePart: "Lastik Flap" },
    { ...service, sparePart: "Kontrol Panosu", district: "Çankaya" },
  ])
    assert.equal((await h.support(request(data), "sparePart")).status, 400);
  assert.equal(h.records.length, 0);
});
test("removed product types cannot be submitted to support", async () => {
  const h = harness();
  assert.equal(
    (
      await h.support(
        request({ ...service, productType: "Makaslı Platform" }),
        "service",
      )
    ).status,
    400,
  );
  assert.equal(h.records.length, 0);
});
test("malformed JSON and honeypot never create records", async () => {
  const h = harness();
  assert.equal(
    (
      await h.support(
        new Request("http://localhost", { method: "POST", body: "{" }),
        "service",
      )
    ).status,
    400,
  );
  assert.equal(
    (await h.support(request({ ...service, website: "bot" }), "service"))
      .status,
    200,
  );
  assert.equal(h.records.length, 0);
});
test("quote keeps capacity and quantity while removing retired fields", async () => {
  const h = harness();
  const res = await h.quote(
    request({
      fullName: "Form Test",
      phone: "05340000000",
      quantity: 2,
      capacity: "6 ton",
      sector: "Eski sektör",
      dimensions: "Eski ölçü",
      website: "",
    }),
  );
  assert.equal(res.status, 200);
  assert.equal(h.records[0].capacity, "6 ton");
  assert.equal(h.records[0].quantity, 2);
  assert.equal("sector" in h.records[0], false);
  assert.equal("dimensions" in h.records[0], false);
});
test("missing delivery configuration reports failure", async () => {
  delete process.env.SANITY_API_WRITE_TOKEN;
  const h = harness();
  assert.equal((await h.support(request(service), "service")).status, 503);
  assert.equal(h.records.length, 0);
});
test("storage failure can fall back to mail with complete spare-part details", async () => {
  process.env.RESEND_API_KEY = "mock-only";
  const h = harness({ storageFails: true });
  assert.equal(
    (
      await h.support(
        request({
          ...service,
          brand: "other",
          brandName: "Diğer Üretici",
          sparePart: "Kontrol Panosu",
        }),
        "sparePart",
      )
    ).status,
    200,
  );
  assert.match(h.emails[0].text, /İstanbul \/ Kadıköy/);
  assert.match(h.emails[0].text, /Kontrol Panosu/);
  assert.match(h.emails[0].text, /Diğer Üretici/);
  assert.doesNotMatch(h.emails[0].text, /Tercih Edilen Tarih/);
});
test("mail failure after a saved request does not invite duplicate submission", async () => {
  process.env.RESEND_API_KEY = "mock-only";
  const h = harness({ mailFails: true });
  assert.equal((await h.support(request(service), "service")).status, 200);
  assert.equal(h.records.length, 1);
});
test("both delivery failures return a retryable failure", async () => {
  process.env.RESEND_API_KEY = "mock-only";
  const h = harness({ storageFails: true, mailFails: true });
  assert.equal((await h.support(request(service), "service")).status, 503);
});
