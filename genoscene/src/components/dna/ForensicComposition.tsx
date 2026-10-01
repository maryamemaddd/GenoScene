import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Dna, Cpu, Eye, Sparkles, Activity, ShieldCheck, Layers, Scissors, ArrowRight, Play, Pause } from 'lucide-react';

export const ForensicComposition: React.FC = () => {
  const [activeStage, setActiveStage] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveStage((prev) => (prev + 1) % 4);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const stages = [
    { id: 0, label: '1. DNA Helix', tag: 'Double Helix & Base Pairs', desc: '40 Forensic Loci Ingestion' },
    { id: 1, label: '2. SNP Markers', tag: 'rsID Allelic Calls', desc: 'Additive Dosage Matrix (0, 1, 2)' },
    { id: 2, label: '3. AI Models', tag: 'SVC / Stacking / HGB', desc: 'Posterior Probability Inference' },
    { id: 3, label: '4. Visual Guidance', tag: 'Phenotype Projection', desc: 'AI-Assisted Visual Representation' }
  ];

  const snpMarkers = [
    { rs: 'rs12913832', gene: 'HERC2 / OCA2', allele: 'G/G', trait: 'Iris Melanin', color: '#38bdf8' },
    { rs: 'rs1426654', gene: 'SLC24A5', allele: 'A/A', trait: 'Dermal Tone', color: '#14b8a6' },
    { rs: 'rs1805007', gene: 'MC1R', allele: 'C/C', trait: 'Hair Pigment', color: '#818cf8' },
    { rs: 'rs16891982', gene: 'SLC45A2', allele: 'C/C', trait: 'Melanosome pH', color: '#a78bfa' }
  ];

  return (
    <div className="relative w-full max-w-xl mx-auto lg:max-w-none">

      <div className="relative rounded-3xl bg-gradient-to-b from-slate-900/95 via-slate-950/95 to-[#070b14] border border-slate-700/80 p-5 sm:p-7 shadow-2xl shadow-cyan-950/40 overflow-hidden backdrop-blur-2xl">

        <div className="absolute inset-0 bg-grid-pattern opacity-50 pointer-events-none" />
        <div className="absolute -top-12 -right-12 w-72 h-72 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-72 h-72 bg-teal-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex items-center justify-between pb-4 border-b border-slate-800/80 text-xs font-mono">
          <div className="flex items-center gap-2 text-cyan-300">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500" />
            </span>
            <span className="font-semibold tracking-wider text-[11px] sm:text-xs">
              PIPELINE SIMULATION: DNA → PHENOTYPE
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-1 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition-colors flex items-center gap-1 text-[10px]"
              title={isPlaying ? 'Pause animation cycle' : 'Resume animation cycle'}
            >
              {isPlaying ? <Pause className="w-3 h-3 text-cyan-400" /> : <Play className="w-3 h-3 text-teal-400" />}
              <span className="hidden sm:inline">{isPlaying ? 'Auto-Cycle' : 'Paused'}</span>
            </button>
            <span className="px-2 py-0.5 rounded bg-slate-800/80 border border-slate-700 text-[10px] font-mono text-cyan-300">
              40-SNP Panel
            </span>
          </div>
        </div>

        <div className="relative z-10 py-5">

          <div className="relative rounded-2xl bg-slate-950/80 border border-slate-800/80 p-4 sm:p-5 overflow-hidden">

            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800/70 text-[11px] font-mono">
              <span className="text-slate-400 flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-cyan-400" />
                <span>Active Transformation Stage:</span>
              </span>
              <span className="text-cyan-300 font-bold">
                {stages[activeStage].label}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">

              <div className="md:col-span-6 space-y-3">

                <div className="relative h-32 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-center overflow-hidden p-2">
                  <svg className="w-full h-full" viewBox="0 0 300 80" fill="none">
                    <defs>
                      <linearGradient id="dnaGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#38bdf8" />
                        <stop offset="50%" stopColor="#06b6d4" />
                        <stop offset="100%" stopColor="#14b8a6" />
                      </linearGradient>
                      <linearGradient id="dnaGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#818cf8" />
                        <stop offset="50%" stopColor="#a78bfa" />
                        <stop offset="100%" stopColor="#38bdf8" />
                      </linearGradient>
                    </defs>

                    {[20, 45, 70, 95, 120, 145, 170, 195, 220, 245, 270].map((x, i) => {
                      const phase = (i * 0.55);
                      const y1 = 40 + Math.sin(phase) * 24;
                      const y2 = 40 - Math.sin(phase) * 24;
                      return (
                        <g key={i}>
                          <line
                            x1={x}
                            y1={y1}
                            x2={x}
                            y2={y2}
                            stroke="rgba(148, 163, 184, 0.4)"
                            strokeWidth="1.2"
                            strokeDasharray="2 2"
                          />
                          <circle cx={x} cy={(y1 + y2) / 2} r="1.5" fill="#38bdf8" opacity="0.6" />
                        </g>
                      );
                    })}

                    <path
                      d="M 10 40 Q 40 70, 70 40 T 130 40 T 190 40 T 250 40 T 290 40"
                      stroke="url(#dnaGrad1)"
                      strokeWidth="2.5"
                      fill="none"
                      strokeLinecap="round"
                    />

                    <path
                      d="M 10 40 Q 40 10, 70 40 T 130 40 T 190 40 T 250 40 T 290 40"
                      stroke="url(#dnaGrad2)"
                      strokeWidth="2.5"
                      fill="none"
                      strokeLinecap="round"
                    />

                    <circle cx="70" cy="40" r="4.5" fill="#38bdf8" />
                    <circle cx="130" cy="40" r="4.5" fill="#14b8a6" />
                    <circle cx="190" cy="40" r="4.5" fill="#818cf8" />
                    <circle cx="250" cy="40" r="4.5" fill="#a78bfa" />
                  </svg>

                  <div className="absolute top-1.5 left-2 px-1.5 py-0.5 rounded bg-slate-950/80 border border-slate-700 text-[9px] font-mono text-cyan-300">
                    rs12913832 • HERC2
                  </div>
                  <div className="absolute bottom-1.5 left-2 px-1.5 py-0.5 rounded bg-slate-950/80 border border-slate-700 text-[9px] font-mono text-teal-300">
                    rs1426654 • SLC24A5
                  </div>
                  <div className="absolute top-1.5 right-2 px-1.5 py-0.5 rounded bg-slate-950/80 border border-slate-700 text-[9px] font-mono text-indigo-300">
                    rs1800407 • OCA2
                  </div>
                  <div className="absolute bottom-1.5 right-2 px-1.5 py-0.5 rounded bg-slate-950/80 border border-slate-700 text-[9px] font-mono text-purple-300">
                    rs16891982 • SLC45A2
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {snpMarkers.map((snp, idx) => {
                    const isHighlighted = activeStage === 0 || activeStage === 1;
                    return (
                      <div
                        key={snp.rs}
                        className={`p-2 rounded-lg bg-slate-900/90 border transition-all text-[11px] font-mono ${
                          isHighlighted
                            ? 'border-cyan-500/40 shadow-sm shadow-cyan-500/10'
                            : 'border-slate-800 opacity-75'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-white text-[10px]">{snp.rs}</span>
                          <span className="px-1 py-0.2 rounded bg-slate-800 text-[9px] font-bold text-cyan-300">
                            {snp.allele}
                          </span>
                        </div>
                        <div className="text-[9px] text-slate-400 truncate mt-0.5">
                          {snp.gene}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="md:col-span-6 space-y-3">

                <div className="rounded-xl bg-slate-900/90 border border-slate-800 p-3.5 space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-slate-400 flex items-center gap-1.5">
                      <Cpu className="w-3.5 h-3.5 text-teal-400" />
                      <span className="text-[10px] font-bold uppercase tracking-wider">AI Classification Engine</span>
                    </span>
                    <span className="px-1.5 py-0.5 rounded bg-teal-950 text-teal-300 border border-teal-500/30 text-[9px] font-mono">
                      CALIBRATED
                    </span>
                  </div>

                  <div className="space-y-1.5">

                    <div className="flex items-center justify-between text-[11px]">
                      <span className="flex items-center gap-1.5 text-slate-300">
                        <Eye className="w-3 h-3 text-cyan-400" />
                        <span>Eye: <strong>Brown</strong></span>
                      </span>
                      <div className="flex items-center gap-2 font-mono">
                        <div className="w-16 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-full bg-cyan-400 rounded-full" style={{ width: '98%' }} />
                        </div>
                        <span className="text-cyan-400 font-bold text-[10px]">98.4%</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[11px]">
                      <span className="flex items-center gap-1.5 text-slate-300">
                        <Scissors className="w-3 h-3 text-teal-400" />
                        <span>Hair: <strong>Black</strong></span>
                      </span>
                      <div className="flex items-center gap-2 font-mono">
                        <div className="w-16 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-full bg-teal-400 rounded-full" style={{ width: '92%' }} />
                        </div>
                        <span className="text-teal-400 font-bold text-[10px]">92.1%</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[11px]">
                      <span className="flex items-center gap-1.5 text-slate-300">
                        <Sparkles className="w-3 h-3 text-amber-400" />
                        <span>Skin: <strong>Dark to Black</strong></span>
                      </span>
                      <div className="flex items-center gap-2 font-mono">
                        <div className="w-16 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-full bg-amber-400 rounded-full" style={{ width: '85%' }} />
                        </div>
                        <span className="text-amber-400 font-bold text-[10px]">84.5%</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative h-28 rounded-xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 flex items-center justify-center overflow-hidden">
                  <svg className="w-28 h-28 text-cyan-400/60" viewBox="0 0 100 100" fill="none">

                    <path
                      d="M50 16 C32 16, 26 34, 26 54 C26 74, 40 88, 50 88 C60 88, 74 74, 74 54 C74 34, 68 16, 50 16 Z"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeDasharray="2 2"
                    />

                    <line x1="32" y1="44" x2="68" y2="44" stroke="rgba(56,189,248,0.4)" strokeWidth="1" />
                    <line x1="50" y1="20" x2="50" y2="82" stroke="rgba(56,189,248,0.3)" strokeWidth="1" strokeDasharray="2 2" />

                    <ellipse cx="38" cy="45" rx="4.5" ry="2.8" fill="#78350f" stroke="#38bdf8" strokeWidth="1" />
                    <circle cx="38" cy="45" r="1.3" fill="#000" />
                    <ellipse cx="62" cy="45" rx="4.5" ry="2.8" fill="#78350f" stroke="#38bdf8" strokeWidth="1" />
                    <circle cx="62" cy="45" r="1.3" fill="#000" />

                    <circle cx="50" cy="58" r="1.2" fill="#38bdf8" />
                    <path d="M44 69 Q50 73 56 69" stroke="#38bdf8" strokeWidth="1.2" fill="none" />
                  </svg>

                  <div className="absolute inset-x-2 bottom-1 flex items-center justify-between text-[9px] font-mono text-slate-400">
                    <span>Visual Guidance Projection</span>
                    <span className="text-amber-400 font-semibold">Non-Biometric Lead</span>
                  </div>
                </div>
              </div>

            </div>

            <div className="mt-4 pt-3 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-2">
              {stages.map((stage) => {
                const isCurrent = activeStage === stage.id;
                return (
                  <button
                    key={stage.id}
                    onClick={() => {
                      setActiveStage(stage.id);
                      setIsPlaying(false);
                    }}
                    className={`p-2 rounded-lg text-left transition-all cursor-pointer ${
                      isCurrent
                        ? 'bg-cyan-950/80 border border-cyan-500/50 shadow-sm'
                        : 'bg-slate-900/40 border border-slate-800/60 hover:bg-slate-900/80'
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${isCurrent ? 'bg-cyan-400 animate-pulse' : 'bg-slate-600'}`} />
                      <span className={`text-[10px] font-mono font-bold ${isCurrent ? 'text-white' : 'text-slate-400'}`}>
                        {stage.label}
                      </span>
                    </div>
                    <p className="text-[9px] text-slate-400 truncate mt-0.5">
                      {stage.tag}
                    </p>
                  </button>
                );
              })}
            </div>

          </div>
        </div>

        <div className="relative z-10 pt-3 flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-slate-400 border-t border-slate-800/80">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span>Standardized 40-SNP Loci</span>
          </div>
          <div className="flex items-center gap-2 text-teal-400">
            <Layers className="w-3.5 h-3.5" />
            <span>SVC • Stacking • HistGradBoost</span>
          </div>
        </div>

      </div>
    </div>
  );
};

