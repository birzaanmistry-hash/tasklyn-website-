"use client";

import { useEffect, useRef } from "react";
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
 * It is not skippable, by decision: every visitor sees it. That decision is only
 * defensible because it is short. It runs about three and a half seconds, opens
 * already in motion, and does not begin until the renderer can actually draw, so
 * none of it is spent on a blank screen while three.js downloads.
 *
 * The timeline drives `frame.intro` from 0 to 1. The camera and every Core
 * material read that one value, so the shot list and the object are never out
 * of step. Under reduced motion the film is replaced by a still title card.
 */

const SYSTEMS = ["Intelligence", "Context", "Memory", "Reasoning", "Execution"];
const NAME = "TASKLYN";

/** If the renderer never arrives (WebGL blocked, slow device), start anyway. */
const READY_FALLBACK_MS = 1500;

/**
 * GSAP ships with lag smoothing on: any frame gap longer than 500ms is treated
 * as 33ms of timeline progress, so an animation cannot jump after a stall.
 *
 * That default is wrong for an opening title. If the browser throttles frames,
 * and it will (a background tab, battery saver, a slow phone), a 3.4 second
 * film at one frame per second takes over a hundred seconds of wall clock and
 * never reaches its own title card. The visitor sees a still frame and then
 * gets dumped into the hero by the failsafe, which reads as no intro at all.
 *
 * Turning it off makes the timeline honour real elapsed time. A throttled tab
 * plays the film coarsely rather than not at all, and it always finishes when
 * it should.
 */
gsap.ticker.lagSmoothing(0);

/**
 * Hard failsafe. With no skip control, a stalled timeline would trap the visitor
 * on the title card permanently. A background tab throttles rAF, which is enough
 * to do it. This releases the page on wall-clock time no matter what GSAP is
 * doing, and is never reached in a normal run.
 */
const FAILSAFE_MS = 11000;

export function CinematicIntro() {
  const { phase } = useAppState();
  const root = useRef<HTMLDivElement>(null);
  const started = useRef(false);
  const done = useRef(false);

  useEffect(() => {
    setState({ phase: "intro" });
  }, []);

  useEffect(() => {
    let cancelled = false;
    let ctx: gsap.Context | null = null;
    let solo: gsap.core.Timeline | null = null;

    const finish = () => {
      if (done.current) return;
      done.current = true;
      frame.intro = 1;
      setState({ phase: "live" });
    };

    const begin = () => {
      if (cancelled || started.current) return;
      started.current = true;

      // Reduced motion gets the title card, held briefly, with no camera travel
      // and no collapse.
      if (prefersReducedMotion()) {
        solo = gsap.timeline({ onComplete: finish });
        solo.to(frame, { intro: 1, duration: 0.8, ease: "power2.out" }, 0);
        solo.set([".intro-mark", ".intro-name span", ".intro-desc"], { opacity: 1, y: 0 }, 0);
        solo.to(".intro-layer", { opacity: 1, duration: 0.3 }, 0);
        solo.to(".intro-layer", { opacity: 0, duration: 0.45 }, 1.7);
        return;
      }

      ctx = gsap.context(() => {
        const tl = gsap.timeline({ onComplete: finish });

        // The single value the whole sequence is built on.
        tl.fromTo(frame, { intro: 0 }, { intro: 1, duration: 3.4, ease: "none" }, 0);
        tl.set(".intro-layer", { opacity: 1 }, 0);

        /* --- initialisation readout -------------------------------------
           A fast cascade rather than a paced list. At this speed it reads as
           a system coming up, which is the point; it is not there to be read
           word by word. */
        tl.fromTo(".intro-head", { opacity: 0, y: 4 }, { opacity: 1, y: 0, duration: 0.2 }, 1.82);
        tl.fromTo(
          ".intro-sys",
          { opacity: 0, x: -6 },
          { opacity: 1, x: 0, duration: 0.14, stagger: 0.045, ease: "power2.out" },
          1.92
        );
        tl.fromTo(".intro-online", { opacity: 0 }, { opacity: 1, duration: 0.12 }, 2.16);

        // Clear the frame so the collapse happens on empty black.
        tl.to(
          [".intro-head", ".intro-sys", ".intro-online"],
          { opacity: 0, duration: 0.16, ease: "power2.in" },
          2.3
        );

        /* --- collapse. Driven by the Core itself, via frame.intro. ------- */

        /* --- the title ---------------------------------------------------
           The mark is built along the axis of its own arrow as the Core
           expands back out, and the name resolves from wide tracking, the way
           a title card settles. */

        tl.set(".intro-title", { opacity: 1 }, 2.8);

        tl.fromTo(".mark-w0", { attr: { offset: 0 } }, { attr: { offset: 1 }, duration: 0.42, ease: "power2.inOut" }, 2.82);
        tl.fromTo(".mark-w1", { attr: { offset: 0 } }, { attr: { offset: 1 }, duration: 0.3, ease: "power1.out" }, 2.82);
        tl.fromTo(".intro-mark", { opacity: 0, scale: 0.88 }, { opacity: 1, scale: 1, duration: 0.45, ease: "expo.out" }, 2.82);

        tl.fromTo(
          ".intro-name span",
          { opacity: 0, yPercent: 45, filter: "blur(5px)" },
          { opacity: 1, yPercent: 0, filter: "blur(0px)", duration: 0.4, stagger: 0.028, ease: "expo.out" },
          2.94
        );

        // Tracking collapses from wide to set. This is the move that makes a
        // wordmark feel like a title rather than a heading.
        tl.fromTo(
          ".intro-name",
          { letterSpacing: "0.5em" },
          { letterSpacing: "0.22em", duration: 0.7, ease: "expo.out" },
          2.94
        );

        tl.fromTo(".intro-rule", { scaleX: 0 }, { scaleX: 1, duration: 0.38, ease: "power3.inOut" }, 3.16);
        tl.fromTo(".intro-desc", { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: 0.32, ease: "power2.out" }, 3.24);

        /* Hand the frame to the page. The title holds for about a second
           before it goes, which is the minimum for the descriptor to register. */
        tl.to(".intro-layer", { opacity: 0, duration: 0.4, ease: "power2.inOut" }, 4.05);
      }, root);
    };

    // Wait for the renderer, then start. Polled rather than driven off a React
    // dependency on purpose: as a dependency the effect re-runs the moment the
    // renderer appears, and its cleanup would kill a timeline the fallback had
    // already started, freezing the film for good.
    //
    // On a timer rather than rAF for the same reason lag smoothing is off: a
    // throttled tab can drop to one frame a second, and the film should not
    // wait seconds just to notice the renderer is ready.
    const openedAt = performance.now();
    const check = () => {
      if (cancelled || started.current) return;
      if (readState().coreReady || performance.now() - openedAt > READY_FALLBACK_MS) {
        window.clearInterval(poll);
        begin();
      }
    };
    const poll = window.setInterval(check, 60);
    check();

    const failsafe = window.setTimeout(finish, FAILSAFE_MS);

    return () => {
      cancelled = true;
      window.clearInterval(poll);
      window.clearTimeout(failsafe);
      // kill, not revert: revert would rewind the tween that owns frame.intro
      // and throw the camera back to the opening shot as this unmounts.
      ctx?.kill();
      solo?.kill();
      if (done.current) frame.intro = 1;
    };
  }, []);

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
              style={{ letterSpacing: "0.5em", textIndent: "0.5em" }}
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
    </div>
  );
}
