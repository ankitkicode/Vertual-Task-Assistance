const Task = require('../models/Tasks');
const { success, error } = require('../constants/responseFun');

// Get Today's Tasks & Suggest Next Task
exports.getTodayTasks = async (req, res) => {
    try {
        const userId = req.user._id;

        // Aaj ka date India timezone ke hisaab se nikaalo
        const now = new Date();
        const indiaOffset = 5.5 * 60 * 60 * 1000; // IST offset in milliseconds
        const indiaNow = new Date(now.getTime() + indiaOffset);

        // Aaj ka date start (00:00) aur kal ka start (00:00)
        const indiaToday = new Date(indiaNow.getFullYear(), indiaNow.getMonth(), indiaNow.getDate());
        const indiaTomorrow = new Date(indiaToday);
        indiaTomorrow.setDate(indiaToday.getDate() + 1);

        // Ab UTC mein convert karo database query ke liye
        const todayUTC = new Date(indiaToday.getTime() - indiaOffset);
        const tomorrowUTC = new Date(indiaTomorrow.getTime() - indiaOffset);

        console.log('India Today:', indiaToday);
        console.log('Today UTC:', todayUTC);

        // Database se aaj ke saare tasks nikaalo
        const tasks = await Task.find({
            user: userId,
            dueDate: { $gte: todayUTC, $lt: tomorrowUTC },
            status: 'Pending' // sirf pending tasks
        }).sort({ 
            priority: 1,   
            dueDate: 1     
        });

        if (tasks.length === 0) {
            return success(res, "No tasks found for today", { tasks: [] });
        }

        // High priority task sabse pehle
        let suggestedTask = tasks.find(t => t.priority === 'High') ||
                            tasks.find(t => t.priority === 'Medium') ||
                            tasks.find(t => t.priority === 'Low') ||
                            tasks[0]; 

        return success(res, "Today's tasks retrieved", { tasks, suggestedTask });

    } catch (err) {
        console.error(err);
        return error(res, "Failed to fetch today's tasks");
    }
};


exports.markTaskAction = async (req, res) => {
    try {
        const { taskId, action } = req.body; // frontend se ye dono aayenge
        const userId = req.user._id;

        // Task find karo
        const task = await Task.findOne({ _id: taskId, user: userId });

        if (!task) {
            return error(res, "Task not found");
        }

        if (action === 'complete') {
            task.status = 'Completed';
            await task.save();
            return success(res, "Task marked as completed", { task });
        } else if  (action === 'progress'){
            task.status = 'Progress';
            await task.save();
            return success(res, "Task marked as in progress", { task });
        } else if (action === 'skip') {
            // Skip action -> find next pending task
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const tomorrow = new Date(today);
            tomorrow.setDate(today.getDate() + 1);

            const tasks = await Task.find({
                user: userId,
                dueDate: { $gte: today, $lt: tomorrow },
                status: 'Pending',
                _id: { $ne: taskId } // except current task
            }).sort({ priority: 1, dueDate: 1 });

            const nextTask = tasks.length > 0 ? tasks[0] : null;

            return success(res, nextTask ? "Next suggested task" : "No more pending tasks", { nextTask });
        } else {
            return error(res, "Invalid action");
        }
    } catch (err) {
        console.error(err);
        return error(res, "Failed to process action");
    }
};
