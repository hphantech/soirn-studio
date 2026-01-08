"use client";

import { useState, useEffect } from "react";

export default function NewsletterPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    // Show popup after 3 seconds if user hasn't subscribed
    const hasSeenPopup = localStorage.getItem("soirn_newsletter_seen");
    if (!hasSeenPopup) {
      const timer = setTimeout(() => setIsOpen(true), 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "newsletter_popup" }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setMessage(data?.error ?? "Something went wrong. Try again.");
        setLoading(false);
        return;
      }

      setMessage("Thanks! You're in.");
      localStorage.setItem("soirn_newsletter_seen", "true");
      setTimeout(() => {
        setIsOpen(false);
      }, 2000);
    } catch {
      setMessage("Network error. Try again.");
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={() => {
          setIsOpen(false);
          localStorage.setItem("soirn_newsletter_seen", "true");
        }}
        className="fixed inset-0 z-[80] bg-black/70 backdrop-blur-sm"
      />

      {/* Popup */}
      <div className="fixed left-1/2 top-1/2 z-[90] w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 transform">
        <div
          className="rounded-2xl border p-8"
          style={{
            borderColor: "rgba(255,255,255,0.12)",
            background: "rgba(10,10,10,0.95)",
            backdropFilter: "blur(20px)",
          }}
        >
          <button
            onClick={() => {
              setIsOpen(false);
              localStorage.setItem("soirn_newsletter_seen", "true");
            }}
            className="absolute right-4 top-4 text-white/60 hover:text-white"
            aria-label="Close"
          >
            ✕
          </button>

          <h2 className="text-2xl font-light text-white">
            Join us for the good sh*t ☻
          </h2>
          <p className="mt-3 text-sm text-white/70">
            Keep updated with the community and be the first to know about exclusive new drops ☆
          </p>

          <form onSubmit={handleSubmit} className="mt-6">
            <div className="flex gap-3">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email ★"
                disabled={loading}
                className="h-12 flex-1 rounded-full border bg-white/5 px-5 text-sm text-white placeholder:text-white/40 outline-none focus:border-white/30"
                style={{ borderColor: "rgba(255,255,255,0.14)" }}
              />
              <button
                type="submit"
                disabled={loading}
                className="h-12 shrink-0 rounded-full bg-white px-6 text-sm font-medium text-black hover:opacity-90 disabled:opacity-60"
              >
                {loading ? "..." : "Sign up"}
              </button>
            </div>

            {message && (
              <p className="mt-3 text-sm text-white/70">{message}</p>
            )}
          </form>

          <p className="mt-4 text-xs text-white/50">
            You'll only be contacted for drop access. No spam.
          </p>
        </div>
      </div>
    </>
  );
}
