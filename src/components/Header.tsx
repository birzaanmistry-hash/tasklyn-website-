"use client";

import { BOOKING_URL } from "@/lib/content";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { NAV, type NavItem } from "@/lib/site";
import { Plates, type PlatesVariant } from "./home/Plates";
import { ArrowIcon, Button } from "./ui/Button";
import { BrandLockup } from "./ui/Logo";
import { Wrap } from "./ui/Wrap";

/**
 * Site header: sticky, 64px (88px zone from lg). Restrained: logo, seven
 * 14px links set right beside it, a quiet "Contact" and one black CTA.
 * It turns black while it sits over a black chapter (any element marked
 * data-header-dark), detected with an IntersectionObserver on a thin band
 * at the top of the viewport: no scroll listener.
 *
 * Desktop (lg+): mega-menu driven by NAV in site.ts. Items with `panel` are
 * disclosure buttons (aria-expanded / aria-controls) that open an editorial
 * frosted light panel (grey group label, plain link columns, a rounded
 * visual tile on the right) on hover (120ms intent delay), focus + ArrowDown, or click. Esc
 * closes and returns focus to the trigger; ArrowLeft/Right move between
 * top-level items; ArrowUp/Down move within a panel; focus leaving the
 * header closes it. Panels are always in the HTML (inert when closed), so
 * their links are crawlable.
 *
 * Below lg: a full-height drawer with a focus trap, Esc to close, body scroll
 * lock, and accordions for items with panels. All targets are >= 44px.
 */

const OPEN_DELAY = 120;

