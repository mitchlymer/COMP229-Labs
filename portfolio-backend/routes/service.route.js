const express = require('express');
const router = express.Router();

const serviceController = require('../controllers/service.controller');
const protect = require('../middleware/auth.middleware');

router.get('/', serviceController.getAllServices);
router.get('/:id', serviceController.getServiceById);

router.post('/', protect, serviceController.addService);
router.put('/:id', protect, serviceController.updateService);
router.delete('/:id', protect, serviceController.deleteService);

module.exports = router;