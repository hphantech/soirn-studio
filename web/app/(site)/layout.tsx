"use client";

import type { ReactNode } from "react";
import Navbar from "../components/layout/Navbar";
import CookieConsent from "../components/layout/CookieConsent";
import PageTransition from "../components/ui/PageTransition";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col bg-black">
        <Navbar transparent />
        <main className="flex-1">{children}</main>
        <CookieConsent />
      </div>
    </PageTransition>
  );
}
