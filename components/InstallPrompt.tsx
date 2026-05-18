'use client';

import { useEffect, useState } from 'react';
import { X, Download, Share, Plus, MoreVertical, Globe } from 'lucide-react';

type Platform = 'ios' | 'android' | 'desktop' | 'unsupported';

const STORAGE_KEY = 'subalert_install_dismissed_v2';
const DELAY_MS = 5000;

export default function InstallPrompt() {
  const [show, setShow] = useState(false);
  const [platform, setPlatform] = useState<Platform>('unsupported');
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showGuide, setShowGuide] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Already installed?
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone === true;
    if (isStandalone) return;

    // Already dismissed?
    if (localStorage.getItem(STORAGE_KEY)) return;

    // Detect platform
    const ua = window.navigator.userAgent.toLowerCase();
    const isIOS = /iphone|ipad|ipod/.test(ua);
    const isAndroid = /android/.test(ua);
    const isMobile = isIOS || isAndroid;

    let p: Platform = 'unsupported';
    if (isIOS) p = 'ios';
    else if (isAndroid) p = 'android';
    else p = 'desktop';
    setPlatform(p);

    // Listen for the Android/Desktop install event
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handler);

    // Show prompt after delay
    const timer = setTimeout(() => setShow(true), DELAY_MS);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
      clearTimeout(timer);
    };
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        localStorage.setItem(STORAGE_KEY, '1');
        setShow(false);
      }
      setDeferredPrompt(null);
    } else {
      setShowGuide(true);
    }
  };

  const handleLater = () => setShow(false);
  const handleDismiss = () => {
    localStorage.setItem(STORAGE_KEY, '1');
    setShow(false);
  };

  if (!show) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 animate-fadeIn"
        onClick={handleLater}
      />

      {/* Bottom sheet */}
      <div className="fixed inset-x-0 bottom-0 z-50 animate-slideUp">
        <div className="bg-white rounded-t-3xl shadow-2xl mx-auto max-w-md">
          {showGuide ? (
            <GuideView platform={platform} onBack={() => setShowGuide(false)} onDismiss={handleDismiss} />
          ) : (
            <PromptView
              platform={platform}
              hasNativePrompt={!!deferredPrompt}
              onInstall={handleInstall}
              onLater={handleLater}
              onDismiss={handleDismiss}
            />
          )}
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.2s ease-out; }
        .animate-slideUp { animation: slideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1); }
      `}</style>
    </>
  );
}

function PromptView({
  platform,
  hasNativePrompt,
  onInstall,
  onLater,
  onDismiss,
}: {
  platform: Platform;
  hasNativePrompt: boolean;
  onInstall: () => void;
  onLater: () => void;
  onDismiss: () => void;
}) {
  const ctaLabel =
    hasNativePrompt ? 'Install app'
    : platform === 'ios' ? 'Show me how'
    : 'Show me how';

  return (
    <div className="p-6 pb-8">
      {/* Handle */}
      <div className="w-10 h-1 bg-black/10 rounded-full mx-auto mb-5" />

      {/* Close X */}
      <button
        onClick={onLater}
        className="absolute top-5 right-5 w-9 h-9 rounded-full bg-black/5 flex items-center justify-center hover:bg-black/10 transition"
        aria-label="Close"
      >
        <X size={18} />
      </button>

      {/* Icon */}
      <div className="flex justify-center mb-4">
        <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center relative shadow-lg shadow-primary/30">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
          </svg>
          <span className="absolute" style={{
            top: '4px', right: '4px', width: '12px', height: '12px',
            background: '#ff4757', borderRadius: '50%',
            border: '2px solid #6d3bd7',
          }} />
        </div>
      </div>

      {/* Headline */}
      <h2 className="text-2xl font-bold text-on-surface text-center mb-2 tracking-tight">
        Get the SubAlert app
      </h2>
      <p className="text-center text-on-surface/60 text-[15px] mb-5 px-2">
        Install SubAlert on your home screen for fast access and instant alerts.
      </p>

      {/* Benefits */}
      <div className="bg-surface rounded-2xl p-4 mb-5 space-y-3">
        <Benefit text="Opens instantly, like a real app" />
        <Benefit text="One tap from your home screen" />
        <Benefit text="Get notified before charges" />
      </div>

      {/* CTA */}
      <button
        onClick={onInstall}
        className="w-full h-12 rounded-full bg-primary text-white font-semibold text-[15px] flex items-center justify-center gap-2 hover:bg-primary/90 transition shadow-lg shadow-primary/20"
      >
        <Download size={18} />
        {ctaLabel}
      </button>

      {/* Secondary actions */}
      <div className="flex items-center justify-center gap-1 mt-3 text-sm">
        <button
          onClick={onLater}
          className="px-3 py-2 text-on-surface/60 hover:text-on-surface transition"
        >
          Maybe later
        </button>
        <span className="text-on-surface/20">·</span>
        <button
          onClick={onDismiss}
          className="px-3 py-2 text-on-surface/60 hover:text-on-surface transition"
        >
          Don't show again
        </button>
      </div>
    </div>
  );
}

function Benefit({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6d3bd7" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      </div>
      <span className="text-[14.5px] text-on-surface">{text}</span>
    </div>
  );
}

function GuideView({
  platform,
  onBack,
  onDismiss,
}: {
  platform: Platform;
  onBack: () => void;
  onDismiss: () => void;
}) {
  return (
    <div className="p-6 pb-8">
      <div className="w-10 h-1 bg-black/10 rounded-full mx-auto mb-5" />

      <button
        onClick={onBack}
        className="absolute top-5 left-5 text-sm text-primary font-medium hover:underline"
      >
        ← Back
      </button>

      <button
        onClick={onDismiss}
        className="absolute top-5 right-5 w-9 h-9 rounded-full bg-black/5 flex items-center justify-center hover:bg-black/10 transition"
        aria-label="Close"
      >
        <X size={18} />
      </button>

      <h2 className="text-xl font-bold text-on-surface text-center mb-1 mt-2 tracking-tight">
        {platform === 'ios' && 'Install on iPhone'}
        {platform === 'android' && 'Install on Android'}
        {platform === 'desktop' && 'Install on Desktop'}
      </h2>
      <p className="text-center text-on-surface/60 text-sm mb-6">
        {platform === 'ios' && 'Use Safari to add SubAlert to your home screen'}
        {platform === 'android' && 'Add SubAlert to your home screen'}
        {platform === 'desktop' && 'Add SubAlert as an app on your computer'}
      </p>

      {platform === 'ios' && (
        <div className="space-y-3">
          <Step num={1} icon={<Share size={18} />} title="Tap the Share button" desc="At the bottom of your Safari browser" />
          <Step num={2} icon={<Plus size={18} />} title='Tap "Add to Home Screen"' desc="Scroll down in the share menu" />
          <Step num={3} icon={<Download size={18} />} title='Tap "Add"' desc="SubAlert appears on your home screen" />
        </div>
      )}

      {platform === 'android' && (
        <div className="space-y-3">
          <Step num={1} icon={<MoreVertical size={18} />} title="Tap the menu (⋮)" desc="Top-right corner of Chrome" />
          <Step num={2} icon={<Download size={18} />} title='Tap "Install app"' desc="Or 'Add to Home screen'" />
          <Step num={3} icon={<Plus size={18} />} title='Tap "Install"' desc="SubAlert appears on your home screen" />
        </div>
      )}

      {platform === 'desktop' && (
        <div className="space-y-3">
          <Step num={1} icon={<Globe size={18} />} title="Look at your address bar" desc="In Chrome, Edge, or Brave" />
          <Step num={2} icon={<Download size={18} />} title="Click the install icon" desc="A small ⊕ icon on the right side of the URL" />
          <Step num={3} icon={<Plus size={18} />} title='Click "Install"' desc="SubAlert opens as its own app" />
        </div>
      )}

      <button
        onClick={onBack}
        className="w-full h-11 rounded-full bg-surface text-on-surface font-medium text-sm mt-6 hover:bg-black/5 transition"
      >
        Got it
      </button>
    </div>
  );
}

function Step({ num, icon, title, desc }: { num: number; icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-2xl bg-surface">
      <div className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold shrink-0">
        {num}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <div className="text-primary">{icon}</div>
          <p className="font-semibold text-[14.5px] text-on-surface">{title}</p>
        </div>
        <p className="text-[13px] text-on-surface/60">{desc}</p>
      </div>
    </div>
  );
}
