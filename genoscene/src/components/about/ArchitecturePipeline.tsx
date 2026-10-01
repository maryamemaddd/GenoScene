import React from 'react';
import { motion } from 'motion/react';
import { Dna, Cpu, Activity, UserCheck, Layers, ArrowDown, ArrowRight } from 'lucide-react';
import { GlassPanel } from '../common/GlassPanel';

export const ArchitecturePipeline: React.FC = () => {
  const stages = [
    {
      step: '01',
      title: 'SNP Data',
      subtitle: 'Genomic Marker Input',
      desc: 'Selected 40-SNP panel generating rsID genotype calls across known pigmentation loci in standard CSV format.',
      icon: <Dna className="w-5 h-5 text-cyan-400" />,
      color: 'border-cyan-500/40'
    },
    {
      step: '02',
      title: 'Feature Processing',
      subtitle: 'Allele Dosage QC',
      desc: 'CSV format validation, rsID marker verification, and transformation into numerical additive allele dosage vectors (0, 1, 2).',
      icon: <Layers className="w-5 h-5 text-teal-400" />,
      color: 'border-teal-500/40'
    },
    {
      step: '03',
      title: 'Machine Learning',
      subtitle: 'Trained Classifiers',
      desc: 'Supervised classifiers: Support Vector Classifier for eye color, Stacking ensemble for hair color, and HistGradientBoosting for skin tone.',
      icon: <Cpu className="w-5 h-5 text-sky-400" />,
      color: 'border-sky-500/40'
    },
    {
      step: '04',
      title: 'Phenotype Prediction',
      subtitle: 'Likelihood Distribution',
      desc: 'Computation of posterior probabilities P(Y=c|X) for eye, hair, and skin tones alongside normalized Shannon entropy uncertainty scores.',
      icon: <Activity className="w-5 h-5 text-indigo-400" />,
      color: 'border-indigo-500/40'
    },
    {
      step: '05',
      title: 'Visual Guidance',
      subtitle: 'Facial Synthesis',
      desc: 'AI-assisted visual representation conditioned on predicted phenotype categories to provide investigators with non-biometric visual guidance.',
      icon: <UserCheck className="w-5 h-5 text-violet-400" />,
      color: 'border-violet-500/40'
    }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          How GenoScene Works
        </h3>
        <p className="text-xs sm:text-sm text-slate-400">
          The rigorous step-by-step scientific pipeline bridging molecular genetics and visual guidance
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
        {stages.map((stage, idx) => (
          <div key={stage.step} className="relative flex flex-col items-center">
            <GlassPanel
              borderStyle="subtle"
              interactive
              className={`p-5 w-full h-full flex flex-col justify-between text-left hover:${stage.color} transition-all`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center">
                    {stage.icon}
                  </div>
                  <span className="font-mono text-xs font-bold text-cyan-400">
                    {stage.step}
                  </span>
                </div>
                <h4 className="text-base font-bold text-white tracking-tight mb-0.5">
                  {stage.title}
                </h4>
                <p className="text-[11px] font-mono text-cyan-300/80 mb-2">
                  {stage.subtitle}
                </p>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {stage.desc}
                </p>
              </div>
            </GlassPanel>

            {idx < stages.length - 1 && (
              <div className="my-2 md:hidden text-cyan-400">
                <ArrowDown className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

