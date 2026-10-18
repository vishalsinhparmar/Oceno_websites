import type { Product } from "@/components/sections/home/FeaturedProducts/ProductCard";
import type { AssetKey } from "@/lib/assets";

export type CategoryId = "table-top" | "designer-art" | "pedestal" | "water-closet" | "squatting-pan";
export type FinishId = "glossy-white" | "ivory" | "ocean-blue" | "stone-black" | "red-apple" | "orange-floral" | "black-floral";
export type InstallationId = "counter-top" | "wall-hung" | "floor-standing" | "pedestal";
export type MaterialId = "vitreous-china" | "fine-fireclay" | "ceramic";
export type CollectionId = "european-treasures" | "designer-art-series" | "essentials";

export type CatalogueProduct = Product & {
  categoryId: CategoryId;
  finishId: FinishId;
  installation: InstallationId;
  material: MaterialId;
  collection: CollectionId;
  /** Width in mm — first dimension of `size`. */
  width: number;
  /** Featured order. */
  rank: number;
};

export const productsHeroContent = {
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
  ],
  current: "All collections",
  eyebrow: "Products & collections",
  heading: { before: "Sanitaryware, ", accent: "curated", after: " by", secondLine: "family." },
  searchPlaceholder: "Search 250+ designs, codes or finishes…",
  searchCta: "Search",
  categories: [
    { id: "all", label: "All products", count: 136, image: "categoryTableTop", thumb: "product" },
    { id: "table-top", label: "Table-Top Basins", count: 48, image: "productMarina", thumb: "product" },
    { id: "designer-art", label: "Designer Art", count: 36, image: "categoryDesignerArt", thumb: "product" },
    { id: "pedestal", label: "Pedestal Sets", count: 22, image: "productPedestalRed", thumb: "product" },
    { id: "water-closet", label: "Water Closets", count: 18, image: "categoryWaterClosets", thumb: "photo" },
    { id: "squatting-pan", label: "Squatting Pans", count: 12, image: "categorySquatting", thumb: "product" },
  ] as const satisfies readonly {
    id: CategoryId | "all";
    label: string;
    count: number;
    image: AssetKey;
    thumb: "product" | "photo";
  }[],
} as const;

export const filterGroups = {
  category: {
    label: "Category",
    options: [
      { id: "table-top", label: "Table-Top Basins", count: 48 },
      { id: "designer-art", label: "Designer Art Basins", count: 36 },
      { id: "pedestal", label: "Pedestal Basins", count: 22 },
      { id: "water-closet", label: "Water Closets", count: 18 },
      { id: "squatting-pan", label: "Squatting Pans", count: 12 },
    ] as { id: CategoryId; label: string; count: number }[],
  },
  finish: {
    label: "Finish & colour",
    options: [
      { id: "glossy-white", label: "Glossy White", color: "#F4F5F7" },
      { id: "ivory", label: "Ivory", color: "#E9E2D3" },
      { id: "ocean-blue", label: "Ocean Blue", color: "#3F86C8" },
      { id: "stone-black", label: "Stone Black Matt", color: "#2B3036" },
      { id: "red-apple", label: "Red Apple", color: "#C8262B" },
      { id: "orange-floral", label: "Orange Floral", color: "#E8742F" },
      { id: "black-floral", label: "Black Floral", color: "#1E1E1E" },
    ] as { id: FinishId; label: string; color: string }[],
  },
  installation: {
    label: "Installation",
    options: [
      { id: "counter-top", label: "Counter-top", count: 52 },
      { id: "wall-hung", label: "Wall-hung", count: 24 },
      { id: "floor-standing", label: "Floor-standing", count: 38 },
      { id: "pedestal", label: "Pedestal", count: 22 },
    ] as { id: InstallationId; label: string; count: number }[],
  },
  size: { label: "Size (width)", min: 340, max: 700, step: 10, unit: "mm" },
  material: {
    label: "Material",
    options: [
      { id: "vitreous-china", label: "Vitreous china", count: 98 },
      { id: "fine-fireclay", label: "Fine fireclay", count: 24 },
      { id: "ceramic", label: "Ceramic", count: 14 },
    ] as { id: MaterialId; label: string; count: number }[],
  },
  collection: {
    label: "Collection",
    options: [
      { id: "european-treasures", label: "The European Treasures", count: 42 },
      { id: "designer-art-series", label: "Designer Art Series", count: 36 },
      { id: "essentials", label: "OCENO Essentials", count: 58 },
    ] as { id: CollectionId; label: string; count: number }[],
  },
};

