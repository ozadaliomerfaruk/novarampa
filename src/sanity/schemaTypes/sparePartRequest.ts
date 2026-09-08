import { defineField, defineType } from "sanity";
import { serviceRequestType } from "./serviceRequest";
export const sparePartRequestType = defineType({
  ...serviceRequestType,
  name: "sparePartRequest",
  title: "Yedek Parça Talebi",
  fields: [
    ...serviceRequestType.fields
      .filter((field) => field.name !== "preferredDate")
      .map((field) =>
        field.name === "issueDescription"
          ? { ...field, title: "Talep Açıklaması" }
          : field,
      ),
    defineField({
      name: "sparePart",
      title: "Talep Edilen Yedek Parça",
      type: "string",
    }),
  ],
});
