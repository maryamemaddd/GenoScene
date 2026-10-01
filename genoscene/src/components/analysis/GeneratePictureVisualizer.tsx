import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, UserCheck, Eye, Scissors, Dna, Cpu, ArrowRight, ShieldAlert } from 'lucide-react';
import { PhenotypePredictionResult } from '../../types/phenotype';
import { GlassPanel } from '../common/GlassPanel';
import { Button } from '../common/Button';

interface GeneratePictureVisualizerProps {
  result: PhenotypePredictionResult;
  onGenerate: () => void;
}

export const GeneratePictureVisualizer: React.FC<GeneratePictureVisualizerProps> = ({
  result,
  onGenerate
}) => {
  const eyeColor = result.eyeColor.predicted;
  const hairColor = result.hairColor.predicted;
  const skinTone = result.skinPigmentation.predicted;

  const eyeHex = eyeColor === 'Brown' ? '#78350f' : eyeColor === 'Blue' ? '#38bdf8' : '#10b981';
  const hairHex = hairColor === 'Black' ? '#18181b' : hairColor === 'Brown' ? '#5c2d16' : hairColor === 'Blond' ? '#eab308' : '#dc2626';

  return (
    <GlassPanel
      borderStyle="highlight"
      glow="cyan"
      className="p-6 sm:p-8 bg-gradient-to-br from-slate-900/95 via-slate-950 to-[#070b15] shadow-2xl relative overflow-hidden"
    >

      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
      <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 space-y-6">

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800/80">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-xs font-mono text-cyan-300 mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>LATENT DIFFUSION SYNTHESIS WORKSPACE</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Generate Visual Phenotype Guidance
            </h3>
          </div>

          <span className="px-3 py-1 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300">
            Status: Ready to Synthesize
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">

          <div className="lg:col-span-5 space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block">
              Conditioning Latent Vector
            </span>

            <div className="space-y-2">

              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: eyeHex }} />
                  <div>
                    <span className="text-slate-400 block text-[10px]">OCULAR PARAMETER</span>
                    <span className="font-bold text-white">{eyeColor}</span>
                  </div>
                </div>
                <span className="font-mono text-cyan-400 font-semibold">
                  {(result.eyeColor.probability * 100).toFixed(1)}%
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full border border-slate-600" style={{ backgroundColor: hairHex }} />
                  <div>
                    <span className="text-slate-400 block text-[10px]">FOLLICULAR PARAMETER</span>
                    <span className="font-bold text-white">{hairColor}</span>
                  </div>
                </div>
                <span className="font-mono text-teal-400 font-semibold">
                  {(result.hairColor.probability * 100).toFixed(1)}%
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-amber-600" />
                  <div>
                    <span className="text-slate-400 block text-[10px]">DERMAL PARAMETER</span>
                    <span className="font-bold text-white">{skinTone}</span>
                  </div>
                </div>
                <span className="font-mono text-amber-400 font-semibold">
                  {(result.skinPigmentation.probability * 100).toFixed(1)}%
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 flex flex-col items-center justify-center my-2 lg:my-0">
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                className="w-14 h-14 rounded-2xl border border-dashed border-cyan-400/40 flex items-center justify-center"
              />
              <div className="absolute inset-0 flex items-center justify-center text-cyan-400">
                <Cpu className="w-6 h-6" />
              </div>
            </div>
            <div className="text-[10px] font-mono text-slate-400 text-center mt-2 leading-tight">
              Conditioning
              <br />
              Manifold
            </div>
          </div>

          <div className="lg:col-span-5 space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block">
              Guidance Blueprint Silhouette
            </span>

            <div className="relative h-44 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 flex items-center justify-center overflow-hidden">

              <svg className="w-32 h-32 text-cyan-400/50" viewBox="0 0 100 100" fill="none">

                <path
                  d="M50 16 C32 16, 26 34, 26 54 C26 74, 40 88, 50 88 C60 88, 74 74, 74 54 C74 34, 68 16, 50 16 Z"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeDasharray="3 3"
                />

                <line x1="20" y1="44" x2="80" y2="44" stroke="rgba(56,189,248,0.3)" strokeWidth="1" strokeDasharray="2 2" />
                <line x1="50" y1="18" x2="50" y2="84" stroke="rgba(56,189,248,0.3)" strokeWidth="1" strokeDasharray="2 2" />

                <ellipse cx="38" cy="44" rx="4.5" ry="2.8" fill="none" stroke="currentColor" strokeWidth="1" />
                <circle cx="38" cy="44" r="1.5" fill={eyeHex} />
                <ellipse cx="62" cy="44" rx="4.5" ry="2.8" fill="none" stroke="currentColor" strokeWidth="1" />
                <circle cx="62" cy="44" r="1.5" fill={eyeHex} />

                <circle cx="50" cy="58" r="1.5" fill="currentColor" opacity="0.6" />
                <path d="M44 70 Q50 74 56 70" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.6" />
              </svg>

              <div className="absolute top-2 left-2 text-[9px] font-mono text-cyan-400/60">
                [GRID: ACTIVE]
              </div>
              <div className="absolute bottom-2 right-2 text-[9px] font-mono text-slate-400">
                AWAITING SYNTHESIS
              </div>
            </div>
          </div>

        </div>

        <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left max-w-xl">
            <h4 className="text-sm font-bold text-white tracking-tight flex items-center justify-center sm:justify-start gap-1.5">
              <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Visual Guidance Only</span>
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed font-normal">
              The generated image is an AI-assisted visual representation based on predicted phenotype traits.
              It is not an exact reconstruction or biometric identification of an individual.
            </p>
          </div>

          <Button
            variant="primary"
            size="lg"
            icon={<UserCheck className="w-5 h-5" />}
            onClick={onGenerate}
            className="w-full sm:w-auto shadow-cyan-500/35 shrink-0"
          >
            Generate Visual Guidance
          </Button>
        </div>

      </div>
    </GlassPanel>
  );
};

