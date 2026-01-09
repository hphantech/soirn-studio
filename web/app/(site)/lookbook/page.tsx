"use client";

import { useEffect } from "react";
import { lookbookData } from "./lookbookData";
import GradientCarousel from "../../components/lookbook/GradientCarousel";

/**
 * 3D Infinite Gradient Carousel Lookbook
 * Based on Codrops 3D Gradient Carousel
 */
export default function LookbookPage() {
  // Prevent body scroll and make page full screen
  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    document.body.style.height = "100vh";
    document.documentElement.style.height = "100vh";

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      document.body.style.height = "";
      document.documentElement.style.height = "";
    };
  }, []);

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden">
      <GradientCarousel looks={lookbookData} />
    </div>
  );
}
