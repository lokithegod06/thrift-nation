import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function OrdersPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: orders } = await supabase
    .from('orders')
    .select('*, products(title, image_url, price)')
    .eq('buyer_id', user.id)
    .order('created_at', { ascending: false });

  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-12 py-12">
      <h1 className="font-headline-lg text-headline-lg uppercase mb-8">ORDERS</h1>
      {!orders || orders.length === 0 ? (
        <p className="font-label-mono text-label-mono uppercase text-secondary">No orders yet.</p>
      ) : (
        <div className="border border-primary divide-y divide-primary">
          {orders.map((o: any) => (
            <div key={o.id} className="p-4 flex items-center gap-4">
              <img src={o.products?.image_url} className="w-20 h-20 object-cover border border-primary" />
              <div className="flex-grow">
                <p className="font-label-mono text-label-mono uppercase">{o.products?.title}</p>
                <p className="font-label-mono text-label-mono uppercase text-secondary text-[10px] mt-1">
                  {new Date(o.created_at).toLocaleDateString()}
                </p>
              </div>
              <p className="font-bold">₹{o.amount.toLocaleString('en-IN')}</p>
              <span className="font-label-mono text-label-mono uppercase border border-primary px-3 py-1">
                {o.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}