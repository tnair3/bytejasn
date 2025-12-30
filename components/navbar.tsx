"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const dropdownLinks = [
    { name: "projects", href: "/projects" },
    { name: "photography", href: "/photography" },
    { name: "music", href: "/music" },
  ];

  const isActive = (href: string) => pathname === href;

  // Close mobile menu when clicking outside
  useEffect(() => {
    function handleClickOutside() {
      setMobileOpen(false);
    }
    if (mobileOpen) {
      window.addEventListener("click", handleClickOutside);
      return () => window.removeEventListener("click", handleClickOutside);
    }
  }, [mobileOpen]);

  // Automatically close mobile menu when navigating to a different page
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  function handleMenuClick(e: React.MouseEvent) {
    e.stopPropagation();
  }

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md border-b border-gray-200">
      <nav className="relative py-4 px-4 md:px-0">
        {/* Desktop links */}
        <div className="hidden md:flex justify-center items-center gap-2">
          <Link
            href="/"
            className={`px-2 py-1 ${isActive("/") ? "text-gray-900 font-semibold" : "text-gray-600 font-medium hover:text-gray-900"}`}
          >
            home
          </Link>
          <span className="mx-2 text-gray-400">|</span>

          {["projects", "photography", "music"].map((linkName) => {
            const href = `/${linkName}`;
            const active = isActive(href);
            return (
              <div key={href} className="flex items-center">
                <Link
                  href={href}
                  className={`px-2 py-1 ${active ? "text-gray-900 font-semibold" : "text-gray-600 font-medium hover:text-gray-900"}`}
                >
                  {linkName}
                </Link>
                {linkName === "music" && <span className="mx-2 text-gray-400">|</span>}
              </div>
            );
          })}

          <Link
            href="/about"
            className={`px-2 py-1 ${isActive("/about") ? "text-gray-900 font-semibold" : "text-gray-600 font-medium hover:text-gray-900"}`}
          >
            about
          </Link>
        </div>

        {/* Mobile layout */}
        <div className="flex md:hidden justify-center items-center w-full relative">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className={`px-2 py-1 ${isActive("/") ? "text-gray-900 font-semibold" : "text-gray-600 font-medium hover:text-gray-900"}`}
            >
              home
            </Link>

            {/* Hamburger */}
            <button
              className="px-4 py-2 text-2xl"
              onClick={(e) => {
                e.stopPropagation();
                setMobileOpen(!mobileOpen);
              }}
              aria-label="Toggle Menu"
            >
              ☰
            </button>

            <Link
              href="/about"
              className={`px-2 py-1 ${isActive("/about") ? "text-gray-900 font-semibold" : "text-gray-600 font-medium hover:text-gray-900"}`}
            >
              about
            </Link>
          </div>

          {/* Animated Dropdown */}
          <div
            className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white shadow-md w-40 rounded-md z-50 origin-top transition-all duration-300 ease-out
              ${mobileOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0 pointer-events-none"}`}
            onClick={handleMenuClick}
          >
            <div className="flex flex-col items-center py-2">
              {dropdownLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 w-full text-center ${
                    isActive(link.href) ? "text-gray-900 font-semibold" : "text-gray-600 font-medium hover:text-gray-900"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
