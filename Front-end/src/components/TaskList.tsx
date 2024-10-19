import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "../redux/tasksSlice";
import { RootState, AppDispatch } from "../redux/store";

const TaskList = () => {
  const dispatch: AppDispatch = useDispatch(); // Use AppDispatch type
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const users = useSelector((state: RootState) => state.users.users);
  const [selectedUserId, setSelectedUserId] = useState("");

  useEffect(() => {
    dispatch(fetchTasks(selectedUserId));
  }, [dispatch, selectedUserId]);

  return (
    <div className="p-4 bg-gray-100 rounded shadow">
      <h2 className="text-lg font-semibold mb-4">Tasks</h2>

      <label htmlFor="userSelect" className="block mb-2">
        Filter by User
      </label>
      <select
        id="userSelect"
        value={selectedUserId}
        onChange={(e) => setSelectedUserId(e.target.value)}
        className="w-full p-2 rounded mb-4"
      >
        <option value="">All Users</option>
        {users.map((user) => (
          <option key={user.name} value={user._id}>
            {user.name}
          </option>
        ))}
      </select>

      <ul>
        {tasks.map((task) => (
          <li key={task.id} className="p-2 bg-white mb-2 rounded shadow">
            <p>
              <strong>Description:</strong> {task.description}
            </p>
            <p>
              <strong>User:</strong>
              {users.find((user) => user._id === task.user)?.name}
            </p>
            <p>
              <strong>From:</strong> {new Date(task.fromTime).toLocaleString()}
            </p>
            <p>
              <strong>To:</strong> {new Date(task.toTime).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
