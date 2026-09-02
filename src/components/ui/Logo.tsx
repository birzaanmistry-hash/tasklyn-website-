"use client";

/**
 * The Tasklyn mark.
 *
 * The outline below is traced from the brand's own logo file rather than
 * redrawn by eye, so the proportions are the real ones: a solid block at the
 * bottom left, two steps climbing right, and an arrowhead at the top right.
 *
 * Having it as a path (instead of the original PNG) is what lets the opening
 * sequence build the mark along the direction of its own arrow, and lets it sit
 * on a dark ground with no black box around it.
 */

const MARK_PATH =
  "M62.9 0 L99.5 0 L99.5 37 L85.6 23.4 L63.4 58.9 L39.7 59.9 L39.7 73.4 " +
  "L27.8 85.4 L27.8 100 L0 100 L0 70.8 L23.7 70.3 L24.2 42.7 L55.2 42.7 " +
  "L60.8 34.4 L73.7 13 Z";

export function LogoMark({
  className = "",
  /** Adds the wipe mask the opening sequence animates to build the mark. */
  build = false,
  id = "tasklyn-mark",
}: {
  className?: string;
  build?: boolean;
  id?: string;
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      role="img"
      aria-label="Tasklyn"
    >
      <defs>
        <linearGradient
          id={`${id}-g`}
          x1="0"
          y1="100"
          x2="100"
          y2="0"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0080FF" />
          <stop offset="1" stopColor="#06D0F9" />
        </linearGradient>

        {build && (
          <>
            {/* The mask gradient runs bottom-left to top-right: the exact axis
                of the arrow. Sliding both stops along it builds the mark in the
                direction it points, rather than fading it up as a whole. */}
            <linearGradient
              id={`${id}-wipe-g`}
              x1="0"
              y1="100"
              x2="100"
              y2="0"
              gradientUnits="userSpaceOnUse"
            >
              <stop className="mark-w0" offset="0" stopColor="#fff" />
              <stop className="mark-w1" offset="0" stopColor="#000" />
            </linearGradient>

            <mask id={`${id}-wipe`} maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100">
              <rect
                x="-10"
                y="-10"
                width="120"
                height="120"
                fill={`url(#${id}-wipe-g)`}
              />
            </mask>
          </>
        )}
      </defs>

      <g mask={build ? `url(#${id}-wipe)` : undefined}>
        <path d={MARK_PATH} fill={`url(#${id}-g)`} />
      </g>
    </svg>
  );
}

export function Wordmark({ className = "" }: { className?: string }) {
  return <span className={className}>TASKLYN</span>;
}
