'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AppHeader from '@/components/AppHeader';
import BottomNav from '@/components/BottomNav';
import AddSubscriptionSheet from '@/components/AddSubscriptionSheet';
import InstallPrompt from '@/components/InstallPrompt';
import CalendarView from '@/components/CalendarView';

type Sub = {
  id: string;
  service_name: string;
  price: number;
  currency: string;
  billing_cycle: string;
  next_billing_date: string | null;
  pending_confirmation?: boolean;
};

const COLORS = ['#E50914', '#1DB954', '#FF0000', '#007AFF', '#74AA9C', '#FF6B35', '#9C27B0', '#FFC107', '#E91E63', '#00BCD4', '#795548', '#3F51B5'];
const KNOWN: Record<string, string> = {
  'netflix': '#E50914', 'spotify': '#1DB954', 'youtube': '#FF0000', 'youtube premium': '#FF0000',
  'icloud': '#007AFF', 'icloud+': '#007AFF', 'chatgpt': '#74AA9C', 'chatgpt plus': '#74AA9C',
  'apple tv+': '#000000', 'disney+': '#113CCF', 'amazon prime': '#FF9900', 'hbo max': '#9000FF',
  'github': '#181717', 'figma': '#F24E1E', 'notion': '#000000', 'dropbox': '#0061FF',
  'adobe creative cloud': '#DA1F26', 'google one': '#4285F4', 'gmail': '#EA4335',
  'youtube music': '#FF0000', 'paramount+': '#0064FF', 'peacock': '#000000', 'hulu': '#1CE783',
  'tidal': '#000000', 'discord': '#5865F2', 'twitch': '#9146FF', 'linkedin premium': '#0A66C2',
  'duolingo': '#58CC02', 'audible': '#F8991C', 'evernote': '#00A82D', 'slack': '#4A154B',
  'zoom': '#2D8CFF', 'canva': '#00C4CC', 'grammarly': '#15C39A',
};
function colorForName(name: string): string {
  const key = name.toLowerCase().trim();
  if (KNOWN[key]) return KNOWN[key];
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return COLORS[Math.abs(hash) % COLORS.length];
}

export default function DashboardClient(props: { firstName: string; subscriptions: Sub[] }) {
  const { firstName, subscriptions } = props;
  const [sheetOpen, setSheetOpen] = useState(false);
  const [view, setView] = useState<'list' | 'calendar'>('list');
  const router = useRouter();

  const pendingSubs = subscriptions.filter(s => s.pending_confirmation);
  const confirmedSubs = subscriptions.filter(s => !s.pending_confirmation);
  const hasSubs = subscriptions.length > 0;

  const monthlyTotal = confirmedSubs.reduce((sum, s) => {
    if (s.billing_cycle === 'yearly') return sum + s.price / 12;
    if (s.billing_cycle === 'weekly') return sum + s.price * 4.33;
    return sum + s.price;
  }, 0);

  async function handleAction(id: string, action: 'confirm' | 'reject') {
    await fetch('/api/confirm-subscription', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, action }),
    });
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-surface-container-low pb-20">
      <AppHeader />

      <div className="max-w-md mx-auto w-full px-6">
        <div className="mb-3">
          <p className="text-xs text-on-surface-variant mb-0.5">Hey {firstName}</p>
          <h1 className="text-xl font-bold text-on-surface">Your subscripti
cat > "/Users/mmm/Downloads/Claude Projects/subtracker_v2/app/dashboard/DashboardClient.tsx" << 'EOF'
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AppHeader from '@/components/AppHeader';
import BottomNav from '@/components/BottomNav';
import AddSubscriptionSheet from '@/components/AddSubscriptionSheet';
import InstallPrompt from '@/components/InstallPrompt';
import CalendarView from '@/components/CalendarView';

type Sub = {
  id: string;
  service_name: string;
  price: number;
  currency: string;
  billing_cycle: string;
  next_billing_date: string | null;
  pending_confirmation?: boolean;
};

