import type { SchemaTypeDefinition } from "sanity";

import { productType } from "./product";
import { blogPostType } from "./blogPost";
import { referenceType } from "./reference";
import { sparePartType } from "./sparePart";
import { pageType } from "./page";
import { serviceRequestType } from "./serviceRequest";
import { sparePartRequestType } from "./sparePartRequest";
import { quoteRequestType } from "./quoteRequest";
import { settingsType } from "./settings";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    settingsType,
    productType,
    blogPostType,
    referenceType,
    sparePartType,
    pageType,
    serviceRequestType,
    sparePartRequestType,
    quoteRequestType,
  ],
};
