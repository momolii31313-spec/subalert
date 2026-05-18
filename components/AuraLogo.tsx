'use client';

type Props = {
  size?: 'sm' | 'md' | 'lg';
  color?: 'default' | 'white';
  variant?: 'full' | 'icon';
};

export function SubAlertLogo({ size = 'md', color = 'default', variant = 'full' }: Props) {
  const dimensions = {
    sm: { box: 'w-9 h-9', iconSize: 22, text: 'text-lg' },
    md: { box: 'w-12 h-12', iconSize: 28, text: 'text-2xl' },
    lg: { box: 'w-16 h-16', iconSize: 36, text: 'text-3xl' },
  }[size];

  const isWhite = color === 'white';
  const bgClass = isWhite ? 'bg-white' : 'bg-primary';
  const textColor = isWhite ? 'text-white' : 'text-on-surface';
  const accentColor = isWhite ? 'text-white' : 'text-primary';
  const iconColor = isWhite ? '#6d3bd7' : '#ffffff';

  const Icon = (
    <div className={`${dimensions.box} rounded-2xl ${bgClass} flex items-center justify-center relative shrink-0`}>
      <svg width={dimensions.iconSize} height={dimensions.iconSize} viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
        <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
      </svg>
      <span className="absolute" style={{
        top: '4px',
        right: '4px',
        width: '10px',
        height: '10px',
        background: '#ff4757',
        borderRadius: '50%',
        border: `2px solid ${isWhite ? '#fff' : '#6d3bd7'}`,
      }} />
    </div>
  );

  if (variant === 'icon') return Icon;

  return (
    <div className="flex items-center gap-2.5">
      {Icon}
      <span className={`font-bold ${dimensions.text} tracking-tight ${textColor}`}>
        Sub<span className={accentColor}>Alert</span>
      </span>
    </div>
  );
}

export { SubAlertLogo as AuraLogo };
