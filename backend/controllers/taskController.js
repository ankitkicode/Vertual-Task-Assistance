  const Task = require('../models/Tasks');
  const { success, error, notFound, serverError } = require('../constants/responseFun');
const { convertIndianToUTC } = require('../utils/DateFun');

  // Create Task
  exports.createTask = async (req, res) => {
    try {
      const { title, description, dueDate, priority, category } = req.body;
      console.log(req.body);

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
      const { title, description, dueDate, priority, category , status } = req.body;
      
      const task = await Task.findOneAndUpdate(
        { _id: id, user: req.user._id },
        {
          title,
          description,
          dueDate : convertIndianToUTC(dueDate),
          priority,
          category,
          status
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
      console.log(date);
      let dueDate, endOfDay;
  
      if (!date) {
        // Agar date nahi mili, to aaj ka date lo
        const indianTimeNow = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
    const today = new Date(indianTimeNow);
    today.setHours(0, 0, 0, 0);  // local set karna hai
    dueDate = today;

    endOfDay = new Date(today);
    endOfDay.setHours(23, 59, 59, 999);
      } else {
        dueDate = convertIndianToUTC(date);
        endOfDay = new Date(dueDate);
        endOfDay.setUTCHours(23, 59, 59, 999);
      }
  
      const tasks = await Task.find({
        user: userId,
        dueDate: { $gte: dueDate,  }
      }).sort({ dueDate: 1 });
  
      return success(res, "Tasks fetched successfully ", tasks);
  
    } catch (err) {
      console.error(err);
      return serverError(res, "Failed to fetch tasks for the date");
    }
  };
  

  exports.getPastWeekReport = async (req, res) => {
    try {
      const userId = req.user._id;
  
      const now = new Date();
      const indiaOffset = 5.5 * 60 * 60 * 1000; // 5 hours 30 minutes in ms
  
      const indiaNow = new Date(now.getTime() + indiaOffset);
  
      // Today's start at 00:00 IST
      const todayIndia = new Date(indiaNow);
      todayIndia.setHours(0, 0, 0, 0);
  
      // 7 days back from today in IST
      const last7DaysIndia = new Date(todayIndia);
      last7DaysIndia.setDate(todayIndia.getDate() - 6); // last 6 days + today
  
      // Convert both to UTC
      const last7DaysStartUTC = new Date(last7DaysIndia.getTime() - indiaOffset);
      const todayStartUTC = new Date(todayIndia.getTime() - indiaOffset);
  
      const tasks = await Task.find({
        user: userId,
        dueDate: { $gte: last7DaysStartUTC, $lt: todayStartUTC }
      }).sort({ dueDate: -1 }); 
      return success(res, "Past 7 days (IST) report fetched successfully", tasks);
  
    } catch (err) {
      console.error(err);
      return serverError(res, "Failed to fetch past weekly report");
    }
  };
  
  exports.getYesterdayTask = async (req, res) => {
    try {
      const userId = req.user._id;
  
      // Get current time in IST
      const now = new Date();
      const indiaOffset = 5.5 * 60 * 60 * 1000; // 5 hours 30 minutes in ms
  
      const indiaNow = new Date(now.getTime() + indiaOffset);
  
      // Set today's date at 00:00 IST
      const todayIndia = new Date(indiaNow);
      todayIndia.setHours(0, 0, 0, 0);
  
      // Calculate yesterday's start and today's start in UTC
      const yesterdayIndia = new Date(todayIndia);
      yesterdayIndia.setDate(todayIndia.getDate() - 1);
  
      const yesterdayStartUTC = new Date(yesterdayIndia.getTime() - indiaOffset);
      const todayStartUTC = new Date(todayIndia.getTime() - indiaOffset);
  
      const tasks = await Task.find({
        user: userId,
        dueDate: { $gte: yesterdayStartUTC, $lt: todayStartUTC }
      }).sort({ dueDate: -1 }); // Recent tasks first
  
      return success(res, "Yesterday's tasks (IST) fetched successfully", tasks);
  
    } catch (err) {
      console.error(err);
      return serverError(res, "Failed to fetch yesterday's tasks");
    }
  };
  
  
  exports.getPastMonthReport = async (req, res) => {
    try {
      const userId = req.user._id;
  
      const now = new Date();
      const indiaOffset = 5.5 * 60 * 60 * 1000; // 5 hours 30 minutes in ms
  
      const indiaNow = new Date(now.getTime() + indiaOffset);
  
      // Today's start at 00:00 IST
      const todayIndia = new Date(indiaNow);
      todayIndia.setHours(0, 0, 0, 0);
  
      // 30 days back from today in IST
      const last30DaysIndia = new Date(todayIndia);
      last30DaysIndia.setDate(todayIndia.getDate() - 29); // 29 din pehle + aaj
  
      // Convert both to UTC
      const last30DaysStartUTC = new Date(last30DaysIndia.getTime() - indiaOffset);
      const todayStartUTC = new Date(todayIndia.getTime() - indiaOffset);
  
      const tasks = await Task.find({
        user: userId,
        dueDate: { $gte: last30DaysStartUTC, $lt: todayStartUTC }
      }).sort({ dueDate: -1 }); // Latest pehle
  
      console.log(tasks.length);
      return success(res, "Past 30 days (IST) report fetched successfully", tasks);
  
    } catch (err) {
      console.error(err);
      return serverError(res, "Failed to fetch past monthly report");
    }
  };
  
  

