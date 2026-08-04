const express = require('express');
const router = express.Router();

const referenceController = require('../controllers/reference.controller');
const protect = require('../middleware/auth.middleware');

// Public read routes
router.get('/', referenceController.getAllReferences);
router.get('/:id', referenceController.getReferenceById);

// Protected admin write routes
router.post('/', protect, referenceController.addReference);
router.put('/:id', protect, referenceController.updateReference);
router.delete('/:id', protect, referenceController.deleteReference);

module.exports = router;