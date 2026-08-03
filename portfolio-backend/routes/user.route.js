const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');
const protect = require('../middleware/auth.middleware');

router.post('/signin', userController.signIn);

router.get('/', protect, userController.getAllUsers);
router.get('/:id', protect, userController.getUserById);
router.post('/', protect, userController.addUser);
router.put('/:id', protect, userController.updateUser);
router.delete('/:id', protect, userController.deleteUser);

module.exports = router;