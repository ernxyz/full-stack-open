import { useState } from "react";

import {
  showNotification,
  useNotificationDispatch,
} from "./NotificationContextProvider";
import { useLoginDispatch, logIn } from "./LoginContextProvider";

import {
  Box,
  Button,
  TextField
} from "@mui/material"

const LoginForm = ({ closeDialog }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loginDispatch = useLoginDispatch();
  const dispatchNotification = useNotificationDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userCredentials = {
      username,
      password,
    };

    const notificationObj = {
      message: `Hi ${username}`,
      color: "purple",
    };

    const result = await logIn(loginDispatch, userCredentials)

    if (result === true ) {
      showNotification(dispatchNotification, notificationObj);
    } else {
      showNotification(dispatchNotification, { message: result, color: "red" });
    }

    setUsername("");
    setPassword("");
    closeDialog();
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <h2>Log in</h2>
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <TextField
            variant="standard"
            label="Username"
            id="username"
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            data-testid="username"
          />
          <TextField
            variant="standard"
            label="Password"
            id="password"
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            data-testid="password"
          />
          <Button variant="contained" type="submit">Log in</Button>
        </Box>
      </form>
    </Box >
  );
};

export default LoginForm;
