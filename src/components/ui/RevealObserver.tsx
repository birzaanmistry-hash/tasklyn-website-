"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * The one IntersectionObserver behind every <Reveal>. Mounted once in
 * SiteShell; re-scans on route change. No scroll listeners.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-in)"));
    const vh = window.innerHeight;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.remove("is-pending");
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );

    for (const el of els) {
      // Already on screen: leave it alone, never flash it.
      if (el.getBoundingClientRect().top < vh * 0.92) {
        el.classList.add("is-in");
        continue;
      }
      el.classList.add("is-pending");
      io.observe(el);
    }

    return () => {
      io.disconnect();
      // Never leave anything hidden if this effect is torn down.
      for (const el of els) el.classList.remove("is-pending");
    };
  }, [pathname]);

  return null;
}
