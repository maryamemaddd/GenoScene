import React from 'react';
import { motion, HTMLMotionProps } from 'motion/react';

interface GlassPanelProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  className?: string;
  glow?: 'cyan' | 'teal' | 'violet' | 'none';
  borderStyle?: 'subtle' | 'highlight' | 'none';
  interactive?: boolean;
}

export const GlassPanel: React.FC<GlassPanelProps> = ({
  children,
  className = '',
  glow = 'none',
  borderStyle = 'subtle',
  interactive = false,
  ...props
}) => {
  const borderClasses = {
    subtle: 'border border-slate-800/80',
    highlight: 'border border-cyan-500/30',
    none: 'border-0'
  };

  const glowClasses = {
    cyan: 'shadow-[0_0_25px_-5px_rgba(6,182,212,0.12)]',
    teal: 'shadow-[0_0_25px_-5px_rgba(20,184,166,0.12)]',
    violet: 'shadow-[0_0_25px_-5px_rgba(168,85,247,0.12)]',
    none: 'shadow-lg shadow-black/40'
  };

  return (
    <motion.div
      whileHover={interactive ? { y: -2, transition: { duration: 0.2 } } : undefined}
      className={`bg-slate-900/70 backdrop-blur-xl rounded-2xl ${borderClasses[borderStyle]} ${glowClasses[glow]} relative overflow-hidden ${className}`}
      {...props}
    >

      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent pointer-events-none" />
      {children}
    </motion.div>
  );
};

