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

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 20);
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function handleLogoClick(e: React.MouseEvent<HTMLAnchorElement>) {
    if (window.location.pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      setOpen(false);
    }
  }

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[var(--nav-bg)] border-b border-[var(--border)] md:bg-transparent md:border-transparent"
          : "bg-[var(--nav-bg)] border-b border-[var(--border)]"
      }`}
    >
      <div className="mx-auto px-3 sm:px-10 lg:px-5 pt-2">
        <nav className="relative flex h-16 items-center justify-between">
          {/* MOBILE HEADER - KEEP SAME */}
          <div className="flex items-center gap-2 md:hidden">
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
          </div>

          {/* MOBILE LOGO - KEEP SAME */}
          <Link
            href="/"
            onClick={handleLogoClick}
            aria-label="Spring Rain — Home"
            className="absolute left-1/2 -translate-x-1/2 flex items-center md:hidden"
          >
            <Image
              src={withBasePath('/newlogo.png')}
              alt="Spring Rain Lawn Sprinkler Inc."
              width={180}
              height={54}
              className="h-23 w-auto"
              priority
            />
          </Link>

          {/* DESKTOP HEADER - NEW STYLE */}
          <div className="hidden md:flex w-full items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                onClick={handleLogoClick}
                aria-label="Spring Rain — Home"
                className="flex items-center shrink-0"
              >
                <Image
                  src={withBasePath('/newlogo.png')}
                  alt="Spring Rain Lawn Sprinkler Inc."
                  width={180}
                  height={54}
                  className="h-23 w-auto"
                  priority
                />
              </Link>
            </div>

            <div className="flex items-center justify-center flex-1">
              <div      
                className="hidden md:flex items-center rounded-full border px-2 h-12 bg-white/95 shadow-[0_12px_35px_rgba(0,0,0,0.12)]"
                style={{
                  borderColor: 'var(--border)',
                  backgroundColor: 'var(--nav-bg)',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                }}
              >
                <ul className="flex items-center gap-1">
                  {nav.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="inline-flex items-center rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 text-[var(--nav-fg)] hover:bg-black/5"                
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>

                <div
                  className="mx-3 h-6 w-px"
                  style={{ backgroundColor: 'var(--border)' }}
                />

                <a
                  href={`tel:${PHONE_TEL}`}
                  className="inline-flex items-center rounded-full px-4 py-2 text-sm font-medium bg-blue-700 text-white hover:opacity-90 transition"
                >
                  {PHONE_DISPLAY}
                </a>
              </div>
            </div>

            {/* right-side spacer so center pill stays visually centered */}
            <div className="w-[180px]" />
          </div>
        </nav>
      </div>

      {/* MOBILE MENU - KEEP SAME */}
      {open && (
        <div className="md:hidden border-t bg-[var(--nav-bg)] border-[var(--border)]">
          <div className="mx-auto max-w-screen-xl px-4 py-3">
            <ul className="flex flex-col">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block py-3 text-[16px] text-[var(--nav-fg) ]"
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
