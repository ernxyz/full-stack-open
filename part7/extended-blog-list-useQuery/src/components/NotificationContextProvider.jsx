import { createContext, useReducer, useContext } from "react";

const notificationReducer = (state, action) => {
  switch (action.type) {
  case "SET":
    return action.payload;
  case "RESET":
    return "";
  default:
    return state;
  }
};

const NotificationContext = createContext();

const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    "",
  );

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext);
  return notificationAndDispatch[0];
};

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext);
  return notificationAndDispatch[1];
};

const createNotificationAction = (payload) => ({
  type: "SET",
  payload,
});

const clearNotificationAction = () => ({
  type: "RESET",
});

export const showNotification = (dispatch, notificationObj) => {
  dispatch(
    createNotificationAction({
      message: notificationObj.message,
      color: notificationObj.color,
    }),
  );

  setTimeout(() => {
    dispatch(clearNotificationAction());
  }, 3000);
};

export default NotificationContextProvider;
