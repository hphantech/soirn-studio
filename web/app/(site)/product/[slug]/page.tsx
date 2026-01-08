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
    <main className="mx-auto max-w-6xl px-6 py-14">
      <div className="grid gap-12 lg:grid-cols-2">
        {/* LEFT: image gallery */}
        <ImageGallery images={product.images.length > 0 ? product.images : [heroImage]} />

        {/* RIGHT: info */}
        <div className="pt-2">
          <p className="text-xs tracking-[0.35em] uppercase text-white/60">
            {product.badge ?? "Drop"}
          </p>

          <h1 className="mt-4 text-3xl md:text-5xl text-white">{product.name}</h1>

          <div className="mt-4 flex items-center gap-3">
            <span className="text-lg text-white">{formatPrice(product.price)}</span>

            {product.compareAtPrice && product.compareAtPrice > product.price && (
              <span className="text-sm text-white/50 line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}

            {product.status === "sold_out" && (
              <span className="rounded-full bg-white px-3 py-1 text-xs text-black">
                Sold out
              </span>
            )}

            {product.status === "coming_soon" && (
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/80">
                Coming soon
              </span>
            )}
          </div>

          {/* Add to cart */}
          <AddToCart
            slug={product.slug}
            name={product.name}
            price={product.price}
            image={heroImage}
            sizes={product.sizes}
            disabled={product.status !== "in_stock"}
          />

          {/* details */}
          <div
            className="mt-10 border-t pt-6"
            style={{ borderColor: "rgba(255,255,255,0.10)" }}
          >
            <p className="text-xs tracking-[0.25em] uppercase text-white/60">
              Details
            </p>

            <div className="mt-4 space-y-2 text-sm text-white/70">
              {product.description?.map((line, idx) => (
                <p key={idx}>— {line}</p>
              ))}

              {product.color && <p className="mt-3">Color: {product.color}</p>}
              {product.composition && <p>Composition: {product.composition}</p>}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
