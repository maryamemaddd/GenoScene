import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, AlertCircle, HelpCircle, Activity, Gauge, Scale } from 'lucide-react';
import { PhenotypePredictionResult } from '../../types/phenotype';
import { GlassPanel } from '../common/GlassPanel';

interface ConfidencePanelProps {
  result: PhenotypePredictionResult;
}

export const ConfidencePanel: React.FC<ConfidencePanelProps> = ({ result }) => {
  const entropyPercentage = Math.round(result.entropyScore * 100);
  const uncertaintyLevel =
    result.entropyScore < 0.20 ? 'Low Uncertainty (Sharp Classification)' :
    result.entropyScore < 0.40 ? 'Moderate Uncertainty (Bimodal Allele Distribution)' :
    'Elevated Uncertainty (Polygenic Ambiguity)';

  return (
    <GlassPanel borderStyle="subtle" className="p-6 sm:p-8 space-y-6">

      <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-400">
            <Gauge className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight">
              Prediction Confidence &amp; Uncertainty Index
            </h3>
            <p className="text-xs text-slate-400">
              Entropy quantification and empirical reliability metrics
            </p>
          </div>
        </div>

        <span className="px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-300">
          Calibrated ML Metrics
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Composite Confidence Score
            </span>
            <span className="text-xs font-mono text-emerald-400 font-bold">
              {result.confidenceScore >= 90 ? 'OPTIMAL' : 'CALIBRATED'}
            </span>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-black font-mono text-white">
              {result.confidenceScore}%
            </span>
            <span className="text-xs text-slate-400">weighted posterior certainty</span>
          </div>

          <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${result.confidenceScore}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-teal-500 to-emerald-400 rounded-full shadow-[0_0_12px_rgba(16,185,129,0.4)]"
            />
          </div>

          <p className="text-[11px] text-slate-400 leading-relaxed">
            Derived from categorical separation margins between the primary trait class and secondary nearest-neighbor likelihoods.
          </p>
        </div>

        <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-cyan-400" />
              Shannon Entropy (Uncertainty)
            </span>
            <span className="text-xs font-mono text-cyan-400 font-bold">
              H = {result.entropyScore.toFixed(2)}
            </span>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-black font-mono text-cyan-300">
              {entropyPercentage}%
            </span>
            <span className="text-xs text-slate-400">normalized entropy band</span>
          </div>

          <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${entropyPercentage}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-cyan-400 to-amber-400 rounded-full"
            />
          </div>

          <p className="text-[11px] text-slate-400 leading-relaxed font-mono">
            {uncertaintyLevel}
          </p>
        </div>

      </div>

      <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300 space-y-1.5 leading-relaxed">
        <div className="flex items-center gap-2 text-slate-200 font-semibold">
          <Scale className="w-4 h-4 text-cyan-400" />
          <span>Scientific Assurance Protocol</span>
        </div>
        <p className="text-slate-400 text-xs">
          The model provides probability-based estimates for each phenotype category.
          Scientific ethics and legal standards require that predictive algorithms never assert absolute certainty.
          Forensic investigators must treat results as investigative indicators rather than incontrovertible biometric facts.
        </p>
      </div>
    </GlassPanel>
  );
};

