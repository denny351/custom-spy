import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../api";
import { UserCredentials } from "../../interfaces/User";

interface UserState {
  userId: number | null;
}

const initialState: UserState = {
  userId: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser: (state) => {
      localStorage.removeItem("token");
      state.userId = null;
    },
    setUserData: (state, action) => {
      const { token, userId } = action.payload;
      localStorage.setItem("token", token);
      state.userId = userId;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        userSlice.caseReducers.setUserData(state, action);
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        userSlice.caseReducers.setUserData(state, action);
      })
      .addCase(getUserId.fulfilled, (state, action) => {
        state.userId = action.payload.userId;
      });
  },
});

export const registerUser = createAsyncThunk("user/register", async (authData: UserCredentials) => {
  const response = await API.post("/users/register", authData);
  return response.data;
});

export const loginUser = createAsyncThunk("user/login", async (authData: UserCredentials) => {
  const response = await API.post("/users/login", authData);
  return response.data;
});

export const getUserId = createAsyncThunk("user/getUserId", async () => {
  const response = await API.get("/users");
  return response.data;
});

export const { logoutUser, setUserData } = userSlice.actions;

export default userSlice.reducer;
