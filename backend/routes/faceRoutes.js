const express = require('express');
const router = express.Router();
const faceController = require('../controllers/faceController');
const { protect } = require('../middleware/authMiddleware');

router.post('/face-generation', protect, faceController.generateFace);

module.exports = router;

