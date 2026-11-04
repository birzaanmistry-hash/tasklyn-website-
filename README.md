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

## The opening sequence

It is not skippable: every visitor sees it. That is only defensible because it is
short. It runs about three and a half seconds and opens already in motion. An
earlier cut ran eleven seconds and held on an almost-empty frame for the first
second and a half, which reads as a site that has not loaded rather than as an
establishing shot.

Because there is no skip control, `FAILSAFE_MS` in `CinematicIntro` releases the
page on wall-clock time regardless of what GSAP is doing. A backgrounded tab
throttles rAF hard enough to stall the timeline, and without the failsafe that
would strand the visitor on the title card with no way out. It is never reached
in a normal run.

It also does not start until `coreReady` is set (in `CoreScene`'s `onCreated`),
with an 1800ms fallback in case WebGL never initialises. Running the first shots
while three.js is still downloading spends them on a blank screen.

`CinematicIntro`'s start effect polls the store rather than depending on
`coreReady` as a React dependency. That is deliberate: a dependency makes the
effect re-run the instant the renderer appears, and its cleanup would kill a
timeline the fallback had already started, freezing the film permanently.

## Accessibility

- `prefers-reduced-motion` replaces the opening film with a still title card,
  disables the camera travel, the collapse and the pointer response.
- The Core is `aria-hidden`. Every claim it makes is also made in text.
- The kinetic-type beat exposes a plain `sr-only` sentence, since its glyphs are
  individually `aria-hidden`.
- The opening sequence is skippable by click, key, wheel or touch.
- Zoom is not locked and focus is visible throughout.
- Every off-site CTA is marked "opens in a new tab" for screen readers.

## Mobile

Below 900px the home page uses its own composition, not a shrunken desktop.
Beats scroll like a normal page instead of being pinned (`ScrollScene` adds a
`compact-flow` class), and everything is checked at 360, 390, 430 and 768px.

- **Scroll-driven fades resolve fully.** Rows marked `data-reveal` are forced to
  full opacity in compact mode by `.compact-flow` in `globals.css`. Without it,
  lists stayed stuck at 20% opacity, because a fade that needs a pinned scene to
  play out never completes on a page that just scrolls. When you add a new
  scroll-revealed row, give it `data-reveal`.
- **Sections whose second half is a scroll-driven handover** (`Rewire`,
  `InfiniteCore`, `Kinetic`) render a static before and after via `useCompact()`.
- **The Core has to be seen.** Large-type beats use a light scrim on phones; only
  the sections that carry paragraphs keep the heavy one.
- **The camera is portrait-aware** (`portraitness`, `fitPortrait` in
  `CoreCamera.tsx`): it pulls back on tall screens so the whole Core fits across
  the narrow axis, and frames it in the upper half while the hero copy sits
  below. Inside the shell it is left alone.
- Safe-area insets for notched phones (`viewportFit: "cover"`, `.safe-top`,
  `.safe-bottom`), 44px minimum touch targets, and balanced headings.

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

## SEO and AI-search layer

Everything search engines and AI assistants read lives in `src/lib/seo.ts`:
`pageMeta()` for title, description, canonical, Open Graph and Twitter in one
call, and the JSON-LD builders (Organization, WebSite, BreadcrumbList). Every
page uses `pageMeta()`, so the canonical, OG URL and Twitter card cannot
disagree. Titles are written to 55 to 60 characters and descriptions to 150 to
160.

Static assets: `src/app/sitemap.ts` (add a path to `PATHS` when a page ships),
`public/llms.txt`, `src/app/opengraph-image.tsx` (the share card, built at deploy
time from the same traced mark), and the favicon and icons in `src/app/`.

Structured data must only state what a visitor can also read on a page. If the
site's claims change, change `seo.ts` and `llms.txt` in the same commit.

`robots.txt` is deliberately absent: with none, every crawler is allowed, which
is the current intent. Add one only as a deliberate decision.

## Performance

Measured with Lighthouse (mobile, the same method before and after):

| | /services before | after | home before | after |
|---|---|---|---|---|
| Performance | 67 | 80 | 45 | 62 |
| Total blocking time | 9,860 ms | 820 ms | 4,240 ms | 770 ms |
| Longest task | 6,966 ms | 314 ms | 3,557 ms | 283 ms |
| LCP | 0.8 s | 0.8 s | 6.6 s | 4.8 s |

What changed, and why each part is there:

- **Text pages get a small Core** (`AMBIENT_BUDGET`): about 7k points instead of
  42k, no nested shells or strata, 1x pixel ratio, rendered on demand at ~30fps.
  It sits behind a ~93% reading scrim, so the full scene bought nothing visible.
  On a low-tier device these pages skip it entirely.
- **It loads after the page does.** `SiteShell` mounts the scene only once the
  page has loaded and the browser is idle, and never when Save-Data is on.
- **Shaders compile before the first frame** (`WarmUp`, using `compileAsync`),
  and the opening film waits for that. Compilation used to land as a long task in
  the middle of the film.
- **The nested "infinite" shells are built after the film ends**, not during it.

The home page's LCP is still 4.8 s, and that is the opening film, not a bug: the
hero headline cannot be the largest paint until the film has finished. Getting it
lower means changing the film, which is a design decision.

## Legal pages

`/privacy` and `/terms` are rendered from `src/lib/legal.ts` through the shared
`LegalDoc` layout. The privacy policy describes what the code actually does: no
cookies, no browser storage, no analytics or advertising scripts, self-hosted
fonts, and a contact form that composes a `mailto` rather than posting anywhere.
**If any of that changes, update `legal.ts` in the same commit**, otherwise the
policy becomes inaccurate.

Both documents carry a "last updated" date in `LEGAL.updated`. Bump it when the
wording changes.

## Product-studio layer

Tasklyn is positioned as an AI-native product studio: custom enterprise AI
systems for clients today, and proprietary products it is exploring.

- **`src/lib/studio.ts` is the single source of truth** for the studio
  statement, the products, their status labels, the product thesis and the
  technology areas. The home teaser, `/products`, `/technology` and the
  honesty line on `/products` all read from it.
- **Product status is a claim.** Every product is currently `exploring`. Change
  a status only when it is true (one line per product in `studio.ts`), and keep
  `public/llms.txt` and the terms wording in step. The status labels are
  Exploring, In research, In development, Early access, Available.
- **No fake evidence.** Product pages use conceptual flows only, captioned
  "Concept flow, not a product interface". No screenshots, customers, metrics or
  certifications. `Express interest` is a `mailto` (see `interestHref`).
- **Navigation:** Solutions (`/services`), Products, Technology, About
  (`/team`), Contact. Primary CTA label is `CTA_PRIMARY` in `content.ts`, and it
  always opens the Google Calendar booking link.
- **Privacy and terms** mention the Express interest links and that products not
  marked Available are not for sale. Keep them in step with any change here.

## Deliberately absent

No testimonials, client logos, case studies, award badges or performance
statistics. The brief called for the product experience to be the credibility
layer, and none of that social proof could be substantiated. The earlier site's
result claims (percentage lifts, hours saved) are not carried over.
