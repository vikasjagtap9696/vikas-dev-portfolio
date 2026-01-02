const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { verifyToken } = require('../middlewares/auth.middleware');

// POST /api/auth/login - Admin login
router.post('/login', authController.login);

// GET /api/auth/profile - Get current user profile (protected)
router.get('/profile', verifyToken, authController.getProfile);

// GET /api/auth/verify - Verify token validity (protected)
router.get('/verify', verifyToken, authController.verifyToken);

module.exports = router;
