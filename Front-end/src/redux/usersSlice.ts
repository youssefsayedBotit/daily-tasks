import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface User {
  _id: string | number | readonly string[] | undefined;
  id: string;
  name: string;
  email: string;
}

interface UserState {
  users: User[];
  status: "idle" | "loading" | "failed";
}

const initialState: UserState = {
  users: [],
  status: "idle",
};

// Async action to fetch users
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await axios.get("http://ec2-3-121-114-35.eu-central-1.compute.amazonaws.com/api/api/users");
  return response.data;
});

// Async action to create user
export const createUser = createAsyncThunk(
  "users/createUser",
  async (user: User) => {
    const response = await axios.post("http://ec2-3-121-114-35.eu-central-1.compute.amazonaws.com/api/api/users", user);
    return response.data;
  }
);

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
      });
  },
});

export default userSlice.reducer;
