const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');

const FASTAPI_URL = process.env.FASTAPI_URL || 'http://127.0.0.1:8000';

exports.pingFastAPI = async () => {
    try {
        const response = await axios.get(`${FASTAPI_URL}/health`, { timeout: 5000 });
        return response.data.status === 'ok';
    } catch (e) {
        return false;
    }
};

exports.forwardPrediction = async (filePath, originalName) => {
    const formData = new FormData();
    formData.append('file', fs.createReadStream(filePath), { filename: originalName });

    const response = await axios.post(`${FASTAPI_URL}/predict`, formData, {
        headers: formData.getHeaders(),
        timeout: 6000000
    });

    return response.data;
};

const FACE_GENERATION_URL = process.env.FACE_GENERATION_URL || 'http://127.0.0.1:8001';

exports.forwardFaceGeneration = async (predictionData) => {

    const response = await axios.post(`${FACE_GENERATION_URL}/generate`, predictionData, {
        responseType: 'stream',
        timeout: 120000
    });
    return response;
};

