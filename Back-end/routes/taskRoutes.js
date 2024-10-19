const express = require('express');
const { createTask, getTasksByUser, updateTask, deleteTask } = require('../controllers/taskController');
const router = express.Router();

router.post('/tasks', createTask);
router.get('/tasks/user/:userId', getTasksByUser);  // Updated to get tasks by user
router.put('/tasks/:id', updateTask);
router.delete('/tasks/:id', deleteTask);

module.exports = router;
