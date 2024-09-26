import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  if (!notification.message) {
    return;
  }

  const styles = {
    container: {
      position: "fixed",
      color: "black",
      right: "15px",
      bottom: "15px",
      width: "200px",
      textAlign: "center",
      backgroundColor: `${notification.color}`,
    },
    title: {
      fontWeight: "bold",
      display: "inline.block",
    },
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>{notification.message}</h3>
    </div>
  );
};

Notification.propTypes = {
  notification: PropTypes.object,
};

export default Notification;
