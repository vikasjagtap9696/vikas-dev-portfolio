const express = require('express');
const router = express.Router();
const experienceController = require('../controllers/experience.controller');
const { adminAuth } = require('../middlewares/auth.middleware');

// Public routes
router.get('/', experienceController.getAll);
router.get('/:id', experienceController.getById);

// Admin-only routes
router.post('/', adminAuth, experienceController.create);
router.put('/:id', adminAuth, experienceController.update);
router.delete('/:id', adminAuth, experienceController.delete);

module.exports = router;
