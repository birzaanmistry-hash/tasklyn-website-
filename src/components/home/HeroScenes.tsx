/**
 * HeroScenes: the opening sequence behind the fixed hero headline.
 *
 * Six original full-bleed technical scenes drawn in SVG (no photos, no
 * video): the rising logo arrow, a document lattice, a network graph, an
 * agent workflow, integration lines between system blocks and a monitoring
 * waveform with gauge ticks. Generic annotation tags, never data.
 *
 * Mechanics (all CSS, see .hero-scene in globals.css):
 *  - Server HTML holds every scene. Static default: only scene 0 is visible,
 *    which is what no-JS visitors and reduced-motion users get.
 *  - With scripting on and motion allowed, the panel starts black for ~1s,
 *    then scenes cut in every 1.3s with a 150ms crossfade, looping. Opacity
 *    and transform only. No client JavaScript.
 * Decorative: aria-hidden.
 */

const VW = 1440;
const VH = 800;
const MONO = { fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.06em" };

/* Deterministic pseudo-random numbers so server output is stable. */
function rng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

function Tag({ x, y, w, h, label, dashed = false }: { x: number; y: number; w: number; h: number; label: string; dashed?: boolean }) {
  const tw = label.length * 7.2 + 14;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={3} fill="none" stroke="var(--color-cyan)" strokeOpacity={0.85} strokeWidth={1} strokeDasharray={dashed ? "4 4" : undefined} />
      <rect x={x} y={y - 19} width={tw} height={17} rx={2} fill="var(--color-cyan)" fillOpacity={0.14} stroke="var(--color-cyan)" strokeOpacity={0.6} />
      <text x={x + 7} y={y - 7} fill="var(--color-cyan)" style={MONO}>
        {label.toUpperCase()}
      </text>
    </g>
  );
}

function Field({ id, top = "#05070c", bottom = "#0d1d38" }: { id: string; top?: string; bottom?: string }) {
  return (
    <>
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={top} />
          <stop offset="1" stopColor={bottom} />
        </linearGradient>
        <pattern id={`${id}-grid`} width="48" height="48" patternUnits="userSpaceOnUse">
          <path d="M48 0H0V48" fill="none" stroke="white" strokeOpacity="0.045" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width={VW} height={VH} fill={`url(#${id}-bg)`} />
      <rect width={VW} height={VH} fill={`url(#${id}-grid)`} />
    </>
  );
}

/* 0. The rising arrow from the logo geometry: the vivid first scene. */
function SceneRise() {
  const steps = [
    [560, 700],
    [560, 640],
    [960, 640],
    [960, 560],
  ];
  return (
    <>
      <Field id="sr" top="#04070e" bottom="#0e2747" />
      <defs>
        <linearGradient id="sr-line" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="var(--color-blue)" stopOpacity="0.2" />
          <stop offset="0.55" stopColor="var(--color-blue)" stopOpacity="1" />
          <stop offset="1" stopColor="var(--color-cyan)" stopOpacity="1" />
        </linearGradient>
        <filter id="sr-soft" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="7" />
        </filter>
        <radialGradient id="sr-horizon" cx="0.62" cy="1" r="0.7">
          <stop offset="0" stopColor="var(--color-blue)" stopOpacity="0.28" />
          <stop offset="1" stopColor="var(--color-blue)" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width={VW} height={VH} fill="url(#sr-horizon)" />
      {[560, 620, 680, 740].map((y, i) => (
        <path key={y} d={`M0 ${y} H${VW}`} stroke="white" strokeOpacity={0.04 + i * 0.015} />
      ))}
      <path d="M-20 700 H560 V640 H960 V560 L1310 236" fill="none" stroke="url(#sr-line)" strokeWidth={6} opacity={0.5} filter="url(#sr-soft)" />
      <path d="M-20 700 H560 V640 H960 V560 L1310 236" fill="none" stroke="url(#sr-line)" strokeWidth={1.6} />
      <path d="M1238 236 H1310 V308" fill="none" stroke="var(--color-cyan)" strokeWidth={1.6} />
      {steps.map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r={4} fill="#05070c" stroke="var(--color-cyan)" strokeWidth={1.2} />
      ))}
      <Tag x={1200} y={196} w={150} h={150} label="trajectory" dashed />
      <Tag x={510} y={612} w={92} h={70} label="step" />
    </>
  );
}

/* 1. Document lattice. */
function SceneDocuments() {
  const r = rng(7);
  const cards: { x: number; y: number; hot: boolean; lines: number[] }[] = [];
  for (let col = 0; col < 13; col++)
    for (let row = 0; row < 6; row++) {
      const x = 20 + col * 112 + (row % 2) * 56;
      const y = -40 + row * 148;
      cards.push({ x, y, hot: false, lines: Array.from({ length: 7 }, () => 30 + r() * 46) });
    }
  const hot = [
    [2, "document"],
    [33, "field"],
    [64, "table"],
  ] as const;
  return (
    <>
      <Field id="sd" top="#04060b" bottom="#0a1730" />
      {cards.map((c, i) => (
        <g key={i} opacity={0.9}>
          <rect x={c.x} y={c.y} width={88} height={120} rx={4} fill="white" fillOpacity={0.015} stroke="white" strokeOpacity={0.16} />
          {c.lines.map((w, j) => (
            <path key={j} d={`M${c.x + 10} ${c.y + 18 + j * 13} h${w}`} stroke="white" strokeOpacity={j === 0 ? 0.24 : 0.1} />
          ))}
        </g>
      ))}
      {hot.map(([i, label]) => {
        const c = cards[i];
        return <Tag key={i} x={c.x - 6} y={c.y - 6} w={100} h={132} label={label} />;
      })}
    </>
  );
}

