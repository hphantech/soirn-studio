"use client";

import { useState } from "react";

export default function WaitlistForm() {
  const [email, setEmail] = useState("");

  return (
    <form
      className="mt-8 flex flex-col gap-3 sm:flex-row"
      onSubmit={(e) => {
        e.preventDefault();
        // temporary: later we POST to /api/waitlist
        alert(`Saved: ${email}`);
        setEmail("");
      }}
    >
      <input
        type="email"
        name="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        className="h-12 w-full rounded-full border bg-transparent px-5 text-white placeholder:text-white/40 outline-none"
        style={{ borderColor: "rgba(255,255,255,0.14)" }}
      />
      <button
        type="submit"
        className="h-12 rounded-full bg-white px-6 text-sm text-black hover:opacity-90"
      >
        Join waitlist
      </button>
    </form>
  );
}
