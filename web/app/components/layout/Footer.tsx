import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-10 text-sm text-white/60 md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} Soirn Studio</p>

        <div className="flex gap-6">
          <Link href="/shipping-returns" className="hover:text-white">
            Shipping
          </Link>
          <Link href="/contact" className="hover:text-white">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}

