import type { MetadataRoute } from "next";
import { siteConfig, company } from "@/lib/site-config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: company.name,
    short_name: company.brand,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#0A0A0A",
    theme_color: "#0A0A0A",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    lang: "tr",
    dir: "ltr",
    orientation: "portrait",
  };
}
