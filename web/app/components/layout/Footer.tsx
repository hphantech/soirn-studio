import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t mt-auto bg-black" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-white/60 mb-4 font-light">
              SOIRN
            </p>
            <p className="text-xs text-white/40 max-w-xs leading-relaxed">
              Structured chaos. Built to last. Limited drops. Heavy materials.
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="text-xs tracking-[0.15em] uppercase text-white/40 mb-4 font-light">
              Links
            </p>
            <div className="flex flex-col gap-3 text-xs text-white/50 tracking-[0.05em] uppercase font-light">
              <Link href="/shop" className="hover:text-white/80 transition-colors">
                Shop
              </Link>
              <Link href="/drop/drop-001" className="hover:text-white/80 transition-colors">
                Drop 001
              </Link>
              <Link href="/about" className="hover:text-white/80 transition-colors">
                About
              </Link>
              <Link href="/waitlist" className="hover:text-white/80 transition-colors">
                Waitlist
              </Link>
            </div>
          </div>

          {/* Support */}
          <div>
            <p className="text-xs tracking-[0.15em] uppercase text-white/40 mb-4 font-light">
              Support
            </p>
            <div className="flex flex-col gap-3 text-xs text-white/50 tracking-[0.05em] uppercase font-light">
              <Link href="/shipping-returns" className="hover:text-white/80 transition-colors">
                Shipping
              </Link>
              <Link href="/contact" className="hover:text-white/80 transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t flex flex-col gap-4 text-xs text-white/30 md:flex-row md:items-center md:justify-between tracking-[0.05em] uppercase font-light" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
          <p>© {new Date().getFullYear()} Soirn Studio</p>
          <div className="flex gap-6">
            <Link href="/contact" className="hover:text-white/50 transition-colors">
              Privacy
            </Link>
            <Link href="/contact" className="hover:text-white/50 transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

