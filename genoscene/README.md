# 🧬 GenoScene Web Application
### Flagship Forensic Genomics & Phenotypic Intelligence User Interface

The **GenoScene Web Application** is a modern, high-performance forensic workstation built with **React 19**, **TypeScript**, **Tailwind CSS v4**, and **Framer Motion**. It provides forensic investigators, geneticists, and students with an intuitive, visually stunning platform to analyze genomic data, inspect calibrated phenotype distributions, and explore the science of forensic DNA phenotyping.

---

## ✨ Features & User Experience

- **Interactive Analysis Pipeline (`AnalysisPage.tsx`)**:
  - **Drag-and-Drop SNP CSV Uploader**: Real-time format validation for genotype dosage matrices.
  - **Instant Forensic Demo Profiles**: Preloaded verified profiles (e.g., European ancestry with blue eyes/blond hair, Mediterranean with brown/dark hair) for instant demonstration without external files.
  - **Progressive Staged Animation**: Visualizes five sequential biological pipeline steps from CSV parsing to probability calibration.
  - **Calibrated Phenotype Cards (`PhenotypeCard.tsx`)**: Displays top predicted traits, runner-up undertones, and interactive probability distribution bars.
  - **Photorealistic Facial Reconstruction Display**: Renders synthesized forensic facial portraits matching the predicted trait vector.
- **Dynamic 3D DNA Canvas Background (`AnimatedDNABackground.tsx`)**:
  - GPU-accelerated canvas animation depicting a living DNA double-helix with base-pair hydrogen bonding.
- **Forensic Learning Center (`LearningPage.tsx`)**:
  - Interactive educational articles covering Mendelian Inheritance, Polygenic Traits, Forensic Quality Controls, and Ethical AI in Forensics.
  - Built-in reader modal with progress tracking and scientific diagrams.
- **Scientific Architecture Visualizer (`AboutPage.tsx`)**:
  - Interactive multi-layer diagrams explaining the deep learning models, training methodology, and microservices ecosystem.
- **Hybrid API Architecture (`api.ts`)**:
  - Seamlessly talks to the Node.js API Gateway when available (`VITE_API_URL`).
  - Transparently falls back to an internal client-side forensic mock engine if backend services are offline, ensuring continuous showcase capability.

---

## 🛠️ Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **React 19** | Concurrent UI rendering and state management |
| **TypeScript** | Strict compile-time typing and domain interface contracts |
| **Vite 6** | Ultra-fast Hot Module Replacement (HMR) and optimized bundling |
| **Tailwind CSS v4** | Modern utility-first CSS styling engine |
| **Framer Motion** | Micro-interactions, spring physics, and fluid page transitions |
| **Lucide React** | Clean, accessible scientific iconography |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ or 20+
- npm or yarn

### Installation & Run

```bash
cd genoscene

# Install dependencies
npm install

# Start Vite development server
npm run dev
```

Visit the app at: `http://localhost:5173`

### Production Build & Linting

```bash
# Type-check TypeScript code
npm run lint

# Build production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 🌐 Configuration (`.env`)

Create a `.env` file in the `genoscene/` directory if connecting to a live backend:

```env
VITE_API_URL=http://localhost:3000
```
*If `VITE_API_URL` is omitted, the application runs automatically in offline Forensic Preview mode.*

---

## 📁 Source Code Organization

```
genoscene/
├── src/
│   ├── components/
│   │   ├── about/        # Architecture pipeline & tech stack grids
│   │   ├── analysis/     # Uploader, phenotype cards, probability charts, face visualizer
│   │   ├── common/       # Navbar, Footer, Buttons, Modals, Toast notifications
│   │   ├── dna/          # Canvas animated DNA helix & forensic composites
│   │   ├── home/         # Hero section, feature grids, scientific workflow
│   │   └── learning/     # Educational cards, illustrations, and reader modals
│   ├── data/             # Demo SNP datasets, educational content, scientific insights
│   ├── pages/            # HomePage, AnalysisPage, LearningPage, AboutPage
│   ├── services/         # API abstraction layer with offline fallback
│   ├── types/            # TypeScript schemas (phenotype, learning, API responses)
│   ├── App.tsx           # Application root and state router
│   ├── main.tsx          # React DOM root entry
│   └── index.css         # Tailwind CSS entry & custom styling rules
├── package.json
├── tsconfig.json
└── vite.config.ts
```
