# 🌐 GenoScene Backend API Gateway
### Central Node.js / Express Microservices Orchestrator & Persistence Layer

The **GenoScene Backend** acts as the central hub connecting client applications (Web Frontend) to the downstream Python AI and generative facial reconstruction microservices, while providing persistent user authentication, session security, and complete historical audit trails in MongoDB.

---

## 🚀 Key Responsibilities

1. **API Gateway & Proxying**:
   - Securely receives CSV genotype files via `multipart/form-data`.
   - Proxies inference requests to the FastAPI AI microservice (`http://127.0.0.1:8000/predict`).
   - Dispatches facial reconstruction requests to the SDXL service (`http://127.0.0.1:8001/generate-face`).
2. **User Authentication & Authorization**:
   - User registration and login with `bcrypt` salted password hashing.
   - Stateless **7-day JWT tokens** containing encrypted claims.
   - Route protection middleware ensuring user isolation.
3. **Forensic History & Audit Storage**:
   - Automatically stores all completed predictions linked to the authenticated user's account in MongoDB.
   - Provides full pagination and detail endpoints for historical forensic reviews.
4. **Resilience & Health Monitoring**:
   - Real-time heartbeat endpoints for the Gateway and connected Python AI microservices.

---

## 📡 API Reference

### 🔐 Authentication (`/api/auth`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register a new forensic investigator account | No |
| `POST` | `/api/auth/login` | Authenticate user & return JWT token | No |
| `GET` | `/api/auth/me` | Fetch currently authenticated user profile | Yes (Bearer Token) |

### 🧬 Genotype Analysis (`/api`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/predict` | Upload CSV genotype file, get predictions & save to history | Optional |

### 🖼️ Generative Face Reconstruction (`/api`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/generate-face` | Proxy phenotype vector to SDXL face generator | Optional |

### 📜 Analysis History (`/api/predictions`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/predictions/history` | List all historical predictions of the authenticated user | Yes (Bearer Token) |
| `GET` | `/api/predictions/history/:id` | Fetch specific forensic prediction record by ID | Yes (Bearer Token) |

### 🩺 System Health (`/api`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Node.js Gateway status check (`status: ok`) |
| `GET` | `/api/ai-health` | Pings FastAPI AI engine to verify microservice connectivity |

---

## 🛠️ Configuration & Setup

### Environment Variables
Copy `.env.example` to `.env` and fill in your values:

```bash
PORT=3000
FASTAPI_URL=http://127.0.0.1:8000
FACE_GENERATION_URL=http://127.0.0.1:8001
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/genoscene
JWT_SECRET=your_super_secret_jwt_key
```

### Installation & Launch

```bash
cd backend

# Install dependencies
npm install

# Start in development mode (with nodemon)
npm run dev

# Or start in production mode
npm start
```

---

## 📂 Architecture & Directory Map

```
backend/
├── controllers/          # Request handlers
│   ├── authController.js        # User registration, login, profile
│   ├── faceController.js        # Face synthesis dispatch
│   ├── historyController.js     # User prediction history
│   └── predictionController.js  # File upload & AI prediction forwarding
├── middleware/           # Middleware functions
│   └── authMiddleware.js        # JWT extraction & verification
├── models/               # MongoDB Mongoose schemas
│   ├── Prediction.js            # Stored prediction result schema
│   └── User.js                  # User credentials and metadata
├── routes/               # Express routing tables
│   ├── authRoutes.js
│   ├── faceRoutes.js
│   ├── historyRoutes.js
│   └── predictionRoutes.js
├── services/             # Downstream microservice connectors
│   └── aiService.js             # HTTP proxy calls to FastAPI
├── uploads/              # Transient upload directory (gitignored)
├── server.js             # Express application root & MongoDB connection
├── package.json          # Node dependencies
└── .env.example          # Environment template
```
