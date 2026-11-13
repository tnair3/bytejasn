"use client";

import Link from "next/link";
import type { ComponentProps, MouseEvent } from "react";
import { useTransitionNavigate } from "./transition-provider";

type Props = Omit<ComponentProps<typeof Link>, "href"> & { href: string };

/**
 * Drop-in replacement for next/link that plays the directional page
 * transition for internal links. Everything else (new tabs, modifier
 * clicks, external links) behaves exactly like a normal link.
 */
export function TransitionLink({ href, onClick, target, ...props }: Props) {
  const navigate = useTransitionNavigate();

  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    onClick?.(e);
    if (e.defaultPrevented) return;
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
      return;
    }
    if (target && target !== "_self") return;
    if (!href.startsWith("/")) return;

    e.preventDefault();
    navigate(href);
  }

  return <Link href={href} target={target} onClick={handleClick} {...props} />;
}
