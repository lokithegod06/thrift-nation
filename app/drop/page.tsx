import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import DropForm from '@/components/DropForm';

export default async function DropPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-12 py-12">
      <h1 className="font-headline-lg text-headline-lg uppercase mb-2">DROP A PRODUCT</h1>
      <p className="font-label-mono text-label-mono uppercase text-secondary mb-8">
        Under 30 seconds. Story-style.
      </p>
      <DropForm userId={user.id} />
    </div>
  );
}