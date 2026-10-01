import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Activity, Dna, ArrowRight, Cpu, Sparkles } from 'lucide-react';

export const GeneticDataStream: React.FC = () => {
  const [isPaused, setIsPaused] = useState(false);

  const streamItems = [
    { rsid: 'rs12913832', locus: 'Chr 15:28365618', gene: 'HERC2 / OCA2', call: 'G/G', dosage: '2', target: 'Iris Melanin', model: 'SVC (Eye)' },
    { rsid: 'rs1426654', locus: 'Chr 15:48426484', gene: 'SLC24A5', call: 'A/A', dosage: '2', target: 'Dermal Tone', model: 'HistGradBoost (Skin)' },
    { rsid: 'rs1800407', locus: 'Chr 15:28230318', gene: 'OCA2 Arg419Gln', call: 'C/C', dosage: '0', target: 'Ocular Switch', model: 'SVC (Eye)' },
    { rsid: 'rs16891982', locus: 'Chr 5:33951693', gene: 'SLC45A2 Phe374Leu', call: 'C/C', dosage: '2', target: 'Proton Pump', model: 'HistGradBoost (Skin)' },
    { rsid: 'rs1805007', locus: 'Chr 16:89986117', gene: 'MC1R Arg151Cys', call: 'C/T', dosage: '1', target: 'Pheomelanin', model: 'Stacking (Hair)' },
    { rsid: 'rs12896399', locus: 'Chr 14:92773663', gene: 'SLC24A4', call: 'G/T', dosage: '1', target: 'Hair Modifier', model: 'Stacking (Hair)' },
    { rsid: 'rs12203592', locus: 'Chr 6:396321', gene: 'IRF4', call: 'C/T', dosage: '1', target: 'Epistatic Switch', model: 'SVC (Eye)' },
    { rsid: 'rs1393350', locus: 'Chr 11:88911470', gene: 'TYR', call: 'G/A', dosage: '1', target: 'Tyrosinase Rate', model: 'HistGradBoost (Skin)' }
  ];

  const doubleList = [...streamItems, ...streamItems];

  return (
    <div
      className="relative w-full overflow-hidden py-3 bg-slate-950/80 border-y border-slate-800/80 backdrop-blur-md select-none group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >

      <div className="absolute inset-0 bg-gradient-to-r from-[#080c14] via-transparent to-[#080c14] z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-2 flex items-center justify-between text-[11px] font-mono">
        <div className="flex items-center gap-2 text-cyan-300">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
          </span>
          <span className="font-semibold uppercase tracking-wider">
            Active Genetic Ingestion Stream
          </span>
          <span className="hidden sm:inline-block text-slate-400">
            • 40 Loci Continuous Vectorization
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded bg-amber-950/80 border border-amber-500/40 text-amber-300 text-[10px] font-semibold">
            Demo data — for interface testing only
          </span>
          <span className="text-[10px] text-slate-400 hidden md:inline">
            (Hover to pause)
          </span>
        </div>
      </div>

      <div className="flex overflow-hidden">
        <div
          className={`flex gap-3 whitespace-nowrap ${isPaused ? '' : 'animate-stream-scroll'}`}
          style={{
            animation: isPaused ? 'none' : 'marquee 38s linear infinite'
          }}
        >
          {doubleList.map((item, index) => (
            <div
              key={`${item.rsid}-${index}`}
              className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800/90 hover:border-cyan-500/50 hover:bg-slate-850 transition-colors shadow-sm text-xs font-mono"
            >
              <div className="flex items-center gap-1.5 text-cyan-300 font-bold">
                <Dna className="w-3.5 h-3.5 text-cyan-400" />
                <span>{item.rsid}</span>
              </div>

              <span className="text-slate-400 text-[11px] hidden sm:inline">[{item.locus}]</span>

              <ArrowRight className="w-3 h-3 text-slate-400" />

              <span className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-teal-300 font-semibold text-[11px]">
                {item.call}
              </span>

              <span className="text-slate-400 text-[11px]">d={item.dosage}</span>

              <ArrowRight className="w-3 h-3 text-slate-400" />

              <span className="text-slate-200 text-[11px] font-medium">{item.gene}</span>

              <span className="w-1 h-1 rounded-full bg-slate-400" />

              <span className="text-[10px] text-sky-400 font-semibold bg-sky-950/60 px-1.5 py-0.5 rounded border border-sky-800/40">
                {item.model}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

