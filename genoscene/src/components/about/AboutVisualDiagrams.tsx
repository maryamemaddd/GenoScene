import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  ShieldCheck,
  ShieldAlert,
  Dna,
  Cpu,
  Activity,
  Layers,
  FileText,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Scale,
  Sparkles,
  BookOpen,
  Eye,
  Scissors,
  Palette,
  ExternalLink
} from 'lucide-react';
import { GlassPanel } from '../common/GlassPanel';

export const SystemArchitectureDiagram: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-xs font-mono text-cyan-300">
          <Cpu className="w-3.5 h-3.5" />
          <span>END-TO-END COMPUTATIONAL TOPOLOGY</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          System Architecture Diagram
        </h3>
        <p className="text-xs sm:text-sm text-slate-300">
          High-throughput data transformations from raw SNP genotype calls to calibrated latent guidance
        </p>
      </div>

      <GlassPanel borderStyle="highlight" glow="cyan" className="p-6 sm:p-8 bg-slate-950/90 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-4 gap-4">

          <div className="p-4 rounded-xl bg-slate-900/90 border border-cyan-500/30 flex flex-col justify-between space-y-3">
            <div className="space-y-2">
              <span className="px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/40 text-[10px] font-mono text-cyan-300 font-bold">
                TIER 1 • INGESTION
              </span>
              <h4 className="text-sm font-bold text-white">40-Locus CSV Ingestion</h4>
              <p className="text-xs text-slate-400">
                Validates rsIDs, chromosome positions, and diploid allele calls with format verification.
              </p>
            </div>
            <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 font-mono text-[10px] text-cyan-400">
              rs12913832: [A/G] → Passed
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/90 border border-teal-500/30 flex flex-col justify-between space-y-3">
            <div className="space-y-2">
              <span className="px-2 py-0.5 rounded bg-teal-950/80 border border-teal-500/40 text-[10px] font-mono text-teal-300 font-bold">
                TIER 2 • DOSAGE QC
              </span>
              <h4 className="text-sm font-bold text-white">Additive Feature Vector</h4>
              <p className="text-xs text-slate-400">
                Converts allele genotypes into numeric counts &#123;0, 1, 2&#125; representing derived effect doses.
              </p>
            </div>
            <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 font-mono text-[10px] text-teal-300">
              X_dosage ∈ &#123;0,1,2&#125;⁴⁰ Matrix
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/90 border border-sky-500/30 flex flex-col justify-between space-y-3">
            <div className="space-y-2">
              <span className="px-2 py-0.5 rounded bg-sky-950/80 border border-sky-500/40 text-[10px] font-mono text-sky-300 font-bold">
                TIER 3 • INFERENCE
              </span>
              <h4 className="text-sm font-bold text-white">Calibrated Classifiers</h4>
              <p className="text-xs text-slate-400">
                SVC (Eye Color), Stacking Ensemble (Hair Color), and HistGradientBoosting (Skin Tone).
              </p>
            </div>
            <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 font-mono text-[10px] text-sky-300">
              Posterior P(Y|X) + Entropy
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/90 border border-purple-500/30 flex flex-col justify-between space-y-3">
            <div className="space-y-2">
              <span className="px-2 py-0.5 rounded bg-purple-950/80 border border-purple-500/40 text-[10px] font-mono text-purple-300 font-bold">
                TIER 4 • SYNTHESIS
              </span>
              <h4 className="text-sm font-bold text-white">Latent Guidance</h4>
              <p className="text-xs text-slate-400">
                Maps probability distributions into conditioned embeddings for visual lead generation.
              </p>
            </div>
            <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 font-mono text-[10px] text-purple-300">
              HUD Render &amp; Ethics Guard
            </div>
          </div>

        </div>

        <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
          <span className="text-cyan-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span>Synchronous In-Memory Pipeline</span>
          </span>
          <span className="hidden sm:inline">Zero External Telemetry • Client-Bound Execution</span>
        </div>
      </GlassPanel>
    </div>
  );
};

export const EthicalPrinciplesVisual: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-950/60 border border-teal-500/30 text-xs font-mono text-teal-300">
          <Scale className="w-3.5 h-3.5" />
          <span>RESPONSIBLE FORENSIC GENOMICS</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Ethical Principles &amp; Governance
        </h3>
        <p className="text-xs sm:text-sm text-slate-300">
          Guarding against biometric overreach, systemic bias, and unscientific deterministic claims
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <GlassPanel borderStyle="subtle" className="p-6 space-y-3 bg-slate-950/60 border-teal-500/30">
          <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h4 className="text-base font-bold text-white">Investigative Lead Only</h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            DNA phenotyping outputs are strictly triage tools to narrow unknown subject pools or assess unidentified remains. They cannot be used to establish probable cause for arrest or criminal accusation.
          </p>
          <div className="pt-2 border-t border-slate-800 text-[11px] font-mono text-teal-300">
            Rule: Non-Inculpatory Evidence
          </div>
        </GlassPanel>

        <GlassPanel borderStyle="subtle" className="p-6 space-y-3 bg-slate-950/60 border-cyan-500/30">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
            <Scale className="w-5 h-5" />
          </div>
          <h4 className="text-base font-bold text-white">Probabilistic Framing</h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            Every trait is output as a complete distribution across all categories with entropy scores. Single deterministic labels are strictly prohibited to prevent confirmation bias among investigators.
          </p>
          <div className="pt-2 border-t border-slate-800 text-[11px] font-mono text-cyan-300">
            Rule: Uncertainty Reporting
          </div>
        </GlassPanel>

        <GlassPanel borderStyle="subtle" className="p-6 space-y-3 bg-slate-950/60 border-amber-500/30">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <h4 className="text-base font-bold text-white">Privacy &amp; Data Minimization</h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            GenoScene evaluates only non-coding or pigmentation-associated autosomal SNPs. No medical predisposition loci, disease markers, or behavioral alleles are parsed or stored.
          </p>
          <div className="pt-2 border-t border-slate-800 text-[11px] font-mono text-amber-300">
            Rule: Zero Medical Trait Parsing
          </div>
        </GlassPanel>

      </div>
    </div>
  );
};

