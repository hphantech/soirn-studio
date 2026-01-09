"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";

export default function PageTransition({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const contentRef = useRef<HTMLDivElement>(null);
    const glitchOverlayRef = useRef<HTMLDivElement>(null);
    const glitchRedRef = useRef<HTMLDivElement>(null);
    const glitchBlueRef = useRef<HTMLDivElement>(null);
    const isFirstRender = useRef(true);

    useEffect(() => {
        if (!contentRef.current || !glitchOverlayRef.current || !glitchRedRef.current || !glitchBlueRef.current) return;

        // Skip animation on first render
        if (isFirstRender.current) {
            isFirstRender.current = false;
            gsap.set(contentRef.current, { opacity: 1, filter: "blur(0px)", x: 0 });
            gsap.set([glitchOverlayRef.current, glitchRedRef.current, glitchBlueRef.current], { opacity: 0, x: 0 });
            return;
        }

        // Glitch transition timeline - more distorted with grayscale
        const tl = gsap.timeline();

        // Initial setup for distortion layers
        tl.set(glitchRedRef.current, { 
            opacity: 1, 
            x: 0,
            y: 0,
            filter: "blur(0px) contrast(1.5)",
            mixBlendMode: "difference"
        })
        .set(glitchBlueRef.current, { 
            opacity: 1, 
            x: 0,
            y: 0,
            filter: "blur(0px) contrast(1.5)",
            mixBlendMode: "difference"
        })
        // Start distortion - aggressive blur
        .to(contentRef.current, {
            filter: "blur(3px) contrast(2) brightness(0.8)",
            duration: 0.03,
            ease: "none",
        })
        // Heavy displacement - layer 1 shifts right
        .to(glitchRedRef.current, {
            x: 20,
            y: () => gsap.utils.random(-5, 5),
            duration: 0.04,
            ease: "power2.out",
        }, 0)
        // Heavy displacement - layer 2 shifts left
        .to(glitchBlueRef.current, {
            x: -20,
            y: () => gsap.utils.random(-5, 5),
            duration: 0.04,
            ease: "power2.out",
        }, 0)
        // Aggressive content shake with rotation
        .to(contentRef.current, {
            x: () => gsap.utils.random(-25, 25),
            y: () => gsap.utils.random(-10, 10),
            rotation: () => gsap.utils.random(-2, 2),
            scale: () => gsap.utils.random(0.98, 1.02),
            filter: "blur(4px) contrast(3) brightness(0.6)",
            duration: 0.02,
            ease: "none",
            repeat: 8,
            yoyo: true,
        }, 0.04)
        // Distortion layers aggressive shake
        .to(glitchRedRef.current, {
            x: () => gsap.utils.random(-30, 30),
            y: () => gsap.utils.random(-15, 15),
            rotation: () => gsap.utils.random(-1, 1),
            filter: "blur(2px) contrast(2)",
            duration: 0.015,
            ease: "none",
            repeat: 10,
            yoyo: true,
        }, 0.04)
        .to(glitchBlueRef.current, {
            x: () => gsap.utils.random(-30, 30),
            y: () => gsap.utils.random(-15, 15),
            rotation: () => gsap.utils.random(-1, 1),
            filter: "blur(2px) contrast(2)",
            duration: 0.015,
            ease: "none",
            repeat: 10,
            yoyo: true,
        }, 0.04)
        // Fade out with heavy distortion
        .to(contentRef.current, {
            opacity: 0,
            filter: "blur(8px) contrast(4) brightness(0.3) grayscale(1)",
            scale: 1.05,
            rotation: () => gsap.utils.random(-3, 3),
            duration: 0.2,
            ease: "power2.in",
        }, 0.15)
        // Glitch overlay aggressive flash
        .to(glitchOverlayRef.current, {
            opacity: () => gsap.utils.random(0.4, 0.8),
            filter: "contrast(2) brightness(1.5)",
            duration: 0.01,
            ease: "none",
            repeat: 8,
            yoyo: true,
        }, 0.15)
        // Reset positions
        .set([glitchRedRef.current, glitchBlueRef.current], { 
            x: 0, 
            y: 0,
            rotation: 0,
            opacity: 0,
            filter: "blur(0px) contrast(1)"
        })
        .set(contentRef.current, { 
            x: 0, 
            y: 0,
            rotation: 0,
            scale: 1,
            filter: "blur(0px) contrast(1) brightness(1) grayscale(0)", 
            opacity: 0 
        })
        // Fade in new content
        .to(glitchOverlayRef.current, {
            opacity: 0,
            filter: "contrast(1) brightness(1)",
            duration: 0.15,
            ease: "power2.out",
        })
        .to(contentRef.current, {
            opacity: 1,
            filter: "blur(0px) contrast(1) brightness(1)",
            duration: 0.25,
            ease: "power2.out",
        })
        // Final distortion shake on new content
        .to(contentRef.current, {
            x: () => gsap.utils.random(-8, 8),
            y: () => gsap.utils.random(-4, 4),
            rotation: () => gsap.utils.random(-1, 1),
            filter: "blur(1px) contrast(1.5)",
            duration: 0.015,
            ease: "none",
            repeat: 4,
            yoyo: true,
        }, "-=0.2")
        .to(contentRef.current, {
            x: 0,
            y: 0,
            rotation: 0,
            filter: "blur(0px) contrast(1)",
            duration: 0.15,
            ease: "power2.out",
        });

        return () => {
            tl.kill();
        };
    }, [pathname]);

    return (
        <>
            {/* Glitch overlay with scan lines and noise - grayscale */}
            <div 
                ref={glitchOverlayRef}
                className="fixed inset-0 z-[9999] pointer-events-none opacity-0"
                style={{
                    background: `
                        repeating-linear-gradient(
                            0deg,
                            transparent,
                            transparent 1px,
                            rgba(255, 255, 255, 0.08) 1px,
                            rgba(255, 255, 255, 0.08) 2px
                        ),
                        repeating-linear-gradient(
                            90deg,
                            rgba(0, 0, 0, 0.1) 0px,
                            transparent 1px,
                            transparent 2px,
                            rgba(255, 255, 255, 0.05) 2px,
                            rgba(255, 255, 255, 0.05) 3px
                        ),
                        radial-gradient(circle at 50% 50%, rgba(128, 128, 128, 0.1) 0%, transparent 50%)
                    `,
                    mixBlendMode: "difference",
                    filter: "contrast(2) brightness(1.2)",
                }}
            />
            
            {/* Distortion layer 1 - white/gray */}
            <div 
                ref={glitchRedRef}
                className="fixed inset-0 z-[9998] pointer-events-none opacity-0"
                style={{
                    background: `
                        linear-gradient(90deg, 
                            rgba(255, 255, 255, 0.2) 0%, 
                            transparent 30%,
                            transparent 70%,
                            rgba(255, 255, 255, 0.2) 100%
                        ),
                        repeating-linear-gradient(
                            45deg,
                            transparent,
                            transparent 10px,
                            rgba(200, 200, 200, 0.05) 10px,
                            rgba(200, 200, 200, 0.05) 20px
                        )
                    `,
                    mixBlendMode: "difference",
                    filter: "blur(2px) contrast(2)",
                }}
            />
            
            {/* Distortion layer 2 - black/gray */}
            <div 
                ref={glitchBlueRef}
                className="fixed inset-0 z-[9998] pointer-events-none opacity-0"
                style={{
                    background: `
                        linear-gradient(90deg, 
                            rgba(0, 0, 0, 0.3) 0%, 
                            transparent 30%,
                            transparent 70%,
                            rgba(0, 0, 0, 0.3) 100%
                        ),
                        repeating-linear-gradient(
                            -45deg,
                            transparent,
                            transparent 10px,
                            rgba(50, 50, 50, 0.1) 10px,
                            rgba(50, 50, 50, 0.1) 20px
                        )
                    `,
                    mixBlendMode: "multiply",
                    filter: "blur(2px) contrast(2)",
                }}
            />
            
            <div ref={contentRef} style={{ opacity: 1, willChange: "transform, filter, opacity" }}>{children}</div>
        </>
    );
}
