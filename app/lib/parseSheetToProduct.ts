import type { ProductDetail, ProductDetailExtended } from "./types";

export const FALLBACK_PRODUCT: ProductDetail = {
  name: "Lorem ipsum dolor sit amet",
  tech: [],
  price: "Lorem Ipsum is simply dummy text",
  shortDesc: "Lorem Ipsum is simply dummy text",
  longDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
  image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
  features: [],
  specs: [
    { label: "xxx", value: "xxx" },
    { label: "xxx", value: "xxx" },
    { label: "xxx", value: "xxx" },
    { label: "xxx", value: "xxx" },
  ],
  images: []
};



function normalizeKey(key: string) {
  return key.trim().toLowerCase();
}

function parseSheetToProduct(values: string[][]): ProductDetail {
  const result: ProductDetail = {
    name: "",
    tech: [],
    price: "",
    shortDesc: "",
    longDesc: "",
    image: "",
    features: [],
    specs: [],
    images: []
  };

  for (const row of values) {
    if (!row || row.length === 0) continue;

    const key = (row[0] ?? "").trim();
    const rest = row
      .slice(1)
      .map((item) => (item ?? "").trim())
      .filter(Boolean);

    if (!key) continue;

    const lowerKey = normalizeKey(key);

    switch (lowerKey) {
      case "name":
        result.name = rest[0] ?? "";
        break;

      case "price":
        result.price = rest[0] ?? "";
        break;

      case "shortdesc":
        result.shortDesc = rest[0] ?? "";
        break;

      case "longdesc":
        result.longDesc = rest[0] ?? "";
        break;

      case "image":
        result.image = rest[0] ?? "";
        break;

      case "tech":
      case "category":
      case "tag":
      case "tags":
        result.tech = rest;
        break;

      case "features":
      case "feature":
      case "specs":
        result.features = rest;
        break;

      default: {
        const value = rest.join(" ");
        if (value) {
          result.specs.push({
            label: key,
            value,
          });
        }
        break;
      }
    }
  }

  return {
    ...result,
    tech: result.tech.length > 0 ? result.tech : FALLBACK_PRODUCT.tech,
    price: result.price || FALLBACK_PRODUCT.price,
    name: result.name || FALLBACK_PRODUCT.name,
    shortDesc: result.shortDesc || FALLBACK_PRODUCT.shortDesc,
    longDesc: result.longDesc || FALLBACK_PRODUCT.longDesc,
    image: result.image || FALLBACK_PRODUCT.image,
    features:
      result.features.length > 0 ? result.features : FALLBACK_PRODUCT.features,
    specs: result.specs.length > 0 ? result.specs : FALLBACK_PRODUCT.specs,
  };
}

export function parseSheetToProductExtended(values: string[][]): ProductDetailExtended {
  const base = parseSheetToProduct(values);

  const imagesRow = values.find((row) => row[0] === "images");
  const images = imagesRow ? imagesRow.slice(1).filter(Boolean) : [];

  return { ...base, images };
}
