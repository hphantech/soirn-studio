"use client";

import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";

interface LoadingScreenProps {
    onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
    const [displayValue, setDisplayValue] = useState(0);
    const progressBarRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Animate counter from 0 to 100
        const counterTween = gsap.to({ value: 0 }, {
            value: 100,
            duration: 2.5,
            ease: "power2.out",
            onUpdate: function() {
                setDisplayValue(Math.round(this.targets()[0].value));
            },
        });

        // Animate progress bar
        if (progressBarRef.current) {
            gsap.to(progressBarRef.current, {
                scaleX: 1,
                duration: 2.5,
                ease: "power2.out",
                transformOrigin: "left",
            });
        }

        // Fade in container
        if (containerRef.current) {
            gsap.fromTo(containerRef.current, 
                { opacity: 0 },
                { opacity: 1, duration: 0.3 }
            );
        }

        // Navigate when animation completes
        const timeout = setTimeout(() => {
            onComplete();
        }, 2500);

        return () => {
            counterTween.kill();
            clearTimeout(timeout);
        };
    }, [onComplete]);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
        >
            {/* Subtle background effects matching project style */}
            <div className="absolute inset-0 pointer-events-none">
                <div
                    className="absolute -top-64 left-1/3 h-[600px] w-[600px] rounded-full blur-[140px]"
                    style={{ background: "rgba(255,255,255,0.08)" }}
                />
                <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] [background-size:18px_18px]" />
            </div>

            <div className="text-center relative z-10">
                <pre 
                    className="text-white/70 font-mono text-5xl md:text-7xl lg:text-8xl font-light tracking-tight"
                    style={{ fontFamily: "var(--font-geist-mono)" }}
                >
                    {displayValue}%
                </pre>
                <div
                    ref={progressBarRef}
                    className="mt-8 h-[1px] bg-white/40 mx-auto max-w-[300px] origin-left"
                    style={{ transform: "scaleX(0)" }}
                />
            </div>
        </div>
    );
}
