import Image from "next/image";
import Link from "next/link";
import HeroRotator from "./components/hero-rotator";
import { withBasePath } from "./lib/basePath";

const COMPANY = "Spring Rain Lawn Sprinkler Inc.";
const PHONE_DISPLAY = "847-322-5748";
const PHONE_TEL = "8473225748";

const cities = ["Highland Park", "Deerfield", "Lake Forest", "Northbrook", "Glenview", "Winnetka"];

const serviceCategories = [
  {
    title: "Irrigation & Sprinklers",
    blurb: "Design, installs, repairs, seasonal service.",
    href: "/services#irrigation",
    image: "/sprinklers-flowerbed7.jpg",
  },
  {
    title: "Outdoor Lighting",
    blurb: "Path, patio, and landscape lighting upgrades.",
    href: "/services#lighting",
    image: "/lighting-frontlawn.jpg",
  },
  {
    title: "Snow Removal",
    blurb: "Reliable clears for driveways & walkways.",
    href: "/services#snow",
    image: "/snow.jpg",
  },
] as const;

const irrigationServices = [
  { name: "New Installations", blurb: "Smart controllers, water‑efficient zones" },
  { name: "Repairs", blurb: "Leaks, broken heads, wiring, controllers" },
  { name: "Startups", blurb: "Spring turn‑on, coverage check" },
  { name: "Mid‑Season Check", blurb: "Adjust for growing season" },
  { name: "Winterization", blurb: "Blow‑outs before first freeze" },
] as const;

