import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: {},
  reducers: {
    setNotification(state, action) {
      return {
        message: action.payload.message,
        color: action.payload.color,
      };
    },
    clearNotification(state, action) {
      return {};
    },
  },
});

export const { setNotification, clearNotification } = notificationSlice.actions;

export const showNotification = (notificationObj) => {
  return async (dispatch) => {
    dispatch(setNotification(notificationObj));
    setTimeout(() => {
      dispatch(clearNotification());
    }, 3000);
  };
};

export default notificationSlice.reducer;
