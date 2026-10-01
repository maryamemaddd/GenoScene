import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, Dna, FileSpreadsheet, ShieldAlert, Cpu } from 'lucide-react';
import { Button } from '../common/Button';
import { ForensicComposition } from '../dna/ForensicComposition';

interface HeroSectionProps {
  onStartAnalysis: () => void;
  onExplore: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartAnalysis,
  onExplore
}) => {
  return (
    <section className="relative pt-8 pb-16 lg:pt-14 lg:pb-24 overflow-hidden">

      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[450px] bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-20 right-10 w-72 h-72 bg-teal-500/10 rounded-full blur-[90px] pointer-events-none" />

      <div className="absolute top-0 left-0 w-full lg:w-1/2 h-full opacity-10 pointer-events-none overflow-hidden mix-blend-screen">
        <img
          src="https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&w=1200&q=80"
          alt="DNA Double Helix Scientific Molecular Visual"
          referrerPolicy="no-referrer"
          loading="lazy"
          className="w-full h-full object-cover object-left filter contrast-125 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 space-y-6 text-center lg:text-left"
          >

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 text-xs font-mono text-cyan-300 shadow-sm backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>Forensic DNA Phenotyping • 40-SNP Panel</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12]">
              From Genetic Data to{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-sky-300 bg-clip-text text-transparent">
                Visual Phenotypes
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              GenoScene uses AI-driven analysis of SNP genotype data to predict externally visible traits and provide a visual representation of the resulting phenotype profile.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Button
                variant="primary"
                size="lg"
                icon={<Sparkles className="w-5 h-5" />}
                onClick={onStartAnalysis}
                className="w-full sm:w-auto shadow-cyan-500/30"
              >
                Start Analysis
              </Button>
              <Button
                variant="secondary"
                size="lg"
                icon={<ArrowRight className="w-4 h-4" />}
                onClick={onExplore}
                className="w-full sm:w-auto"
              >
                Explore GenoScene
              </Button>
            </div>

            <div className="pt-6 border-t border-slate-800/80 grid grid-cols-3 gap-3 text-left">
              <div className="space-y-0.5">
                <div className="text-sm font-bold text-white font-mono flex items-center gap-1">
                  <span className="text-cyan-400">40</span> Markers
                </div>
                <div className="text-[11px] text-slate-400">Selected SNP Panel</div>
              </div>

              <div className="space-y-0.5">
                <div className="text-sm font-bold text-white font-mono flex items-center gap-1">
                  <span className="text-teal-400">&gt;0.90</span> AUC
                </div>
                <div className="text-[11px] text-slate-400">Pigmentation Classifier</div>
              </div>

              <div className="space-y-0.5">
                <div className="text-sm font-bold text-white font-mono flex items-center gap-1">
                  <span className="text-sky-400">P(Trait)</span>
                </div>
                <div className="text-[11px] text-slate-400">Calibrated Likelihoods</div>
              </div>
            </div>

          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-6"
          >
            <ForensicComposition />
          </motion.div>

        </div>
      </div>
    </section>
  );
};

