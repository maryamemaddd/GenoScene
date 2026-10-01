const fs = require('fs');
const aiService = require('../services/aiService');
const Prediction = require('../models/Prediction');

exports.predict = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ status: 'error', detail: 'Missing file uploaded' });
    }

    if (!req.file.originalname.toLowerCase().endsWith('.csv')) {

        if (fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
        return res.status(400).json({ status: 'error', detail: 'Uploaded file must be a CSV format' });
    }

    try {

        const prediction = await aiService.forwardPrediction(req.file.path, req.file.originalname);

        if (fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);

        await Prediction.create({
            userId: req.user._id,
            filename: req.file.originalname,
            Eye: prediction.Eye,
            Hair: prediction.Hair,
            Skin: prediction.Skin,
            Summary: prediction.Summary,
            'Overall_Confidence_%': prediction['Overall_Confidence_%']
        });

        return res.json(prediction);
    } catch (error) {

        if (fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);

        const status = error.response?.status || 500;
        const detail = error.response?.data?.detail || 'Internal AI Server Gateway Error';
        return res.status(status).json({ status: 'error', detail });
    }
};

