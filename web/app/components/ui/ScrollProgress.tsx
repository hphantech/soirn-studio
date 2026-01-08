"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function ScrollProgress() {
    const progressRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!progressRef.current) return;

        gsap.to(progressRef.current, {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
                trigger: "body",
                start: "top top",
                end: "bottom bottom",
                scrub: true,
            },
        });

        return () => {
            ScrollTrigger.getAll().forEach(trigger => {
                if (trigger.vars?.trigger === "body") {
                    trigger.kill();
                }
            });
        };
    }, []);

    return (
        <div
            ref={progressRef}
            className="fixed top-0 left-0 right-0 h-[1px] bg-white/40 origin-left z-[100]"
            style={{ transform: "scaleX(0)" }}
        />
    );
}
