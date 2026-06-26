import type { Testimonial } from "./types";

export function parseTestimonials(values: string[][]): Testimonial[] {
  if (!values || values.length === 0) return [];

  const rows = values.slice(1); // skip header
  const seen = new Set<string>();

  return rows
    .map((row, index) => {
      const title = (row?.[0] ?? "").trim();
      const cat = (row?.[1] ?? "").trim();
      const image = (row?.[2] ?? "").trim();

      return {
        id: index + 1,
        title,
        cat,
        image,
      };
    })
    .filter((item) => item.title || item.cat || item.image);
}
