import React from 'react';

interface LearningIllustrationProps {
  topicId: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const LearningIllustration: React.FC<LearningIllustrationProps> = ({
  topicId,
  className = '',
  size = 'md'
}) => {
  const heightClass = size === 'sm' ? 'h-32' : size === 'md' ? 'h-44' : 'h-64';

  if (topicId === 'bio-1') {
    return (
      <div className={`relative w-full ${heightClass} rounded-xl bg-gradient-to-br from-slate-900 via-[#0a0f1d] to-[#0d1627] border border-slate-800 flex items-center justify-center overflow-hidden p-4 group ${className}`}>
        <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
        <svg className="w-full h-full max-w-sm" viewBox="0 0 320 140" fill="none">

          <ellipse cx="160" cy="70" rx="110" ry="50" stroke="#14b8a6" strokeWidth="2" strokeDasharray="4 2" fill="rgba(20,184,166,0.06)" />

          <circle cx="110" cy="65" r="18" fill="rgba(56,189,248,0.2)" stroke="#38bdf8" strokeWidth="1.5" />
          <text x="110" y="69" textAnchor="middle" fill="#38bdf8" fontSize="10" fontFamily="monospace" fontWeight="bold">TYR</text>

          <path d="M130 65 Q 160 55, 190 60" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="2 2" markerEnd="url(#arrow)" />

          <g transform="translate(200, 45)">
            <circle cx="10" cy="10" r="12" fill="#292524" stroke="#78350f" strokeWidth="1.5" />
            <text x="10" y="14" textAnchor="middle" fill="#fde68a" fontSize="8" fontFamily="monospace" fontWeight="bold">EUM</text>
            <circle cx="28" cy="14" r="6" fill="#451a03" />
            <circle cx="16" cy="28" r="7" fill="#1c1917" />
          </g>

          <g transform="translate(190, 85)">
            <circle cx="10" cy="10" r="10" fill="#991b1b" stroke="#f87171" strokeWidth="1.2" />
            <text x="10" y="13" textAnchor="middle" fill="#fecaca" fontSize="7" fontFamily="monospace">PHEO</text>
            <circle cx="24" cy="12" r="5" fill="#ea580c" />
          </g>

          <rect x="25" y="20" width="70" height="20" rx="4" fill="rgba(15,23,42,0.85)" stroke="#38bdf8" strokeWidth="1" />
          <text x="60" y="34" textAnchor="middle" fill="#38bdf8" fontSize="9" fontFamily="monospace">SLC24A5 / 45A2</text>

          <rect x="225" y="105" width="65" height="20" rx="4" fill="rgba(15,23,42,0.85)" stroke="#f59e0b" strokeWidth="1" />
          <text x="257" y="119" textAnchor="middle" fill="#f59e0b" fontSize="9" fontFamily="monospace">MC1R Switch</text>
        </svg>
        <span className="absolute bottom-2 left-3 px-2 py-0.5 rounded bg-slate-950/80 border border-slate-700/80 text-[10px] font-mono text-cyan-300">
          Melanosome Synthesis Diagram
        </span>
      </div>
    );
  }

  if (topicId === 'bio-2') {
    return (
      <div className={`relative w-full ${heightClass} rounded-xl bg-gradient-to-br from-slate-900 via-[#08121f] to-[#0b172a] border border-slate-800 flex items-center justify-center overflow-hidden p-4 group ${className}`}>
        <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
        <svg className="w-full h-full max-w-sm" viewBox="0 0 320 140" fill="none">

          <path d="M40 70 Q 110 20, 180 70 Q 110 120, 40 70 Z" stroke="#38bdf8" strokeWidth="1.8" fill="rgba(56,189,248,0.05)" />

          <circle cx="110" cy="70" r="32" fill="#0284c7" stroke="#38bdf8" strokeWidth="1.5" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <line
              key={deg}
              x1="110"
              y1="70"
              x2={110 + 30 * Math.cos((deg * Math.PI) / 180)}
              y2={70 + 30 * Math.sin((deg * Math.PI) / 180)}
              stroke="#bae6fd"
              strokeWidth="1.2"
              opacity="0.6"
            />
          ))}

          <circle cx="110" cy="70" r="13" fill="#080c14" />
          <circle cx="105" cy="65" r="3.5" fill="#ffffff" opacity="0.8" />

          <path d="M145 55 L 210 35" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 3" />
          <path d="M145 70 L 215 70" stroke="#10b981" strokeWidth="1.5" strokeDasharray="3 3" />
          <path d="M145 85 L 210 105" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 3" />

