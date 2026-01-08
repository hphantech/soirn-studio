import Link from "next/link";

export default function AboutPage() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-sm tracking-[0.25em] uppercase text-white/60">About</p>
        <h1 className="mt-4 text-4xl md:text-6xl leading-[1.05] text-white">
          Soirn Studio
        </h1>

        <p className="mt-6 max-w-2xl text-white/70 leading-relaxed">
          Soirn Studio is built on structured chaos — sculpted silhouettes,
          heavyweight materials, and limited drops. We design with restraint and
          intent: fewer pieces, sharper execution.
        </p>

        <div className="mt-10 flex gap-4">
          <Link
            href="/drop/drop-001"
            className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-medium text-black hover:opacity-90 transition-all hover:scale-105 active:scale-95"
          >
            View Drop 001
          </Link>
          <Link
            href="/waitlist"
            className="inline-flex items-center justify-center rounded-full border px-6 py-3 text-sm text-white/80 hover:text-white transition-all hover:scale-105 active:scale-95"
            style={{ borderColor: "rgba(255,255,255,0.14)" }}
          >
            Join waitlist
          </Link>
        </div>
      </div>
    </section>
  );
}
