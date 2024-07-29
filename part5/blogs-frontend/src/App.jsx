import { useState, useEffect, useRef } from "react"
import Blog from "./components/Blog"
import FormBlog from "./components/FormBlog"
import Notification from "./components/Notification"
import Togglable from "./components/Togglable"
import LoginForm from "./components/LoginForm"

import blogService from "./services/blogs"
import loginService from "./services/login"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState(null)
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const blogFormRef = useRef()

  useEffect(() => {
    const userJSON = window.localStorage.getItem("loggedBlogUser")

    if (userJSON) {
      const user = JSON.parse(userJSON)
      setUser(user)
      blogService.setToken(user.token)
    }

    handleNotification("Welcome", "lightgreen")

    blogService.getAll().then(blogs => setBlogs(orderBlogs(blogs))
    )

  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem("loggedBlogUser", JSON.stringify(user))

      blogService.setToken(user.token)
      setUser(user)
      setUsername("")
      setPassword("")

    } catch (e) {
      handleNotification("Wrong credentials", "tomato")
      setPassword("")
    }
  }

  const logout = () => {
    setUser(null)
    window.localStorage.removeItem("loggedBlogUser")
  }

  const getLoginForm = () => {
    if (!user) {
      return (
        <Togglable btnLabel="Login">
          <LoginForm handleSubmit={handleLogin}
            handleUsername={({ target }) => setUsername(target.value)}
            handlePassword={({ target }) => setPassword(target.value)}
            username={username}
            password={password}
          />
        </Togglable>
      )
    }
  }

  const getBlogForm = () => {
    return (
      <Togglable btnLabel="add blog" ref={blogFormRef}>
        <FormBlog
          addBlog={addBlog}
        />
      </Togglable>
    )
  }

  const getGreeting = () => {
    return (
      <p>Hey welcome, {user.name} <button onClick={logout}>Logout</button></p>
    )
  }

  const addBlog = (blog) => {
    try {
      blogFormRef.current.toggleVisibility()
      blogService.addBlog(blog)
        .then(recentAdded => {
          setBlogs(blogs.concat(recentAdded))
          handleNotification("Blog post added", "lime")
        })

    } catch (e) {
      handleNotification("Something went wrong", "tomato")
    }
  }

  const addLike = async (blog) => {
    try {

      if (user) {
        const recentAddedBlog = await blogService.updateBlog(blog)

        const updatedBlogs = blogs.map((b) => {
          if (b.id === recentAddedBlog.id) {
            return recentAddedBlog
          } else {
            return b
          }
        })

        const sortedBlogs = orderBlogs(updatedBlogs)
        setBlogs(sortedBlogs)
        handleNotification("Blog updated", "lime")
      } else {
        handleNotification("Log in to like", "tomato")
      }

    } catch (e) {
      handleNotification("Something went wrong", "tomato")
    }
  }

  const handleNotification = (message, color) => {
    setNotification({
      message,
      color,
    })

    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const deleteBlog = async (id) => {
    try {
      const done = await blogService.deleteBlog(id)

      if (done) {
        const updatedBlogs = blogs.filter((b) => (b.id !== id))

        setBlogs(updatedBlogs)
        handleNotification("Blog deleted", "lime")
      }

    } catch (e) {
      handleNotification("Something went wrong", "tomato")
    }

  }

  const orderBlogs = (blogs) => {
    return blogs.sort((a, b) => b.likes - a.likes)
  }

  return (
    <div>
      <Notification notification={notification} />
      {getLoginForm()}
      <h2>blogs</h2>
      {user && getGreeting()}
      {user && getBlogForm()}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} addLike={addLike} deleteBlog={deleteBlog} user={user || {}} />
      )}
    </div>
  )
}

export default App