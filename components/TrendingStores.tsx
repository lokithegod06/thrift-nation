'use client';

import { useRef } from 'react';
import StoreCard from '@/components/StoreCard';

export default function TrendingStores({ stores }: { stores: any[] }) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: -1 | 1) => {
    trackRef.current?.scrollBy({
      left: direction * trackRef.current.clientWidth * 0.8,
      behavior: 'smooth',
    });
  };

  return (
    <div className="px-4 md:px-12 max-w-[1440px] mx-auto">
      <div className="flex items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <span className="w-12 h-[1px] bg-on-primary" />
          <h2 className="font-headline-lg text-headline-lg uppercase">Trending Stores</h2>
        </div>
        <div className="hidden md:flex gap-2">
          <button
            type="button"
            aria-label="Scroll trending stores left"
            onClick={() => scroll(-1)}
            className="w-10 h-10 border border-on-primary text-on-primary text-xl leading-none hover:bg-on-primary hover:text-primary transition-colors"
          >
            &larr;
          </button>
          <button
            type="button"
            aria-label="Scroll trending stores right"
            onClick={() => scroll(1)}
            className="w-10 h-10 border border-on-primary text-on-primary text-xl leading-none hover:bg-on-primary hover:text-primary transition-colors"
          >
            &rarr;
          </button>
        </div>
      </div>
      <div ref={trackRef} className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth pb-4">
        {stores.map((store) => <StoreCard key={store.id} store={store} />)}
      </div>
    </div>
  );
}