"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { frame, readState, setState, useAppState } from "@/lib/store";
import { prefersReducedMotion } from "@/lib/perf";
import { LogoMark } from "./ui/Logo";

/**
 * The opening sequence.
 *
 * Nothing is being loaded here. This is the opening of the film, and it ends
 * where an opening title should end: on the company's name and mark, built out
 * of the same object the rest of the page is made of, with one plain line
 * underneath saying what Tasklyn actually does.
 *
 * Two things govern its timing, and both exist because people reach for Skip:
 *
 * 1. It does not start until the renderer exists. Running the first shots while
 *    three.js is still downloading spends them on a blank screen, which reads as
 *    a site that has not loaded rather than as an establishing shot.
 * 2. It runs about five and a half seconds, not eleven, and it opens already in
 *    motion. There is no held void at the top any more.
 *
 * The timeline drives `frame.intro` from 0 to 1. The camera and every Core
 * material read that one value, so the shot list and the object are never out
 * of step. Under reduced motion the film is replaced by a still title card.
 */

const SYSTEMS = ["Intelligence", "Context", "Memory", "Reasoning", "Execution"];
const NAME = "TASKLYN";

/** If the renderer never arrives (WebGL blocked, slow device), start anyway. */
const READY_FALLBACK_MS = 1800;

