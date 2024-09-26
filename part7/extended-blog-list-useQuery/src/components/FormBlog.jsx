import React, { useState } from "react";
import PropTypes from "prop-types";
import { Box, Button, TextField } from "@mui/material";

const FormBlog = ({ addBlog }) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const formSubmit = (e) => {
    e.preventDefault();

    const blogObj = {
      title,
      url,
    };

    addBlog(blogObj);

    setTitle("");
    setUrl("");
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <form onSubmit={formSubmit} style={{ width: "50%" }}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="title">Title:</label>
          <TextField
            size="small"
            variant="outlined"
            sx={{ backgroundColor: "white", borderRadius: "8px" }}

            id="title"
            value={title}
            type="text"
            minLength="3"
            placeholder="what's the title of your blog?"
            required
            onChange={({ target }) => setTitle(target.value)}
          />
          <label htmlFor="url">Url:</label>
          <TextField
            size="small"
            variant="outlined"
            sx={{ backgroundColor: "white", borderRadius: "8px" }}

            id="url"
            type="text"
            value={url}
            placeholder="what's the URL of your blog?"
            required
            minLength="4"
            onChange={({ target }) => setUrl(target.value)}
          />
          <Button sx={{ widht: "50px" }} variant="contained" type="submit">Add</Button>
        </Box>
      </form>
    </Box>
  );
};

FormBlog.propTypes = {
  addBlog: PropTypes.func.isRequired,
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    width: "300px",
    marginBottom: "30px",
  },
};

export default FormBlog;
