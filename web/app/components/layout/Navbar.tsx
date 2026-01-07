import Link from "next/link";
import CartButton from "../../components/cart/CartButton";

export default function Navbar() {
  return (
    <header
      className="sticky top-0 z-50 w-full border-b backdrop-blur"
      style={{
        borderColor: "rgba(255,255,255,0.08)",
        background: "rgba(0,0,0,0.55)",
      }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <Link href="/landing" className="text-xs tracking-[0.32em] uppercase text-white">
          SOIRN
        </Link>

        <div className="flex items-center gap-6">
          <nav className="hidden sm:flex items-center gap-8 text-sm text-white/70">

          <Link href="/shop" className="hover:text-white">
               Shop    
          </Link>
            <Link href="/drop/drop-001" className="hover:text-white">
              Drop 001
            </Link>
            <Link href="/about" className="hover:text-white">
              About
            </Link>
            <Link href="/waitlist" scroll className="hover:text-white">
              Waitlist
            </Link>
            <Link href="/shop" className="hover:text-white">
              Shop
            </Link>
          </nav>

          <CartButton />
        </div>
      </div>
    </header>
  );
}
