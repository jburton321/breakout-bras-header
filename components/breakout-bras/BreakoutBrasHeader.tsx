"use client";

import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState, type ReactNode } from "react";
import { StaticSiteLogoImg } from "./Logo";

const MOBILE_MENU_TOGGLE_CLASS =
  "rounded-md p-2 text-neutral-900 hover:bg-neutral-100";

type NavLink = { label: string; href: string };

type NavDropdownDef = {
  type: "dropdown";
  id: string;
  label: string;
  items: NavLink[];
};

type NavLinkDef = { type: "link"; label: string; href: string };

type NavDef = NavDropdownDef | NavLinkDef;

/** Intimates + shape; swim / occasion / add-ons — keeps the bar to four top-level items. */
const NAV_ITEMS: NavDef[] = [
  {
    type: "dropdown",
    id: "intimates",
    label: "Intimates",
    items: [
      { label: "Bras", href: "/bras" },
      { label: "Panties", href: "/panties" },
      { label: "Lounge and Lingerie", href: "/lounge-lingerie" },
      { label: "Shapewear", href: "/shapewear" },
    ],
  },
  {
    type: "dropdown",
    id: "swim-specialty",
    label: "Swim & specialty",
    items: [
      { label: "Swimwear", href: "/swimwear" },
      { label: "Post-Op", href: "/post-op" },
      { label: "Maternity/Nursing", href: "/maternity-nursing" },
      { label: "Bridal", href: "/bridal" },
      { label: "Accessories", href: "/accessories" },
    ],
  },
  { type: "link", label: "Sale", href: "/sale" },
  { type: "link", label: "Shop by Brand", href: "/brands" },
];

/**
 * Desktop-style top bar: logo left, CTA + text nav + icons right (Thirdlove-like).
 * Site logo matches footer: static `logo-grey.svg` via `StaticSiteLogoImg`.
 */
