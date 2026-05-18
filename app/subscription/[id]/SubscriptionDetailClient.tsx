'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase-client';
import AddSubscriptionSheet from '@/components/AddSubscriptionSheet';

type Sub = {
  id: string;
  service_name: string;
  price: number;
  currency: string;
  billing_cycle: string;
  next_billing_date: string | null;
  trial_end_date: string | null;
  auto_detected: boolean;
  created_at: string;
};

const KNOWN: Record<string, string> = {
  'netflix': '#E50914', 'spotify': '#1DB954', 'youtube': '#FF0000', 'youtube premium': '#FF0000',
  'icloud': '#007AFF', 'icloud+': '#007AFF', 'chatgpt': '#74AA9C', 'chatgpt plus': '#74AA9C',
  'apple tv+': '#000000', 'disney+': '#113CCF', 'amazon prime': '#FF9900', 'hbo max': '#9000FF',
  'github': '#181717', 'figma': '#F24E1E', 'notion': '#000000', 'dropbox': '#0061FF',
  'adobe creative cloud': '#DA1F26', 'google one': '#4285F4',
};
const PALETTE = ['#E50914', '#1DB954', '#FF0000', '#007AFF', '#74AA9C', '#FF6B35', '#9C27B0', '#FFC107', '#E91E63', '#00BCD4', '#795548', '#3F51B5'];
function colorFor(name: string): string {
  const k = name.toLowerCase().trim();
  if (KNOWN[k]) return KNOWN[k];
  let h = 0;
  for (let i = 0; i < name.length; i++) h = name.charCodeAt(i) + ((h << 5) - h);
  return PALETTE[Math.abs(h) % PALETTE.length];
}
function daysUntil(iso: string | null): number | null {
  if (!iso) return null;
  const diff = new Date(iso).getTime() - new Date().setHours(0, 0, 0, 0);
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export default function SubscriptionDetailClient({ subscription }: { subscription: Sub }) {
  const router = useRouter();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const color = colorFor(subscription.service_name);
  const initial = subscription.service_name.charAt(0).toUpperCase();
  const days = daysUntil(subscription.next_billing_date);
  const dateNice = subscription.next_billing_date
    ? new Date(subscription.next_billing_date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
    : 'Not set';
  const cycleLabel = subscription.billing_cycle === 'yearly' ? 'Yearly' : subscription.billing_cycle === 'weekly' ? 'Weekly' : 'Monthly';

  async function handleDelete() {
    setDeleting(true);
    const supabase = createClient();
    const { error } = await supabase.from('subscriptions').delete().eq('id', subscription.id);
    if (error) { setDeleting(false); alert('Failed to remove: ' + error.message); return; }
    router.push('/dashboard');
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-surface-container-low pb-12">
      <div className="px-6 pt-4 pb-2 flex items-center justify-between h-16">
        <Link href="/dashboard" aria-label="Back" className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-surface-container">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#241916" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </Link>
        <div className="w-11 h-11" />
      </div>

      <div className="max-w-md mx-auto w-full px-6">
        <div className="rounded-3xl p-6 text-white mb-4" style={{ background: color }}>
          <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center font-bold text-3xl mb-4">{initial}</div>
          <h1 className="text-3xl font-bold mb-1">{subscription.service_name}</h1>
          <p className="text-white/90 capitalize">{cycleLabel} · {subscription.currency}</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-outline-variant mb-4">
          <p className="text-xs text-on-surface-variant mb-1">Next charge</p>
          <p className="text-2xl font-bold text-on-surface mb-1">${subscription.price.toFixed(2)} {subscription.currency}</p>
          <p className="text-sm text-on-surface-variant mb-3">{dateNice}</p>
          {days !== null && days >= 0 && (
            <div className="inline-block px-3 py-1.5 rounded-full text-sm font-semibold" style={{ background: '#f0e9ff', color: '#6d3bd7' }}>
              {days === 0 ? 'Today' : days === 1 ? 'Tomorrow' : `in ${days} days`}
            </div>
          )}
          {days !== null && days < 0 && (
            <div className="inline-block px-3 py-1.5 rounded-full text-sm font-semibold bg-red-50 text-red-700">
              {Math.abs(days)} {Math.abs(days) === 1 ? 'day' : 'days'} ago
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl p-5 border border-outline-variant mb-4">
          <h3 className="font-semibold text-on-surface mb-3">Details</h3>
          <div className="space-y-3">
            <Row label="Billing cycle" value={cycleLabel} />
            <Row label="Currency" value={subscription.currency} />
            {subscription.trial_end_date && <Row label="Trial ends" value={new Date(subscription.trial_end_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} />}
            <Row label="Added on" value={new Date(subscription.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} />
            <Row label="Source" value={subscription.auto_detected ? 'Auto-detected' : 'Manual'} />
          </div>
        </div>

        <div className="space-y-3">
          <button onClick={() => setEditOpen(true)} className="w-full bg-white border border-outline-variant text-on-surface font-semibold py-4 rounded-xl hover:bg-surface-container-low">
            Edit
          </button>
          <button onClick={() => setConfirmDelete(true)} className="w-full bg-white border border-red-200 text-red-700 font-semibold py-4 rounded-xl hover:bg-red-50">
            Remove from tracker
          </button>
        </div>
      </div>

      {confirmDelete && (
        <>
          <div onClick={() => !deleting && setConfirmDelete(false)} className="fixed inset-0 bg-black/50 z-40" />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <div className="bg-white rounded-3xl p-6 max-w-sm w-full">
              <h3 className="text-xl font-bold text-on-surface mb-2">Remove from your tracker?</h3>
              <p className="text-on-surface-variant text-sm mb-6">
                This only removes <strong>{subscription.service_name}</strong> from SubAlert. It does NOT cancel your subscription with the provider — you will still be charged. To cancel, go to the service directly.
              </p>
              <div className="flex gap-3">
                <button onClick={() => setConfirmDelete(false)} disabled={deleting} className="flex-1 h-12 rounded-xl border border-outline-variant text-on-surface font-semibold disabled:opacity-50">Cancel</button>
                <button onClick={handleDelete} disabled={deleting} className="flex-1 h-12 rounded-xl bg-red-600 text-white font-semibold disabled:opacity-50">
                  {deleting ? 'Removing...' : 'Remove'}
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      <AddSubscriptionSheet open={editOpen} onClose={() => setEditOpen(false)} existing={subscription} />
    </main>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-sm text-on-surface-variant">{label}</span>
      <span className="text-sm font-medium text-on-surface">{value}</span>
    </div>
  );
}
