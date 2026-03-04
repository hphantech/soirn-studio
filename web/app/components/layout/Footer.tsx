import Link from "next/link";
import { brandConfig } from "@/src/config/brand";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="border-t mt-auto bg-black"
      style={{ borderColor: "rgba(255,255,255,0.08)" }}
    >
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-white/60 mb-4 font-light">
              {brandConfig.brandName.toUpperCase()}
            </p>
            <p className="text-xs text-white/40 max-w-xs leading-relaxed">
              {brandConfig.tagline}
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="text-xs tracking-[0.15em] uppercase text-white/40 mb-4 font-light">
              Links
            </p>
            <div className="flex flex-col gap-3 text-xs text-white/50 tracking-[0.05em] uppercase font-light">
              {brandConfig.navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="hover:text-white/80 transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Support */}
          <div>
            <p className="text-xs tracking-[0.15em] uppercase text-white/40 mb-4 font-light">
              Contact
            </p>
            <div className="flex flex-col gap-3 text-xs text-white/50 tracking-[0.05em] uppercase font-light">
              <a
                href={`mailto:${brandConfig.email}`}
                className="hover:text-white/80 transition-colors"
              >
                {brandConfig.email}
              </a>
            </div>
          </div>
        </div>

        <div
          className="mt-10 pt-8 border-t flex flex-col gap-4 text-xs text-white/30 md:flex-row md:items-center md:justify-between tracking-[0.05em] uppercase font-light"
          style={{ borderColor: "rgba(255,255,255,0.08)" }}
        >
          <p>
            © {year} {brandConfig.brandName}
          </p>
          <div className="flex gap-6">
            <Link href="/contact" className="hover:text-white/50 transition-colors">
              Privacy
            </Link>
            <Link href="/contact" className="hover:text-white/50 transition-colors">
              Terms
            </Link>
            <button
              onClick={() =>
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                })
              }
              className="hover:text-white/60 transition-colors text-[10px] tracking-[0.15em] uppercase"
            >
              Back to top
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