export function BreakoutBrasHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const desktopNavRef = useRef<HTMLElement | null>(null);

  const closeDropdown = useCallback(() => setOpenDropdownId(null), []);

  useEffect(() => {
    if (!openDropdownId) return;
    const onPointerDown = (e: PointerEvent) => {
      const t = e.target as Node;
      if (desktopNavRef.current && !desktopNavRef.current.contains(t)) {
        setOpenDropdownId(null);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenDropdownId(null);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [openDropdownId]);

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200/80 bg-white">
      <div className="mx-auto flex max-w-wrapper items-center justify-between gap-4 px-page py-3.5 sm:py-4">
        <Link href="/" className="inline-block max-w-full min-w-0 shrink-0">
          <StaticSiteLogoImg />
        </Link>

        {/* lg+: ecom links, then CTA, then icons */}
        <div className="hidden min-w-0 flex-1 items-center justify-end gap-3 lg:flex lg:gap-4 xl:gap-6">
          <nav
            ref={desktopNavRef}
            className="flex min-w-0 flex-nowrap items-center justify-end gap-x-2 gap-y-1 text-sm font-normal text-neutral-900 xl:gap-x-4"
            aria-label="Primary"
          >
            {NAV_ITEMS.map((item) =>
              item.type === "link" ? (
                <Link
                  key={item.href}
                  href={item.href}
                  className="whitespace-nowrap px-0.5 py-1 transition hover:text-neutral-600"
                  onClick={closeDropdown}
                >
                  {item.label}
                </Link>
              ) : (
                <DesktopNavDropdown
                  key={item.id}
                  def={item}
                  open={openDropdownId === item.id}
                  onClose={closeDropdown}
                  onToggle={() => setOpenDropdownId((cur) => (cur === item.id ? null : item.id))}
                />
              )
            )}
          </nav>

          <Link
            href="#find-my-fit-quiz"
            className="shrink-0 rounded-full bg-[#E55932] px-4 py-2 text-sm font-medium text-white transition hover:brightness-[1.03]"
            onClick={closeDropdown}
          >
            Find My Fit
          </Link>

          <div className="flex shrink-0 items-center gap-1 border-l border-neutral-200 pl-3 lg:pl-4">
            <IconButton label="Search" href="/search">
              <SearchIcon className="h-5 w-5" />
            </IconButton>
            <IconButton label="Account" href="/account">
              <UserIcon className="h-5 w-5" />
            </IconButton>
            <IconButton label="Cart" href="/cart">
              <CartIcon className="h-5 w-5" />
            </IconButton>
          </div>
        </div>

        {/* Below lg: compact CTA + menu */}
        <div className="flex items-center gap-2 lg:hidden">
          <Link
            href="#find-my-fit-quiz"
            className="rounded-full bg-[#E55932] px-3.5 py-2 text-xs font-semibold text-white transition hover:brightness-[1.03] sm:text-sm"
          >
            Find My Fit
          </Link>
          {mobileOpen ? (
            <button
              type="button"
              className={MOBILE_MENU_TOGGLE_CLASS}
              aria-expanded="true"
              aria-controls="mobile-nav-menu"
              onClick={() => setMobileOpen((o) => !o)}
            >
              <span className="sr-only">Close menu</span>
              <CloseIcon className="h-6 w-6" />
            </button>
          ) : (
            <button
              type="button"
              className={MOBILE_MENU_TOGGLE_CLASS}
              aria-expanded="false"
              aria-controls="mobile-nav-menu"
              onClick={() => setMobileOpen((o) => !o)}
            >
              <span className="sr-only">Open menu</span>
              <MenuIcon className="h-6 w-6" />
            </button>
          )}
        </div>
      </div>

      {/* Mobile slide-down */}
      {mobileOpen && (
        <div
          id="mobile-nav-menu"
          className="border-t border-neutral-100 bg-white px-page py-4 lg:hidden"
        >
          <nav className="flex flex-col gap-1 text-sm font-medium text-neutral-900" aria-label="Primary mobile">
            {NAV_ITEMS.map((item) =>
              item.type === "link" ? (
                <Link
                  key={item.href}
                  href={item.href}
                  className="py-2.5"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              ) : (
                <MobileNavDropdown
                  key={item.id}
                  label={item.label}
                  items={item.items}
                  onNavigate={() => setMobileOpen(false)}
                />
              )
            )}
          </nav>
          <div className="mt-4 flex items-center justify-start gap-4 border-t border-neutral-100 pt-4">
            <IconButton label="Search" href="/search" className="p-2">
              <SearchIcon className="h-6 w-6" />
            </IconButton>
            <IconButton label="Account" href="/account" className="p-2">
              <UserIcon className="h-6 w-6" />
            </IconButton>
            <IconButton label="Cart" href="/cart" className="p-2">
              <CartIcon className="h-6 w-6" />
            </IconButton>
          </div>
        </div>
      )}
    </header>
  );
}

function DesktopNavDropdown({
  def,
  open,
  onClose,
  onToggle,
}: {
  def: NavDropdownDef;
  open: boolean;
  onClose: () => void;
  onToggle: () => void;
}) {
  const triggerId = useId();
  const menuId = useId();

  return (
    <div className="relative">
      <button
        type="button"
        id={triggerId}
        className="flex items-center gap-0.5 whitespace-nowrap px-0.5 py-1 transition hover:text-neutral-600"
        aria-expanded={open ? "true" : "false"}
        aria-haspopup="true"
        aria-controls={menuId}
        onClick={onToggle}
      >
        {def.label}
        <ChevronDownIcon
          className={`h-4 w-4 shrink-0 opacity-70 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open ? (
        <ul
          id={menuId}
          role="list"
          aria-labelledby={triggerId}
          className="absolute left-0 top-full z-[60] mt-1 min-w-[14rem] rounded-lg border border-neutral-200 bg-white py-1 shadow-lg ring-1 ring-black/5"
        >
          {def.items.map((sub) => (
            <li key={sub.href}>
              <Link
                href={sub.href}
                className="block px-4 py-2 text-sm font-normal text-neutral-800 transition hover:bg-neutral-50 hover:text-neutral-900"
                onClick={onClose}
              >
                {sub.label}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

function MobileNavDropdown({
  label,
  items,
  onNavigate,
}: {
  label: string;
  items: NavLink[];
  onNavigate: () => void;
}) {
  return (
    <details className="group border-b border-neutral-100 last:border-b-0">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-2 py-2.5 [&::-webkit-details-marker]:hidden">
        <span>{label}</span>
        <ChevronDownIcon className="h-4 w-4 shrink-0 opacity-60 transition-transform group-open:rotate-180" />
      </summary>
      <ul className="mb-2 ml-1 flex flex-col gap-0.5 border-l-2 border-neutral-100 pl-3">
        {items.map((sub) => (
          <li key={sub.href}>
            <Link
              href={sub.href}
              className="block py-2 text-sm font-normal text-neutral-700"
              onClick={onNavigate}
            >
              {sub.label}
            </Link>
          </li>
        ))}
      </ul>
    </details>
  );
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

function IconButton({
  label,
  href,
  children,
  className = "p-1.5",
}: {
  label: string;
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex text-neutral-900 transition hover:text-neutral-600 ${className}`}
      aria-label={label}
    >
      {children}
    </Link>
  );
}

function MenuIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );
}

function UserIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  );
}

function CartIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
      />
    </svg>
  );
}
