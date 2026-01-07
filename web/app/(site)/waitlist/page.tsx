import WaitlistForm from "../../components/waitlist/WaitlistForm";



export default function WaitlistPage() {
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
          poster="/waitlist.jpg"
        >
          <source src="/waitlist.mp4" type="video/mp4" />
        </video>

        {/* IMAGE fallback if video fails (keeps it usable) */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(/waitlist.jpg)" }}
        />

        {/* MISBHV-style subtle overlays for readability */}
        <div className="pointer-events-none absolute inset-0">
          {/* top/bottom fade */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/5 to-black/35" />
          {/* soft vignette */}
          <div className="absolute inset-0 [background:radial-gradient(70%_70%_at_50%_45%,rgba(0,0,0,0)_0%,rgba(0,0,0,0.35)_55%,rgba(0,0,0,0.75)_100%)]" />
          {/* grain */}
          <div className="absolute inset-0 opacity-[0.06] mix-blend-overlay bg-[url('/grain.png')]" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-6xl flex-col items-center justify-center px-6 text-center">
        {/* Small top label */}
        <p className="text-xs tracking-[0.45em] uppercase text-white/85">
          SOIRN STUDIO
        </p>

        {/* Big centered headline (minimal) */}
        <h1 className="mt-6 text-4xl font-light leading-[0.95] text-white md:text-6xl">
          DROP 001
          <br />
          EARLY ACCESS
        </h1>

        {/* Subline */}
        <p className="mt-6 max-w-md text-sm text-white/75">
          100 pieces. No restocks. Join to get first access when it goes live.
        </p>

        {/* Form - restrained (not a big card) */}
        <div className="mt-10 w-full max-w-xl">
          <WaitlistForm variant="minimal" />
          <p className="mt-3 text-xs text-white/55">
            We only email for drop access. No spam.
          </p>
        </div>
      </div>
    </main>
  );
}
