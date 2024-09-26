import {
  useLoginDispatch,
  useLoginValue,
  logOut,
} from "./LoginContextProvider";
import { showNotification, useNotificationDispatch } from "./NotificationContextProvider";

import { Button } from "@mui/material";
import { Logout } from "@mui/icons-material";

const Greeting = () => {
  const loginDispatch = useLoginDispatch();
  const dispacthNotification = useNotificationDispatch()

  const user = useLoginValue();

  const logout = () => {
    logOut(loginDispatch);

    const notificationObj = {
      message: "Bye",
      color: "purple",
    }

    showNotification(dispacthNotification, notificationObj)
  };

  if (!user) {
    return;
  }

  return (
    <>
      Hey welcome, {user.name} <Button size="small" onClick={logout}><Logout sx={{ color: "white" }}/></Button>
    </>
  );
};

export default Greeting;
