"use client";

import { useState } from "react";
import Link from "next/link";

export default function AnnouncementBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="relative z-50 border-b bg-black" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
      <div className="mx-auto flex max-w-6xl items-center justify-center px-6 py-2.5">
        <p className="text-center text-xs text-white/80">
          Limited drops. Heavy materials. Sculpted silhouettes.{" "}
          <Link href="/drop/drop-001" className="underline underline-offset-2 hover:text-white">
            View Drop 001 →
          </Link>
        </p>
        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-6 text-white/60 hover:text-white"
          aria-label="Close banner"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
