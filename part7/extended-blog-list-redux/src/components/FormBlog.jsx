import React, { useState } from "react";
import PropTypes from "prop-types";

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
    <form onSubmit={formSubmit}>
      <div style={styles.container}>
        <label htmlFor="title">Title:</label>
        <input
          id="title"
          value={title}
          type="text"
          minLength="3"
          placeholder="what's the title of your blog?"
          required
          onChange={({ target }) => setTitle(target.value)}
        />
        <br />
        <label htmlFor="url">Url:</label>
        <input
          id="url"
          type="text"
          value={url}
          placeholder="what's the URL of your blog?"
          required
          minLength="4"
          onChange={({ target }) => setUrl(target.value)}
        />
        <br />
        <button type="submit">Add</button>
      </div>
    </form>
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
