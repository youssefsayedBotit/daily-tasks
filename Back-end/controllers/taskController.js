const Task = require("../models/Task");
const User = require("../models/user");

// Create Task
exports.createTask = async (req, res) => {
  try {
    const { userId, description, fromTime, toTime } = req.body;

    const taskDuration =
      (new Date(toTime) - new Date(fromTime)) / (1000 * 60 * 60); // in hours
    if (taskDuration > 8) {
      return res
        .status(400)
        .json({ message: "Task duration exceeds 8 hours." });
    }

    const today = new Date().setHours(0, 0, 0, 0);
    const tasksToday = await Task.find({
      user: userId,
      createdAt: { $gte: today },
    });

    const totalHoursToday = tasksToday.reduce((total, task) => {
      return (
        total +
        (new Date(task.toTime) - new Date(task.fromTime)) / (1000 * 60 * 60)
      );
    }, 0);

    if (totalHoursToday + taskDuration > 8) {
      return res
        .status(400)
        .json({ message: "Total task duration for today exceeds 8 hours." });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const newTask = new Task({ user: userId, description, fromTime, toTime });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Tasks for a Specific User
exports.getTasksByUser = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const tasks = await Task.find({ user: employeeId }).populate(
      "user",
      "name email"
    );
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Task
exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTask = await Task.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Task
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    await Task.findByIdAndDelete(id);
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
