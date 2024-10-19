import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../redux/usersSlice";
import { RootState, AppDispatch } from "../redux/store";

const UserList = () => {
  const dispatch: AppDispatch = useDispatch(); // Use AppDispatch type
  const users = useSelector((state: RootState) => state.users.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div className="p-4 bg-gray-100 rounded shadow">
      <h2 className="text-lg font-semibold mb-4">Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id} className="p-2 bg-white mb-2 rounded shadow">
            {user.name} ({user.email})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
