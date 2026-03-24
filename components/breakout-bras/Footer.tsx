"use client";

import Link from "next/link";

const TEAL = "#719B9A";

const quickLinks = [
  { label: "Shop All", href: "/" },
  { label: "Brands", href: "/brands" },
  { label: "About Us", href: "/about" },
  { label: "Meet the Team", href: "/meet-the-team" },
  { label: "Gift Certificates", href: "/gift-certificates" },
  { label: "Blog", href: "/blog" },
];

const helpLinks = [
  { label: "FAQs", href: "/faqs" },
  { label: "Contact Us", href: "/contact" },
  { label: "Local Retail", href: "/local-retail" },
  { label: "Customer Loyalty Program", href: "/loyalty" },
  { label: "Returns/Exchanges", href: "/returns" },
  { label: "Shipping Policy", href: "/shipping" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Sizing Guide", href: "/sizing-guide" },
  { label: "Virtual Fitting", href: "/virtual-fitting" },
];

function LocationIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  );
}

function EmailIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="bg-white" style={{ color: TEAL }}>
      <div className="mx-auto max-w-wrapper px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="min-w-0">
            <Link href="/" className="inline-block max-w-full">
              <img
                src="/logo/logo-grey.svg"
                alt="Breakout Bras"
                width={776}
                height={167}
                className="block h-10 w-auto max-w-full sm:h-12"
              />
            </Link>
            <div className="mt-6 space-y-3 text-sm">
              <p className="flex items-start gap-3">
                <LocationIcon className="mt-0.5 h-5 w-5 shrink-0" />
                525 Haywood Rd, Greenville, SC 29607
              </p>
              <p className="flex items-center gap-3">
                <PhoneIcon className="h-5 w-5 shrink-0" />
                <a href="tel:+18646270200" className="hover:underline">
                  1-864-627-0200
                </a>
              </p>
              <p className="flex items-center gap-3">
                <EmailIcon className="h-5 w-5 shrink-0" />
                <a href="mailto:service@breakoutbras.com" className="hover:underline">
                  service@breakoutbras.com
                </a>
              </p>
              <div className="flex items-start gap-3">
                <ClockIcon className="mt-0.5 h-5 w-5 shrink-0" />
                <div>
                  <p className="font-medium">Retail Store Hours (EST):</p>
                  <p>Monday–Thursday 12–7, Friday and Sat 10–6.</p>
                  <p className="italic">Last fitting is an hour before closing.</p>
                  <p className="mt-2 font-medium">Customer Service Hours (EST):</p>
                  <p>Monday–Friday 9–5.</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:underline">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider">
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
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider">
              Subscribe to Our Newsletter
            </h3>
            <p className="mb-4 text-sm">
              Be the first to know about special promotions and deals!
            </p>
            <form
              className="mb-6 flex overflow-hidden rounded-lg border"
              style={{ borderColor: TEAL }}
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Email"
                className="min-w-0 flex-1 border-0 px-4 py-2.5 text-sm outline-none"
              />
              <button
                type="submit"
                className="px-4 py-2.5 text-sm font-medium text-white"
                style={{ backgroundColor: TEAL }}
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>

        <div
          className="mt-12 flex flex-col items-center gap-6 border-t pt-8 sm:flex-row sm:justify-between"
          style={{ borderColor: TEAL }}
        >
          <p className="text-xs" style={{ color: TEAL }}>
            © {new Date().getFullYear()} Breakout Bras. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs" style={{ color: TEAL }}>
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
