import React from "react";

const Notification = ({ message }) => {
  if (message.content === null){
    return null;
  }

  const style =  {
    backgroundColor: message.type == "success" ? "darkseagreen" : "tomato",
    border: message.type == "success" ? "2px solid chartreuse" : "2px solid red",
    color: "white",
    padding: 10,
    display: "inline-block",
  
    position: "fixed",
    top: 15,
    left: "50%"
  }

  return (
    <div style={style}>
      {message.content}
    </div>
  )
}

export default Notification