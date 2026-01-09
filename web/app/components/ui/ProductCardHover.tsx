"use client";

import { useEffect } from "react";
import { gsap } from "gsap";

export default function ProductCardHover() {
    useEffect(() => {
        const initHoverEffects = () => {
            const cards = document.querySelectorAll("[data-product-card]");
            const cleanupFunctions: (() => void)[] = [];

            cards.forEach((card) => {
                const image = card.querySelector("img");
                if (!image) return;

                const handleMouseMove = (e: Event) => {
                    const mouseEvent = e as MouseEvent;
                    const rect = card.getBoundingClientRect();
                    const x = mouseEvent.clientX - rect.left;
                    const y = mouseEvent.clientY - rect.top;
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    const rotateX = (y - centerY) / 15;
                    const rotateY = (centerX - x) / 15;

                    gsap.to(card, {
                        rotationY: rotateY,
                        rotationX: -rotateX,
                        transformPerspective: 1000,
                        duration: 0.3,
                        ease: "power2.out",
                    });

                    gsap.to(image, {
                        scale: 1.2,
                        x: (x - centerX) * 0.15,
                        y: (y - centerY) * 0.15,
                        duration: 0.3,
                        ease: "power2.out",
                    });
                };

                const handleMouseLeave = () => {
                    gsap.to(card, {
                        rotationY: 0,
                        rotationX: 0,
                        duration: 0.5,
                        ease: "power2.out",
                    });

                    gsap.to(image, {
                        scale: 1,
                        x: 0,
                        y: 0,
                        duration: 0.5,
                        ease: "power2.out",
                    });
                };

                card.addEventListener("mousemove", handleMouseMove);
                card.addEventListener("mouseleave", handleMouseLeave);

                cleanupFunctions.push(() => {
                    card.removeEventListener("mousemove", handleMouseMove);
                    card.removeEventListener("mouseleave", handleMouseLeave);
                });
            });

            return () => {
                cleanupFunctions.forEach(cleanup => cleanup());
            };
        };

        // Initial setup
        let cleanup = initHoverEffects();

        // Re-initialize when DOM changes (for filtered products)
        const observer = new MutationObserver(() => {
            cleanup();
            cleanup = initHoverEffects();
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
        });

        return () => {
            cleanup();
            observer.disconnect();
        };
    }, []);

    return null;
}
