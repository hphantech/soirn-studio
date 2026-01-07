export type Product = {
  slug: string;
  name: string;
  price: number; // cents
  compareAtPrice?: number; // cents
  currency?: "EUR";
  badge?: string;
  status?: "in_stock" | "sold_out" | "coming_soon";

  images: string[];
  sizes: string[];
  description: string[];
  composition?: string;
  color?: string;
};

export const products: Product[] = [
  {
    slug: "drop-001-hoodie-black",
    name: "Drop 001 Hoodie — Black",
    price: 14000,
    compareAtPrice: 18000,
    currency: "EUR",
    badge: "DROP 001",
    status: "coming_soon",
    images: [
      "/products/hoodie-1.jpg",
      "/products/hoodie-2.jpg",
      "/products/hoodie-3.jpg",
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    description: [
      "Heavy fleece with structured seams",
      "Washed finish throughout",
      "Sculpted silhouette",
    ],
    composition: "100% cotton",
    color: "Washed Black",
  },
  {
    slug: "drop-002-hoodie-black",
    name: "Drop 002 Hoodie — Black",
    price: 18000,
    currency: "EUR",
    badge: "DROP 002",
    status: "in_stock",
    images: ["/products/hoodie-black.jpg"],
    sizes: ["XS", "S", "M", "L", "XL"],
    description: [
      "Updated cut with heavier fleece",
      "Improved structure and weight",
      "Minimal branding",
    ],
    composition: "100% cotton",
    color: "Black",
  },
];
