import Link from "next/link";

export default function Navbar() {
  return (
    <header
      className="sticky top-0 z-50 border-b backdrop-blur"
      style={{
        borderColor: "rgba(255,255,255,0.08)",
        background: "rgba(0,0,0,0.35)",
      }}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        <Link
          href="/"
          className="text-xs tracking-[0.32em] uppercase text-white"
        >
          SOIRN
        </Link>

        <nav className="flex items-center gap-6 text-sm text-white/70">
          <Link href="/drop/drop-001" className="hover:text-white">
            Drop 001
          </Link>
          <Link href="/about" className="hover:text-white">
            About
          </Link>
          <a href="#waitlist" className="hover:text-white">
            Waitlist
          </a>
        </nav>
      </div>
    </header>
  );
}
