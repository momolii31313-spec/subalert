'use client';
import Link from 'next/link';

type Props = { active: 'dashboard' | 'alerts' | 'profile' };

export default function BottomNav({ active }: Props) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-outline-variant">
      <div className="max-w-md mx-auto flex items-center justify-around px-4 py-2">
        <NavItem href="/dashboard" label="Home" active={active === 'dashboard'} icon={
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        } />
        <NavItem href="/alerts" label="Alerts" active={active === 'alerts'} icon={
          <>
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
          </>
        } />
        <NavItem href="/profile" label="Profile" active={active === 'profile'} icon={
          <>
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </>
        } />
      </div>
    </nav>
  );
}

function NavItem({ href, label, active, icon }: { href: string; label: string; active: boolean; icon: React.ReactNode }) {
  const color = active ? '#6d3bd7' : '#8a7a73';
  return (
    <Link href={href} className="flex flex-col items-center gap-1 py-2 px-4 min-w-[64px]" aria-current={active ? 'page' : undefined}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill={active ? color : 'none'} stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {icon}
      </svg>
      <span className="text-xs font-medium" style={{ color }}>{label}</span>
    </Link>
  );
}