const COLORS = ['#E50914', '#1DB954', '#FF0000', '#007AFF', '#74AA9C', '#FF6B35', '#9C27B0', '#FFC107', '#E91E63', '#00BCD4', '#795548', '#3F51B5'];
const KNOWN: Record<string, string> = {
  'netflix': '#E50914', 'spotify': '#1DB954', 'youtube': '#FF0000', 'youtube premium': '#FF0000',
  'icloud': '#007AFF', 'icloud+': '#007AFF', 'chatgpt': '#74AA9C', 'chatgpt plus': '#74AA9C',
  'apple tv+': '#000000', 'disney+': '#113CCF', 'amazon prime': '#FF9900', 'hbo max': '#9000FF',
  'github': '#181717', 'figma': '#F24E1E', 'notion': '#000000', 'dropbox': '#0061FF',
  'adobe creative cloud': '#DA1F26', 'google one': '#4285F4', 'gmail': '#EA4335',
  'youtube music': '#FF0000', 'paramount+': '#0064FF', 'peacock': '#000000', 'hulu': '#1CE783',
  'tidal': '#000000', 'discord': '#5865F2', 'twitch': '#9146FF', 'linkedin premium': '#0A66C2',
  'duolingo': '#58CC02', 'audible': '#F8991C', 'evernote': '#00A82D', 'slack': '#4A154B',
  'zoom': '#2D8CFF', 'canva': '#00C4CC', 'grammarly': '#15C39A',
};
function colorForName(name: string): string {
  const key = name.toLowerCase().trim();
  if (KNOWN[key]) return KNOWN[key];
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return COLORS[Math.abs(hash) % COLORS.length];
}

export default function DashboardClient(props: { firstName: string; subscriptions: Sub[] }) {
  const { firstName, subscriptions } = props;
  const [sheetOpen, setSheetOpen] = useState(false);
  const [view, setView] = useState<'list' | 'calendar'>('list');
  const router = useRouter();

  const pendingSubs = subscriptions.filter(s => s.pending_confirmation);
  const confirmedSubs = subscriptions.filter(s => !s.pending_confirmation);
  const hasSubs = subscriptions.length > 0;

  const monthlyTotal = confirmedSubs.reduce((sum, s) => {
    if (s.billing_cycle === 'yearly') return sum + s.price / 12;
    if (s.billing_cycle === 'weekly') return sum + s.price * 4.33;
    return sum + s.price;
  }, 0);

  async function handleAction(id: string, action: 'confirm' | 'reject') {
    await fetch('/api/confirm-subscription', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, action }),
    });
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-surface-container-low pb-20">
      <AppHeader />

      <div className="max-w-md mx-auto w-full px-6">
        <div className="mb-3">
          <p className="text-xs text-on-surface-variant mb-0.5">Hey {firstName}</p>
          <h1 className="text-xl font-bold text-on-surface">Your subscriptions</h1>
        </div>

        {confirmedSubs.length > 0 && (
          <div className="bg-primary text-white rounded-2xl p-4 mb-3 shadow-sm">
            <p className="text-xs opacity-90 mb-0.5">Monthly total</p>
            <p className="text-2xl font-bold mb-1">${monthlyTotal.toFixed(2)}</p>
            <p className="text-xs opacity-90">{confirmedSubs.length} active {confirmedSubs.length === 1 ? 'subscription' : 'subscriptions'}</p>
          </div>
        )}

        {hasSubs && (
          <div className="bg-white rounded-full p-1 mb-3 inline-flex w-full border border-outline-variant">
            <button onClick={() => setView('list')} className={`flex-1 h-9 rounded-full text-sm font-semibold transition-colors ${view === 'list' ? 'bg-primary text-white' : 'text-on-surface-variant'}`}>List</button>
            <button onClick={() => setView('calendar')} className={`flex-1 h-9 rounded-full text-sm font-semibold transition-colors ${view === 'calendar' ? 'bg-primary text-white' : 'text-on-surface-variant'}`}>Calendar</button>
          </div>
        )}

        {!hasSubs && <EmptyState onAdd={() => setSheetOpen(true)} />}

        {hasSubs && view === 'list' && (
          <div className="space-y-3">
            {pendingSubs.length > 0 && (
              <div className="mb-2">
                <p className="text-xs font-semibold text-amber-600 mb-2 uppercase tracking-wide">
                  ⚡ {pendingSubs.length} detected from email
                </p>
                {pendingSubs.map((sub) => (
                  <PendingSubCard key={sub.id} sub={sub} onAction={handleAction} />
                ))}
              </div>
            )}
            {confirmedSubs.map((sub) => <SubCard key={sub.id} sub={sub} />)}
          </div>
        )}

        {hasSubs && view === 'calendar' && <CalendarView subscriptions={confirmedSubs} />}
      </div>

      <button onClick={() => setSheetOpen(true)} aria-label="Add subscription" className="fixed bottom-24 right-6 w-14 h-14 bg-primary text-white rounded-full shadow-lg flex items-center justify-center hover:scale-105 transition-transform" style={{ boxShadow: '0 8px 24px rgba(109,59,215,0.4)' }}>
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="5" x2="12" y2="19"/>
          <line x1="5" y1="12" x2="19" y2="12"/>
        </svg>
      </button>

      <BottomNav active="dashboard" />
      <AddSubscriptionSheet open={sheetOpen} onClose={() => setSheetOpen(false)} />
      <InstallPrompt />
    </main>
  );
}

