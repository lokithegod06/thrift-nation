'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

type Product = {
  id: string;
  title: string;
  description: string | null;
  price: number;
  size: string | null;
  condition: string | null;
  category: string | null;
  image_url: string;
  status: string;
};

export default function ProductManager({ products }: { products: Product[] }) {
  const router = useRouter();
  const supabase = createClient();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    size: '',
    condition: '',
    category: '',
  });
  const [busyId, setBusyId] = useState<string | null>(null);

  function beginEdit(product: Product) {
    setEditingId(product.id);
    setForm({
      title: product.title,
      description: product.description ?? '',
      price: String(product.price),
      size: product.size ?? '',
      condition: product.condition ?? '',
      category: product.category ?? '',
    });
  }

  async function saveEdit(productId: string) {
    const price = Number(form.price);
    if (!form.title.trim() || !Number.isInteger(price) || price <= 0) {
      alert('Enter a title and a valid price.');
      return;
    }

    setBusyId(productId);
    const { error } = await supabase
      .from('products')
      .update({
        title: form.title.trim(),
        description: form.description.trim() || null,
        price,
        size: form.size.trim() || null,
        condition: form.condition.trim() || null,
        category: form.category.trim() || null,
      })
      .eq('id', productId);

    if (error) alert(error.message);
    else {
      setEditingId(null);
      router.refresh();
    }
    setBusyId(null);
  }

  async function deleteProduct(product: Product) {
    if (!window.confirm(`Delete “${product.title}”? This cannot be undone.`)) return;
    setBusyId(product.id);
    const { error } = await supabase.from('products').delete().eq('id', product.id);
    if (error) alert(error.message);
    else router.refresh();
    setBusyId(null);
  }

  if (products.length === 0) {
    return <p className="font-label-mono text-label-mono uppercase text-secondary">No drops yet.</p>;
  }

  return (
    <div className="border-t border-primary">
      {products.map((product) => (
        <article key={product.id} className="grid gap-4 border-b border-primary py-5 md:grid-cols-[112px_1fr]">
          <Link href={`/product/${product.id}`} className="block aspect-square overflow-hidden border border-primary">
            <img src={product.image_url} alt={product.title} className="h-full w-full object-cover" />
          </Link>
          <div className="min-w-0">
            {editingId === product.id ? (
              <div className="grid gap-3 sm:grid-cols-2">
                <input aria-label="Product title" value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} className="border border-primary bg-transparent px-3 py-2 font-label-mono text-label-mono uppercase sm:col-span-2" />
                <input aria-label="Price in rupees" type="number" min="1" value={form.price} onChange={(event) => setForm({ ...form, price: event.target.value })} className="border border-primary bg-transparent px-3 py-2 font-label-mono text-label-mono" />
                <input aria-label="Size" placeholder="SIZE" value={form.size} onChange={(event) => setForm({ ...form, size: event.target.value })} className="border border-primary bg-transparent px-3 py-2 font-label-mono text-label-mono uppercase" />
                <input aria-label="Condition" placeholder="CONDITION" value={form.condition} onChange={(event) => setForm({ ...form, condition: event.target.value })} className="border border-primary bg-transparent px-3 py-2 font-label-mono text-label-mono uppercase" />
                <input aria-label="Category" placeholder="CATEGORY" value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value })} className="border border-primary bg-transparent px-3 py-2 font-label-mono text-label-mono uppercase" />
                <textarea aria-label="Description" placeholder="DESCRIPTION" rows={3} value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} className="border border-primary bg-transparent px-3 py-2 font-label-mono text-label-mono uppercase sm:col-span-2" />
                <div className="flex gap-2 sm:col-span-2">
                  <button type="button" onClick={() => saveEdit(product.id)} disabled={busyId === product.id} className="border border-primary bg-primary px-4 py-2 font-label-mono text-label-mono uppercase text-on-primary disabled:opacity-50">
                    {busyId === product.id ? 'Saving…' : 'Save'}
                  </button>
                  <button type="button" onClick={() => setEditingId(null)} className="border border-primary px-4 py-2 font-label-mono text-label-mono uppercase">Cancel</button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="font-label-mono text-label-mono font-bold uppercase">{product.title}</h3>
                    <p className="mt-1 font-label-mono text-label-mono uppercase text-secondary">
                      ₹{product.price.toLocaleString('en-IN')} · {product.status}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Link href={`/product/${product.id}`} className="border border-primary px-3 py-2 font-label-mono text-label-mono uppercase hover:bg-primary hover:text-on-primary">View</Link>
                    <button type="button" onClick={() => beginEdit(product)} className="border border-primary px-3 py-2 font-label-mono text-label-mono uppercase hover:bg-primary hover:text-on-primary">Edit</button>
                    <button type="button" onClick={() => deleteProduct(product)} disabled={busyId === product.id || product.status === 'sold'} title={product.status === 'sold' ? 'Ordered products cannot be deleted' : 'Delete product'} className="border border-primary px-3 py-2 font-label-mono text-label-mono uppercase hover:bg-primary hover:text-on-primary disabled:opacity-50">{busyId === product.id ? 'Deleting…' : 'Delete'}</button>
                  </div>
                </div>
                {product.description && <p className="mt-3 text-sm text-secondary">{product.description}</p>}
              </>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}