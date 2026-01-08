import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import CustomCursor from "./components/ui/CustomCursor";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Soirn Studio",
  description: "Structured chaos. Built to last.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-black text-white`}
      >
        <div className="min-h-screen">
          {/* subtle glow + grain */}
          <div className="pointer-events-none fixed inset-0">
            <div
  className="absolute -top-64 left-1/3 h-[600px] w-[600px] rounded-full blur-[140px]"
  style={{ background: "rgba(255,255,255,0.08)" }}
/>

            <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] [background-size:18px_18px]" />
          </div>

          <div className="relative">{children}</div>
          <CustomCursor />
        </div>
      </body>
    </html>
  );
}
