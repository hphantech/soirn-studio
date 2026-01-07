"use client";

import { useState } from "react";

export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "site" }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setMessage(data?.error ?? "Something went wrong. Try again.");
      } else if (data?.already) {
        setMessage("You’re already on the list.");
        setEmail("");
      } else {
        setMessage("You’re on the list.");
        setEmail("");
      }
    } catch {
      setMessage("Network error. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-3 sm:flex-row">
      <input
        type="email"
        name="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        className="h-12 w-full rounded-full border bg-transparent px-5 text-white placeholder:text-white/40 outline-none"
        style={{ borderColor: "rgba(255,255,255,0.14)" }}
        disabled={loading}
      />

      <button
        type="submit"
        disabled={loading}
        className="h-12 rounded-full bg-white px-6 text-sm text-black hover:opacity-90 disabled:opacity-60"
      >
        {loading ? "Joining..." : "Join waitlist"}
      </button>

      {message && (
        <p className="text-sm text-white/70 sm:ml-2 sm:self-center">{message}</p>
      )}
    </form>
  );
}
