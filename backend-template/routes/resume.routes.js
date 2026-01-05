const express = require('express');
const router = express.Router();
const resumeController = require('../controllers/resume.controller');
const { adminAuth } = require('../middlewares/auth.middleware');

// Public route
router.get('/', resumeController.get);

// Admin-only route
router.put('/', adminAuth, resumeController.update);

module.exports = router;
