'use client';
import { useState } from 'react';

export default function ForwardingInfo({ alias }: { alias?: string }) {
  const [copied, setCopied] = useState(false);
  const domain = process.env.NEXT_PUBLIC_FORWARD_DOMAIN || 'yourdomain.com';
  const address = `${alias}@${domain}`;

  function copy() {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (!alias) return null;

  return (
    <details className="border rounded-lg p-4 mb-6 bg-blue-50 border-blue-200">
      <summary className="cursor-pointer font-medium">
        ✨ Auto-detect subscriptions (forward receipts here)
      </summary>
      <div className="mt-4 space-y-3 text-sm">
        <p>Forward subscription receipts to this address and we'll add them automatically:</p>
        <div className="flex gap-2">
          <code className="flex-1 bg-white border rounded px-3 py-2 font-mono">{address}</code>
          <button onClick={copy} className="bg-black text-white px-4 py-2 rounded">
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
        <p className="text-gray-600">
          In Gmail: Settings → Filters → Create filter → set "From: contains billing OR subscription OR receipt" → Forward to address above.
        </p>
      </div>
    </details>
  );
}
