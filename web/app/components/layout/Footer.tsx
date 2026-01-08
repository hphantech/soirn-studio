import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t mt-auto" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div>
            <p className="text-xs tracking-[0.32em] uppercase text-white/80 mb-3">
              SOIRN STUDIO
            </p>
            <p className="text-sm text-white/60 max-w-xs">
              Structured chaos. Built to last. Limited drops. Heavy materials.
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="text-xs tracking-[0.25em] uppercase text-white/60 mb-4">
              Quick Links
            </p>
            <div className="flex flex-col gap-3 text-sm text-white/70">
              <Link href="/shop" className="hover:text-white transition-colors">
                Shop
              </Link>
              <Link href="/drop/drop-001" className="hover:text-white transition-colors">
                Drop 001
              </Link>
              <Link href="/about" className="hover:text-white transition-colors">
                About
              </Link>
              <Link href="/waitlist" className="hover:text-white transition-colors">
                Waitlist
              </Link>
            </div>
          </div>

          {/* Support */}
          <div>
            <p className="text-xs tracking-[0.25em] uppercase text-white/60 mb-4">
              Support
            </p>
            <div className="flex flex-col gap-3 text-sm text-white/70">
              <Link href="/shipping-returns" className="hover:text-white transition-colors">
                Shipping & Returns
              </Link>
              <Link href="/contact" className="hover:text-white transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t flex flex-col gap-4 text-sm text-white/60 md:flex-row md:items-center md:justify-between" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
          <p>© {new Date().getFullYear()} Soirn Studio. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/contact" className="hover:text-white transition-colors">
              Privacy
            </Link>
            <Link href="/contact" className="hover:text-white transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

