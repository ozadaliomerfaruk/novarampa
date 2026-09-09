# Site fonts

The site uses Open Sans (body, 400–700), Work Sans (headings, 400–900) and JetBrains Mono (annotations, 400–700). The NOVARAMPA wordmark remains the existing Baskerville SVG.

These local variable WOFF2 files preserve ASCII, Latin-1, Turkish letters and common punctuation/currency characters. Characters outside this subset use the browser fallback. Do not subset to current page text: Sanity content must remain editable.

The original Google Fonts subsets and their SIL Open Font License files were downloaded from the official endpoints recorded in sources.json. The manifest records source and optimized SHA-256 hashes and byte sizes. Each license is kept next to the binary.

## Regenerate

Run from the repository root:

```sh
node scripts/download-fonts.mjs
uv run --with "fonttools[woff]" --with brotli python scripts/optimize-fonts.py
```

The second step removes hinting data, preserves character coverage, and restricts the variable weight axes to the ranges actually used by the site. It checks all Turkish letters before saving. No font package is needed at application runtime or during deployment: Next.js serves the checked-in files through next/font/local with hashed, cacheable URLs.

Only the two fonts used for main text/headings are preloaded. The small annotation font loads on demand. All three use optional display so slow first visits keep the metric-adjusted fallback instead of swapping text late; cached visits use the brand fonts immediately. Google Fonts receives no visitor requests and is no longer a build-time network dependency.

After regeneration, run the production build and visually check Turkish headings, normal/bold text, narrow mobile layouts and the blog date line. Record a fresh mobile performance measurement.
