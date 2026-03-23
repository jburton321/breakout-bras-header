"use client";

import Link from "next/link";

const TEAL = "#719B9A";
const GRAY = "#4D5152";

const navLinks = [
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
  { label: "Shop by Brand", href: "/shop-by-brand" },
];

export function BreakoutBrasHeader({ overlay = false }: { overlay?: boolean }) {
  return (
    <header className={overlay ? "absolute left-0 right-0 top-0 z-50" : ""}>
      {/* Teal announcement bar — full width edge to edge */}
      <div
        className="flex w-full items-center justify-center px-4 py-2 text-sm font-medium text-white sm:px-6 lg:px-8"
        style={{ backgroundColor: TEAL }}
      >
        <span className="opacity-90">Free shipping on all US orders</span>
        <span aria-hidden className="ml-1">›</span>
      </div>

      {/* Main nav bar — full width edge to edge */}
      <div
        className={`flex w-full items-center justify-between px-4 py-4 sm:px-6 lg:px-8 ${overlay ? "bg-transparent" : "bg-white"}`}
      >
        <Link
          href="/"
          className="text-xl font-bold tracking-tight"
          style={{ color: GRAY }}
        >
          Breakout Bras
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Main">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium transition hover:opacity-80"
                style={{ color: GRAY }}
              >
                {link.label}
              </Link>
            ))}
        </nav>

        <div className="flex items-center gap-4">
            <Link
              href="#find-my-fit-quiz"
              className="rounded-full px-5 py-2 text-sm font-semibold text-white"
              style={{ backgroundColor: TEAL }}
            >
              Find My Fit
            </Link>
            <Link
              href="/bras"
              className="hidden text-sm font-medium sm:inline"
              style={{ color: GRAY }}
            >
              Shop by Bra Size
            </Link>
            <div className="flex gap-3">
              <button
                type="button"
                aria-label="Search"
                className="p-1"
                style={{ color: GRAY }}
              >
                <SearchIcon className="h-5 w-5" />
              </button>
              <button
                type="button"
                aria-label="Account"
                className="p-1"
                style={{ color: GRAY }}
              >
                <UserIcon className="h-5 w-5" />
              </button>
              <button
                type="button"
                aria-label="Cart"
                className="p-1"
                style={{ color: GRAY }}
              >
                <CartIcon className="h-5 w-5" />
              </button>
            </div>
        </div>
      </div>
    </header>
  );
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );
}

function UserIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  );
}

function CartIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  );
}
