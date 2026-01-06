import Link from "next/link";

export default function Navbar() {
  return (
    <header className="w-full">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        {/* Brand */}
        <Link
          href="/"
          className="text-xs tracking-[0.32em] uppercase text-white"
        >
          SOIRN
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-8 text-sm text-white/70">
          <Link href="/drop/drop-001" className="hover:text-white">
            Drop 001
          </Link>

          <Link href="/about" className="hover:text-white">
            About
          </Link>

          <Link href="/#waitlist" scroll className="hover:text-white">
            Waitlist
          </Link>
        </nav>
      </div>
    </header>
  );
}
