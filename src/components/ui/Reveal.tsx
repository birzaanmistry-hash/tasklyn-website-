/**
 * Reveal: a gentle fade-up as content enters the viewport.
 *
 * Server component. It only adds data-reveal; one tiny client observer
 * (<RevealObserver />, mounted once in SiteShell) does the work. Content is
 * visible in server HTML and with JS off: the observer hides only elements
 * that start below the fold, after hydration, and reveals them on entry.
 * prefers-reduced-motion disables the effect entirely (see globals.css).
 *
 * Props
 *  children
 *  delay?: number          ms, for small staggers (keep total under ~300ms)
 *  as?: "div" | "li" | "section" | "article"   default "div"
 *  className?: string
 *  style?: React.CSSProperties   merged with the delay variable
 */
export function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  className = "",
  style,
}: {
  children: React.ReactNode;
  delay?: number;
  as?: "div" | "li" | "section" | "article";
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <Tag
      data-reveal=""
      className={className}
      style={delay || style ? ({ ...style, ...(delay ? { "--reveal-delay": `${delay}ms` } : {}) } as React.CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}
