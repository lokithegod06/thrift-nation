import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';

export default async function TopNav() {
  const supabase = createClient();

  const { data: profiles } = await supabase
    .from('profiles')
    .select('id, username, display_name');

  const [{ data: follows }, { data: soldProducts }] = await Promise.all([
    supabase.from('follows').select('following_id'),
    supabase.from('products').select('seller_id').eq('status', 'sold'),
  ]);

  const followerCounts = new Map<string, number>();
  follows?.forEach(({ following_id }) => {
    followerCounts.set(following_id, (followerCounts.get(following_id) ?? 0) + 1);
  });

  const soldCounts = new Map<string, number>();
  soldProducts?.forEach(({ seller_id }) => {
    soldCounts.set(seller_id, (soldCounts.get(seller_id) ?? 0) + 1);
  });

  const top = (profiles ?? [])
    .map((profile) => ({
      ...profile,
      followerCount: followerCounts.get(profile.id) ?? 0,
      soldCount: soldCounts.get(profile.id) ?? 0,
    }))
    .sort((left, right) => right.followerCount - left.followerCount || right.soldCount - left.soldCount)
    .slice(0, 3);

  const { data: { user } } = await supabase.auth.getUser();

  return (
    <header className="fixed top-0 left-0 right-0 h-20 z-50 bg-surface border-b border-primary flex justify-between items-center px-4 md:px-12">
      <Link href="/" className="font-headline-lg text-headline-lg-mobile md:text-headline-lg uppercase tracking-tighter">
        THRIFT NATION
      </Link>

      <nav className="hidden md:flex items-center gap-8">
        {top?.map((t) => (
          <Link
            key={t.username}
            href={`/store/thriftnationX${t.username}`}
            className="flex flex-col px-3 py-2 font-label-mono text-label-mono uppercase text-secondary transition-colors hover:bg-primary hover:text-on-primary"
          >
            <span>{t.display_name}</span>
            <span className="text-[9px]">{t.followerCount} followers · {t.soldCount} sold</span>
          </Link>
        ))}
      </nav>

      <div className="flex items-center gap-4">
        <Link href="/discover" className="material-symbols-outlined text-primary text-2xl">search</Link>
        <Link href="/orders" className="material-symbols-outlined text-primary text-2xl">receipt_long</Link>
        {user ? (
          <Link href="/profile" className="material-symbols-outlined text-primary text-2xl">person</Link>
        ) : (
          <Link href="/login" className="font-label-mono text-label-mono uppercase border border-primary px-3 py-1">
            Sign in
          </Link>
        )}
      </div>
    </header>
  );
}