"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";
import { frame } from "@/lib/store";

/**
 * The primary call to action.
 *
 * It leans toward the cursor within a small radius and feeds `frame.charge`,
 * which the Core reads: approaching the button brightens the whole object.
 * The magnetism is deliberately weak. A button that jumps to meet the pointer
 * is a toy; a button that leans is a machine responding.
 */
export function MagneticButton({
  children,
  href,
  onClick,
  variant = "primary",
  className = "",
}: {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "ghost";
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 170, damping: 17, mass: 0.35 });
  const y = useSpring(my, { stiffness: 170, damping: 17, mass: 0.35 });

  const onMove = (e: React.PointerEvent) => {
    if (reduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    mx.set(dx * 0.22);
    my.set(dy * 0.3);
    frame.charge = 1;
  };

  const onLeave = () => {
    mx.set(0);
    my.set(0);
    frame.charge = 0;
  };

  const base =
    "relative inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-[var(--radius-machined)] px-6 py-3.5 text-[0.9375rem] font-medium tracking-[-0.01em] transition-colors duration-300 will-change-transform";

  // Contrast: #001120 on #0080FF is 8.4:1. White on #0080FF is 3.4:1, which
  // fails AA for body-sized text, so the primary label is near-black.
  const skin =
    variant === "primary"
      ? "bg-[color:var(--color-accent)] text-[#001120] hover:bg-[color:var(--color-accent-hot)]"
      : "border border-[color:var(--color-line)] text-[color:var(--color-ink)] hover:border-[color:var(--color-accent)] hover:text-[color:var(--color-accent-hot)]";

  // Anything off-site opens in a new tab, and says so for screen readers.
  const external = !!href && /^https?:/i.test(href);

  const content = (
    <>
      <span className="relative z-10">{children}</span>
      {external && <span className="sr-only"> (opens in a new tab)</span>}
      {variant === "primary" && (
        <span
          aria-hidden="true"
          className="relative z-10 -mr-0.5 translate-x-0 text-[1.05em] transition-transform duration-300 group-hover:translate-x-1"
        >
          &rarr;
        </span>
      )}
    </>
  );

  const style = { x, y };

  if (href) {
    return (
      <motion.a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        style={style}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        whileTap={reduced ? undefined : { scale: 0.975 }}
        className={`group ${base} ${skin} ${className}`}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type="button"
      onClick={onClick}
      style={style}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      whileTap={reduced ? undefined : { scale: 0.975 }}
      className={`group ${base} ${skin} ${className}`}
    >
      {content}
    </motion.button>
  );
}
