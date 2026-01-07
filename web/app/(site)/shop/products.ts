export type Product = {
  slug: string;
  name: string;
  price: number; // cents
  compareAtPrice?: number; // cents
  currency: "EUR";
  badge?: string;
  status?: "in_stock" | "sold_out" | "coming_soon";

  images: string[]; // multiple images for gallery
  sizes: string[]; // e.g. ["XS","S","M","L","XL"]
  description: string[]; // bullet lines
  composition?: string;
  color?: string;
};

export const products: Product[] = [
  {
    slug: "drop-001-hoodie-black",
    name: "Drop 001 Hoodie — Black",
    price: 14000,
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
      "Heavy fleece, structured seams",
      "Washed finish throughout",
      "Sculpted silhouette",
    ],
    composition: "100% cotton",
    color: "Washed Black",
  },
];
