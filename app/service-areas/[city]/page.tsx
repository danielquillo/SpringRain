import { notFound } from "next/navigation";
import { withBasePath } from "@/app/lib/basePath";
import Image from "next/image";
import Link from "next/link";

const PHONE_DISPLAY ="847-322-5748";
const PHONE_TEL = "8473225748";

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

function unslugify(slug: string) {
  return slug
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function generateStaticParams() {
  return CITIES.map(city => ({
    city: slugifyCity(city),
  }));
}

export default async function CityPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  const cityName = unslugify(city);

  if (!CITIES.includes(cityName)) {
    notFound();
  }

  const services = [
    {
      title: "Irrigation & Sprinklers",
      desc: `Custom sprinkler installations, repairs, startups, and winterization throughout ${cityName}.`,
      img: "/hero-4.jpg",
    },
    {
      title: "Outdoor Lighting",
      desc: `Pathway, landscape, and architectural lighting upgrades for homes in ${cityName}.`,
      img: "/hero-8.jpg",
    },
    {
      title: "Snow Removal",
      desc: `Driveway and walkway snow clearing services during the winter season in ${cityName}.`,
      img: "/hero-9.jpg",
    },
  ] as const;


  return (
    <div className="bg-[--bg] text-[--fg]">
      <section className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 pt-12 pb-6">
        <h1 className="text-[32px] md:text-[44px] font-semibold tracking-tight">
          Irrigation, Lighting & Snow Removal in {cityName}, IL
        </h1>

        <p className="mt-3 text-[16px] text-neutral-600 max-w-2xl">
          Spring Rain Lawn Sprinkler Inc. proudly serves homeowners in {cityName} with professional irrigation systems,
          outdoor lighting installations, and reliable winter snow removal services.
        </p>
      </section>

      <section className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 pb-10 grid gap-6 md:grid-cols-3">
        {services.map((service) => (
          <div
            key={service.title}
            className="rounded-3xl border border-[var(--border)] bg-white overflow-hidden"
          >
            <div className="relative h-44">
              <Image src={withBasePath(service.img)} alt={service.title} fill className="object-cover" />
            </div>
            <div className="p-5">
              <h3 className="text-lg font-semibold">{service.title}</h3>
              <p className="mt-2 text-[14px] text-neutral-600">{service.desc}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 pb-16">
        <div className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold">Need service in {cityName}?</h3>
            <p className="mt-1 text-[14px] text-neutral-600">Call or request a quote and we’ll respond quickly.</p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <a
              href={`tel:${PHONE_TEL}`}
              className="h-11 px-5 rounded-xl bg-neutral-900 text-white text-[15px] font-medium flex items-center justify-center"
            >
              Call {PHONE_DISPLAY}
            </a>
            <Link
              href="/#quote"
              className="h-11 px-5 rounded-xl border border-[var(--border)] bg-white text-neutral-900 text-[15px] font-medium flex items-center justify-center"
            >
              Request a quote
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
