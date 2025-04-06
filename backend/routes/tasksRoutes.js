const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const isAuth = require('../middlewares/isAuth');

// All task routes will need user to be logged in
router.post('/add', isAuth, taskController.createTask);
router.put('/update/:id', isAuth, taskController.updateTask);
router.delete('/delete/:id', isAuth, taskController.deleteTask);
router.get('/', isAuth, taskController.getMyTasks);


// Get tasks by date, today-tasks, yesterday-tasks, weekly-report, monthly-report
router.get('/dayBytask/:date', isAuth, taskController.getTaskByDate);
router.get('/today-tasks', isAuth, taskController.getTaskByDate);
router.get('/yesterday-task', isAuth, taskController.getYesterdayTask);
router.get('/weekly-report', isAuth, taskController.getPastWeekReport);
router.get('/monthly-report', isAuth, taskController.getPastMonthReport);



module.exports = router;
