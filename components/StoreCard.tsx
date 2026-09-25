import Link from 'next/link';

export default function StoreCard({ store }: { store: any }) {
  return (
    <Link
      href={`/store/thriftnationX${store.username}`}
      className="flex-shrink-0 w-72 bg-surface border border-primary p-4 block hover:bg-surface-container-low"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-14 h-14 border border-primary overflow-hidden">
          {store.avatar_url ? (
            <img src={store.avatar_url} alt={store.username} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-primary text-on-primary flex items-center justify-center font-headline-md">
              {store.display_name?.[0] ?? '?'}
            </div>
          )}
        </div>
        <div>
          <h4 className="font-headline-md text-headline-md uppercase leading-none">{store.display_name}</h4>
          <span className="font-label-mono text-label-mono uppercase text-secondary">
            @{store.username}
          </span>
        </div>
      </div>
      <p className="font-label-mono text-label-mono uppercase text-secondary line-clamp-2">
        {store.bio}
      </p>
    </Link>
  );
}