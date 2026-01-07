import Link from "next/link";

export default function Navbar() {
  return (
    <header className="fixed top-0 z-50 w-full">
  <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
    <Link href="/landing" className="text-xs tracking-[0.35em] uppercase text-white">
      SOIRN
    </Link>

    <nav className="flex items-center gap-8 text-sm text-white/70">
    <Link href="/shop" className="hover:text-white">
        Shop    
    </Link>

      <Link href="/drop/drop-001" className="hover:text-white">
        Drop 001
      </Link>
      <Link href="/about" className="hover:text-white">
        About
      </Link>
      <Link href="/waitlist" className="hover:text-white">
        Waitlist
      </Link>


    </nav>
  </div>

  {/* subtle bottom fade so text stays readable on video */}
  <div
    className="pointer-events-none h-10 w-full"
    style={{
      background:
        "linear-gradient(to bottom, rgba(0,0,0,0.55), rgba(0,0,0,0))",
    }}
  />
</header>

  );
}

