"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";

export default function PageTransition({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const contentRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const isFirstRender = useRef(true);

    useEffect(() => {
        if (!contentRef.current || !overlayRef.current) return;

        // Skip animation on first render
        if (isFirstRender.current) {
            isFirstRender.current = false;
            gsap.set(contentRef.current, { opacity: 1, y: 0 });
            gsap.set(overlayRef.current, { opacity: 0 });
            return;
        }

        // Fade out on route change
        const tl = gsap.timeline();
        
        tl.to(overlayRef.current, {
            opacity: 1,
            duration: 0.2,
            ease: "power2.in",
        })
        .to(contentRef.current, {
            opacity: 0,
            y: 20,
            duration: 0.2,
            ease: "power2.in",
        }, 0)
        .set(contentRef.current, { y: -20 })
        .to(overlayRef.current, {
            opacity: 0,
            duration: 0.3,
            ease: "power2.out",
        })
        .to(contentRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: "power2.out",
        }, "-=0.2");

        return () => {
            tl.kill();
        };
    }, [pathname]);

    return (
        <>
            <div ref={overlayRef} className="fixed inset-0 bg-black z-[9999] pointer-events-none opacity-0" />
            <div ref={contentRef} style={{ opacity: 0 }}>{children}</div>
        </>
    );
}
