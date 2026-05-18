import { createServer } from '@/lib/supabase-server';
import { redirect } from 'next/navigation';
import BottomNav from '@/components/BottomNav';
import AppHeader from '@/components/AppHeader';
import Link from 'next/link';

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

type Sub = {
  id: string;
  service_name: string;
  price: number;
  currency: string;
  next_billing_date: string | null;
  trial_end_date: string | null;
};

function daysUntil(iso: string): number {
  const diff = new Date(iso).getTime() - new Date().setHours(0, 0, 0, 0);
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export default async function AlertsPage() {
  const supabase = createServer();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: subs } = await supabase
    .from('subscriptions')
    .select('id, service_name, price, currency, next_billing_date, trial_end_date')
    .eq('user_id', user.id)
    .eq('active', true)
    .order('next_billing_date', { ascending: true });

  const subscriptions: Sub[] = subs || [];

  const today: Sub[] = [];
  const overdue: Sub[] = [];
  const upcoming: Sub[] = []; // 1-7 days
  const later: Sub[] = [];    // 8-30 days

  subscriptions.forEach((s) => {
    if (!s.next_billing_date) return;
    const d = daysUntil(s.next_billing_date);
    if (d < 0) overdue.push(s);
    else if (d === 0) today.push(s);
    else if (d <= 7) upcoming.push(s);
    else if (d <= 30) later.push(s);
  });

  const hasAny = today.length + overdue.length + upcoming.length + later.length > 0;

  return (
    <main className="min-h-screen bg-surface-container-low pb-20">
      <AppHeader />
      <div className="max-w-md mx-auto w-full px-6">
        <div className="mb-3">
          <p className="text-xs text-on-surface-variant mb-0.5">Stay on top</p>
          <h1 className="text-xl font-bold text-on-surface">Alerts</h1>
        </div>

        {!hasAny && <EmptyState />}

        {overdue.length > 0 && (
          <Section title="Overdue" subtitle={`${overdue.length} past due`} urgent>
            {overdue.map((s) => <AlertCard key={s.id} sub={s} urgent />)}
          </Section>
        )}

        {today.length > 0 && (
          <Section title="Today" subtitle={`${today.length} charging today`} urgent>
            {today.map((s) => <AlertCard key={s.id} sub={s} urgent />)}
          </Section>
        )}

        {upcoming.length > 0 && (
          <Section title="This week" subtitle="Next 7 days">
            {upcoming.map((s) => <AlertCard key={s.id} sub={s} />)}
          </Section>
        )}

        {later.length > 0 && (
          <Section title="Later this month" subtitle="8–30 days away">
            {later.map((s) => <AlertCard key={s.id} sub={s} />)}
          </Section>
        )}
      </div>
      <BottomNav active="alerts" />
    </main>
  );
}

function Section({ title, subtitle, urgent, children }: { title: string; subtitle: string; urgent?: boolean; children: React.ReactNode }) {
  return (
    <div className="mb-5">
      <div className="flex items-baseline justify-between mb-2 px-1">
        <h2 className={`text-base font-bold ${urgent ? 'text-red-700' : 'text-on-surface'}`}>{title}</h2>
        <p className="text-xs text-on-surface-variant">{subtitle}</p>
      </div>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function AlertCard({ sub, urgent }: { sub: Sub; urgent?: boolean }) {
  const initial = sub.service_name.charAt(0).toUpperCase();
  const color = colorFor(sub.service_name);
  const d = daysUntil(sub.next_billing_date!);
  let label = '';
  if (d < 0) label = `${Math.abs(d)} ${Math.abs(d) === 1 ? 'day' : 'days'} ago`;
  else if (d === 0) label = 'Today';
  else if (d === 1) label = 'Tomorrow';
  else label = `in ${d} days`;

  const dateLabel = new Date(sub.next_billing_date!).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  return (
    <Link href={`/subscription/${sub.id}`} className="w-full bg-white rounded-2xl p-4 border border-outline-variant flex items-center gap-3 text-left hover:shadow-sm transition-shadow">
      <div className="w-11 h-11 rounded-xl text-white flex items-center justify-center font-bold text-lg shrink-0" style={{ background: color }}>
        {initial}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-on-surface truncate">{sub.service_name}</p>
        <p className="text-xs text-on-surface-variant">{dateLabel}</p>
      </div>
      <div className="text-right shrink-0">
        <p className="font-semibold text-on-surface">${sub.price.toFixed(2)}</p>
        <p className={`text-xs font-medium ${urgent ? 'text-red-700' : 'text-primary'}`}>{label}</p>
      </div>
    </Link>
  );
}

function EmptyState() {
  return (
    <div className="bg-white rounded-2xl p-8 border border-outline-variant text-center">
      <div className="w-20 h-20 mx-auto mb-5 rounded-2xl flex items-center justify-center" style={{ background: '#f0e9ff' }}>
        <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="#6d3bd7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
          <polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
      </div>
      <h2 className="text-xl font-bold text-on-surface mb-2">All clear</h2>
      <p className="text-on-surface-variant text-sm leading-relaxed max-w-xs mx-auto">
        Nothing charging in the next 30 days. Add more subscriptions to see them here.
      </p>
    </div>
  );
}
