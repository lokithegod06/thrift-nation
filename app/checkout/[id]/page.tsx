'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export default function CheckoutPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const supabase = createClient();
  const [product, setProduct] = useState<any>(null);
  const [buyer, setBuyer] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState({ full_name: '', phone: '', address: '', pincode: '' });

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push('/login'); return; }
      setBuyer(user.id);
      const { data } = await supabase.from('products').select('*, profiles(username)').eq('id', params.id).single();
      setProduct(data);
    })();
  }, [params.id]);

  async function placeOrder() {
    if (!buyer || !product) return;
    setBusy(true);
    try {
      const { error } = await supabase.from('orders').insert({
        buyer_id: buyer,
        product_id: product.id,
        seller_id: product.seller_id,
        amount: product.price,
        status: 'pending',
        ...form,
      });
      if (error) throw error;

      await supabase.from('products').update({ status: 'sold' }).eq('id', product.id);

      router.push('/orders');
    } catch (e: any) {
      alert(e.message);
    } finally {
      setBusy(false);
    }
  }

  if (!product) return <div className="p-12 text-center font-label-mono text-label-mono uppercase">Loading…</div>;

  return (
    <div className="fixed inset-0 bg-primary/30 z-40 flex justify-center items-end">
      <div className="w-full max-w-2xl bg-surface border border-primary max-h-[92vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-primary">
          <h2 className="font-headline-md text-headline-md uppercase">CHECKOUT</h2>
          <button onClick={() => router.back()} className="material-symbols-outlined">close</button>
        </div>

        <div className="p-6 border-b border-primary flex gap-4">
          <img src={product.image_url} className="w-24 h-24 border border-primary object-cover" />
          <div className="flex-grow">
            <p className="font-label-mono text-label-mono uppercase">{product.title}</p>
            <p className="font-label-mono text-label-mono uppercase text-secondary text-[10px] mt-1">
              @{product.profiles?.username}
            </p>
            <p className="font-bold mt-2">₹{product.price.toLocaleString('en-IN')}</p>
          </div>
        </div>

        <div className="p-6 space-y-4">
          {[
            { k: 'full_name', l: 'Full Name', t: 'text' },
            { k: 'phone', l: 'Phone', t: 'tel' },
            { k: 'address', l: 'Address', t: 'text' },
            { k: 'pincode', l: 'Pincode', t: 'text' },
          ].map((f) => (
            <div key={f.k}>
              <label className="font-label-mono text-label-mono uppercase text-secondary block mb-2">
                {f.l}
              </label>
              <input
                type={f.t}
                value={(form as any)[f.k]}
                onChange={(e) => setForm({ ...form, [f.k]: e.target.value })}
                className="w-full border border-primary bg-transparent px-4 py-3 font-label-mono text-label-mono focus:outline-none"
              />
            </div>
          ))}
        </div>

        <div className="p-6 border-t border-primary flex justify-between items-center">
          <span className="font-headline-md text-headline-md">₹{product.price.toLocaleString('en-IN')}</span>
          <button
            onClick={placeOrder}
            disabled={busy}
            className="bg-primary text-on-primary px-8 py-4 font-label-mono text-label-mono uppercase border border-primary disabled:opacity-40"
          >
            {busy ? 'Placing…' : 'Confirm Order'}
          </button>
        </div>
      </div>
    </div>
  );
}