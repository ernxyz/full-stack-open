import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login";
import blogService from "../services/blogs";
import { showNotification } from "./notificationReducer";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUser(state, action) {
      console.log(action.payload);
      return action.payload;
    },
    removeUser(state, action) {
      return null;
    },
    setLoggedUser(state, action) {
      return action.payload;
    },
  },
});

export const { setUser, removeUser, setLoggedUser } = userSlice.actions;

export const logIn = (credentials) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(credentials);
      dispatch(setUser(user));
      window.localStorage.setItem("loggedBlogUser", JSON.stringify(user));
      await blogService.setToken(user.token);
      dispatch(
        showNotification({
          message: `Hi ${user.name}!`,
          color: "purple",
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

export const logOut = () => {
  return async (dispatch) => {
    window.localStorage.removeItem("loggedBlogUser");
    dispatch(removeUser());
    dispatch(
      showNotification({
        message: "Bye",
        color: "purple",
      }),
    );
  };
};

export const setWhenLoggedIn = (loggedUser) => {
  return async (dispatch) => {
    await blogService.setToken(loggedUser.token);
    dispatch(setLoggedUser(loggedUser));
    dispatch(
      showNotification({
        message: `Hi ${loggedUser.name}!`,
        color: "purple",
      }),
    );
  };
};

export default userSlice.reducer;
