import { useState } from "react";
import Listing from "@/components/sections/products/Listing";
import ProductsHero from "@/components/sections/products/ProductsHero";
import type { CategoryId } from "@/config/products";
import { emptyFilters, type Filters } from "@/lib/catalogue";

/** Products page: the hero's search and category tabs drive the listing filters. */
export default function ProductsPage() {
  const [filters, setFilters] = useState<Filters>(emptyFilters);
  const [query, setQuery] = useState("");

  const activeCategory =
    filters.category.length === 0 ? "all" : filters.category.length === 1 ? filters.category[0] : null;

  const selectCategory = (id: CategoryId | "all") => {
    setFilters({ ...filters, category: id === "all" ? [] : [id] });
  };

  return (
    <>
      <ProductsHero activeCategory={activeCategory} onCategory={selectCategory} query={query} onSearch={setQuery} />
      <Listing filters={filters} onFiltersChange={setFilters} query={query} onQueryChange={setQuery} />
    </>
  );
}
