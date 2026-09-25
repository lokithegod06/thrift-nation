import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';

export default async function TopNav() {
  const supabase = createClient();

  // Top brands by follower count (fallback: newest profiles)
  const { data: top } = await supabase
    .from('profiles')
    .select('username, display_name')
    .order('created_at', { ascending: false })
    .limit(3);

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
            className="font-label-mono text-label-mono uppercase text-secondary hover:bg-primary hover:text-on-primary px-3 py-2 transition-colors"
          >
            {t.display_name}
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