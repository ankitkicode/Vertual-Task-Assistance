const express = require('express');
const router = express.Router();

const { getProfile, updateProfile, deleteProfile } = require('../controllers/userController');
const isAuth  = require('../middlewares/isAuth');

router.get('/profile', isAuth, getProfile);
router.put('/updateProfile', isAuth, updateProfile);

module.exports = router;