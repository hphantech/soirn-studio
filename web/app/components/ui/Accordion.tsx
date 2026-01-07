"use client";

import { useState } from "react";

export function AccordionItem({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div
      className="border-t py-5"
      style={{ borderColor: "rgba(255,255,255,0.10)" }}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between text-left"
      >
        <span className="text-xs tracking-[0.28em] uppercase text-white/70">
          {title}
        </span>
        <span className="text-white/60">{open ? "−" : "+"}</span>
      </button>

      {open && <div className="pt-4 text-sm text-white/65">{children}</div>}
    </div>
  );
}
