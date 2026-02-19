import Image from "next/image";
import Link from "next/link"

const PHONE_DISPLAY = "847-322-5748";
const PHONE_TEL = "8473225748";

// All suburbs
const CITIES = [
  "Highland Park",
  "Glencoe",
  "Deerfield",
  "Lake Forest",
  "Northbrook",
  "Glenview",
  "Winnetka",
  "Wilmette",
  "Buffalo Grove",
  "Arlington Heights",
  "Libertyville",
];

function slugifyCity(city: string) {
  return city.toLowerCase().trim().replace(/\s+/g, "-");
}

export default function ServiceAreasPage() {
  const featured = CITIES.slice(0, 12);

  return (
    <div className="bg-[--bg] text-[--fg]">
      {/* Header */}
      <section className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 pt-10 pb-6">
        <div className="max-w-2xl">
          <h1 className="text-[34px]/[1.1] md:text-[48px]/[1.05] font-semibold tracking-tight">
            Service Areas
          </h1>
          <p className="mt-3 text-[15px] md:text-[16px] text-neutral-600">
            We serve homeowners across Chicago's North Shore and nearby suburbs with irrigation, 
            outdoor lighting, and winter snow removal.
          </p>
        </div>

        {/* Quick CTA strip */}
        {/* <div className="mt-6 rounded-3xl border border-[var(--border)] bg-white p-4 sm:p-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[14px] text-neutral-600">Not sure if you're in our area?</p>
            <p className="text-[16px] font-semibold">Call or request a quick quote.</p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <a
              href={`tel:${PHONE_TEL}`}
              className="h-11 px-4 rounded-xl bg-neutral-900 text-white text-[15px] font-medium flex items-center justify-center hover:backdrop-opacity-95"
            >
              Call {PHONE_DISPLAY}
            </a>
            <Link
              href="/#quote"
              className="h-11 px-4 rounded-xl border border-[var(--border)] bg-white text-neutral-900 text-[15px] font-medium flex items-center justify-center hover:bg-neutral-50"            
            >
              Request a quote
            </Link>
          </div>
        </div> */}
      </section>

      {/* Map */}
      <section className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 pb-6">
        <div className="grid gap-4 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-[var(--border)] bg-white overflow-hidden">
              {/* <div className="relative aspect-[16/9]">
                <Image
                  src = "/service-area-map.png"
                  alt = "Map of our service area"
                  fill
                  sizes="(min-width: 1024px) 60vw, 100vw"
                  className="object-cover"
                  priority
                />
              </div> */}

              {/* Backup */}
              <div className="border-t border-[var(--border)]">
                <iframe
                  title = "Service area map"
                  className="w-full h-[320px] md:h-[380px]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://www.google.com/maps?q=Northbrook,+IL&output=embed"
                />
              </div>
            </div>
          </div>

          {/* Area summary */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6">
              <h2 className="text-[18px] font-semibold">We're in your neighborhood</h2>
              <p className="mt-2 text-[14px] text-neutral-700">
                If you're in or near the North Shore, there's a good chance we can help. We frequently work in these
                areas, and we can confirm availability fast.
              </p>

              <div className="mt-4 grid gap-2">
                <div className="rounded-2xl border border-[var(--border)] bg-white p-4">
                  <p className="text-[13px] font-semibold">Seasonal services</p>
                  <p className="mt-1 text-[14px] text-neutral-700">
                    Spring startups • Summer tune-ups • Fall winterization • Winter snow clearing
                  </p>
                </div>
                <div className="rounded-2xl border border-[var(--border)] bg-white p-4">
                  <p className="text-[13px] font-semibold">Best way to reach us</p>
                  <p className="mt-1 text-[14px] text-neutral-700">
                    Call or request a quote—please include your city and ZIP for fastest scheduling.
                  </p>
                </div>
              </div>
              
              <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                <a
                  href={`tel:${PHONE_TEL}`}
                  className="h-11 px-4 rounded-xl bg-neutral-900 text-white text-[15px] font-medium flex items-center justify-center"
                >
                  Call {PHONE_DISPLAY}
                </a>
                <Link
                  href="/#quote"
                  className="h-11 px-4 rounded-xl border border-[var(--border)] bg-white text-neutral-900 text-[15px] font-medium flex items-center justify-center hover:bg-neutral-50"
                >
                  Request a quote
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Cities grid */}
      <section className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-[22px] md:text-[26px] font-semibold tracking-tight">Cities we serve</h2>
            <p className="mt-1 text-[14px] text-neutral-600">
              Click a city to learn more about irrigation, lighting, and snow removal services in your area.
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((city) => {
            const slug = slugifyCity(city);
            return (
              <Link
                key={city}
                href={`/service-areas/${slug}`}
                className="group rounded-2xl border border-[var(--border)] bg-white p-5 hover:bg-neutral-50 transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[16px] font-semibold">{city}</p>
                    <p className="mt-1 text-[13px] text-neutral-600">
                      Sprinklers • Outdoor lighting • Snow removal
                    </p>
                  </div>
                  <span className="text-[13px] font-medium text-neutral-900 group-hover:underline underline-offset-4">
                    View →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* “Don’t see your city?” */}
        <div className="mt-10 rounded-3xl border border-[var(--border)] bg-white p-6 sm:p-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[18px] font-semibold">Don’t see your city listed?</p>
            <p className="mt-1 text-[14px] text-neutral-600">
              Reach out—if you’re nearby, we can usually help or recommend the next best option.
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <a
              href={`tel:${PHONE_TEL}`}
              className="h-11 px-4 rounded-xl bg-neutral-900 text-white text-[15px] font-medium flex items-center justify-center"
            >
              Call {PHONE_DISPLAY}
            </a>
            <Link
              href="/#quote"
              className="h-11 px-4 rounded-xl border border-[var(--border)] bg-white text-neutral-900 text-[15px] font-medium flex items-center justify-center hover:bg-neutral-50"
            >
              Request a quote
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
