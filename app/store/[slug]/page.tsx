import { createClient } from '@/lib/supabase/server';
import ProductCard from '@/components/ProductCard';
import { notFound } from 'next/navigation';

// slug format: thriftnationX{username}
function parseUsername(slug: string) {
  const prefix = 'thriftnationX';
  if (!slug.startsWith(prefix)) return null;
  return slug.slice(prefix.length);
}

export default async function StorePage({ params }: { params: { slug: string } }) {
  const username = parseUsername(params.slug);
  if (!username) notFound();

  const supabase = createClient();
  const { data: store } = await supabase
    .from('profiles')
    .select('*')
    .eq('username', username)
    .single();

  if (!store) notFound();

  const { data: products } = await supabase
    .from('products')
    .select('*')
    .eq('seller_id', store.id)
    .order('created_at', { ascending: false });

  const { count: soldCount } = await supabase
    .from('products')
    .select('*', { count: 'exact', head: true })
    .eq('seller_id', store.id)
    .eq('status', 'sold');

  const { count: followerCount } = await supabase
    .from('follows')
    .select('*', { count: 'exact', head: true })
    .eq('following_id', store.id);

  const dropsCount = products?.length ?? 0;
  const available = products?.filter((p) => p.status !== 'sold') ?? [];
  const sold = products?.filter((p) => p.status === 'sold') ?? [];

  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-12">
      {/* Header */}
      <section className="mt-12 flex flex-col md:flex-row items-start gap-8 md:gap-16">
        <div className="w-32 h-32 md:w-44 md:h-44 border border-primary p-1 bg-surface shrink-0">
          {store.avatar_url ? (
            <img src={store.avatar_url} alt={store.username} className="w-full h-full object-cover grayscale" />
          ) : (
            <div className="w-full h-full bg-primary text-on-primary flex items-center justify-center font-headline-lg text-headline-lg">
              {store.display_name[0]}
            </div>
          )}
        </div>
        <div className="flex-grow space-y-6">
          <div className="flex flex-wrap items-center gap-4">
            <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg uppercase tracking-tight">
              {store.display_name}
            </h1>
            <div className="flex gap-2">
              <button className="px-6 py-2 bg-primary text-on-primary font-label-mono text-label-mono uppercase border border-primary hover:bg-surface hover:text-primary transition-all">
                Follow
              </button>
              <button className="p-2 border border-primary hover:bg-primary hover:text-on-primary">
                <span className="material-symbols-outlined">share</span>
              </button>
            </div>
          </div>
          <p className="font-label-mono text-label-mono uppercase text-secondary">
            @{store.username} · thriftnationX{store.username}
          </p>
          <div className="flex gap-8 border-y border-primary/10 py-4 md:border-none md:p-0">
            {[
              { v: dropsCount, l: 'Drops' },
              { v: followerCount ?? 0, l: 'Followers' },
              { v: soldCount ?? 0, l: 'Sold' },
            ].map((s) => (
              <div key={s.l} className="flex flex-col md:flex-row md:items-baseline md:gap-2">
                <span className="font-bold text-xl md:text-2xl">{s.v}</span>
                <span className="font-label-mono text-label-mono uppercase text-secondary">{s.l}</span>
              </div>
            ))}
          </div>
          {store.bio && (
            <p className="font-label-mono text-label-mono uppercase tracking-widest text-primary max-w-md">
              {store.bio}
            </p>
          )}
        </div>
      </section>

      {/* Drop grid */}
      <section className="mt-16 pb-16">
        <h2 className="font-headline-md text-headline-md uppercase border-b border-primary pb-4 mb-8">
          Fresh Drops
        </h2>
        {available.length === 0 ? (
          <p className="font-label-mono text-label-mono uppercase text-secondary text-center py-12">
            No drops yet.
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
            {available.map((p) => <ProductCard key={p.id} p={p} />)}
          </div>
        )}

        {sold.length > 0 && (
          <>
            <h2 className="font-headline-md text-headline-md uppercase border-b border-primary pb-4 mb-8 mt-16">
              Archive · Sold
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
              {sold.map((p) => <ProductCard key={p.id} p={p} />)}
            </div>
          </>
        )}
      </section>
    </div>
  );
}