"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A restrained cursor.
 *
 * The system cursor is kept. This adds one hairline ring that trails it and
 * tightens over interactive targets, so the page acknowledges the pointer
 * without replacing it with a novelty blob. It is removed entirely on touch
 * devices and under reduced motion, where it would be noise.
 */
export function CustomCursor() {
  const ring = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    setOn(true);

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let rx = x;
    let ry = y;
    let scale = 1;
    let targetScale = 1;
    let raf = 0;

    const move = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
    };

    const over = (e: PointerEvent) => {
      const el = (e.target as HTMLElement)?.closest(
        "a, button, [role='button'], input, textarea, select, [data-cursor='tight']"
      );
      targetScale = el ? 0.55 : 1;
    };

    const loop = () => {
      // The ring lags by design. Zero lag reads as a second cursor; too much
      // reads as broken.
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;
      scale += (targetScale - scale) * 0.16;
      if (ring.current) {
        ring.current.style.transform = `translate3d(${rx - 16}px, ${ry - 16}px, 0) scale(${scale})`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
    };
  }, []);

  if (!on) return null;

  return (
    <div
      ref={ring}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[70] h-8 w-8 rounded-full border border-[color:var(--color-accent)]/45 will-change-transform"
      style={{ transition: "border-color 200ms var(--ease-core)" }}
    />
  );
}
