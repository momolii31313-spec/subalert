'use client';
import { createClient } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

type Sub = {
  id: string;
  service_name: string;
  price: number;
  currency: string;
  billing_cycle: string;
  next_billing_date: string | null;
  trial_end_date: string | null;
  auto_detected: boolean;
};

export default function SubsList({ subs }: { subs: Sub[] }) {
  const router = useRouter();

  async function remove(id: string) {
    if (!confirm('Delete this subscription?')) return;
    const supabase = createClient();
    await supabase.from('subscriptions').update({ active: false }).eq('id', id);
    router.refresh();
  }

  if (subs.length === 0) {
    return <p className="text-center text-gray-500 py-8">No subscriptions yet. Add one above.</p>;
  }

  return (
    <div className="space-y-2">
      {subs.map(sub => {
        const date = sub.trial_end_date || sub.next_billing_date;
        const days = date ? Math.ceil((new Date(date).getTime() - Date.now()) / 86400000) : null;
        const isSoon = days !== null && days <= 3 && days >= 0;
        const isPast = days !== null && days < 0;

        return (
          <div key={sub.id} className={`border rounded-lg p-4 bg-white flex justify-between items-center ${isSoon ? 'border-orange-400 bg-orange-50' : ''}`}>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-medium">{sub.service_name}</span>
                {sub.auto_detected && <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">auto</span>}
                {sub.trial_end_date && <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded">trial</span>}
              </div>
              <div className="text-sm text-gray-600 mt-1">
                ${Number(sub.price).toFixed(2)} {sub.billing_cycle}
                {date && (
                  <span className={`ml-2 ${isSoon ? 'text-orange-700 font-medium' : isPast ? 'text-gray-400' : ''}`}>
                    · {sub.trial_end_date ? 'trial ends' : 'renews'} {date}
                    {days !== null && days >= 0 && ` (${days}d)`}
                  </span>
                )}
              </div>
            </div>
            <button onClick={() => remove(sub.id)} className="text-sm text-red-600 hover:underline">
              Remove
            </button>
          </div>
        );
      })}
    </div>
  );
}
