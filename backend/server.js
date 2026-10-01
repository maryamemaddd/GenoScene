require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const predictionRoutes = require('./routes/predictionRoutes');
const faceRoutes = require('./routes/faceRoutes');
const authRoutes = require('./routes/authRoutes');
const historyRoutes = require('./routes/historyRoutes');
const aiService = require('./services/aiService');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:5173'],
    methods: ['GET', 'POST'],
    credentials: true,
}));

app.use(express.json());

app.use('/api', predictionRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/predictions', historyRoutes);
app.use('/api', faceRoutes);

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
});

app.get('/api/ai-health', async (req, res) => {
    try {
        const aiStatus = await aiService.pingFastAPI();
        if (aiStatus) {
            res.json({ status: 'ok', ai_service: 'available' });
        } else {
            res.status(503).json({ status: 'error', ai_service: 'unavailable' });
        }
    } catch (error) {
        res.status(503).json({ status: 'error', ai_service: 'unavailable' });
    }
});

if (process.env.MONGODB_URI) {
    mongoose.connect(process.env.MONGODB_URI)
        .then(() => console.log('Successfully connected to MongoDB Cluster.'))
        .catch((error) => console.error('MongoDB Initial Connection Error:', error.message));
} else {
    console.log('NOTICE: MONGODB_URI is empty. Operating without database connectivity.');
}

app.listen(PORT, () => {
    console.log(`Node API Gateway running on http://localhost:${PORT}`);
});

