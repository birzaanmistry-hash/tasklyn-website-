# Tasklyn

The Tasklyn flagship site. One continuous camera move through a single 3D object,
with the company's plain-language offer readable at every point along it.

```bash
npm run dev     # http://localhost:3000
npm run build
npm start
```

## The idea

The whole page is built around one object, the **Core**: a lattice engine of
counter-rotating geodesic shells, a volumetric point mass, node modules seated on
the shell, and stepped pathways carrying packets of work between them.

The step is the brand motif. The Tasklyn mark is an ascending staircase, so
nothing inside the Core travels in a straight diagonal. It climbs in risers and
runs, and matter settles onto discrete rings rather than a smooth field.

Scroll is the camera. The page does not have sections that animate independently;
it has **beats**, and every beat drives the same object from the same normalised
scroll value.

## Architecture

| Path | What it owns |
| --- | --- |
| `src/lib/choreography.ts` | The beat table, the camera path, and `measureBeats`. Single source of truth for timing. |
| `src/lib/shaders.ts` | All GLSL. `coreTransform` is run by every part of the Core, so the object cannot tear into unrelated effects. |
| `src/lib/lattice.ts` | Procedural geometry: point mass, armature, node modules, stepped pathways. |
| `src/lib/perf.ts` | Device tiering and per-tier budgets. |
| `src/lib/store.ts` | `frame` (continuous values, never React state) and a small discrete store. |
| `src/lib/content.ts` | Every visible string, plus `BOOKING_URL`. |
| `src/components/core/` | The scene: camera, driver, particles, lattice, nodes, connections, strata, singularity, nested cores. |
| `src/components/sections/` | One component per beat. |

### Two rules worth keeping

**Continuous values never go in React state.** Scroll, pointer and time live on
the `frame` object in `src/lib/store.ts` and are read in `useFrame` / rAF loops.
Putting them in state re-renders the tree every frame and collapses on mobile.

**One uniform object, shared by reference.** Every Core material spreads the same
`U` from `components/core/uniforms.ts`, so the points, struts, nodes and pathways
always read identical values in the same frame.

## Two compositions, not one scaled down

Above 900px the copy for each beat is `fixed` and held centred for the whole
beat. Below 900px the copy is in normal flow and scrolls conventionally, while
the Core stays behind it and keeps transforming. Beat ranges are measured from
the DOM (`measureBeats`) so the Core stays in step with the copy in both.

Fixed rather than sticky is deliberate: a sticky child can only stay pinned for
`sectionHeight - childHeight`, so any beat longer than two viewport heights would
scroll its own copy off the top of the screen halfway through.

## Legibility

Text sits over a moving object, so contrast is not left to chance. Every beat
carries a **scrim** in one of two tiers, set per section in `ScrollScene`:

- **read** (`read`, `read-left`, `read-right`) for sections you actually read.
  Holds the text zone at ~0.93 of the page ground, measuring about 7:1 for body
  copy even with the brightest part of the Core directly behind it.
- **film** (`film`, `film-left`, `bottom`) for the big typographic beats, where
  the type is display sized and near-white and needs far less help.

Both clear WCAG AA. If you add a section, give it the right tier rather than
relying on the Core happening to be dark there.

## Accessibility

- `prefers-reduced-motion` replaces the opening film with a still title card,
  disables the camera travel, the collapse and the pointer response.
- The Core is `aria-hidden`. Every claim it makes is also made in text.
- The kinetic-type beat exposes a plain `sr-only` sentence, since its glyphs are
  individually `aria-hidden`.
- The opening sequence is skippable by click, key, wheel or touch.
- Zoom is not locked and focus is visible throughout.
- Every off-site CTA is marked "opens in a new tab" for screen readers.

## Performance

Geometry is generated once from a deterministic PRNG, so the Core is identical on
every load. Budgets per device tier are in `src/lib/perf.ts`; the Core is the same
object on every device, only its resolution changes. `three` is loaded client-side
only and outside the critical path, so the text, navigation and booking CTA are
usable before any of it arrives. If WebGL never initialises the page is still a
complete, readable site.

## Booking

There is no contact form. Every "Build your system" CTA (nav, hero, final call to
action, footer) opens the Google Calendar booking page for the 45-minute
discovery call, in a new tab.

The URL lives in one place, `BOOKING_URL` in `src/lib/content.ts`. It is the
canonical public form and deliberately does **not** contain the `/u/0/`
account-index segment that Google shows the schedule owner: that variant only
resolves for whoever is signed into the owning account and would fail for most
visitors. The `calendar.app.google` short link redirects to this same URL, so
using it directly saves a hop.

If the appointment schedule is ever recreated, the ID changes. Update that one
constant and every CTA follows.

## What still needs writing

`/privacy` and `/terms` are linked in the footer but the pages do not exist yet.

## Deliberately absent

No testimonials, client logos, case studies, award badges or performance
statistics. The brief called for the product experience to be the credibility
layer, and none of that social proof could be substantiated. The earlier site's
result claims (percentage lifts, hours saved) are not carried over.
