import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Database, PieChart, UserCheck, BookOpen, Layers, CheckCircle2 } from 'lucide-react';
import { GlassPanel } from '../common/GlassPanel';

interface FeatureSectionProps {
  onLearnMore: () => void;
  onStartAnalysis: () => void;
}

export const FeatureSection: React.FC<FeatureSectionProps> = ({
  onLearnMore,
  onStartAnalysis
}) => {
  const features = [
    {
      id: 'ai-prediction',
      title: 'AI Phenotype Prediction',
      desc: 'Analyze SNP-based genetic information to estimate visible traits including ocular iris pigmentation, follicular hair color, and dermal melanin concentration.',
      icon: <Sparkles className="w-5 h-5 text-cyan-400" />,
      tag: 'Machine Learning',
      stats: '40 Selected SNPs'
    },
    {
      id: 'data-analysis',
      title: 'Genetic Data Analysis',
      desc: 'Process structured genotype CSV data through a dedicated verification pipeline with allelic dosage extraction and format validation.',
      icon: <Database className="w-5 h-5 text-teal-400" />,
      tag: 'Data Verification',
      stats: 'CSV Validated'
    },
    {
      id: 'probability-results',
      title: 'Probability-Based Results',
      desc: 'Display prediction probabilities instead of presenting predictions as absolute facts, computing normalized Shannon entropy to quantify predictive uncertainty.',
      icon: <PieChart className="w-5 h-5 text-sky-400" />,
      tag: 'Scientific Integrity',
      stats: 'Calibrated Likelihoods'
    },
    {
      id: 'visual-guidance',
      title: 'Visual Phenotype Guidance',
      desc: 'Generate an AI-assisted visual representation based on predicted phenotype traits, providing investigators with useful visual guidance.',
      icon: <UserCheck className="w-5 h-5 text-violet-400" />,
      tag: 'Visual Guidance',
      stats: 'Investigative Aid'
    },
    {
      id: 'educational-resources',
      title: 'Educational Resources',
      desc: 'Learn about genetics, DNA phenotyping, and the technology behind GenoScene through curated articles, technical deep dives, and scientific diagrams.',
      icon: <BookOpen className="w-5 h-5 text-emerald-400" />,
      tag: 'Academic Hub',
      stats: 'Interactive Modules'
    }
  ];

  return (
    <section className="relative py-16 sm:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-700/80 text-xs font-mono text-cyan-300 mb-3">
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              <span>CORE ARCHITECTURAL CAPABILITIES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Designed for Rigorous Forensic Science
            </h2>
          </div>
          <p className="text-sm text-slate-400 max-w-md leading-relaxed">
            Engineered at the intersection of molecular genetics, forensic anthropology, and modern artificial intelligence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => {
            const isLarge = idx === 0 || idx === 3;
            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className={isLarge ? 'md:col-span-2 lg:col-span-1' : ''}
              >
                <GlassPanel
                  borderStyle="subtle"
                  interactive
                  className="p-6 h-full flex flex-col justify-between group hover:border-cyan-500/40 transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center group-hover:border-cyan-400/60 transition-colors">
                        {feature.icon}
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-slate-800/80 border border-slate-700 text-[10px] font-mono text-slate-300">
                        {feature.tag}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white tracking-tight mb-2 group-hover:text-cyan-200 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
                    <span className="flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                      {feature.stats}
                    </span>
                    <button
                      onClick={feature.id === 'educational-resources' ? onLearnMore : onStartAnalysis}
                      className="text-cyan-400 hover:text-cyan-300 transition-colors font-sans text-xs font-semibold cursor-pointer"
                    >
                      {feature.id === 'educational-resources' ? 'Explore Articles' : 'Test Pipeline'} →
                    </button>
                  </div>
                </GlassPanel>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

