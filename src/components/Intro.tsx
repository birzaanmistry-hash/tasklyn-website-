"use client";

import { useState } from "react";
import { Plates } from "@/components/home/Plates";
import { LogoMark } from "@/components/ui/Logo";
import { BRAND } from "@/lib/site";

/**
 * The Tasklyn opening splash: the original site's "system comes online, then
 * the brand resolves" opening, rebuilt in this site's language (black ground,
 * hairlines, small mono labels, the layered plates) and extended.
 *
 *   0.0s  black; a faint grid and corner labels appear
 *   0.2s  a hairline begins to fill along the bottom
 *   0.4s  "System initialisation" readout: Intelligence, Context, Memory,
 *         Reasoning, Execution, Online
 *   0.5s  the layered plates assemble in the centre
 *   2.6s  readout clears, the plates fold away, a light sweep crosses
 *   2.9s  the Tasklyn mark builds along its own arrow, the name resolves from
 *         wide tracking, a rule draws, the descriptor and tagline appear
 *   4.6s  the black curtain lifts to reveal the page (done by 5.4s)
 *
 * Pure CSS animation (.splash-* in globals.css): no JavaScript is needed to run
 * or to remove it, it never blocks the page HTML, and crawlers and no-JS
 * visitors get the whole page underneath. aria-hidden, no heading. Plays once
 * per full page load; client-side navigation back to "/" does not replay it.
 * Reduced motion gets a still title card for about 2 seconds.
 */

const SYSTEMS = ["Intelligence", "Context", "Memory", "Reasoning", "Execution"];

let played = false;

export function Intro() {
  const [show] = useState(() => !played);
  if (typeof window !== "undefined" && !played) {
    window.setTimeout(() => {
      played = true;
    }, 5600);
  }
  if (!show) return null;

  return (
    <div aria-hidden="true" className="splash" data-nosnippet>
      <div className="splash-grid" />
      <p className="splash-label splash-tl">Tasklyn / System initialisation</p>
      <p className="splash-label splash-tr">{BRAND.descriptor}</p>

      <div className="splash-readout">
        <ul>
          {SYSTEMS.map((s, i) => (
            <li key={s} className="splash-sys" style={{ animationDelay: `${0.5 + i * 0.12}s` }}>
              {s}
            </li>
          ))}
        </ul>
        <p className="splash-online">Online</p>
      </div>

      <div className="splash-plates" data-tone="dark">
        <div>
          <Plates variant="network" drift={false} className="w-full" />
        </div>
      </div>

      <span className="splash-sweep" />

      <div className="splash-title">
        <LogoMark id="splash-mark" className="splash-mark" />
        <span className="splash-name">TASKLYN</span>
        <span className="splash-rule" />
        <span className="splash-desc">{BRAND.descriptor}</span>
        <span className="splash-tag">{BRAND.tagline}</span>
      </div>

      <div className="splash-bar" />
    </div>
  );
}
