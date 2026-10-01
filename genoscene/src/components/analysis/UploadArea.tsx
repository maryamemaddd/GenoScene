import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Upload, FileSpreadsheet, CheckCircle2, AlertCircle, X, Info, Sparkles, Database, FileText } from 'lucide-react';
import { Button } from '../common/Button';
import { DEMO_PROFILES } from '../../data/demoDatasets';
import { DemoProfile } from '../../types/phenotype';

interface UploadAreaProps {
  onFileSelect: (file: File) => void;
  onSelectDemoProfile: (profile: DemoProfile) => void;
  selectedFile: File | null;
  onClearFile: () => void;
  isUploading: boolean;
  uploadProgress: number;
}

export const UploadArea: React.FC<UploadAreaProps> = ({
  onFileSelect,
  onSelectDemoProfile,
  selectedFile,
  onClearFile,
  isUploading,
  uploadProgress
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const validateAndProcessFile = (file: File) => {
    setErrorMsg(null);
    if (!file.name.toLowerCase().endsWith('.csv')) {
      setErrorMsg('Invalid file format. GenoScene requires a .CSV file containing SNP genotype records.');
      return;
    }
    if (file.size > 25 * 1024 * 1024) {
      setErrorMsg('File size exceeds 25MB threshold. Please upload standard multiplexed SNP CSV files.');
      return;
    }
    onFileSelect(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndProcessFile(e.dataTransfer.files[0]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndProcessFile(e.target.files[0]);
    }
  };

  return (
    <div className="space-y-6">

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative rounded-2xl border-2 border-dashed transition-all duration-300 p-8 sm:p-10 text-center ${
          isDragOver
            ? 'border-cyan-400 bg-cyan-950/30 shadow-[0_0_30px_rgba(6,182,212,0.2)]'
            : selectedFile
            ? 'border-emerald-500/50 bg-emerald-950/15'
            : 'border-slate-700/80 hover:border-cyan-500/50 bg-slate-900/50 hover:bg-slate-900/80'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv"
          onChange={handleInputChange}
          className="hidden"
          id="genotype-file-upload"
        />

        <div className="absolute top-4 right-4">
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowTooltip(!showTooltip)}
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-300 hover:bg-slate-800/80 transition-colors"
              aria-label="Format specifications tooltip"
            >
              <Info className="w-4 h-4" />
            </button>
            {showTooltip && (
              <div className="absolute right-0 top-full mt-2 w-72 p-3 bg-slate-950 border border-slate-700 rounded-xl shadow-2xl text-left text-xs text-slate-300 z-30 pointer-events-none">
                <p className="font-semibold text-white mb-1">Expected Genotype Format:</p>
                <p className="text-[11px] text-slate-400 mb-2">
                  CSV file with columns: <code className="text-cyan-300">rsid</code>, <code className="text-cyan-300">chromosome</code>, <code className="text-cyan-300">position</code>, <code className="text-cyan-300">genotype</code> (e.g. AA, AG, GG).
                </p>
                <p className="text-[10px] text-slate-400">
                  Calibrated for GenoScene's compact 40-SNP forensic phenotyping panel.
                </p>
              </div>
            )}
          </div>
        </div>

        {!selectedFile ? (
          <div className="space-y-4">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-cyan-950/50 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-inner">
              <Upload className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                Upload SNP Genotype File
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-md mx-auto">
                Drag &amp; drop your forensic genotype file here, or browse local files.
              </p>
            </div>

            <div className="flex items-center justify-center gap-2 text-xs font-mono text-slate-400">
              <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-cyan-300 font-semibold">
                .CSV
              </span>
              <span>Supported format (Max 25MB)</span>
            </div>

            <div className="pt-2">
              <Button
                variant="primary"
                size="md"
                onClick={() => fileInputRef.current?.click()}
                icon={<FileSpreadsheet className="w-4 h-4" />}
              >
                Browse Files
              </Button>
            </div>
          </div>
        ) : (

          <div className="space-y-4">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-950/60 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-xs font-mono text-emerald-300 mb-2">
                <span>VALIDATED SNP GENOTYPE FILE</span>
              </div>
              <h4 className="text-base sm:text-lg font-bold text-white font-mono truncate max-w-md mx-auto">
                {selectedFile.name}
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                {(selectedFile.size / 1024).toFixed(1)} KB • Ready for AI Inference Pipeline
              </p>
            </div>

            {isUploading && (
              <div className="max-w-xs mx-auto space-y-1.5">
                <div className="flex justify-between text-xs font-mono text-slate-400">
                  <span>Uploading &amp; Parsing...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-cyan-400"
                    style={{ width: `${uploadProgress}%` }}
                    transition={{ ease: 'easeOut' }}
                  />
                </div>
              </div>
            )}

            {!isUploading && (
              <div className="flex items-center justify-center gap-3 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Change File
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  icon={<X className="w-3.5 h-3.5" />}
                  onClick={onClearFile}
                >
                  Remove
                </Button>
              </div>
            )}
          </div>
        )}

        {errorMsg && (
          <div className="mt-4 p-3 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs flex items-center justify-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}
      </div>

      <div className="rounded-2xl bg-slate-900/60 border border-slate-800/80 p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-400">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold text-white tracking-tight">
                  Try Demo Data
                </h4>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-teal-950 text-teal-300 border border-teal-500/30">
                  INSTANT LOAD
                </span>
              </div>
              <p className="text-xs font-semibold text-amber-300/95 mt-0.5">
                Demo data — for interface testing only
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {DEMO_PROFILES.map((profile, idx) => {

            const previewImage =
              idx === 0
                ? 'https://images.unsplash.com/photo-1544465544-1b71aee9dfa3?auto=format&fit=crop&w=300&q=80'
                : idx === 1
                ? 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=300&q=80'
                : 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&w=300&q=80';

            return (
              <button
                key={profile.id}
                onClick={() => onSelectDemoProfile(profile)}
                className="text-left p-4 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-teal-400/60 hover:bg-slate-900 transition-all group cursor-pointer flex flex-col justify-between"
              >
                <div>

                  <div className="relative h-20 rounded-lg overflow-hidden border border-slate-800/80 mb-3 group-hover:border-cyan-500/40 transition-colors">
                    <img
                      src={previewImage}
                      alt={`${profile.name} trait preview`}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                    <div className="absolute bottom-1.5 left-2 right-2 flex items-center justify-between text-[10px] font-mono text-cyan-300">
                      <span>40 Loci Tested</span>
                      <span className="text-white font-bold">{profile.data.confidenceScore}% Conf</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-bold text-white group-hover:text-cyan-300">
                      {profile.name}
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                      {profile.data.eyeColor.predicted} / {profile.data.hairColor.predicted}
                    </span>
                  </div>
                  <p className="text-[10px] font-mono text-amber-300/85 mb-1.5 font-semibold">
                    Demo data — for interface testing only
                  </p>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {profile.description}
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-teal-400">
                  <span className="text-slate-400 text-[11px]">Test sample 40 SNPs</span>
                  <span className="px-2 py-0.5 rounded bg-teal-950/80 border border-teal-500/40 text-teal-300 group-hover:bg-teal-900 transition-colors">
                    Select →
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

