import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function ProfilePage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single();
  if (!profile) redirect('/login');

  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-12 py-12">
      <div className="flex flex-col md:flex-row items-start gap-8">
        <div className="w-32 h-32 border border-primary overflow-hidden">
          {profile.avatar_url ? (
            <img src={profile.avatar_url} className="w-full h-full object-cover grayscale" />
          ) : (
            <div className="w-full h-full bg-primary text-on-primary flex items-center justify-center font-headline-lg">
              {profile.display_name[0]}
            </div>
          )}
        </div>
        <div>
          <h1 className="font-headline-lg text-headline-lg uppercase">{profile.display_name}</h1>
          <p className="font-label-mono text-label-mono uppercase text-secondary mt-2">
            Your store: thriftnationX{profile.username}
          </p>
          <div className="flex gap-2 mt-4">
            <Link
              href={`/store/thriftnationX${profile.username}`}
              className="bg-primary text-on-primary px-6 py-2 font-label-mono text-label-mono uppercase border border-primary hover:bg-surface hover:text-primary"
            >
              View Store
            </Link>
            <Link
              href="/drop"
              className="px-6 py-2 border border-primary font-label-mono text-label-mono uppercase hover:bg-primary hover:text-on-primary"
            >
              + New Drop
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}