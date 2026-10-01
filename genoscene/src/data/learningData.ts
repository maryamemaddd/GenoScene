import { EducationalItem } from '../types/learning';
import { SCIENTIFIC_IMAGES } from './scientificImages';

export const BIOLOGICAL_LEARNING_ITEMS: EducationalItem[] = [
  {
    id: 'bio-dna',
    title: 'DNA Structure & Molecular Genetics',
    subtitle: 'The double helix building blocks of life and forensic genomic analysis',
    category: 'genetics',
    section: 'biological',
    format: 'article',
    readTimeOrDuration: '6 min read',
    difficulty: 'Foundational',
    imageUrl: SCIENTIFIC_IMAGES.dnaDoubleHelix.url,
    imageCaption: SCIENTIFIC_IMAGES.dnaDoubleHelix.caption,
    summary: 'Discover how the antiparallel double-helix structure, hydrogen-bonded nucleotide base pairs (A-T, G-C), and phosphodiester backbones preserve the genetic blueprint for human phenotyping.',
    content: [
      'Deoxyribonucleic acid (DNA) is the fundamental molecule encoding the biological architecture of all living organisms. Arranged as an antiparallel double helix discovered by Watson, Crick, and Franklin, its molecular backbone consists of alternating deoxyribose sugar and phosphate groups.',
      'Genetic information is transcribed through linear sequences of four nitrogenous bases: Adenine (A), Thymine (T), Guanine (G), and Cytosine (C). In human forensic genetics, single base pair alterations across the 3 billion base pairs of the nuclear genome serve as informative biometric markers.',
      'Forensic DNA phenotyping focuses specifically on autosomal single nucleotide polymorphisms that alter amino acid sequences, transcript stability, or promoter affinities in pigmentation pathways.',
      'High-throughput sequencing and multiplex PCR allow forensic scientists to recover complete genotype signatures from nanogram-level biological traces recovered at crime scenes.'
    ],
    keyTakeaways: [
      'Antiparallel double-helix structure stabilizes genetic code via hydrogen-bonded base pairs.',
      'Single base-pair changes (SNPs) across non-coding and coding regions drive phenotypic diversity.',
      'Modern multiplex assays amplify minute forensic specimens without sample destruction.'
    ],
    tags: ['DNA', 'Double Helix', 'Nucleotides', 'Molecular Biology', 'Forensic Genetics'],
    scientificReferences: [
      'Watson, J. D., & Crick, F. H. (1953). Molecular structure of nucleic acids: a structure for deoxyribose nucleic acid. Nature, 171(4356), 737-738.',
      'Butler, J. M. (2014). Advanced topics in forensic DNA typing: interpretation. Academic Press.'
    ]
  },
  {
    id: 'bio-3',
    title: 'SNPs & Genetic Markers',
    subtitle: 'Small single-nucleotide variations, massive differences in phenotype prediction',
    category: 'snps',
    section: 'biological',
    format: 'diagram',
    readTimeOrDuration: '5 min read',
    difficulty: 'Intermediate',
    imageUrl: SCIENTIFIC_IMAGES.chromosomesAndSnps.url,
    imageCaption: SCIENTIFIC_IMAGES.chromosomesAndSnps.caption,
    summary: 'An educational chromosomal mapping highlighting the 40 high-impact Single Nucleotide Polymorphism (SNP) loci utilized across human chromosomes 2, 5, 6, 9, 11, 14, 15, and 16.',
    content: [
      'Single Nucleotide Polymorphisms (SNPs) represent the most ubiquitous type of genetic variation in the human genome, occurring approximately once every 1,000 base pairs.',
      'In forensic phenotyping, selecting informative SNPs requires identifying markers exhibiting high effect sizes (odds ratios) and reproducible associations across global reference populations.',
      'GenoScene evaluates a panel of 40 selected high-impact SNPs derived from validated protocols (including the HIrisPlex-S assay). Prominent markers include rs12913832 in HERC2/OCA2, rs16891982 in SLC45A2, and rs1426654 in SLC24A5.',
      'Each marker is encoded as an additive allele dosage (0, 1, or 2), representing the count of derived trait-associated alleles for machine learning ingestion.'
    ],
    keyTakeaways: [
      '40 high-impact SNPs provide simultaneous prediction for eye, hair, and skin tone.',
      'Markers are situated across chromosomes 2, 5, 6, 9, 11, 14, 15, and 16.',
      'Additive allele dosages (0, 1, 2) form the numerical input matrix for ML classification.'
    ],
    tags: ['40 SNPs', 'Genomic Panel', 'Forensic Markers', 'Allele Dosage', 'Chromosomes'],
    diagramType: 'hirisplex_snps',
    scientificReferences: [
      'Walsh, S., et al. (2018). Global testing of HIrisPlex-S system for simultaneously predicting eye, hair and skin colour from DNA. Forensic Science International: Genetics, 35, 123-134.'
    ]
  },
  {
    id: 'bio-1',
    title: 'Melanin Synthesis & Melanocyte Biology',
    subtitle: 'The biological enzymatic pathway governing human eumelanin and pheomelanin production',
    category: 'pigmentation',
    section: 'biological',
    format: 'article',
    readTimeOrDuration: '7 min read',
    difficulty: 'Intermediate',
    imageUrl: SCIENTIFIC_IMAGES.melaninCellular.url,
    imageCaption: SCIENTIFIC_IMAGES.melaninCellular.caption,
    summary: 'Explore how melanocytes in hair follicles, skin basal layers, and iris stroma translate genetic instructions into visible pigment phenotypes inside specialized melanosome organelles.',
    content: [
      'Human pigmentation is primarily dictated by two types of melanin pigments: eumelanin (which produces black and brown tones) and pheomelanin (which produces red and yellow tones).',
      'The biological machinery governing melanin synthesis operates inside specialized lysosome-related organelles termed melanosomes. The primary enzyme regulating the rate-limiting step of melanin synthesis is tyrosinase (TYR).',
      'Genetic variations in genes such as HERC2, OCA2, SLC24A5, SLC45A2, and MC1R perturb either the transcription of pigmentation enzymes, ion transport across melanosomal membranes, or receptor signaling pathways.',
      'Forensic DNA Phenotyping leverages these epistatic and additive polygenic associations to deduce pigmentation phenotypes from minute biological specimens left at crime scenes.'
    ],
    keyTakeaways: [
      'Eumelanin and pheomelanin ratios determine outward visible pigmentation.',
      'Melanosome pH and membrane ion transport (SLC24A5, SLC45A2) directly dictate enzyme efficiency.',
      'Epistasis between HERC2 and OCA2 acts as a master switch for eye color.'
    ],
    tags: ['Melanin', 'Melanocytes', 'Eumelanin', 'Tyrosinase', 'Forensics'],
    scientificReferences: [
      'Sturm, R. A., & Duffy, D. L. (2012). Human pigmentation genes under selection for the evolution of human traits. Human Molecular Genetics, 21(R1), R9-R14.',
      'Kayser, M. (2015). Forensic DNA phenotyping: predicting human appearance from crime scene material for investigative purposes. Investigative Genetics, 6(1), 1-19.'
    ]
  },
  {
    id: 'bio-2',
    title: 'Eye Color Genetics & Iris Structure',
    subtitle: 'The science behind iris stroma pigmentation and optical Rayleigh scattering',
    category: 'forensics',
    section: 'biological',
    format: 'video',
    readTimeOrDuration: '8 min read',
    difficulty: 'Foundational',
    imageUrl: SCIENTIFIC_IMAGES.eyeIrisMacro.url,
    imageCaption: SCIENTIFIC_IMAGES.eyeIrisMacro.caption,
    summary: 'Deconstructing the anatomical and optical mechanics of ocular iris coloration: how stroma melanocyte eumelanin density and light scattering determine blue, intermediate, and brown eyes.',
    content: [
      'The human iris does not contain blue pigment. Blue irises are an optical phenomenon created by the Rayleigh scattering of incident light through a translucent iris stroma with low melanin concentration.',
      'The IrisPlex system utilizes 6 informative SNPs across 6 genes: HERC2 (rs12913832), OCA2 (rs1800407), SLC24A4 (rs12896399), SLC45A2 (rs16891982), TYR (rs1393350), and IRF4 (rs12203592).',
      'Among these, rs12913832 in HERC2 accounts for nearly 75% of eye color variance in Eurasian populations by regulating an enhancer loop controlling OCA2 transcription.',
      'Intermediate phenotypes (such as green and hazel) involve complex modifier alleles and localized pigment deposition across the pupillary ring and anterior border layer.'
    ],
    keyTakeaways: [
      'Iris color is determined by stroma eumelanin density and Rayleigh light scattering.',
      '6 key SNPs account for the vast majority of blue vs. brown phenotypic variance.',
      'Intermediate/hazel eyes retain the highest degree of model uncertainty.'
    ],
    tags: ['IrisPlex', 'Eye Color', 'HERC2', 'Rayleigh Scattering', 'Forensics'],
    scientificReferences: [
      'Walsh, S., Liu, F., Wollstein, A., et al. (2011). The IrisPlex system for DNA-based prediction of eye colour in forensic applications. Forensic Science International: Genetics, 5(3), 170-180.'
    ]
  },
  {
    id: 'bio-hair',
    title: 'Hair Color Genetics & Follicular Pigment',
    subtitle: 'From melanocyte synthesis in the hair bulb to cortical keratin fiber deposition',
    category: 'pigmentation',
    section: 'biological',
    format: 'article',
    readTimeOrDuration: '6 min read',
    difficulty: 'Intermediate',
    imageUrl: SCIENTIFIC_IMAGES.hairPigmentation.url,
    imageCaption: SCIENTIFIC_IMAGES.hairPigmentation.caption,
    summary: 'How melanocytes situated within the hair follicle bulb transfer eumelanin and pheomelanin packages to cortical keratinocytes, generating black, brown, blond, and red phenotypes.',
    content: [
      'Hair color is determined by the density and composition of melanin granules transferred from melanocytes into cortical keratinocytes as the hair shaft elongates from the follicle bulb.',
      'Loss-of-function variants in the melanocortin 1 receptor (MC1R) gene on chromosome 16 prevent cAMP signaling, switching the synthesis pathway from dark eumelanin to red pheomelanin and resulting in the red hair phenotype.',
      'Blond hair is characterized by very low eumelanin concentrations, frequently associated with regulatory variants in KITLG and TPCN2, while brown and black hair reflect progressively denser eumelanin packing.',
      'GenoScene employs a Stacking ensemble classifier to evaluate multi-locus epistatic combinations and output calibrated probabilities across all four hair color classes.'
    ],
    keyTakeaways: [
      'Hair color results from melanosome transfer from bulb melanocytes into hair cortex keratin.',
      'MC1R loss-of-function variants drive the red hair phenotype via pheomelanin predominance.',
      'Predictive Stacking models resolve epistatic interactions across MC1R, IRF4, and ASIP.'
    ],
    tags: ['Hair Color', 'MC1R', 'Follicle Biology', 'Stacking Model', 'Keratin'],
    scientificReferences: [
      'Valenzuela, R. K., et al. (2010). Predicting phenotype features for forensic identification from DNA. Journal of Forensic Sciences, 55(2), 315-322.'
    ]
  },
  {
    id: 'bio-4',
    title: 'Skin Pigmentation & Melanocyte Biology',
    subtitle: 'Reference standards and quantitative calibration across categorical dermal tones',
    category: 'pigmentation',
    section: 'biological',
    format: 'picture',
    readTimeOrDuration: '7 min read',
    difficulty: 'Intermediate',
    imageUrl: SCIENTIFIC_IMAGES.skinPigmentation.url,
    imageCaption: SCIENTIFIC_IMAGES.skinPigmentation.caption,
    summary: 'Curated references explaining standard forensic classifications across pale, intermediate, dark, and dark-to-black human dermal phenotypes and melanosome distribution.',
    content: [
      'In forensic phenotyping, skin pigmentation is evaluated through standard categorical classifications: Pale, Intermediate, Dark, and Dark to Black.',
      'GenoScene models predict probability distributions across these four categories based on high-impact markers in genes like SLC24A5, SLC45A2, and TYR.',
      'Because pigmentation is a continuous biological trait influenced by genetics and environment, results are delivered as calibrated category probabilities rather than single deterministic claims.',
      'Differences in skin pigmentation between human populations reflect variations in melanosome size, distribution, and degradation rate within epidermal keratinocytes rather than differences in the absolute count of melanocytes.'
    ],
    keyTakeaways: [
      'Skin pigmentation is categorized into four standard forensic classes.',
      'Key transporters like SLC24A5 and SLC45A2 strongly correlate with basal pigmentation variations.',
      'Results must always be interpreted as probabilistic likelihoods rather than rigid cutoffs.'
    ],
    tags: ['Skin Tone', 'Categorical Pigmentation', 'Forensic Standards', 'Melanin Genetics']
  }
];

