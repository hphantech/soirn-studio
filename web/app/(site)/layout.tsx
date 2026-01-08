"use client";

import type { ReactNode } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import CartRoot from "../components/cart/CartRoot";
import NewsletterPopup from "../components/layout/NewsletterPopup";
import CookieConsent from "../components/layout/CookieConsent";
import PageTransition from "../components/ui/PageTransition";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <CartRoot>
      <PageTransition>
        <div className="min-h-screen flex flex-col bg-black">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <NewsletterPopup />
          <CookieConsent />
        </div>
      </PageTransition>
    </CartRoot>
  );
}
