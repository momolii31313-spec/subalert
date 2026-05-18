import { createServer } from '@/lib/supabase-server';
import { redirect } from 'next/navigation';
import DashboardClient from './DashboardClient';

export default async function DashboardPage() {
  const supabase = createServer();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, forward_alias')
    .eq('id', user.id)
    .single();

  const { data: subscriptions } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('user_id', user.id)
    .eq('active', true)
    .order('next_billing_date', { ascending: true });

  const firstName = profile?.full_name?.split(' ')[0] || 'there';

  return (
    <DashboardClient
      firstName={firstName}
      subscriptions={subscriptions || []}
    />
  );
}