export const TECHNICAL_LEARNING_ITEMS: EducationalItem[] = [
  {
    id: 'tech-1',
    title: 'Machine Learning in Forensic Genetics',
    subtitle: 'Support Vector Classifiers, Stacking ensembles, and HistGradientBoosting',
    category: 'machine_learning',
    section: 'technical',
    format: 'article',
    readTimeOrDuration: '8 min read',
    difficulty: 'Advanced',
    imageUrl: SCIENTIFIC_IMAGES.machineLearningNodes.url,
    imageCaption: SCIENTIFIC_IMAGES.machineLearningNodes.caption,
    summary: 'An architectural overview of the supervised machine learning algorithms deployed in GenoScene: Support Vector Classification for eye color, Stacking models for hair color, and HistGradientBoosting for skin tone.',
    content: [
      'GenoScene deploys specialized supervised machine learning models tailored to each trait: Support Vector Classification (SVC) with calibrated probability scaling for eye color, Stacking ensemble models for hair color, and HistGradientBoosting for skin pigmentation.',
      'Models evaluate additive allele dosages: X_j in {0, 1, 2} denoting the count of derived phenotype-associated alleles at each of the 40 selected loci.',
      'Rather than black-box decisions, models output calibrated posterior probabilities for each category, enabling rigorous uncertainty quantification in forensic contexts.',
      'Validation protocols include cross-validation across diverse ancestral reference samples to verify robust generalization without overfitting.'
    ],
    keyTakeaways: [
      'Eye color is classified via Support Vector Classifier (SVC).',
      'Hair color utilizes Stacking ensemble models; skin pigmentation uses HistGradientBoosting.',
      'Calibrated probabilities ensure transparency and avoid overconfident forensic claims.'
    ],
    tags: ['SVC', 'Stacking', 'HistGradientBoosting', 'Machine Learning', 'Probabilities'],
    scientificReferences: [
      'Liu, F., van Duijn, K., et al. (2009). Eye color and the prediction of complex phenotypes from genotypes. Current Biology, 19(5), R192-R193.'
    ]
  },
  {
    id: 'tech-2',
    title: 'SNP Genotype CSV Processing & Allele Dosage Pipeline',
    subtitle: 'From structured genotype tables to standardized allele dosage vectors',
    category: 'feature_engineering',
    section: 'technical',
    format: 'diagram',
    readTimeOrDuration: '6 min read',
    difficulty: 'Intermediate',
    imageUrl: SCIENTIFIC_IMAGES.molecularGenetics.url,
    imageCaption: SCIENTIFIC_IMAGES.molecularGenetics.caption,
    summary: 'Schematic detailing how GenoScene parses input CSV files, validates marker rsIDs, and transforms raw genotype calls into numeric allele dosage vectors.',
    content: [
      'GenoScene ingests standardized genotype CSV files containing rsID markers, chromosome coordinates, and observed genotype calls.',
      'The parser validates that required loci are present in the panel and checks for consistent allelic format.',
      'Valid genotype calls are converted into additive numeric features (0, 1, 2) corresponding to the count of effect alleles for subsequent model evaluation.'
    ],
    keyTakeaways: [
      'Genotype CSV format requires standard rsIDs and allele calls.',
      'Validation checks ensure marker presence before inference.',
      'Additive allele dosages (0, 1, 2) feed directly into the predictive models.'
    ],
    tags: ['CSV Parsing', 'Allele Dosage', 'Feature Vector', '40 Markers'],
    diagramType: 'neural_network'
  },
  {
    id: 'tech-3',
    title: 'Latent Space Visual Guidance Synthesis Architecture',
    subtitle: 'How predicted phenotype distributions parameterize visual face guidance models',
    category: 'generative_ai',
    section: 'technical',
    format: 'video',
    readTimeOrDuration: '9 min read',
    difficulty: 'Advanced',
    imageUrl: SCIENTIFIC_IMAGES.dataManifold.url,
    imageCaption: SCIENTIFIC_IMAGES.dataManifold.caption,
    summary: 'Technical explanation of how categorical phenotype vectors constrain diffusion latent spaces to render realistic visual guidance without biometric over-claiming.',
    content: [
      'A fundamental hazard of forensic facial reconstruction is the misconception that DNA encodes complete facial bone geometry. Contemporary science cannot reliably predict precise craniofacial morphology from DNA alone.',
      'GenoScene explicitly confines visual guidance to externally visible pigmentation traits (iris chroma, hair melanin, dermal saturation).',
      'The generative engine maps phenotype probability vectors into continuous conditioning embeddings for diffusion models, generating plausible composite visualizations within strict uncertainty envelopes.',
      'The resulting imagery serves as an investigative lead filter, never as an absolute biometric likeness.'
    ],
    keyTakeaways: [
      'Visual guidance is strictly restricted to pigmentation traits, not fine bone geometry.',
      'Conditioning vectors parameterize latent space rendering without fabricating identity.',
      'Comprehensive disclaimers and confidence indicators prevent investigative bias.'
    ],
    tags: ['Latent Space', 'Diffusion Models', 'Conditioning', 'Visual Guidance', 'Forensic Ethics']
  },
  {
    id: 'tech-4',
    title: 'Evaluating Uncertainty: Entropy & Brier Calibration Scores',
    subtitle: 'Why confidence reporting and uncertainty quantification are mandatory in forensics',
    category: 'evaluation',
    section: 'technical',
    format: 'article',
    readTimeOrDuration: '8 min read',
    difficulty: 'Intermediate',
    imageUrl: SCIENTIFIC_IMAGES.forensicSequencing.url,
    imageCaption: SCIENTIFIC_IMAGES.forensicSequencing.caption,
    summary: 'Understanding Shannon entropy, calibration curves, and Brier scores in forensic DNA phenotyping risk mitigation.',
    content: [
      'When an algorithm predicts 65% Brown and 35% Intermediate eye color, presenting this as a definitive Brown outcome constitutes a critical forensic failure.',
      'GenoScene computes the normalized Shannon entropy across categorical distributions to quantify prediction ambiguity.',
      'Cases with elevated entropy are visually signaled to forensic practitioners, encouraging supplementary testing rather than premature investigative conclusions.'
    ],
    keyTakeaways: [
      'Probabilities must be communicated alongside explicit uncertainty metrics.',
      'Normalized Shannon entropy quantifies ambiguity in intermediate phenotypes.',
      'Brier scores evaluate how closely predicted probabilities track ground truth frequencies.'
    ],
    tags: ['Uncertainty', 'Entropy', 'Brier Score', 'Calibration', 'Forensic Law']
  }
];

