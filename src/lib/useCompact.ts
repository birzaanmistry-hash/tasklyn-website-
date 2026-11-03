"use client";

import { useEffect, useState } from "react";

/** Below this width the home page uses its compact (phone and small tablet) composition. */
export const COMPACT_QUERY = "(max-width: 900px)";

/**
 * True on phones and small tablets.
 *
 * It starts false and flips after hydration, which is deliberate: the server has
 * no screen to measure, and the pinned beats are invisible until JavaScript
 * reveals them anyway, so there is no flash of the wrong layout to hide.
 *
 * Sections use it to swap scroll-driven states, which only make sense when a
 * beat is pinned for a whole viewport of scrolling, for a static version that is
 * simply readable on a page that scrolls normally.
 */
export function useCompact() {
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(COMPACT_QUERY);
    const apply = () => setCompact(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  return compact;
}
