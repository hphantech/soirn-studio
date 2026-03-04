import Link from "next/link";
import { brandConfig } from "@/src/config/brand";

export default function AboutPage() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-sm tracking-[0.25em] uppercase text-white/60">
          About
        </p>
        <h1 className="mt-4 text-4xl md:text-6xl leading-[1.05] text-white">
          {brandConfig.brandName}
        </h1>

        <p className="mt-6 max-w-2xl text-white/70 leading-relaxed">
          {brandConfig.description}
        </p>

        <div className="mt-10 flex gap-4">
          <Link
            href={brandConfig.primaryCtaHref}
            className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-medium text-black hover:opacity-90 transition-all hover:scale-105 active:scale-95"
          >
            {brandConfig.primaryCtaLabel}
          </Link>
          {brandConfig.secondaryCtaHref && brandConfig.secondaryCtaLabel && (
            <Link
              href={brandConfig.secondaryCtaHref}
              className="inline-flex items-center justify-center rounded-full border px-6 py-3 text-sm text-white/80 hover:text-white transition-all hover:scale-105 active:scale-95"
              style={{ borderColor: "rgba(255,255,255,0.14)" }}
            >
              {brandConfig.secondaryCtaLabel}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
