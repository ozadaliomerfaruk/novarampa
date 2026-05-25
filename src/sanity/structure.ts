import type { StructureResolver } from "sanity/structure";
import {
  CogIcon,
  PackageIcon,
  DocumentTextIcon,
  StarIcon,
  WrenchIcon,
  CommentIcon,
} from "@sanity/icons";

// Sol menünün düzenli görünmesi için.
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Nova Rampa İçerik Yönetimi")
    .items([
      S.listItem()
        .title("Site Ayarları")
        .icon(CogIcon)
        .child(
          S.editor()
            .id("settings")
            .schemaType("settings")
            .documentId("siteSettings")
        ),
      S.divider(),
      S.listItem()
        .title("Ürünler")
        .icon(PackageIcon)
        .child(S.documentTypeList("product").title("Ürünler")),
      S.listItem()
        .title("Yedek Parçalar")
        .icon(WrenchIcon)
        .child(S.documentTypeList("sparePart").title("Yedek Parçalar")),
      S.listItem()
        .title("Referanslar")
        .icon(StarIcon)
        .child(S.documentTypeList("reference").title("Referanslar")),
      S.divider(),
      S.listItem()
        .title("Blog Yazıları")
        .icon(DocumentTextIcon)
        .child(S.documentTypeList("blogPost").title("Blog Yazıları")),
      S.divider(),
      S.listItem()
        .title("Teklif Talepleri")
        .icon(CommentIcon)
        .child(S.documentTypeList("quoteRequest").title("Teklif Talepleri")),
      S.listItem()
        .title("Servis Talepleri")
        .icon(WrenchIcon)
        .child(S.documentTypeList("serviceRequest").title("Servis Talepleri")),
    ]);
