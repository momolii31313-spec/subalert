'use client';
import { useState } from 'react';
import { createClient } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function Login() {
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
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
    else router.push('/dashboard');
    setLoading(false);
  }

  return (
    <main className="max-w-md mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-6">Log in</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="email" required placeholder="you@example.com"
          value={email} onChange={e => setEmail(e.target.value)}
          className="w-full border rounded-lg px-4 py-3" />
        <input type="password" required placeholder="Password"
          value={password} onChange={e => setPassword(e.target.value)}
          className="w-full border rounded-lg px-4 py-3" />
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <button disabled={loading} className="w-full bg-black text-white py-3 rounded-lg font-medium disabled:opacity-50">
          {loading ? 'Logging in...' : 'Log in'}
        </button>
      </form>
      <p className="text-sm text-gray-600 mt-4">
        New here? <a href="/signup" className="underline">Sign up</a>
      </p>
    </main>
  );
}
