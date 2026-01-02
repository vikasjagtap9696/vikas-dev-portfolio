const express = require('express');
const router = express.Router();
const projectController = require('../controllers/project.controller');
const { adminAuth } = require('../middlewares/auth.middleware');

// Public routes
router.get('/', projectController.getAll);
router.get('/:id', projectController.getById);

// Admin-only routes
router.post('/', adminAuth, projectController.create);
router.put('/:id', adminAuth, projectController.update);
router.delete('/:id', adminAuth, projectController.delete);

module.exports = router;
