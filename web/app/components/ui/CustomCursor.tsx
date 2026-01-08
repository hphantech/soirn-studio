"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const followerRef = useRef<HTMLDivElement>(null);
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        if (typeof window === "undefined") return;
        
        // Only show on desktop
        const checkDesktop = () => {
            setIsDesktop(window.innerWidth >= 1024);
        };
        checkDesktop();
        window.addEventListener("resize", checkDesktop);

        if (!isDesktop || !cursorRef.current || !followerRef.current) return;

        let mouseX = 0;
        let mouseY = 0;
        let followerX = 0;
        let followerY = 0;
        let rafId: number;

        const updateCursor = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            gsap.to(cursorRef.current, {
                x: mouseX,
                y: mouseY,
                duration: 0,
            });
        };

        const updateFollower = () => {
            const dx = mouseX - followerX;
            const dy = mouseY - followerY;
            followerX += dx * 0.15;
            followerY += dy * 0.15;

            gsap.to(followerRef.current, {
                x: followerX,
                y: followerY,
                duration: 0.3,
                ease: "power2.out",
            });

            rafId = requestAnimationFrame(updateFollower);
        };

        const handleMouseEnter = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.tagName === "A" || target.tagName === "BUTTON" || target.closest("a") || target.closest("button") || target.closest("[data-product-card]")) {
                gsap.to(cursorRef.current, { scale: 1.8, opacity: 0.9 });
                gsap.to(followerRef.current, { scale: 2.5, opacity: 0.4 });
            }
        };

        const handleMouseLeave = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.tagName === "A" || target.tagName === "BUTTON" || target.closest("a") || target.closest("button") || target.closest("[data-product-card]")) {
                gsap.to(cursorRef.current, { scale: 1, opacity: 1 });
                gsap.to(followerRef.current, { scale: 1, opacity: 0.2 });
            }
        };

        window.addEventListener("mousemove", updateCursor);
        document.addEventListener("mouseenter", handleMouseEnter, true);
        document.addEventListener("mouseleave", handleMouseLeave, true);
        updateFollower();

        return () => {
            window.removeEventListener("mousemove", updateCursor);
            document.removeEventListener("mouseenter", handleMouseEnter, true);
            document.removeEventListener("mouseleave", handleMouseLeave, true);
            window.removeEventListener("resize", checkDesktop);
            if (rafId) cancelAnimationFrame(rafId);
        };
    }, [isDesktop]);

    useEffect(() => {
        if (isDesktop) {
            document.body.setAttribute("data-cursor-active", "true");
        } else {
            document.body.removeAttribute("data-cursor-active");
        }
    }, [isDesktop]);

    if (!isDesktop) return null;

    return (
        <>
            <div
                ref={cursorRef}
                className="fixed w-2 h-2 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
                style={{ transform: "translate(-50%, -50%)" }}
            />
            <div
                ref={followerRef}
                className="fixed w-8 h-8 border border-white/30 rounded-full pointer-events-none z-[9998]"
                style={{ transform: "translate(-50%, -50%)", opacity: 0.2 }}
            />
        </>
    );
}
