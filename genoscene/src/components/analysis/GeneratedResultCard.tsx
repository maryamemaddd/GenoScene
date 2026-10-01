import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShieldAlert,
  Download,
  Layers,
  Eye,
  Scissors,
  Sparkles,
  Activity,
  Calendar,
  CheckCircle2,
  RefreshCw,
  Share2
} from 'lucide-react';
import { PhenotypePredictionResult, VisualGuidanceProfile } from '../../types/phenotype';
import { GlassPanel } from '../common/GlassPanel';
import { Button } from '../common/Button';

interface GeneratedResultCardProps {
  result: PhenotypePredictionResult;
  visualProfile: VisualGuidanceProfile;
  onRegenerate: () => void;
}

export const GeneratedResultCard: React.FC<GeneratedResultCardProps> = ({
  result,
  visualProfile,
  onRegenerate
}) => {
  const [activeViewMode, setActiveViewMode] = useState<'composite' | 'mesh' | 'melanin'>('composite');
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const eyeHex = result.eyeColor.predicted === 'Brown' ? '#78350f' :
    result.eyeColor.predicted === 'Blue' ? '#38bdf8' : '#10b981';

  const hairHex = result.hairColor.predicted === 'Black' ? '#18181b' :
    result.hairColor.predicted === 'Brown' ? '#5c2d16' :
      result.hairColor.predicted === 'Blond' ? '#eab308' : '#dc2626';

  const skinBase = result.skinPigmentation.predicted === 'Dark to Black' ? '#3e2723' :
    result.skinPigmentation.predicted === 'Dark' ? '#6d4c41' :
      result.skinPigmentation.predicted === 'Intermediate' ? '#bcaaa4' : '#f5ebe6';

  const skinShadow = result.skinPigmentation.predicted === 'Dark to Black' ? '#271714' :
    result.skinPigmentation.predicted === 'Dark' ? '#4e342e' :
      result.skinPigmentation.predicted === 'Intermediate' ? '#8d6e63' : '#d7ccc8';

  const handleDownload = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <GlassPanel
      borderStyle="highlight"
      glow="cyan"
      className="p-6 sm:p-8 space-y-6 bg-gradient-to-br from-slate-900/95 via-slate-950 to-[#080e1b]"
    >

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-xs font-mono font-semibold text-cyan-300">
              SYNTHESIS COMPLETE
            </span>
            <span className="text-xs font-mono text-slate-400">
              ID: {visualProfile.id}
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight mt-1">
            Visual Guidance Representation
          </h3>
        </div>

        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono">
          {[
            { id: 'composite', label: 'Composite Portrait' },
            { id: 'mesh', label: 'Guidance Grid' },
            { id: 'melanin', label: 'Melanin Spectrum' }
          ].map((mode) => (
            <button
              key={mode.id}
              onClick={() => setActiveViewMode(mode.id as any)}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${activeViewMode === mode.id
                  ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/40 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
                }`}
            >
              {mode.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-square max-w-md mx-auto rounded-2xl bg-gradient-to-b from-[#0e1628] via-[#090d18] to-slate-950 border border-slate-700/80 overflow-hidden shadow-2xl flex items-center justify-center group">

            <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none z-10" />
            <div className="absolute inset-x-0 top-1/2 h-px bg-cyan-500/20 pointer-events-none z-10" />
            <div className="absolute inset-y-0 left-1/2 w-px bg-cyan-500/20 pointer-events-none z-10" />

            {activeViewMode === 'composite' && visualProfile.imageUrl ? (
              <img
                src={visualProfile.imageUrl}
                alt="Generated Phenotype Visual"
                className="w-full h-full object-cover relative z-0 transition-all duration-500"
              />
            ) : (
              <svg
                className="w-full h-full max-w-[340px] max-h-[340px] transition-all duration-500 relative z-0"
                viewBox="0 0 400 400"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>

                  <radialGradient id="skinGradient" cx="50%" cy="45%" r="50%">
                    <stop offset="0%" stopColor={skinBase} />
                    <stop offset="85%" stopColor={skinShadow} />
                    <stop offset="100%" stopColor="#111827" stopOpacity="0.8" />
                  </radialGradient>

                  <radialGradient id="melaninGradient" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.3" />
                  </radialGradient>

                  <linearGradient id="hairGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={hairHex} />
                    <stop offset="50%" stopColor={hairHex} stopOpacity="0.85" />
                    <stop offset="100%" stopColor="#09090b" />
                  </linearGradient>
                </defs>

                <path
                  d="M165 260 L165 340 Q200 355 235 340 L235 260"
                  fill={activeViewMode === 'melanin' ? 'url(#melaninGradient)' : 'url(#skinGradient)'}
                  stroke="rgba(56,189,248,0.2)"
                  strokeWidth="1"
                />

                <ellipse
                  cx="200"
                  cy="200"
                  rx="85"
                  ry="110"
                  fill={activeViewMode === 'melanin' ? 'url(#melaninGradient)' : 'url(#skinGradient)'}
                  stroke={activeViewMode === 'mesh' ? '#06b6d4' : 'rgba(56,189,248,0.3)'}
                  strokeWidth={activeViewMode === 'mesh' ? 1.5 : 1}
                  strokeDasharray={activeViewMode === 'mesh' ? '3 3' : 'none'}
                />

                <path
                  d="M115 170 C110 110, 150 90, 200 90 C250 90, 290 110, 285 170 C270 145, 250 140, 200 140 C150 140, 130 145, 115 170 Z"
                  fill="url(#hairGradient)"
                  stroke="rgba(255,255,255,0.15)"
                  strokeWidth="1.2"
                />

                <path
                  d="M150 168 Q170 162 185 167"
                  stroke={hairHex}
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                <path
                  d="M215 167 Q230 162 250 168"
                  stroke={hairHex}
                  strokeWidth="4"
                  strokeLinecap="round"
                />

                <g id="leftEye">
                  <path
                    d="M150 185 Q167 175 185 185 Q167 195 150 185 Z"
                    fill="#f8fafc"
                    stroke="rgba(0,0,0,0.5)"
                    strokeWidth="1"
                  />
                  <circle cx="167" cy="185" r="5.5" fill={eyeHex} />
                  <circle cx="167" cy="185" r="2.5" fill="#09090b" />
                  <circle cx="165.5" cy="183.5" r="1" fill="#ffffff" />
                </g>

                <g id="rightEye">
                  <path
                    d="M215 185 Q233 175 250 185 Q233 195 215 185 Z"
                    fill="#f8fafc"
                    stroke="rgba(0,0,0,0.5)"
                    strokeWidth="1"
                  />
                  <circle cx="233" cy="185" r="5.5" fill={eyeHex} />
                  <circle cx="233" cy="185" r="2.5" fill="#09090b" />
                  <circle cx="231.5" cy="183.5" r="1" fill="#ffffff" />
                </g>

                <path
                  d="M200 178 L197 220 Q200 226 205 220"
                  stroke="rgba(0,0,0,0.3)"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  fill="none"
                />

                <path
                  d="M178 255 Q200 250 222 255 Q200 265 178 255 Z"
                  fill={result.skinPigmentation.predicted === 'Pale' ? '#f43f5e' : '#be123c'}
                  fillOpacity="0.45"
                  stroke="rgba(0,0,0,0.4)"
                  strokeWidth="1"
                />

                {activeViewMode === 'mesh' && (
                  <g id="facialGuidanceGrid" className="animate-pulse">

                    {[120, 130, 142, 160, 180, 200, 220, 240, 258, 270, 280].map((x, i) => (
                      <circle key={`jaw-${i}`} cx={x} cy={170 + Math.abs(x - 200) * 0.7} r="2" fill="#06b6d4" />
                    ))}

                    <circle cx="150" cy="168" r="2" fill="#22d3ee" />
                    <circle cx="168" cy="164" r="2" fill="#22d3ee" />
                    <circle cx="185" cy="167" r="2" fill="#22d3ee" />
                    <circle cx="215" cy="167" r="2" fill="#22d3ee" />
                    <circle cx="232" cy="164" r="2" fill="#22d3ee" />
                    <circle cx="250" cy="168" r="2" fill="#22d3ee" />

                    <circle cx="200" cy="190" r="2" fill="#22d3ee" />
                    <circle cx="200" cy="210" r="2" fill="#22d3ee" />
                    <circle cx="193" cy="223" r="2" fill="#22d3ee" />
                    <circle cx="207" cy="223" r="2" fill="#22d3ee" />
                    <circle cx="178" cy="255" r="2" fill="#22d3ee" />
                    <circle cx="200" cy="253" r="2" fill="#22d3ee" />
                    <circle cx="222" cy="255" r="2" fill="#22d3ee" />
                    <circle cx="200" cy="262" r="2" fill="#22d3ee" />

                    <line x1="167" y1="185" x2="200" y2="210" stroke="rgba(6,182,212,0.4)" strokeWidth="0.8" />
                    <line x1="233" y1="185" x2="200" y2="210" stroke="rgba(6,182,212,0.4)" strokeWidth="0.8" />
                    <line x1="200" y1="210" x2="200" y2="253" stroke="rgba(6,182,212,0.4)" strokeWidth="0.8" />
                  </g>
                )}
              </svg>
            )}

            <div className="absolute top-3 left-3 space-y-1">
              <div className="px-2.5 py-1 rounded-md bg-slate-950/85 border border-slate-700/80 text-[11px] font-mono text-slate-200 flex items-center gap-1.5 shadow-md">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: eyeHex }} />
                <span>Eye: {result.eyeColor.predicted} ({(result.eyeColor.probability * 100).toFixed(1)}%)</span>
              </div>
              <div className="px-2.5 py-1 rounded-md bg-slate-950/85 border border-slate-700/80 text-[11px] font-mono text-slate-200 flex items-center gap-1.5 shadow-md">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: hairHex }} />
                <span>Hair: {result.hairColor.predicted} ({(result.hairColor.probability * 100).toFixed(1)}%)</span>
              </div>
              <div className="px-2.5 py-1 rounded-md bg-slate-950/85 border border-slate-700/80 text-[11px] font-mono text-slate-200 flex items-center gap-1.5 shadow-md">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: skinBase }} />
                <span>Skin: {result.skinPigmentation.predicted}</span>
              </div>
            </div>

            <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-slate-950/90 border border-cyan-500/40 text-[10px] font-mono text-cyan-300">
              {activeViewMode === 'composite' && 'MODE: COMPOSITE'}
              {activeViewMode === 'mesh' && 'MODE: GUIDANCE GRID'}
              {activeViewMode === 'melanin' && 'MODE: MELANIN SPECTRA'}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                size="sm"
                icon={<Download className="w-3.5 h-3.5" />}
                onClick={handleDownload}
              >
                {downloadSuccess ? 'Downloaded Report' : 'Export Phenotype Report'}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                icon={<RefreshCw className="w-3.5 h-3.5" />}
                onClick={onRegenerate}
              >
                Regenerate Visual
              </Button>
            </div>
            <span className="text-[11px] font-mono text-slate-400">
              Seed: #{visualProfile.visualGuidanceSeed}
            </span>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-4">
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
              <Activity className="w-4 h-4" />
              Forensic Prediction Summary
            </h4>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between py-1.5 border-b border-slate-800/80">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-cyan-400" />
                  Eye Color Classification
                </span>
                <span className="font-bold text-white font-mono">
                  {result.eyeColor.predicted} ({(result.eyeColor.probability * 100).toFixed(1)}%)
                </span>
              </div>

              <div className="flex items-center justify-between py-1.5 border-b border-slate-800/80">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Scissors className="w-3.5 h-3.5 text-teal-400" />
                  Hair Color Classification
                </span>
                <span className="font-bold text-white font-mono">
                  {result.hairColor.predicted} ({(result.hairColor.probability * 100).toFixed(1)}%)
                </span>
              </div>

              <div className="flex items-center justify-between py-1.5 border-b border-slate-800/80">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  Skin Tone Classification
                </span>
                <span className="font-bold text-white font-mono">
                  {result.skinPigmentation.predicted} ({(result.skinPigmentation.probability * 100).toFixed(1)}%)
                </span>
              </div>

              <div className="flex items-center justify-between py-1.5 border-b border-slate-800/80">
                <span className="text-slate-400">Model Confidence</span>
                <span className="font-bold text-emerald-400 font-mono">
                  {visualProfile.modelConfidence}%
                </span>
              </div>

              <div className="flex items-center justify-between py-1.5">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  Synthesis Timestamp
                </span>
                <span className="font-mono text-slate-300 text-[11px]">
                  {visualProfile.renderTimestamp}
                </span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-amber-950/25 border border-amber-500/40 text-xs text-amber-200/90 space-y-1.5 leading-relaxed">
            <div className="flex items-center gap-2 text-amber-300 font-bold">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>Visual Guidance Only</span>
            </div>
            <p className="text-[11px] text-amber-200/80 leading-relaxed">
              The generated image is an AI-assisted visual representation based on predicted phenotype traits. It is not an exact reconstruction or biometric identification of an individual.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 text-[11px] font-mono text-slate-400 space-y-1">
            <div className="text-slate-300 font-semibold">Investigative Use Guidance:</div>
            <p className="text-slate-400 leading-normal">
              Utilize this profile solely to corroborate witness recollections or prioritize reference DNA sampling pools in unresolved casework.
            </p>
          </div>

        </div>

      </div>
    </GlassPanel>
  );
};

