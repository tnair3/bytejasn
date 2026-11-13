"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { TransitionLink } from "./transition-link";
import { CloseIcon, MenuIcon } from "./icons";
import { cn } from "@/lib/cn";

const sectionLinks = [
  { name: "projects", href: "/projects" },
  { name: "photography", href: "/photography" },
  { name: "music", href: "/music" },
];

const aboutLink = { name: "about", href: "/about" };

function linkClass(active: boolean) {
  return cn(
    "rounded-full px-3 py-1.5 text-sm transition-colors",
    active
      ? "bg-zinc-900 text-white"
      : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900",
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // A section stays highlighted on its detail pages, e.g. /projects/daedalus
  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  // Close the mobile menu on outside click or Escape
  useEffect(() => {
    if (!menuOpen) return;

    function onPointerDown(e: PointerEvent) {
      if (!menuRef.current?.contains(e.target as Node)) setMenuOpen(false);
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setMenuOpen(false);
    }

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  // The landing page has its own navigation
  if (pathname === "/") return null;

  return (
    <header className="site-nav sticky top-0 z-50 border-b border-zinc-200 bg-white/80 backdrop-blur">
      <nav aria-label="Main" className="mx-auto max-w-6xl px-4 py-3">
        {/* Desktop */}
        <div className="hidden items-center justify-center gap-1 md:flex">
          <TransitionLink href="/" className={linkClass(pathname === "/")}>
            home
          </TransitionLink>
          <span className="mx-2 h-4 w-px bg-zinc-300" aria-hidden />
          {sectionLinks.map((link) => (
            <TransitionLink
              key={link.href}
              href={link.href}
              className={linkClass(isActive(link.href))}
            >
              {link.name}
            </TransitionLink>
          ))}
          <span className="mx-2 h-4 w-px bg-zinc-300" aria-hidden />
          <TransitionLink
            href={aboutLink.href}
            className={linkClass(isActive(aboutLink.href))}
          >
            {aboutLink.name}
          </TransitionLink>
        </div>

        {/* Mobile */}
        <div
          ref={menuRef}
          className="relative flex items-center justify-between md:hidden"
        >
          <TransitionLink href="/" className="font-heading text-base font-bold">
            tejas nair
          </TransitionLink>

          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
            className="rounded-full p-2 text-zinc-700 hover:bg-zinc-100"
          >
            {menuOpen ? (
              <CloseIcon className="size-5" />
            ) : (
              <MenuIcon className="size-5" />
            )}
          </button>

          <div
            id="mobile-menu"
            inert={!menuOpen}
            className={cn(
              "absolute right-0 top-full mt-3 w-48 origin-top-right rounded-xl border border-zinc-200 bg-white p-2 shadow-lg transition duration-200 ease-out",
              menuOpen
                ? "scale-100 opacity-100"
                : "pointer-events-none scale-95 opacity-0",
            )}
          >
            <div className="flex flex-col">
              {[...sectionLinks, aboutLink].map((link) => (
                <TransitionLink
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={cn(
                    "rounded-lg px-4 py-2.5 text-sm transition-colors",
                    isActive(link.href)
                      ? "bg-zinc-100 font-bold text-zinc-900"
                      : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900",
                  )}
                >
                  {link.name}
                </TransitionLink>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
