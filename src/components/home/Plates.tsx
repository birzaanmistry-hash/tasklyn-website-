/**
 * Plates: an original "layered translucent sheets" illustration. Four thin
 * plates stand in perspective (CSS 3D, see .plates in globals.css); the
 * front plate carries line art for the section's subject, the plates behind
 * carry quieter traces of the same system. White hairlines, one accent
 * stroke in Tasklyn cyan. Decorative: aria-hidden.
 *
 * Props
 *  variant: "documents" | "models" | "agents" | "integrations" | "monitoring" | "network"
 *  drift?: boolean     slow transform-only drift (off under reduced motion). Default true.
 *  className?: string  sizing (width); the box keeps a 3:2 ratio
 */

export type PlatesVariant = "documents" | "models" | "agents" | "integrations" | "monitoring" | "network";

const W = 300;
const H = 200;
const LINE = { fill: "none", stroke: "white", strokeWidth: 1, vectorEffect: "non-scaling-stroke" as const };
const ACCENT = { fill: "none", stroke: "var(--color-cyan)", strokeWidth: 1.25, vectorEffect: "non-scaling-stroke" as const };

function Node({ x, y, r = 2.6, accent = false }: { x: number; y: number; r?: number; accent?: boolean }) {
  return <circle cx={x} cy={y} r={r} fill="black" stroke={accent ? "var(--color-cyan)" : "white"} strokeWidth={1} vectorEffect="non-scaling-stroke" />;
}

function Dotted({ d, accent = false, o = 0.7 }: { d: string; accent?: boolean; o?: number }) {
  return <path d={d} {...(accent ? ACCENT : LINE)} strokeOpacity={accent ? 0.95 : o} strokeDasharray="1.5 3.5" strokeLinecap="round" />;
}

/* Small header strip every front plate shares: a title rule and three ports. */
function Strip() {
  return (
    <g>
      <path d="M18 16 H96" {...LINE} strokeOpacity={0.55} />
      <path d="M18 22 H62" {...LINE} strokeOpacity={0.3} />
      {[246, 258, 270].map((x) => (
        <rect key={x} x={x} y={12} width={7} height={7} rx={1.5} {...LINE} strokeOpacity={0.55} />
      ))}
    </g>
  );
}

