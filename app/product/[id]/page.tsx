import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function ProductPage({ params }: { params: { id: string } }) {
  const supabase = createClient();

  const { data: product } = await supabase
    .from('products')
    .select('*, profiles(id, username, display_name, avatar_url, bio)')
    .eq('id', params.id)
    .single();

  if (!product) notFound();
  const seller = (product as any).profiles;
  const sold = product.status === 'sold';

  const { data: more } = await supabase
    .from('products')
    .select('id, title, price, image_url, status')
    .eq('seller_id', seller.id)
    .neq('id', product.id)
    .limit(4);

  return (
    <div className="max-w-[1440px] mx-auto">
      <div className="grid md:grid-cols-[60%_40%] border-b border-primary">
        {/* Image */}
        <div className="border-r border-primary">
          <div className="relative aspect-square md:aspect-auto md:h-[calc(100vh-80px)] bg-surface-container-low">
            <img src={product.image_url} alt={product.title} className="w-full h-full object-cover" />
            <span className="absolute top-8 left-8 bg-primary text-on-primary font-label-mono text-label-mono px-4 py-2 uppercase">
              {sold ? 'Sold' : 'Archival Piece'}
            </span>
          </div>
        </div>

        {/* Details */}
        <div className="p-6 md:p-12 flex flex-col justify-between">
          <div>
            <p className="font-label-mono text-label-mono uppercase tracking-widest mb-2">
              <Link href={`/store/thriftnationX${seller.username}`} className="hover:underline">
                THRIFT NATION × {seller.username.toUpperCase()}
              </Link>
            </p>
            <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg uppercase mb-4 leading-none">
              {product.title}
            </h1>
            <p className="font-headline-md text-headline-md mb-8">
              ₹{product.price.toLocaleString('en-IN')}
            </p>

            <div className="border-t border-primary mb-8">
              {[
                { k: 'Size', v: product.size ?? '—' },
                { k: 'Condition', v: product.condition ?? '9/10 Vintage' },
                { k: 'Status', v: sold ? 'SOLD' : 'AVAILABLE' },
              ].map((r) => (
                <div key={r.k} className="flex justify-between py-4 border-b border-primary">
                  <span className="font-label-mono text-label-mono uppercase text-secondary">{r.k}</span>
                  <span className="font-label-mono text-label-mono uppercase font-bold">{r.v}</span>
                </div>
              ))}
            </div>

            {product.description && (
              <p className="font-body-md text-secondary mb-8">{product.description}</p>
            )}

            {sold ? (
              <button disabled className="w-full bg-secondary text-white font-label-mono text-label-mono py-6 uppercase font-bold cursor-not-allowed">
                SOLD
              </button>
            ) : (
              <Link
                href={`/checkout/${product.id}`}
                className="block w-full bg-primary text-on-primary text-center font-label-mono text-label-mono py-6 uppercase font-bold hover:bg-secondary transition-colors"
              >
                BUY NOW
              </Link>
            )}
          </div>

          <p className="font-label-mono text-[10px] text-secondary uppercase mt-12 leading-tight">
            FREE SHIPPING ON ALL ORDERS ABOVE ₹2,999.<br />
            SHIPS WITHIN 24-48 HOURS.<br />
            NO RETURNS ON VINTAGE DROPS.
          </p>
        </div>
      </div>

      {/* More from seller */}
      {more && more.length > 0 && (
        <section className="px-4 md:px-12 py-16">
          <h2 className="font-headline-md text-headline-md uppercase mb-8">
            Other drops from {seller.display_name}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {more.map((m) => (
              <Link key={m.id} href={`/product/${m.id}`} className="group border border-primary">
                <div className="aspect-square overflow-hidden border-b border-primary">
                  <img src={m.image_url} alt={m.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                </div>
                <div className="p-4">
                  <p className="font-label-mono text-label-mono uppercase truncate">{m.title}</p>
                  <p className="font-label-mono text-label-mono mt-1">₹{m.price.toLocaleString('en-IN')}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}