export const sortOptions = [
  { id: "featured", label: "Featured" },
  { id: "newest", label: "Newest" },
  { id: "name", label: "Name A–Z" },
  { id: "width-asc", label: "Width: small to large" },
  { id: "width-desc", label: "Width: large to small" },
] as const;

export type SortId = (typeof sortOptions)[number]["id"];

export const listingContent = {
  /** Total designs in the full catalogue; the site currently ships the first page of results. */
  total: 84,
  pageCount: 10,
};

type Row = Omit<CatalogueProduct, "rank" | "href" | "media"> & { media?: Product["media"] };

const rows: Row[] = [
  { id: "marina-art-basin", category: "Designer Art Basin", categoryId: "designer-art", name: "Marina Art Basin", size: "410 × 410 × 190 mm", width: 410, finish: "Ocean Blue", finishId: "ocean-blue", swatch: "swatchOceanBlue", badge: "new", image: "productMarina", shadow: "productFloorShadowSoft", installation: "counter-top", material: "vitreous-china", collection: "designer-art-series" },
  { id: "elba-oval-basin", category: "Table-Top Basin", categoryId: "table-top", name: "Elba Oval Basin", size: "520 × 400 × 145 mm", width: 520, finish: "Glossy White", finishId: "glossy-white", swatch: "swatchWhite", badge: "new", image: "categoryTableTop", shadow: "productFloorShadowWide", installation: "counter-top", material: "vitreous-china", collection: "european-treasures" },
  { id: "nero-marmo-basin", category: "Designer Art Basin", categoryId: "designer-art", name: "Nero Marmo Basin", size: "420 × 420 × 180 mm", width: 420, finish: "Stone Black Matt", finishId: "stone-black", swatch: "swatchStone", badge: "export", image: "categoryDesignerArt", shadow: "productFloorShadowDeep", installation: "counter-top", material: "fine-fireclay", collection: "designer-art-series" },
  { id: "capri-soft-square-basin", category: "Table-Top Basin", categoryId: "table-top", name: "Capri Soft-Square Basin", size: "480 × 480 × 150 mm", width: 480, finish: "Glossy White", finishId: "glossy-white", swatch: "swatchWhite", badge: "bestseller", image: "productCapri", shadow: "productFloorShadowSoft", installation: "counter-top", material: "vitreous-china", collection: "european-treasures" },
  { id: "firenze-noir-pedestal", category: "One-Piece Pedestal", categoryId: "pedestal", name: "Firenze Noir Pedestal", size: "450 × 450 × 850 mm", width: 450, finish: "Black Floral", finishId: "black-floral", swatch: "swatchBlack", badge: "bestseller", image: "productPedestalNoir", shadow: "productFloorShadowDeep", installation: "pedestal", material: "vitreous-china", collection: "designer-art-series" },
  { id: "siena-blossom-set", category: "Pedestal Basin", categoryId: "pedestal", name: "Siena Blossom Set", size: "560 × 430 × 830 mm", width: 560, finish: "Orange Floral", finishId: "orange-floral", swatch: "swatchOrange", image: "categoryPedestal", shadow: "productFloorShadowDeep", installation: "pedestal", material: "ceramic", collection: "essentials" },
  { id: "verona-rosso-set", category: "Pedestal Basin", categoryId: "pedestal", name: "Verona Rosso Set", size: "550 × 420 × 830 mm", width: 550, finish: "Red Apple", finishId: "red-apple", swatch: "swatchRed", badge: "new", image: "productPedestalRed", shadow: "productFloorShadowSoft", installation: "pedestal", material: "ceramic", collection: "essentials" },
  { id: "monaco-one-piece-wc", category: "Water Closet", categoryId: "water-closet", name: "Monaco One-Piece WC", size: "680 × 370 × 720 mm", width: 680, finish: "Glossy White", finishId: "glossy-white", swatch: "swatchWhite", badge: "bestseller", image: "categoryWaterClosets", media: "photo", installation: "floor-standing", material: "vitreous-china", collection: "european-treasures" },
  { id: "roma-squatting-pan", category: "Squatting Pan", categoryId: "squatting-pan", name: "Roma Squatting Pan", size: "580 × 440 × 200 mm", width: 580, finish: "Glossy White", finishId: "glossy-white", swatch: "swatchWhite", image: "categorySquatting", shadow: "productFloorShadowDeep", installation: "floor-standing", material: "vitreous-china", collection: "essentials" },
];

export const catalogueProducts: CatalogueProduct[] = rows.map((row, i) => ({
  media: "product",
  ...row,
  rank: i + 1,
  href: `/products/${row.id}`,
}));
