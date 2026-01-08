"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("soirn_cookie_consent");
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("soirn_cookie_consent", "accepted");
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("soirn_cookie_consent", "declined");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[100] border-t bg-black/95 backdrop-blur-sm"
      style={{ borderColor: "rgba(255,255,255,0.08)" }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <p className="text-sm text-white/80">
          This site uses cookies to improve your experience.{" "}
          <Link href="/contact" className="underline underline-offset-2 hover:text-white">
            Privacy Policy
          </Link>
        </p>

        <div className="flex items-center gap-3">
          <button
            onClick={handleDecline}
            className="rounded-full border px-4 py-2 text-xs text-white/70 hover:text-white"
            style={{ borderColor: "rgba(255,255,255,0.14)" }}
          >
            Decline
          </button>
          <button
            onClick={handleAccept}
            className="rounded-full border px-4 py-2 text-xs text-white/70 hover:text-white"
            style={{ borderColor: "rgba(255,255,255,0.14)" }}
          >
            OK Cool
          </button>
        </div>
      </div>
    </div>
  );
}
