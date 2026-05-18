'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase-client';

const POPULAR = ['Netflix', 'Spotify', 'YouTube Premium', 'Apple TV+', 'Disney+', 'Amazon Prime', 'iCloud+', 'Google One', 'ChatGPT Plus', 'Adobe Creative Cloud', 'Notion', 'Figma', 'GitHub', 'Dropbox', 'HBO Max'];

const CURRENCIES = [
  { code: 'USD' },{ code: 'EUR' },{ code: 'GBP' },{ code: 'AED' },{ code: 'SAR' },{ code: 'QAR' },{ code: 'KWD' },{ code: 'BHD' },{ code: 'OMR' },{ code: 'EGP' },{ code: 'INR' },{ code: 'PKR' },{ code: 'BDT' },{ code: 'CNY' },{ code: 'JPY' },{ code: 'KRW' },{ code: 'SGD' },{ code: 'MYR' },{ code: 'THB' },{ code: 'IDR' },{ code: 'PHP' },{ code: 'VND' },{ code: 'AUD' },{ code: 'NZD' },{ code: 'CAD' },{ code: 'MXN' },{ code: 'BRL' },{ code: 'ARS' },{ code: 'CLP' },{ code: 'COP' },{ code: 'CHF' },{ code: 'SEK' },{ code: 'NOK' },{ code: 'DKK' },{ code: 'PLN' },{ code: 'CZK' },{ code: 'HUF' },{ code: 'RON' },{ code: 'TRY' },{ code: 'ILS' },{ code: 'ZAR' },{ code: 'NGN' },{ code: 'KES' },{ code: 'GHS' },{ code: 'MAD' },{ code: 'HKD' },{ code: 'TWD' },{ code: 'RUB' },{ code: 'UAH' },
];

type ExistingSub = {
  id: string;
  service_name: string;
  price: number;
  currency: string;
  billing_cycle: string;
  next_billing_date: string | null;
  trial_end_date: string | null;
};

type Props = {
  open: boolean;
  onClose: () => void;
  existing?: ExistingSub;
};

function addDays(iso: string, days: number): string {
  const d = new Date(iso); d.setDate(d.getDate() + days);
  return d.toISOString().split('T')[0];
}
function addCycle(iso: string, cycle: string): string {
  const d = new Date(iso);
  if (cycle === 'weekly') d.setDate(d.getDate() + 7);
  else if (cycle === 'yearly') d.setFullYear(d.getFullYear() + 1);
  else d.setMonth(d.getMonth() + 1);
  return d.toISOString().split('T')[0];
}
function subCycle(iso: string, cycle: string): string {
  const d = new Date(iso);
  if (cycle === 'weekly') d.setDate(d.getDate() - 7);
  else if (cycle === 'yearly') d.setFullYear(d.getFullYear() - 1);
  else d.setMonth(d.getMonth() - 1);
  return d.toISOString().split('T')[0];
}
function formatNice(iso: string): string {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('en-US', { weekday: 'short', month: 'long', day: 'numeric', year: 'numeric' });
}

