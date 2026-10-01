import React from 'react';
import { GlassPanel } from '../common/GlassPanel';
import { Code2, Cpu, Database, Server, Sparkles, Layers, Box, Terminal } from 'lucide-react';

export const TechStackGrid: React.FC = () => {
  const technologies = [
    {
      name: 'Python',
      role: 'Core Scientific & Genomic Computing',
      desc: 'Scientific data processing, Biopython integration, and allele frequency manipulation.',
      icon: <Terminal className="w-5 h-5 text-amber-400" />,
      tag: 'Scientific Core'
    },
    {
      name: 'Machine Learning',
      role: 'Phenotype Classification Architecture',
      desc: 'Specialized algorithms: Support Vector Classifier (eye), Stacking ensemble (hair), and HistGradientBoosting (skin).',
      icon: <Cpu className="w-5 h-5 text-cyan-400" />,
      tag: 'Algorithms'
    },
    {
      name: 'Scikit-learn',
      role: 'Statistical Modeling & Classifiers',
      desc: 'SVC, Stacking, HistGradientBoosting, cross-validation, and calibrated probability distributions.',
      icon: <Layers className="w-5 h-5 text-teal-400" />,
      tag: 'ML Library'
    },
    {
      name: 'FastAPI',
      role: 'High-Performance Inference API',
      desc: 'Asynchronous REST microservice architecture exposing /api/analyze and validation endpoints.',
      icon: <Server className="w-5 h-5 text-emerald-400" />,
      tag: 'Backend Microservice'
    },
    {
      name: 'React',
      role: 'Modern Reactive Scientific Client',
      desc: 'Component-based forensic interface, interactive visualizations, and responsive states.',
      icon: <Code2 className="w-5 h-5 text-sky-400" />,
      tag: 'Frontend UI'
    },
    {
      name: 'Node.js',
      role: 'Application Server & Routing',
      desc: 'Server-side orchestration, API gateway proxying, and session pipeline coordination.',
      icon: <Box className="w-5 h-5 text-green-400" />,
      tag: 'Runtime Engine'
    },
    {
      name: 'MongoDB',
      role: 'Genomic Reference Schema Storage',
      desc: 'Document storage for reference allele frequencies, population databases, and audit logs.',
      icon: <Database className="w-5 h-5 text-emerald-500" />,
      tag: 'Database'
    },
    {
      name: 'Generative AI',
      role: 'Visual Guidance Synthesis',
      desc: 'AI-assisted visual guidance conditioned on predicted phenotype categories without biometric over-claiming.',
      icon: <Sparkles className="w-5 h-5 text-violet-400" />,
      tag: 'Visual Guidance'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center max-w-xl mx-auto space-y-2">
        <h3 className="text-2xl font-extrabold text-white tracking-tight">
          Platform Technology Stack
        </h3>
        <p className="text-xs sm:text-sm text-slate-400">
          The architectural components powering the GenoScene forensic genetics and AI workflow
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {technologies.map((tech) => (
          <GlassPanel
            key={tech.name}
            borderStyle="subtle"
            interactive
            className="p-5 flex flex-col justify-between group hover:border-cyan-500/40 transition-all"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center group-hover:border-cyan-400 transition-colors">
                  {tech.icon}
                </div>
                <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-[10px] font-mono text-slate-300">
                  {tech.tag}
                </span>
              </div>

              <h4 className="text-base font-bold text-white tracking-tight mb-1 group-hover:text-cyan-200 transition-colors">
                {tech.name}
              </h4>
              <p className="text-xs font-mono text-cyan-400/90 mb-2">
                {tech.role}
              </p>
              <p className="text-xs text-slate-400 leading-relaxed">
                {tech.desc}
              </p>
            </div>
          </GlassPanel>
        ))}
      </div>
    </div>
  );
};

