'use client';

import { useEffect, useState } from 'react';
import { withBasePath } from '../lib/basePath';
import Link from 'next/link';
import Image from 'next/image';

const nav = [
  { label: 'Services', href: '/services' },
  { label: 'Service Areas', href: '/service-areas' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Contact', href: '/contact' },
];

const PHONE_DISPLAY = '847-322-5748';
const PHONE_TEL = '8473225748';

// Put this in the same file (or /components/icons/MoonIcon.tsx)
export function MoonIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        d="M8.23129 2.24048C9.24338 1.78695 10.1202 2.81145 9.80357 3.70098C8.72924 6.71928 9.38932 10.1474 11.6193 12.3765C13.8606 14.617 17.3114 15.2755 20.3395 14.1819C21.2206 13.8637 22.2173 14.7319 21.7817 15.7199C21.7688 15.7491 21.7558 15.7782 21.7427 15.8074C20.9674 17.5266 19.7272 19.1434 18.1227 20.2274C16.4125 21.3828 14.3957 22.0001 12.3316 22.0001H12.3306C9.93035 21.9975 7.6057 21.1603 5.75517 19.6321C3.90463 18.1039 2.64345 15.9797 2.18793 13.6237C1.73241 11.2677 2.11094 8.82672 3.2586 6.71917C4.34658 4.72121 6.17608 3.16858 8.20153 2.25386L8.23129 2.24048Z"
      />
    </svg>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur border-b bg-[var(--nav-bg)] border-[var(--border)]">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        {/* NAV BAR */}
        <nav className="relative flex h-16 items-center justify-between">
          {/* LEFT CLUSTER (mobile): hamburger + theme */}
          <div className="flex items-center gap-2 md:hidden">
            {/* Hamburger */}
            <button
              type="button"
              onClick={() => setOpen((s) => !s)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border bg-[var(--nav-bg)] border-[var(--border)] text-[var(--nav-fg)]/80 hover:text-[var(--nav-fg)]"
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                {open ? (
                  <path
                    fill="currentColor"
                    d="M18.3 5.7L12 12l6.3 6.3-1.4 1.4L10.6 13.4 4.3 19.7 2.9 18.3 9.2 12 2.9 5.7 4.3 4.3l6.3 6.3 6.3-6.3z"
                  />
                ) : (
                  <path
                    fill="currentColor"
                    d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z"
                  />
                )}
              </svg>
            </button>

            {/* Theme toggle BUTTON */}
            {/* <button
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border bg-[var(--nav-bg)] border-[var(--border)] text-neutral-700 text-[var(--nav-fg)]/80 hover:text-[var(--nav-fg)]"
              title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              <MoonIcon className="h-5 w-5 text-[var(--nav-fg)]" />
            </button> */}
          </div>

          {/* CENTER LOGO (mobile absolute center; desktop normal) */}
          <Link
            href="/"
            aria-label="Spring Rain — Home"
            className="
                absolute left-1/2 -translate-x-1/2
                md:static md:translate-x-0
                md:mr-6
                flex items-center
            "
          >
            <Image
              src={withBasePath("/logo.png")}
              alt="Spring Rain Lawn Sprinkler Inc."
              width={180}
              height={54}
              className="h-10 md:h-11 w-auto"
              priority
            />
          </Link>

          {/* RIGHT (mobile): call icon */}
          {/* <div className="md:hidden">
            <a
              href={`tel:${PHONE_TEL}`}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border bg-[var(--nav-bg)] border-[var(--border)] text-[var(--nav-fg)]/80 hover:text-[var(--nav-fg)]"
              aria-label={`Call ${PHONE_DISPLAY}`}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
                <path
                  fill="currentColor"
                  d="M6.6 10.8c1.5 2.9 3.7 5.1 6.6 6.6l2.2-2.2a1 1 0 011.1-.23c1.2.48 2.6.74 4 .74a1 1 0 011 1v3.2a1 1 0 01-1 1C11.6 21.9 2.1 12.4 2.1 1.5a1 1 0 011-1H6.3a1 1 0 011 1c0 1.4.26 2.8.74 4a1 1 0 01-.23 1.1L5.6 8.6l1 2.2z"
                />
              </svg>
            </a>
          </div> */}

          {/* DESKTOP CONTENT (replaces mobile clusters) */}
          <div className="hidden md:flex w-full items-center justify-between">

            {/* Center: nav links */}
            <ul className="hidden md:flex items-center gap-8 text-[15px] text-neutral-800 font-display font-semibold">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="hover:text-neutral-950 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Right: theme + call button */}
            <div className="hidden md:flex items-center gap-2">
              {/* <button
                onClick={toggleTheme}
                aria-label="Toggle dark mode"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border bg-[var(--nav-bg)] border-[var(--border)] text-neutral-700"
                title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {theme === 'dark' ? (
                  <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                    <path
                      fill="currentColor"
                      d="M12 3a1 1 0 0 1 1 1v1.1a1 1 0 1 1-2 0V4a1 1 0 0 1 1-1Zm0 15.8A6.8 6.8 0 1 0 12 5.2a6.8 6.8 0 0 0 0 13.6Z"
                    />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                    <path
                      fill="currentColor"
                      d="M21 12.8A9 9 0 0 1 11.2 3a.8.8 0 0 0-1.1 1A7.4 7.4 0 0 0 12 20.8c4.2 0 7.6-3.4 7.6-7.6Z"
                    />
                  </svg>
                )}
              </button> */}

              <a
                href={`tel:${PHONE_TEL}`}
                className="inline-flex items-center rounded-full border border-amber-900/20 bg-blue-700 text-white px-4 py-2 text-sm font-medium shadow-sm hover:opacity-90"
              >
                {PHONE_DISPLAY}
              </a>
            </div>
          </div>
        </nav>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden border-t bg-[var(--nav-bg)] border-[var(--border)]">
          <div className="mx-auto max-w-screen-xl px-4 py-3">
            <ul className="flex flex-col ">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block py-3 text-[16px] text-[var(--nav-fg)]"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <a
              href={`tel:${PHONE_TEL}`}
              className="mt-3 inline-flex w-full items-center justify-center rounded-lg bg-blue-900 px-4 py-3 text-white font-medium"
            >
              Call {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
