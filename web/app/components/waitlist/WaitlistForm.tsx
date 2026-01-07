"use client";

import { useState } from "react";

type Props = {
  variant?: "default" | "minimal";
};

export default function WaitlistForm({ variant = "default" }: Props) {
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
        body: JSON.stringify({ email, source: "waitlist" }),
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

  const inputClass =
    variant === "minimal"
      ? "h-12 w-full rounded-full border border-white/20 bg-black/20 px-5 text-white placeholder:text-white/45 outline-none backdrop-blur-md"
      : "h-12 w-full rounded-full border bg-transparent px-5 text-white placeholder:text-white/40 outline-none";

  const buttonClass =
    variant === "minimal"
      ? "h-12 rounded-full bg-white px-6 text-sm text-black hover:opacity-90 disabled:opacity-60"
      : "h-12 rounded-full bg-white px-6 text-sm text-black hover:opacity-90 disabled:opacity-60";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
      <input
        type="email"
        name="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        className={inputClass}
        disabled={loading}
      />

      <button type="submit" disabled={loading} className={buttonClass}>
        {loading ? "Joining..." : "Join waitlist"}
      </button>

      {message && (
        <p className="text-sm text-white/70 sm:ml-3 sm:self-center">
          {message}
        </p>
      )}
    </form>
  );
}
