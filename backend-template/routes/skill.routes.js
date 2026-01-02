const express = require('express');
const router = express.Router();
const skillController = require('../controllers/skill.controller');
const { adminAuth } = require('../middlewares/auth.middleware');

// Public routes
router.get('/', skillController.getAll);
router.get('/:id', skillController.getById);

// Admin-only routes
router.post('/', adminAuth, skillController.create);
router.put('/:id', adminAuth, skillController.update);
router.delete('/:id', adminAuth, skillController.delete);

module.exports = router;
