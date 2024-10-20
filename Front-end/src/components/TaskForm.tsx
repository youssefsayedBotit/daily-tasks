import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../redux/usersSlice";
import { addTask } from "../redux/tasksSlice";
import { RootState, AppDispatch } from "../redux/store";
import axios from "axios";

const TaskForm = () => {
  const users = useSelector((state: RootState) => state.users.users);
  const [userId, setUserId] = useState("");
  const [description, setDescription] = useState("");
  const [fromTime, setFromTime] = useState("");
  const [toTime, setToTime] = useState("");
  const [error, setError] = useState("");
  const dispatch: AppDispatch = useDispatch(); // Use AppDispatch type

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  // Validation function
  const validateTask = (from: Date, to: Date) => {
    const duration = (to.getTime() - from.getTime()) / (1000 * 60 * 60); // convert ms to hours
    if (duration > 8) {
      return "Task cannot exceed 8 hours.";
    }
    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const from = new Date(fromTime);
    const to = new Date(toTime);

    // Perform validation
    const validationError = validateTask(from, to);
    if (validationError) {
      setError(validationError);
      return;
    }

    // Reset error
    setError("");

    // Call backend to create task
    try {
      const newTask = { userId, description, fromTime, toTime };
      const response = await axios.post(
        "http://ec2-3-121-114-35.eu-central-1.compute.amazonaws.com:5000/api/tasks",
        newTask
      ); // Adjust the URL to your backend
      dispatch(addTask(response.data)); // Assuming addTask adds the task to Redux
      // Reset form fields
      setDescription("");
      setFromTime("");
      setToTime("");
    } catch (error) {
      console.error("Failed to create task", error);
      setError("Failed to create task");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow mb-4">
      <label htmlFor="userId" className="block mb-2">
        Select User
      </label>
      <select
        id="userId"
        value={userId}
        onChange={(e) => {
          setUserId(e.target.value);
        }}
        className="w-full p-2 rounded mb-2"
        required
      >
        <option value="" disabled>
          Select User
        </option>
        {users.map((user) => (
          <option key={user.name} value={user._id}>
            {user.name}
          </option>
        ))}
      </select>

      <label htmlFor="description" className="block mb-2">
        Task Description
      </label>
      <input
        type="text"
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Task Description"
        className="w-full p-2 rounded mb-2"
        required
      />

      <label htmlFor="fromTime" className="block mb-2">
        From Time
      </label>
      <input
        type="datetime-local"
        id="fromTime"
        value={fromTime}
        onChange={(e) => setFromTime(e.target.value)}
        className="w-full p-2 rounded mb-2"
        required
      />

      <label htmlFor="toTime" className="block mb-2">
        To Time
      </label>
      <input
        type="datetime-local"
        id="toTime"
        value={toTime}
        onChange={(e) => setToTime(e.target.value)}
        className="w-full p-2 rounded mb-2"
        required
      />

      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
