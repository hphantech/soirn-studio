"use client";

import Image from "next/image";
import { Look } from "../../../(site)/lookbook/lookbookData";

interface LookGridProps {
  looks: Look[];
  onLookClick: (index: number) => void;
}

/**
 * Editorial grid of looks
 * Clean, minimal, premium feel
 */
export default function LookGrid({ looks, onLookClick }: LookGridProps) {
  return (
    <section className="bg-white py-16 sm:py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
          {looks.map((look, index) => {
            const firstMedia = look.media[0];
            const aspectClass =
              look.aspect === "landscape"
                ? "aspect-[4/3]"
                : look.aspect === "square"
                ? "aspect-square"
                : "aspect-[3/4]";

            return (
              <button
                key={look.id}
                onClick={() => onLookClick(index)}
                className="group text-left w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                aria-label={`View ${look.title || `Look ${look.id}`}`}
              >
                <div className={`relative w-full ${aspectClass} overflow-hidden bg-black/5 mb-3`}>
                  {firstMedia.type === "image" ? (
                    <Image
                      src={firstMedia.src}
                      alt={firstMedia.alt || look.title || `Look ${look.id}`}
                      fill
                      className="object-cover transition-opacity duration-500 group-hover:opacity-90"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      loading={index < 6 ? "eager" : "lazy"}
                    />
                  ) : (
                    <video
                      src={firstMedia.src}
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      className="w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-90"
                    />
                  )}
                </div>

                {/* Minimal caption */}
                {look.title && (
                  <p className="text-black/60 text-xs tracking-[0.15em] uppercase font-light mt-2">
                    {look.title}
                  </p>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
