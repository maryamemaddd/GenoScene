import React from 'react';

interface TraitBadgeProps {
  category: string;
  type: 'eye' | 'hair' | 'skin' | 'marker' | 'confidence';
  probability?: number;
  className?: string;
  size?: 'sm' | 'md';
}

export const TraitBadge: React.FC<TraitBadgeProps> = ({
  category,
  type,
  probability,
  className = '',
  size = 'md'
}) => {
  const getBadgeStyle = () => {
    switch (type) {
      case 'eye':
        if (category === 'Blue') return 'bg-sky-950/60 border-sky-500/40 text-sky-200';
        if (category === 'Brown') return 'bg-amber-950/60 border-amber-600/40 text-amber-200';
        return 'bg-emerald-950/60 border-emerald-500/40 text-emerald-200';
      case 'hair':
        if (category === 'Black') return 'bg-zinc-900 border-zinc-700 text-zinc-200';
        if (category === 'Brown') return 'bg-yellow-950/70 border-yellow-700/50 text-yellow-200';
        if (category === 'Blond') return 'bg-amber-950/50 border-amber-400/40 text-amber-200';
        return 'bg-rose-950/60 border-rose-500/40 text-rose-200';
      case 'skin':
        if (category === 'Pale') return 'bg-orange-950/30 border-orange-200/30 text-orange-100';
        if (category === 'Intermediate') return 'bg-stone-900 border-amber-600/30 text-stone-200';
        if (category === 'Dark') return 'bg-stone-950 border-stone-600 text-amber-100';
        return 'bg-neutral-950 border-amber-900/60 text-amber-200';
      case 'confidence':
        return 'bg-cyan-950/60 border-cyan-500/30 text-cyan-200';
      default:
        return 'bg-slate-800/80 border-slate-700 text-slate-200';
    }
  };

  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs md:text-sm';

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-lg border font-medium whitespace-nowrap ${getBadgeStyle()} ${sizeClasses} ${className}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80 shrink-0" />
      <span>{category}</span>
      {probability !== undefined && (
        <span className="opacity-75 font-mono text-[11px] ml-0.5">
          {(probability * 100).toFixed(1)}%
        </span>
      )}
    </span>
  );
};

