"use client";

import Link from "next/link";

const TEAL = "#719B9A";
const GRAY = "#4D5152";
const LIGHT = "#E0E0E0";

const quickLinks = [
  { label: "Shop All Bras", href: "/bras" },
  { label: "Nursing Bras", href: "/nursing" },
  { label: "Sports Bras", href: "/sports" },
  { label: "Find My Fit", href: "#find-my-fit-quiz" },
];

const helpLinks = [
  { label: "Size Guide", href: "/pages/size-guide" },
  { label: "Shipping & Returns", href: "/pages/shipping" },
  { label: "Contact Us", href: "/pages/contact" },
  { label: "FAQs", href: "/pages/faqs" },
];

export function Footer() {
  return (
    <footer className="bg-[#f8f8f8]" style={{ color: GRAY }}>
      <div className="mx-auto max-w-content px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">
              Help
            </h3>
            <ul className="space-y-3">
              {helpLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:underline">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">
              Contact
            </h3>
            <p className="text-sm">
              525 Haywood Rd
              <br />
              Greenville, SC 29607
            </p>
            <p className="mt-2 text-sm">
              <a href="tel:+18646270200" className="hover:underline">
                864-627-0200
              </a>
            </p>
            <p className="mt-1 text-sm">
              <a href="mailto:service@breakoutbras.com" className="hover:underline">
                service@breakoutbras.com
              </a>
            </p>
            <p className="mt-3 text-xs">
              Mon–Fri 9am–5pm EST
            </p>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">
              Newsletter
            </h3>
            <p className="mb-4 text-sm">
              Get 10% off your first order.
            </p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 rounded border px-3 py-2 text-sm outline-none"
                style={{ borderColor: LIGHT }}
              />
              <button
                type="submit"
                className="rounded px-4 py-2 text-sm font-medium text-white"
                style={{ backgroundColor: TEAL }}
              >
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center gap-6 border-t pt-8 sm:flex-row sm:justify-between" style={{ borderColor: LIGHT }}>
          <p className="text-xs">
            © {new Date().getFullYear()} Breakout Bras. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs">
            <span>Visa</span>
            <span>Mastercard</span>
            <span>Amex</span>
            <span>PayPal</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
