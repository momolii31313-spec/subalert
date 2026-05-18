'use client';
import { useState } from 'react';

type Props = {
  fullName: string;
  email: string;
  forwardingEmail: string;
  subCount: number;
};

export default function ProfileClient({ fullName, email, forwardingEmail, subCount }: Props) {
  const [copied, setCopied] = useState(false);
  const [alertsEnabled, setAlertsEnabled] = useState(true);
  const [confirmLogout, setConfirmLogout] = useState(false);

  const initial = fullName.charAt(0).toUpperCase();

  function copyEmail() {
    navigator.clipboard.writeText(forwardingEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  return (
    <div className="max-w-md mx-auto w-full px-6">
      <div className="mb-3">
        <p className="text-xs text-on-surface-variant mb-0.5">Account</p>
        <h1 className="text-xl font-bold text-on-surface">Profile</h1>
      </div>

      <div className="bg-white rounded-2xl p-5 border border-outline-variant mb-4">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center font-bold text-2xl shrink-0">
            {initial}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-lg font-bold text-on-surface truncate">{fullName}</p>
            <p className="text-sm text-on-surface-variant truncate">{email}</p>
          </div>
        </div>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ background: '#f0e9ff' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6d3bd7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
            <polyline points="22 4 12 14.01 9 11.01"/>
          </svg>
          <span className="text-xs font-semibold text-primary">
            {subCount === 0 ? 'No subscriptions yet' : `${subCount} subscription${subCount === 1 ? '' : 's'} tracked`}
          </span>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-5 border border-outline-variant mb-4">
        <h3 className="font-semibold text-on-surface mb-1">Your forwarding email</h3>
        <p className="text-xs text-on-surface-variant mb-3">Forward subscription receipts here for auto-detection.</p>
        <div className="flex items-center gap-2 bg-surface-container-low rounded-xl p-3">
          <code className="flex-1 text-sm font-mono text-on-surface truncate">{forwardingEmail}</code>
          <button onClick={copyEmail} className="bg-primary text-white text-sm font-semibold px-4 py-2 rounded-lg shrink-0">
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-5 border border-outline-variant mb-4">
        <h3 className="font-semibold text-on-surface mb-3">Notifications</h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-on-surface">Email alerts</p>
            <p className="text-xs text-on-surface-variant mt-0.5">Heads-up 7, 3, and 1 day before each charge</p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={alertsEnabled}
            onClick={() => setAlertsEnabled(!alertsEnabled)}
            className={`relative w-12 h-7 rounded-full transition-colors shrink-0 ml-3 ${alertsEnabled ? 'bg-primary' : 'bg-outline-variant'}`}
          >
            <span className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow transition-transform ${alertsEnabled ? 'translate-x-5' : 'translate-x-0'}`} />
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-5 border border-outline-variant mb-4">
        <h3 className="font-semibold text-on-surface mb-3">About</h3>
        <div className="space-y-3">
          <Row label="Version" value="0.1.0" />
          <Row label="Support" value="hello@subalert.app" />
        </div>
      </div>

      <div className="mb-4">
        <button
          onClick={() => setConfirmLogout(true)}
          className="w-full bg-white border border-red-200 text-red-700 font-semibold py-4 rounded-2xl hover:bg-red-50"
        >
          Log out
        </button>
      </div>

      {confirmLogout && (
        <>
          <div onClick={() => setConfirmLogout(false)} className="fixed inset-0 bg-black/50 z-40" />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <div className="bg-white rounded-3xl p-6 max-w-sm w-full">
              <h3 className="text-xl font-bold text-on-surface mb-2">Log out of SubAlert?</h3>
              <p className="text-on-surface-variant text-sm mb-6">
                You will need to log back in to view your subscriptions.
              </p>
              <div className="flex gap-3">
                <button onClick={() => setConfirmLogout(false)} className="flex-1 h-12 rounded-xl border border-outline-variant text-on-surface font-semibold">Cancel</button>
                <form action="/api/logout" method="POST" className="flex-1">
                  <button type="submit" className="w-full h-12 rounded-xl bg-red-600 text-white font-semibold">Log out</button>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-sm text-on-surface-variant">{label}</span>
      <span className="text-sm font-medium text-on-surface">{value}</span>
    </div>
  );
}
