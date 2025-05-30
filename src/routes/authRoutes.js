const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

// Register a new user
router.post('/register', authController.register);

// Login a user
router.post('/login', authController.login);

// Get current authenticated user
router.get('/me', authController.getCurrentUser);

module.exports = router;