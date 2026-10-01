import React from 'react';
import { Modal } from '../common/Modal';
import { EducationalItem } from '../../types/learning';
import { BookOpen, CheckCircle2, FileText, Video, Sparkles, ExternalLink, Dna, Clock, Tag, Share2, Layers } from 'lucide-react';
import { Button } from '../common/Button';
import { ScientificImage } from '../../data/scientificImages';
import { LearningIllustration } from './LearningIllustrations';
import { BIOLOGICAL_LEARNING_ITEMS, TECHNICAL_LEARNING_ITEMS } from '../../data/learningData';

interface LearningReaderModalProps {
  item: EducationalItem | null;
  onClose: () => void;
  onSelectRelated?: (item: EducationalItem) => void;
}

export const LearningReaderModal: React.FC<LearningReaderModalProps> = ({ item, onClose, onSelectRelated }) => {
  if (!item) return null;

  const allItems = [...BIOLOGICAL_LEARNING_ITEMS, ...TECHNICAL_LEARNING_ITEMS];
  const relatedItems = allItems.filter(i => i.id !== item.id).slice(0, 4);

  return (
    <Modal
      isOpen={!!item}
      onClose={onClose}
      title={item.title}
      subtitle={`${item.subtitle} • ${item.readTimeOrDuration} • ${item.difficulty}`}
      maxWidth="4xl"
    >
      <div className="space-y-6 text-slate-200">

        <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
          {item.imageUrl ? (
            <ScientificImage
              src={item.imageUrl}
              alt={item.title}
              aspectRatio="21/9"
              badge={`CATEGORY: ${item.category.toUpperCase()}`}
              caption={item.imageCaption}
              className="w-full"
            />
          ) : (
            <LearningIllustration topicId={item.id} size="lg" />
          )}

          <div className="absolute top-3 right-3 flex items-center gap-2 z-10">
            <span className="px-2.5 py-1 rounded-full bg-slate-950/90 border border-slate-700/90 text-xs font-mono text-slate-300 flex items-center gap-1.5 backdrop-blur-md">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              <span>{item.readTimeOrDuration}</span>
            </span>
          </div>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-slate-900/60 to-teal-950/40 border border-cyan-500/30 text-xs sm:text-sm text-cyan-100 leading-relaxed space-y-1.5 shadow-inner">
          <div className="flex items-center gap-2 text-cyan-300 font-bold font-mono text-xs">
            <Sparkles className="w-4 h-4" />
            <span>EXECUTIVE SCIENTIFIC SUMMARY</span>
          </div>
          <p className="text-slate-200 leading-relaxed font-normal">
            {item.summary}
          </p>
        </div>

        {item.keyTakeaways && item.keyTakeaways.length > 0 && (
          <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-teal-400 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Core Methodological Takeaways</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {item.keyTakeaways.map((takeaway, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-900/90 border border-slate-800/80 text-xs text-slate-300 flex items-start gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-teal-400 shrink-0 mt-1 shadow-sm" />
                  <span className="leading-relaxed">{takeaway}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-4 text-sm text-slate-300 leading-relaxed pt-2">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
              <Dna className="w-4 h-4" />
              <span>Detailed Scientific Exposition &amp; Pathway Analysis</span>
            </h4>
            <span className="text-[10px] font-mono text-slate-400">
              GenoScene Research Lineage
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800/90 space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-mono text-slate-300 mb-1">
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              <span className="font-semibold text-white">Scientific Mechanism Diagram</span>
              <span className="text-slate-500">• Schematic Model</span>
            </div>
            <div className="rounded-xl overflow-hidden border border-slate-800/80">
              <LearningIllustration topicId={item.id} size="md" />
            </div>
            <p className="text-[11px] font-mono text-slate-400 text-center pt-1">
              Figure 1: Mathematical and biological pathway modeling for {item.title}.
            </p>
          </div>

          <div className="space-y-3.5 pt-2">
            {item.content.map((paragraph, idx) => (
              <p key={idx} className="text-slate-300 leading-relaxed bg-slate-900/30 p-3.5 rounded-xl border border-slate-800/50">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <div className="space-y-3 pt-4 border-t border-slate-800/80">
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-300 flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
            <span>Related Scientific Topics</span>
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {relatedItems.map((related) => (
              <div
                key={related.id}
                onClick={() => onSelectRelated && onSelectRelated(related)}
                className="group p-2.5 rounded-xl bg-slate-950/90 border border-slate-800 hover:border-cyan-500/40 cursor-pointer transition-all space-y-2"
              >
                <div className="rounded-lg overflow-hidden border border-slate-800/60 aspect-video">
                  {related.imageUrl ? (
                    <img
                      src={related.imageUrl}
                      alt={related.title}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-900 flex items-center justify-center">
                      <Dna className="w-4 h-4 text-cyan-400" />
                    </div>
                  )}
                </div>
                <div>
                  <h5 className="text-[11px] font-bold text-white group-hover:text-cyan-300 line-clamp-1">
                    {related.title}
                  </h5>
                  <span className="text-[10px] font-mono text-slate-400">
                    {related.readTimeOrDuration}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {item.scientificReferences && item.scientificReferences.length > 0 && (
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-400 space-y-2">
            <span className="font-mono text-cyan-400 uppercase tracking-wider block font-semibold">
              Peer-Reviewed Scientific Literature &amp; Citations
            </span>
            <ul className="list-disc list-inside space-y-1 font-mono text-[11px] text-slate-400">
              {item.scientificReferences.map((ref, i) => (
                <li key={i} className="leading-relaxed">{ref}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="space-y-2 pt-2 border-t border-slate-800/80">
          <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
            Index Keywords &amp; Forensic Taxonomies:
          </span>
          <div className="flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-300/90 flex items-center gap-1.5"
              >
                <Tag className="w-3 h-3 text-slate-500" />
                <span>#{tag}</span>
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
          <Button variant="ghost" size="sm" onClick={onClose}>
            Close Reader
          </Button>
        </div>

      </div>
    </Modal>
  );
};

