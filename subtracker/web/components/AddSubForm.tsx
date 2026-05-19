'use client';
import { useState } from 'react';
import { createClient } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function AddSubForm() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    service_name: '', price: '', billing_cycle: 'monthly',
    next_billing_date: '', trial_end_date: ''
  });
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    await supabase.from('subscriptions').insert({
      user_id: user!.id,
      service_name: form.service_name,
      price: parseFloat(form.price) || 0,
      billing_cycle: form.billing_cycle,
      next_billing_date: form.next_billing_date || null,
      trial_end_date: form.trial_end_date || null
    });
    setForm({ service_name: '', price: '', billing_cycle: 'monthly', next_billing_date: '', trial_end_date: '' });
    setOpen(false);
    setSaving(false);
    router.refresh();
  }

  if (!open) {
    return (
      <button onClick={() => setOpen(true)} className="w-full border-2 border-dashed rounded-lg py-4 mb-6 hover:bg-white text-gray-600 font-medium">
        + Add subscription
      </button>
    );
  }

  return (
    <form onSubmit={save} className="border rounded-lg p-5 mb-6 bg-white space-y-3">
      <input required placeholder="Service name (e.g. Netflix)" value={form.service_name}
        onChange={e => setForm({...form, service_name: e.target.value})}
        className="w-full border rounded px-3 py-2" />
      <div className="grid grid-cols-2 gap-3">
        <input required type="number" step="0.01" placeholder="Price"
          value={form.price} onChange={e => setForm({...form, price: e.target.value})}
          className="border rounded px-3 py-2" />
        <select value={form.billing_cycle} onChange={e => setForm({...form, billing_cycle: e.target.value})}
          className="border rounded px-3 py-2">
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
          <option value="weekly">Weekly</option>
          <option value="trial">Free trial</option>
        </select>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <label className="text-sm">
          Next billing date
          <input type="date" value={form.next_billing_date}
            onChange={e => setForm({...form, next_billing_date: e.target.value})}
            className="w-full border rounded px-3 py-2 mt-1" />
        </label>
        <label className="text-sm">
          Trial ends (if any)
          <input type="date" value={form.trial_end_date}
            onChange={e => setForm({...form, trial_end_date: e.target.value})}
            className="w-full border rounded px-3 py-2 mt-1" />
        </label>
      </div>
      <div className="flex gap-2">
        <button disabled={saving} className="bg-black text-white px-4 py-2 rounded font-medium disabled:opacity-50">
          {saving ? 'Saving...' : 'Save'}
        </button>
        <button type="button" onClick={() => setOpen(false)} className="px-4 py-2 rounded border">Cancel</button>
      </div>
    </form>
  );
}
