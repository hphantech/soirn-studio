import Image from "next/image";
import { notFound } from "next/navigation";
import { products } from "../../(site)/shop/products";

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

  return (
    <main className="mx-auto max-w-6xl px-6 py-14">
      <div className="grid gap-12 lg:grid-cols-2">
        {/* LEFT: image */}
        <div className="relative overflow-hidden rounded-2xl border bg-white/[0.02]"
          style={{ borderColor: "rgba(255,255,255,0.10)" }}
        >
          <div className="relative aspect-[4/5]">
            <Image             
            src={product.images[0]}             
            alt={product.name}             
            fill            
             className="object-cover"             
             sizes="(max-width: 1024px) 100vw, 50vw"             
             priority           
             />
          </div>
        </div>

        {/* RIGHT: info */}
        <div className="pt-2">
          <p className="text-xs tracking-[0.35em] uppercase text-white/60">
            Drop 001
          </p>

          <h1 className="mt-4 text-3xl md:text-5xl text-white">
            {product.name}
          </h1>

          <div className="mt-4 flex items-center gap-3">
            <span className="text-lg text-white">{formatPrice(product.price)}</span>
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

          {/* sizes */}
          <div className="mt-8">
            <p className="text-xs tracking-[0.25em] uppercase text-white/60">
              Size
            </p>

            <div className="mt-3 grid grid-cols-6 gap-2 max-w-md">
              {(product.sizes ?? ["XS", "S", "M", "L", "XL", "XXL"]).map((s) => (
                <button
                  key={s}
                  type="button"
                  className="h-11 rounded-xl border text-sm text-white/80 hover:bg-white/[0.06]"
                  style={{ borderColor: "rgba(255,255,255,0.14)" }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-6 max-w-md">
            <button
              type="button"
              className="h-12 w-full rounded-full bg-white px-6 text-sm text-black hover:opacity-90 disabled:opacity-60"
              disabled={product.status !== "in_stock"}
            >
              {product.status === "in_stock"
                ? "Select a size"
                : product.status === "sold_out"
                ? "Sold out"
                : "Coming soon"}
            </button>

            <p className="mt-3 text-sm text-white/60">
              Worldwide shipping • Limited pieces • No restocks
            </p>
          </div>

          {/* description */}
          {product.description && (
            <div className="mt-10 border-t pt-6"
              style={{ borderColor: "rgba(255,255,255,0.10)" }}
            >
              <p className="text-xs tracking-[0.25em] uppercase text-white/60">
                Description
              </p>
              <p className="mt-3 text-sm text-white/70 leading-relaxed">
                {product.description}
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
