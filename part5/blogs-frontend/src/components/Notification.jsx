import React from "react"
import PropTypes from "prop-types"

const Notification = ({ notification }) => {
  if (!notification) {
    return
  }

  const styles = {
    "container": {
      "position": "fixed",
      "color": "black",
      "right": "15px",
      "bottom": "15px",
      "width": "200px",
      "textAlign": "center",
      "backgroundColor": `${notification.color}`,
    },
    "title": {
      "fontWeight": "bold",
      "display": "inline.block",
    },
  }

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>{notification.message}</h3>
    </div>
  )
}

Notification.propTypes = {
  notification: PropTypes.object,
}

export default Notification