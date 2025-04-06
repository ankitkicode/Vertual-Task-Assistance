  const Task = require('../models/Tasks');
  const { success, error, notFound, serverError } = require('../constants/responseFun');
const { convertIndianToUTC } = require('../utils/DateFun');

  // Create Task
  exports.createTask = async (req, res) => {
    try {
      const { title, description, dueDate, priority, category } = req.body;
      // console.log(req.body);

      const task = await Task.create({
        title,
        description,
        dueDate : convertIndianToUTC(dueDate),
        priority,
        category,
        user: req.user._id,
      });
      return success(res, "Task created successfully", task);
    } catch (err) {
      return serverError(res, err.message);
    }
  };

  // Get My Tasks
  exports.getMyTasks = async (req, res) => {
    try {
      const tasks = await Task.find({ user: req.user._id }).sort({ dueDate: 1 });
      return success(res, "Tasks fetched successfully", tasks);
    } catch (err) {
      return serverError(res, err.message);
    }
  };

  // Update Task
  exports.updateTask = async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description, dueDate, priority, category } = req.body;
      
      const task = await Task.findOneAndUpdate(
        { _id: id, user: req.user._id },
        {
          title,
          description,
          dueDate : convertIndianToUTC(dueDate),
          priority,
          category,
        },
        { new: true }
      );
      if (!task) return notFound(res, "Task not found");
      return success(res, "Task updated successfully", task);
    } catch (err) {
      return serverError(res, err.message);
    }
  };

  // Delete Task
  exports.deleteTask = async (req, res) => {
    try {
      const { id } = req.params;
      const task = await Task.findOneAndDelete({ _id: id, user: req.user._id });
      if (!task) return notFound(res, "Task not found");
      return success(res, "Task deleted successfully" , task);
    } catch (err) {
      return serverError(res, err.message);
    }
  };


  exports.getTaskByDate = async (req, res) => {
    try {
      let date = req.params.date || req.query.date;
      const userId = req.user._id;
  
      let dueDate, endOfDay;
  
      if (!date) {
        // Agar date nahi mili, to aaj ka date lo
        const today = new Date();
        today.setUTCHours(0, 0, 0, 0);
        dueDate = today;
  
        endOfDay = new Date(today);
        endOfDay.setUTCHours(23, 59, 59, 999);
      } else {
        dueDate = convertIndianToUTC(date);
        endOfDay = new Date(dueDate);
        endOfDay.setUTCHours(23, 59, 59, 999);
      }
  
      const tasks = await Task.find({
        user: userId,
        dueDate: { $gte: dueDate, $lte: endOfDay }
      });
  
      return success(res, "Tasks fetched successfully", tasks);
  
    } catch (err) {
      console.error(err);
      return serverError(res, "Failed to fetch tasks for the date");
    }
  };
  

  exports.getPastWeekReport = async (req, res) => {
    try {
      const userId = req.user._id;
  
      const today = new Date();
      today.setUTCHours(0, 0, 0, 0); 
      const last7Days = new Date(today);
      last7Days.setUTCDate(today.getUTCDate() - 7); // 6 din pehle + aaj
  
      const tasks = await Task.find({
        user: userId,
        dueDate: { $gte: last7Days, $lt: today }
      }).sort({ dueDate: -1 }); 
  
      return success(res, "Past 7 days report fetched successfully", tasks);
  
    } catch (err) {
      console.error(err);
      return serverError(res, "Failed to fetch past weekly report");
    }
  };
  exports.getYesterdayTask = async (req, res) => {
    try {
      const userId = req.user._id;
  
      const today = new Date();
      today.setUTCHours(0, 0, 0, 0); 
      const last7Days = new Date(today);
      last7Days.setUTCDate(today.getUTCDate() - 1); // 1 din pehle + aaj
  
      const tasks = await Task.find({
        user: userId,
        dueDate: { $gte: last7Days, $lt: today }
      }).sort({ dueDate: -1 }); // Recent tasks first
  
      return success(res, "Past 1 days report fetched successfully", tasks);
  
    } catch (err) {
      console.error(err);
      return serverError(res, "Failed to fetch past weekly report");
    }
  };
  

  exports.getPastMonthReport = async (req, res) => {
    try {
      const userId = req.user._id;
  
      const today = new Date();
      today.setUTCHours(0, 0, 0, 0);
  
      const last30Days = new Date(today);
      last30Days.setUTCDate(today.getUTCDate() - 29); // 29 days before + today
  
      const tasks = await Task.find({
        user: userId,
        dueDate: { $gte: last30Days, $lt: today }
      }).sort({ dueDate: -1 }); // Latest pehle
  
      console.log(tasks.length);
      return success(res, "Past 30 days report fetched successfully", tasks);
  
    } catch (err) {
      console.error(err);
      return serverError(res, "Failed to fetch past monthly report");
    }
  };
  

