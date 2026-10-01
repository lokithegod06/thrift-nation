'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function FollowButton({
  storeId,
  viewerId,
  initialFollowing,
}: {
  storeId: string;
  viewerId: string | null;
  initialFollowing: boolean;
}) {
  const router = useRouter();
  const supabase = createClient();
  const [following, setFollowing] = useState(initialFollowing);
  const [busy, setBusy] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const isOwner = viewerId === storeId;

  async function toggleFollow() {
    if (!viewerId) {
      router.push('/login');
      return;
    }
    if (isOwner || busy) return;

    setBusy(true);
    setErrorMessage('');
    const result = following
      ? await supabase.from('follows').delete().eq('follower_id', viewerId).eq('following_id', storeId)
      : await supabase.from('follows').insert({ follower_id: viewerId, following_id: storeId });

    if (result.error) {
      setErrorMessage('Could not update follow. Try again.');
    } else {
      setFollowing(!following);
      router.refresh();
    }
    setBusy(false);
  }

  return (
    <div>
      <button
        type="button"
        onClick={toggleFollow}
        disabled={isOwner || busy}
        aria-pressed={following}
        className="border border-primary px-6 py-2 font-label-mono text-label-mono uppercase transition-colors hover:bg-surface hover:text-primary disabled:cursor-default disabled:opacity-60"
      >
        {isOwner ? 'Your Store' : busy ? 'Updating…' : following ? 'Following' : 'Follow'}
      </button>
      {errorMessage && <p role="alert" className="mt-2 font-label-mono text-label-mono text-secondary">{errorMessage}</p>}
    </div>
  );
}