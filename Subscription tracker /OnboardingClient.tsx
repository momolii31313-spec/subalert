'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase-client';
import { AuraLogo } from '@/components/AuraLogo';

type Props = {
  firstName: string;
  forwardingEmail: string;
};

export default function OnboardingClient(props: Props) {
  const { firstName, forwardingEmail } = props;
  const [copied, setCopied] = useState(false);
  const [finishing, setFinishing] = useState(false);
  const router = useRouter();

  function copyEmail() {
    navigator.clipboard.writeText(forwardingEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  async function finishOnboarding() {
    setFinishing(true);
    const supabase = createClient();
    const userResp = await supabase.auth.getUser();
    const user = userResp.data.user;
    if (user) {
      await supabase.from('profiles').update({ onboarded: true }).eq('id', user.id);
    }
    router.push('/dashboard');
  }

  return (
    <main className="min-h-screen bg-surface-container-low flex flex-col">
      <header className="p-6">
        <AuraLogo size="sm" />
      </header>

      <div className="flex-1 max-w-md mx-auto w-full px-6 pb-8">
        <div className="mb-8">
          <p className="text-sm text-on-surface-variant mb-2">Hey {firstName}</p>
          <h1 className="text-3xl font-bold text-on-surface mb-3">You are in.</h1>
          <p className="text-on-surface-variant leading-relaxed">
            SubAlert tracks every subscription and warns you before each charge.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 mb-5 border border-outline-variant">
          <h3 className="font-semibold text-on-surface mb-2">Your forwarding email</h3>
          <p className="text-sm text-on-surface-variant mb-3">
            Forward subscription receipts here for auto-detection.
          </p>
          <div className="flex items-center gap-2 bg-surface-container-low rounded-xl p-3">
            <code className="flex-1 text-sm font-mono text-on-surface truncate">
              {forwardingEmail}
            </code>
            <button
              onClick={copyEmail}
              className="bg-primary text-white text-sm font-semibold px-4 py-2 rounded-lg"
            >
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 mb-5 border border-outline-variant">
          <div className="rounded-xl p-4 mb-4 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #f0e9ff 0%, #fff8f6 100%)', height: '200px' }}>
            <div style={{ position: 'absolute', top: '16px', left: '18px', transform: 'rotate(-8deg)', background: 'white', borderRadius: '8px', padding: '6px 10px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 600, color: '#241916' }}>
              <div style={{ width: '16px', height: '16px', borderRadius: '4px', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#E50914', fontSize: '11px', fontWeight: 900, fontFamily: 'Georgia, serif' }}>N</div>
              Netflix
            </div>

            <div style={{ position: 'absolute', top: '12px', right: '12px', transform: 'rotate(6deg)', background: 'white', borderRadius: '8px', padding: '6px 10px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 600, color: '#241916' }}>
              <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: '#1DB954', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="white"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.59 14.41c-.2.3-.51.39-.81.2-2.22-1.36-5.02-1.67-8.31-.92-.34.08-.68-.14-.76-.48-.08-.34.14-.68.48-.76 3.6-.82 6.7-.47 9.19 1.06.3.18.39.51.21.9zm1.23-2.75c-.25.36-.71.47-1.07.21-2.54-1.56-6.41-2.01-9.41-1.1-.4.12-.83-.11-.95-.51-.12-.41.11-.83.51-.95 3.43-1.04 7.7-.54 10.62 1.25.36.22.47.71.3 1.1zm.1-2.86c-3.05-1.81-8.08-1.98-10.99-1.09-.49.15-1.01-.13-1.16-.62-.15-.49.13-1.01.62-1.16 3.34-1.01 8.89-.82 12.41 1.27.44.26.59.84.32 1.28-.26.43-.85.58-1.28.32z"/></svg>
              </div>
              Spotify
            </div>

            <div style={{ position: 'absolute', top: '70px', left: '8px', transform: 'rotate(-4deg)', background: 'white', borderRadius: '8px', padding: '6px 10px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 600, color: '#241916' }}>
              <div style={{ width: '16px', height: '16px', borderRadius: '4px', background: 'linear-gradient(135deg, #5AC8FA, #007AFF)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="white"><path d="M19.35 10.04A7.49 7.49 0 0 0 12 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 0 0 0 14a6 6 0 0 0 6 6h13a5 5 0 0 0 5-5c0-2.64-2.05-4.78-4.65-4.96z"/></svg>
              </div>
              iCloud
            </div>

            <div style={{ position: 'absolute', top: '80px', right: '6px', transform: 'rotate(8deg)', background: 'white', borderRadius: '8px', padding: '6px 10px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 600, color: '#241916' }}>
              <div style={{ width: '22px', height: '16px', borderRadius: '3px', background: '#FF0000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z"/></svg>
              </div>
              YouTube
            </div>

            <div style={{ position: 'absolute', bottom: '14px', left: '32px', transform: 'rotate(5deg)', background: 'white', borderRadius: '8px', padding: '6px 10px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 600, color: '#241916' }}>
              <div style={{ width: '16px', height: '16px', borderRadius: '4px', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '11px', fontWeight: 900 }}>tv</div>
              Apple TV+
            </div>

            <div style={{ position: 'absolute', bottom: '12px', right: '24px', transform: 'rotate(-6deg)', background: 'white', borderRadius: '8px', padding: '6px 10px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 600, color: '#241916' }}>
              <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: '#10A37F', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '9px', fontWeight: 900 }}>AI</div>
              ChatGPT
            </div>

            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: '#6d3bd7', borderRadius: '50%', width: '56px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 24px rgba(109,59,215,0.4)' }}>
              <div style={{ position: 'absolute', top: '-2px', right: '0px', width: '14px', height: '14px', background: '#ff4757', borderRadius: '50%', border: '3px solid #f0e9ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '8px', fontWeight: 900 }}>!</div>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="white"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><circle cx="12" cy="21" r="1.5"/></svg>
            </div>
          </div>

          <p className="text-xs text-on-surface-variant text-center mb-4 italic">All your subscriptions, one place to track them.</p>

          <h3 className="font-semibold text-on-surface mb-4">How it works</h3>
          <div className="space-y-4">
            <Step iconType="email" t="Forward your receipts" b="We auto-detect subscriptions from your email." />
            <Step iconType="plus" t="Or add them manually" b="Tap + and fill in the name, price, and date." />
            <Step iconType="bell" t="Never get surprised" b="Heads-up alerts a week, 3 days, and 1 day before any charge." />
          </div>
        </div>

        <button
          onClick={finishOnboarding}
          disabled={finishing}
          className="w-full bg-primary text-white font-semibold py-4 rounded-xl disabled:opacity-50"
        >
          {finishing ? 'Loading' : 'Got it, take me to my dashboard'}
        </button>
      </div>
    </main>
  );
}

function Step(props: { iconType: 'email' | 'plus' | 'bell'; t: string; b: string }) {
  const icons = {
    email: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6d3bd7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
    plus: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6d3bd7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
    bell: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6d3bd7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
  };

  return (
    <div className="flex gap-3 items-start">
      <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ background: '#f0e9ff' }}>
        {icons[props.iconType]}
      </div>
      <div className="pt-0.5">
        <p className="font-semibold text-on-surface text-sm mb-0.5">{props.t}</p>
        <p className="text-sm text-on-surface-variant leading-snug">{props.b}</p>
      </div>
    </div>
  );
}
