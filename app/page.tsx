import { createClient } from '@/lib/supabase/server';
import ProductCard from '@/components/ProductCard';
import StoreCard from '@/components/StoreCard';
import HeroSlider from '@/components/HeroSlider';
import Link from 'next/link';

export const revalidate = 30;

export default async function HomePage() {
  const supabase = createClient();

  const { data: drops } = await supabase
    .from('products')
    .select('id, title, price, size, image_url, status, profiles(username, display_name)')
    .order('created_at', { ascending: false })
    .limit(8);

  const { data: stores } = await supabase
    .from('profiles')
    .select('id, username, display_name, avatar_url, bio')
    .order('created_at', { ascending: false })
    .limit(8);

  return (
    <div>
      {/* Hero Slider (Replaced old static section) */}
      <HeroSlider />

      {/* Fresh Drops */}
      <section className="py-16 px-4 md:px-12 max-w-[1440px] mx-auto">
        <div className="flex justify-between items-end mb-8 border-b border-primary pb-4">
          <h2 className="font-headline-lg text-headline-lg uppercase tracking-tight">Fresh Drops</h2>
          <Link href="/discover" className="font-label-mono text-label-mono uppercase underline">
            View All
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {drops?.map((p: any) => <ProductCard key={p.id} p={p} />)}
          {(!drops || drops.length === 0) && (
            <p className="col-span-full font-label-mono text-label-mono uppercase text-secondary py-12 text-center">
              No drops yet. Be the first — <Link href="/drop" className="underline">Drop a Product</Link>.
            </p>
          )}
        </div>
      </section>

      {/* Trending Stores */}
      <section className="bg-primary text-on-primary py-16">
        <div className="px-4 md:px-12 max-w-[1440px] mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <span className="w-12 h-[1px] bg-on-primary" />
            <h2 className="font-headline-lg text-headline-lg uppercase">Trending Stores</h2>
          </div>
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4">
            {stores?.map((s) => <StoreCard key={s.id} store={s} />)}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 px-4 md:px-12 max-w-[1440px] mx-auto flex flex-col md:flex-row gap-12">
        <div className="md:w-1/2">
          <h2 className="font-headline-lg text-headline-lg uppercase mb-4">
            DON'T MISS<br />THE NEXT DROP
          </h2>
          <p className="font-body-lg text-secondary">
            Get notified before the heavy hitters land. Scarcity is the only constant.
          </p>
        </div>
        <form className="md:w-1/2 flex border border-primary">
          <input
            type="email"
            placeholder="YOUR EMAIL ADDRESS"
            className="flex-grow bg-transparent border-none font-label-mono text-label-mono uppercase px-6 py-4 focus:outline-none"
          />
          <button className="bg-primary text-on-primary font-label-mono text-label-mono uppercase px-8 py-4">
            Join
          </button>
        </form>
      </section>
    </div>
  );
}