export const ScientificLimitationsVisual: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/60 border border-amber-500/30 text-xs font-mono text-amber-300">
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>SCIENTIFIC BOUNDARY MATRIX</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          What DNA Phenotyping Can &amp; Cannot Predict
        </h3>
        <p className="text-xs sm:text-sm text-slate-300">
          Demarcating scientifically validated pigmentation traits from unsupported morphological overreach
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <GlassPanel borderStyle="subtle" className="p-6 space-y-4 bg-slate-950/70 border-emerald-500/40">
          <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold uppercase tracking-wider">
            <CheckCircle2 className="w-4 h-4" />
            <span>Scientifically Supported Trait Phenotypes</span>
          </div>

          <div className="space-y-3">
            <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/30 flex items-start gap-3">
              <Eye className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <h5 className="text-xs font-bold text-white">Iris Pigmentation (Eye Color)</h5>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  High diagnostic accuracy (&gt;90% AUC for Blue vs. Brown) via HERC2, OCA2, SLC24A4, and TYR.
                </p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/30 flex items-start gap-3">
              <Scissors className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <h5 className="text-xs font-bold text-white">Follicular Melanin (Hair Color)</h5>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  Reliable classification across Black, Brown, Blond, and Red based on MC1R, IRF4, and ASIP.
                </p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/30 flex items-start gap-3">
              <Palette className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <h5 className="text-xs font-bold text-white">Categorical Dermal Pigmentation</h5>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  Calibrated probabilities across Pale, Intermediate, Dark, and Dark-to-Black via SLC24A5 and SLC45A2.
                </p>
              </div>
            </div>
          </div>
        </GlassPanel>

        <GlassPanel borderStyle="subtle" className="p-6 space-y-4 bg-slate-950/70 border-rose-500/40">
          <div className="flex items-center gap-2 text-rose-400 font-mono text-xs font-bold uppercase tracking-wider">
            <XCircle className="w-4 h-4" />
            <span>Unsupported Scientific Over-Claims (Cannot Predict)</span>
          </div>

          <div className="space-y-3">
            <div className="p-3 rounded-xl bg-rose-950/20 border border-rose-500/30 flex items-start gap-3">
              <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <h5 className="text-xs font-bold text-white">Craniofacial Bone Geometry</h5>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  DNA alone cannot predict facial skull shape, jawline angle, or fine zygomatic bone contours.
                </p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-rose-950/20 border border-rose-500/30 flex items-start gap-3">
              <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <h5 className="text-xs font-bold text-white">Acquired &amp; Environmental Features</h5>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  Scars, tattoos, dental work, body mass index, cosmetic alterations, or facial hairstyles.
                </p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-rose-950/20 border border-rose-500/30 flex items-start gap-3">
              <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <h5 className="text-xs font-bold text-white">Deterministic Exact Likeness</h5>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  No algorithm can produce an exact photographic portrait of an unknown person from DNA alone.
                </p>
              </div>
            </div>
          </div>
        </GlassPanel>

      </div>
    </div>
  );
};

export const ResearchBackgroundVisual: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-950/60 border border-sky-500/30 text-xs font-mono text-sky-300">
          <BookOpen className="w-3.5 h-3.5" />
          <span>ACADEMIC FOUNDATION</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Research Lineage &amp; Validation Framework
        </h3>
        <p className="text-xs sm:text-sm text-slate-300">
          Built upon decades of peer-reviewed forensic genetics research and international standards
        </p>
      </div>

      <GlassPanel borderStyle="subtle" className="p-6 sm:p-8 bg-slate-950/80">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="space-y-2 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="font-mono text-xs text-sky-400 font-bold block">
              1. Walsh et al. (2011, 2018)
            </span>
            <h5 className="text-sm font-bold text-white">HIrisPlex-S System</h5>
            <p className="text-xs text-slate-300 leading-relaxed">
              Established the diagnostic foundation for simultaneous prediction of eye, hair, and skin color from a compact panel of high-impact SNPs.
            </p>
          </div>

          <div className="space-y-2 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="font-mono text-xs text-teal-400 font-bold block">
              2. ENFSI / SWGDAM Guidelines
            </span>
            <h5 className="text-sm font-bold text-white">Forensic Phenotyping Standards</h5>
            <p className="text-xs text-slate-300 leading-relaxed">
              Adheres strictly to the ethical, legal, and reporting requirements mandated by international forensic science working groups.
            </p>
          </div>

          <div className="space-y-2 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="font-mono text-xs text-purple-400 font-bold block">
              3. Supervised Calibration
            </span>
            <h5 className="text-sm font-bold text-white">Probabilistic Reliability</h5>
            <p className="text-xs text-slate-300 leading-relaxed">
              Calibrated classifiers evaluated on diverse reference cohorts using Brier scores and Shannon entropy to assure transparent uncertainty estimation.
            </p>
          </div>

        </div>
      </GlassPanel>
    </div>
  );
};

