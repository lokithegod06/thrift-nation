'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

type SellerOrder = {
  id: string;
  amount: number;
  status: string;
  tracking_number: string | null;
  full_name: string | null;
  phone: string | null;
  address: string | null;
  pincode: string | null;
  created_at: string;
  products: { title: string; image_url: string } | null;
};

function SellerOrderRow({ order }: { order: SellerOrder }) {
  const router = useRouter();
  const supabase = createClient();
  const [trackingNumber, setTrackingNumber] = useState(order.tracking_number ?? '');
  const [busy, setBusy] = useState(false);

  async function markShipped() {
    if (!trackingNumber.trim()) {
      alert('Enter a tracking number before marking this order shipped.');
      return;
    }

    setBusy(true);
    const { error } = await supabase
      .from('orders')
      .update({ tracking_number: trackingNumber.trim(), status: 'shipped' })
      .eq('id', order.id);

    if (error) alert(error.message);
    else router.refresh();
    setBusy(false);
  }

  return (
    <article className="grid gap-4 border-b border-primary p-4 md:grid-cols-[80px_1fr]">
      <div className="aspect-square overflow-hidden border border-primary">
        {order.products?.image_url && <img src={order.products.image_url} alt={order.products.title} className="h-full w-full object-cover" />}
      </div>
      <div className="min-w-0">
        <div className="flex flex-wrap justify-between gap-3">
          <div>
            <h3 className="font-label-mono text-label-mono font-bold uppercase">{order.products?.title ?? 'Product'}</h3>
            <p className="mt-1 font-label-mono text-label-mono uppercase text-secondary">
              {order.full_name ?? 'Buyer'} · {new Date(order.created_at).toLocaleDateString()}
            </p>
            <p className="mt-1 font-bold">₹{order.amount.toLocaleString('en-IN')}</p>
          </div>
          <span className="h-fit border border-primary px-3 py-1 font-label-mono text-label-mono uppercase">{order.status}</span>
        </div>
        <p className="mt-3 text-sm text-secondary">
          {[order.address, order.pincode, order.phone].filter(Boolean).join(' · ') || 'No delivery details'}
        </p>
        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
          <input
            aria-label={`Tracking number for ${order.products?.title ?? 'order'}`}
            placeholder="TRACKING NUMBER"
            value={trackingNumber}
            onChange={(event) => setTrackingNumber(event.target.value)}
            className="min-w-0 flex-1 border border-primary bg-transparent px-3 py-2 font-label-mono text-label-mono uppercase"
          />
          <button
            type="button"
            onClick={markShipped}
            disabled={busy || order.status === 'delivered'}
            className="border border-primary bg-primary px-4 py-2 font-label-mono text-label-mono uppercase text-on-primary disabled:opacity-50"
          >
            {busy ? 'Updating…' : order.status === 'shipped' ? 'Update tracking' : 'Mark shipped'}
          </button>
        </div>
      </div>
    </article>
  );
}

export default function SellerOrderManager({ orders }: { orders: SellerOrder[] }) {
  if (orders.length === 0) {
    return <p className="font-label-mono text-label-mono uppercase text-secondary">No sales yet.</p>;
  }

  return (
    <div className="border border-primary divide-y divide-primary">
      {orders.map((order) => <SellerOrderRow key={order.id} order={order} />)}
    </div>
  );
}