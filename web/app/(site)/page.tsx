import WaitlistForm from "../components/waitlist/WaitlistForm";


export default function Page() {
  return (
    <>
      {/* HERO */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-sm tracking-[0.25em] uppercase text-white/60">
            Soirn Studio
          </p>

          <h1 className="mt-4 text-4xl md:text-6xl leading-[1.05] text-white">
            Structured chaos.
            <br />
            Built to last.
          </h1>

          <p className="mt-6 max-w-xl text-white/70">
            Limited drops. Heavy materials. Sculpted silhouettes.
          </p>
        </div>
      </section>

      {/* WAITLIST */}
      <section id="waitlist" className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div
            className="rounded-2xl border p-8 md:p-10"
            style={{ borderColor: "rgba(255,255,255,0.08)" }}
          >
            <p className="text-sm tracking-[0.25em] uppercase text-white/60">
              Waitlist
            </p>

            <h2 className="mt-4 text-2xl md:text-3xl text-white">
              Get early access to Drop 001
            </h2>

            <p className="mt-3 max-w-xl text-white/70">
              100 pieces. No restocks. Join to get first access when it goes
              live.
            </p>

            <WaitlistForm />

            <p className="mt-4 text-xs text-white/50">
              We only email for drop access. No spam.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
