"use client"; // <-- Add this at the very top

import type { Metadata } from "next";
import { usePathname } from "next/navigation";
import { Comfortaa } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";

const comfortaa = Comfortaa({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-comfortaa",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();

  return (
    <html lang="en">
      <body className={`${comfortaa.className} antialiased`}>
        {/* Render navbar on all pages except /landing */}
        {pathname !== "/" && <Navbar />}

        <main className="min-h-screen bg-zinc-50">{children}</main>
      </body>
    </html>
  );
}