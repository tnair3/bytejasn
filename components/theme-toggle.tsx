"use client";

import { useSyncExternalStore } from "react";
import { MoonIcon, SunIcon } from "./icons";

// The current theme lives on <html class="dark"> (set before first paint by
// the inline script in layout.tsx), so we just subscribe to that class.
function subscribe(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
}

const getSnapshot = () => document.documentElement.classList.contains("dark");
const getServerSnapshot = () => false;

export default function ThemeToggle() {
  const isDark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  function toggle() {
    const next = !isDark;
    const root = document.documentElement;
    // .theme-fade (see globals.css) turns on colour transitions just long
    // enough for the switch to cross-fade instead of snapping.
    root.classList.add("theme-fade");
    root.classList.toggle("dark", next);
    window.setTimeout(() => root.classList.remove("theme-fade"), 450);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      // storage unavailable (private mode etc.): the toggle still works for this visit
    }
  }

  return (
    // Fixed to the viewport and given its own view-transition-name so it
    // stays perfectly still while pages slide underneath it.
    <div className="theme-toggle fixed bottom-4 right-4 z-50 sm:bottom-6 sm:right-6">
      <button
        type="button"
        onClick={toggle}
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        title={isDark ? "Switch to light mode" : "Switch to dark mode"}
        className="flex size-11 cursor-pointer items-center justify-center rounded-full border border-zinc-700 bg-zinc-900/80 text-zinc-100 shadow-sm backdrop-blur transition-colors hover:border-zinc-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-100"
      >
        {isDark ? <MoonIcon className="size-5" /> : <SunIcon className="size-5" />}
      </button>
    </div>
  );
}
