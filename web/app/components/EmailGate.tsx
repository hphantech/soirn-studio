"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LoadingScreen from "./LoadingScreen";
import Navbar from "./layout/Navbar";

// Import premium plugins
let ScrollSmoother: any;
let Flip: any;
let ScrambleTextPlugin: any;

if (typeof window !== "undefined") {
    try {
        ScrollSmoother = require("gsap/ScrollSmoother").ScrollSmoother;
    } catch (e) {}
    try {
        Flip = require("gsap/Flip").Flip;
    } catch (e) {}
    try {
        ScrambleTextPlugin = require("gsap/ScrambleTextPlugin").ScrambleTextPlugin;
    } catch (e) {}
    
    gsap.registerPlugin(ScrollTrigger);
    if (ScrollSmoother) gsap.registerPlugin(ScrollSmoother);
    if (Flip) gsap.registerPlugin(Flip);
    if (ScrambleTextPlugin) gsap.registerPlugin(ScrambleTextPlugin);
}

// Text groups matching the demo structure
const textGroups = [
    {
        items: [
            { text: "Structured chaos", pos: "pos-4", altPos: "pos-2" },
            { text: "Built to last", pos: "pos-4", altPos: "pos-2" },
            { text: "Limited drops", pos: "pos-4", altPos: "pos-2" },
        ]
    },
    {
        items: [
            { text: "Heavy materials", pos: "pos-1", altPos: "pos-3" },
            { text: "Sculpted silhouettes", pos: "pos-1", altPos: "pos-3" },
            { text: "Underground", pos: "pos-1", altPos: "pos-3" },
            { text: "Streetwear", pos: "pos-1", altPos: "pos-3" },
        ]
    },
    {
        items: [
            { text: "S", pos: "pos-1", altPos: "pos-2", isLarge: true, scrambleDuration: 2.5 },
        ]
    },
    {
        items: [
            { text: "アクセス権限がありません", pos: "pos-1", altPos: "pos-3", scrambleDuration: 0 },
            { text: "█", pos: "pos-1", altPos: "pos-3", isTyping: true },
        ]
    },
    {
        items: [
            { text: "Beacon", pos: "pos-2", altPos: "pos-5" },
            { text: "Synthetic veil", pos: "pos-2", altPos: "pos-5" },
            { text: "Hidden strata", pos: "pos-2", altPos: "pos-5" },
        ]
    },
    {
        items: [
            { text: "O", pos: "pos-3", altPos: "pos-9", isLarge: true, scrambleDuration: 2.5 },
        ]
    },
    {
        items: [
            { text: "I", pos: "pos-1", altPos: "pos-3", isLarge: true, scrambleDuration: 2.5 },
        ]
    },
    {
        items: [
            { text: "R", pos: "pos-3", altPos: "pos-10", isLarge: true, scrambleDuration: 2.5 },
        ]
    },
    {
        items: [
            { text: "N", pos: "pos-2", altPos: "pos-3", isLarge: true, scrambleDuration: 2.5 },
        ]
    },
    {
        items: [
            { text: "Dark matter", pos: "pos-1", altPos: "pos-4" },
            { text: "Quantum flux", pos: "pos-1", altPos: "pos-4" },
            { text: "Neural pathways", pos: "pos-1", altPos: "pos-4" },
        ]
    },
    {
        items: [
            { text: "S", pos: "pos-2", altPos: "pos-6", isLarge: true, scrambleDuration: 2.5 },
        ]
    },
    {
        items: [
            { text: "T", pos: "pos-3", altPos: "pos-7", isLarge: true, scrambleDuration: 2.5 },
        ]
    },
    {
        items: [
            { text: "U", pos: "pos-1", altPos: "pos-8", isLarge: true, scrambleDuration: 2.5 },
        ]
    },
    {
        items: [
            { text: "D", pos: "pos-2", altPos: "pos-9", isLarge: true, scrambleDuration: 2.5 },
        ]
    },
    {
        items: [
            { text: "I", pos: "pos-3", altPos: "pos-10", isLarge: true, scrambleDuration: 2.5 },
        ]
    },
    {
        items: [
            { text: "O", pos: "pos-1", altPos: "pos-2", isLarge: true, scrambleDuration: 2.5 },
        ]
    },
    {
        items: [
            { text: "Phantom signal", pos: "pos-4", altPos: "pos-3" },
            { text: "Echo chamber", pos: "pos-4", altPos: "pos-3" },
            { text: "Void space", pos: "pos-4", altPos: "pos-3" },
        ]
    },
    {
        items: [
            { text: "操作は許可されていません", pos: "pos-1", altPos: "pos-3", scrambleDuration: 0 },
            { text: "█", pos: "pos-1", altPos: "pos-3", isTyping: true },
        ]
    },
    {
        items: [
            { text: "Latent energy", pos: "pos-2", altPos: "pos-5" },
            { text: "Spectral imprint", pos: "pos-2", altPos: "pos-5" },
            { text: "Muted emission", pos: "pos-2", altPos: "pos-5" },
        ]
    },
    {
        items: [
            { text: "Residual charge", pos: "pos-3", altPos: "pos-6" },
            { text: "Optical trace", pos: "pos-3", altPos: "pos-6" },
            { text: "Soft output", pos: "pos-3", altPos: "pos-6" },
        ]
    },
];