function Front({ variant }: { variant: PlatesVariant }) {
  switch (variant) {
    case "documents":
      return (
        <g>
          <Strip />
          <rect x={22} y={36} width={84} height={136} rx={4} {...LINE} strokeOpacity={0.75} />
          {[52, 64, 76, 92, 104, 116, 132, 144, 156].map((y, i) => (
            <path key={y} d={`M32 ${y} H${[88, 70, 80, 92, 64, 84, 76, 90, 58][i]}`} {...LINE} strokeOpacity={0.45} />
          ))}
          {[
            [64, 52],
            [104, 88],
            [144, 124],
          ].map(([y, ty], i) => (
            <g key={y}>
              <Dotted d={`M110 ${y} C150 ${y} 160 ${ty + 6} 196 ${ty + 6}`} accent={i === 1} />
              <Node x={196} y={ty + 6} accent={i === 1} />
              <rect x={206} y={ty} width={70} height={13} rx={3} {...LINE} strokeOpacity={0.6} />
              <path d={`M212 ${ty + 6.5} H${236 + i * 10}`} {...LINE} strokeOpacity={0.4} />
            </g>
          ))}
          <path d="M206 160 H276" {...LINE} strokeOpacity={0.3} />
        </g>
      );
    case "models": {
      const cols = [
        { x: 52, ys: [56, 88, 120, 152] },
        { x: 150, ys: [44, 74, 104, 134, 164] },
        { x: 248, ys: [72, 104, 136] },
      ];
      const links: string[] = [];
      for (let c = 0; c < 2; c++)
        for (const a of cols[c].ys)
          for (const b of cols[c + 1].ys) {
            const x1 = cols[c].x;
            const x2 = cols[c + 1].x;
            const m = (x1 + x2) / 2;
            links.push(`M${x1} ${a} C${m} ${a} ${m} ${b} ${x2} ${b}`);
          }
      return (
        <g>
          <Strip />
          {links.map((d) => (
            <path key={d} d={d} {...LINE} strokeOpacity={0.16} />
          ))}
          <path d="M52 88 C101 88 101 104 150 104 C199 104 199 104 248 104" {...ACCENT} />
          {cols.flatMap((c) => c.ys.map((y) => <Node key={`${c.x}-${y}`} x={c.x} y={y} accent={(c.x === 52 && y === 88) || (c.x !== 52 && y === 104)} />))}
        </g>
      );
    }
    case "agents":
      return (
        <g>
          <Strip />
          <rect x={22} y={88} width={34} height={24} rx={5} {...LINE} strokeOpacity={0.8} />
          {[52, 100, 148].map((y, i) => (
            <g key={y}>
              <path d={`M56 100 C88 100 88 ${y} 120 ${y}`} {...(i === 1 ? ACCENT : LINE)} strokeOpacity={i === 1 ? 1 : 0.55} />
              <rect x={120} y={y - 10} width={44} height={20} rx={5} {...LINE} strokeOpacity={0.7} />
              <path d={`M128 ${y} H${150 - i * 4}`} {...LINE} strokeOpacity={0.4} />
              <path d={`M164 ${y} C194 ${y} 194 100 222 100`} {...(i === 1 ? ACCENT : LINE)} strokeOpacity={i === 1 ? 1 : 0.4} />
            </g>
          ))}
          <circle cx={234} cy={100} r={12} {...LINE} strokeOpacity={0.8} />
          <path d="M228 100 l4 4 l8 -8" {...ACCENT} />
          <Dotted d="M246 100 H280" />
          <Dotted d="M142 158 V178 H262 V112" o={0.35} />
          <Node x={280} y={100} />
        </g>
      );
    case "integrations":
      return (
        <g>
          <Strip />
          {[50, 96, 142].map((y, i) => (
            <g key={y}>
              <rect x={20} y={y} width={58} height={22} rx={4} {...LINE} strokeOpacity={0.7} />
              <path d={`M28 ${y + 11} H${56 - i * 6}`} {...LINE} strokeOpacity={0.4} />
              <rect x={222} y={y} width={58} height={22} rx={4} {...LINE} strokeOpacity={0.7} />
              <path d={`M230 ${y + 11} H${262 - i * 8}`} {...LINE} strokeOpacity={0.4} />
              <path d={`M78 ${y + 11} C116 ${y + 11} 116 107 134 107`} {...(i === 0 ? ACCENT : LINE)} strokeOpacity={i === 0 ? 1 : 0.5} />
              <path d={`M166 107 C184 107 184 ${y + 11} 222 ${y + 11}`} {...(i === 0 ? ACCENT : LINE)} strokeOpacity={i === 0 ? 1 : 0.5} />
              <Node x={78} y={y + 11} r={2.2} accent={i === 0} />
              <Node x={222} y={y + 11} r={2.2} accent={i === 0} />
            </g>
          ))}
          <rect x={134} y={91} width={32} height={32} rx={8} {...LINE} strokeOpacity={0.9} />
          <rect x={142} y={99} width={16} height={16} rx={3} {...LINE} strokeOpacity={0.5} />
        </g>
      );
    case "monitoring":
      return (
        <g>
          <Strip />
          {[60, 90, 120, 150].map((y) => (
            <Dotted key={y} d={`M28 ${y} H276`} o={0.22} />
          ))}
          <path d="M28 40 V170 H276" {...LINE} strokeOpacity={0.6} />
          <path d="M28 82 H276" {...LINE} strokeOpacity={0.45} strokeDasharray="6 4" />
          <path d="M28 150 L58 138 L86 142 L116 118 L146 126 L176 102 L206 108 L236 92 L270 96" {...ACCENT} />
          <path d="M28 160 L58 156 L86 150 L116 152 L146 140 L176 144 L206 132 L236 136 L270 124" {...LINE} strokeOpacity={0.45} />
          {[
            [116, 118],
            [176, 102],
            [236, 92],
          ].map(([x, y]) => (
            <Node key={x} x={x} y={y} accent />
          ))}
        </g>
      );
    case "network":
    default: {
      const pts = [
        [40, 60],
        [92, 40],
        [70, 112],
        [140, 76],
        [128, 150],
        [196, 52],
        [206, 124],
        [258, 88],
        [252, 160],
      ];
      const edges = [
        [0, 1],
        [0, 2],
        [1, 3],
        [2, 3],
        [2, 4],
        [3, 5],
        [3, 6],
        [4, 6],
        [5, 7],
        [6, 7],
        [6, 8],
      ];
      return (
        <g>
          <Strip />
          {edges.map(([a, b], i) => (
            <path
              key={i}
              d={`M${pts[a][0]} ${pts[a][1]} L${pts[b][0]} ${pts[b][1]}`}
              {...([2, 3].includes(i) || i === 6 || i === 9 ? ACCENT : LINE)}
              strokeOpacity={[2, 3].includes(i) || i === 6 || i === 9 ? 0.95 : 0.4}
            />
          ))}
          {pts.map(([x, y], i) => (
            <Node key={i} x={x} y={y} r={i === 3 ? 4 : 2.6} accent={[2, 3, 6, 7].includes(i)} />
          ))}
        </g>
      );
    }
  }
}

/* Quieter traces on the plates behind. */
function Back({ depth }: { depth: number }) {
  if (depth === 1) {
    const dots = [];
    for (let x = 30; x <= 270; x += 24) for (let y = 40; y <= 170; y += 26) dots.push([x, y]);
    return (
      <g>
        {dots.map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r={0.9} fill="white" fillOpacity={0.35} />
        ))}
        <path d="M30 66 C100 66 120 118 270 118" {...LINE} strokeOpacity={0.3} />
      </g>
    );
  }
  if (depth === 2) {
    return (
      <g>
        <path d="M24 30 H120" {...LINE} strokeOpacity={0.3} />
        <path d="M24 170 H276" {...LINE} strokeOpacity={0.18} />
        <rect x={190} y={44} width={86} height={58} rx={4} {...LINE} strokeOpacity={0.2} />
      </g>
    );
  }
  return null;
}

const SHEETS = [
  { edge: 0.78, fill: 0.035 },
  { edge: 0.5, fill: 0.028 },
  { edge: 0.32, fill: 0.02 },
  { edge: 0.2, fill: 0.014 },
];

export function Plates({
  variant,
  drift = true,
  className = "w-[min(60vw,19rem)]",
}: {
  variant: PlatesVariant;
  drift?: boolean;
  className?: string;
}) {
  return (
    <div aria-hidden="true" className={`plates relative aspect-[3/2] ${drift ? "plates--drift" : ""} ${className}`}>
      <div className="plates__stack" style={{ left: "-14%", right: "14%" }}>
        {SHEETS.map((s, i) => (
          <div
            key={i}
            className="plates__sheet"
            style={{ "--i": i, "--edge": s.edge, "--fill": s.fill, zIndex: SHEETS.length - i } as React.CSSProperties}
          >
            <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full" focusable="false">
              {i === 0 ? <Front variant={variant} /> : <Back depth={i} />}
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
}