/* 2. Network graph. */
function SceneNetwork() {
  const r = rng(21);
  const pts = Array.from({ length: 64 }, () => [40 + r() * 1360, 40 + r() * 720]);
  const edges = new Set<string>();
  pts.forEach((p, i) => {
    const near = pts
      .map((q, j) => [j, (p[0] - q[0]) ** 2 + (p[1] - q[1]) ** 2] as const)
      .filter(([j]) => j !== i)
      .sort((a, b) => a[1] - b[1])
      .slice(0, 2);
    near.forEach(([j]) => edges.add(i < j ? `${i}-${j}` : `${j}-${i}`));
  });
  /* one highlighted route through the graph */
  const route = [0];
  for (let k = 0; k < 6; k++) {
    const last = pts[route[route.length - 1]];
    const next = pts
      .map((q, j) => [j, q[0] - last[0], Math.abs(q[1] - last[1])] as const)
      .filter(([j, dx]) => !route.includes(j) && dx > 40)
      .sort((a, b) => a[1] + a[2] - (b[1] + b[2]))[0];
    if (!next) break;
    route.push(next[0]);
  }
  const hub = pts[route[3]];
  return (
    <>
      <Field id="sn" top="#05070c" bottom="#0b1832" />
      {[...edges].map((e) => {
        const [a, b] = e.split("-").map(Number);
        return <path key={e} d={`M${pts[a][0]} ${pts[a][1]} L${pts[b][0]} ${pts[b][1]}`} stroke="white" strokeOpacity={0.16} />;
      })}
      <path d={`M${route.map((i) => `${pts[i][0]} ${pts[i][1]}`).join(" L")}`} fill="none" stroke="var(--color-cyan)" strokeWidth={1.4} />
      {pts.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={route.includes(i) ? 4 : 2.6} fill="#05070c" stroke={route.includes(i) ? "var(--color-cyan)" : "white"} strokeOpacity={route.includes(i) ? 1 : 0.45} />
      ))}
      <Tag x={hub[0] - 46} y={hub[1] - 46} w={92} h={92} label="entity" />
    </>
  );
}

/* 3. Agent workflow. */
function SceneAgents() {
  const labels = ["task", "plan", "retrieve", "tool call", "review", "done"];
  const xs = [110, 330, 560, 820, 1060, 1290];
  const rows = [230, 400, 570];
  return (
    <>
      <Field id="sa" top="#04060b" bottom="#0c1b35" />
      {rows.map((y, ri) =>
        xs.slice(0, -1).map((x, i) => {
          const nx = xs[i + 1];
          const ny = rows[(ri + (i % 2 ? 1 : 2)) % 3];
          return <path key={`${ri}-${i}`} d={`M${x + 50} ${y} C${x + 140} ${y} ${nx - 100} ${ny} ${nx - 50} ${ny}`} fill="none" stroke="white" strokeOpacity={0.14} />;
        })
      )}
      <path
        d={`M${xs[0] + 50} 400 ${xs
          .slice(1)
          .map((x, i) => `C${xs[i] + 140} ${[400, 230, 400, 570, 400][i]} ${x - 100} ${[230, 400, 570, 400, 400][i]} ${x - 50} ${[230, 400, 570, 400, 400][i]} M${x + 50} ${[230, 400, 570, 400, 400][i]}`)
          .join(" ")}`}
        fill="none"
        stroke="var(--color-cyan)"
        strokeWidth={1.3}
      />
      {rows.map((y) =>
        xs.map((x) => (
          <g key={`${x}-${y}`}>
            <rect x={x - 50} y={y - 18} width={100} height={36} rx={8} fill="#060a14" stroke="white" strokeOpacity={0.3} />
            <path d={`M${x - 34} ${y} h${30 + ((x + y) % 36)}`} stroke="white" strokeOpacity={0.22} />
          </g>
        ))
      )}
      {xs.map((x, i) => (
        <text key={x} x={x - 50} y={144} fill="white" fillOpacity={0.5} style={MONO}>
          {labels[i].toUpperCase()}
        </text>
      ))}
      <Tag x={xs[3] - 60} y={570 - 30} w={120} h={60} label="tool call" />
      <Tag x={xs[5] - 60} y={400 - 30} w={120} h={60} label="approved" dashed />
    </>
  );
}

