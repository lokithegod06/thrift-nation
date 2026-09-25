import Link from 'next/link';

type Product = {
  id: string;
  title: string;
  price: number;
  size: string | null;
  image_url: string;
  status: string;
  profiles?: { username: string; display_name: string } | null;
};

export default function ProductCard({ p }: { p: Product }) {
  const sold = p.status === 'sold';
  return (
    <Link href={`/product/${p.id}`} className="group block">
      <div className="relative aspect-square border border-primary overflow-hidden bg-surface-container-low">
        <img
          src={p.image_url}
          alt={p.title}
          className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${sold ? 'opacity-50' : ''}`}
        />
        {sold && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none bg-white/70 backdrop-grayscale">
            <span className="bg-primary text-on-primary w-full py-2 text-center font-label-mono text-label-mono uppercase tracking-[0.2em] -rotate-12">
              SOLD
            </span>
          </div>
        )}
      </div>
      <div className="mt-4">
        <div className="flex justify-between items-start">
          <h3 className="font-label-mono text-label-mono uppercase text-primary">{p.title}</h3>
          <span className="font-label-mono text-label-mono text-secondary">{p.size}</span>
        </div>
        <p className="font-bold text-lg mt-1">₹{p.price.toLocaleString('en-IN')}</p>
        {p.profiles && (
          <p className="font-label-mono text-[10px] uppercase text-secondary mt-1">
            @{p.profiles.username}
          </p>
        )}
      </div>
    </Link>
  );
}