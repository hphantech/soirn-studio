import Link from "next/link";
import Image from "next/image";
import { products } from "./products";

function formatPrice(cents: number) {
  return `€${(cents / 100).toFixed(2)}`;
}

export default function ShopPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <div className="flex items-end justify-between gap-6">
        <div>
          <p className="text-xs tracking-[0.35em] uppercase text-white/60">
            Shop
          </p>
          <h1 className="mt-3 text-3xl md:text-5xl text-white">
            Drop 001
          </h1>
          <p className="mt-3 max-w-xl text-white/70">
            Limited pieces. No restocks.
          </p>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-sm text-white/60">
          <span className="h-2 w-2 rounded-full bg-white/40" />
          <span>{products.length} items</span>
        </div>
      </div>

      <div
        className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {products.map((p) => (
          <Link
            key={p.slug}
            href={`/product/${p.slug}`}
            className="group rounded-2xl border bg-white/[0.02] p-4 transition hover:bg-white/[0.04]"
            style={{ borderColor: "rgba(255,255,255,0.10)" }}
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-xl">
              <Image
                src={p.images[0]}
                alt={p.name}
                fill
                className="object-cover transition duration-500 group-hover:scale-[1.03]"
                sizes="(max-width: 1024px) 50vw, 33vw"
                priority={false}
                />


              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />

              <div className="absolute left-3 top-3 flex gap-2">
                {p.badge && (
                  <span className="rounded-full bg-black/60 px-3 py-1 text-xs text-white/80 backdrop-blur">
                    {p.badge}
                  </span>
                )}
                {p.status === "sold_out" && (
                  <span className="rounded-full bg-white px-3 py-1 text-xs text-black">
                    Sold out
                  </span>
                )}
                {p.status === "coming_soon" && (
                  <span className="rounded-full bg-black/60 px-3 py-1 text-xs text-white/80 backdrop-blur">
                    Coming soon
                  </span>
                )}
              </div>
            </div>

            <div className="mt-4">
              <div className="flex items-start justify-between gap-3">
                <h2 className="text-base text-white">{p.name}</h2>
                <span className="text-sm text-white/80">
                  {formatPrice(p.price)}
                </span>
              </div>

              <p className="mt-2 text-sm text-white/60">
                {p.status === "in_stock"
                  ? "Ready to ship"
                  : p.status === "sold_out"
                  ? "No restocks"
                  : "Join waitlist for access"}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
