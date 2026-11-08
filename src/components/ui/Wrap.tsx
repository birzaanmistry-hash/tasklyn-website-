/**
 * Wrap: the site's content container. Max width 84rem (1344px) with fluid
 * gutters (20 / 32 / 48px at 390 / 768 / 1024+). Every section uses it so
 * left edges line up down the whole page.
 *
 * Props
 *  children
 *  className?: string
 *  as?: "div" | "header" | "footer" | "nav"   default "div"
 */
export function Wrap({
  children,
  className = "",
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "header" | "footer" | "nav";
}) {
  return <Tag className={`mx-auto w-full max-w-wrap px-(--gutter) ${className}`}>{children}</Tag>;
}
