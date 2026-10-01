import React, { useState } from 'react';

export interface ScientificImageAsset {
  url: string;
  alt: string;
  caption: string;
  category: string;
}

export const SCIENTIFIC_IMAGES = {

  dnaDoubleHelix: {
    url: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&w=1200&q=80',
    alt: '3D scientific visualization of a DNA double helix with molecular base pairs',
    caption: 'DNA Double Helix • Molecular Biology & Phosphodiester Backbone',
    category: 'genomics'
  },
  molecularGenetics: {
    url: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&w=1200&q=80',
    alt: 'Genomics research laboratory with molecular analysis imagery',
    caption: 'Genomics Laboratory • High-Throughput DNA Sequencing',
    category: 'laboratory'
  },

  chromosomesAndSnps: {
    url: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1200&q=80',
    alt: 'Fluorescence chromosomal visualization with genetic marker loci bands',
    caption: 'Chromosomal Loci • Single Nucleotide Polymorphism (SNP) Mapping',
    category: 'cytogenetics'
  },

  melaninCellular: {
    url: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=1200&q=80',
    alt: 'Cellular biology microscopy showing melanosome organelles and melanocytes',
    caption: 'Melanocyte Organelles • Eumelanin & Pheomelanin Enzymatic Synthesis',
    category: 'cellular'
  },

  eyeIrisMacro: {
    url: 'https://images.unsplash.com/photo-1544465544-1b71aee9dfa3?auto=format&fit=crop&w=1200&q=80',
    alt: 'Macro photography of human iris stroma showing pupillary crypts and melanin pigmentation',
    caption: 'Iris Stroma Macro • Rayleigh Light Scattering & Melanin Density',
    category: 'ocular'
  },
  eyeIrisBlueHazel: {
    url: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=1200&q=80',
    alt: 'Close-up of human eye iris showing detailed stromal fibrils',
    caption: 'Iris Phenotype Variation • HERC2/OCA2 Epistatic Expression',
    category: 'ocular'
  },

  hairPigmentation: {
    url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=80',
    alt: 'Macro texture of human hair strands showing natural keratin fibers and melanin sheen',
    caption: 'Hair Follicle Melanin • Cortical Keratin Melanin Distribution',
    category: 'follicular'
  },

  skinPigmentation: {
    url: 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&w=1200&q=80',
    alt: 'Human skin dermal pigmentation tones showing epidermal melanin distribution',
    caption: 'Epidermal Basal Layer • SLC24A5/SLC45A2 Melanin Calibration',
    category: 'dermal'
  },

  machineLearningNodes: {
    url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
    alt: 'Deep neural network data visualization with illuminated nodes and connections',
    caption: 'Deep Classifier Topology • High-Dimensional Genetic Manifold',
    category: 'machine_learning'
  },
  dataManifold: {
    url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    alt: 'Abstract multi-dimensional mathematical manifold in dark cyan and deep blue',
    caption: 'Latent Space Manifold • Conditional Generative Embedding',
    category: 'generative_ai'
  },

  forensicSequencing: {
    url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
    alt: 'Forensic genetic laboratory workstation with analytical precision equipment',
    caption: 'Forensic Genetics Protocol • ISO/ENFSI Validated Workflow',
    category: 'forensics'
  }
};

interface ScientificImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: '16/9' | '4/3' | '1/1' | '21/9' | 'auto';
  overlayGradient?: boolean;
  caption?: string;
  badge?: string;
}

export const ScientificImage: React.FC<ScientificImageProps> = ({
  src,
  alt,
  className = '',
  aspectRatio = '4/3',
  overlayGradient = true,
  caption,
  badge,
  ...props
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const aspectClass =
    aspectRatio === '16/9' ? 'aspect-video' :
    aspectRatio === '4/3' ? 'aspect-[4/3]' :
    aspectRatio === '1/1' ? 'aspect-square' :
    aspectRatio === '21/9' ? 'aspect-[21/9]' : '';

  return (
    <div className={`relative overflow-hidden bg-slate-950 ${aspectClass} ${className}`}>

      {!loaded && !error && (
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 animate-pulse" />
      )}

      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        loading="lazy"
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        className={`w-full h-full object-cover object-center transition-all duration-700 ${
          loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
        }`}
        {...props}
      />

      {overlayGradient && (
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent pointer-events-none" />
      )}

      {badge && (
        <div className="absolute top-2.5 left-2.5 z-10">
          <span className="px-2 py-0.5 rounded-md bg-slate-950/85 backdrop-blur-md border border-cyan-500/30 text-[10px] font-mono text-cyan-300 font-semibold tracking-wide">
            {badge}
          </span>
        </div>
      )}

      {caption && (
        <div className="absolute bottom-2 left-2 right-2 z-10">
          <p className="text-[10px] font-mono text-slate-300/90 truncate drop-shadow-md">
            {caption}
          </p>
        </div>
      )}

      {error && (
        <div className="absolute inset-0 bg-slate-900 border border-slate-800 flex flex-col items-center justify-center p-4 text-center">
          <span className="text-xs font-mono text-cyan-400 font-bold mb-1">
            SCIENTIFIC ASSET
          </span>
          <span className="text-[10px] font-mono text-slate-400">
            {alt}
          </span>
        </div>
      )}
    </div>
  );
};

