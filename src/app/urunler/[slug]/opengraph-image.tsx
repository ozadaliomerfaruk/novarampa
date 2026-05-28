import { ImageResponse } from "next/og";
import { sanityFetch } from "@/sanity/lib/fetch";
import { productBySlugQuery } from "@/sanity/lib/queries";
import { productCategories } from "@/lib/products";
import type { Product } from "@/sanity/lib/types";

/**
 * Per-product OG image — her ürün sayfasının kendine özel sosyal medya görseli.
 * URL: /urunler/<slug>/opengraph-image
 *
 * Sanity'den ürün adı + tagline + kapasiteleri çeker; yoksa hardcoded fallback.
 */
// Node runtime — Sanity'den veri çeker; edge env-inlining sorununu önler.
export const alt = "Nova Rampa Ürünü";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function ProductOGImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const sanityProduct = await sanityFetch<Product>(productBySlugQuery, {
    slug,
  });
  const fallback = productCategories.find((p) => p.slug === slug);

  const name = sanityProduct?.name ?? fallback?.name ?? "Yükleme Rampası";
  const tagline =
    sanityProduct?.tagline ??
    fallback?.tagline ??
    "Endüstriyel yükleme çözümleri";
  const capacities =
    sanityProduct?.capacities ?? fallback?.capacities ?? [];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background:
            "linear-gradient(135deg, #142235 0%, #1c2f47 60%, #142235 100%)",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "30%",
            right: "-10%",
            width: "560px",
            height: "560px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(249,115,22,0.28) 0%, transparent 70%)",
          }}
        />

        {/* Top: brand mark + product label */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            zIndex: 1,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "10px",
                background: "#F97316",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "28px",
                fontWeight: 800,
                color: "white",
                letterSpacing: "-0.04em",
              }}
            >
              N
            </div>
            <div
              style={{
                fontSize: "24px",
                fontWeight: 700,
                color: "white",
                letterSpacing: "0.08em",
              }}
            >
              NOVARAMPA
            </div>
          </div>
          <div
            style={{
              padding: "10px 18px",
              borderRadius: "999px",
              border: "1px solid rgba(249,115,22,0.4)",
              background: "rgba(249,115,22,0.1)",
              color: "#F97316",
              fontSize: "18px",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.15em",
            }}
          >
            Ürün
          </div>
        </div>

        {/* Center: product name + tagline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            zIndex: 1,
            maxWidth: "920px",
          }}
        >
          <div
            style={{
              fontSize: "76px",
              fontWeight: 800,
              color: "white",
              lineHeight: 1.02,
              letterSpacing: "-0.03em",
            }}
          >
            {name}
          </div>
          <div
            style={{
              fontSize: "28px",
              fontWeight: 400,
              color: "rgba(255,255,255,0.78)",
              lineHeight: 1.4,
              maxWidth: "820px",
            }}
          >
            {tagline}
          </div>
        </div>

        {/* Bottom: capacities + URL */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            zIndex: 1,
          }}
        >
          <div style={{ display: "flex", gap: "10px" }}>
            {capacities.slice(0, 4).map((cap) => (
              <div
                key={cap}
                style={{
                  padding: "10px 18px",
                  borderRadius: "999px",
                  border: "1px solid rgba(255,255,255,0.18)",
                  background: "rgba(255,255,255,0.06)",
                  color: "white",
                  fontSize: "20px",
                  fontWeight: 600,
                  fontFamily: "monospace",
                }}
              >
                {cap}
              </div>
            ))}
          </div>
          <div
            style={{
              fontSize: "22px",
              fontWeight: 600,
              color: "rgba(255,255,255,0.65)",
              fontFamily: "monospace",
            }}
          >
            novarampa.com
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
