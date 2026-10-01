import { GeneticInsight } from '../types/learning';

export const DAILY_GENETIC_INSIGHTS: GeneticInsight[] = [
  {
    id: 'insight-herc2',
    category: 'Ocular Pigmentation',
    title: 'The HERC2-OCA2 Intronic Switch',
    fact: 'A single point mutation in intron 86 of the HERC2 gene (rs12913832) functions as a biological rheostat for human eye color.',
    detailedContext: 'The A-allele at rs12913832 attenuates transcription factor binding, reducing the expression of the neighboring OCA2 gene. This suppresses eumelanin deposition in the anterior stroma of the iris, causing light to scatter Rayleigh-style and resulting in blue eyes rather than brown.',
    relatedGene: 'HERC2 / OCA2 (Chromosome 15)',
    markerId: 'rs12913832',
    forensicApplication: 'Yields >95% prediction accuracy for blue vs. brown iris classification in forensic casework.'
  },
  {
    id: 'insight-mc1r',
    category: 'Follicular Pigmentation',
    title: 'MC1R & Pheomelanin Secretion',
    fact: 'Loss-of-function variants in the Melanocortin 1 Receptor (MC1R) redirect melanin biosynthesis from black/brown eumelanin toward reddish-yellow pheomelanin.',
    detailedContext: 'MC1R is a G protein-coupled receptor on melanocytes. When inactive, intracellular cAMP levels decline, preventing the enzyme tyrosinase from converting dopaquinone into eumelanin, causing red hair and prominent ephelides (freckling).',
    relatedGene: 'MC1R (Chromosome 16)',
    markerId: 'rs1805007 / rs1805008',
    forensicApplication: 'Crucial for forensic identification of red hair and elevated UV sensitivity.'
  },
  {
    id: 'insight-slc24a5',
    category: 'Dermal Pigmentation',
    title: 'SLC24A5 and the Evolution of Skin Tone',
    fact: 'The derived Ala111Thr variant in SLC24A5 explains roughly one-third of the pigmentation variation between Western Eurasian and West African populations.',
    detailedContext: 'SLC24A5 codes for a potassium-dependent sodium-calcium exchanger located in the melanosome membrane. The derived G-allele diminishes melanosome maturation and size, resulting in lighter basal skin pigmentation.',
    relatedGene: 'SLC24A5 (Chromosome 15)',
    markerId: 'rs1426654',
    forensicApplication: 'One of the highest-weight predictive features within the HIrisPlex-S forensic skin color model.'
  },
  {
    id: 'insight-slc45a2',
    category: 'Multi-Trait Pigmentation',
    title: 'SLC45A2 and Melanoma Susceptibility',
    fact: 'The p.Phe374Leu variant in the SLC45A2 transporter gene directly modulates ocular, follicular, and dermal melanin saturation.',
    detailedContext: 'SLC45A2 facilitates melanosome acidification necessary for optimal tyrosinase enzymatic activity. The derived allele is strongly associated with lighter hair, pale skin, and light hazel/blue eyes.',
    relatedGene: 'SLC45A2 (Chromosome 5)',
    markerId: 'rs16891982',
    forensicApplication: 'Used in multi-variant Bayesian classifiers to disambiguate intermediate hair shades.'
  },
  {
    id: 'insight-hirisplex',
    category: 'Forensic Methodology',
    title: 'The Compact 40-SNP Phenotyping Panel',
    fact: 'Forensic DNA phenotyping targets selected high-impact single nucleotide polymorphisms to estimate eye, hair, and skin pigmentation traits simultaneously.',
    detailedContext: "Derived from established forensic protocols including HIrisPlex-S, GenoScene's compact panel of 40 selected SNP markers focuses on key loci across HERC2, OCA2, SLC24A5, SLC45A2, and MC1R to power calibrated classification models.",
    relatedGene: '40 Selected SNP Markers',
    markerId: 'GenoScene 40-SNP Panel',
    forensicApplication: 'Provides investigative guidance and probability estimations for cold cases and unidentified human remains.'
  }
];

