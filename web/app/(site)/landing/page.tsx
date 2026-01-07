import Link from "next/link";

export default function HomePage() {
  return (
    <main className="relative min-h-[100svh] overflow-hidden bg-black">
      {/* Background media */}
      <div className="absolute inset-0">
        {/* VIDEO (preferred) */}
        <video
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/home.jpg"
        >
          <source src="/home.mp4" type="video/mp4" />
        </video>

        {/* IMAGE fallback */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(/home.jpg)" }}
        />

        {/* overlays for readability */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/10 to-black/55" />
          <div className="absolute inset-0 [background:radial-gradient(70%_70%_at_50%_40%,rgba(0,0,0,0)_0%,rgba(0,0,0,0.35)_55%,rgba(0,0,0,0.85)_100%)]" />
          {/* optional grain */}
          {/* <div className="absolute inset-0 opacity-[0.06] mix-blend-overlay bg-[url('/grain.png')]" /> */}
        </div>
      </div>

      {/* Centered campaign copy */}
      <section className="relative z-10 mx-auto flex min-h-[100svh] max-w-6xl flex-col items-center justify-center px-6 text-center">
        <p className="text-xs tracking-[0.45em] uppercase text-white/80">
          SOIRN STUDIO
        </p>

        <h1 className="mt-6 text-5xl font-light leading-[0.92] text-white md:text-7xl">
          Structured chaos.
          <br />
          Built to last.
        </h1>

        <p className="mt-7 max-w-md text-sm text-white/70">
          Limited drops. Heavy materials. Sculpted silhouettes.
        </p>

        <div className="mt-10 flex items-center gap-3">
          <Link
            href="/waitlist"
            className="rounded-full bg-white px-6 py-3 text-sm text-black hover:opacity-90"
          >
            Join waitlist
          </Link>

          <Link
            href="/drop/drop-001"
            className="rounded-full border border-white/25 bg-black/20 px-6 py-3 text-sm text-white hover:border-white/40"
          >
            View Drop 001
          </Link>
        </div>
      </section>
    </main>
  );
}
