import { createServer } from '@/lib/supabase-server';
import { redirect } from 'next/navigation';
import BottomNav from '@/components/BottomNav';
import AppHeader from '@/components/AppHeader';
import ProfileClient from './ProfileClient';

export default async function ProfilePage() {
  const supabase = createServer();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, email, forward_alias')
    .eq('id', user.id)
    .single();

  const { count } = await supabase
    .from('subscriptions')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.id)
    .eq('active', true);

  const forwardingEmail = `${profile?.forward_alias}@${process.env.NEXT_PUBLIC_FORWARD_DOMAIN || 'subalert.app'}`;

  return (
    <main className="min-h-screen bg-surface-container-low pb-20">
      <AppHeader />
      <ProfileClient
        fullName={profile?.full_name || 'Not set'}
        email={profile?.email || ''}
        forwardingEmail={forwardingEmail}
        subCount={count || 0}
      />
      <BottomNav active="profile" />
    </main>
  );
}
