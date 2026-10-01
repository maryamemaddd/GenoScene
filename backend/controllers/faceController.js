const aiService = require('../services/aiService');
const Prediction = require('../models/Prediction');

exports.generateFace = async (req, res) => {

    const predictionData = req.body;

    if (!predictionData || !predictionData.Eye || !predictionData.Hair || !predictionData.Skin) {
        return res.status(400).json({ status: 'error', detail: 'Missing or invalid prediction payload' });
    }

    try {

        const faceStreamResponse = await aiService.forwardFaceGeneration(predictionData);

        res.setHeader('Content-Type', 'image/png');
        faceStreamResponse.data.pipe(res);

    } catch (error) {
        console.error("Face Generation Error:", error.message);

        let status = 500;
        let detail = 'Face Generation Service Gateway Error';

        if (error.response) {
            status = error.response.status;
            detail = 'Face Generator Unavailable or Failed';

            if (error.response.data && typeof error.response.data.on === 'function') {
                try {
                    const streamData = await new Promise((resolve, reject) => {
                        let chunks = '';
                        error.response.data.on('data', chunk => chunks += chunk);
                        error.response.data.on('end', () => resolve(chunks));
                        error.response.data.on('error', reject);
                    });
                    const parsed = JSON.parse(streamData);
                    if (parsed.detail) detail = parsed.detail;
                } catch (e) {

                }
            } else if (error.response.data?.detail) {
                detail = error.response.data.detail;
            }
        }

        return res.status(status).json({ status: 'error', detail });
    }
};