export function CinematicIntro() {
  const { phase } = useAppState();
  const root = useRef<HTMLDivElement>(null);
  const [skippable, setSkippable] = useState(false);
  const started = useRef(false);
  const done = useRef(false);

  useEffect(() => {
    setState({ phase: "intro" });
  }, []);

  useEffect(() => {
    let cancelled = false;
    let ctx: gsap.Context | null = null;
    let solo: gsap.core.Timeline | null = null;
    let raf = 0;

    const begin = () => {
      if (cancelled || started.current) return;
      started.current = true;

      const reduced = prefersReducedMotion();

      // Reduced motion gets the title card, held briefly, with no camera travel
      // and no collapse.
      if (reduced) {
        solo = gsap.timeline({ onComplete: () => setState({ phase: "live" }) });
        solo.to(frame, { intro: 1, duration: 1.0, ease: "power2.out" }, 0);
        solo.set([".intro-mark", ".intro-name span", ".intro-desc"], { opacity: 1, y: 0 }, 0);
        solo.to(".intro-layer", { opacity: 1, duration: 0.35 }, 0);
        solo.to(".intro-layer", { opacity: 0, duration: 0.5 }, 2.0);
        return;
      }

      ctx = gsap.context(() => {
        const tl = gsap.timeline({
          onComplete: () => {
            done.current = true;
            setState({ phase: "live" });
          },
        });

        // The single value the whole sequence is built on.
        tl.fromTo(frame, { intro: 0 }, { intro: 1, duration: 5.5, ease: "none" }, 0);
        tl.set(".intro-layer", { opacity: 1 }, 0);

        /* --- initialisation readout ------------------------------------- */
        tl.fromTo(
          ".intro-head",
          { opacity: 0, y: 5 },
          { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" },
          3.3
        );
        tl.fromTo(
          ".intro-sys",
          { opacity: 0, x: -8 },
          { opacity: 1, x: 0, duration: 0.2, stagger: 0.07, ease: "power2.out" },
          3.45
        );
        tl.fromTo(".intro-online", { opacity: 0 }, { opacity: 1, duration: 0.15 }, 3.86);

        // Clear the frame so the collapse happens on empty black.
        tl.to(
          [".intro-head", ".intro-sys", ".intro-online"],
          { opacity: 0, duration: 0.22, ease: "power2.in" },
          4.02
        );

        /* --- collapse. Driven by the Core itself, via frame.intro. ------- */

        /* --- the title ---------------------------------------------------
           The mark is built along the axis of its own arrow as the Core
           expands back out, and the name resolves letter by letter from wide
           tracking, the way a title card settles. */

        tl.set(".intro-title", { opacity: 1 }, 4.58);

        // Two stops chase each other along the arrow's axis. The trailing stop
        // lags, giving the build a soft leading edge instead of a hard line.
        tl.fromTo(".mark-w0", { attr: { offset: 0 } }, { attr: { offset: 1 }, duration: 0.6, ease: "power2.inOut" }, 4.6);
        tl.fromTo(".mark-w1", { attr: { offset: 0 } }, { attr: { offset: 1 }, duration: 0.42, ease: "power1.out" }, 4.6);
        tl.fromTo(".intro-mark", { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: 0.6, ease: "expo.out" }, 4.6);

        tl.fromTo(
          ".intro-name span",
          { opacity: 0, yPercent: 55, filter: "blur(7px)" },
          { opacity: 1, yPercent: 0, filter: "blur(0px)", duration: 0.55, stagger: 0.038, ease: "expo.out" },
          4.76
        );

        // Tracking collapses from wide to set. This is the move that makes a
        // wordmark feel like a title rather than a heading.
        tl.fromTo(
          ".intro-name",
          { letterSpacing: "0.55em" },
          { letterSpacing: "0.22em", duration: 0.95, ease: "expo.out" },
          4.76
        );

        tl.fromTo(".intro-rule", { scaleX: 0 }, { scaleX: 1, duration: 0.5, ease: "power3.inOut" }, 5.06);
        tl.fromTo(".intro-desc", { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" }, 5.16);

        /* Hand the frame to the page. */
        tl.to(".intro-layer", { opacity: 0, duration: 0.45, ease: "power2.inOut" }, 5.95);
      }, root);
    };

    // Wait for the renderer, then start. This is polled rather than driven off a
    // React dependency on purpose: making the effect depend on `coreReady` means
    // it re-runs the moment the renderer appears, and its cleanup would kill a
    // timeline the fallback had already started, freezing the film for good.
    const openedAt = performance.now();
    const check = () => {
      if (cancelled || started.current) return;
      if (readState().coreReady || performance.now() - openedAt > READY_FALLBACK_MS) {
        begin();
        return;
      }
      raf = requestAnimationFrame(check);
    };
    raf = requestAnimationFrame(check);

    const skipTimer = window.setTimeout(() => setSkippable(true), 700);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      window.clearTimeout(skipTimer);
      // kill, not revert: revert would rewind the tween that owns frame.intro
      // and throw the camera back to the opening shot as this unmounts.
      ctx?.kill();
      solo?.kill();
      if (done.current) frame.intro = 1;
    };
  }, []);

  const skip = () => {
    if (done.current) return;
    done.current = true;
    gsap.killTweensOf(frame);
    gsap.to(frame, {
      intro: 1,
      duration: 0.5,
      ease: "power3.inOut",
      onComplete: () => setState({ phase: "live" }),
    });
    if (root.current) gsap.to(root.current, { opacity: 0, duration: 0.35 });
  };

  // Any deliberate attempt to move on skips. Trapping someone in a film they
  // did not ask for is hostile.
  useEffect(() => {
    if (phase !== "intro") return;
    const onKey = (e: KeyboardEvent) => {
      if (["Escape", " ", "Enter", "ArrowDown", "PageDown", "Tab"].includes(e.key)) skip();
    };
    const onMove = () => skip();
    window.addEventListener("keydown", onKey);
    window.addEventListener("wheel", onMove, { passive: true, once: true });
    window.addEventListener("touchmove", onMove, { passive: true, once: true });
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("wheel", onMove);
      window.removeEventListener("touchmove", onMove);
    };
  }, [phase]);

  if (phase === "live") return null;

  return (
    <div ref={root} className="fixed inset-0 z-40" role="presentation">
      <div className="intro-layer absolute inset-0 opacity-0">
        {/* Initialisation readout. Small and low, so the Core owns the frame. */}
        <div className="absolute bottom-[9vh] left-[6vw] max-w-[80vw]">
          <p className="intro-head t-tech opacity-0 text-[color:var(--color-muted)]">
            Tasklyn / System initialisation
          </p>
          <ul className="mt-4 space-y-2">
            {SYSTEMS.map((s) => (
              <li key={s} className="intro-sys t-data opacity-0 text-[color:var(--color-ink)]">
                {s}
              </li>
            ))}
          </ul>
          <p className="intro-online t-data mt-4 opacity-0 text-[color:var(--color-accent-hot)]">
            Online
          </p>
        </div>

        {/* The title card. */}
        <div className="intro-title absolute inset-0 flex flex-col items-center justify-center px-6 opacity-0">
          {/* A soft ground so the title is fully legible over the Core, whatever
              the Core happens to be doing behind it. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 72% 50% at 50% 50%, rgba(5,7,12,0.72) 0%, rgba(5,7,12,0.42) 48%, transparent 82%)",
            }}
          />

          <div className="relative flex flex-col items-center">
            <LogoMark
              build
              id="intro-mark"
              className="intro-mark h-[13vmin] w-[13vmin] min-h-[64px] min-w-[64px] opacity-0"
            />

            <h1
              className="intro-name mt-[7vmin] flex text-[clamp(2rem,7.5vw,5.5rem)] font-medium leading-none text-[color:var(--color-ink)]"
              style={{ letterSpacing: "0.55em", textIndent: "0.55em" }}
            >
              {Array.from(NAME).map((ch, i) => (
                <span key={`${ch}-${i}`} className="inline-block opacity-0">
                  {ch}
                </span>
              ))}
            </h1>

            <div
              aria-hidden="true"
              className="intro-rule mt-[5.5vmin] h-px w-[min(340px,62vw)] origin-center bg-[color:var(--color-accent)]/55"
              style={{ transform: "scaleX(0)" }}
            />

            <p className="intro-desc mt-[3.4vmin] max-w-[46ch] text-center text-[clamp(0.9375rem,1.5vw,1.1875rem)] leading-relaxed text-[color:var(--color-muted)] opacity-0">
              AI systems that run the repetitive work inside your business.
            </p>
          </div>
        </div>
      </div>

      {skippable && phase === "intro" && (
        <button
          type="button"
          onClick={skip}
          className="absolute bottom-7 right-7 t-tech rounded-[var(--radius-machined)] border border-[color:var(--color-line)] bg-[color:var(--color-abyss)]/80 px-4 py-2.5 text-[color:var(--color-muted)] backdrop-blur-sm transition-colors hover:border-[color:var(--color-accent)] hover:text-[color:var(--color-ink)]"
        >
          Skip intro
        </button>
      )}
    </div>
  );
}
