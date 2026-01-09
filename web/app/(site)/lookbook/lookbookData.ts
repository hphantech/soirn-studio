export type LookMedia = {
  type: "image" | "video";
  src: string;
  alt?: string;
};

export type LookProduct = {
  name: string;
  href: string;
};

export type Look = {
  id: string;
  slug: string;
  title?: string;
  season: string;
  media: LookMedia[];
  products?: LookProduct[];
  credits?: string;
  aspect?: "portrait" | "landscape" | "square";
};

export const lookbookData: Look[] = [
  {
    id: "001",
    slug: "look-001",
    season: "DROP 001 / AW25",
    media: [
      { type: "image", src: "/products/hoodie-1.jpg", alt: "Look 001 - Main" },
      { type: "image", src: "/products/hoodie-2.jpg", alt: "Look 001 - Detail" },
    ],
    products: [
      { name: "Essential Hoodie", href: "/product/essential-hoodie" },
    ],
    credits: "Photography by Soirn Studio",
    aspect: "portrait",
  },
  {
    id: "002",
    slug: "look-002",
    season: "DROP 001 / AW25",
    media: [
      { type: "image", src: "/products/hoodie-2.jpg", alt: "Look 002 - Main" },
      { type: "image", src: "/products/hoodie-3.jpg", alt: "Look 002 - Detail" },
    ],
    products: [
      { name: "Essential Hoodie", href: "/product/essential-hoodie" },
    ],
    aspect: "landscape",
  },
  {
    id: "003",
    slug: "look-003",
    season: "DROP 001 / AW25",
    media: [
      { type: "image", src: "/products/hoodie-3.jpg", alt: "Look 003 - Main" },
      { type: "image", src: "/products/hoodie-black.jpg", alt: "Look 003 - Detail" },
    ],
    products: [
      { name: "Essential Hoodie", href: "/product/essential-hoodie" },
    ],
    aspect: "portrait",
  },
  {
    id: "004",
    slug: "look-004",
    season: "DROP 001 / AW25",
    media: [
      { type: "image", src: "/products/hoodie-black.jpg", alt: "Look 004 - Main" },
      { type: "image", src: "/products/hoodie-1.jpg", alt: "Look 004 - Detail" },
    ],
    aspect: "square",
  },
  {
    id: "005",
    slug: "look-005",
    season: "DROP 001 / AW25",
    media: [
      { type: "image", src: "/products/hoodie-1.jpg", alt: "Look 005 - Main" },
      { type: "image", src: "/products/hoodie-2.jpg", alt: "Look 005 - Detail" },
    ],
    aspect: "landscape",
  },
  {
    id: "006",
    slug: "look-006",
    season: "DROP 001 / AW25",
    media: [
      { type: "image", src: "/products/hoodie-2.jpg", alt: "Look 006 - Main" },
    ],
    aspect: "portrait",
  },
];