export default function AddSubscriptionSheet({ open, onClose, existing }: Props) {
  const router = useRouter();
  const isEdit = !!existing;

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [billingDate, setBillingDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [cycle, setCycle] = useState('monthly');
  const [isTrial, setIsTrial] = useState(false);
  const [trialDays, setTrialDays] = useState(7);
  const [trialCustom, setTrialCustom] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  // Hydrate form when editing
  useEffect(() => {
    if (existing && open) {
      setName(existing.service_name);
      setPrice(String(existing.price));
      setCurrency(existing.currency);
      setCycle(existing.billing_cycle);
      // Reverse-compute "last billing date" from next_billing_date - cycle
      if (existing.next_billing_date) {
        if (existing.trial_end_date) {
          // Trial: billing date = trial start (we don't store, so use trial_end - default 7 days)
          setIsTrial(true);
          setBillingDate(existing.next_billing_date); // next charge IS trial end
        } else {
          setBillingDate(subCycle(existing.next_billing_date, existing.billing_cycle));
          setIsTrial(false);
        }
      }
    } else if (!existing && open) {
      // Reset on open in add mode
      setName(''); setPrice(''); setCurrency('USD'); setCycle('monthly');
      setBillingDate(new Date().toISOString().split('T')[0]);
      setIsTrial(false); setTrialDays(7); setTrialCustom(false);
    }
  }, [existing, open]);

  const firstChargeDate = isTrial ? addDays(billingDate, trialDays) : addCycle(billingDate, cycle);

  const suggestions = name.length >= 2 && !isEdit
    ? POPULAR.filter(s => s.toLowerCase().includes(name.toLowerCase()) && s.toLowerCase() !== name.toLowerCase()).slice(0, 4)
    : [];

  async function handleSave() {
    setError('');
    if (!name.trim()) { setError('Service name is required'); return; }
    const priceNum = parseFloat(price);
    if (isNaN(priceNum) || priceNum < 0) { setError('Enter a valid price'); return; }

    setSaving(true);
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setError('Not logged in'); setSaving(false); return; }

    const payload: any = {
      service_name: name.trim(),
      price: priceNum,
      currency,
      billing_cycle: cycle,
      next_billing_date: firstChargeDate,
    };
    if (isTrial) payload.trial_end_date = firstChargeDate;
    else payload.trial_end_date = null;

    let result;
    if (isEdit && existing) {
      result = await supabase.from('subscriptions').update(payload).eq('id', existing.id);
    } else {
      payload.user_id = user.id;
      payload.active = true;
      result = await supabase.from('subscriptions').insert(payload);
    }

    if (result.error) { setError(result.error.message); setSaving(false); return; }

    setSaving(false);
    onClose();
    router.refresh();
  }

  if (!open) return null;

  return (
    <>
      <div onClick={onClose} className="fixed inset-0 bg-black/40 z-40" />
      <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 max-h-[90vh] overflow-y-auto">
        <div className="max-w-md mx-auto w-full p-6">
          <div className="w-12 h-1.5 bg-outline-variant rounded-full mx-auto mb-6" aria-hidden="true" />

          <h2 className="text-2xl font-bold text-on-surface mb-6">{isEdit ? 'Edit subscription' : 'Add subscription'}</h2>

          <div className="space-y-5">
            <div className="relative">
              <label className="block text-sm font-medium text-on-surface mb-2">Service name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Netflix" className="w-full h-12 px-4 bg-surface-container-low rounded-xl border border-outline-variant focus:border-primary focus:outline-none text-on-surface" autoFocus />
              {suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-outline-variant rounded-xl shadow-lg z-10">
                  {suggestions.map(s => (
                    <button key={s} type="button" onClick={() => setName(s)} className="w-full text-left px-4 py-3 hover:bg-surface-container-low text-on-surface text-sm border-b border-outline-variant last:border-b-0">{s}</button>
                  ))}
                </div>
              )}
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="col-span-2">
                <label className="block text-sm font-medium text-on-surface mb-2">Price</label>
                <input type="number" step="0.01" min="0" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="9.99" className="w-full h-12 px-4 bg-surface-container-low rounded-xl border border-outline-variant focus:border-primary focus:outline-none text-on-surface" />
              </div>
              <div>
                <label className="block text-sm font-medium text-on-surface mb-2">Currency</label>
                <select value={currency} onChange={(e) => setCurrency(e.target.value)} className="w-full h-12 px-3 bg-surface-container-low rounded-xl border border-outline-variant focus:border-primary focus:outline-none text-on-surface text-sm">
                  {CURRENCIES.map(c => <option key={c.code} value={c.code}>{c.code}</option>)}
                </select>
              </div>
            </div>

            <div className="bg-surface-container-low rounded-xl p-4 border border-outline-variant">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="font-medium text-on-surface text-sm">Free trial?</p>
                  <p className="text-xs text-on-surface-variant mt-0.5">Track when trial ends</p>
                </div>
                <button type="button" role="switch" aria-checked={isTrial} onClick={() => setIsTrial(!isTrial)} className={`relative w-12 h-7 rounded-full transition-colors ${isTrial ? 'bg-primary' : 'bg-outline-variant'}`}>
                  <span className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform shadow ${isTrial ? "translate-x-5" : "translate-x-0"}`} />
                </button>
              </div>
              {isTrial && (
                <div className="pt-3 border-t border-outline-variant">
                  <p className="text-xs font-medium text-on-surface mb-2">Trial length</p>
                  <div className="grid grid-cols-5 gap-2 mb-3">
                    {[3, 7, 14, 30].map(d => (
                      <button key={d} type="button" onClick={() => { setTrialDays(d); setTrialCustom(false); }} className={`h-10 rounded-lg border text-sm font-medium ${trialDays === d && !trialCustom ? 'bg-primary text-white border-primary' : 'bg-white text-on-surface border-outline-variant'}`}>
                        {d}d
                      </button>
                    ))}
                    <button type="button" onClick={() => setTrialCustom(true)} className={`h-10 rounded-lg border text-sm font-medium ${trialCustom ? 'bg-primary text-white border-primary' : 'bg-white text-on-surface border-outline-variant'}`}>Custom</button>
                  </div>
                  {trialCustom && (
                    <input type="number" min="1" max="365" value={trialDays} onChange={(e) => setTrialDays(parseInt(e.target.value) || 1)} placeholder="Days" className="w-full h-10 px-3 bg-white rounded-lg border border-outline-variant focus:border-primary focus:outline-none text-on-surface text-sm" />
                  )}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-on-surface mb-2">
                {isTrial ? 'Trial start date' : 'Last billing date'}
              </label>
              <input type="date" value={billingDate} onChange={(e) => setBillingDate(e.target.value)} className="w-full h-12 px-4 bg-surface-container-low rounded-xl border border-outline-variant focus:border-primary focus:outline-none text-on-surface" />
              <p className="text-xs text-on-surface-variant mt-1">
                {isTrial ? 'The day your free trial began.' : 'The date your subscription started or last renewed.'}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-on-surface mb-2">Billing cycle</label>
              <div className="grid grid-cols-3 gap-2">
                {(['weekly', 'monthly', 'yearly'] as const).map(c => (
                  <button key={c} type="button" onClick={() => setCycle(c)} className={`h-12 rounded-xl border-2 font-medium text-sm capitalize transition-colors ${cycle === c ? 'bg-primary text-white border-primary' : 'bg-white text-on-surface border-outline-variant'}`}>
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-xl p-4" style={{ background: '#f0e9ff' }}>
              <p className="text-xs font-medium text-on-surface-variant mb-1">
                {isTrial ? 'Trial ends + first charge' : 'Next charge auto-detected'}
              </p>
              <p className="font-semibold text-primary text-base">{formatNice(firstChargeDate)}</p>
            </div>

            {error && <div className="bg-red-50 text-red-700 px-4 py-3 rounded-xl text-sm">{error}</div>}

            <div className="flex gap-3 pt-2">
              <button type="button" onClick={onClose} disabled={saving} className="flex-1 h-14 rounded-xl border border-outline-variant text-on-surface font-semibold disabled:opacity-50">Cancel</button>
              <button type="button" onClick={handleSave} disabled={saving} className="flex-1 h-14 rounded-xl bg-primary text-white font-semibold disabled:opacity-50">
                {saving ? 'Saving...' : (isEdit ? 'Save changes' : 'Save')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
