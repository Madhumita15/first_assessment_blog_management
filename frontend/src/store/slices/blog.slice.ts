import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getErrorMessage } from "../../services/helper/global.helper";
import axiosInstance from "../../lib/axiosInstance";
import { ENDPOINT } from "../../services/helper/endPoint";

const initialState = {
  loading: {
    create: false,
    getBlog: false,
    blogUpdate: false,
    blogDelete: false,
    blogById: false,
    myblog: false,
  },
  error: {
    create: null,
    getBlog: null,
    blogUpdate: null,
    blogDelete: null,
    blogById: null,
    myblog: null,
  },
  allBlogs: [],
  BlogById: null,
  myBlog: [],
};

export const createBlog = createAsyncThunk(
  "blog/create",
  async ({ data }, { rejectWithValue }) => {
    try {
      console.log("data from creteblog", data);
      const response = await axiosInstance.post(`${ENDPOINT.blog}`, data, {
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

export const getAllBlog = createAsyncThunk(
  "blog/get",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`${ENDPOINT.blog}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

export const getMyBlog = createAsyncThunk(
  "blog/getmyblog",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`${ENDPOINT.myblog}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

export const getBlogId = createAsyncThunk(
  "blog/getBlogId",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`${ENDPOINT.blog}/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

export const updateBlog = createAsyncThunk(
  "blog/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`${ENDPOINT.blog}/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return {
        id: id,
        data: response.data,
      };
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

export const deleteBlog = createAsyncThunk(
  "blog/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`${ENDPOINT.blog}/${id}`);
      return {
        id: id,
        data: response.data,
      };
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

const blogSlice = createSlice({
  name: "blog/slice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createBlog.pending, (state) => {
        state.loading.create = true;
        state.error.create = null;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.loading.create = false;
        state.error.create = null;
        state.allBlogs.unshift(action.payload.data);
        state.myBlog.unshift(action.payload.data);
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.loading.create = false;
        state.error.create =
          (action.payload as string) || "something went wrong";
      })
      .addCase(getAllBlog.pending, (state) => {
        state.loading.getBlog = true;
        state.error.getBlog = null;
      })
      .addCase(getAllBlog.fulfilled, (state, action) => {
        state.loading.getBlog = false;
        state.error.getBlog = null;
        state.allBlogs = action.payload.data;
      })
      .addCase(getAllBlog.rejected, (state, action) => {
        state.loading.getBlog = false;
        state.error.getBlog =
          (action.payload as string) || "something went wrong";
      })
      .addCase(getMyBlog.pending, (state) => {
        state.loading.myblog = true;
        state.error.myblog = null;
      })
      .addCase(getMyBlog.fulfilled, (state, action) => {
        state.loading.myblog = false;
        state.error.myblog = null;
        state.myBlog = action.payload.data;
      })
      .addCase(getMyBlog.rejected, (state, action) => {
        state.loading.myblog = false;
        state.error.myblog =
          (action.payload as string) || "something went wrong";
      })
      .addCase(getBlogId.pending, (state) => {
        state.loading.blogById = true;
        state.error.blogById = null;
      })
      .addCase(getBlogId.fulfilled, (state, action) => {
        state.loading.blogById = false;
        state.error.blogById = null;
        state.BlogById = action.payload.data;
      })
      .addCase(getBlogId.rejected, (state, action) => {
        state.loading.blogById = false;
        state.error.blogById =
          (action.payload as string) || "something went wrong";
      })
      .addCase(updateBlog.pending, (state) => {
        state.loading.blogUpdate = true;
        state.error.blogUpdate = null;
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        state.loading.blogUpdate = false;
        state.error.blogUpdate = null;
        state.allBlogs = state.allBlogs.map((blog) =>
          blog._id === action.payload.id ? action.payload.data : blog,
        );
        state.myBlog = state.myBlog.map((blog) =>
          blog._id === action.payload.id ? action.payload.data : blog,
        );
      })
      .addCase(updateBlog.rejected, (state, action) => {
        state.loading.blogUpdate = false;
        state.error.blogUpdate =
          (action.payload as string) || "something went wrong";
      })
      .addCase(deleteBlog.pending, (state) => {
        state.loading.blogDelete = true;
        state.error.blogDelete = null;
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.loading.blogDelete = false;
        state.error.blogDelete = null;
        state.allBlogs = state.allBlogs.filter(
          (blog) => blog._id !== action.payload.id,
        );
        state.myBlog = state.myBlog.filter(
          (blog) => blog._id !== action.payload.id,
        );
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        state.loading.blogDelete = false;
        state.error.blogDelete =
          (action.payload as string) || "something went wrong";
      });
  },
});

export default blogSlice.reducer;
