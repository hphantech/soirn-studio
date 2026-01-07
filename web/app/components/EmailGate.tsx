"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EmailGate() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMsg(null);

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "gate" }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setMsg(data?.error ?? "Something went wrong. Try again.");
        setLoading(false);
        return;
      }

      // success (including already)
      router.push("/landing");
    } catch {
      setMsg("Network error. Try again.");
      setLoading(false);
    }
  }

  return (
    <main className="relative min-h-[100svh] overflow-hidden bg-black">
      {/* Background (use your own assets) */}
      <div className="absolute inset-0">
        <video
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/gate.jpg"
        >
          <source src="/gate.mp4" type="video/mp4" />
        </video>

        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(/gate.jpg)" }}
        />

        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-black/45" />
          <div className="absolute inset-0 [background:radial-gradient(70%_70%_at_50%_35%,rgba(0,0,0,0.15)_0%,rgba(0,0,0,0.75)_70%,rgba(0,0,0,0.95)_100%)]" />
        </div>
      </div>

      {/* Top-left label */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 pt-10">
        <p className="text-xs tracking-[0.45em] uppercase text-white/75">
          SOIRN STUDIO
        </p>
      </div>

      {/* Center copy */}
      <section className="relative z-10 mx-auto flex min-h-[calc(100svh-120px)] max-w-6xl flex-col items-center justify-center px-6 text-center">
        <h1 className="text-5xl font-light leading-[0.95] text-white md:text-7xl">
          Minimal. Grunge. Limited.
        </h1>

        <p className="mt-5 max-w-lg text-sm text-white/70">
          Dark premium essentials. Small batches. No restocks.
        </p>

        <form onSubmit={onSubmit} className="mt-10 w-full max-w-md">
          <div className="flex items-center gap-3">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email to continue"
              disabled={loading}
              className="h-12 w-full rounded-full border bg-black/25 px-5 text-sm text-white placeholder:text-white/40 outline-none"
              style={{ borderColor: "rgba(255,255,255,0.14)" }}
            />

            <button
              type="submit"
              disabled={loading}
              className="h-12 shrink-0 rounded-full bg-white px-6 text-sm text-black hover:opacity-90 disabled:opacity-60"
            >
              {loading ? "..." : "Continue"}
            </button>
          </div>

          {msg && (
            <p className="mt-3 text-sm text-white/70">
              {msg}
            </p>
          )}
        </form>
      </section>
    </main>
  );
}
