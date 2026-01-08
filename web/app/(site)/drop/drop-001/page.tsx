import Link from "next/link";

export default function Drop001Page() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex items-center justify-between gap-6">
          <div>
            <p className="text-sm tracking-[0.25em] uppercase text-white/60">
              Drop
            </p>
            <h1 className="mt-3 text-4xl md:text-6xl leading-[1.05] text-white">
              Drop 001
            </h1>
            <p className="mt-5 max-w-2xl text-white/70">
              Limited release. 100 pieces. Built from heavy materials with
              sculpted silhouettes. No restocks.
            </p>
          </div>

          <Link
            href="/waitlist"
            className="hidden md:inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium text-black bg-white hover:opacity-90 transition-all hover:scale-105 active:scale-95"
          >
            Join waitlist
          </Link>
        </div>

        <div
          className="mt-12 grid gap-4 rounded-2xl border p-6 md:grid-cols-3"
          style={{ borderColor: "rgba(255,255,255,0.08)" }}
        >
          <Stat label="Pieces" value="100" />
          <Stat label="Release" value="TBA" />
          <Stat label="Shipping" value="Worldwide" />
        </div>

        <div className="mt-14 grid gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <h2 className="text-xl text-white">Overview</h2>
            <p className="mt-4 text-white/70 leading-relaxed">
              Drop 001 is our first statement: structured chaos, engineered in
              silhouette and finished with restraint. Each item is produced in a
              strict limited quantity and will not be restocked.
            </p>

            <h3 className="mt-10 text-xl text-white">Pieces</h3>
            <ul className="mt-4 space-y-3 text-white/70">
              <li>• Heavy washed hoodie (3-panel hood, structured seams)</li>
              <li>• Barrel-fit pants (architectural line, clean taper)</li>
            </ul>

            <h3 className="mt-10 text-xl text-white">Details</h3>
            <ul className="mt-4 space-y-3 text-white/70">
              <li>• Materials: TBA (heavyweight focus)</li>
              <li>• Fit: sculpted / structured</li>
              <li>• Finish: minimal branding</li>
            </ul>
          </div>

          <div className="md:col-span-5">
            <div
              className="rounded-2xl border p-6"
              style={{ borderColor: "rgba(255,255,255,0.08)" }}
            >
              <p className="text-sm tracking-[0.25em] uppercase text-white/60">
                Status
              </p>
              <p className="mt-3 text-2xl text-white">Waitlist open</p>
              <p className="mt-3 text-white/70">
                Join to get early access. When the drop goes live, you’ll get
                first notification.
              </p>

              <Link
                href="/waitlist"
                className="mt-6 inline-flex w-full items-center justify-center rounded-full px-5 py-3 text-sm font-medium text-black bg-white hover:opacity-90 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                Join waitlist
              </Link>

              <p className="mt-4 text-xs text-white/50">
                You’ll only be contacted for drop access. No spam.
              </p>
            </div>

            <Link
              href="/"
              className="mt-6 inline-flex text-sm text-white/60 hover:text-white"
            >
              ← Back to home
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-sm text-white/60">{label}</p>
      <p className="mt-2 text-2xl text-white">{value}</p>
    </div>
  );
}
