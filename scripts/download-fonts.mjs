import fs from "node:fs/promises";
import { createHash } from "node:crypto";
const directory = "src/app/fonts";
await fs.mkdir(directory, { recursive: true });
const points = new Set();
for (const [from, to] of [
  [0x20, 0x7e],
  [0xa0, 0xff],
])
  for (let p = from; p <= to; p++) points.add(p);
for (const p of [
  286, 287, 304, 305, 350, 351, 338, 339, 376, 402, 8211, 8212, 8216, 8217,
  8218, 8220, 8221, 8222, 8224, 8225, 8226, 8230, 8240, 8364, 8378, 8482, 8722,
  8804, 8805,
])
  points.add(p);
const text = String.fromCodePoint(...points);
const manifest = [];
for (const font of [
  {
    family: "Open Sans",
    range: "400..700",
    file: "open-sans-latin-tr.woff2",
    folder: "opensans",
  },
  {
    family: "Work Sans",
    range: "400..900",
    file: "work-sans-latin-tr.woff2",
    folder: "worksans",
  },
  {
    family: "JetBrains Mono",
    range: "100..800",
    file: "jetbrains-mono-latin-tr.woff2",
    folder: "jetbrainsmono",
  },
]) {
  const url = new URL("https://fonts.googleapis.com/css2");
  url.searchParams.set("family", font.family + ":wght@" + font.range);
  url.searchParams.set("display", "swap");
  url.searchParams.set("text", text);
  const response = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36",
    },
  });
  if (!response.ok) throw new Error(font.family + " CSS " + response.status);
  const css = await response.text();
  const match = css.match(/src: url\(([^)]+)\) format\('woff2'\)/);
  if (!match) throw new Error("Expected variable WOFF2: " + css.slice(0, 400));
  const data = await fetch(match[1]);
  if (!data.ok) throw new Error(font.family + " binary " + data.status);
  const buffer = Buffer.from(await data.arrayBuffer());
  if (buffer.toString("ascii", 0, 4) !== "wOF2")
    throw new Error("Invalid WOFF2");
  await fs.writeFile(directory + "/" + font.file, buffer);
  const licenseURL =
    "https://raw.githubusercontent.com/google/fonts/main/ofl/" +
    font.folder +
    "/OFL.txt";
  const license = await fetch(licenseURL);
  if (!license.ok) throw new Error("Missing license: " + licenseURL);
  await fs.writeFile(
    directory + "/" + font.folder + "-OFL.txt",
    await license.text(),
  );
  manifest.push({
    ...font,
    bytes: buffer.length,
    sha256: createHash("sha256").update(buffer).digest("hex"),
    source: url.href,
    license: licenseURL,
  });
  console.log(font.family, buffer.length, "bytes");
}
await fs.writeFile(
  directory + "/sources.json",
  JSON.stringify(manifest, null, 2) + "\n",
);
