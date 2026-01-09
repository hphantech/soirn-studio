"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import NewsletterPopup from "../components/layout/NewsletterPopup";
import CookieConsent from "../components/layout/CookieConsent";
import PageTransition from "../components/ui/PageTransition";

export default function SiteLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const hideFooter = pathname === "/landing" || pathname === "/shop" || pathname === "/lookbook";

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col bg-black">
        <Navbar transparent />
        <main className="flex-1">{children}</main>
        {!hideFooter && <Footer />}
        <NewsletterPopup />
        <CookieConsent />
      </div>
    </PageTransition>
  );
}
