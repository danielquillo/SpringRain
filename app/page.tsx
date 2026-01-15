import Image from "next/image";
import Link from "next/link";
import HeroRotator from "./components/hero-rotater";

const COMPANY = "Spring Rain Lawn Sprinkler Inc.";
const PHONE_DISPLAY = "847-322-5748";
const PHONE_TEL = "8473225748";

const services = [
  { name: "New Installations", blurb: "Smart controllers, water-efficient zones" },
  { name: "Repairs", blurb: "Leaks, broken heads, wiring, controllers" },
  { name: "Startups", blurb: "Spring turn-on, coverage check" },
  { name: "Mid-Season Check", blurb: "Adjust for full-bloom plants" },
  { name: "Winterization", blurb: "Blow-outs before first freeze" },
];

const cities = ["Highland Park", "Deerfield", "Lake Forest", "Northbrook", "Glenview", "Winnetka"];

export default function Home() {
  return (
    <>
        <HeroRotator />

      {/* JSON-LD for local SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: COMPANY,
            telephone: PHONE_DISPLAY,
            url: "https://example.com",
            areaServed: cities,
            address: { "@type": "PostalAddress", addressRegion: "IL" },
            openingHours: "Mo,Tu,We,Th,Fr 08:00-17:00",
          }),
        }}
      />

      {/* HERO (mobile-first) */}
      <section className="px-4 pt-6 pb-2 max-w-screen-md mx-auto">

        {/* <h1 className="mt-6 text-[34px]/[1.1] md:text-[56px]/[1.05] tracking-tight md:tracking-[-0.01em] font-semibold">
          The grass might actually be greener.
        </h1> */}

        <p className="mt-3 text-[15px] text-neutral-600">
          Design, install, and maintain irrigation that saves water and keeps your lawn thriving.
        </p>

        {/* Quick lead form */}
        <form action="/api/contact" method="post" className="mt-5 grid grid-cols-1 gap-3" id="quote">
          <input name="name" required placeholder="Your name" className="h-12 rounded-lg border border-neutral-300 px-3 text-[16px] outline-none focus:ring-2 focus:ring-neutral-800" />
          <input name="phone" required inputMode="tel" placeholder="Phone" className="h-12 rounded-lg border border-neutral-300 px-3 text-[16px] outline-none focus:ring-2 focus:ring-neutral-800" />
          <input name="zip" inputMode="numeric" placeholder="ZIP (optional)" className="h-12 rounded-lg border border-neutral-300 px-3 text-[16px] outline-none focus:ring-2 focus:ring-neutral-800" />
          <button type="submit" className="h-12 rounded-lg bg-neutral-900 text-white text-[16px] font-medium active:opacity-90">
            Get a fast quote
          </button>
        </form>
      </section>

      {/* SERVICES (swipeable) */}
      <section className="mt-8">
        <h2 className="px-4 max-w-screen-md mx-auto text-[22px] font-semibold">Services</h2>
        <div className="mt-3 overflow-x-auto no-scrollbar">
          <ul className="flex gap-3 px-4 pb-2">
            {services.map((s) => (
              <li key={s.name} className="min-w-[78%] max-w-[78%] sm:min-w-[360px]">
                <div className="rounded-2xl border border-neutral-200 p-4 bg-white">
                  <h3 className="text-[17px] font-medium">{s.name}</h3>
                  <p className="mt-1 text-[14px] text-neutral-600">{s.blurb}</p>
                  <Link
                    href={`/services/${encodeURIComponent(s.name.toLowerCase().replace(/\s+/g, "-"))}`}
                    className="mt-3 inline-block text-[14px] underline underline-offset-4"
                  >
                    Learn more →
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="px-4 py-8 max-w-screen-md mx-auto">
        <div className="rounded-2xl bg-[--color-card,#f7f6f3] p-5 border border-neutral-200">
          <h2 className="text-[22px] font-semibold">Why homeowners choose us</h2>
          <ul className="mt-3 grid grid-cols-2 gap-3 text-[14px]">
            <li className="rounded-lg bg-white border border-neutral-200 p-3">Licensed & insured</li>
            <li className="rounded-lg bg-white border border-neutral-200 p-3">Water-smart designs</li>
            <li className="rounded-lg bg-white border border-neutral-200 p-3">Same-week repairs</li>
            <li className="rounded-lg bg-white border border-neutral-200 p-3">3-year workmanship warranty</li>
          </ul>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="px-4 pb-8 max-w-screen-md mx-auto">
        <div className="rounded-2xl border border-neutral-200 p-5">
          <blockquote className="text-[16px]">
            “They installed a new system and adjusted zones for our gardens — our water bill went down and everything looks healthier.”
          </blockquote>
          <p className="mt-2 text-[14px] text-neutral-600">— Taylor M., Highland Park</p>
        </div>
      </section>

      {/* SERVICE AREAS */}
      <section className="px-4 pb-24 max-w-screen-md mx-auto">
        <h2 className="text-[22px] font-semibold">Service areas</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {cities.map((c) => (
            <Link
              key={c}
              href={`/service-areas/${c.toLowerCase().replace(/\s+/g, "-")}`}
              className="px-3 h-9 inline-flex items-center rounded-full border border-neutral-300 text-[14px]"
            >
              {c}
            </Link>
          ))}
        </div>
      </section>

      {/* STICKY BOTTOM BAR (mobile) */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-neutral-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 md:hidden">
        <div className="mx-auto max-w-screen-md px-3 py-2 grid grid-cols-3 gap-2">
          <a href={`tel:${PHONE_TEL}`} className="h-11 rounded-lg border border-neutral-300 flex items-center justify-center text-[14px] font-medium">Call</a>
          <a href={`sms:${PHONE_TEL}`} className="h-11 rounded-lg border border-neutral-300 flex items-center justify-center text-[14px] font-medium">Text</a>
          <a href="#quote" className="h-11 rounded-lg bg-neutral-900 text-white flex items-center justify-center text-[14px] font-medium">Quote</a>
        </div>
      </div>
    </>
  );
}
