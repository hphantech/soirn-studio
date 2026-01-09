"use client";

import { useState } from "react";
import Image from "next/image";

export default function ImageGallery({ images }: { images: string[] }) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (images.length === 0) return null;

  return (
    <div className="flex gap-4 h-full">
      {/* Vertical thumbnails on the left */}
      {images.length > 1 && (
        <div className="flex flex-col gap-2 overflow-y-auto">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedIndex(idx)}
              className={`relative w-16 h-20 shrink-0 overflow-hidden border transition-all ${
                selectedIndex === idx
                  ? "border-white/40"
                  : "border-white/10 opacity-60 hover:opacity-100"
              }`}
            >
              <Image
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                fill
                className="object-cover"
                sizes="64px"
              />
            </button>
          ))}
        </div>
      )}

      {/* Main large image - big and prominent */}
      <div className="flex-1 relative min-h-[600px] lg:min-h-[70vh] overflow-hidden border bg-white/[0.02]" style={{ borderColor: "rgba(255,255,255,0.10)" }}>
        <Image
          src={images[selectedIndex]}
          alt={`Product image ${selectedIndex + 1}`}
          fill
          className="object-contain"
          sizes="(max-width: 1024px) 100vw, 65vw"
          priority={selectedIndex === 0}
        />
      </div>
    </div>
  );
}
