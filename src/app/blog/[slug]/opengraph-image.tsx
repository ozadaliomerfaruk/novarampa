import { ImageResponse } from "next/og";
import { sanityFetch } from "@/sanity/lib/fetch";
import { blogPostBySlugQuery } from "@/sanity/lib/queries";
import type { BlogPost } from "@/sanity/lib/types";

/**
 * Per-blog OG image — her blog yazısının kendine özel sosyal medya görseli.
 * URL: /blog/<slug>/opengraph-image
 */
// Node runtime — Sanity'den veri çeker; edge env-inlining sorununu önler.
export const alt = "Nova Rampa Blog Yazısı";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function BlogOGImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await sanityFetch<BlogPost>(blogPostBySlugQuery, {
    slug,
  });

  const title = post?.title ?? "Nova Rampa Blog";
  const excerpt =
    post?.excerpt ?? "Yükleme rampası dünyasından rehber yazılar";
  const author = post?.author ?? "Nova Rampa";
  const readTime = post?.readTime ?? null;

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
            "linear-gradient(135deg, #142235 0%, #1c2f47 50%, #142235 100%)",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            bottom: "10%",
            left: "-10%",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(249,115,22,0.22) 0%, transparent 70%)",
          }}
        />

        {/* Top: brand + tag */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            zIndex: 1,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
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
              NOVARAMPA · BLOG
            </div>
          </div>
          {readTime !== null && (
            <div
              style={{
                fontSize: "18px",
                fontWeight: 500,
                color: "rgba(255,255,255,0.65)",
                fontFamily: "monospace",
              }}
            >
              ~{readTime} dk okuma
            </div>
          )}
        </div>

        {/* Center: title + excerpt */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
            zIndex: 1,
            maxWidth: "1000px",
          }}
        >
          <div
            style={{
              fontSize: title.length > 60 ? "60px" : "72px",
              fontWeight: 800,
              color: "white",
              lineHeight: 1.05,
              letterSpacing: "-0.025em",
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: "24px",
              fontWeight: 400,
              color: "rgba(255,255,255,0.75)",
              lineHeight: 1.5,
              maxWidth: "900px",
            }}
          >
            {excerpt.length > 200 ? excerpt.slice(0, 200) + "..." : excerpt}
          </div>
        </div>

        {/* Bottom: author */}
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
              fontSize: "20px",
              fontWeight: 500,
              color: "rgba(255,255,255,0.8)",
            }}
          >
            ✍️ {author}
          </div>
          <div
            style={{
              fontSize: "22px",
              fontWeight: 600,
              color: "rgba(255,255,255,0.65)",
              fontFamily: "monospace",
            }}
          >
            novarampa.com/blog
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
