'use client';

import Link from 'next/link';

export default function StoreCard({ store }: { store: any }) {
  const initial = store.display_name?.[0]?.toUpperCase() ?? '?';
  const hasAvatar = store.avatar_url && store.avatar_url.trim() !== '';

  return (
    <Link
      href={`/store/thriftnationX${store.username}`}
      className="flex-shrink-0 w-72 bg-surface text-primary border border-primary p-4 block hover:bg-surface-container-low transition-colors"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-14 h-14 border border-primary overflow-hidden shrink-0 bg-primary text-on-primary flex items-center justify-center">
          {hasAvatar ? (
            <img
              src={store.avatar_url}
              alt={store.username}
              className="w-full h-full object-cover"
              onError={(e) => {
                // If image fails to load, hide it and reveal initial behind
                (e.currentTarget as HTMLImageElement).style.display = 'none';
                const parent = e.currentTarget.parentElement;
                if (parent) {
                  parent.setAttribute('data-fallback', 'true');
                }
              }}
            />
          ) : (
            <span className="font-headline-md text-headline-md">{initial}</span>
          )}
        </div>
        <div className="min-w-0">
          <h4 className="font-headline-md text-headline-md uppercase leading-none text-primary truncate">
            {store.display_name}
          </h4>
          <span className="font-label-mono text-label-mono uppercase text-secondary">
            @{store.username}
          </span>
        </div>
      </div>
      <p className="font-label-mono text-label-mono uppercase text-secondary line-clamp-2">
        {store.bio || 'Vintage curator.'}
      </p>
    </Link>
  );
}