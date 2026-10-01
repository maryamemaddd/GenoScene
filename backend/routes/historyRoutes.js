const express = require('express');
const router = express.Router();
const { getPredictionHistory, getPredictionById } = require('../controllers/historyController');
const { protect } = require('../middleware/authMiddleware');

router.get('/history', protect, getPredictionHistory);
router.get('/:id', protect, getPredictionById);

module.exports = router;