/* 4. Integration lines between system blocks. */
function SceneIntegration() {
  const left = ["erp", "crm", "documents", "data", "messages"];
  const right = ["workflow", "reports", "records", "alerts", "people"];
  const ys = [190, 295, 400, 505, 610];
  return (
    <>
      <Field id="si" top="#05070c" bottom="#0b1a34" />
      {ys.map((y, i) => (
        <g key={y}>
          <path d={`M300 ${y} C520 ${y} 520 400 640 400`} fill="none" stroke={i === 1 ? "var(--color-cyan)" : "white"} strokeOpacity={i === 1 ? 1 : 0.2} strokeWidth={i === 1 ? 1.3 : 1} />
          <path d={`M800 400 C920 400 920 ${y} 1140 ${y}`} fill="none" stroke={i === 3 ? "var(--color-cyan)" : "white"} strokeOpacity={i === 3 ? 1 : 0.2} strokeWidth={i === 3 ? 1.3 : 1} />
          {[
            [100, left[i]],
            [1140, right[i]],
          ].map(([x, label]) => (
            <g key={String(label)}>
              <rect x={Number(x)} y={y - 26} width={200} height={52} rx={6} fill="#060a14" stroke="white" strokeOpacity={0.3} />
              <text x={Number(x) + 16} y={y + 4} fill="white" fillOpacity={0.55} style={MONO}>
                {String(label).toUpperCase()}
              </text>
              <circle cx={Number(x) + (Number(x) < 700 ? 200 : 0)} cy={y} r={3} fill="#05070c" stroke="white" strokeOpacity={0.6} />
            </g>
          ))}
        </g>
      ))}
      <rect x={640} y={330} width={160} height={140} rx={14} fill="#060a14" stroke="white" strokeOpacity={0.35} />
      <rect x={668} y={358} width={104} height={84} rx={8} fill="none" stroke="white" strokeOpacity={0.18} />
      <Tag x={92} y={269} w={216} h={52} label="source" />
      <Tag x={1132} y={479} w={216} h={52} label="target" />
    </>
  );
}

/* 5. Monitoring: waveforms, threshold, gauge ticks. */
function SceneMonitoring() {
  const r = rng(5);
  const wave = (base: number, amp: number, f: number, ph: number) => {
    let d = "";
    for (let x = 0; x <= VW; x += 12) {
      const y = base + Math.sin(x / f + ph) * amp + (r() - 0.5) * amp * 0.6;
      d += `${x === 0 ? "M" : "L"}${x} ${y.toFixed(1)} `;
    }
    return d;
  };
  const ticks = [];
  for (let a = -70; a <= 70; a += 3.5) {
    const rad = ((a - 90) * Math.PI) / 180;
    const long = Math.round(a / 3.5) % 4 === 0;
    const r1 = 330;
    const r2 = long ? 352 : 342;
    ticks.push(
      <path
        key={a}
        d={`M${720 + Math.cos(rad) * r1} ${980 + Math.sin(rad) * r1} L${720 + Math.cos(rad) * r2} ${980 + Math.sin(rad) * r2}`}
        stroke={a > 35 ? "var(--color-cyan)" : "white"}
        strokeOpacity={a > 35 ? 0.9 : 0.35}
      />
    );
  }
  return (
    <>
      <Field id="sm" top="#04060b" bottom="#0a1730" />
      {[150, 240, 330, 420, 510].map((b, i) => (
        <path key={b} d={wave(b, 14 + i * 3, 70 + i * 18, i)} fill="none" stroke="white" strokeOpacity={0.12 + (i % 2) * 0.06} />
      ))}
      <path d={wave(300, 34, 110, 2)} fill="none" stroke="var(--color-cyan)" strokeWidth={1.3} />
      <path d="M0 250 H1440" stroke="white" strokeOpacity={0.35} strokeDasharray="8 6" />
      <text x={24} y={240} fill="white" fillOpacity={0.5} style={MONO}>
        THRESHOLD
      </text>
      {ticks}
      <Tag x={1040} y={210} w={120} h={110} label="drift" />
      <Tag x={220} y={268} w={110} h={76} label="baseline" dashed />
    </>
  );
}

const SCENES = [
  { C: SceneRise, scrim: 0.12 },
  { C: SceneDocuments, scrim: 0.34 },
  { C: SceneNetwork, scrim: 0.34 },
  { C: SceneAgents, scrim: 0.36 },
  { C: SceneIntegration, scrim: 0.36 },
  { C: SceneMonitoring, scrim: 0.34 },
];

export function HeroScenes() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {SCENES.map(({ C, scrim }, i) => (
        <svg
          key={i}
          className="hero-scene absolute inset-0 h-full w-full"
          style={{ "--i": i } as React.CSSProperties}
          viewBox={`0 0 ${VW} ${VH}`}
          preserveAspectRatio="xMidYMid slice"
          focusable="false"
        >
          <C />
          <rect width={VW} height={VH} fill="black" fillOpacity={scrim} />
        </svg>
      ))}
      {/* readability: a soft dark field behind the centred headline, and a floor for the corner labels */}
      <div className="absolute inset-0 bg-[radial-gradient(60%_46%_at_50%_50%,rgb(0_0_0/0.62)_0%,rgb(0_0_0/0.3)_60%,transparent_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/60 to-transparent" />
    </div>
  );
}
