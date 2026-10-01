import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Eye, Scissors, Sparkles, Activity, Layers, Info, Camera, Sliders } from 'lucide-react';
import { TraitProbability } from '../../types/phenotype';
import { GlassPanel } from '../common/GlassPanel';
import { SCIENTIFIC_IMAGES } from '../../data/scientificImages';

interface PhenotypeCardProps<T extends string> {
  traitType: 'Eye Color' | 'Hair Color' | 'Skin Pigmentation';
  predictedCategory: T;
  probability: number;
  distribution: TraitProbability<T>[];
  keyMarkersCount?: number;
}

export function PhenotypeCard<T extends string>({
  traitType,
  predictedCategory,
  probability,
  distribution,
  keyMarkersCount = 6
}: PhenotypeCardProps<T>) {
  const [viewMode, setViewMode] = useState<'photo' | 'schematic'>('photo');

  const getIcon = () => {
    switch (traitType) {
      case 'Eye Color':
        return <Eye className="w-5 h-5 text-cyan-400" />;
      case 'Hair Color':
        return <Scissors className="w-5 h-5 text-teal-400" />;
      case 'Skin Pigmentation':
        return <Sparkles className="w-5 h-5 text-amber-400" />;
    }
  };

  const getAccentGlow = () => {
    switch (traitType) {
      case 'Eye Color':
        return 'cyan' as const;
      case 'Hair Color':
        return 'teal' as const;
      case 'Skin Pigmentation':
        return 'violet' as const;
    }
  };

  const getModelName = () => {
    switch (traitType) {
      case 'Eye Color':
        return 'Support Vector Classifier (SVC)';
      case 'Hair Color':
        return 'Stacking Classifier Ensemble';
      case 'Skin Pigmentation':
        return 'HistGradientBoosting (HGB)';
    }
  };

  const getMacroPhotoUrl = () => {
    if (traitType === 'Eye Color') {
      return predictedCategory === 'Blue'
        ? 'https://images.unsplash.com/photo-1544465544-1b71aee9dfa3?auto=format&fit=crop&w=400&q=80'
        : 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=400&q=80';
    }
    if (traitType === 'Hair Color') {
      return SCIENTIFIC_IMAGES.hairPigmentation.url;
    }
    return SCIENTIFIC_IMAGES.skinPigmentation.url;
  };

  const renderVisualIllustration = () => {
    const probPercent = Math.round(probability * 100);
    const photoUrl = getMacroPhotoUrl();

    if (viewMode === 'photo') {
      const ringColor =
        traitType === 'Eye Color' ? '#38bdf8' :
        traitType === 'Hair Color' ? '#2dd4bf' : '#fbbf24';

      return (
        <div className="relative py-2 flex items-center justify-center">
          <div className="relative w-32 h-32 flex items-center justify-center">

            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#1e293b"
                strokeWidth="4"
              />
              <motion.circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke={ringColor}
                strokeWidth="4"
                strokeDasharray={282.7}
                initial={{ strokeDashoffset: 282.7 }}
                animate={{ strokeDashoffset: 282.7 * (1 - probability) }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                strokeLinecap="round"
              />
            </svg>

            <div className="absolute inset-3 rounded-full bg-slate-950 flex items-center justify-center border-2 border-slate-700/80 shadow-2xl overflow-hidden group/img">
              <img
                src={photoUrl}
                alt={`${traitType} - ${predictedCategory} scientific macro`}
                referrerPolicy="no-referrer"
                loading="lazy"
                className="w-full h-full object-cover object-center group-hover/img:scale-110 transition-transform duration-700"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent pointer-events-none" />
            </div>

            <div className="absolute -bottom-1.5 bg-slate-900 border border-slate-700 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold text-cyan-300 shadow">
              {probPercent}% Match
            </div>
          </div>
        </div>
      );
    }

    if (traitType === 'Eye Color') {
      const isBlue = predictedCategory === 'Blue';
      const isGreen = predictedCategory === 'Green';
      const irisColor = isBlue ? '#38bdf8' : isGreen ? '#10b981' : '#78350f';
      const stromaColor = isBlue ? '#0284c7' : isGreen ? '#059669' : '#451a03';

      return (
        <div className="relative py-2 flex items-center justify-center">
          <div className="relative w-32 h-32 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" stroke="#1e293b" strokeWidth="4" />
              <motion.circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke={irisColor}
                strokeWidth="4"
                strokeDasharray={282.7}
                initial={{ strokeDashoffset: 282.7 }}
                animate={{ strokeDashoffset: 282.7 * (1 - probability) }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-3 rounded-full bg-slate-950 flex items-center justify-center border border-slate-700/80 shadow-inner overflow-hidden">
              <svg className="w-20 h-20" viewBox="0 0 60 60">
                <circle cx="30" cy="30" r="26" fill={irisColor} opacity="0.85" />
                {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
                  <line
                    key={deg}
                    x1="30"
                    y1="30"
                    x2={30 + 24 * Math.cos((deg * Math.PI) / 180)}
                    y2={30 + 24 * Math.sin((deg * Math.PI) / 180)}
                    stroke={stromaColor}
                    strokeWidth="1.2"
                    opacity="0.7"
                  />
                ))}
                <circle cx="30" cy="30" r="15" fill="none" stroke={stromaColor} strokeWidth="1" opacity="0.6" />
                <circle cx="30" cy="30" r="9" fill="#080c14" />
                <circle cx="26" cy="26" r="2.5" fill="#ffffff" opacity="0.8" />
              </svg>
            </div>
            <div className="absolute -bottom-1.5 bg-slate-900 border border-slate-700 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold text-cyan-300 shadow">
              {probPercent}% Match
            </div>
          </div>
        </div>
      );
    }

    if (traitType === 'Hair Color') {
      const isBlack = predictedCategory === 'Black';
      const isBrown = predictedCategory === 'Brown';
      const isBlond = predictedCategory === 'Blond';
      const hairHex = isBlack ? '#18181b' : isBrown ? '#5c2d16' : isBlond ? '#eab308' : '#dc2626';
      const highlightHex = isBlack ? '#3f3f46' : isBrown ? '#78350f' : isBlond ? '#fef08a' : '#f87171';

      return (
        <div className="relative py-2 flex items-center justify-center">
          <div className="relative w-full max-w-[200px] h-28 rounded-xl bg-slate-950/80 border border-slate-800 p-2.5 flex flex-col justify-between overflow-hidden">
            <div className="text-[10px] font-mono text-slate-400 flex items-center justify-between">
              <span>Follicular Strands</span>
              <span className="text-teal-300 font-bold">{predictedCategory}</span>
            </div>
            <svg className="w-full h-12" viewBox="0 0 160 40" fill="none">
              {[6, 12, 18, 24, 30].map((y, idx) => (
                <path
                  key={idx}
                  d={`M 10 ${y} Q 50 ${y - 4 + (idx % 2) * 8}, 90 ${y + 2} T 150 ${y}`}
                  stroke={idx % 2 === 0 ? hairHex : highlightHex}
                  strokeWidth="3.2"
                  strokeLinecap="round"
                  opacity={0.85}
                />
              ))}
            </svg>
            <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 border-t border-slate-800/80 pt-1">
              <span>Pheo/Eumelanin Ratio</span>
              <span className="text-white font-semibold">{probPercent}% Likelihood</span>
            </div>
          </div>
        </div>
      );
    }

    if (traitType === 'Skin Pigmentation') {
      return (
        <div className="relative py-2 flex items-center justify-center">
          <div className="w-full max-w-[230px] rounded-xl bg-slate-950/80 border border-slate-800 p-3 space-y-2">
            <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
              <span>Pigment Swatch Spectrum</span>
              <span className="text-amber-300 font-semibold">{probPercent}%</span>
            </div>
            <div className="relative h-6 rounded-lg overflow-hidden border border-slate-700 flex shadow-inner">
              <div className="h-full flex-1 bg-[#f5ebe6]" title="Very Light / Light" />
              <div className="h-full flex-1 bg-[#bcaaa4]" title="Intermediate" />
              <div className="h-full flex-1 bg-[#6d4c41]" title="Dark" />
              <div className="h-full flex-1 bg-[#3e2723]" title="Dark to Black" />
              <div
                className="absolute inset-y-0 w-1/4 border-2 border-white rounded shadow-[0_0_8px_rgba(255,255,255,0.7)]"
                style={{
                  left: predictedCategory === 'Very Light / Light' ? '0%' :
                        predictedCategory === 'Intermediate' ? '25%' :
                        predictedCategory === 'Dark' ? '50%' : '75%'
                }}
              />
            </div>
            <div className="flex items-center gap-1 text-[9px] font-mono text-slate-400 leading-tight">
              <Info className="w-3 h-3 text-amber-400 shrink-0" />
              <span>Categorical dermal spectrum calibration.</span>
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <GlassPanel
      glow={getAccentGlow()}
      borderStyle="subtle"
      className="p-6 h-full flex flex-col justify-between group hover:border-cyan-500/40 transition-all relative overflow-hidden"
    >
      <div>

        <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center shadow-inner">
              {getIcon()}
            </div>
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                Predicted Trait
              </span>
              <h3 className="text-lg font-bold text-white tracking-tight">
                {traitType}
              </h3>
            </div>
          </div>

          <div className="flex items-center bg-slate-900/90 rounded-lg p-0.5 border border-slate-800 text-[10px] font-mono">
            <button
              type="button"
              onClick={() => setViewMode('photo')}
              className={`px-1.5 py-0.5 rounded flex items-center gap-1 transition-colors ${
                viewMode === 'photo' ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/40 font-bold' : 'text-slate-400 hover:text-white'
              }`}
              title="Real Macro Photography"
            >
              <Camera className="w-3 h-3" />
              Photo
            </button>
            <button
              type="button"
              onClick={() => setViewMode('schematic')}
              className={`px-1.5 py-0.5 rounded flex items-center gap-1 transition-colors ${
                viewMode === 'schematic' ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/40 font-bold' : 'text-slate-400 hover:text-white'
              }`}
              title="Mathematical/Biological Schematic"
            >
              <Sliders className="w-3 h-3" />
              Model
            </button>
          </div>
        </div>

        <div className="py-3 flex items-baseline justify-between">
          <div>
            <span className="text-xs text-slate-400 block font-mono">TOP PREDICTION</span>
            <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {predictedCategory}
            </span>
          </div>
          <div className="text-right">
            <span className="text-xs text-slate-400 block font-mono">POSTERIOR PROBABILITY</span>
            <span className="text-2xl sm:text-3xl font-extrabold font-mono text-cyan-400">
              {(probability * 100).toFixed(2)}%
            </span>
          </div>
        </div>

        {renderVisualIllustration()}

        <div className="space-y-2.5 pt-3">
          <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
            Category Likelihood Distribution
          </span>
          <div className="space-y-2">
            {distribution.map((item) => {
              const percent = (item.probability * 100).toFixed(1);
              const isTop = item.category === predictedCategory;

              return (
                <div key={item.category} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1.5 font-medium text-slate-300">
                      <span
                        className="w-2.5 h-2.5 rounded-full shrink-0 shadow-sm"
                        style={{ backgroundColor: item.colorHex }}
                      />
                      <span className={isTop ? 'text-white font-semibold' : 'text-slate-400'}>
                        {item.category}
                      </span>
                    </span>
                    <span className="font-mono text-slate-300 text-xs">
                      {percent}%
                    </span>
                  </div>

                  <div className="h-2 w-full bg-slate-800/80 rounded-full overflow-hidden p-0.5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.probability * 100}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                      className="h-full rounded-full"
                      style={{
                        backgroundColor: item.colorHex,
                        boxShadow: isTop ? `0 0 10px ${item.colorHex}66` : 'none'
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
        <span className="flex items-center gap-1.5 truncate max-w-[200px]">
          <Activity className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
          <span className="truncate">{getModelName()}</span>
        </span>
        <span className="text-slate-400 shrink-0">Calibrated P(Y=c|X)</span>
      </div>
    </GlassPanel>
  );
}

