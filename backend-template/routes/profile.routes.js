const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profile.controller');
const { adminAuth } = require('../middlewares/auth.middleware');

// Public route
router.get('/', profileController.get);

// Admin-only route
router.put('/', adminAuth, profileController.update);

module.exports = router;
