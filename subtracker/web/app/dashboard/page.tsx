import { createServer } from '@/lib/supabase';
import { redirect } from 'next/navigation';
import SubsList from '@/components/SubsList';
import AddSubForm from '@/components/AddSubForm';
import ForwardingInfo from '@/components/ForwardingInfo';

export default async function Dashboard() {
  const supabase = createServer();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: subs } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('active', true)
    .order('next_billing_date', { ascending: true, nullsFirst: false });

  const { data: profile } = await supabase
    .from('profiles')
    .select('forward_alias')
    .eq('id', user.id)
    .single();

  const monthlyTotal = (subs || [])
    .filter(s => s.billing_cycle === 'monthly')
    .reduce((sum, s) => sum + Number(s.price), 0);

  const yearlyTotal = (subs || [])
    .filter(s => s.billing_cycle === 'yearly')
    .reduce((sum, s) => sum + Number(s.price), 0);

  const projectedYear = (monthlyTotal * 12) + yearlyTotal;

  return (
    <main className="max-w-4xl mx-auto px-6 py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Your subscriptions</h1>
        <form action="/api/logout" method="POST">
          <button className="text-sm text-gray-600 hover:underline">Log out</button>
        </form>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <Stat label="Active" value={(subs || []).length.toString()} />
        <Stat label="Monthly cost" value={`$${monthlyTotal.toFixed(2)}`} />
        <Stat label="Per year" value={`$${projectedYear.toFixed(2)}`} />
      </div>

      <ForwardingInfo alias={profile?.forward_alias} />

      <AddSubForm />

      <SubsList subs={subs || []} />
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="border rounded-lg p-4 bg-white">
      <div className="text-sm text-gray-500">{label}</div>
      <div className="text-2xl font-bold mt-1">{value}</div>
    </div>
  );
}
