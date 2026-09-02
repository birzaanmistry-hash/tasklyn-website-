"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { frame, setState, readState } from "@/lib/store";
import { prefersReducedMotion } from "@/lib/perf";
import { measureBeats } from "@/lib/choreography";

/**
 * Owns scroll and pointer for the whole page.
 *
 * Scroll is normalised here, once, into `frame.scroll`. Nothing else in the
 * application reads window.scrollY, and there is no scroll event listener doing
 * per-frame work: Lenis drives a rAF loop and writes to a plain object, so the
 * React tree is never re-rendered by scrolling.
 */
export function CoreInteraction({ children }: { children?: React.ReactNode }) {
  const lenis = useRef<Lenis | null>(null);

  useEffect(() => {
    const reduced = prefersReducedMotion();

    const instance = new Lenis({
      // Long duration and a gentle curve: this page is a camera move, and a
      // snappy scroll would make the camera feel jointed.
      duration: reduced ? 0.1 : 1.35,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: !reduced,
      wheelMultiplier: 0.92,
      touchMultiplier: 1.5,
      infinite: false,
    });
    lenis.current = instance;

    // The opening sequence owns the viewport until it finishes.
    if (!reduced) instance.stop();

    let raf = 0;
    const loop = (time: number) => {
      instance.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    // The beats span the <main> element only. Normalising against the whole
    // document would let the footer's height squeeze the entire camera journey.
    let range = 1;
    const measure = () => {
      const main = document.getElementById("main");
      const h = main ? main.offsetHeight : document.body.scrollHeight;
      range = Math.max(1, h - window.innerHeight);
      // Beat ranges come from where the sections actually landed, not from the
      // authored table, so the compact composition stays in step with the Core.
      if (main) measureBeats(main, window.innerHeight);
    };
    measure();
    // Fonts and the first paint can both move things; re-measure once settled.
    requestAnimationFrame(measure);
    window.setTimeout(measure, 400);

    const ro = new ResizeObserver(measure);
    const mainEl = document.getElementById("main");
    if (mainEl) ro.observe(mainEl);
    window.addEventListener("resize", measure);

    const onScroll = ({ scroll, velocity }: { scroll: number; velocity: number }) => {
      frame.scroll = Math.min(1, Math.max(0, scroll / range));
      // Normalised so the camera reacts the same way on a 900px laptop and a
      // 1600px display.
      frame.velocity = velocity / Math.max(1, window.innerHeight);
    };
    instance.on("scroll", onScroll);

    return () => {
      cancelAnimationFrame(raf);
      instance.off("scroll", onScroll);
      ro.disconnect();
      window.removeEventListener("resize", measure);
      instance.destroy();
      lenis.current = null;
    };
  }, []);

  // Pointer. Written straight to the frame object, never to React state.
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      frame.px = (e.clientX / window.innerWidth) * 2 - 1;
      frame.py = -((e.clientY / window.innerHeight) * 2 - 1);
      frame.presence = 1;
    };
    const onLeave = () => {
      frame.presence = 0;
    };
    const onDown = () => {
      frame.charge = 1;
    };
    const onUp = () => {
      frame.charge = 0;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  // Anchor links. Lenis owns the scroll position, so native anchor jumps and
  // scrollIntoView both fight it. Routing clicks through Lenis keeps the camera
  // move continuous instead of teleporting the visitor mid-journey.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey) return;
      const link = (e.target as HTMLElement)?.closest?.("a");
      if (!link) return;

      const href = link.getAttribute("href");
      if (!href || !href.startsWith("#") || href.length < 2) return;

      const target = document.getElementById(href.slice(1));
      if (!target) return;

      e.preventDefault();
      lenis.current?.scrollTo(target, {
        duration: prefersReducedMotion() ? 0 : 1.6,
        // Land just inside the section so its beat is already active on arrival.
        offset: 8,
      });
      // Keep the URL and the focus ring honest for keyboard and screen readers.
      history.replaceState(null, "", href);
      target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  // Release the scroll when the opening sequence hands over.
  useEffect(() => {
    const check = () => {
      if (readState().phase === "live") lenis.current?.start();
    };
    const id = window.setInterval(check, 200);
    return () => window.clearInterval(id);
  }, []);

  return <>{children}</>;
}

/** Called by the intro when it finishes or is skipped. */
export function releaseScroll() {
  setState({ phase: "live" });
  frame.intro = 1;
}
