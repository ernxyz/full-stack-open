import { useState } from "react"
import PropTypes from "prop-types"

const Blog = ({ blog, addLike, deleteBlog, user, detailsTest }) => {

  const [details, setDetails] = useState("Details")

  const showDetails = () => {
    const label = details === "Details" ? "Hide" : "Details"

    setDetails(label)
  }

  const handleLike = (blog) => {

    const updatedBlog = {
      id: blog.id,
      title: blog.title,
      url: blog.url,
      likes: blog.likes + 1
    }

    addLike(updatedBlog)
  }

  const handleDelete = (blog) => {
    const message = `Do you want to delete "${blog.title}" by ${blog.author.name}`

    if (window.confirm(message)) {
      deleteBlog(blog.id)
    }
  }

  const blogStyles = {
    container: {
      border: "1px solid black",
      margin: "15px 0",
      width: "500px",
    },
    url: {
      color: "#999",
      margin: 0,
      padding: 0,
    },
    show: {
      display: "",
    },
    hide: {
      display: "none"
    }
  }

  return (
    <div style={blogStyles.container} className="blog">
      <h3 style={blogStyles.title}>
        {blog.title}
        <button onClick={detailsTest || showDetails}>{details}</button>
      </h3>

      <div style={details === "Details" ? blogStyles.hide : blogStyles.show} className="hidenContent">
        <p><a style={blogStyles.url} href={`https://${blog.url}`} target="blank">{blog.url}</a></p>
        <p>{blog.author.name}</p>
        <p>
          Likes: {blog.likes} <button onClick={() => handleLike(blog)}>👍</button>
        </p>
        <p>
          {(user.username === blog.author.username) &&
          <button onClick={() => handleDelete(blog)}>🗑️</button>
          }
        </p>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
}

export default Blog