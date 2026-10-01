import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Dna, Layers, Cpu, Activity, UserCheck, ArrowRight, Sparkles, CheckCircle2, ChevronRight } from 'lucide-react';
import { GlassPanel } from '../common/GlassPanel';
import { Button } from '../common/Button';

interface ScientificWorkflowProps {
  onStartAnalysis: () => void;
}

export const ScientificWorkflow: React.FC<ScientificWorkflowProps> = ({ onStartAnalysis }) => {
  const [activeStageIndex, setActiveStageIndex] = useState<number>(0);

  const pipelineStages = [
    {
      id: 'snp_data',
      number: '01',
      title: 'SNP Data',
      badge: 'INPUT',
      subtitle: 'Target Genomic Markers',
      desc: 'Ingests standard genotype CSV files containing calls for the validated 40-SNP forensic panel across autosomal pigmentation loci.',
      metrics: '40 Loci • GRCh38 / hg38',
      color: 'cyan',
      glowClass: 'from-cyan-500/20 to-cyan-500/5',
      borderClass: 'border-cyan-500/40',
      iconSvg: (
        <svg className="w-12 h-12 text-cyan-400" viewBox="0 0 48 48" fill="none">
          <path d="M12 8 C 20 18, 28 30, 36 40" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M36 8 C 28 18, 20 30, 12 40" stroke="#06b6d4" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="16" y1="13" x2="32" y2="13" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="2 2" />
          <line x1="18" y1="24" x2="30" y2="24" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="2 2" />
          <line x1="16" y1="35" x2="32" y2="35" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="2 2" />
          <circle cx="16" cy="13" r="2.5" fill="#38bdf8" />
          <circle cx="32" cy="13" r="2.5" fill="#14b8a6" />
          <circle cx="18" cy="24" r="2.5" fill="#818cf8" />
          <circle cx="30" cy="24" r="2.5" fill="#a78bfa" />
        </svg>
      )
    },
    {
      id: 'features',
      number: '02',
      title: 'Features',
      badge: 'ENCODING',
      subtitle: 'Allele Dosage Vectors',
      desc: 'Parses genotype alleles into numerical additive dosage matrices (0 = non-effect, 1 = heterozygous, 2 = homozygous effect) with QC verification.',
      metrics: 'Additive Matrix {0, 1, 2}⁴⁰',
      color: 'teal',
      glowClass: 'from-teal-500/20 to-teal-500/5',
      borderClass: 'border-teal-500/40',
      iconSvg: (
        <svg className="w-12 h-12 text-teal-400" viewBox="0 0 48 48" fill="none">
          <rect x="8" y="10" width="32" height="28" rx="4" stroke="currentColor" strokeWidth="2" fill="rgba(20,184,166,0.05)" />
          <line x1="8" y1="19" x2="40" y2="19" stroke="rgba(20,184,166,0.4)" strokeWidth="1.5" />
          <line x1="8" y1="29" x2="40" y2="29" stroke="rgba(20,184,166,0.4)" strokeWidth="1.5" />
          <line x1="18" y1="10" x2="18" y2="38" stroke="rgba(20,184,166,0.4)" strokeWidth="1.5" />
          <line x1="29" y1="10" x2="29" y2="38" stroke="rgba(20,184,166,0.4)" strokeWidth="1.5" />
          <circle cx="13" cy="14.5" r="2" fill="#14b8a6" />
          <circle cx="23.5" cy="24" r="2" fill="#14b8a6" />
          <circle cx="34.5" cy="33.5" r="2" fill="#14b8a6" />
        </svg>
      )
    },
    {
      id: 'ai_model',
      number: '03',
      title: 'AI Model',
      badge: 'INFERENCE',
      subtitle: 'Trained ML Classifiers',
      desc: 'Executes calibrated machine learning pipelines: Support Vector Classifier for eye color, Stacking ensemble for hair color, and HistGradientBoosting for skin tone.',
      metrics: 'SVC • Stacking • HistGradBoost',
      color: 'sky',
      glowClass: 'from-sky-500/20 to-sky-500/5',
      borderClass: 'border-sky-500/40',
      iconSvg: (
        <svg className="w-12 h-12 text-sky-400" viewBox="0 0 48 48" fill="none">
          <circle cx="24" cy="24" r="7" stroke="currentColor" strokeWidth="2" fill="rgba(56,189,248,0.1)" />
          <circle cx="10" cy="14" r="4" stroke="#0ea5e9" strokeWidth="1.5" />
          <circle cx="38" cy="14" r="4" stroke="#0ea5e9" strokeWidth="1.5" />
          <circle cx="10" cy="34" r="4" stroke="#0ea5e9" strokeWidth="1.5" />
          <circle cx="38" cy="34" r="4" stroke="#0ea5e9" strokeWidth="1.5" />
          <line x1="14" y1="16" x2="19" y2="20" stroke="currentColor" strokeWidth="1.5" />
          <line x1="34" y1="16" x2="29" y2="20" stroke="currentColor" strokeWidth="1.5" />
          <line x1="14" y1="32" x2="19" y2="28" stroke="currentColor" strokeWidth="1.5" />
          <line x1="34" y1="32" x2="29" y2="28" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="24" cy="24" r="3" fill="#38bdf8" />
        </svg>
      )
    },
    {
      id: 'phenotypes',
      number: '04',
      title: 'Phenotypes',
      badge: 'PROBABILITY',
      subtitle: 'Calibrated Distributions',
      desc: 'Computes posterior probability vectors P(Y=c|X) alongside normalized Shannon entropy scores to quantify prediction certainty.',
      metrics: 'P(Trait) Vectors + Entropy',
      color: 'indigo',
      glowClass: 'from-indigo-500/20 to-indigo-500/5',
      borderClass: 'border-indigo-500/40',
      iconSvg: (
        <svg className="w-12 h-12 text-indigo-400" viewBox="0 0 48 48" fill="none">
          <path d="M8 40 L 40 40" stroke="rgba(129,140,248,0.5)" strokeWidth="1.5" />
          <path d="M12 40 L 12 28 C 16 14, 22 14, 26 28 L 36 40" stroke="currentColor" strokeWidth="2" fill="rgba(129,140,248,0.1)" />
          <circle cx="21" cy="18" r="2.5" fill="#818cf8" />
          <line x1="21" y1="18" x2="21" y2="40" stroke="#818cf8" strokeWidth="1.2" strokeDasharray="2 2" />
          <rect x="30" y="22" width="5" height="18" rx="1" fill="#a78bfa" opacity="0.6" />
          <rect x="37" y="30" width="5" height="10" rx="1" fill="#c084fc" opacity="0.4" />
        </svg>
      )
    },
    {
      id: 'visual_guidance',
      number: '05',
      title: 'Visual Guidance',
      badge: 'SYNTHESIS',
      subtitle: 'Cognitive Composite',
      desc: 'Synthesizes an AI-assisted facial representation conditioned strictly on predicted pigmentation traits to provide forensic investigative prioritization.',
      metrics: 'AI-Assisted • Non-Biometric',
      color: 'violet',
      glowClass: 'from-violet-500/20 to-violet-500/5',
      borderClass: 'border-violet-500/40',
      iconSvg: (
        <svg className="w-12 h-12 text-violet-400" viewBox="0 0 48 48" fill="none">
          <ellipse cx="24" cy="24" rx="12" ry="16" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3" />
          <line x1="16" y1="21" x2="32" y2="21" stroke="rgba(167,139,250,0.5)" strokeWidth="1.2" />
          <circle cx="19" cy="21" r="2" fill="#a78bfa" />
          <circle cx="29" cy="21" r="2" fill="#a78bfa" />
          <circle cx="24" cy="28" r="1" fill="#c084fc" />
          <path d="M21 33 Q 24 35.5 27 33" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )
    }
  ];

  return (
    <section className="relative py-16 sm:py-24 bg-slate-950/70 border-y border-slate-800/80 overflow-hidden">

      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-[110px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-xs font-mono text-cyan-300 mb-3">
            <Dna className="w-3.5 h-3.5" />
            <span>STANDARDIZED SCIENTIFIC PIPELINE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Scientific Analysis Workflow
          </h2>
          <p className="text-base text-slate-300 mt-3 leading-relaxed">
            A continuous 5-stage transformation bridging raw molecular markers, supervised machine learning,
            and probabilistic visual phenotype guidance.
          </p>
        </div>

        <div className="relative">

          <div className="hidden lg:block absolute top-[68px] left-[60px] right-[60px] h-[3px] bg-slate-800 pointer-events-none z-0">

            <motion.div
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'linear'
              }}
              className="w-full h-full bg-gradient-to-r from-cyan-400 via-teal-400 via-sky-400 via-indigo-400 to-violet-400 bg-[length:200%_auto]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5 relative z-10">
            {pipelineStages.map((stage, idx) => {
              const isActive = activeStageIndex === idx;

              return (
                <div key={stage.id} className="flex flex-col">
                  <div
                    onClick={() => setActiveStageIndex(idx)}
                    className={`p-5 rounded-2xl bg-gradient-to-b ${stage.glowClass} bg-slate-900/90 border transition-all cursor-pointer flex flex-col justify-between h-full group ${
                      isActive
                        ? `${stage.borderClass} shadow-lg shadow-cyan-500/10 ring-1 ring-cyan-500/30`
                        : 'border-slate-800/80 hover:border-slate-700'
                    }`}
                  >
                    <div>

                      <div className="flex items-center justify-between mb-4">
                        <span className="font-mono text-xl font-black text-slate-400 group-hover:text-cyan-400 transition-colors">
                          {stage.number}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-slate-800/90 border border-slate-700 text-[10px] font-mono font-semibold text-cyan-300">
                          {stage.badge}
                        </span>
                      </div>

                      <div className="my-3 flex items-center justify-center p-3 rounded-xl bg-slate-950/70 border border-slate-800 group-hover:border-cyan-500/40 transition-colors">
                        {stage.iconSvg}
                      </div>

                      <h3 className="text-base font-bold text-white tracking-tight mt-3">
                        {stage.title}
                      </h3>
                      <p className="text-[11px] font-mono text-cyan-300/80 mb-2 font-semibold">
                        {stage.subtitle}
                      </p>

                      <p className="text-xs text-slate-300 leading-relaxed font-normal">
                        {stage.desc}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-400">
                      <span>{stage.metrics}</span>
                      <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isActive ? 'translate-x-1 text-cyan-400' : 'text-slate-600'}`} />
                    </div>
                  </div>

                  {idx < pipelineStages.length - 1 && (
                    <div className="lg:hidden flex items-center justify-center my-2 text-cyan-400/50">
                      <ArrowRight className="w-4 h-4 rotate-90 md:rotate-0" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>

        <div className="mt-10 p-5 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-mono text-cyan-300 font-semibold">
                STAGE {pipelineStages[activeStageIndex].number}: {pipelineStages[activeStageIndex].title.toUpperCase()}
              </div>
              <div className="text-sm text-slate-200">
                {pipelineStages[activeStageIndex].desc}
              </div>
            </div>
          </div>

          <Button
            variant="primary"
            size="md"
            icon={<ArrowRight className="w-4 h-4" />}
            onClick={onStartAnalysis}
            className="shrink-0"
          >
            Launch Analysis
          </Button>
        </div>

      </div>
    </section>
  );
};

