'use client';
import { useState } from 'react';
import { createClient } from '@/lib/supabase-client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { AuraLogo } from '@/components/AuraLogo';

export default function SignupPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName }
      }
    });

    if (error) {
      setError(error.message);
    } else {
      router.push('/onboarding');
    }
    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-surface">
      {/* Purple wave hero */}
      <div
        className="h-56 relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #a37eff 0%, #6d3bd7 50%, #c9b8ff 100%)',
        }}
      >
        <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 600 100" preserveAspectRatio="none">
          <path
            d="M0,40 C150,90 350,10 600,50 L600,100 L0,100 Z"
            fill="white"
            opacity="0.3"
          />
          <path
            d="M0,60 C150,100 350,30 600,70 L600,100 L0,100 Z"
            fill="white"
            opacity="0.5"
          />
          <path
            d="M0,80 C150,100 350,60 600,90 L600,100 L0,100 Z"
            fill="#fff8f6"
          />
        </svg>

        {/* Logo on top of wave */}
        <div className="absolute bottom-6 left-6">
          <AuraLogo size="md" />
        </div>
      </div>

      {/* Form */}
      <div className="px-6 pb-12">
        <h1 className="text-3xl font-bold text-on-surface mb-2">Start your journey</h1>
        <p className="text-on-surface-variant mb-8">
          Get alerts before every charge.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full name */}
          <div>
            <label className="block text-sm font-semibold text-on-surface mb-2">Full name</label>
            <input
              type="text"
              required
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              placeholder="Budi Santoso"
              className="w-full bg-surface-container-low border-0 rounded-xl px-4 py-3.5 text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-on-surface mb-2">Email address</label>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="budi@example.com"
              className="w-full bg-surface-container-low border-0 rounded-xl px-4 py-3.5 text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Password with eye toggle */}
          <div>
            <label className="block text-sm font-semibold text-on-surface mb-2">Create password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                minLength={6}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-surface-container-low border-0 rounded-xl px-4 py-3.5 pr-12 text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant"
              >
                {showPassword ? (
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" strokeLinecap="round" strokeLinejoin="round"/>
                    <line x1="1" y1="1" x2="23" y2="23" strokeLinecap="round"/>
                  </svg>
                ) : (
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="12" cy="12" r="3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-error text-sm bg-red-50 rounded-lg p-3">{error}</p>
          )}

          <button
            disabled={loading}
            className="w-full bg-primary text-white font-semibold py-3.5 rounded-xl hover:opacity-90 disabled:opacity-50 transition-opacity"
          >
            {loading ? 'Creating...' : 'Create account'}
          </button>
        </form>

        <p className="text-center text-on-surface-variant mt-8">
          Already have an account?{' '}
          <Link href="/login" className="text-primary font-semibold hover:underline">
            Log in
          </Link>
        </p>

        <p className="text-xs text-center text-on-surface-variant mt-8">
          By signing up, you agree to SubAlert's{' '}
          <a href="#" className="underline">Terms of Service</a> and{' '}
          <a href="#" className="underline">Privacy Policy</a>.
        </p>
      </div>
    </main>
  );
}
