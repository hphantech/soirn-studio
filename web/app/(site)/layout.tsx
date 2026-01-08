import type { ReactNode } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import CartRoot from "../components/cart/CartRoot";
import AnnouncementBanner from "../components/layout/AnnouncementBanner";
import NewsletterPopup from "../components/layout/NewsletterPopup";
import CookieConsent from "../components/layout/CookieConsent";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <CartRoot>
      <div className="min-h-screen flex flex-col bg-black">
        <AnnouncementBanner />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <NewsletterPopup />
        <CookieConsent />
      </div>
    </CartRoot>
  );
}
