import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import { showNotification } from "./notificationReducer";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      const sortedState = orderBlogs(action.payload);
      return sortedState;
    },
    appendBlog(state, action) {
      return [...state, action.payload];
    },
    deleteBlog(state, action) {
      const updatedState = state.filter((blog) => blog.id !== action.payload);
      return updatedState;
    },
    addLike(state, action) {
      const updatedState = state.map((blog) =>
        blog.id === action.payload.id ? action.payload : blog,
      );

      const sortedState = orderBlogs(updatedState);
      return sortedState;
    },
  },
});

export const { setBlogs, appendBlog, deleteBlog, addLike } = blogSlice.actions;

export const intializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    // console.log(blogs)
    dispatch(setBlogs(blogs));
  };
};

export const addNewBlog = (blogObj) => {
  return async (dispatch) => {
    const added = await blogService.addBlog(blogObj);
    dispatch(appendBlog(added));
    dispatch(
      showNotification({
        message: `Blog "${added.title}" was added`,
        color: "lightgreen",
      }),
    );
  };
};

export const removeBlog = (id) => {
  return async (dispatch) => {
    blogService.deleteBlog(id);
    dispatch(deleteBlog(id));
    dispatch(
      showNotification({
        message: "Blog was removed",
        color: "yellow",
      }),
    );
  };
};

export const likeBlog = (blogObj) => {
  return async (dispatch) => {
    try {
      const updated = await blogService.updateBlog(blogObj);
      dispatch(addLike(updated));
      dispatch(
        showNotification({
          message: `1 Like to "${updated.title}" was added`,
          color: "cyan",
        }),
      );
    } catch (e) {
      dispatch(
        showNotification({
          message: "Something went wrong",
          color: "tomato",
        }),
      );
    }
  };
};

export default blogSlice.reducer;

// UTILS

const orderBlogs = (blogs) => {
  return blogs.sort((a, b) => b.likes - a.likes);
};
