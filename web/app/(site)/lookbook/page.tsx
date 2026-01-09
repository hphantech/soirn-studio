"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import ScrollProgress from "../../components/ui/ScrollProgress";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

// Lookbook images - using product images
const lookbookImages = [
    { src: "/products/hoodie-1.jpg", alt: "Lookbook Image 1", id: 1 },
    { src: "/products/hoodie-2.jpg", alt: "Lookbook Image 2", id: 2 },
    { src: "/products/hoodie-3.jpg", alt: "Lookbook Image 3", id: 3 },
    { src: "/products/hoodie-black.jpg", alt: "Lookbook Image 4", id: 4 },
    { src: "/products/hoodie-1.jpg", alt: "Lookbook Image 5", id: 5 },
];

function LookbookImage({ 
    image, 
    onVisible 
}: { 
    image: { src: string; alt: string; id: number };
    onVisible: (id: number) => void;
}) {
    const sectionRef = useRef<HTMLElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const numberRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        if (!sectionRef.current || !imageRef.current || !numberRef.current) return;

        // Image reveal animation
        gsap.fromTo(imageRef.current,
            {
                opacity: 0,
                scale: 0.9,
                y: 50,
            },
            {
                opacity: 1,
                scale: 1,
                y: 0,
                duration: 1.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 85%",
                    end: "top 50%",
                    toggleActions: "play none none none",
                },
            }
        );

        // Parallax effect for the number
        gsap.to(numberRef.current, {
            y: 250,
            ease: "none",
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
            },
        });

        // Scale effect for image on scroll
        gsap.fromTo(imageRef.current, 
            {
                scale: 0.96,
            },
            {
                scale: 1,
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top bottom",
                    end: "center center",
                    scrub: true,
                },
            }
        );

        // Opacity for number
        gsap.fromTo(numberRef.current,
            {
                opacity: 0,
            },
            {
                opacity: 1,
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    end: "center center",
                    scrub: true,
                },
            }
        );

        // Track visibility using IntersectionObserver
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
                        onVisible(image.id);
                    }
                });
            },
            { threshold: 0.5 }
        );

        observer.observe(sectionRef.current);
        return () => {
            observer.disconnect();
            ScrollTrigger.getAll().forEach(trigger => {
                if (trigger.trigger === sectionRef.current) {
                    trigger.kill();
                }
            });
        };
    }, [image.id, onVisible]);

    return (
        <section 
            ref={sectionRef}
            className="h-[70vh] snap-start flex justify-center items-center relative overflow-hidden"
        >
            <div 
                ref={imageRef}
                className="w-[90vw] h-[80vh] sm:w-[85vw] sm:h-[85vh] md:w-[75vw] md:h-[80vh] max-w-[1200px] max-h-[900px] mx-5 bg-white/[0.02] overflow-hidden"
            >
                <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 90vw, 75vw"
                    priority={image.id <= 2}
                />
            </div>
            <h2
                ref={numberRef}
                className="text-white/60 m-0 font-mono text-2xl md:text-5xl font-light tracking-[-0.03em] absolute top-1/2 -translate-y-1/2 left-1/2 translate-x-[80px] sm:translate-x-[120px] md:translate-x-[200px] pointer-events-none opacity-0"
            >
                {`#00${image.id}`}
            </h2>
        </section>
    );
}

export default function LookbookPage() {
    const progressBarRef = useRef<HTMLDivElement>(null);
    const indicatorRef = useRef<HTMLDivElement>(null);
    const [currentImage, setCurrentImage] = useState(1);

    const handleVisible = useCallback((id: number) => {
        setCurrentImage(id);
    }, []);

    useEffect(() => {
        // Progress bar animation
        if (progressBarRef.current) {
            gsap.to(progressBarRef.current, {
                scaleX: 1,
                ease: "none",
                scrollTrigger: {
                    trigger: "main",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: true,
                },
            });
        }

        // Fade in indicator
        if (indicatorRef.current) {
            gsap.fromTo(indicatorRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 0.6 }
            );
        }

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <>
            <style jsx global>{`
                html {
                    scroll-snap-type: y proximity;
                }
                @media (prefers-reduced-motion: no-preference) {
                    html {
                        scroll-behavior: smooth;
                    }
                }
            `}</style>
            <main className="bg-black min-h-screen">
                <ScrollProgress />
                {lookbookImages.map((image) => (
                    <LookbookImage 
                        key={image.id} 
                        image={image} 
                        onVisible={handleVisible}
                    />
                ))}
                <div
                    ref={progressBarRef}
                    className="fixed left-0 right-0 h-[1px] bg-white/40 bottom-12 origin-left z-50"
                    style={{ transform: "scaleX(0)" }}
                />
                {/* Current image indicator */}
                <div
                    ref={indicatorRef}
                    className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 opacity-0"
                >
                    <div className="text-white/60 font-mono text-sm md:text-base tracking-[0.1em] uppercase">
                        {currentImage} / {lookbookImages.length}
                    </div>
                </div>
            </main>
        </>
    );
}
