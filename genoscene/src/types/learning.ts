export type LearningCategory =
  | 'genetics'
  | 'snps'
  | 'pigmentation'
  | 'forensics'
  | 'machine_learning'
  | 'feature_engineering'
  | 'neural_networks'
  | 'generative_ai'
  | 'evaluation'
  | 'ethics';

export type ContentFormat = 'article' | 'video' | 'diagram' | 'picture';

export interface EducationalItem {
  id: string;
  title: string;
  subtitle: string;
  category: LearningCategory;
  section: 'biological' | 'technical';
  format: ContentFormat;
  readTimeOrDuration: string;
  difficulty: 'Foundational' | 'Intermediate' | 'Advanced';
  summary: string;
  content: string[];
  keyTakeaways: string[];
  tags: string[];
  imageUrl?: string;
  imageCaption?: string;
  scientificReferences?: string[];
  diagramType?: 'dna_helix' | 'hirisplex_snps' | 'melanin_pathway' | 'neural_network' | 'confusion_matrix';
}

export interface GeneticInsight {
  id: string;
  category: string;
  title: string;
  fact: string;
  detailedContext: string;
  relatedGene: string;
  markerId?: string;
  forensicApplication: string;
}

