const Prediction = require('../models/Prediction');

exports.getPredictionHistory = async (req, res) => {
    try {
        const predictions = await Prediction.find({ userId: req.user._id }).sort({ createdAt: -1 });
        return res.status(200).json(predictions);
    } catch (error) {
        return res.status(500).json({ status: 'error', detail: 'Internal Server Error' });
    }
};

exports.getPredictionById = async (req, res) => {
    try {
        const prediction = await Prediction.findById(req.params.id);

        if (!prediction) {
            return res.status(404).json({ status: 'error', detail: 'Prediction not found.' });
        }

        if (prediction.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ status: 'error', detail: 'Not authorized to access this prediction.' });
        }

        return res.status(200).json(prediction);
    } catch (error) {
        return res.status(500).json({ status: 'error', detail: 'Internal Server Error' });
    }
};

