import { createServer } from '@/lib/supabase-server';
import { redirect } from 'next/navigation';
import OnboardingClient from './OnboardingClient';

export default async function OnboardingPage() {
  const supabase = createServer();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, forward_alias, onboarded')
    .eq('id', user.id)
    .single();

  if (profile?.onboarded) redirect('/dashboard');

  const domain = process.env.NEXT_PUBLIC_FORWARD_DOMAIN || 'subalert.org';
  const forwardingEmail = `${profile?.forward_alias}@${domain}`;
  const firstName = profile?.full_name?.split(' ')[0] || 'there';

  return <OnboardingClient firstName={firstName} forwardingEmail={forwardingEmail} />;
}
