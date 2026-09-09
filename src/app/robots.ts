import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

export default function robots(): MetadataRoute.Robots {
  return {
    // The common rule also covers search/AI crawlers without overriding exclusions.
    // robots.txt is a crawl instruction, not access control.
    rules: { userAgent: "*", allow: "/", disallow: ["/studio", "/api"] },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
