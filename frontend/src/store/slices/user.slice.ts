import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getErrorMessage } from "../../services/helper/global.helper";
import { ENDPOINT } from "../../services/helper/endPoint";
import Cookies from "js-cookie";
import axiosInstance from "../../lib/axiosInstance";
const role = Cookies.get("role") ?? null;
const accessToken = Cookies.get("accessToken") ?? null;
const user = Cookies.get("user")
  ? JSON.parse(Cookies.get("user") as string)
  : null;

const initialState = {
  loading: {
    login: false,
    register: false,
    logout: false,
    allUser: false,
    deleteUser: false,
  },
  error: {
    login: null,
    logout: null,
    register: null,
    allUser: null,
    deleteUser: null,
  },
  allUsers: [],
  user: user,
  role: role,
  accessToken: accessToken,
};

export const login = createAsyncThunk(
  "user/login",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(ENDPOINT.login, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

export const signup = createAsyncThunk(
  "user/register",
  async ( {data}, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(ENDPOINT.register, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

export const getAllUser = createAsyncThunk(
  "user/getalluser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(ENDPOINT.user);
      return response.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

export const logout = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(ENDPOINT.logout);
      return response.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

export const deleteUserByAdmin = createAsyncThunk(
  "user/deleteByAdmin",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`${ENDPOINT.user}/${id}`);
      return {
        id: id,
        data: response.data,
      };
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

const userSlice = createSlice({
  name: "user/slice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading.login = true;
        state.error.login = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading.login = false;
        state.error.login = null;
        console.log("action from login builder", action.payload);
        state.user = action.payload.data;
        state.accessToken = action.payload.acessToken;
        state.role = action.payload.data.role;
        Cookies.set("role", action.payload.data.role, {
          expires: 30 ,
        });
        Cookies.set("user", JSON.stringify(action.payload.data), {
          expires: 30,
        });
        Cookies.set("accessToken", action.payload.accessToken, {
          expires: 7,
        });
        Cookies.set("refreshToken", action.payload.refreshToken, {
          expires: 30,
        });
      })
      .addCase(login.rejected, (state, action) => {
        state.loading.login = false;
        state.error.login =
          (action.payload as string) || "something went wrong";
      })
      .addCase(signup.pending, (state) => {
        state.loading.register = true;
        state.error.register = null;
      })
      .addCase(signup.fulfilled, (state) => {
        state.loading.register = false;
        state.error.register = null;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading.register = false;
        state.error.register =
          (action.payload as string) || "something went wrong";
      })
      .addCase(getAllUser.pending, (state) => {
        state.loading.allUser = true;
        state.error.allUser = null;
      })
      .addCase(getAllUser.fulfilled, (state, action) => {
        state.loading.allUser = false;
        state.error.allUser = null;
        console.log("all users", action.payload.data);
        state.allUsers = action.payload.data;
      })
      .addCase(getAllUser.rejected, (state, action) => {
        state.loading.allUser = false;
        state.error.allUser =
          (action.payload as string) || "something went wrong";
      })
      .addCase(logout.pending, (state) => {
        state.loading.logout = true;
        state.error.logout = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading.logout = false;
        state.error.logout = null;
        state.role = null;
        state.user = null;
        state.accessToken = null;
        Cookies.remove("role")
        Cookies.remove("user")
        Cookies.remove("accessToken")
        Cookies.remove("refreshToken")
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading.logout = false;
        state.error.logout =
          (action.payload as string) || "something went wrong";
      })
      .addCase(deleteUserByAdmin.pending, (state) => {
        state.error.deleteUser = null;
        state.loading.deleteUser = true;
      })
      .addCase(deleteUserByAdmin.fulfilled, (state, action) => {
        state.error.deleteUser = null;
        state.loading.deleteUser = false;
        state.allUsers = state.allUsers.filter(
          (user) => user._id !== action.payload.id,
        );
      })
      .addCase(deleteUserByAdmin.rejected, (state, action) => {
        state.loading.deleteUser = false;
        state.error.deleteUser =
          (action.payload as string) || "something went wrong";
      });
  },
});

export default userSlice.reducer;
