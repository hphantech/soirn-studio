"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Look } from "../../../(site)/lookbook/lookbookData";
import { useLockBodyScroll } from "./useLockBodyScroll";

interface LookModalProps {
  isOpen: boolean;
  looks: Look[];
  initialIndex: number;
  onClose: () => void;
}

/**
 * Premium modal viewer for individual looks
 * Dark overlay, centered media, navigation controls
 */
export default function LookModal({
  isOpen,
  looks,
  initialIndex,
  onClose,
}: LookModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

  useLockBodyScroll(isOpen);

  // Reset to initial index when modal opens
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
      setCurrentMediaIndex(0);
    }
  }, [isOpen, initialIndex]);

  const currentLook = looks[currentIndex];
  const currentMedia = currentLook?.media[currentMediaIndex];

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        if (currentMediaIndex > 0) {
          setCurrentMediaIndex(currentMediaIndex - 1);
        } else if (currentIndex > 0) {
          setCurrentIndex(currentIndex - 1);
          setCurrentMediaIndex(looks[currentIndex - 1].media.length - 1);
        }
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        if (currentMediaIndex < currentLook.media.length - 1) {
          setCurrentMediaIndex(currentMediaIndex + 1);
        } else if (currentIndex < looks.length - 1) {
          setCurrentIndex(currentIndex + 1);
          setCurrentMediaIndex(0);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, currentIndex, currentMediaIndex, currentLook, looks, onClose]);

  const handlePrevious = () => {
    if (currentMediaIndex > 0) {
      setCurrentMediaIndex(currentMediaIndex - 1);
    } else if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setCurrentMediaIndex(looks[currentIndex - 1].media.length - 1);
    }
  };

  const handleNext = () => {
    if (currentMediaIndex < currentLook.media.length - 1) {
      setCurrentMediaIndex(currentMediaIndex + 1);
    } else if (currentIndex < looks.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setCurrentMediaIndex(0);
    }
  };

  const canGoPrevious = currentIndex > 0 || currentMediaIndex > 0;
  const canGoNext =
    currentIndex < looks.length - 1 ||
    currentMediaIndex < currentLook.media.length - 1;

  if (!currentLook || !currentMedia) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Dark overlay with blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 z-[80] bg-black/85 backdrop-blur-md"
          />

          {/* Modal content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-[81] flex items-center justify-center pointer-events-none"
            onClick={onClose}
          >
            <div
              className="relative max-w-[95vw] max-h-[95vh] pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Media container */}
              <div className="relative bg-black/20 rounded overflow-hidden">
                {currentMedia.type === "image" ? (
                  <Image
                    src={currentMedia.src}
                    alt={currentMedia.alt || currentLook.title || `Look ${currentLook.id}`}
                    width={1200}
                    height={1600}
                    className="max-w-full max-h-[90vh] w-auto h-auto object-contain"
                    priority
                  />
                ) : (
                  <video
                    src={currentMedia.src}
                    controls
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="max-w-full max-h-[90vh] w-auto h-auto"
                  />
                )}
              </div>

              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors z-10"
                aria-label="Close viewer"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {/* Navigation arrows */}
              {canGoPrevious && (
                <button
                  onClick={handlePrevious}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors z-10"
                  aria-label="Previous"
                >
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 19.5L8.25 12l7.5-7.5"
                    />
                  </svg>
                </button>
              )}

              {canGoNext && (
                <button
                  onClick={handleNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors z-10"
                  aria-label="Next"
                >
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 4.5l7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </button>
              )}

              {/* Index indicator */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-xs tracking-[0.2em] uppercase font-light">
                {String(currentIndex + 1).padStart(2, "0")} / {String(looks.length).padStart(2, "0")}
                {currentLook.media.length > 1 && (
                  <span className="ml-2 text-white/40">
                    ({currentMediaIndex + 1} / {currentLook.media.length})
                  </span>
                )}
              </div>

              {/* Optional caption */}
              {currentLook.title && (
                <div className="absolute bottom-16 left-1/2 -translate-x-1/2 text-white/50 text-xs tracking-[0.15em] uppercase font-light text-center max-w-md">
                  {currentLook.title}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
