import React from 'react';
import { motion } from 'motion/react';
import { Dna, Cpu, Activity, Sparkles, CheckCircle2, Layers, FileSpreadsheet } from 'lucide-react';
import { GlassPanel } from '../common/GlassPanel';

interface ProcessingAnimationProps {
  currentStage: string;
  progressPercent: number;
  type?: 'genotype_analysis' | 'visual_synthesis';
}

export const ProcessingAnimation: React.FC<ProcessingAnimationProps> = ({
  currentStage,
  progressPercent,
  type = 'genotype_analysis'
}) => {
  const isVisual = type === 'visual_synthesis';

  const analysisStages = [
    { name: 'Reading SNP data', pct: 20, icon: <FileSpreadsheet className="w-4 h-4" /> },
    { name: 'Processing selected features', pct: 40, icon: <Layers className="w-4 h-4" /> },
    { name: 'Running phenotype models', pct: 65, icon: <Cpu className="w-4 h-4" /> },
    { name: 'Calculating probabilities', pct: 85, icon: <Activity className="w-4 h-4" /> },
    { name: 'Preparing results', pct: 100, icon: <CheckCircle2 className="w-4 h-4" /> }
  ];

  const synthesisStages = [
    { name: 'Encoding Phenotype Parameters', pct: 25, icon: <Activity className="w-4 h-4" /> },
    { name: 'Initializing Latent Manifold', pct: 50, icon: <Cpu className="w-4 h-4" /> },
    { name: 'Conditioning Melanin Vectors', pct: 75, icon: <Sparkles className="w-4 h-4" /> },
    { name: 'Synthesizing Visual Guidance', pct: 100, icon: <CheckCircle2 className="w-4 h-4" /> }
  ];

  const stagesList = isVisual ? synthesisStages : analysisStages;

  return (
    <GlassPanel
      borderStyle="highlight"
      glow="cyan"
      className="p-6 sm:p-10 text-center max-w-2xl mx-auto space-y-7 bg-gradient-to-b from-slate-900/95 to-[#070c17] shadow-2xl"
    >

      <div className="relative w-28 h-28 mx-auto flex items-center justify-center">

        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-0 rounded-full border border-cyan-500/30"
        />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-2 rounded-2xl border border-dashed border-cyan-400/50"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-5 rounded-full border border-dotted border-teal-400/40"
        />

        <div className="relative z-10 w-14 h-14 rounded-xl bg-slate-900/90 border border-slate-700/80 flex items-center justify-center text-cyan-400 shadow-lg shadow-cyan-950/60">
          {isVisual ? (
            <Sparkles className="w-7 h-7 animate-pulse text-cyan-300" />
          ) : (
            <Dna className="w-7 h-7 animate-pulse text-cyan-400" />
          )}
        </div>
      </div>

      <div className="space-y-2">
        <span className="px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-xs font-mono text-cyan-300">
          {isVisual ? 'LATENT DIFFUSION SYNTHESIS PIPELINE' : 'GENOTYPE INFERENCE WORKSPACE'}
        </span>
        <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
          {isVisual ? 'Synthesizing Visual Phenotype Guidance...' : 'Analyzing SNP Genetic Markers...'}
        </h3>
        <p className="text-xs sm:text-sm text-cyan-200 font-mono min-h-[22px]">
          {currentStage || 'Executing forensic analytical model...'}
        </p>
      </div>

      <div className="space-y-3 max-w-lg mx-auto">
        <div className="flex justify-between text-xs font-mono text-slate-400">
          <span>PIPELINE PROGRESS</span>
          <span className="text-cyan-400 font-bold">{progressPercent}%</span>
        </div>

        <div className="h-2.5 w-full bg-slate-800/90 rounded-full overflow-hidden p-0.5 border border-slate-700/60">
          <motion.div
            className="h-full bg-gradient-to-r from-cyan-500 via-teal-400 to-sky-400 rounded-full shadow-[0_0_12px_rgba(6,182,212,0.7)]"
            style={{ width: `${progressPercent}%` }}
            transition={{ ease: 'easeOut' }}
          />
        </div>

        <div className="pt-2 grid grid-cols-2 sm:grid-cols-3 gap-2 text-left">
          {stagesList.map((step, idx) => {
            const isDone = progressPercent >= step.pct;
            const isCurrent = progressPercent < step.pct && (idx === 0 || progressPercent >= stagesList[idx - 1].pct);

            return (
              <div
                key={step.name}
                className={`p-2 rounded-lg border text-[11px] font-mono flex items-center gap-2 transition-colors ${
                  isDone
                    ? 'bg-cyan-950/50 border-cyan-500/40 text-cyan-300'
                    : isCurrent
                    ? 'bg-slate-800/80 border-cyan-400 text-white animate-pulse'
                    : 'bg-slate-900/40 border-slate-800/60 text-slate-400'
                }`}
              >
                <span className={isDone ? 'text-teal-400' : isCurrent ? 'text-cyan-400' : 'text-slate-400'}>
                  {step.icon}
                </span>
                <span className="truncate">{step.name}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="pt-4 border-t border-slate-800/80 grid grid-cols-3 gap-3 text-left max-w-md mx-auto text-xs font-mono">
        <div>
          <div className="text-slate-400 text-[10px]">LOCI COVERAGE</div>
          <div className="text-white font-semibold">40 Markers Verified</div>
        </div>
        <div>
          <div className="text-slate-400 text-[10px]">SUPERVISED CORE</div>
          <div className="text-teal-300 font-semibold">SVC / Stacking / HGB</div>
        </div>
        <div>
          <div className="text-slate-400 text-[10px]">EXECUTION STATUS</div>
          <div className="text-emerald-400 font-semibold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span>Active</span>
          </div>
        </div>
      </div>
    </GlassPanel>
  );
};

