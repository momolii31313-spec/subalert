import { createServer } from '@/lib/supabase-server';
import { redirect, notFound } from 'next/navigation';
import SubscriptionDetailClient from './SubscriptionDetailClient';

export default async function SubscriptionDetailPage({ params }: { params: { id: string } }) {
  const supabase = createServer();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: subscription } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('id', params.id)
    .eq('user_id', user.id)
    .single();

  if (!subscription) notFound();

  return <SubscriptionDetailClient subscription={subscription} />;
}
