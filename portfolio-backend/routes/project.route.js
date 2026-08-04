const express = require('express');
const router = express.Router();

const projectController = require('../controllers/project.controller');
const protect = require('../middleware/auth.middleware');

router.get('/', projectController.getAllProjects);
router.get('/:id', projectController.getProjectById);

router.post('/', protect, projectController.addProject);
router.put('/:id', protect, projectController.updateProject);
router.delete('/:id', protect, projectController.deleteProject);

module.exports = router;