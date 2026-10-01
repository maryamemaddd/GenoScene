export type EyeColorCategory = 'Brown' | 'Blue' | 'Intermediate';
export type HairColorCategory = 'Black' | 'Brown' | 'Blond' | 'Red';
export type SkinPigmentationCategory = 'Pale' | 'Intermediate' | 'Dark' | 'Dark to Black';

export interface TraitProbability<T extends string> {
  category: T;
  probability: number;
  colorHex: string;
  description?: string;
}

export interface SNPMarker {
  rsid: string;
  gene: string;
  chromosome: string;
  position: number;
  genotype: string;
  associatedTrait: 'Eye' | 'Hair' | 'Skin' | 'Multi-trait';
  impact: 'High' | 'Moderate' | 'Modifier';
  effectAllele: string;
}

export interface PhenotypePredictionResult {
  id: string;
  sampleName: string;
  timestamp: string;
  markersAnalyzed: number;
  totalMarkersRequired: number;
  confidenceScore: number;
  entropyScore: number;
  eyeColor: {
    predicted: EyeColorCategory;
    probability: number;
    distribution: TraitProbability<EyeColorCategory>[];
  };
  hairColor: {
    predicted: HairColorCategory;
    probability: number;
    distribution: TraitProbability<HairColorCategory>[];
  };
  skinPigmentation: {
    predicted: SkinPigmentationCategory;
    probability: number;
    distribution: TraitProbability<SkinPigmentationCategory>[];
  };
  keyMarkers: SNPMarker[];
  visualGuidance?: VisualGuidanceProfile;
}

export interface VisualGuidanceProfile {
  id: string;
  genderPresentation: 'Androgynous / Neutral' | 'Feminine' | 'Masculine';
  estimatedAgeRange: string;
  phenotypeSummary: {
    eyeColor: EyeColorCategory;
    hairColor: HairColorCategory;
    skinPigmentation: SkinPigmentationCategory;
  };
  renderTimestamp: string;
  modelConfidence: number;
  visualGuidanceSeed: number;
  guidanceMode?: string;
  imageUrl?: string;
}

export type AnalysisStatus =
  | 'idle'
  | 'uploading'
  | 'processing'
  | 'results'
  | 'generating_visual'
  | 'visual_ready'
  | 'error';

export interface DemoProfile {
  id: string;
  name: string;
  code: string;
  description: string;
  populationContext: string;
  data: PhenotypePredictionResult;
  csvSnippet: string;
}

