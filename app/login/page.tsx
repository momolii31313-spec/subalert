'use client';
import { useState } from 'react';
import { createClient } from '@/lib/supabase-client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { SubAlertLogo } from '@/components/AuraLogo';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    const supabase = createClient();
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }
    if (data.user) {
      const { data: profile } = await supabase.from('profiles').select('onboarded').eq('id', data.user.id).single();
      if (profile?.onboarded) {
        router.push('/dashboard');
      } else {
        router.push('/onboarding');
      }
    } else {
      router.push('/dashboard');
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-surface-container-low">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-sm">
        <div className="flex justify-center mb-6">
          <SubAlertLogo size="md" />
        </div>
        <h1 className="text-3xl font-bold text-center text-on-surface mb-2">Welcome back</h1>
        <p className="text-on-surface-variant text-center mb-6">Track every subscription. Never get surprise-charged.</p>
        <div className="flex bg-surface-container rounded-xl p-1 mb-6">
          <button className="flex-1 py-2.5 rounded-lg bg-surface-container-high font-semibold text-on-surface">Log in</button>
          <Link href="/signup" className="flex-1 py-2.5 rounded-lg text-center font-semibold text-on-surface-variant">Sign up</Link>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-on-surface mb-2">Email address</label>
            <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="name@example.com" className="w-full bg-surface-container-low border-0 rounded-xl px-4 py-3.5 text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-on-surface">Password</label>
              <button type="button" className="text-sm font-medium text-primary hover:underline">Forgot?</button>
            </div>
            <input type="password" required value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" className="w-full bg-surface-container-low border-0 rounded-xl px-4 py-3.5 text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
          {error && <p className="text-error text-sm bg-red-50 rounded-lg p-3">{error}</p>}
          <button disabled={loading} className="w-full bg-primary text-white font-semibold py-3.5 rounded-xl hover:opacity-90 disabled:opacity-50 transition-opacity">
            {loading ? 'Signing in...' : 'Continue'}
          </button>
        </form>
        <p className="text-xs text-center text-on-surface-variant mt-6">By continuing, you agree to SubAlert Terms of Service and Privacy Policy.</p>
      </div>
    </main>
  );
}