          <g transform="translate(210, 45)">
            <rect x="0" y="0" width="100" height="50" rx="6" fill="rgba(15,23,42,0.9)" stroke="#38bdf8" strokeWidth="1" />
            <text x="50" y="18" textAnchor="middle" fill="#38bdf8" fontSize="10" fontFamily="monospace" fontWeight="bold">rs12913832</text>
            <text x="50" y="32" textAnchor="middle" fill="#94a3b8" fontSize="8" fontFamily="monospace">HERC2 / OCA2 Loop</text>
            <text x="50" y="44" textAnchor="middle" fill="#34d399" fontSize="8" fontFamily="monospace">A (Brown) / G (Blue)</text>
          </g>
        </svg>
        <span className="absolute bottom-2 left-3 px-2 py-0.5 rounded bg-slate-950/80 border border-slate-700/80 text-[10px] font-mono text-cyan-300">
          Iris Stroma &amp; Scattering Model
        </span>
      </div>
    );
  }

  if (topicId === 'bio-3') {
    return (
      <div className={`relative w-full ${heightClass} rounded-xl bg-gradient-to-br from-slate-900 via-[#07131e] to-[#0c1a2e] border border-slate-800 flex items-center justify-center overflow-hidden p-4 group ${className}`}>
        <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
        <svg className="w-full h-full max-w-sm" viewBox="0 0 320 140" fill="none">

          {[
            { chr: 'Chr 15', x: 45, snp: 'HERC2/OCA2', h: 90, color: '#38bdf8' },
            { chr: 'Chr 5', x: 115, snp: 'SLC45A2', h: 75, color: '#14b8a6' },
            { chr: 'Chr 16', x: 185, snp: 'MC1R', h: 80, color: '#818cf8' },
            { chr: 'Chr 11', x: 255, snp: 'TYR', h: 70, color: '#f59e0b' }
          ].map((item) => (
            <g key={item.chr} transform={`translate(${item.x}, 20)`}>

              <rect x="0" y="0" width="16" height={item.h * 0.4} rx="6" fill="rgba(51,65,85,0.7)" stroke={item.color} strokeWidth="1.2" />

              <circle cx="8" cy={item.h * 0.42} r="3" fill="#0f172a" stroke={item.color} strokeWidth="1" />

              <rect x="0" y={item.h * 0.45} width="16" height={item.h * 0.55} rx="6" fill="rgba(51,65,85,0.7)" stroke={item.color} strokeWidth="1.2" />

              <rect x="1" y={item.h * 0.65} width="14" height="4" fill={item.color} className="animate-pulse" />

              <text x="8" y={item.h + 18} textAnchor="middle" fill="#cbd5e1" fontSize="9" fontFamily="monospace" fontWeight="bold">
                {item.chr}
              </text>
              <text x="8" y={item.h + 28} textAnchor="middle" fill={item.color} fontSize="7.5" fontFamily="monospace">
                {item.snp}
              </text>
            </g>
          ))}
        </svg>
        <span className="absolute bottom-2 left-3 px-2 py-0.5 rounded bg-slate-950/80 border border-slate-700/80 text-[10px] font-mono text-cyan-300">
          Autosomal Loci Mapping (40 SNPs)
        </span>
      </div>
    );
  }

  if (topicId === 'bio-4') {
    return (
      <div className={`relative w-full ${heightClass} rounded-xl bg-gradient-to-br from-slate-900 via-[#130f1c] to-[#1c1427] border border-slate-800 flex items-center justify-center overflow-hidden p-4 group ${className}`}>
        <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
        <svg className="w-full h-full max-w-sm" viewBox="0 0 320 140" fill="none">

          {[
            { label: 'Pale / V. Light', hex: '#f5ebe6', text: '#334155', x: 25, freq: 'Low Melanin' },
            { label: 'Intermediate', hex: '#bcaaa4', text: '#1e293b', x: 95, freq: 'Balanced' },
            { label: 'Dark', hex: '#6d4c41', text: '#f8fafc', x: 165, freq: 'High Melanin' },
            { label: 'Dark to Black', hex: '#3e2723', text: '#f8fafc', x: 235, freq: 'Dense Eumelanin' }
          ].map((cat) => (
            <g key={cat.label} transform={`translate(${cat.x}, 20)`}>
              <rect x="0" y="0" width="60" height="70" rx="8" fill={cat.hex} stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
              <text x="30" y="85" textAnchor="middle" fill="#e2e8f0" fontSize="8" fontFamily="monospace" fontWeight="bold">
                {cat.label}
              </text>
              <text x="30" y="96" textAnchor="middle" fill="#94a3b8" fontSize="7" fontFamily="monospace">
                {cat.freq}
              </text>
            </g>
          ))}

          <path d="M 20 120 Q 80 100, 160 115 T 300 110" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 3" fill="none" />
        </svg>
        <span className="absolute bottom-2 left-3 px-2 py-0.5 rounded bg-slate-950/80 border border-slate-700/80 text-[10px] font-mono text-amber-300">
          Forensic Categorical Dermal Classes
        </span>
      </div>
    );
  }

  if (topicId === 'tech-1') {
    return (
      <div className={`relative w-full ${heightClass} rounded-xl bg-gradient-to-br from-slate-900 via-[#071322] to-[#0c1b30] border border-slate-800 flex items-center justify-center overflow-hidden p-4 group ${className}`}>
        <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
        <svg className="w-full h-full max-w-sm" viewBox="0 0 320 140" fill="none">

          <line x1="40" y1="120" x2="280" y2="20" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4 2" />
          <line x1="30" y1="110" x2="270" y2="10" stroke="rgba(56,189,248,0.3)" strokeWidth="1" strokeDasharray="2 2" />
          <line x1="50" y1="130" x2="290" y2="30" stroke="rgba(56,189,248,0.3)" strokeWidth="1" strokeDasharray="2 2" />

          <circle cx="80" cy="50" r="4.5" fill="#38bdf8" />
          <circle cx="110" cy="40" r="4.5" fill="#38bdf8" />
          <circle cx="140" cy="30" r="4.5" fill="#38bdf8" />
          <circle cx="95" cy="70" r="4.5" fill="#38bdf8" stroke="#ffffff" strokeWidth="1.5" />

          <circle cx="180" cy="90" r="4.5" fill="#f59e0b" stroke="#ffffff" strokeWidth="1.5" />
          <circle cx="210" cy="80" r="4.5" fill="#f59e0b" />
          <circle cx="230" cy="110" r="4.5" fill="#f59e0b" />
          <circle cx="250" cy="70" r="4.5" fill="#f59e0b" />

          <rect x="25" y="15" width="105" height="22" rx="4" fill="rgba(15,23,42,0.9)" stroke="#38bdf8" strokeWidth="1" />
          <text x="77" y="29" textAnchor="middle" fill="#38bdf8" fontSize="8.5" fontFamily="monospace" fontWeight="bold">SVC (Support Vectors)</text>

          <rect x="180" y="105" width="120" height="22" rx="4" fill="rgba(15,23,42,0.9)" stroke="#14b8a6" strokeWidth="1" />
          <text x="240" y="119" textAnchor="middle" fill="#14b8a6" fontSize="8.5" fontFamily="monospace" fontWeight="bold">HistGradBoost / Stacking</text>
        </svg>
        <span className="absolute bottom-2 left-3 px-2 py-0.5 rounded bg-slate-950/80 border border-slate-700/80 text-[10px] font-mono text-cyan-300">
          Supervised Decision Hyperplanes
        </span>
      </div>
    );
  }

  if (topicId === 'tech-2') {
    return (
      <div className={`relative w-full ${heightClass} rounded-xl bg-gradient-to-br from-slate-900 via-[#0a171a] to-[#0c2024] border border-slate-800 flex items-center justify-center overflow-hidden p-4 group ${className}`}>
        <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
        <svg className="w-full h-full max-w-sm" viewBox="0 0 320 140" fill="none">

          <rect x="20" y="25" width="70" height="85" rx="6" fill="rgba(15,23,42,0.9)" stroke="#14b8a6" strokeWidth="1.5" />
          <text x="55" y="42" textAnchor="middle" fill="#14b8a6" fontSize="9" fontFamily="monospace" fontWeight="bold">.CSV FILE</text>
          <line x1="28" y1="52" x2="82" y2="52" stroke="#475569" strokeWidth="1" />
          <text x="55" y="65" textAnchor="middle" fill="#94a3b8" fontSize="7" fontFamily="monospace">rs12913832,G,G</text>
          <text x="55" y="78" textAnchor="middle" fill="#94a3b8" fontSize="7" fontFamily="monospace">rs1426654,A,A</text>
          <text x="55" y="91" textAnchor="middle" fill="#94a3b8" fontSize="7" fontFamily="monospace">rs1800407,C,C</text>

          <path d="M100 65 L 130 65" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 3" />

          <circle cx="155" cy="65" r="18" fill="rgba(56,189,248,0.15)" stroke="#38bdf8" strokeWidth="1.5" />
          <text x="155" y="69" textAnchor="middle" fill="#38bdf8" fontSize="8" fontFamily="monospace" fontWeight="bold">QC MAP</text>

          <path d="M180 65 L 210 65" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 3" />

          <rect x="220" y="25" width="85" height="85" rx="6" fill="rgba(15,23,42,0.9)" stroke="#818cf8" strokeWidth="1.5" />
          <text x="262" y="42" textAnchor="middle" fill="#818cf8" fontSize="9" fontFamily="monospace" fontWeight="bold">DOSAGE VEC</text>
          <line x1="228" y1="52" x2="297" y2="52" stroke="#475569" strokeWidth="1" />
          <text x="262" y="67" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="monospace" fontWeight="bold">X = [2, 2, 0, 1]</text>
          <text x="262" y="85" textAnchor="middle" fill="#94a3b8" fontSize="7.5" fontFamily="monospace">X_j ∈ &#123;0, 1, 2&#125;⁴⁰</text>
          <text x="262" y="98" textAnchor="middle" fill="#34d399" fontSize="7" fontFamily="monospace">Additive Encoding</text>
        </svg>
        <span className="absolute bottom-2 left-3 px-2 py-0.5 rounded bg-slate-950/80 border border-slate-700/80 text-[10px] font-mono text-teal-300">
          Additive Allele Dosage Matrix
        </span>
      </div>
    );
  }

  if (topicId === 'tech-3') {
    return (
      <div className={`relative w-full ${heightClass} rounded-xl bg-gradient-to-br from-slate-900 via-[#110e20] to-[#18122c] border border-slate-800 flex items-center justify-center overflow-hidden p-4 group ${className}`}>
        <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
        <svg className="w-full h-full max-w-sm" viewBox="0 0 320 140" fill="none">

          <ellipse cx="160" cy="70" rx="90" ry="45" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="3 3" fill="rgba(168,85,247,0.06)" />
          <ellipse cx="160" cy="70" rx="60" ry="30" stroke="#c084fc" strokeWidth="1" fill="rgba(168,85,247,0.08)" />

          <circle cx="120" cy="60" r="5" fill="#38bdf8" />
          <text x="120" y="50" textAnchor="middle" fill="#38bdf8" fontSize="7.5" fontFamily="monospace">Eye P(Y)</text>

          <circle cx="200" cy="60" r="5" fill="#14b8a6" />
          <text x="200" y="50" textAnchor="middle" fill="#14b8a6" fontSize="7.5" fontFamily="monospace">Hair P(Y)</text>

          <circle cx="160" cy="90" r="5" fill="#f59e0b" />
          <text x="160" y="105" textAnchor="middle" fill="#f59e0b" fontSize="7.5" fontFamily="monospace">Skin P(Y)</text>

          <g transform="translate(245, 30)">
            <ellipse cx="25" cy="35" rx="20" ry="26" stroke="#c084fc" strokeWidth="1.2" strokeDasharray="2 2" />
            <circle cx="18" cy="30" r="2" fill="#38bdf8" />
            <circle cx="32" cy="30" r="2" fill="#38bdf8" />
            <path d="M21 44 Q 25 48, 29 44" stroke="#c084fc" strokeWidth="1" fill="none" />
          </g>
        </svg>
        <span className="absolute bottom-2 left-3 px-2 py-0.5 rounded bg-slate-950/80 border border-slate-700/80 text-[10px] font-mono text-purple-300">
          Latent Conditioning Manifold
        </span>
      </div>
    );
  }

  return (
    <div className={`relative w-full ${heightClass} rounded-xl bg-gradient-to-br from-slate-900 via-[#16121e] to-[#20152c] border border-slate-800 flex items-center justify-center overflow-hidden p-4 group ${className}`}>
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
      <svg className="w-full h-full max-w-sm" viewBox="0 0 320 140" fill="none">

        <line x1="40" y1="110" x2="280" y2="110" stroke="#475569" strokeWidth="1.5" />
        <line x1="40" y1="20" x2="40" y2="110" stroke="#475569" strokeWidth="1.5" />

        <line x1="40" y1="110" x2="260" y2="20" stroke="#94a3b8" strokeWidth="1.2" strokeDasharray="4 4" />

        <path d="M 40 110 Q 120 75, 170 55 T 260 25" stroke="#38bdf8" strokeWidth="2.2" fill="none" />

        <path d="M 70 110 Q 160 30, 250 110" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="3 3" fill="none" />

        <text x="160" y="32" textAnchor="middle" fill="#f43f5e" fontSize="8" fontFamily="monospace">Entropy H(X) Max</text>
        <text x="220" y="45" textAnchor="middle" fill="#38bdf8" fontSize="8" fontFamily="monospace">Observed Calibration</text>
      </svg>
      <span className="absolute bottom-2 left-3 px-2 py-0.5 rounded bg-slate-950/80 border border-slate-700/80 text-[10px] font-mono text-cyan-300">
        Shannon Entropy &amp; Calibration Curve
      </span>
    </div>
  );
};

