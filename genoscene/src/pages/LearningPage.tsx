import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  BookOpen,
  Dna,
  Cpu,
  Search,
  Video,
  FileText,
  Sparkles,
  GraduationCap
} from 'lucide-react';
import { BIOLOGICAL_LEARNING_ITEMS, TECHNICAL_LEARNING_ITEMS } from '../data/learningData';
import { EducationalItem } from '../types/learning';
import { LearningCard } from '../components/learning/LearningCard';
import { LearningReaderModal } from '../components/learning/LearningReaderModal';

export const LearningPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'biological' | 'technical'>('all');
  const [formatFilter, setFormatFilter] = useState<'all' | 'article' | 'video' | 'diagram' | 'picture'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<EducationalItem | null>(null);

  const allItems = [...BIOLOGICAL_LEARNING_ITEMS, ...TECHNICAL_LEARNING_ITEMS];

  const filteredItems = allItems.filter((item) => {
    if (activeCategory !== 'all' && item.section !== activeCategory) {
      return false;
    }
    if (formatFilter !== 'all' && item.format !== formatFilter) {
      return false;
    }
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchSub = item.subtitle.toLowerCase().includes(q);
      const matchSummary = item.summary.toLowerCase().includes(q);
      const matchTag = item.tags.some((t: string) => t.toLowerCase().includes(q));
      return matchTitle || matchSub || matchSummary || matchTag;
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">

      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-xs font-mono text-cyan-300">
          <GraduationCap className="w-3.5 h-3.5" />
          <span>SCIENTIFIC REPOSITORY &amp; CURRICULUM</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
          Learning Center
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
          Explore the science behind DNA phenotyping, AI models and forensic genetics.
        </p>
      </div>

      <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4">

        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-slate-950/90 border border-slate-800 text-xs font-medium w-full md:w-auto">
          <button
            onClick={() => { setActiveCategory('all'); setFormatFilter('all'); }}
            className={`px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeCategory === 'all' && formatFilter === 'all'
                ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/40 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            All Disciplines
          </button>
          <button
            onClick={() => { setActiveCategory('biological'); setFormatFilter('all'); }}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeCategory === 'biological' && formatFilter === 'all'
                ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/40 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Dna className="w-3.5 h-3.5 text-cyan-400" />
            <span>Biology</span>
          </button>
          <button
            onClick={() => { setActiveCategory('technical'); setFormatFilter('all'); }}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeCategory === 'technical' && formatFilter === 'all'
                ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/40 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Cpu className="w-3.5 h-3.5 text-teal-400" />
            <span>Technical AI</span>
          </button>
          <button
            onClick={() => { setActiveCategory('all'); setFormatFilter('video'); }}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
              formatFilter === 'video'
                ? 'bg-rose-950/80 text-rose-300 border border-rose-500/40 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Video className="w-3.5 h-3.5 text-rose-400" />
            <span>Video Lectures</span>
          </button>
          <button
            onClick={() => { setActiveCategory('all'); setFormatFilter('diagram'); }}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
              formatFilter === 'diagram'
                ? 'bg-teal-950/80 text-teal-300 border border-teal-500/40 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-teal-400" />
            <span>Interactive Diagrams</span>
          </button>
        </div>

        <div className="relative w-full md:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search topics, loci, models..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-950/90 border border-slate-700/80 text-xs text-white placeholder:text-slate-400 focus:outline-none focus:border-cyan-400 transition-colors"
          />
        </div>

      </div>

      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <LearningCard
                item={item}
                onClick={(clicked) => setSelectedItem(clicked)}
              />
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="py-16 text-center text-slate-400 space-y-2">
          <p className="text-base font-semibold text-white">No scientific resources found</p>
          <p className="text-xs">Try adjusting your keyword search or category filter.</p>
        </div>
      )}

      <LearningReaderModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        onSelectRelated={(related) => setSelectedItem(related)}
      />
    </div>
  );
};

