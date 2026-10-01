import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  RotateCcw,
  Dna,
  Activity,
  AlertCircle,
  CheckCircle2,
  FileText,
  Layers,
  ShieldCheck,
  UserCheck,
  ArrowRight
} from 'lucide-react';
import { UploadArea } from '../components/analysis/UploadArea';
import { PhenotypeCard } from '../components/analysis/PhenotypeCard';
import { ProbabilityChart } from '../components/analysis/ProbabilityChart';
import { ConfidencePanel } from '../components/analysis/ConfidencePanel';
import { GeneratedResultCard } from '../components/analysis/GeneratedResultCard';
import { GeneratePictureVisualizer } from '../components/analysis/GeneratePictureVisualizer';
import { ProcessingAnimation } from '../components/analysis/ProcessingAnimation';
import { Button } from '../components/common/Button';
import { GlassPanel } from '../components/common/GlassPanel';
import { useToast } from '../components/common/Toast';
import {
  PhenotypePredictionResult,
  VisualGuidanceProfile,
  AnalysisStatus,
  DemoProfile
} from '../types/phenotype';
import { analyzeGenotypeFile, generateVisualGuidance } from '../services/api';
import { DEMO_PROFILES } from '../data/demoDatasets';

export const AnalysisPage: React.FC = () => {
  const { showToast } = useToast();
  const [status, setStatus] = useState<AnalysisStatus>('idle');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [activeResult, setActiveResult] = useState<PhenotypePredictionResult | null>(null);
  const [visualProfile, setVisualProfile] = useState<VisualGuidanceProfile | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [processingStage, setProcessingStage] = useState('');
  const [processingPercent, setProcessingPercent] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleFileSelect = async (file: File) => {
    setSelectedFile(file);
    setStatus('uploading');
    setUploadProgress(15);
    setErrorMessage(null);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 95) {
          clearInterval(interval);
          return 95;
        }
        return prev + 25;
      });
    }, 150);

    setTimeout(async () => {
      clearInterval(interval);
      setUploadProgress(100);
      setStatus('processing');

      try {
        const result = await analyzeGenotypeFile(file, {
          onProgress: (stage, percent) => {
            setProcessingStage(stage);
            setProcessingPercent(percent);
          }
        });
        setActiveResult(result);
        setStatus('results');
        showToast('success', 'Analysis Completed', `40 forensic SNP markers validated for ${file.name}`);
      } catch (err: any) {
        setStatus('error');
        setErrorMessage(err?.message || 'Error executing genotype analysis. Please verify SNP CSV headers.');
        showToast('warning', 'Analysis Error', 'Could not parse genomic markers.');
      }
    }, 800);
  };

  const handleSelectDemoProfile = async (profile: DemoProfile) => {
    setSelectedFile(null);
    setStatus('processing');
    setErrorMessage(null);

    try {
      const result = await analyzeGenotypeFile(null, {
        profileId: profile.id,
        onProgress: (stage, percent) => {
          setProcessingStage(stage);
          setProcessingPercent(percent);
        }
      });
      setActiveResult(result);
      setStatus('results');
      showToast('info', 'Demo Profile Loaded', `${profile.name} • Demo data — for interface testing only`);
    } catch (err: any) {
      setStatus('error');
      setErrorMessage('Failed to load demo forensic profile.');
    }
  };

  const handleGenerateVisual = async () => {
    if (!activeResult) return;
    setStatus('generating_visual');

    try {
      const profile = await generateVisualGuidance(activeResult, {
        onProgress: (stage, percent) => {
          setProcessingStage(stage);
          setProcessingPercent(percent);
        }
      });
      setVisualProfile(profile);
      setStatus('visual_ready');
      showToast('success', 'Visual Guidance Rendered', 'Visual guidance representation generated from predicted phenotype.');
    } catch (err: any) {
      setStatus('error');
      setErrorMessage('Failed during generative facial synthesis.');
      showToast('warning', 'Synthesis Failed', 'Could not complete visual guidance rendering.');
    }
  };

  const handleReset = () => {
    setStatus('idle');
    setSelectedFile(null);
    setActiveResult(null);
    setVisualProfile(null);
    setErrorMessage(null);
    setUploadProgress(0);
    setProcessingPercent(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-xs font-mono text-cyan-300 mb-2">
            <Dna className="w-3.5 h-3.5" />
            <span>FORENSIC ANALYSIS WORKSPACE</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            DNA Phenotype Analysis
          </h1>
          <p className="text-sm sm:text-base text-slate-300 mt-1 max-w-2xl leading-relaxed">
            Upload SNP genotype data and explore AI-generated phenotype predictions.
          </p>
        </div>

        {(status === 'results' || status === 'visual_ready') && (
          <Button
            variant="secondary"
            size="sm"
            icon={<RotateCcw className="w-3.5 h-3.5" />}
            onClick={handleReset}
          >
            Analyze New Sample
          </Button>
        )}
      </div>

      {(status === 'idle' || status === 'uploading') && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <UploadArea
            onFileSelect={handleFileSelect}
            onSelectDemoProfile={handleSelectDemoProfile}
            selectedFile={selectedFile}
            onClearFile={() => setSelectedFile(null)}
            isUploading={status === 'uploading'}
            uploadProgress={uploadProgress}
          />
        </motion.div>
      )}

      {status === 'processing' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          className="py-12"
        >
          <ProcessingAnimation
            type="genotype_analysis"
            currentStage={processingStage}
            progressPercent={processingPercent}
          />
        </motion.div>
      )}

      {(status === 'results' || status === 'generating_visual' || status === 'visual_ready') && activeResult && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <div>
                <span className="text-slate-400">SPECIMEN: </span>
                <span className="text-white font-bold">{activeResult.sampleName}</span>
              </div>
              {activeResult.sampleName.startsWith('Demo_Profile_') && (
                <span className="px-2 py-0.5 rounded bg-amber-950/80 border border-amber-500/40 text-amber-300 text-[11px] font-semibold">
                  Demo data — for interface testing only
                </span>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-4 text-slate-300">
              <div>
                <span className="text-slate-400">MARKERS ANALYZED: </span>
                <span className="text-cyan-400 font-bold">{activeResult.markersAnalyzed}/{activeResult.totalMarkersRequired}</span>
              </div>
              <div className="hidden sm:block text-slate-700">•</div>
              <div>
                <span className="text-slate-400">TIMESTAMP: </span>
                <span className="text-slate-300">{activeResult.timestamp}</span>
              </div>
              <div className="hidden sm:block text-slate-700">•</div>
              <div>
                <span className="text-slate-400">MODEL CONFIDENCE: </span>
                <span className="text-emerald-400 font-bold">{activeResult.confidenceScore}%</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <PhenotypeCard
              traitType="Eye Color"
              predictedCategory={activeResult.eyeColor.predicted}
              probability={activeResult.eyeColor.probability}
              distribution={activeResult.eyeColor.distribution}
              keyMarkersCount={6}
            />

            <PhenotypeCard
              traitType="Hair Color"
              predictedCategory={activeResult.hairColor.predicted}
              probability={activeResult.hairColor.probability}
              distribution={activeResult.hairColor.distribution}
              keyMarkersCount={18}
            />

            <PhenotypeCard
              traitType="Skin Pigmentation"
              predictedCategory={activeResult.skinPigmentation.predicted}
              probability={activeResult.skinPigmentation.probability}
              distribution={activeResult.skinPigmentation.distribution}
              keyMarkersCount={24}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7">
              <ProbabilityChart result={activeResult} />
            </div>
            <div className="lg:col-span-5">
              <ConfidencePanel result={activeResult} />
            </div>
          </div>

          {status === 'results' && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <GeneratePictureVisualizer
                result={activeResult}
                onGenerate={handleGenerateVisual}
              />
            </motion.div>
          )}

          {status === 'generating_visual' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-6"
            >
              <ProcessingAnimation
                type="visual_synthesis"
                currentStage={processingStage}
                progressPercent={processingPercent}
              />
            </motion.div>
          )}

          {status === 'visual_ready' && visualProfile && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              id="visual-guidance-result"
            >
              <GeneratedResultCard
                result={activeResult}
                visualProfile={visualProfile}
                onRegenerate={handleGenerateVisual}
              />
            </motion.div>
          )}

        </motion.div>
      )}

      {status === 'error' && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-8 rounded-2xl bg-rose-950/40 border border-rose-500/40 text-center max-w-lg mx-auto space-y-4"
        >
          <div className="w-12 h-12 mx-auto rounded-full bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white tracking-tight">
            Analysis Failed
          </h3>
          <p className="text-xs text-rose-200/90 leading-relaxed font-mono">
            {errorMessage || 'An unexpected error occurred while parsing the genetic dataset.'}
          </p>
          <div className="pt-2">
            <Button variant="outline" size="sm" onClick={handleReset}>
              Return to Upload
            </Button>
          </div>
        </motion.div>
      )}

    </div>
  );
};

