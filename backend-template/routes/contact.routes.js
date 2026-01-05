const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contact.controller');
const { adminAuth } = require('../middlewares/auth.middleware');

// Public route - submit contact form
router.post('/', contactController.create);

// Admin-only routes
router.get('/', adminAuth, contactController.getAll);
router.put('/:id/read', adminAuth, contactController.markAsRead);
router.delete('/:id', adminAuth, contactController.delete);

module.exports = router;
