"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useCart } from "./CartProvider";

function formatEUR(cents: number) {
  return `€${(cents / 100).toFixed(2)}`;
}

/**
 * Editorial fashion cart drawer
 * Floating glass bubble panel with fade animations
 * 
 * Animation Specs:
 * - Overlay: opacity 0→1, duration 0.25s, easeOut
 * - Bubble: opacity 0→1, y: 12→0, scale: 0.98→1, duration 0.30s, easeOut
 * - Exit: reverse of entrance
 * 
 * Design:
 * - Floating panel (not edge-attached)
 * - Glassmorphism with blur(20px)
 * - Allows browsing while open (no body scroll lock)
 * - Originates from cart icon corner
 */
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

  const [originPosition, setOriginPosition] = useState<{ x: number; y: number } | null>(null);

  // Get cart icon position when opening
  useEffect(() => {
    if (!isOpen) {
      setOriginPosition(null);
      return;
    }

    const cartButton = document.querySelector('[aria-label="Open cart"]') as HTMLElement;
    if (cartButton) {
      const rect = cartButton.getBoundingClientRect();
      // Use top-right corner of the icon
      setOriginPosition({
        x: rect.right,
        y: rect.top,
      });
    } else {
      // Fallback to top-right if button not found
      setOriginPosition({
        x: typeof window !== "undefined" ? window.innerWidth - 24 : 0,
        y: 24,
      });
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay: blurred background */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={close}
            className="fixed inset-0 z-[60] pointer-events-auto"
            style={{
              background: "rgba(10, 10, 10, 0.55)",
              backdropFilter: "blur(18px)",
              WebkitBackdropFilter: "blur(18px)",
            }}
          />

          {/* Cart bubble: floating panel - originates from cart icon corner */}
          <motion.aside
            initial={
              originPosition
                ? (() => {
                    // Final position: right-6 (24px) from right edge, top-24 (96px) from top
                    const finalX = typeof window !== "undefined" ? window.innerWidth - 420 - 24 : 0;
                    const finalY = 96;
                    return {
                      opacity: 0,
                      x: originPosition.x - finalX,
                      y: originPosition.y - finalY,
                      scale: 0.3,
                    };
                  })()
                : { opacity: 0, y: 12, scale: 0.98 }
            }
            animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            exit={
              originPosition
                ? (() => {
                    const finalX = typeof window !== "undefined" ? window.innerWidth - 420 - 24 : 0;
                    const finalY = 96;
                    return {
                      opacity: 0,
                      x: originPosition.x - finalX,
                      y: originPosition.y - finalY,
                      scale: 0.3,
                    };
                  })()
                : { opacity: 0, y: 12, scale: 0.98 }
            }
            transition={{ duration: 0.30, ease: "easeOut" }}
            className="fixed right-6 top-24 z-[70] w-full max-w-[420px] pointer-events-auto"
            style={{
              transformOrigin: "top right",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="rounded-3xl overflow-hidden flex flex-col max-h-[calc(100vh-8rem)]"
              style={{
                background: "rgba(255, 255, 255, 0.08)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <p className="text-sm text-white/90 font-light">
                    {count === 0 ? "Cart" : `${count} ${count === 1 ? "product" : "products"} in your cart`}
                  </p>
                  {count > 0 && (
                    <span className="h-4 w-4 rounded-full bg-white text-black text-[9px] flex items-center justify-center font-light">
                      {count}
                    </span>
                  )}
                </div>

                <button
                  onClick={close}
                  className="text-white/50 hover:text-white/70 transition-colors"
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

              {/* Scrollable items */}
              <div className="flex-1 overflow-y-auto overscroll-contain px-6 py-4">
                {items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <p className="text-sm text-white/50 font-light mb-3">Your cart is empty</p>
                    <Link
                      href="/shop"
                      onClick={close}
                      className="text-xs text-white/60 hover:text-white/80 underline underline-offset-2 transition-colors font-light"
                    >
                      Continue shopping
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-5">
                    {items.map((it) => (
                      <div
                        key={`${it.slug}-${it.size}`}
                        className="flex gap-4 pb-5 border-b border-white/10 last:border-0"
                      >
                        {/* Thumbnail */}
                        <div className="relative h-20 w-16 shrink-0 overflow-hidden rounded border border-white/10 bg-white/5">
                          <Image
                            src={it.image}
                            alt={it.name}
                            fill
                            className="object-cover"
                            sizes="64px"
                          />
                        </div>

                        {/* Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <div className="flex-1 min-w-0">
                              <p className="text-xs text-white/90 truncate font-light leading-tight">
                                {it.name}
                              </p>
                              <p className="mt-1 text-[10px] text-white/50 font-light">
                                Size: {it.size}
                              </p>
                            </div>

                            <button
                              onClick={() => removeItem(it.slug, it.size)}
                              className="text-white/40 hover:text-white/60 transition-colors shrink-0 mt-0.5"
                              aria-label="Remove item"
                            >
                              <svg
                                className="w-4 h-4"
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

                          {/* Price and quantity */}
                          <div className="flex items-center justify-between mt-3">
                            <p className="text-xs text-white/80 font-light">
                              {formatEUR(it.price * it.qty)} EUR
                            </p>

                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => setQty(it.slug, it.size, it.qty - 1)}
                                className="h-7 w-7 flex items-center justify-center text-white/50 hover:text-white/70 transition-colors border border-white/20 rounded hover:border-white/30"
                                aria-label="Decrease quantity"
                              >
                                <span className="text-xs leading-none">−</span>
                              </button>
                              <span className="text-xs text-white/70 min-w-[20px] text-center font-light">
                                {it.qty}
                              </span>
                              <button
                                onClick={() => setQty(it.slug, it.size, it.qty + 1)}
                                className="h-7 w-7 flex items-center justify-center text-white/50 hover:text-white/70 transition-colors border border-white/20 rounded hover:border-white/30"
                                aria-label="Increase quantity"
                              >
                                <span className="text-xs leading-none">+</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {items.length > 0 && (
                <div className="p-6 pt-4 border-t border-white/10 space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <p className="text-white/60 font-light">Subtotal</p>
                    <p className="text-white font-light">{formatEUR(subtotalCents)} EUR</p>
                  </div>

                  <p className="text-[10px] text-white/50 font-light leading-relaxed">
                    Taxes included. Discounts and shipping calculated at checkout.
                  </p>

                  <Link
                    href="/checkout"
                    onClick={close}
                    className="block w-full h-11 bg-white text-black text-xs font-light hover:opacity-90 transition-opacity text-center flex items-center justify-center rounded"
                  >
                    Check out
                  </Link>

                  {/* Navigation links */}
                  <div className="flex flex-col gap-2 pt-3 border-t border-white/10">
                    <Link
                      href="/orders"
                      className="text-xs text-white/50 hover:text-white/70 transition-colors font-light"
                    >
                      Orders
                    </Link>
                    <Link
                      href="/account"
                      className="text-xs text-white/50 hover:text-white/70 transition-colors font-light"
                    >
                      Account
                    </Link>
                    <Link
                      href="/signin"
                      className="text-xs text-white/50 hover:text-white/70 transition-colors font-light"
                    >
                      Sign in
                    </Link>
                  </div>

                  {/* Clear cart */}
                  <button
                    onClick={clear}
                    className="text-xs text-white/50 hover:text-white/70 transition-colors font-light text-left"
                  >
                    Clear cart
                  </button>

                  {/* Small chat bubble */}
                  <div className="flex justify-end pt-2">
                    <button
                      className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-center"
                      aria-label="Chat support"
                    >
                      <svg
                        className="w-4 h-4 text-white/50"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
