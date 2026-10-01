const mongoose = require('mongoose');

const traitSchema = new mongoose.Schema({
    Top: { type: String, required: true },
    'Confidence_%': { type: Number, required: true },
    Entropy: { type: Number, required: true },
    Uncertainty: { type: String, required: true },
    'Probabilities_%': { type: Map, of: Number, required: true }
}, { _id: false });

const predictionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    filename: {
        type: String,
        required: true,
    },
    Eye: {
        type: traitSchema,
        required: true,
    },
    Hair: {
        type: traitSchema,
        required: true,
    },
    Skin: {
        type: traitSchema,
        required: true,
    },
    Summary: {
        type: Map,
        of: String,
        required: true,
    },
    'Overall_Confidence_%': {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('Prediction', predictionSchema);

