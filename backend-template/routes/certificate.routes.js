const express = require('express');
const router = express.Router();
const certificateController = require('../controllers/certificate.controller');
const { adminAuth } = require('../middlewares/auth.middleware');

// Public routes
router.get('/', certificateController.getAll);
router.get('/:id', certificateController.getById);

// Admin-only routes
router.post('/', adminAuth, certificateController.create);
router.put('/:id', adminAuth, certificateController.update);
router.delete('/:id', adminAuth, certificateController.delete);

module.exports = router;
