import React from 'react';
import { motion } from 'motion/react';
import {
  ShieldAlert,
  Dna,
  Scale,
  Award,
  CheckCircle2
} from 'lucide-react';
import {
  SystemArchitectureDiagram,
  EthicalPrinciplesVisual,
  ScientificLimitationsVisual,
  ResearchBackgroundVisual
} from '../components/about/AboutVisualDiagrams';
import { TechStackGrid } from '../components/about/TechStackGrid';
import { GlassPanel } from '../components/common/GlassPanel';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 space-y-16">

      <section className="text-center max-w-4xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-xs font-mono text-cyan-300">
          <Dna className="w-3.5 h-3.5" />
          <span>ABOUT THE PLATFORM</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          What is GenoScene?
        </h1>
        <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
          GenoScene is an AI-powered forensic genetics platform designed to explore how single nucleotide
          polymorphisms (SNPs) correlate with externally visible human pigmentation characteristics.
          By combining calibrated statistical classifiers with generative visual guidance, GenoScene translates
          complex genetic code into interpretable phenotypic profiles for forensic research, investigative guidance,
          and biological education.
        </p>
      </section>

      <SystemArchitectureDiagram />

      <ScientificLimitationsVisual />

      <EthicalPrinciplesVisual />

      <ResearchBackgroundVisual />

      <TechStackGrid />

      <section className="pt-8 border-t border-slate-800">
        <GlassPanel
          borderStyle="subtle"
          className="p-8 sm:p-10 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border-amber-500/30 space-y-6"
        >
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-amber-400">
                Ethical, Legal &amp; Scientific Notice
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Scientific &amp; Investigative Disclaimer
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <p>
                  <strong className="text-white">Predictions are Probabilistic:</strong> GenoScene outputs statistical likelihood estimations derived from population allele frequencies. Trait manifestations are not deterministic guarantees and are subject to environmental, age, and epigenetic variations.
                </p>
              </div>

              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <p>
                  <strong className="text-white">Marker Performance Sensitivity:</strong> Predictive accuracy directly correlates with genomic coverage, call rate quality, and reference alignment. Missing or degraded forensic loci will alter the output confidence margin.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <p>
                  <strong className="text-white">Visual Guidance vs. Biometrics:</strong> Generated facial composites are intended exclusively for visual guidance and cognitive prioritization. They do not constitute biometric identification and cannot be utilized as sole evidence for criminal conviction.
                </p>
              </div>

              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <p>
                  <strong className="text-white">Definitive Identity Exclusion:</strong> The GenoScene platform must never be interpreted as establishing the definitive biological or legal identity of any specific individual.
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-2">
            <span>Forensic Ethics Standard: SWGDAM &amp; ENFSI Phenotyping Working Group Compliant</span>
            <span className="text-amber-400">RESEARCH PROTOCOL V2.4</span>
          </div>
        </GlassPanel>
      </section>

    </div>
  );
};

