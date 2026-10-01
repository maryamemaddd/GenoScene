import React, { useState } from 'react';
import { motion } from 'motion/react';
import { BarChart3, Info, Eye, Scissors, Sparkles, Filter } from 'lucide-react';
import { PhenotypePredictionResult } from '../../types/phenotype';
import { GlassPanel } from '../common/GlassPanel';

interface ProbabilityChartProps {
  result: PhenotypePredictionResult;
}

export const ProbabilityChart: React.FC<ProbabilityChartProps> = ({ result }) => {
  const [selectedTrait, setSelectedTrait] = useState<'all' | 'eye' | 'hair' | 'skin'>('all');

  const allCategories = [

    ...result.eyeColor.distribution.map((d) => ({
      ...d,
      trait: 'Eye Color',
      traitKey: 'eye' as const,
      isTop: d.category === result.eyeColor.predicted
    })),

    ...result.hairColor.distribution.map((d) => ({
      ...d,
      trait: 'Hair Color',
      traitKey: 'hair' as const,
      isTop: d.category === result.hairColor.predicted
    })),

    ...result.skinPigmentation.distribution.map((d) => ({
      ...d,
      trait: 'Skin Tone',
      traitKey: 'skin' as const,
      isTop: d.category === result.skinPigmentation.predicted
    }))
  ];

  const displayedCategories = selectedTrait === 'all'
    ? allCategories
    : allCategories.filter((c) => c.traitKey === selectedTrait);

  return (
    <GlassPanel borderStyle="subtle" className="p-6 sm:p-8 space-y-6">

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              Phenotype Probability Distribution
            </h3>
            <p className="text-xs text-slate-400">
              Interactive likelihood spectrum across categorical phenotypic classifications
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-950/80 border border-slate-800 text-xs">
          {[
            { id: 'all', label: 'All Traits' },
            { id: 'eye', label: 'Eye' },
            { id: 'hair', label: 'Hair' },
            { id: 'skin', label: 'Skin' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedTrait(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                selectedTrait === tab.id
                  ? 'bg-cyan-950/90 text-cyan-300 border border-cyan-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {displayedCategories.map((item, idx) => {
          const probabilityPercent = (item.probability * 100).toFixed(2);
          const barWidth = Math.max(item.probability * 100, 2);

          return (
            <div key={`${item.trait}-${item.category}`} className="space-y-1.5">

              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full shrink-0 shadow-sm border border-black/30"
                    style={{ backgroundColor: item.colorHex }}
                  />
                  <span className="font-semibold text-white">
                    {item.category}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">
                    ({item.trait})
                  </span>
                  {item.isTop && (
                    <span className="px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30 text-[10px] font-mono">
                      PRIMARY
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  {item.description && (
                    <span className="hidden md:inline text-[11px] text-slate-400 max-w-sm truncate">
                      {item.description}
                    </span>
                  )}
                  <span className="font-mono font-bold text-sm text-cyan-300 min-w-[60px] text-right">
                    {probabilityPercent}%
                  </span>
                </div>
              </div>

              <div className="relative h-4 w-full bg-slate-950/80 rounded-lg p-0.5 overflow-hidden border border-slate-800/80">

                <div className="absolute inset-0 flex justify-between px-2 pointer-events-none opacity-20">
                  <span className="w-px h-full bg-slate-400" />
                  <span className="w-px h-full bg-slate-400" />
                  <span className="w-px h-full bg-slate-400" />
                </div>

                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${barWidth}%` }}
                  transition={{ duration: 0.8, delay: idx * 0.04, ease: 'easeOut' }}
                  className="h-full rounded-md relative flex items-center justify-end pr-1"
                  style={{
                    backgroundColor: item.colorHex,
                    boxShadow: item.isTop ? `0 0 12px ${item.colorHex}77` : 'none'
                  }}
                >
                  {item.probability > 0.25 && (
                    <span className="text-[9px] font-mono font-bold text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                      {probabilityPercent}%
                    </span>
                  )}
                </motion.div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-3 text-xs text-slate-300">
        <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <span className="font-semibold text-white block mb-0.5">
            Statistical Interpretation Notice
          </span>
          Prediction probabilities represent model estimates and should be interpreted as probabilities rather than absolute certainty.
          Individual phenotypic manifestation may be subject to environmental factors, rare penetrant mutations not captured in the 40-SNP panel, or unanalyzed genetic variations.
          Category color swatches serve as visual classification markers and do not represent exact photographic skin tone or color matching.
        </div>
      </div>
    </GlassPanel>
  );
};

