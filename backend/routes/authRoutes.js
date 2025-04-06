const express = require('express');
const router = express.Router();
const { registerUser, loginUser, verifyOTP, checkAuth } = require('../controllers/authController');

// Register route
router.post('/register', registerUser);

// Verify OTP route
router.post('/verify-otp', verifyOTP);

// Login route
router.post('/login', loginUser);
router.get('/check-auth', checkAuth);

module.exports = router;
