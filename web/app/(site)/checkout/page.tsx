"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useCart } from "../../components/cart/CartProvider";
import Link from "next/link";

function formatEUR(cents: number) {
  return `€${(cents / 100).toFixed(2)}`;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotalCents, clear } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (items.length === 0) {
      router.push("/shop");
    }
  }, [items, router]);

  const handleCheckout = async () => {
    if (items.length === 0) return;

    setLoading(true);
    setError(null);

    try {
      // Map cart items to Shopify format
      // Fetch products to get Shopify variant IDs
      const { products } = await import("../shop/products");
      
      const lineItems = items.map((item) => {
        const product = products.find((p) => p.slug === item.slug);
        const variantId = product?.shopifyVariants?.[item.size];
        
        if (!variantId) {
          throw new Error(`Variant ID not found for ${item.name} - ${item.size}`);
        }
        
        return {
          variantId,
          quantity: item.qty,
        };
      });

      const response = await fetch("/api/checkout/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ lineItems }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create checkout");
      }

      // Redirect to Shopify checkout
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        throw new Error("No checkout URL received");
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <main className="mx-auto max-w-4xl px-6 py-20">
        <div className="text-center">
          <h1 className="text-2xl text-white mb-4">Your cart is empty</h1>
          <Link
            href="/shop"
            className="inline-block rounded-full bg-white px-6 py-3 text-sm font-medium text-black hover:opacity-90 transition-opacity"
          >
            Continue shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl text-white mb-2">Checkout</h1>
        <p className="text-white/60 text-sm">Review your order before proceeding</p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Order Summary */}
        <div>
          <h2 className="text-lg font-medium text-white mb-4">Order Summary</h2>
          <div className="space-y-4 border rounded-2xl p-6" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
            {items.map((item) => (
              <div key={`${item.slug}-${item.size}`} className="flex gap-4">
                <div className="relative h-20 w-16 shrink-0 overflow-hidden border bg-white/[0.02]" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
                  <Image src={item.image} alt={item.name} fill className="object-cover" sizes="64px" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white truncate">{item.name}</p>
                  <p className="text-xs text-white/50 mt-0.5">Size: {item.size}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-xs text-white/60">Qty: {item.qty}</span>
                    <span className="text-sm text-white">{formatEUR(item.price * item.qty)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 space-y-3 border-t pt-6" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/70">Subtotal</span>
              <span className="text-white font-medium">{formatEUR(subtotalCents)}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/70">Shipping</span>
              <span className="text-white/60 text-xs">Calculated at checkout</span>
            </div>
            <div className="flex items-center justify-between text-base pt-3 border-t" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
              <span className="text-white font-medium">Total</span>
              <span className="text-white font-medium">{formatEUR(subtotalCents)}</span>
            </div>
          </div>
        </div>

        {/* Checkout Form */}
        <div>
          <h2 className="text-lg font-medium text-white mb-4">Payment</h2>
          <div className="border rounded-2xl p-6 space-y-6" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="text-sm text-red-400">{error}</p>
              </div>
            )}

            <div className="space-y-4">
              <p className="text-sm text-white/70">
                You will be redirected to Shopify's secure checkout to complete your payment.
              </p>

              <button
                onClick={handleCheckout}
                disabled={loading || items.length === 0}
                className="w-full h-12 bg-white text-black text-sm font-medium hover:opacity-90 disabled:opacity-40 transition-opacity flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-black/20 border-t-black" />
                    Processing...
                  </>
                ) : (
                  "Proceed to checkout"
                )}
              </button>
            </div>

            <div className="pt-4 border-t space-y-2" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
              <p className="text-xs text-white/50">
                Secure checkout powered by Shopify
              </p>
              <Link
                href="/shop"
                className="block text-center text-sm text-white/60 hover:text-white transition-colors underline underline-offset-2"
              >
                Continue shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
