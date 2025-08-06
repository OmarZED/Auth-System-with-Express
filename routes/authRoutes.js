const express = require('express');
const router = express.Router();
const { register, login, verifyToken, updateProfile, getProfile } = require('../controllers/authController');

// Test route to verify router is working
router.get('/test', (req, res) => {
  res.json({ message: 'Auth router is working!' });
});

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes (require JWT token)
router.get('/profile', verifyToken, getProfile);
router.put('/profile', verifyToken, updateProfile);

module.exports = router;