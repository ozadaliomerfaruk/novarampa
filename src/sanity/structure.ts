import type { StructureResolver } from "sanity/structure";
import {
  CogIcon,
  PackageIcon,
  DocumentTextIcon,
  StarIcon,
  WrenchIcon,
  CommentIcon,
  HomeIcon,
  HelpCircleIcon,
  DocumentIcon,
  EyeOpenIcon,
  EyeClosedIcon,
  ArchiveIcon,
} from "@sanity/icons";
import { HelpComponent } from "./help-component";

/**
 * Sanity Studio sol menüsü — Eren'in günlük kullanacağı içerik panelinin yapısı.
 *
 * Grup mantığı:
 *  1) 🏠 Anasayfa İçeriği — site genelinde değişen şeyler (hero, atölye fotoları, vb)
 *  2) 📦 Katalog — Ürünler, Yedek Parça, Referanslar
 *  3) ✍️ Yazılar — Blog
 *  4) 📨 Gelen Talepler — Form gönderimleri (okunma takibi)
 *  5) ❓ Yardım — Eren için adım adım rehber
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Nova Rampa İçerik Yönetimi")
    .items([
      // ─── 1) Anasayfa İçeriği ───
      S.listItem()
        .title("🏠 Anasayfa İçeriği")
        .icon(HomeIcon)
        .child(
          S.list()
            .title("Anasayfa İçeriği")
            .items([
              S.listItem()
                .title("Site Ayarları")
                .icon(CogIcon)
                .child(
                  S.editor()
                    .id("settings")
                    .schemaType("settings")
                    .documentId("siteSettings")
                    .title("Site Ayarları")
                ),
            ])
        ),

      S.divider(),

      // ─── 2) Katalog ───
      S.listItem()
        .title("📦 Ürünler")
        .icon(PackageIcon)
        .child(
          S.documentTypeList("product")
            .title("Ürünler")
            .defaultOrdering([{ field: "orderRank", direction: "asc" }])
        ),
      S.listItem()
        .title("🔧 Yedek Parçalar")
        .icon(WrenchIcon)
        .child(
          S.documentTypeList("sparePart")
            .title("Yedek Parçalar")
            .defaultOrdering([{ field: "orderRank", direction: "asc" }])
        ),
      S.listItem()
        .title("⭐ Referanslar / Projeler")
        .icon(StarIcon)
        .child(
          S.documentTypeList("referenceCompany").title("Referanslar / Projeler")
        ),

      S.divider(),

      // ─── 3) Yazılar & Sayfalar ───
      S.listItem()
        .title("✍️ Blog Yazıları")
        .icon(DocumentTextIcon)
        .child(
          S.documentTypeList("blogPost")
            .title("Blog Yazıları")
            .defaultOrdering([
              { field: "publishedAt", direction: "desc" },
            ])
        ),
      S.listItem()
        .title("📄 Özel Sayfalar")
        .icon(DocumentIcon)
        .child(
          S.list()
            .title("Özel Sayfalar")
            .items([
              S.listItem()
                .title("Tüm Sayfalar")
                .icon(DocumentIcon)
                .child(
                  S.documentTypeList("page")
                    .title("Tüm Özel Sayfalar")
                    .defaultOrdering([
                      { field: "status", direction: "asc" },
                      { field: "navbarOrder", direction: "asc" },
                    ])
                ),
              S.listItem()
                .title("🟢 Yayında Olanlar")
                .icon(EyeOpenIcon)
                .child(
                  S.documentList()
                    .title("Yayında Olan Sayfalar")
                    .filter('_type == "page" && status == "published"')
                    .defaultOrdering([
                      { field: "navbarOrder", direction: "asc" },
                    ])
                ),
              S.listItem()
                .title("🟡 Taslaklar")
                .icon(EyeClosedIcon)
                .child(
                  S.documentList()
                    .title("Taslak Sayfalar")
                    .filter('_type == "page" && status == "draft"')
                ),
              S.listItem()
                .title("⚫ Arşivli")
                .icon(ArchiveIcon)
                .child(
                  S.documentList()
                    .title("Arşivli Sayfalar")
                    .filter('_type == "page" && status == "archived"')
                ),
            ])
        ),

      S.divider(),

      // ─── 4) Gelen Talepler ───
      S.listItem()
        .title("📨 Teklif Talepleri")
        .icon(CommentIcon)
        .child(
          S.documentTypeList("quoteRequest")
            .title("Teklif Talepleri")
            .defaultOrdering([
              { field: "submittedAt", direction: "desc" },
            ])
        ),
      S.listItem()
        .title("🛠️ Servis Talepleri")
        .icon(WrenchIcon)
        .child(
          S.documentTypeList("serviceRequest")
            .title("Servis Talepleri")
            .defaultOrdering([
              { field: "submittedAt", direction: "desc" },
            ])
        ),

      S.divider(),

      // ─── 5) Yardım ───
      S.listItem()
        .title("❓ Nereden Başlamalıyım?")
        .icon(HelpCircleIcon)
        .child(
          S.component(HelpComponent)
            .id("help-guide")
            .title("Eren için Hızlı Rehber")
        ),
    ]);
