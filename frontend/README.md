# 🖥️ GenoScene Frontend Client
### Secondary React Client Interface & Historical Records Explorer

The **GenoScene Frontend Client** is a lightweight, responsive web application designed for streamlined forensic DNA analysis, quick trait inspection, and historical query reviews.

---

## 🌟 Features

- **Direct Prediction Interface (`UploadBox.jsx`)**:
  - Drag-and-drop CSV uploader communicating with `/api/predict`.
  - Instant visualization of Eye, Hair, and Skin predictions with probability score bars.
- **Generative Portrait Viewer (`FaceGenerator.jsx`)**:
  - Displays generated composite portraits and status updates from the SDXL diffusion pipeline.
- **Forensic History Page (`pages/History.jsx`)**:
  - Paginated list of historical analyses executed by the authenticated investigator.
  - Detailed modal view displaying past prediction records and associated genomic parameters.
- **Dynamic Information Slider (`InformationSlider.jsx`)**:
  - Informative carousel introducing key forensic SNP concepts and genetics principles.

---

## 🛠️ Tech Stack

- **React 19** (JSX)
- **Vite 6**
- **Tailwind CSS**
- **Lucide React Icons**
- **Framer Motion**
- **Axios** (for API communication)
- **React Router DOM** (for page navigation)

---

## 🚀 Setup & Launch

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev

# Build production bundle
npm run build
```

The application runs by default on `http://localhost:5173`.

---

## ⚙️ Configuration (`.env`)

```env
VITE_API_URL=http://localhost:3000/api
```

---

## 📁 Project Structure

```
frontend/
├── public/                 # Favicons and SVG icons
├── src/
│   ├── assets/             # Logos and imagery
│   ├── components/
│   │   ├── FaceGenerator.jsx
│   │   ├── Header.jsx
│   │   ├── HistoryCard.jsx
│   │   ├── InformationSlider.jsx
│   │   ├── LearningSection.jsx
│   │   ├── PredictionCard.jsx
│   │   ├── ProbabilityBar.jsx
│   │   └── UploadBox.jsx
│   ├── pages/
│   │   └── History.jsx
│   ├── App.jsx             # Main layout & auth management
│   ├── index.css           # Styling rules
│   └── main.jsx            # Application mount
├── package.json
└── vite.config.js
```