function PendingSubCard({ sub, onAction }: { sub: Sub; onAction: (id: string, action: 'confirm' | 'reject') => void }) {
  const initial = sub.service_name.charAt(0).toUpperCase();
  const color = colorForName(sub.service_name);
  const [loading, setLoading] = useState(false);

  async function handle(action: 'confirm' | 'reject') {
    setLoading(true);
    await onAction(sub.id, action);
  }

  return (
    <div className="w-full bg-amber-50 rounded-2xl p-4 border-2 border-amber-300 mb-2">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-11 h-11 rounded-xl text-white flex items-center justify-center font-bold text-lg shrink-0" style={{ background: color }}>
          {initial}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-on-surface truncate">{sub.service_name}</p>
          <p className="text-sm text-on-surface-variant">Detected from email</p>
        </div>
        <div className="text-right shrink-0">
          <p className="font-semibold text-on-surface">${sub.price.toFixed(2)}</p>
          <p className="text-xs text-on-surface-variant">/{sub.billing_cycle === 'yearly' ? 'yr' : 'mo'}</p>
        </div>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => handle('reject')}
          disabled={loading}
          className="flex-1 h-10 rounded-xl border border-outline-variant text-on-surface font-semibold text-sm disabled:opacity-50"
        >
          Not mine
        </button>
        <button
          onClick={() => handle('confirm')}
          disabled={loading}
          className="flex-1 h-10 rounded-xl bg-primary text-white font-semibold text-sm disabled:opacity-50"
        >
          Confirm
        </button>
      </div>
    </div>
  );
}

function SubCard({ sub }: { sub: Sub }) {
  const initial = sub.service_name.charAt(0).toUpperCase();
  const date = sub.next_billing_date ? new Date(sub.next_billing_date) : null;
  const dateLabel = date ? date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'No date';
  const color = colorForName(sub.service_name);

  return (
    <Link href={`/subscription/${sub.id}`} className="w-full bg-white rounded-2xl p-4 border border-outline-variant flex items-center gap-3 text-left hover:shadow-sm transition-shadow">
      <div className="w-11 h-11 rounded-xl text-white flex items-center justify-center font-bold text-lg shrink-0" style={{ background: color }}>
        {initial}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-on-surface truncate">{sub.service_name}</p>
        <p className="text-sm text-on-surface-variant">Next: {dateLabel}</p>
      </div>
      <div className="text-right shrink-0">
        <p className="font-semibold text-on-surface">${sub.price.toFixed(2)}</p>
        <p className="text-xs text-on-surface-variant">/{sub.billing_cycle === 'yearly' ? 'yr' : sub.billing_cycle === 'weekly' ? 'wk' : 'mo'}</p>
      </div>
    </Link>
  );
}

function EmptyState({ onAdd }: { onAdd: () => void }) {
  return (
    <div className="bg-white rounded-2xl p-8 border border-outline-variant text-center">
      <div className="w-20 h-20 mx-auto mb-5 rounded-2xl flex items-center justify-center" style={{ background: '#f0e9ff' }}>
        <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="#6d3bd7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
          <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
        </svg>
      </div>
      <h2 className="text-xl font-bold text-on-surface mb-2">No subscriptions yet</h2>
      <p className="text-on-surface-variant text-sm leading-relaxed mb-6 max-w-xs mx-auto">
        Add your first subscription manually, or forward a receipt to your inbox.
      </p>
      <button onClick={onAdd} className="w-full bg-primary text-white font-semibold py-4 rounded-xl">
        + Add your first subscription
      </button>
    </div>
  );
}
