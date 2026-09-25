'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const images = [
  '/images/herosection1.jpeg',
  '/images/herosection2.jpeg',
  '/images/herosection3.jpeg',
];

export default function HeroSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    // Change image every 2 seconds (2000ms)
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000);

    // Cleanup the timer when the component unmounts
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="px-4 py-6 md:px-12 md:py-10">
      <section className="relative mx-auto h-[min(870px,75vh)] min-h-[560px] w-full max-w-[1440px] overflow-hidden border border-primary">
      {/* Image Layers */}
      {images.map((src, i) => (
        <div
          key={src}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            i === index ? 'opacity-100 z-0' : 'opacity-0 -z-10'
          }`}
        >
          <Image
            src={src}
            alt={`Thrift Nation Hero ${i + 1}`}
            fill
            className="object-cover"
            priority={i === 0} // Load the first image immediately
          />
        </div>
      ))}

      {/* Layered treatment keeps the image visible while grounding the copy. */}
      <div className="absolute inset-0 bg-primary/20 z-10 pointer-events-none" />
      <div
        className="absolute inset-0 z-10 opacity-20 mix-blend-soft-light pointer-events-none"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, rgba(255,255,255,.16) 0, rgba(255,255,255,.16) 1px, transparent 1px, transparent 4px)',
        }}
      />

      {/* Foreground Content */}
      <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-primary/95 via-primary/35 to-transparent p-5 sm:p-7 md:p-10 lg:p-12 z-20">
        <div className="max-w-4xl">
          <h1 className="font-display-lg text-4xl sm:text-5xl md:text-6xl lg:text-7xl uppercase leading-[0.88] mb-5 text-on-primary">
            THE UNDERGROUND<br />MARKETPLACE
          </h1>
          <div className="flex flex-wrap gap-3">
            <button className="bg-primary text-on-primary px-5 py-3 font-label-mono text-label-mono uppercase border border-primary hover:bg-surface hover:text-primary transition-colors">
              Shop The Drop
            </button>
            <button className="bg-transparent text-on-primary px-5 py-3 font-label-mono text-label-mono uppercase border border-on-primary hover:bg-on-primary hover:text-primary transition-colors">
              Sell Your Gear
            </button>
          </div>
        </div>
      </div>
      </section>
    </div>
  );
}