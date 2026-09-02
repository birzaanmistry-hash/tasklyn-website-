"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { frame, setState, useAppState } from "@/lib/store";
import { prefersReducedMotion } from "@/lib/perf";
import { LogoMark } from "./ui/Logo";

/**
 * The opening sequence.
 *
 * Nothing is being loaded here. This is the first eleven seconds of the film,
 * and it ends where an opening title should end: on the company's name and mark,
 * built out of the same object the rest of the page is made of, with one plain
 * line underneath saying what Tasklyn actually does.
 *
 * The timeline drives `frame.intro` from 0 to 1. The camera and every Core
 * material read that one value, so the shot list and the object are never out
 * of step. Under reduced motion the film is replaced by a still title card.
 */

const SYSTEMS = ["Intelligence", "Context", "Memory", "Reasoning", "Execution"];
const NAME = "TASKLYN";

export function CinematicIntro() {
  const { phase } = useAppState();
  const root = useRef<HTMLDivElement>(null);
  const [skippable, setSkippable] = useState(false);
  const done = useRef(false);

  useEffect(() => {
    const reduced = prefersReducedMotion();
    setState({ phase: "intro" });

    // Reduced motion gets the title card, held briefly, with no camera travel
    // and no collapse.
    if (reduced) {
      const tl = gsap.timeline({ onComplete: () => setState({ phase: "live" }) });
      tl.to(frame, { intro: 1, duration: 1.2, ease: "power2.out" }, 0);
      tl.set([".intro-mark", ".intro-name span", ".intro-desc"], { opacity: 1, y: 0 }, 0);
      tl.to(".intro-layer", { opacity: 1, duration: 0.4 }, 0);
      tl.to(".intro-layer", { opacity: 0, duration: 0.6 }, 2.2);
      return () => {
        tl.kill();
      };
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          done.current = true;
          setState({ phase: "live" });
        },
      });

      // The single value the whole sequence is built on.
      tl.fromTo(frame, { intro: 0 }, { intro: 1, duration: 11.4, ease: "none" }, 0);
      tl.set(".intro-layer", { opacity: 1 }, 0);

      /* --- SHOT 05, initialisation readout ---------------------------- */
      tl.fromTo(
        ".intro-head",
        { opacity: 0, y: 6 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
        6.5
      );
      tl.fromTo(
        ".intro-sys",
        { opacity: 0, x: -10 },
        { opacity: 1, x: 0, duration: 0.3, stagger: 0.17, ease: "power2.out" },
        6.8
      );
      tl.fromTo(".intro-online", { opacity: 0 }, { opacity: 1, duration: 0.2 }, 7.9);

      // Clear the frame so the collapse happens on empty black.
      tl.to(
        [".intro-head", ".intro-sys", ".intro-online"],
        { opacity: 0, duration: 0.3, ease: "power2.in" },
        8.25
      );

      /* --- SHOT 06, collapse. Driven by the Core itself. --------------- */

      /* --- SHOT 07, the title -----------------------------------------
         The mark is built along the axis of its own arrow as the Core
         expands back out, and the name resolves letter by letter from wide
         tracking, the way a title card settles. */

      tl.set(".intro-title", { opacity: 1 }, 9.15);

      // Two stops chase each other along the arrow's axis. The trailing stop
      // lags, which gives the build a soft leading edge instead of a hard line.
      tl.fromTo(
        ".mark-w0",
        { attr: { offset: 0 } },
        { attr: { offset: 1 }, duration: 0.9, ease: "power2.inOut" },
        9.2
      );
      tl.fromTo(
        ".mark-w1",
        { attr: { offset: 0 } },
        { attr: { offset: 1 }, duration: 0.62, ease: "power1.out" },
        9.2
      );
      tl.fromTo(
        ".intro-mark",
        { opacity: 0, scale: 0.82 },
        { opacity: 1, scale: 1, duration: 0.9, ease: "expo.out" },
        9.2
      );

      tl.fromTo(
        ".intro-name span",
        { opacity: 0, yPercent: 60, filter: "blur(9px)" },
        {
          opacity: 1,
          yPercent: 0,
          filter: "blur(0px)",
          duration: 0.85,
          stagger: 0.055,
          ease: "expo.out",
        },
        9.5
      );

      // Tracking collapses from wide to set. This is the move that makes a
      // wordmark feel like a title rather than a heading.
      tl.fromTo(
        ".intro-name",
        { letterSpacing: "0.6em" },
        { letterSpacing: "0.22em", duration: 1.3, ease: "expo.out" },
        9.5
      );

      tl.fromTo(
        ".intro-rule",
        { scaleX: 0 },
        { scaleX: 1, duration: 0.8, ease: "power3.inOut" },
        10.05
      );

      tl.fromTo(
        ".intro-desc",
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
        10.25
      );

      /* Hand the frame to the page. */
      tl.to(".intro-layer", { opacity: 0, duration: 0.65, ease: "power2.inOut" }, 10.9);
    }, root);

    const t = window.setTimeout(() => setSkippable(true), 1200);

    return () => {
      // kill, not revert: revert would rewind the tween that owns frame.intro
      // and throw the camera back to the opening shot as this unmounts.
      ctx.kill();
      if (done.current) frame.intro = 1;
      window.clearTimeout(t);
    };
  }, []);

  const skip = () => {
    if (done.current) return;
    done.current = true;
    gsap.killTweensOf(frame);
    gsap.to(frame, {
      intro: 1,
      duration: 0.65,
      ease: "power3.inOut",
      onComplete: () => setState({ phase: "live" }),
    });
    if (root.current) gsap.to(root.current, { opacity: 0, duration: 0.45 });
  };

  // Any deliberate attempt to move on skips. Trapping someone in an eleven
  // second film they did not ask for is hostile.
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
              style={{ letterSpacing: "0.6em", textIndent: "0.6em" }}
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
