import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { createUser } from "../redux/usersSlice";
import { RootState, AppDispatch } from "../redux/store";

const UserForm = () => {
  const dispatch: AppDispatch = useDispatch(); // Use AppDispatch type
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const response = await axios.get("http://ec2-3-121-114-35.eu-central-1.compute.amazonaws.com/api/api/users");
    const id = response.data.length + 1;
    dispatch(
      createUser({
        id,
        name,
        email,
        _id: undefined,
      })
    );
    setName("");
    setEmail("");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow mb-4">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="User Name"
        className="w-full p-2 rounded mb-2"
        required
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="User Email"
        className="w-full p-2 rounded mb-2"
        required
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Add User
      </button>
    </form>
  );
};

export default UserForm;
