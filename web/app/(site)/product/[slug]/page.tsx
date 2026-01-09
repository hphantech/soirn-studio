import { notFound } from "next/navigation";
import { products } from "../../shop/products";
import AddToCart from "../../../components/cart/AddToCart";
import ImageGallery from "../../../components/ui/ImageGallery";

function formatPrice(cents: number) {
  return `€${(cents / 100).toFixed(2)}`;
}

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;

  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();

  const heroImage = product.images?.[0] ?? "/products/placeholder.jpg";

  return (
    <main className="min-h-screen bg-black">
      <div className="mx-auto max-w-[95vw] px-4 sm:px-6 py-8">
        <div className="grid gap-6 lg:gap-8 lg:grid-cols-[80px_1fr_380px] xl:grid-cols-[80px_1fr_420px]">
          {/* LEFT: Vertical thumbnails + Main image */}
          <div className="lg:col-span-2 min-h-[70vh]">
            <ImageGallery images={product.images.length > 0 ? product.images : [heroImage]} />
          </div>

          {/* RIGHT: Product details */}
          <div className="pt-2">
            <p className="text-xs tracking-[0.2em] uppercase text-white/60 font-light">
              {product.badge ?? "Drop"}
            </p>

            <h1 className="mt-3 text-2xl md:text-3xl text-white font-light">{product.name}</h1>

            {/* Color if available */}
            {product.color && (
              <p className="mt-2 text-sm text-white/70 font-light">Color: {product.color}</p>
            )}

            {/* Price */}
            <div className="mt-4 flex items-center gap-3">
              <span className="text-lg text-white font-light">{formatPrice(product.price)}</span>

              {product.compareAtPrice && product.compareAtPrice > product.price && (
                <span className="text-sm text-white/50 line-through font-light">
                  {formatPrice(product.compareAtPrice)}
                </span>
              )}
            </div>

            {product.compareAtPrice && product.compareAtPrice > product.price && (
              <p className="mt-1 text-xs text-white/50 font-light">Customs duties & tax included.</p>
            )}

            {/* Key features */}
            {product.description && product.description.length > 0 && (
              <div className="mt-6 space-y-1.5">
                {product.description.map((line, idx) => (
                  <p key={idx} className="text-sm text-white/80 font-light">• {line}</p>
                ))}
              </div>
            )}

            {/* Size selection and Add to cart */}
            <AddToCart
              slug={product.slug}
              name={product.name}
              price={product.price}
              image={heroImage}
              sizes={product.sizes}
              disabled={product.status !== "in_stock"}
            />

            {/* Status badges */}
            {product.status === "sold_out" && (
              <div className="mt-4">
                <span className="inline-block bg-white px-3 py-1.5 text-xs text-black font-medium">
                  Sold out
                </span>
              </div>
            )}

            {product.status === "coming_soon" && (
              <div className="mt-4">
                <span className="inline-block bg-black/80 backdrop-blur-sm border px-3 py-1.5 text-xs text-white/90 font-medium" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
                  Coming soon
                </span>
              </div>
            )}

            {/* Additional details */}
            <div className="mt-8 border-t pt-6" style={{ borderColor: "rgba(255,255,255,0.10)" }}>
              <button className="text-xs tracking-[0.15em] uppercase text-white/60 font-light flex items-center gap-2 w-full justify-between">
                <span>Detail</span>
                <span>^</span>
              </button>

              <div className="mt-4 space-y-2 text-xs text-white/70 font-light">
                {product.composition && <p>Composition: {product.composition}</p>}
                {product.color && <p>Color: {product.color}</p>}
              </div>

              <button className="mt-4 text-xs tracking-[0.15em] uppercase text-white/60 font-light flex items-center gap-2 w-full justify-between">
                <span>Size Guide</span>
                <span>v</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
