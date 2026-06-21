const express = require('express');
const router = express.Router();

const referenceController = require('../controllers/reference.controller');

router.get('/', referenceController.getAllReferences);
router.get('/:id', referenceController.getReferenceById);
router.post('/', referenceController.addReference);
router.put('/:id', referenceController.updateReference);
router.delete('/:id', referenceController.deleteReference);

module.exports = router;