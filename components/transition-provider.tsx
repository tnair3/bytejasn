"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { getSlideDirection } from "@/lib/transitions";

type Navigate = (href: string) => void;

type TransitionDocument = {
  startViewTransition?: (update: () => Promise<void> | void) => {
    finished: Promise<void>;
  };
};

const NavigateContext = createContext<Navigate | null>(null);

/**
 * Wraps client-side navigation in the View Transitions API and tells the
 * CSS (see globals.css) which direction to slide. Browsers without support,
 * and people who prefer reduced motion, just get a normal instant navigation.
 */
export function TransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const settle = useRef<(() => void) | null>(null);
  const inFlight = useRef(false);

  // The new route has rendered: let the browser snapshot the new page.
  useEffect(() => {
    settle.current?.();
  }, [pathname]);

  const navigate = useCallback<Navigate>(
    (href) => {
      const doc = document as unknown as TransitionDocument;
      const target = new URL(href, window.location.href);
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (
        !doc.startViewTransition ||
        reduceMotion ||
        inFlight.current ||
        target.pathname === window.location.pathname
      ) {
        router.push(href);
        return;
      }

      const root = document.documentElement;
      const direction = getSlideDirection(
        window.location.pathname,
        target.pathname,
      );
      if (direction) {
        root.dataset.vt = "slide";
        root.style.setProperty("--vt-x", String(direction.x));
        root.style.setProperty("--vt-y", String(direction.y));
      }

      inFlight.current = true;
      const transition = doc.startViewTransition(
        () =>
          new Promise<void>((resolve) => {
            const done = () => {
              window.clearTimeout(timeout);
              settle.current = null;
              resolve();
            };
            // Safety net so a slow route can never freeze the page.
            const timeout = window.setTimeout(done, 2000);
            settle.current = done;
            router.push(href);
          }),
      );

      const cleanup = () => {
        inFlight.current = false;
        delete root.dataset.vt;
        root.style.removeProperty("--vt-x");
        root.style.removeProperty("--vt-y");
      };
      transition.finished.then(cleanup, cleanup);
    },
    [router],
  );

  return (
    <NavigateContext.Provider value={navigate}>
      {children}
    </NavigateContext.Provider>
  );
}

export function useTransitionNavigate(): Navigate {
  const navigate = useContext(NavigateContext);
  const router = useRouter();
  return navigate ?? ((href) => router.push(href));
}