/* The visual tile on the right of each mega panel (original plates art). */
const PANEL_ART: Record<string, PlatesVariant> = {
  Solutions: "agents",
  Products: "models",
  Resources: "documents",
  Company: "network",
};
const CLOSE_DELAY = 180;

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const uid = useId();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState<string | null>(null);
  const [drawer, setDrawer] = useState(false);
  const [overDark, setOverDark] = useState(false);

  const sentinel = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const triggers = useRef<Map<string, HTMLButtonElement>>(new Map());
  const panels = useRef<Map<string, HTMLDivElement>>(new Map());
  const timer = useRef<number | undefined>(undefined);
  const source = useRef<"hover" | "click" | "key" | null>(null);

  const panelId = (label: string) => `${uid}-panel-${label.toLowerCase()}`;

  /* scrolled state */
  useEffect(() => {
    const el = sentinel.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) =>
      setScrolled(!e.isIntersecting),
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* over a black chapter? a 4%-tall band at the top of the viewport */
  useEffect(() => {
    const els = Array.from(
      document.querySelectorAll<HTMLElement>("[data-header-dark]"),
    );
    if (!els.length) {
      setOverDark(false);
      return;
    }
    const inBand = new Set<Element>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) inBand.add(e.target);
          else inBand.delete(e.target);
        }
        setOverDark(inBand.size > 0);
      },
      { rootMargin: "0px 0px -96% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  /* close everything on navigation */
  useEffect(() => {
    setOpen(null);
    setDrawer(false);
  }, [pathname]);

  const clear = () => window.clearTimeout(timer.current);
  const schedule = useCallback(
    (next: string | null, delay: number, from: "hover") => {
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => {
        source.current = next ? from : null;
        setOpen(next);
      }, delay);
    },
    [],
  );

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const close = useCallback((returnFocus = false) => {
    setOpen((cur) => {
      if (returnFocus && cur) triggers.current.get(cur)?.focus();
      return null;
    });
    source.current = null;
  }, []);

  /* Esc closes the open panel from anywhere */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  const focusFirstLink = (label: string) => {
    requestAnimationFrame(() => {
      panels.current.get(label)?.querySelector<HTMLAnchorElement>("a")?.focus();
    });
  };

  const topLevel = () =>
    Array.from(
      headerRef.current?.querySelectorAll<HTMLElement>("[data-top]") ?? [],
    );

  const onTopKey = (e: React.KeyboardEvent<HTMLElement>, item: NavItem) => {
    const items = topLevel();
    const i = items.indexOf(e.currentTarget);
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault();
      const next =
        items[
          (i + (e.key === "ArrowRight" ? 1 : -1) + items.length) % items.length
        ];
      next?.focus();
      if (open)
        setOpen(next?.dataset.panel ? (next.dataset.label ?? null) : null);
    } else if (
      e.key === "Tab" &&
      !e.shiftKey &&
      item.panel &&
      open === item.label
    ) {
      e.preventDefault();
      focusFirstLink(item.label);
    } else if (e.key === "ArrowDown" && item.panel) {
      e.preventDefault();
      source.current = "key";
      clear();
      setOpen(item.label);
      focusFirstLink(item.label);
    }
  };

  const onPanelKey = (
    e: React.KeyboardEvent<HTMLDivElement>,
    label: string,
  ) => {
    const links = Array.from(
      e.currentTarget.querySelectorAll<HTMLAnchorElement>("a"),
    );
    const i = links.indexOf(document.activeElement as HTMLAnchorElement);
    if (e.key === "Tab") {
      const trigger = triggers.current.get(label);
      if (e.shiftKey && i === 0) {
        e.preventDefault();
        trigger?.focus();
      } else if (!e.shiftKey && i === links.length - 1) {
        e.preventDefault();
        const items = topLevel();
        const next = items[items.indexOf(trigger as HTMLElement) + 1];
        close();
        const fallback = Array.from(
          document.querySelectorAll<HTMLElement>(
            'header a[href="/contact"].group',
          ),
        ).find((el) => el.offsetParent !== null);
        (next ?? fallback)?.focus();
      }
      return;
    }
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
    e.preventDefault();
    if (e.key === "ArrowUp" && i <= 0) {
      triggers.current.get(label)?.focus();
      return;
    }
    links[
      Math.min(
        links.length - 1,
        Math.max(0, i + (e.key === "ArrowDown" ? 1 : -1)),
      )
    ]?.focus();
  };

  /* focus leaving the header closes the panel */
  const onBlurCapture = (e: React.FocusEvent<HTMLElement>) => {
    const next = e.relatedTarget as Node | null;
    if (open && next && !headerRef.current?.contains(next)) close();
  };

  const onTriggerClick = (label: string) => {
    clear();
    if (open === label && source.current === "hover") {
      // Hover already opened it; a click confirms rather than toggling shut.
      source.current = "click";
      return;
    }
    source.current = "click";
    setOpen((cur) => (cur === label ? null : label));
  };

  const dark = overDark && !open && !drawer;

  return (
    <>
      <div
        ref={sentinel}
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 h-px w-px"
      />
      <header
        ref={headerRef}
        data-tone={dark ? "dark" : undefined}
        onPointerLeave={(e) =>
          e.pointerType === "mouse" &&
          open &&
          source.current === "hover" &&
          schedule(null, CLOSE_DELAY, "hover")
        }
        onBlurCapture={onBlurCapture}
        className={`sticky top-0 z-50 h-(--header-h) border-b transition-[background-color,border-color,color] duration-300 ${
          dark
            ? "border-white/10 bg-black/80 text-white backdrop-blur-md"
            : `bg-paper text-ink ${scrolled && !open ? "border-line" : "border-transparent"}`
        }`}
      >
        <Wrap className="flex h-full items-center justify-between gap-6">
          <div className="flex h-full items-center">
            <div className="lg:w-34">
              <BrandLockup id="hdr-mark" tone={dark ? "dark" : "light"} />
            </div>

            {/* ---------------- desktop ---------------- */}
            <nav aria-label="Main" className="ml-6 hidden h-full lg:block">
              <ul className="flex h-full items-center gap-5 xl:gap-7">
                {NAV.map((item) => {
                  const active = isActive(pathname, item.href);
                  const expanded = open === item.label;
                  const quietened = open && !expanded;
                  const base = `relative inline-flex min-h-11 items-center text-nav transition-colors duration-200 ${
                    dark
                      ? "text-white/85 hover:text-white"
                      : quietened
                        ? "text-muted hover:text-ink"
                        : active || expanded
                          ? "text-ink"
                          : "text-ink hover:text-muted"
                  }`;

                  return (
                    <li
                      key={item.label}
                      className="flex h-full items-center"
                      onPointerEnter={(e) => {
                        if (e.pointerType !== "mouse") return;
                        if (item.panel)
                          schedule(item.label, open ? 0 : OPEN_DELAY, "hover");
                        else if (open) schedule(null, CLOSE_DELAY, "hover");
                        else clear();
                      }}
                    >
                      {item.panel ? (
                        <button
                          ref={(el) => {
                            if (el) triggers.current.set(item.label, el);
                          }}
                          type="button"
                          data-top=""
                          data-panel=""
                          data-label={item.label}
                          aria-expanded={expanded}
                          aria-controls={panelId(item.label)}
                          onClick={() => onTriggerClick(item.label)}
                          onKeyDown={(e) => onTopKey(e, item)}
                          className={base}
                        >
                          {item.label}
                        </button>
                      ) : (
                        <Link
                          href={item.href}
                          data-top=""
                          aria-current={active ? "page" : undefined}
                          onKeyDown={(e) => onTopKey(e, item)}
                          className={base}
                        >
                          {item.label}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden xl:block">
              <Button
                href="/contact"
                variant="quiet"
                size="sm"
                arrow={false}
                className={
                  dark
                    ? "!border-white/25 !text-white/80 hover:!border-white/60 hover:!text-white"
                    : ""
                }
              >
                Contact
              </Button>
            </span>
            <span className="hidden md:block">
              <Button
                href={BOOKING_URL}
                external
                variant="black"
                size="sm"
                arrow={false}
                className={`!text-[0.9375rem] ${dark ? "!bg-white !text-black hover:!bg-snow" : ""}`}
              >
                Talk To Our Team
              </Button>
            </span>
            <MenuButton
              open={drawer}
              onToggle={() => setDrawer((d) => !d)}
              controls={`${uid}-drawer`}
            />
          </div>
        </Wrap>

        {/* ---------------- mega panels ---------------- */}
        {NAV.filter((i) => i.panel).map((item) => {
          const p = item.panel!;
          const expanded = open === item.label;
          const twoCol = p.links.length > 4;
          return (
            <div
              key={item.label}
              id={panelId(item.label)}
              ref={(el) => {
                if (el) panels.current.set(item.label, el);
              }}
              role="region"
              aria-label={`${item.label} menu`}
              inert={!expanded}
              onPointerEnter={clear}
              onKeyDown={(e) => onPanelKey(e, item.label)}
              className={`absolute inset-x-0 top-full hidden border-b border-line/70 bg-paper/95 text-ink shadow-[0_32px_48px_-32px_rgb(16_24_40/0.18)] backdrop-blur-2xl lg:block ${
                expanded
                  ? "visible translate-y-0 opacity-100 transition-[opacity,transform] duration-300 ease-out"
                  : "invisible -translate-y-1 opacity-0 transition-[opacity,transform,visibility] duration-150 ease-in"
              }`}
            >
              <Wrap className="grid grid-cols-[minmax(0,1fr)_minmax(0,24rem)] gap-12 pb-12 pt-8 lg:pl-[calc(var(--gutter)+10rem)] xl:grid-cols-[minmax(0,1fr)_minmax(0,30rem)]">
                <div>
                  <p className="text-[0.8125rem] text-muted">{p.heading}</p>
                  <ul
                    className={`mt-4 grid content-start gap-x-14 ${twoCol ? "grid-cols-2" : "grid-cols-1"}`}
                  >
                    {p.links.map((l) => (
                      <li key={`${l.href}-${l.label}`}>
                        <Link
                          href={l.href}
                          className="flex min-h-10 items-center py-1.5 text-[0.9375rem] leading-snug text-ink transition-colors duration-200 hover:text-blue-ink"
                        >
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  {!p.links.some((l) => l.href === item.href) && (
                    <Link
                      href={item.href}
                      className="group mt-6 inline-flex min-h-10 items-center gap-2 text-[0.875rem] text-muted transition-colors duration-200 hover:text-ink"
                    >
                      {item.label === "Company"
                        ? "About Tasklyn"
                        : `All ${item.label}`}
                      <ArrowIcon className="h-3.5 w-3.5" />
                    </Link>
                  )}
                </div>
                <div>
                  <div className="relative flex aspect-[16/8] items-center justify-center overflow-hidden rounded-tile bg-[radial-gradient(120%_90%_at_70%_100%,var(--color-navy)_0%,var(--color-night)_70%)]">
                    <Plates
                      variant={PANEL_ART[item.label] ?? "network"}
                      drift={false}
                      className="w-[46%]"
                    />
                  </div>
                  <p className="mt-3 text-[0.8125rem] text-muted">{p.blurb}</p>
                </div>
              </Wrap>
            </div>
          );
        })}

        {/* scrim under an open panel: the page stays visible, softly blurred */}
        <div
          aria-hidden="true"
          onClick={() => close()}
          onPointerEnter={(e) =>
            e.pointerType === "mouse" && schedule(null, CLOSE_DELAY, "hover")
          }
          className={`fixed inset-x-0 bottom-0 top-(--header-h) -z-10 hidden bg-paper/10 backdrop-blur-[3px] transition-opacity duration-300 lg:block ${
            open ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        />

        <Drawer
          id={`${uid}-drawer`}
          open={drawer}
          onClose={() => setDrawer(false)}
          pathname={pathname}
        />
      </header>
    </>
  );
}

/* ------------------------------------------------------------------ */

function MenuButton({
  open,
  onToggle,
  controls,
}: {
  open: boolean;
  onToggle: () => void;
  controls: string;
}) {
  return (
    <button
      type="button"
      id={`${controls}-btn`}
      aria-expanded={open}
      aria-controls={controls}
      onClick={onToggle}
      className="relative -mr-2 inline-flex h-11 w-11 items-center justify-center rounded-control text-current lg:hidden"
    >
      <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
      <span aria-hidden="true" className="relative block h-3 w-5">
        <span
          className={`absolute left-0 h-[1.5px] w-5 bg-current transition-transform duration-300 ease-out ${
            open ? "top-[5px] rotate-45" : "top-0"
          }`}
        />
        <span
          className={`absolute left-0 h-[1.5px] w-5 bg-current transition-transform duration-300 ease-out ${
            open ? "top-[5px] -rotate-45" : "top-[10px]"
          }`}
        />
      </span>
    </button>
  );
}

function Drawer({
  id,
  open,
  onClose,
  pathname,
}: {
  id: string;
  open: boolean;
  onClose: () => void;
  pathname: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [section, setSection] = useState<string | null>(null);

  /* scroll lock, focus trap, Esc */
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = "hidden";
    const btn = document.getElementById(`${id}-btn`);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        btn?.focus();
        return;
      }
      if (e.key !== "Tab" || !ref.current) return;
      const focusables = [
        btn,
        ...Array.from(
          ref.current.querySelectorAll<HTMLElement>(
            "a[href], button:not([disabled])",
          ),
        ),
      ].filter((el): el is HTMLElement => !!el && el.offsetParent !== null);
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    requestAnimationFrame(() =>
      ref.current?.querySelector<HTMLElement>("a, button")?.focus(),
    );

    return () => {
      root.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose, id]);

  return (
    <div
      ref={ref}
      id={id}
      inert={!open}
      className={`fixed inset-x-0 bottom-0 top-(--header-h) overflow-y-auto overscroll-contain bg-paper text-ink lg:hidden ${
        open
          ? "visible opacity-100 transition-opacity duration-300 ease-out"
          : "invisible opacity-0 transition-[opacity,visibility] duration-200 ease-in"
      }`}
    >
      <nav aria-label="Main" className="px-(--gutter) pb-10 pt-2">
        <ul className="border-b border-line">
          {NAV.map((item) => {
            const active = isActive(pathname, item.href);
            if (!item.panel) {
              return (
                <li key={item.label} className="border-t border-line">
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className="flex min-h-14 items-center justify-between text-h4 font-medium text-ink"
                  >
                    {item.label}
                    <ArrowIcon className="text-muted" />
                  </Link>
                </li>
              );
            }
            const expanded = section === item.label;
            const subId = `${id}-${item.label.toLowerCase()}`;
            return (
              <li key={item.label} className="border-t border-line">
                <button
                  type="button"
                  aria-expanded={expanded}
                  aria-controls={subId}
                  onClick={() => setSection(expanded ? null : item.label)}
                  className="flex min-h-14 w-full items-center justify-between text-left text-h4 font-medium text-ink"
                >
                  {item.label}
                  <span aria-hidden="true" className="relative h-4 w-4">
                    <span className="absolute left-0 top-1/2 h-px w-4 bg-current" />
                    <span
                      className={`absolute left-1/2 top-0 h-4 w-px bg-current transition-transform duration-200 ${
                        expanded ? "scale-y-0" : ""
                      }`}
                    />
                  </span>
                </button>
                <div id={subId} hidden={!expanded} className="pb-5">
                  <p className="mb-2 text-small text-muted">
                    {item.panel.blurb}
                  </p>
                  <ul>
                    <li>
                      <Link
                        href={item.href}
                        className="flex min-h-11 items-center text-[0.9375rem] font-medium text-blue-ink"
                      >
                        {item.label === "Company"
                          ? "About Tasklyn"
                          : `All ${item.label}`}
                      </Link>
                    </li>
                    {item.panel.links.map((l) => (
                      <li key={`${l.href}-${l.label}`}>
                        <Link
                          href={l.href}
                          className="flex min-h-11 flex-col justify-center py-2 text-[0.9375rem] text-ink"
                        >
                          {l.label}
                          {l.note && (
                            <span className="mt-0.5 text-[0.8125rem] text-muted">
                              {l.note}
                            </span>
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            );
          })}
        </ul>
        <div className="mt-8 grid gap-3">
          <Button href={BOOKING_URL} external variant="black" size="lg" className="w-full">
            Talk To Our Team
          </Button>
        </div>
      </nav>
    </div>
  );
}
