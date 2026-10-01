import React, { useState } from 'react';
import { motion } from 'motion/react';
import { BookOpen, Video, Image as ImageIcon, FileText, Clock, Sparkles, Dna, ArrowRight, Layers } from 'lucide-react';
import { EducationalItem } from '../../types/learning';
import { GlassPanel } from '../common/GlassPanel';
import { ScientificImage } from '../../data/scientificImages';
import { LearningIllustration } from './LearningIllustrations';

interface LearningCardProps {
  item: EducationalItem;
  onClick: (item: EducationalItem) => void;
}

export const LearningCard: React.FC<LearningCardProps> = ({ item, onClick }) => {
  const [viewMode, setViewMode] = useState<'image' | 'diagram'>('image');

  const getFormatIcon = () => {
    switch (item.format) {
      case 'video':
        return <Video className="w-3.5 h-3.5 text-rose-400" />;
      case 'article':
        return <FileText className="w-3.5 h-3.5 text-cyan-400" />;
      case 'diagram':
        return <Sparkles className="w-3.5 h-3.5 text-teal-400" />;
      case 'picture':
        return <ImageIcon className="w-3.5 h-3.5 text-amber-400" />;
    }
  };

  const getFormatBadge = () => {
    switch (item.format) {
      case 'video':
        return 'bg-rose-950/70 border-rose-500/40 text-rose-300';
      case 'article':
        return 'bg-cyan-950/70 border-cyan-500/40 text-cyan-300';
      case 'diagram':
        return 'bg-teal-950/70 border-teal-500/40 text-teal-300';
      case 'picture':
        return 'bg-amber-950/70 border-amber-500/40 text-amber-300';
    }
  };

  return (
    <GlassPanel
      borderStyle="subtle"
      interactive
      className="p-4 sm:p-5 h-full flex flex-col justify-between group hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-950/20 transition-all cursor-pointer overflow-hidden"
      onClick={() => onClick(item)}
    >
      <div className="space-y-3.5">

        <div className="relative overflow-hidden rounded-xl border border-slate-800 group-hover:border-cyan-500/40 transition-colors">
          {viewMode === 'image' && item.imageUrl ? (
            <div className="relative">
              <ScientificImage
                src={item.imageUrl}
                alt={item.title}
                aspectRatio="16/9"
                badge={item.category.toUpperCase()}
                caption={item.imageCaption}
                className="group-hover:scale-105 transition-transform duration-700"
              />

              <div className="absolute inset-0 bg-cyan-500/0 group-hover:bg-cyan-500/5 transition-colors pointer-events-none" />
            </div>
          ) : (
            <div className="relative">
              <LearningIllustration topicId={item.id} size="md" />
            </div>
          )}

          <div
            className="absolute top-2.5 right-2.5 z-20 flex items-center bg-slate-950/80 backdrop-blur-md rounded-lg p-0.5 border border-slate-700/80"
            onClick={(e) => {
              e.stopPropagation();
              setViewMode(viewMode === 'image' ? 'diagram' : 'image');
            }}
          >
            <button
              title="View Scientific Microscopy/Photo"
              className={`px-1.5 py-0.5 rounded text-[9px] font-mono transition-colors ${
                viewMode === 'image' ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/40 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Photo
            </button>
            <button
              title="View Vector Model Schematic"
              className={`px-1.5 py-0.5 rounded text-[9px] font-mono transition-colors ${
                viewMode === 'diagram' ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/40 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Diagram
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-mono border font-semibold ${getFormatBadge()}`}>
              {getFormatIcon()}
              <span className="capitalize">{item.format}</span>
            </span>
            <span className="px-2 py-0.5 rounded-md bg-slate-800/90 border border-slate-700 text-[10px] font-mono text-slate-300 capitalize font-medium">
              {item.difficulty}
            </span>
          </div>

          <span className="flex items-center gap-1 text-[11px] font-mono text-slate-400">
            <Clock className="w-3 h-3 text-slate-400" />
            {item.readTimeOrDuration}
          </span>
        </div>

        <div>
          <h3 className="text-base font-bold text-white tracking-tight group-hover:text-cyan-200 transition-colors line-clamp-2 leading-snug">
            {item.title}
          </h3>
          <p className="text-xs text-cyan-400/80 font-mono mt-1 line-clamp-1">
            {item.subtitle}
          </p>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed line-clamp-2 font-normal">
          {item.summary}
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
        <div className="flex items-center gap-1 overflow-hidden">
          {item.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] font-mono text-slate-400 truncate">
              #{tag}
            </span>
          ))}
        </div>
        <span className="text-cyan-400 font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform shrink-0">
          Read Article <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </GlassPanel>
  );
};

