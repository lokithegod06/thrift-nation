import { createClient } from '@/lib/supabase/server';
import ProductCard from '@/components/ProductCard';

export default async function DiscoverPage() {
  const supabase = createClient();
  const { data: drops } = await supabase
    .from('products')
    .select('id, title, price, size, image_url, status, profiles(username, display_name)')
    .eq('status', 'available')
    .order('created_at', { ascending: false })
    .limit(40);

  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-12 py-12">
      <h1 className="font-headline-lg text-headline-lg uppercase mb-8">DISCOVER</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {drops?.map((p: any) => <ProductCard key={p.id} p={p} />)}
      </div>
    </div>
  );
}