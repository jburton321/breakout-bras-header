"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { StaticSiteLogoImg } from "./Logo";

/** Hero slide 3 — full-bleed background for the mobile nav drawer only. */
const MOBILE_MENU_BG = "/images/Slide3.png";

const MOBILE_MENU_TOGGLE_CLASS =
  "rounded-md p-2 text-neutral-900 transition hover:bg-black/[0.06] active:bg-black/[0.08]";

/** iOS-style material: blur + translucency + light edge (content shows through when scrolling). */
const HEADER_GLASS =
  "border-b border-black/[0.06] bg-white/[0.62] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.72)] backdrop-blur-2xl backdrop-saturate-150";

const NAV_LINKS: Array<{ label: string; href: string }> = [
  { label: "Bras", href: "/bras" },
  { label: "Panties", href: "/panties" },
  { label: "Swimwear", href: "/swimwear" },
  { label: "Lounge and Lingerie", href: "/lounge-lingerie" },
  { label: "Post-Op", href: "/post-op" },
  { label: "Shapewear", href: "/shapewear" },
  { label: "Maternity/Nursing", href: "/maternity-nursing" },
  { label: "Bridal", href: "/bridal" },
  { label: "Accessories", href: "/accessories" },
  { label: "Sale", href: "/sale" },
  { label: "Shop by Brand", href: "/brands" },
];

/**
 * Sticky bar with iOS-like frosted glass (translucent + backdrop blur).
 * Logo left, ecom links, CTA, icons right. Static logo from `StaticSiteLogoImg`.
 */
export function BreakoutBrasHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <header className={`sticky top-0 z-50 ${HEADER_GLASS}`}>
      <div className="mx-auto flex max-w-wrapper items-center justify-between gap-4 px-page py-3.5 sm:py-4">
        <Link href="/" className="inline-block max-w-full min-w-0 shrink-0">
          <StaticSiteLogoImg />
        </Link>

        {/* lg+: ecom links, then CTA, then icons */}
        <div className="hidden min-w-0 flex-1 items-center justify-end gap-3 lg:flex lg:gap-4 xl:gap-6">
          <nav
            className="flex min-w-0 flex-wrap items-center justify-end gap-x-2 gap-y-1 text-sm font-normal text-neutral-900 xl:gap-x-3"
            aria-label="Primary"
          >
            {NAV_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="whitespace-nowrap px-0.5 py-1 transition hover:text-neutral-600"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <Link
            href="#find-my-fit-quiz"
            className="shrink-0 rounded-full bg-[#E55932] px-4 py-2 text-sm font-medium text-white transition hover:brightness-[1.03]"
          >
            Find My Fit
          </Link>

          <div className="flex shrink-0 items-center gap-1 border-l border-black/[0.08] pl-3 lg:pl-4">
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

        {/* Below lg: compact CTA + menu — z-10 so controls stay above glass stacking */}
        <div className="relative z-10 flex items-center gap-2 lg:hidden">
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

      {/* Portal: backdrop-filter on <header> traps fixed descendants — menu must mount on body for viewport-fixed layout */}
      {mounted &&
        mobileOpen &&
        createPortal(
          <div
            id="mobile-nav-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="fixed inset-x-0 bottom-0 top-[4.25rem] z-[60] flex min-h-0 flex-col overflow-hidden border-t border-black/10 sm:top-[5rem] lg:hidden"
          >
            <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
              <div className="absolute right-0 top-0 h-full w-[192%] translate-x-[39%]">
                <div className="relative h-full w-full">
                  <Image
                    src={MOBILE_MENU_BG}
                    alt=""
                    fill
                    sizes="100vw"
                    className="object-cover object-right"
                    priority={false}
                    draggable={false}
                  />
                </div>
              </div>
            </div>
            <div className="relative z-10 flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain px-page py-4 pb-[max(1rem,env(safe-area-inset-bottom,0px))] sm:py-5">
              <div className="flex min-h-full flex-col">
                <nav className="flex flex-col gap-1 text-sm font-medium text-neutral-900" aria-label="Primary mobile">
                  {NAV_LINKS.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="py-2.5 transition hover:text-neutral-600"
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
                <div className="mt-auto flex shrink-0 items-center justify-start gap-4 border-t border-black/10 pt-4">
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
            </div>
          </div>,
          document.body
        )}
    </header>
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
      className={`inline-flex text-neutral-900 transition hover:text-neutral-600 ${className ?? ""}`}
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
