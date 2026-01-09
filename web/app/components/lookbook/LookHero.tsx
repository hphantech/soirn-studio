"use client";

import Image from "next/image";
import { Look } from "../../../(site)/lookbook/lookbookData";

interface LookHeroProps {
  look: Look;
}

/**
 * Hero section for lookbook
 * Full-bleed media with minimal overlay text
 */
export default function LookHero({ look }: LookHeroProps) {
  const heroMedia = look.media[0];

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black">
      {heroMedia.type === "image" ? (
        <Image
          src={heroMedia.src}
          alt={heroMedia.alt || look.title || "Lookbook hero"}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      ) : (
        <video
          src={heroMedia.src}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="w-full h-full object-cover"
        />
      )}

      {/* Minimal overlay text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <div className="text-center space-y-4">
          <h1 className="text-white/90 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-[0.1em] uppercase">
            SOIRN STUDIO
          </h1>
          <p className="text-white/60 text-xs sm:text-sm tracking-[0.3em] uppercase font-light">
            LOOKBOOK
          </p>
          <p className="text-white/40 text-[10px] sm:text-xs tracking-[0.2em] uppercase font-light mt-8">
            {look.season}
          </p>
        </div>
      </div>
    </section>
  );
}
