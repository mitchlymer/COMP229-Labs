const express = require('express');
const router = express.Router();

const serviceController = require('../controllers/service.controller');

router.get('/', serviceController.getAllServices);
router.get('/:id', serviceController.getServiceById);
router.post('/', serviceController.addService);
router.put('/:id', serviceController.updateService);
router.delete('/:id', serviceController.deleteService);

module.exports = router;