// routes/chatbotRoutes.js
const express = require('express');
const router = express.Router();
const chatbotController = require('../controllers/chatbotController');
const authMiddleware = require('../middlewares/isAuth');

// Get today's tasks
router.get('/today-tasks', authMiddleware, chatbotController.getTodayTasks);

// Mark as complete or skip
router.post('/task-action', authMiddleware, chatbotController.markTaskAction);

module.exports = router;
