"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/app/(site)/shop/products";

type ProductSliderProps = {
  products: Product[];
};

export default function ProductSlider({ products }: ProductSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    if (products.length === 0 || !containerRef.current) return;

    // Each item is 150px wide + 64px gap (gap-16 = 4rem = 64px) = 214px
    const itemWidth = 214;
    const singleSetWidth = itemWidth * products.length;
    
    // Animation speed in pixels per second
    const pxPerSecond = 50;
    const duration = singleSetWidth / pxPerSecond;

    // Start from a position further to the right (positive value)
    // This ensures items begin completely off-screen to the right
    const offScreenOffset = singleSetWidth;
    gsap.set(containerRef.current, { x: offScreenOffset });

    // Seamless infinite loop: continuously animate and reset
    // Items slide completely off-screen to the left before resetting
    const runAnimation = () => {
      const currentX = gsap.getProperty(containerRef.current, "x") as number;
      const targetX = currentX - singleSetWidth * 1.5; // Go 1.5 sets to ensure off-screen
      
      animationRef.current = gsap.to(containerRef.current, {
        x: targetX,
        duration: (singleSetWidth * 1.5) / pxPerSecond,
        ease: "none", // Linear animation
        onUpdate: () => {
          const latest = gsap.getProperty(containerRef.current, "x") as number;
          // When items have scrolled far enough off-screen to the left,
          // reset to offScreenOffset (one set to the right of 0)
          if (latest <= -singleSetWidth * 1.5) {
            gsap.set(containerRef.current, { x: offScreenOffset });
            // Stop current animation and restart
            if (animationRef.current) {
              animationRef.current.kill();
            }
            runAnimation();
          }
        },
        onComplete: () => {
          // Reset to off-screen position and continue
          gsap.set(containerRef.current, { x: offScreenOffset });
          runAnimation();
        },
      });
    };

    runAnimation();

    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
      }
    };
  }, [products.length]);

  if (products.length === 0) return null;

  // Duplicate products 6 times for seamless infinite loop
  const duplicatedProducts = [...products, ...products, ...products, ...products, ...products, ...products];

  return (
    <div className="overflow-hidden w-full">
      <div
        ref={containerRef}
        className="flex gap-16"
        style={{
          willChange: "transform",
        }}
      >
        {duplicatedProducts.map((product, idx) => (
          <Link
            key={`${product.slug}-${idx}`}
            href={`/product/${product.slug}`}
            className="group shrink-0"
          >
            <div className="relative w-[150px] aspect-[3/4] overflow-hidden bg-white/[0.02] mb-2">
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="150px"
              />
            </div>
            <div className="text-[9px] text-white/50 font-light leading-tight">
              <p className="uppercase tracking-[0.08em]">{product.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
