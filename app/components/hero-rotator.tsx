'use client';

import { useEffect, useRef, useState } from 'react';
import { withBasePath } from '../lib/basePath';
import Image from 'next/image';
import Link from 'next/link';

type Slide = { src: string; alt: string };

const SLIDES: Slide[] = [
  { src: '/sprinklers-flowerbed6.jpg', alt: 'Other Front of house with lighting (night)'},
  { src: '/sprinklers-lawn2.jpg', alt: 'Other Front of house with lighting (night)'},
  { src: '/sprinklers-flowerbed7.jpg', alt: 'Other Front of house with lighting (night)'},
  { src: '/lighting-frontlawn.jpg', alt: 'Front of house with lighting (night)'},
  { src: '/sprinklers-flowerbed10.jpg', alt: 'Other Front of house with lighting (night)'},
  { src: '/sprinklers-flowerbed11.jpg', alt: 'Other Front of house with lighting (night)'},
  { src: '/lighting-fronthouse3.jpg', alt: 'Other Front of house with lighting (night)'},
  { src: '/sprinklers-plants.jpg', alt: 'Other Front of house with lighting (night)'},
  { src: '/snow.jpg', alt: 'Other Front of house with lighting (night)'},

];

const AUTOPLAY_MS = 4000;
const TRANSITION_MS = 500;

export default function HeroRotator() {
  const [index, setIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const nextSlide = () => {
    setIsTransitioning(true);
    setIndex((prev) => prev + 1);
  };

  // autoplay
  useEffect(() => {
  const start = () => {
    if (timer.current) clearInterval(timer.current);
    timer.current = setInterval(nextSlide, AUTOPLAY_MS);
  };
  const stop = () => {
    if (timer.current) clearInterval(timer.current);
    timer.current = null;
  };

  const onVis = () => (document.hidden ? stop() : start());

  start();
  document.addEventListener("visibilitychange", onVis);

  return () => {
    document.removeEventListener("visibilitychange", onVis);
    stop();
  };
}, []);


  // seamless reset when reaching clone
  const handleTransitionEnd = () => {
    if (index >= SLIDES.length) {
      setIsTransitioning(false);
      setIndex(0);
    }
  };

  // swipe (mobile)
  const startX = useRef(0);
  const deltaX = useRef(0);
  const onTouchStart = (e: React.TouchEvent) => { startX.current = e.touches[0].clientX; };
  const onTouchMove = (e: React.TouchEvent) => { deltaX.current = e.touches[0].clientX - startX.current; };
  const onTouchEnd = () => {
    if (Math.abs(deltaX.current) > 50) {
      if (deltaX.current > 0) {
        // previous
        setIsTransitioning(true);
        setIndex((i) => (i === 0 ? SLIDES.length - 1 : i - 1));
      } else {
        // next
        nextSlide();
      }
    }
    deltaX.current = 0;
  };

  // Add one clone of the first slide at the end for smooth loop
  const slides = [...SLIDES, SLIDES[0]];

  return (
    <section
      className="
        relative w-full
        h-[calc(100svh-64px-60px)] 
        md:h-[calc(100svh-64px)] 
        min-h-[480px]
        overflow-hidden
      "
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* slide track */}
      <div
        className="absolute inset-0 flex"
        style={{
          width: `${slides.length * 100}%`,
          transform: `translateX(-${index * (100 / slides.length)}%)`,
          transition: isTransitioning ? `transform ${TRANSITION_MS}ms ease` : 'none',
        }}
        onTransitionEnd={handleTransitionEnd}
      >
        {slides.map((s, i) => (
          <div key={i} className="relative h-full" style={{ width: `${100 / slides.length}%` }}>
            <Image
              src={withBasePath(s.src)}
              alt={s.alt}
              fill
              sizes="100vw"
              className="object-cover"
              priority={i === 0}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/20 to-transparent" />
          </div>
        ))}
      </div>

      {/* overlay */}
      <div className="absolute inset-x-0 bottom-[max(1rem,env(safe-area-inset-bottom))] px-4 sm:px-6 max-w-screen-md mx-auto">
        <h1 className="text-white text-[34px]/[1.1] font-semibold tracking-tight drop-shadow md:text-[56px]/[1.05]">
          Greener Lawns. Brighter Nights. Cleaner Driveways.
        </h1>
        <p className="mt-2 text-white/90 text-[15px] drop-shadow">
          Take a look at our services to see how we can improve your outdoor space.
        </p>
        <div className="mt-4 flex gap-2">
          <Link
            href="/services" 
            className="h-11 px-4 rounded-lg bg-black/60 text-white text-[15px] font-medium flex items-center justify-center"
          >
            Our Services
          </Link>
        </div>
      </div>
    </section>
  );
}
