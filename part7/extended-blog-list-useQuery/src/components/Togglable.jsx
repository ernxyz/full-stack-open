import { useState, forwardRef, useImperativeHandle } from "react";
import PropTypes from "prop-types";
import { Button } from "@mui/material";

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false);

  const showWhenVisible = { display: visible ? "" : "none" };
  const hideWhenVisible = { display: visible ? "none" : "" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <>
      <div style={{ ...showWhenVisible, margin: "10px" }} className="togglableContent">
        {props.children}
        <Button variant="outlined" onClick={toggleVisibility}>cancel</Button>
      </div>
      <div style={{ ...hideWhenVisible, margin: "10px" }}>
        <Button variant="outlined" onClick={toggleVisibility}>{props.btnLabel}</Button>
      </div>
    </>
  );
});

Togglable.displayName = "Togglable";

Togglable.propTypes = {
  btnLabel: PropTypes.string.isRequired,
};

export default Togglable;
