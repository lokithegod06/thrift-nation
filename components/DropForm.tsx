'use client';
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

const CATEGORIES = ['T-Shirts', 'Shirts', 'Pants', 'Jackets', 'Shoes', 'Caps'];

export default function DropForm({ userId }: { userId: string }) {
  const router = useRouter();
  const supabase = createClient();
  const [step, setStep] = useState(1);
  const [busy, setBusy] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');
  const [form, setForm] = useState({
    title: '',
    price: '',
    size: '',
    condition: '9/10 Vintage',
    category: 'T-Shirts',
    description: '',
  });

  function onPick(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
  }

  async function publish() {
    if (!file || !form.title || !form.price) return;
    setBusy(true);
    try {
      const ext = file.name.split('.').pop();
      const path = `${userId}/${Date.now()}.${ext}`;
      const { error: upErr } = await supabase.storage.from('products').upload(path, file);
      if (upErr) throw upErr;

      const { data: pub } = supabase.storage.from('products').getPublicUrl(path);

      const { error: insErr } = await supabase.from('products').insert({
        seller_id: userId,
        title: form.title,
        description: form.description,
        price: parseInt(form.price, 10),
        size: form.size,
        condition: form.condition,
        category: form.category,
        image_url: pub.publicUrl,
        status: 'available',
      });
      if (insErr) throw insErr;

      router.push('/profile');
      router.refresh();
    } catch (e: any) {
      alert(e.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto border border-primary bg-surface">
      {/* Progress bar */}
      <div className="flex border-b border-primary">
        {[1, 2, 3].map((n) => (
          <div
            key={n}
            className={`flex-1 py-3 text-center font-label-mono text-label-mono uppercase ${
              step === n ? 'bg-primary text-on-primary' : 'text-secondary'
            }`}
          >
            0{n} · {n === 1 ? 'Photo' : n === 2 ? 'Details' : 'Publish'}
          </div>
        ))}
      </div>

      <div className="p-8">
        {step === 1 && (
          <label className="block cursor-pointer">
            <input type="file" accept="image/*" onChange={onPick} className="hidden" />
            <div className="aspect-square border-2 border-dashed border-primary flex items-center justify-center bg-surface-container-low overflow-hidden">
              {preview ? (
                <img src={preview} alt="preview" className="w-full h-full object-cover" />
              ) : (
                <div className="text-center">
                  <span className="material-symbols-outlined text-5xl">add</span>
                  <p className="font-label-mono text-label-mono uppercase mt-2">Tap to upload</p>
                </div>
              )}
            </div>
          </label>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <input
              placeholder="TITLE (e.g. Vintage Nike Jacket)"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full border border-primary bg-transparent font-label-mono text-label-mono uppercase px-4 py-3 focus:outline-none"
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                placeholder="PRICE (₹)"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                className="w-full border border-primary bg-transparent font-label-mono text-label-mono uppercase px-4 py-3 focus:outline-none"
              />
              <input
                placeholder="SIZE (e.g. L)"
                value={form.size}
                onChange={(e) => setForm({ ...form, size: e.target.value })}
                className="w-full border border-primary bg-transparent font-label-mono text-label-mono uppercase px-4 py-3 focus:outline-none"
              />
            </div>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full border border-primary bg-transparent font-label-mono text-label-mono uppercase px-4 py-3 focus:outline-none"
            >
              {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
            <textarea
              placeholder="SHORT DESCRIPTION (optional)"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full border border-primary bg-transparent font-label-mono text-label-mono uppercase px-4 py-3 focus:outline-none"
              rows={3}
            />
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4 text-center">
            <h3 className="font-headline-md text-headline-md uppercase">Ready to drop?</h3>
            <div className="border border-primary p-4 text-left space-y-2">
              {preview && <img src={preview} className="w-full aspect-square object-cover border border-primary" />}
              <p className="font-label-mono text-label-mono uppercase">{form.title}</p>
              <p className="font-bold">₹{form.price}</p>
              <p className="font-label-mono text-label-mono uppercase text-secondary">
                {form.size} · {form.category}
              </p>
            </div>
          </div>
        )}

        <div className="flex justify-between gap-4 mt-8">
          {step > 1 && (
            <button
              onClick={() => setStep(step - 1)}
              className="px-6 py-3 border border-primary font-label-mono text-label-mono uppercase hover:bg-primary hover:text-on-primary transition-colors"
            >
              Back
            </button>
          )}
          {step < 3 ? (
            <button
              onClick={() => setStep(step + 1)}
              disabled={step === 1 && !file}
              className="flex-1 bg-primary text-on-primary py-3 font-label-mono text-label-mono uppercase border border-primary disabled:opacity-30"
            >
              Next
            </button>
          ) : (
            <button
              onClick={publish}
              disabled={busy}
              className="flex-1 bg-primary text-on-primary py-3 font-label-mono text-label-mono uppercase border border-primary disabled:opacity-30"
            >
              {busy ? 'Publishing…' : 'Publish Drop'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}