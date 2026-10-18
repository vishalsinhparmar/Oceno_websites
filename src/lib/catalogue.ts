import {
  filterGroups,
  type CatalogueProduct,
  type CategoryId,
  type CollectionId,
  type FinishId,
  type InstallationId,
  type MaterialId,
  type SortId,
} from "@/config/products";

export type Filters = {
  category: CategoryId[];
  finish: FinishId[];
  installation: InstallationId[];
  material: MaterialId[];
  collection: CollectionId[];
  width: [number, number];
};

export type ListGroup = "category" | "finish" | "installation" | "material" | "collection";

export const emptyFilters: Filters = {
  category: [],
  finish: [],
  installation: [],
  material: [],
  collection: [],
  width: [filterGroups.size.min, filterGroups.size.max],
};

export function widthActive(filters: Filters) {
  return filters.width[0] > filterGroups.size.min || filters.width[1] < filterGroups.size.max;
}

export function filtersEqual(a: Filters, b: Filters) {
  return JSON.stringify(a) === JSON.stringify(b);
}

export function toggleValue<T>(list: readonly T[], value: T): T[] {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}

/** Values within a group are OR-ed; groups are AND-ed. */
export function applyFilters(products: CatalogueProduct[], filters: Filters, query: string) {
  const q = query.trim().toLowerCase();
  return products.filter((p) => {
    if (filters.category.length && !filters.category.includes(p.categoryId)) return false;
    if (filters.finish.length && !filters.finish.includes(p.finishId)) return false;
    if (filters.installation.length && !filters.installation.includes(p.installation)) return false;
    if (filters.material.length && !filters.material.includes(p.material)) return false;
    if (filters.collection.length && !filters.collection.includes(p.collection)) return false;
    if (p.width < filters.width[0] || p.width > filters.width[1]) return false;
    if (q && ![p.name, p.category, p.finish, p.size, p.id].some((v) => v.toLowerCase().includes(q))) return false;
    return true;
  });
}

export function sortProducts(products: CatalogueProduct[], sort: SortId) {
  const list = [...products];
  switch (sort) {
    case "newest":
      return list.sort((a, b) => Number(b.badge === "new") - Number(a.badge === "new") || a.rank - b.rank);
    case "name":
      return list.sort((a, b) => a.name.localeCompare(b.name));
    case "width-asc":
      return list.sort((a, b) => a.width - b.width);
    case "width-desc":
      return list.sort((a, b) => b.width - a.width);
    default:
      return list.sort((a, b) => a.rank - b.rank);
  }
}

/** Removable chips for every applied filter value, in sidebar order. */
export function activeChips(filters: Filters) {
  const chips: { key: string; label: string; group: ListGroup | "width"; value?: string }[] = [];
  (["category", "finish", "installation", "material", "collection"] as const).forEach((group) => {
    const options = filterGroups[group].options as { id: string; label: string }[];
    options.forEach((o) => {
      if ((filters[group] as string[]).includes(o.id)) chips.push({ key: `${group}:${o.id}`, label: o.label, group, value: o.id });
    });
  });
  if (widthActive(filters)) {
    chips.push({ key: "width", label: `${filters.width[0]}–${filters.width[1]} mm`, group: "width" });
  }
  return chips;
}

/** One-line summary under the result count, e.g. "Table-Top & Designer Art Basins · Glossy White". */
export function summarise(filters: Filters, query: string) {
  const labels = (group: ListGroup) =>
    (filterGroups[group].options as { id: string; label: string }[])
      .filter((o) => (filters[group] as string[]).includes(o.id))
      .map((o) => o.label);

  const parts: string[] = [];
  const cats = labels("category");
  if (cats.length === 2 && cats.every((c) => c.endsWith(" Basins"))) {
    parts.push(`${cats[0].replace(/ Basins$/, "")} & ${cats[1]}`);
  } else if (cats.length) {
    parts.push(cats.join(", "));
  }
  parts.push(...labels("finish"), ...labels("installation"), ...labels("material"), ...labels("collection"));
  if (widthActive(filters)) parts.push(`${filters.width[0]}–${filters.width[1]} mm wide`);
  if (query.trim()) parts.push(`“${query.trim()}”`);
  return parts.length ? parts.join(" · ") : "All collections · Every finish · Any installation";
}
