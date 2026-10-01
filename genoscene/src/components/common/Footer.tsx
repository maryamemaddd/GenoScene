import React, { useState } from 'react';
import { Dna, Shield, FileText, Github, Mail, ExternalLink, Scale, CheckCircle2 } from 'lucide-react';
import { Modal } from './Modal';

interface FooterProps {
  onNavigate: (tab: 'home' | 'analysis' | 'learning' | 'about') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [disclaimerOpen, setDisclaimerOpen] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);

  return (
    <footer className="relative bg-slate-950 border-t border-slate-800/80 text-slate-400 overflow-hidden mt-20">

      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                <Dna className="w-4 h-4" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                Geno<span className="text-cyan-400">Scene</span>
              </span>
            </div>
            <p className="text-sm font-medium text-slate-300">
              From Genetic Data to Visual Phenotypes
            </p>
            <p className="text-xs text-slate-400 max-w-md leading-relaxed">
              GenoScene is an AI-powered forensic DNA phenotyping research platform designed to analyze
              SNP genotype markers, predict externally visible traits (eye, hair, skin pigmentation),
              and synthesize visual guidance representations for scientific and investigative context.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-[11px] text-cyan-300 font-mono">
                <Shield className="w-3 h-3 text-cyan-400" />
                Probabilistic Intelligence Standard
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-[11px] text-emerald-300 font-mono">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                40-SNP Panel Calibrated
              </span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-4">
              Platform
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => { onNavigate('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('analysis'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Analysis Workspace
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('learning'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Learning & Genetics
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-cyan-400 transition-colors"
                >
                  About Platform
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-4">
              Governance & Science
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => setDisclaimerOpen(true)}
                  className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 text-left"
                >
                  <Scale className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  Scientific Disclaimer
                </button>
              </li>
              <li>
                <button
                  onClick={() => setPrivacyOpen(true)}
                  className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 text-left"
                >
                  <FileText className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  Genetic Data Privacy
                </button>
              </li>
              <li>
                <a
                  href="#github-repository"
                  onClick={(e) => { e.preventDefault(); alert('GenoScene Frontend Repository (Reference Blueprint)'); }}
                  className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"
                >
                  <Github className="w-3.5 h-3.5 shrink-0" />
                  GitHub Repository
                </a>
              </li>
              <li>
                <a
                  href="#contact-inquiry"
                  onClick={(e) => { e.preventDefault(); alert('Inquiries: forensic-support@genoscene.science (Placeholder)'); }}
                  className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5 shrink-0" />
                  Academic Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 mt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} GenoScene Platform. Dedicated to forensic research and genetic education.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              Probabilistic Model Standard
            </span>
            <span>Client Architecture Ready</span>
          </div>
        </div>
      </div>

      <Modal
        isOpen={disclaimerOpen}
        onClose={() => setDisclaimerOpen(false)}
        title="Scientific & Legal Forensic Disclaimer"
        subtitle="Forensic DNA Phenotyping Operational Boundaries"
        maxWidth="2xl"
      >
        <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
          <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-500/40 text-amber-200 text-xs flex items-start gap-2.5">
            <Scale className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Notice on Investigative Guidance vs. Biometric Identification</p>
              <p className="mt-1 opacity-90">
                GenoScene predictions represent statistical likelihoods derived from selected single nucleotide polymorphisms.
                They must NEVER be construed as definitive biometric identification.
              </p>
            </div>
          </div>

          <div>
            <h5 className="font-semibold text-white mb-1.5">1. Probabilistic Nature of Trait Predictions</h5>
            <p className="text-xs text-slate-400 leading-relaxed">
              Externally visible traits (eye, hair, and skin pigmentation) are polygenic traits influenced by multiple alleles and epigenetic factors.
              The outputs generated by GenoScene are probability distributions (e.g., P(Brown Eye) = 0.98), not absolute certainties.
            </p>
          </div>

          <div>
            <h5 className="font-semibold text-white mb-1.5">2. Visual Representation Limitations</h5>
            <p className="text-xs text-slate-400 leading-relaxed">
              Generated visual guidance representations are artist/AI composite visualizations constrained by predicted pigmentation vectors.
              They do NOT predict cranial bone geometry, personal facial scars, body mass index, or aging modifications.
            </p>
          </div>

          <div>
            <h5 className="font-semibold text-white mb-1.5">3. Forensic Casework Protocol</h5>
            <p className="text-xs text-slate-400 leading-relaxed">
              Phenotype predictions serve exclusively as investigative lead filters to narrow suspect pools or prioritize reference sample testing.
              They do not meet the legal evidentiary threshold for direct criminal prosecution without confirmatory Short Tandem Repeat (STR) match testing.
            </p>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={privacyOpen}
        onClose={() => setPrivacyOpen(false)}
        title="Genetic Data Privacy & Storage Policy"
        subtitle="Zero-Retention Processing Architecture"
        maxWidth="2xl"
      >
        <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
          <p className="text-xs text-slate-400">
            GenoScene prioritizes genomic privacy. Because SNP genotype profiles constitute sensitive biometric and health-adjacent data,
            the application operates under a strict privacy-by-design framework:
          </p>
          <ul className="space-y-2 text-xs text-slate-300 list-disc pl-5">
            <li><strong>Local In-Memory Parsing:</strong> Genotype files analyzed within the browser session are processed in volatile memory and are not permanently archived.</li>
            <li><strong>Selective Feature Extraction:</strong> Only the specified 40 pigmentation-associated loci are examined; medical diagnostic loci (e.g., BRCA1/2, APOE) are strictly ignored and discarded.</li>
            <li><strong>No Third-Party Transmission:</strong> Demo and uploaded datasets remain within the isolated sandbox environment.</li>
          </ul>
        </div>
      </Modal>
    </footer>
  );
};

