import React from "react";
import PropTypes from "prop-types";
import { useNotificationValue } from "./NotificationContextProvider";
import { Alert } from "@mui/material";

const Notification = () => {
  const notification = useNotificationValue();

  if (!notification.message) {
    return;
  }

  const styles = {
    container: {
      position: "fixed",
      color: "black",
      right: "15px",
      bottom: "15px",
      textAlign: "center",
      backgroundColor: `${notification.color}`,
    },
    title: {
      fontWeight: "bold",
      display: "inline.block",
    },
  };

  return (
    <Alert icon={false} style={styles.container}>
      <h3 style={styles.title}>{notification.message}</h3>
    </Alert>
  );
};

Notification.propTypes = {
  notification: PropTypes.object,
};

export default Notification;
