# Tasklyn website: implementation plan

Branch: `enterprise-redesign` (from `main`). Nothing merges to `main` without the owner's approval.

## Direction
Bright, editorial, Scale-inspired enterprise AI site. Dark navy sections used sparingly (hero panel, technology, final CTA, footer).
Tagline (owner-supplied): **AI is the future and we are building it.** Descriptor: Enterprise AI Engineering & Products.

### Scale.com research (inspected live)
Font Aeonik (proprietary) at weight 400 with about -0.01em tracking; 64px header; white page; large rounded dark hero panel;
simple top nav (Products, Solutions, Research, Resources) with a single filled CTA. Tasklyn uses Geist Sans (open, self-hosted) with the same
restraint: weights 400-500, tight tracking, generous whitespace. No code, copy, assets or branding are copied.

## Design system
Tokens live in `src/app/globals.css` (`@theme`): colour (ink #101828, navy #101B30, off-white #F7F8FA, grey #E9EDF2, text-2 #667085, blue #168BEB, cyan #00D4E8), spacing, containers, radius, borders, motion. One typeface (Geist Sans) + Geist Mono for labels.

## Architecture
- Content model: `src/lib/site.ts` (nav tree, solutions, industries, architecture, approach, problem types, product vision, resources). Contact and booking: `src/lib/content.ts`.
- SEO helpers: `src/lib/seo.ts` (`pageMeta`, JSON-LD builders, `ldJson`).
- Primitives: `src/components/ui/` (Section, Wrap, Eyebrow, Button, PageHero, CtaBand, Breadcrumbs, Reveal, FaqList, ArchitectureDiagram, LegalDoc).
- Shell: Header with accessible mega-menu, mobile drawer, Footer.

## Routes
`/`, `/solutions`, `/solutions/{ai-engineering,agentic-ai,automation,llm,ai-integration,data-ml,ai-consulting}`, `/products`, `/industries`, `/technology`,
`/case-studies`, `/resources`, `/resources/[slug]` (8 explainers), `/company`, `/contact`, `/privacy`, `/terms`, `not-found`.
Redirects (301): `/services` to `/solutions`, `/team` to `/company`.

## Honesty constraints
No invented clients, testimonials, statistics, partnerships, awards, certifications, revenue or named products. Products page is a vision. Case studies page lists problem types and states no client engagements are published. Resources are original explainers without invented authors or dates.

## SEO / GEO / AEO
One primary intent per page (see `.claude/skills/tasklyn-seo-geo-aeo`). Unique titles/descriptions, canonicals, OG/Twitter, breadcrumbs, JSON-LD (Organization, WebSite, WebPage, BreadcrumbList, Service, Article, FAQPage only where visible), sitemap generated from the content model, `robots.ts`, `llms.txt` as a supplement. Google Analytics: not enabled; when a measurement ID is supplied it must be added env-gated and the privacy policy updated first.

## Testing strategy
`tsc`, lint, production build, route crawl (all nav and sitemap URLs 200), per-page SEO checks (one H1, title/description lengths, canonical, JSON-LD parses), banned-claim scan, axe-style accessibility checks, keyboard walk of the mega-menu, Lighthouse (mobile and desktop) with results reported as measured, screenshots at 1440/1280/768/390 and two visual refinement passes.