export default function EmailGate() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const enterButtonRef = useRef<HTMLButtonElement>(null);
    const brandTextRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!wrapperRef.current || !contentRef.current) return;

        // Initialize ScrollSmoother if available
        let smoother: any = null;
        if (ScrollSmoother) {
            smoother = ScrollSmoother.create({
                wrapper: wrapperRef.current,
                content: contentRef.current,
                smooth: 1,
                normalizeScroll: true,
            });
        }

        const textElements = contentRef.current.querySelectorAll(".el");
        
        // Store original text
        textElements.forEach((el) => {
            const element = el as HTMLElement;
            element.dataset.text = element.textContent || "";
        });

        // Initialize Flip animations for position changes
        function initFlips() {
            if (!Flip) return;
            
            textElements.forEach((el) => {
                const element = el as HTMLElement;
                const originalClass = Array.from(element.classList).find((c) => c.startsWith("pos-"));
                const targetClass = element.dataset.altPos;

                if (!originalClass || !targetClass) return;

                const flipEase = element.dataset.flipEase || "expo.inOut";

                // Temporarily switch to target class
                element.classList.add(targetClass);
                element.classList.remove(originalClass);

                // Capture FLIP state
                const flipState = Flip.getState(element, {
                    props: "opacity, filter, width",
                });

                // Restore original class
                element.classList.add(originalClass);
                element.classList.remove(targetClass);

                // Animate to target position
                Flip.to(flipState, {
                    ease: flipEase,
                    scrollTrigger: {
                        trigger: element,
                        start: "clamp(bottom bottom-=10%)",
                        end: "clamp(center center)",
                        scrub: true,
                    },
                });

                // Animate from target position
                Flip.from(flipState, {
                    ease: flipEase,
                    scrollTrigger: {
                        trigger: element,
                        start: "clamp(center center)",
                        end: "clamp(top top)",
                        scrub: true,
                    },
                });
            });
        }


        // Initialize scramble text animations
        function initScramble() {
            textElements.forEach((el) => {
                const element = el as HTMLElement;
                const isTyping = element.classList.contains("typing-indicator");
                
                if (isTyping) {
                    // Typing indicator is handled by CSS animation
                    return;
                }

                const duration = element.dataset.scrambleDuration 
                    ? parseFloat(element.dataset.scrambleDuration) 
                    : 1;

                const text = element.dataset.text || element.textContent || "";

                if (ScrambleTextPlugin) {
                    ScrollTrigger.create({
                        trigger: element,
                        start: "top bottom",
                        end: "bottom top",
                        onEnter: () => {
                            gsap.fromTo(element,
                                { scrambleText: { text: "", chars: "" } },
                                {
                                    scrambleText: {
                                        text,
                                        chars: "upperAndLowerCase",
                                        revealDelay: 0,
                                    },
                                    duration,
                                }
                            );
                        },
                        onEnterBack: () => {
                            gsap.fromTo(element,
                                { scrambleText: { text: "", chars: "" } },
                                {
                                    scrambleText: {
                                        text,
                                        chars: "upperAndLowerCase",
                                        revealDelay: 0,
                                    },
                                    duration,
                                }
                            );
                        },
                    });
                } else {
                    // Fallback: character reveal
                    ScrollTrigger.create({
                        trigger: element,
                        start: "top bottom",
                        end: "bottom top",
                        onEnter: () => {
                            const chars = Array.from(text).map((char) => {
                                const span = document.createElement("span");
                                span.textContent = char === " " ? "\u00A0" : char;
                                span.style.display = "inline-block";
                                span.style.opacity = "0";
                                span.style.transform = "translateY(100%)";
                                return span;
                            });
                            
                            element.innerHTML = "";
                            chars.forEach(char => element.appendChild(char));
                            
                            gsap.to(chars, {
                                opacity: 1,
                                y: 0,
                                duration: duration,
                                ease: "power3.out",
                                stagger: {
                                    amount: duration * 0.5,
                                    from: "random",
                                },
                            });
                        },
                    });
                }
            });
        }

        initFlips();
        initScramble();

        // Add additional scroll-based animations for text elements
        textElements.forEach((el) => {
            const element = el as HTMLElement;
            
            // Blur effect on scroll
            ScrollTrigger.create({
                trigger: element,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
                onUpdate: (self) => {
                    const progress = self.progress;
                    const blur = Math.abs(progress - 0.5) * 4;
                    gsap.to(element, {
                        filter: `blur(${blur}px)`,
                        duration: 0.1,
                    });
                },
            });

            // Rotation effect for large elements
            if (element.classList.contains("el--xl")) {
                ScrollTrigger.create({
                    trigger: element,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                    onUpdate: (self) => {
                        const progress = self.progress;
                        const rotation = (progress - 0.5) * 20;
                        gsap.to(element, {
                            rotation: rotation,
                            duration: 0.1,
                        });
                    },
                });
            }

            // Scale effect
            ScrollTrigger.create({
                trigger: element,
                start: "top bottom",
                end: "center center",
                scrub: true,
                onUpdate: (self) => {
                    const progress = self.progress;
                    const scale = 0.8 + (progress * 0.4);
                    gsap.to(element, {
                        scale: scale,
                        duration: 0.1,
                    });
                },
            });
        });

        // Animate "Soirn Studio" brand text in the middle
        if (brandTextRef.current) {
            // Split text into characters for animation
            const text = brandTextRef.current.textContent || "";
            brandTextRef.current.innerHTML = "";
            const chars = Array.from(text).map((char, i) => {
                const span = document.createElement("span");
                span.textContent = char === " " ? "\u00A0" : char;
                span.style.display = "inline-block";
                span.style.opacity = "0";
                span.style.transform = "translateY(100px) rotateX(90deg)";
                return span;
            });
            chars.forEach(char => brandTextRef.current?.appendChild(char));

            // Initial reveal animation
            gsap.to(chars, {
                opacity: 1,
                y: 0,
                rotationX: 0,
                duration: 1.5,
                ease: "back.out(1.7)",
                stagger: {
                    amount: 0.8,
                    from: "center",
                },
                scrollTrigger: {
                    trigger: brandTextRef.current,
                    start: "top 80%",
                    toggleActions: "play none none none",
                },
            });

            // Continuous scroll animations
            ScrollTrigger.create({
                trigger: brandTextRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
                onUpdate: (self) => {
                    const progress = self.progress;
                    const scale = 1 + (progress * 0.3);
                    const blur = progress * 2;
                    const opacity = 1 - (progress * 0.4);
                    
                    gsap.to(brandTextRef.current, {
                        scale,
                        filter: `blur(${blur}px)`,
                        opacity: Math.max(0.6, opacity),
                        duration: 0.1,
                    });
                },
            });

            // Rotation animation on scroll
            ScrollTrigger.create({
                trigger: brandTextRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
                onUpdate: (self) => {
                    const progress = self.progress;
                    const rotation = progress * 360;
                    gsap.to(chars, {
                        rotationY: rotation,
                        duration: 0.1,
                        stagger: {
                            amount: 0.3,
                            from: "random",
                        },
                    });
                },
            });
        }

        // Animate enter button
        if (enterButtonRef.current) {
            gsap.fromTo(enterButtonRef.current,
                {
                    opacity: 0,
                    y: 50,
                    scale: 0.8,
                },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 1,
                    ease: "back.out(1.7)",
                    scrollTrigger: {
                        trigger: enterButtonRef.current,
                        start: "top 95%",
                        toggleActions: "play none none none",
                    },
                }
            );
        }

        // Handle resize
        const handleResize = () => {
            ScrollTrigger.refresh(true);
            initFlips();
            initScramble();
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
            if (smoother) {
                smoother.kill();
            }
        };
    }, []);

    const handleEnter = () => {
        setIsLoading(true);
    };

    const handleLoadingComplete = () => {
        router.push("/landing");
    };

    return (
        <>
            {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
            <div 
                ref={wrapperRef}
                id="smooth-wrapper"
                className="fixed inset-0 overflow-hidden bg-black"
            >
                <main 
                    ref={contentRef}
                    id="smooth-content"
                    className="relative"
                    style={{ minHeight: "500vh" }}
                >
                    {/* Header - transparent navbar */}
                    <div className="fixed top-0 left-0 right-0 z-50">
                        <Navbar transparent />
                    </div>

                    {/* "Soirn Studio" centered brand text */}
                    <div 
                        ref={brandTextRef}
                        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 pointer-events-none"
                        style={{ 
                            fontFamily: "var(--font-geist-mono)",
                            fontSize: "clamp(3rem, 12vw, 8rem)",
                            fontWeight: 400,
                            letterSpacing: "0.05em",
                            textTransform: "uppercase",
                            color: "rgba(255, 255, 255, 0.95)",
                            transformStyle: "preserve-3d",
                            perspective: "1000px",
                        }}
                    >
                        Soirn Studio
                    </div>

                    {/* Content with proper padding */}
                    <div className="content">
                        {textGroups.map((group, groupIndex) => (
                            <div 
                                key={groupIndex} 
                                className="group"
                            >
                                {group.items.map((item, itemIndex) => {
                                    const isLarge = "isLarge" in item && item.isLarge;
                                    const isTyping = "isTyping" in item && item.isTyping;
                                    
                                    return (
                                        <div
                                            key={itemIndex}
                                            className={`el ${item.pos} ${isLarge ? "el--xl" : ""} ${isTyping ? "typing-indicator" : ""}`}
                                            data-alt-pos={item.altPos}
                                            data-scramble-duration={("scrambleDuration" in item ? item.scrambleDuration : 1)}
                                        >
                                            {item.text}
                                        </div>
                                    );
                                })}
                            </div>
                        ))}
                    </div>

                    {/* Enter button at the bottom */}
                    <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-center py-16 bg-black/80 backdrop-blur-sm border-t" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
                        <button
                            ref={enterButtonRef}
                            onClick={handleEnter}
                            className="px-10 py-5 text-sm tracking-[0.2em] uppercase text-white/80 hover:text-white font-light transition-all border rounded-full hover:scale-110"
                            style={{ borderColor: "rgba(255,255,255,0.2)" }}
                        >
                            Enter
                        </button>
                    </div>
                </main>
            </div>
        </>
    );
}
