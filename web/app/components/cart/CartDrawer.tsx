"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useCart } from "./CartProvider";

function formatEUR(cents: number) {
  return `€${(cents / 100).toFixed(2)}`;
}

export default function CartDrawer() {
  const {
    isOpen,
    close,
    items,
    subtotalCents,
    removeItem,
    setQty,
    clear,
    count,
  } = useCart();

  // prevent background scroll while open
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  return (
    <>
      {/* backdrop */}
      <div
        onClick={close}
        className={`fixed inset-0 z-[60] transition-opacity duration-300 ease-out ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{ background: "rgba(0,0,0,0.3)" }}
      />

      {/* panel - minimal, slide from right with smooth animation */}
      <aside
        className={`fixed right-0 top-0 z-[70] h-full w-[380px] max-w-[90vw] transform transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
        }`}
      >
        <div
          className="h-full border-l bg-black p-6 flex flex-col"
          style={{
            borderColor: "rgba(255,255,255,0.08)",
          }}
        >
          {/* Header - minimal */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
            <div>
              <p className="text-xs tracking-[0.15em] uppercase text-white/80 font-light">
                {count === 0 ? "Bag" : `Bag`}
              </p>
              {count > 0 && (
                <p className="text-xs text-white/40 mt-1">{count} {count === 1 ? "item" : "items"}</p>
              )}
            </div>

            <button
              onClick={close}
              className="text-white/40 hover:text-white transition-colors"
              aria-label="Close cart"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Items - scrollable */}
          <div className="flex-1 overflow-y-auto -mr-3 pr-3 space-y-6 cart-drawer-scroll">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-12">
                <p className="text-white/40 text-xs tracking-[0.1em] uppercase mb-4">Empty</p>
                <Link
                  href="/shop"
                  onClick={close}
                  className="text-xs text-white/60 hover:text-white/80 underline underline-offset-2 transition-colors tracking-[0.05em] uppercase"
                >
                  Continue shopping
                </Link>
              </div>
            ) : (
              items.map((it, idx) => (
                <div
                  key={`${it.slug}-${it.size}`}
                  className="flex gap-4 animate-fade-in pb-6 border-b last:border-0"
                  style={{ 
                    animationDelay: `${idx * 50}ms`,
                    borderColor: "rgba(255,255,255,0.05)"
                  }}
                >
                  <div className="relative h-20 w-16 shrink-0 overflow-hidden border bg-white/[0.02]" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
                    <Image src={it.image} alt={it.name} fill className="object-cover" sizes="64px" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="text-xs tracking-[0.05em] uppercase text-white/80 truncate font-light">{it.name}</p>
                        <p className="mt-1 text-[10px] text-white/40 tracking-[0.1em] uppercase">Size: {it.size}</p>
                      </div>

                      <button
                        onClick={() => removeItem(it.slug, it.size)}
                        className="text-white/30 hover:text-white/60 transition-colors shrink-0"
                        aria-label="Remove item"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setQty(it.slug, it.size, it.qty - 1)}
                          className="h-6 w-6 flex items-center justify-center text-white/50 hover:text-white/80 transition-colors border" style={{ borderColor: "rgba(255,255,255,0.1)" }}
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="text-xs text-white/70 min-w-[20px] text-center font-light">
                          {it.qty}
                        </span>
                        <button
                          onClick={() => setQty(it.slug, it.size, it.qty + 1)}
                          className="h-6 w-6 flex items-center justify-center text-white/50 hover:text-white/80 transition-colors border" style={{ borderColor: "rgba(255,255,255,0.1)" }}
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      <p className="text-xs text-white/80 font-light">{formatEUR(it.price * it.qty)}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer - sticky */}
          {items.length > 0 && (
            <div className="mt-6 pt-6 border-t space-y-4" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
              <div className="flex items-center justify-between text-xs">
                <p className="text-white/60 tracking-[0.05em] uppercase font-light">Subtotal</p>
                <p className="text-white font-light">{formatEUR(subtotalCents)}</p>
              </div>

              <p className="text-[10px] text-white/30 tracking-[0.05em] uppercase">
                Taxes included. Shipping at checkout.
              </p>

              <Link
                href="/checkout"
                onClick={close}
                className="block w-full h-11 bg-white text-black text-xs tracking-[0.1em] uppercase font-light hover:opacity-90 disabled:opacity-40 transition-opacity text-center flex items-center justify-center"
              >
                Checkout
              </Link>

              <div className="flex items-center justify-center gap-4 text-[10px] text-white/40 tracking-[0.05em] uppercase">
                <Link href="/shipping-returns" className="hover:text-white/60 transition-colors underline underline-offset-2">
                  Shipping
                </Link>
                <button onClick={clear} className="hover:text-white/60 transition-colors underline underline-offset-2">
                  Clear
                </button>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