const gallery = [
  { src: "/hero-1.jpg", alt: "Irrigated lawn" },
  { src: "/hero-2.jpg", alt: "Front yard irrigation" },
  { src: "/hero-3.jpg", alt: "Backyard garden irrigation" },
  { src: "/hero-4.jpg", alt: "Irrigation system installation" },
  { src: "/hero-5.jpg", alt: "Sprinkler maintenance" },
  { src: "/hero-6.jpg", alt: "Sprinkler service" },
  { src: "/hero-7.jpg", alt: "Outdoor work" },
  { src: "/hero-8.jpg", alt: "Outdoor lighting" },
  { src: "/hero-9.jpg", alt: "Seasonal service" },
] as const;

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

      {/* Quick intro + lead form */}
      <section className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid gap-6 md:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl border border-[--border] bg-[--bg] shadow-sm p-6 sm:p-8">
            <p className="text-sm font-medium text-[--nav-fg]/70">Serving Chicago’s North Shore</p>
            <h2 className="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight">
              Irrigation, lighting, and seasonal service—done cleanly and on schedule.
            </h2>
            <p className="mt-2 text-[15px] text-[--nav-fg]/70 max-w-prose">
              Tell us what you need and we’ll get back quickly with next steps and a fast quote.
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              <a
                href={`tel:${PHONE_TEL}`}
                className="inline-flex h-11 items-center justify-center rounded-full px-5 text-sm font-medium bg-blue-700 text-white shadow-sm hover:opacity-95"
              >
                Call {PHONE_DISPLAY}
              </a>
              <a
                href="#quote"
                className="inline-flex h-11 items-center justify-center rounded-full px-5 text-sm font-medium border border-[--border] bg-[--bg] hover:bg-black/5"
              >
                Get a quote
              </a>
              <Link
                href="/portfolio"
                className="inline-flex h-11 items-center justify-center rounded-full px-5 text-sm font-medium border border-[--border] bg-[--bg] hover:bg-black/5"
              >
                View photos
              </Link>
            </div>
          </div>

          <div 
            id="quote" 
            className="scroll-mt-19 rounded-3xl border border-[--border] bg-[--bg] shadow-sm p-6 sm:p-8"
          >
            <h3 className="text-lg font-semibold">Get a fast quote</h3>
            <p className="mt-1 text-sm text-[--nav-fg]/70">No spam—just a quick follow‑up.</p>

            <form action="/api/contact" method="post" className="mt-4 grid grid-cols-1 gap-3">
              <input
                name="name"
                required
                placeholder="Your name"
                className="h-12 rounded-xl border border-neutral-300 bg-white px-3 text-[16px] outline-none focus:ring-2 focus:ring-neutral-800"
              />
              <input
                name="phone"
                required
                inputMode="tel"
                placeholder="Phone"
                className="h-12 rounded-xl border border-neutral-300 bg-white px-3 text-[16px] outline-none focus:ring-2 focus:ring-neutral-800"
              />
              <input
                name="zip"
                inputMode="numeric"
                placeholder="ZIP (optional)"
                className="h-12 rounded-xl border border-neutral-300 bg-white px-3 text-[16px] outline-none focus:ring-2 focus:ring-neutral-800"
              />
              <button
                type="submit"
                className="h-12 rounded-xl bg-neutral-900 text-white text-[16px] font-medium active:opacity-90"
              >
                Send request
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Services (3 main categories) */}
      <section className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 mt-10 sm:mt-14">
        <div>
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Services</h2>
            <p className="mt-1 text-sm text-[--nav-fg]/70">Everything you need for a cleaner, brighter outdoor space.</p>
          </div>
          <Link href="/services" className="text-sm font-medium underline underline-offset-4">
            See all
          </Link>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {serviceCategories.map((s) => (
            <Link
              key={s.title}
              href={s.href}
              className="group relative overflow-hidden rounded-3xl border border-[--border] bg-[--card] shadow-sm"
            >
              <div className="relative h-44">
                <Image src={withBasePath(s.image)} alt={s.title} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-transparent" />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold group-hover:underline underline-offset-4 text-[--fg]">
                  {s.title}
                </h3>
                <p className="mt-1 text-sm text-[--nav-fg]/70">{s.blurb}</p>
                <p className="mt-3 text-sm font-medium">Explore →</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Irrigation quick list (keeps your original content but modernized) */}
        <div className="mt-10">
          <div>
            <h3 className="text-xl font-semibold tracking-tight">Popular irrigation services</h3>
            <Link href="/services#irrigation" className="text-sm font-medium underline underline-offset-4">
              Details
            </Link>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {irrigationServices.map((it) => (
              <div key={it.name} className="rounded-2xl border border-[--border] bg-[--bg] p-5 shadow-sm">
                <h4 className="font-semibold">{it.name}</h4>
                <p className="mt-1 text-sm text-[--nav-fg]/70">{it.blurb}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Work */}
      <section className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 mt-12 sm:mt-16">
        <div>
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Recent work</h2>
            <p className="mt-1 text-sm text-[--nav-fg]/70">Real projects from real homes—tap to browse more.</p>
          </div>
          <Link href="/portfolio" className="text-sm font-medium underline underline-offset-4">
            View full portfolio
          </Link>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-3">
          {gallery.slice(0, 9).map((g, idx) => (
            <div
              key={g.src}
              className="relative overflow-hidden rounded-2xl border border-[--border] bg-[--card] aspect-[4/3] shadow-sm"
            >
              <Image
                src={withBasePath(g.src)}
                alt={g.alt}
                fill
                sizes="(min-width: 768px) 33vw, 50vw"
                className="object-cover"
                priority={idx < 2}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Why choose us */}
      <section className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 mt-12 sm:mt-16">
        <div className="rounded-3xl border border-[--border] bg-[--card] p-6 sm:p-8 shadow-sm">
          <h2 className="text-2xl font-semibold tracking-tight">Why homeowners choose us</h2>
          <p className="mt-1 text-sm text-[--nav-fg]/70">Simple, professional service with work you can see.</p>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Licensed & insured", desc: "Peace of mind on every job." },
              { title: "Water‑smart designs", desc: "Efficient coverage that saves." },
              { title: "Same‑week repairs", desc: "Fast fixes when you need them." },
              { title: "Clean, respectful crews", desc: "We treat your home like ours." },
            ].map((b) => (
              <div key={b.title} className="rounded-2xl border border-[--border] bg-[--bg] p-5">
                <p className="font-semibold">{b.title}</p>
                <p className="mt-1 text-sm text-[--nav-fg]/70">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service areas */}
      <section className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 mt-12 sm:mt-16 pb-28">
        <div>
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Service areas</h2>
            <p className="mt-1 text-sm text-[--nav-fg]/70">
              Chicago North Shore and surrounding suburbs.
            </p>
          </div>
          <Link 
            href="/service-areas" 
            className="mt-2 inline-block text-sm font-medium underline underline-offset-4"
          >
            See all areas
          </Link>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {cities.map((c) => (
            <Link
              key={c}
              href={`/service-areas/${c.toLowerCase().replace(/\s+/g, "-")}`}
              className="px-3 h-9 inline-flex items-center rounded-full border border-[--border] bg-[--bg] text-[14px] hover:bg-black/5"
            >
              {c}
            </Link>
          ))}
        </div>
        

        {/* Contact strip */}
        <div className="mt-8 rounded-3xl border border-[--border] bg-[--bg] shadow-sm p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold tracking-tight">Need help this week?</h3>
            <p className="mt-1 text-sm text-[--nav-fg]/70">Call or request a quote—we’ll respond quickly.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <a
              href={`tel:${PHONE_TEL}`}
              className="inline-flex h-11 items-center justify-center rounded-full px-5 text-sm font-medium bg-blue-700 text-white shadow-sm hover:opacity-95"
            >
              Call {PHONE_DISPLAY}
            </a>
            <a
              href={`sms:${PHONE_TEL}`}
              className="inline-flex h-11 items-center justify-center rounded-full px-5 text-sm font-medium border border-[--border] bg-[--bg] hover:bg-black/5"
            >
              Text
            </a>
            <a
              href="#quote"
              className="inline-flex h-11 items-center justify-center rounded-full px-5 text-sm font-medium border border-[--border] bg-[--bg] hover:bg-black/5"
            >
              Quote
            </a>
          </div>
        </div>
      </section>

      {/* Sticky bottom bar (mobile), top line is border-t in className below */}
      <div className="fixed inset-x-0 bottom-0 z-40 rounded-xl border-t border-[--border] bg-[--bg]/95 backdrop-blur supports-[backdrop-filter]:bg-[--bg]/80 md:hidden">
        <div className="mx-auto max-w-screen-xl px-3 py-2 grid grid-cols-3 gap-2">
          <a
            href={`tel:${PHONE_TEL}`}
            className="h-11 rounded-xl border border-[--border] flex items-center justify-center text-[14px] font-medium"
          >
            Call
          </a>
          <a
            href={`sms:${PHONE_TEL}`}
            className="h-11 rounded-xl border border-[--border] flex items-center justify-center text-[14px] font-medium"
          >
            Text
          </a>
          <a
            href="#quote"
            className="h-11 rounded-xl bg-neutral-900 text-white flex items-center justify-center text-[14px] font-medium"
          >
            Quote
          </a>
        </div>
      </div>
    </>
  );
}
