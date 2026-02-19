"use client";

import Image from "next/image"
import Link from "next/link"
import { useEffect, useMemo, useState } from "react";

const COMPANY = "Spring Rain Lawn Sprinklers Inc";
const PHONE_DISPLAY = "847-322-5748";
const PHONE_TEL = "8473225748";

type Category = "all" | "irrigation" | "lighting" | "snow";

type Photo = {
  src: string;  // /filename.jpg
  alt: string;  // human alt text
  category: Exclude<Category, "all">;
}

function titlesizeFromFilename(filename: string) {
  const base = filename.replace(/\/[^/.]+$/, "");
  const withSpaces = base.replace(/[-_]+/g, " ").replace(/(\d+)/g, " $1");
  return withSpaces
    .split(" ")
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function categorize(filename: string): Photo["category"] {
  const f = filename.toLowerCase();
  if (f.startsWith("lighting-")) return "lighting";
  if (f.startsWith("snow")) return "snow";
  return "irrigation";
}


const FILENAMES = [
  "sprinklers-flowerbed.jpg",
  "flowerbed.jpg",
  "sprinklers-flowerbed2.jpg",
  "sprinklers-flowerbed3.jpg",
  "sprinklers-flowerbed4.jpg",
  "sprinklers-flowerbed5.jpg",
  "sprinklers-flowerbed6.jpg",
  "sprinklers-flowerbed7.jpg",
  "sprinklers-flowerbed8.jpg",
  "sprinklers-flowerbed9.jpg",
  "sprinklers-flowerbed10.jpg",
  "sprinklers-flowerbed11.jpg",
  "sprinklers-flowerbed12.jpg",
  "sprinklers-flowerbed13.jpg",
  "sprinklers-flowerbed14.jpg",
  "sprinklers-flowerbed15.jpg",

  "sprinklers-lawn.jpg",
  "sprinklers-lawn2.jpg",
  "sprinklers-lawn3.jpg",
  "sprinklers-lawn4.jpg",
  "sprinklers-lawn5.jpg",
  "sprinklers-plants.jpg",
  "sprinklers-tiles.jpg",
  "sprinklers-trees.jpg",
  "sprinklers-5mil.jpg",

  "lighting-fronthouse.jpg",
  "lighting-fronthouse2.jpg",
  "lighting-fronthouse3.jpg",
  "lighting-frontlawn.jpg",
  "lighting-night.jpg",

  "snow.jpg",
] as const;


export default function PortfolioPage() {
  const photos: Photo[] = useMemo(() => {
    return FILENAMES.map((name) => ({
      src: `/${name}`,
      alt: titlesizeFromFilename(name),
      category: categorize(name),
    }));
  }, []);

  const [filter, setFilter] = useState<Category>("all");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const filtered = useMemo(() => {
    if (filter === "all") return photos;
    return photos.filter((p) => p.category === filter);
  }, [filter, photos]);

  // Lightbox: close on ESC
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveIndex(null);
      if (activeIndex === null) return;
      if (e.key === "ArrowRight") setActiveIndex((i) => (i === null ? null : Math.min(i + 1, filtered.length - 1)));
      if (e.key === "ArrowLeft") setActiveIndex((i) => (i === null ? null : Math.max(i - 1, 0)));
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeIndex, filtered.length]);

  return (
    <div className="bg-[--bg] text-[--fg]">
      {/* Header */}
      <section className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 pt-12 pb-6">
        <div className="max-w-2xl">
          <h1 className="text-[34px]/[1.1] md:text-[48px]/[1.05] font-semibold tracking-tight">
            Portfolio
          </h1>
          <p className="mt-3 text-[15px] md:text-[16px] text-neutral-600">
            Real work from real homes—irrigation installs and repairs, outdoor lighting upgrades, and seasonal snow service.
          </p>
        </div>

        {/* Filter pills */}
        <div className="mt-6 flex flex-wrap gap-2">
          <FilterPill label="All" active={filter === "all"} onClick={() => setFilter("all")} />
          <FilterPill label="Irrigation" active={filter === "irrigation"} onClick={() => setFilter("irrigation")} />
          <FilterPill label="Lighting" active={filter === "lighting"} onClick={() => setFilter("lighting")} />
          <FilterPill label="Snow" active={filter === "snow"} onClick={() => setFilter("snow")} />
        </div>
      </section>

      {/* Gallery */}
      <section className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {filtered.map((p, idx) => (
            <button
              key={p.src}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className="group relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] aspect-[4/3] shadow-sm text-left"
              aria-label={`Open photo: ${p.alt}`}
            >
              <Image
                src={p.src}
                alt={p.alt}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="pointer-events-none absolute bottom-2 left-2 right-2 text-white text-[12px] opacity-0 group-hover:opacity-100 transition-opacity line-clamp-2">
                {p.alt}
              </div>
            </button>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 rounded-3xl border border-[var(--border)] bg-white p-6 sm:p-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">Want something like this?</h2>
            <p className="mt-1 text-sm text-neutral-600">
              Call or request a quick quote—we’ll respond fast and keep it simple.
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <a
              href={`tel:${PHONE_TEL}`}
              className="h-11 px-5 rounded-xl bg-neutral-900 text-white text-[15px] font-medium flex items-center justify-center hover:opacity-95"
            >
              Call {PHONE_DISPLAY}
            </a>
            <Link
              href="/#quote"
              className="h-11 px-5 rounded-xl border border-[var(--border)] bg-white text-neutral-900 text-[15px] font-medium flex items-center justify-center hover:bg-neutral-50"
            >
              Request a quote
            </Link>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {activeIndex !== null && filtered[activeIndex] && (
        <div
          className="fixed inset-0 z-[100] bg-black/75 backdrop-blur-sm flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
          onClick={() => setActiveIndex(null)}
        >
          <div
            className="relative w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full aspect-[16/10] overflow-hidden rounded-2xl bg-black">
              <Image
                src={filtered[activeIndex].src}
                alt={filtered[activeIndex].alt}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </div>

            <div className="mt-3 flex items-center justify-between gap-3">
              <p className="text-white/90 text-sm">{filtered[activeIndex].alt}</p>

              <div className="flex gap-2">
                <button
                  type="button"
                  className="h-10 px-4 rounded-xl bg-white/10 text-white text-sm border border-white/20 hover:bg-white/15"
                  onClick={() => setActiveIndex((i) => (i === null ? null : Math.max(i - 1, 0)))}
                  aria-label="Previous"
                >
                  ←
                </button>
                <button
                  type="button"
                  className="h-10 px-4 rounded-xl bg-white/10 text-white text-sm border border-white/20 hover:bg-white/15"
                  onClick={() => setActiveIndex((i) => (i === null ? null : Math.min(i + 1, filtered.length - 1)))}
                  aria-label="Next"
                >
                  →
                </button>
                <button
                  type="button"
                  className="h-10 px-4 rounded-xl bg-white text-neutral-900 text-sm font-medium"
                  onClick={() => setActiveIndex(null)}
                  aria-label="Close"
                >
                  Close
                </button>
              </div>
            </div>

            <p className="mt-2 text-white/60 text-xs">
              Tip: Use ← / → keys to navigate, Esc to close.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function FilterPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "h-10 px-4 rounded-full text-sm font-medium border transition-colors",
        active
          ? "bg-neutral-900 text-white border-neutral-900"
          : "bg-white text-neutral-900 border-[var(--border)] hover:bg-neutral-50",
      ].join(" ")}
    >
      {label}
    </button>
  );
}
