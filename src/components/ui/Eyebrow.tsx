/**
 * Eyebrow: the small mono label above a heading. Use sparingly (about one
 * per three sections) so it keeps its meaning.
 *
 * Props
 *  children
 *  tone?: "light" | "dark"   colour for light or navy grounds. Default "light".
 *  accent?: boolean          short blue/cyan rule before the label. Default false.
 *  as?: "p" | "span" | "div"  Default "p".
 *  className?: string
 */
export function Eyebrow({
  children,
  tone = "light",
  accent = false,
  as: Tag = "p",
  className = "",
}: {
  children: React.ReactNode;
  tone?: "light" | "dark";
  accent?: boolean;
  as?: "p" | "span" | "div";
  className?: string;
}) {
  return (
    <Tag
      className={`t-label inline-flex items-center gap-3 ${tone === "dark" ? "text-haze" : "text-muted"} ${className}`}
    >
      {accent && (
        <span
          aria-hidden="true"
          className={`h-px w-6 ${tone === "dark" ? "bg-cyan" : "bg-blue"}`}
        />
      )}
      {children}
    </Tag>
  );
}
