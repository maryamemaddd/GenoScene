import { DemoProfile } from '../types/phenotype';

export const DEMO_PROFILES: DemoProfile[] = [
  {
    id: 'demo-alpha',
    name: 'Demo Profile A',
    code: 'DEMO-A',
    description: 'Demonstration profile exhibiting elevated melanin pigmentation across ocular (brown), follicular (black), and dermal (dark to black) trait categories.',
    populationContext: 'Demo data — for interface testing only',
    csvSnippet: `rsid,chromosome,position,genotype
rs12913832,15,28365618,GG
rs1800407,16,89986117,CC
rs16891982,5,33951693,CC
rs1426654,15,48426484,AA
rs1042602,11,88911462,CC
rs1800414,15,28230318,CC
rs12896399,5,33983944,GG
rs1393350,11,89017992,GG
rs12203592,6,396321,CC
rs1110400,9,12683935,CC`,
    data: {
      id: 'result-demo-alpha',
      sampleName: 'Demo_Profile_A.csv',
      timestamp: '2026-09-20 09:14:22 UTC',
      markersAnalyzed: 40,
      totalMarkersRequired: 40,
      confidenceScore: 94.8,
      entropyScore: 0.12,
      eyeColor: {
        predicted: 'Brown',
        probability: 0.9845,
        distribution: [
          { category: 'Brown', probability: 0.9845, colorHex: '#8B4513', description: 'High eumelanin concentration in the iris stroma' },
          { category: 'Blue', probability: 0.0085, colorHex: '#38BDF8', description: 'Minimal stroma pigment with Rayleigh scattering' },
          { category: 'Intermediate', probability: 0.0070, colorHex: '#10B981', description: 'Moderate melanin deposition producing green/hazel tone' }
        ]
      },
      hairColor: {
        predicted: 'Black',
        probability: 0.9210,
        distribution: [
          { category: 'Black', probability: 0.9210, colorHex: '#18181B', description: 'Maximum eumelanin synthesis in hair shaft' },
          { category: 'Brown', probability: 0.0670, colorHex: '#78350F', description: 'Elevated eumelanin with moderate pheomelanin' },
          { category: 'Blond', probability: 0.0080, colorHex: '#FBBF24', description: 'Low total pigment concentration' },
          { category: 'Red', probability: 0.0040, colorHex: '#EF4444', description: 'High pheomelanin ratio mediated by MC1R variants' }
        ]
      },
      skinPigmentation: {
        predicted: 'Dark to Black',
        probability: 0.8445,
        distribution: [
          { category: 'Dark to Black', probability: 0.8445, colorHex: '#3E2723', description: 'Elevated basal eumelanin and melanosome clustering' },
          { category: 'Dark', probability: 0.1230, colorHex: '#5D4037', description: 'Moderate-high dermal melanin density' },
          { category: 'Intermediate', probability: 0.0285, colorHex: '#A1887F', description: 'Equilibrated melanin production' },
          { category: 'Pale', probability: 0.0040, colorHex: '#D7CCC8', description: 'Minimal baseline melanin synthesis' }
        ]
      },
      keyMarkers: [
        { rsid: 'rs12913832', gene: 'HERC2 / OCA2', chromosome: 'Chr 15', position: 28365618, genotype: 'G/G', associatedTrait: 'Eye', impact: 'High', effectAllele: 'G (Brown Eyed Allele)' },
        { rsid: 'rs1426654', gene: 'SLC24A5', chromosome: 'Chr 15', position: 48426484, genotype: 'A/A', associatedTrait: 'Skin', impact: 'High', effectAllele: 'A (Pigment Conserved)' },
        { rsid: 'rs16891982', gene: 'SLC45A2', chromosome: 'Chr 5', position: 33951693, genotype: 'C/C', associatedTrait: 'Skin', impact: 'High', effectAllele: 'C (Ancestral)' },
        { rsid: 'rs1800407', gene: 'MC1R', chromosome: 'Chr 16', position: 89986117, genotype: 'C/C', associatedTrait: 'Hair', impact: 'Moderate', effectAllele: 'C (Wild type / Black)' },
        { rsid: 'rs1042602', gene: 'TYR', chromosome: 'Chr 11', position: 88911462, genotype: 'C/C', associatedTrait: 'Multi-trait', impact: 'Moderate', effectAllele: 'C (Active Tyrosinase)' },
        { rsid: 'rs1800414', gene: 'OCA2', chromosome: 'Chr 15', position: 28230318, genotype: 'C/C', associatedTrait: 'Eye', impact: 'Modifier', effectAllele: 'C (Normal)' }
      ]
    }
  },
  {
    id: 'demo-beta',
    name: 'Demo Profile B',
    code: 'DEMO-B',
    description: 'Demonstration profile exhibiting light pigmentation variants across ocular (blue), follicular (blond), and dermal (pale) trait categories.',
    populationContext: 'Demo data — for interface testing only',
    csvSnippet: `rsid,chromosome,position,genotype
rs12913832,15,28365618,AA
rs1800407,16,89986117,CT
rs16891982,5,33951693,GG
rs1426654,15,48426484,GG
rs1042602,11,88911462,AA
rs1800414,15,28230318,TT
rs12896399,5,33983944,TT
rs1393350,11,89017992,AA
rs12203592,6,396321,TT
rs1110400,9,12683935,TT`,
    data: {
      id: 'result-demo-beta',
      sampleName: 'Demo_Profile_B.csv',
      timestamp: '2026-09-20 11:32:05 UTC',
      markersAnalyzed: 40,
      totalMarkersRequired: 40,
      confidenceScore: 91.6,
      entropyScore: 0.18,
      eyeColor: {
        predicted: 'Blue',
        probability: 0.9420,
        distribution: [
          { category: 'Blue', probability: 0.9420, colorHex: '#38BDF8', description: 'Depleted iris stroma eumelanin, pure light scattering' },
          { category: 'Intermediate', probability: 0.0460, colorHex: '#10B981', description: 'Trace melanin scattering' },
          { category: 'Brown', probability: 0.0120, colorHex: '#8B4513', description: 'Residual background probability' }
        ]
      },
      hairColor: {
        predicted: 'Blond',
        probability: 0.8750,
        distribution: [
          { category: 'Blond', probability: 0.8750, colorHex: '#FBBF24', description: 'Downregulated eumelanin and pheomelanin in keratinocytes' },
          { category: 'Red', probability: 0.0620, colorHex: '#EF4444', description: 'Heterozygous MC1R variant contribution' },
          { category: 'Brown', probability: 0.0510, colorHex: '#78350F', description: 'Low probability darker follicular phenotype' },
          { category: 'Black', probability: 0.0120, colorHex: '#18181B', description: 'Minimal baseline probability' }
        ]
      },
      skinPigmentation: {
        predicted: 'Pale',
        probability: 0.8830,
        distribution: [
          { category: 'Pale', probability: 0.8830, colorHex: '#F5ECE5', description: 'Attenuated melanosome maturation and packaging' },
          { category: 'Intermediate', probability: 0.0980, colorHex: '#D7CCC8', description: 'Moderate UV exposure responsiveness' },
          { category: 'Dark', probability: 0.0150, colorHex: '#8D6E63', description: 'Low probability' },
          { category: 'Dark to Black', probability: 0.0040, colorHex: '#3E2723', description: 'Negligible probability' }
        ]
      },
      keyMarkers: [
        { rsid: 'rs12913832', gene: 'HERC2 / OCA2', chromosome: 'Chr 15', position: 28365618, genotype: 'A/A', associatedTrait: 'Eye', impact: 'High', effectAllele: 'A (Derived Blue Allele)' },
        { rsid: 'rs1426654', gene: 'SLC24A5', chromosome: 'Chr 15', position: 48426484, genotype: 'G/G', associatedTrait: 'Skin', impact: 'High', effectAllele: 'G (Light Pigmentation)' },
        { rsid: 'rs16891982', gene: 'SLC45A2', chromosome: 'Chr 5', position: 33951693, genotype: 'G/G', associatedTrait: 'Skin', impact: 'High', effectAllele: 'G (Derived Light)' },
        { rsid: 'rs1800407', gene: 'MC1R', chromosome: 'Chr 16', position: 89986117, genotype: 'C/T', associatedTrait: 'Hair', impact: 'Moderate', effectAllele: 'T (Pheomelanin Shift)' },
        { rsid: 'rs1042602', gene: 'TYR', chromosome: 'Chr 11', position: 88911462, genotype: 'A/A', associatedTrait: 'Multi-trait', impact: 'Moderate', effectAllele: 'A (Attenuated Tyrosinase)' },
        { rsid: 'rs12203592', gene: 'IRF4', chromosome: 'Chr 6', position: 396321, genotype: 'T/T', associatedTrait: 'Hair', impact: 'Moderate', effectAllele: 'T (Light Hair Modulator)' }
      ]
    }
  },
  {
    id: 'demo-gamma',
    name: 'Demo Profile C',
    code: 'DEMO-C',
    description: 'Demonstration profile exhibiting heterozygous alleles across key pigmentation loci with intermediate trait likelihoods (green/hazel eyes, brown hair, intermediate skin tone).',
    populationContext: 'Demo data — for interface testing only',
    csvSnippet: `rsid,chromosome,position,genotype
rs12913832,15,28365618,AG
rs1800407,16,89986117,CC
rs16891982,5,33951693,CG
rs1426654,15,48426484,AG
rs1042602,11,88911462,AC
rs1800414,15,28230318,CT
rs12896399,5,33983944,GT
rs1393350,11,89017992,AG
rs12203592,6,396321,CT
rs1110400,9,12683935,CT`,
    data: {
      id: 'result-demo-gamma',
      sampleName: 'Demo_Profile_C.csv',
      timestamp: '2026-09-20 14:05:18 UTC',
      markersAnalyzed: 40,
      totalMarkersRequired: 40,
      confidenceScore: 88.4,
      entropyScore: 0.28,
      eyeColor: {
        predicted: 'Intermediate',
        probability: 0.7480,
        distribution: [
          { category: 'Intermediate', probability: 0.7480, colorHex: '#10B981', description: 'Intermediate melanin density creating green/hazel spectrum' },
          { category: 'Brown', probability: 0.1810, colorHex: '#8B4513', description: 'Secondary probability of hazel-brown expression' },
          { category: 'Blue', probability: 0.0710, colorHex: '#38BDF8', description: 'Low probability light phenotype' }
        ]
      },
      hairColor: {
        predicted: 'Brown',
        probability: 0.8640,
        distribution: [
          { category: 'Brown', probability: 0.8640, colorHex: '#78350F', description: 'Balanced follicular eumelanin synthesis' },
          { category: 'Black', probability: 0.0820, colorHex: '#18181B', description: 'High eumelanin tail distribution' },
          { category: 'Blond', probability: 0.0410, colorHex: '#FBBF24', description: 'Low concentration variant' },
          { category: 'Red', probability: 0.0130, colorHex: '#EF4444', description: 'Minimal pheomelanin elevation' }
        ]
      },
      skinPigmentation: {
        predicted: 'Intermediate',
        probability: 0.7960,
        distribution: [
          { category: 'Intermediate', probability: 0.7960, colorHex: '#A1887F', description: 'Balanced melanin pigmentation with moderate UV adaptation' },
          { category: 'Pale', probability: 0.1420, colorHex: '#D7CCC8', description: 'Potential seasonal variance or light baseline' },
          { category: 'Dark', probability: 0.0550, colorHex: '#5D4037', description: 'Moderate-dark threshold tail' },
          { category: 'Dark to Black', probability: 0.0070, colorHex: '#3E2723', description: 'Negligible tail probability' }
        ]
      },
      keyMarkers: [
        { rsid: 'rs12913832', gene: 'HERC2 / OCA2', chromosome: 'Chr 15', position: 28365618, genotype: 'A/G', associatedTrait: 'Eye', impact: 'High', effectAllele: 'A/G (Heterozygous Intermed.)' },
        { rsid: 'rs1426654', gene: 'SLC24A5', chromosome: 'Chr 15', position: 48426484, genotype: 'A/G', associatedTrait: 'Skin', impact: 'High', effectAllele: 'A/G (Heterozygous Blend)' },
        { rsid: 'rs16891982', gene: 'SLC45A2', chromosome: 'Chr 5', position: 33951693, genotype: 'C/G', associatedTrait: 'Skin', impact: 'High', effectAllele: 'C/G (Intermediate Transfer)' },
        { rsid: 'rs1800407', gene: 'MC1R', chromosome: 'Chr 16', position: 89986117, genotype: 'C/C', associatedTrait: 'Hair', impact: 'Moderate', effectAllele: 'C (Wild type)' },
        { rsid: 'rs1042602', gene: 'TYR', chromosome: 'Chr 11', position: 88911462, genotype: 'A/C', associatedTrait: 'Multi-trait', impact: 'Moderate', effectAllele: 'A/C (Intermediate Enz.)' }
      ]
    }
  }
];

