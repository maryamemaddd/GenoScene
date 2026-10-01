import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lightbulb, Dna, ChevronLeft, ChevronRight, Pause, Play, Sparkles, Compass } from 'lucide-react';
import { DAILY_GENETIC_INSIGHTS } from '../../data/scientificInsights';
import { GlassPanel } from '../common/GlassPanel';
import { SCIENTIFIC_IMAGES, ScientificImage } from '../../data/scientificImages';

export const DailyInsight: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  useEffect(() => {
    if (!isAutoPlay) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % DAILY_GENETIC_INSIGHTS.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [isAutoPlay]);

  const currentInsight = DAILY_GENETIC_INSIGHTS[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + DAILY_GENETIC_INSIGHTS.length) % DAILY_GENETIC_INSIGHTS.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % DAILY_GENETIC_INSIGHTS.length);
  };

  const getInsightImage = () => {
    if (currentInsight.relatedGene?.includes('HERC2') || currentInsight.category?.toLowerCase().includes('eye')) {
      return SCIENTIFIC_IMAGES.eyeIrisMacro;
    }
    if (currentInsight.relatedGene?.includes('MC1R') || currentInsight.category?.toLowerCase().includes('hair')) {
      return SCIENTIFIC_IMAGES.hairPigmentation;
    }
    if (currentInsight.relatedGene?.includes('SLC45A2') || currentInsight.category?.toLowerCase().includes('skin')) {
      return SCIENTIFIC_IMAGES.skinPigmentation;
    }
    return SCIENTIFIC_IMAGES.dnaDoubleHelix;
  };

  const insightImage = getInsightImage();

  return (
    <section className="relative py-12 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Lightbulb className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white tracking-tight">
                Daily Genetic Insight
              </h3>
              <p className="text-xs text-slate-400">
                Curated scientific knowledge on forensic pigmentation genetics
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAutoPlay(!isAutoPlay)}
              aria-label={isAutoPlay ? 'Pause auto-advance' : 'Resume auto-advance'}
              className="p-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white transition-colors"
              title={isAutoPlay ? 'Pause' : 'Resume'}
            >
              {isAutoPlay ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>
            <div className="h-4 w-px bg-slate-800" />
            <button
              onClick={handlePrev}
              aria-label="Previous insight"
              className="p-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono text-slate-400 px-1">
              {currentIndex + 1}/{DAILY_GENETIC_INSIGHTS.length}
            </span>
            <button
              onClick={handleNext}
              aria-label="Next insight"
              className="p-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <GlassPanel
          borderStyle="highlight"
          glow="cyan"
          className="p-6 sm:p-8 relative bg-gradient-to-br from-slate-900/90 via-slate-950 to-[#0b1322] overflow-hidden"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentInsight.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center"
            >

              <div className="md:col-span-4 relative rounded-xl overflow-hidden border border-slate-800 group shadow-lg">
                <ScientificImage
                  src={insightImage.url}
                  alt={insightImage.alt}
                  aspectRatio="1/1"
                  badge={currentInsight.relatedGene}
                  caption={insightImage.caption}
                  className="w-full h-full"
                />
              </div>

              <div className="md:col-span-8 space-y-4">

                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-xs font-mono font-semibold text-cyan-300">
                      {currentInsight.category}
                    </span>
                    {currentInsight.markerId && (
                      <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 font-mono text-xs text-slate-300">
                        {currentInsight.markerId}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
                    <Dna className="w-4 h-4 text-cyan-400" />
                    <span>Locus: {currentInsight.relatedGene}</span>
                  </div>
                </div>

                <div>
                  <div className="text-xs uppercase font-mono tracking-wider text-cyan-400 mb-1 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    DID YOU KNOW?
                  </div>
                  <h4 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
                    {currentInsight.fact}
                  </h4>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed pt-1">
                  {currentInsight.detailedContext}
                </p>

                <div className="mt-4 p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-2.5 text-xs text-slate-300">
                  <Compass className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white font-mono uppercase tracking-wider text-[11px] block mb-0.5">
                      Forensic Application:
                    </span>
                    <span>{currentInsight.forensicApplication}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {isAutoPlay && (
            <motion.div
              key={currentIndex}
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 8, ease: 'linear' }}
              className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-cyan-400 to-teal-400"
            />
          )}
        </GlassPanel>
      </div>
    </section>
  );
};

