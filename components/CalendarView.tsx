'use client';
import { useState } from 'react';

type Sub = {
  id: string;
  service_name: string;
  price: number;
  currency: string;
  billing_cycle: string;
  next_billing_date: string | null;
};

const COLORS = [
  { bg: '#E50914', name: 'red' },      // Netflix red
  { bg: '#1DB954', name: 'green' },    // Spotify green
  { bg: '#FF0000', name: 'youtube' },  // YouTube red
  { bg: '#007AFF', name: 'blue' },     // iCloud blue
  { bg: '#10A37F', name: 'teal' },     // ChatGPT teal
  { bg: '#FF6B35', name: 'orange' },
  { bg: '#9C27B0', name: 'purple' },
  { bg: '#FFC107', name: 'amber' },
  { bg: '#E91E63', name: 'pink' },
  { bg: '#00BCD4', name: 'cyan' },
  { bg: '#795548', name: 'brown' },
  { bg: '#3F51B5', name: 'indigo' },
];

const KNOWN: Record<string, string> = {
  'netflix': '#E50914',
  'spotify': '#1DB954',
  'youtube': '#FF0000',
  'youtube premium': '#FF0000',
  'icloud': '#007AFF',
  'icloud+': '#007AFF',
  'chatgpt': '#10A37F',
  'chatgpt plus': '#10A37F',
  'apple tv+': '#000000',
  'disney+': '#113CCF',
  'amazon prime': '#FF9900',
  'hbo max': '#9000FF',
  'github': '#181717',
  'figma': '#F24E1E',
  'notion': '#000000',
  'dropbox': '#0061FF',
  'adobe creative cloud': '#DA1F26',
  'google one': '#4285F4', 'gmail': '#EA4335', 'youtube music': '#FF0000', 'paramount+': '#0064FF', 'peacock': '#000000', 'hulu': '#1CE783', 'tidal': '#000000', 'discord': '#5865F2', 'twitch': '#9146FF', 'linkedin premium': '#0A66C2', 'duolingo': '#58CC02', 'audible': '#F8991C', 'evernote': '#00A82D', 'slack': '#4A154B', 'zoom': '#2D8CFF', 'canva': '#00C4CC', 'grammarly': '#15C39A',
};

function colorFor(name: string): string {
  const key = name.toLowerCase().trim();
  if (KNOWN[key]) return KNOWN[key];
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return COLORS[Math.abs(hash) % COLORS.length].bg;
}

export default function CalendarView({ subscriptions }: { subscriptions: Sub[] }) {
  const today = new Date();
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [viewYear, setViewYear] = useState(today.getFullYear());

  const firstDay = new Date(viewYear, viewMonth, 1);
  const lastDay = new Date(viewYear, viewMonth + 1, 0);
  const startWeekday = firstDay.getDay();
  const daysInMonth = lastDay.getDate();
  const monthName = firstDay.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const subsByDate: Record<string, Sub[]> = {};
  subscriptions.forEach((s) => {
    if (s.next_billing_date) {
      if (!subsByDate[s.next_billing_date]) subsByDate[s.next_billing_date] = [];
      subsByDate[s.next_billing_date].push(s);
    }
  });

  // All subs in the visible month, sorted by date
  const monthSubs = subscriptions
    .filter((s) => {
      if (!s.next_billing_date) return false;
      const d = new Date(s.next_billing_date);
      return d.getMonth() === viewMonth && d.getFullYear() === viewYear;
    })
    .sort((a, b) => (a.next_billing_date! < b.next_billing_date! ? -1 : 1));

  const monthTotal = monthSubs.reduce((sum, s) => sum + s.price, 0);

  function prevMonth() {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(viewYear - 1); }
    else setViewMonth(viewMonth - 1);
  }
  function nextMonth() {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(viewYear + 1); }
    else setViewMonth(viewMonth + 1);
  }

  const cells: (number | null)[] = [];
  for (let i = 0; i < startWeekday; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  function dateKey(day: number): string {
    const m = String(viewMonth + 1).padStart(2, '0');
    const d = String(day).padStart(2, '0');
    return `${viewYear}-${m}-${d}`;
  }

  return (
    <div>
      <div className="bg-white rounded-2xl p-4 border border-outline-variant mb-3">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-bold text-on-surface">{monthName}</h3>
          <div className="flex gap-1">
            <button onClick={prevMonth} aria-label="Previous month" className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-surface-container-low">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#241916" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
            <button onClick={nextMonth} aria-label="Next month" className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-surface-container-low">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#241916" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-2">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
            <div key={i} className="text-center text-xs font-medium text-on-surface-variant py-1">{d}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {cells.map((day, idx) => {
            if (day === null) return <div key={idx} />;
            const key = dateKey(day);
            const daySubs = subsByDate[key] || [];
            const isToday = key === today.toISOString().split('T')[0];

            return (
              <div
                key={idx}
                className={`relative aspect-square flex flex-col items-center justify-start pt-1.5 rounded-lg ${
                  isToday ? 'bg-surface-container-low ring-1 ring-primary' : ''
                }`}
              >
                <span className="text-sm font-medium text-on-surface">{day}</span>
                {daySubs.length > 0 && (
                  <div className="flex gap-0.5 mt-0.5 flex-wrap justify-center px-0.5">
                    {daySubs.slice(0, 3).map((s) => (
                      <span
                        key={s.id}
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ background: colorFor(s.service_name) }}
                        title={s.service_name}
                      />
                    ))}
                    {daySubs.length > 3 && (
                      <span className="text-[8px] text-on-surface-variant">+{daySubs.length - 3}</span>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-white rounded-2xl p-4 border border-outline-variant">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-sm text-on-surface-variant">{monthName}</p>
            <h3 className="text-lg font-bold text-on-surface">
              {monthSubs.length === 0 ? 'No charges' : `${monthSubs.length} charge${monthSubs.length === 1 ? '' : 's'}`}
            </h3>
          </div>
          {monthSubs.length > 0 && (
            <div className="text-right">
              <p className="text-xs text-on-surface-variant">Total</p>
              <p className="text-lg font-bold text-primary">${monthTotal.toFixed(2)}</p>
            </div>
          )}
        </div>

        {monthSubs.length === 0 ? (
          <p className="text-sm text-on-surface-variant py-6 text-center">Nothing scheduled this month.</p>
        ) : (
          <div className="space-y-3">
            {monthSubs.map((sub) => {
              const color = colorFor(sub.service_name);
              const initial = sub.service_name.charAt(0).toUpperCase();
              const d = new Date(sub.next_billing_date!);
              const dayLabel = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
              return (
                <div key={sub.id} className="flex items-center gap-3">
                  <div
                    className="w-11 h-11 rounded-xl text-white flex items-center justify-center font-bold text-lg shrink-0"
                    style={{ background: color }}
                  >
                    {initial}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-on-surface truncate">{sub.service_name}</p>
                    <p className="text-xs text-on-surface-variant">{dayLabel} · {sub.billing_cycle}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-semibold text-on-surface">${sub.price.toFixed(2)}</p>
                    <p className="text-xs text-on-surface-variant">{sub.currency}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
