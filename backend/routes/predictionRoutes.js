const express = require('express');
const router = express.Router();
const multer = require('multer');
const predictionController = require('../controllers/predictionController');
const { protect } = require('../middleware/authMiddleware');

const upload = multer({ dest: 'uploads/', limits: { fileSize: 10 * 1024 * 1024 } });

router.post('/predict', protect, upload.single('file'), predictionController.predict);

module.exports = router;

