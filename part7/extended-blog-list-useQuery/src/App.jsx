import { useEffect, useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Routes,
  Route,
  Link,
} from "react-router-dom"

import blogService from "./services/blogs";

import { showNotification } from "./components/NotificationContextProvider";
import { useNotificationDispatch } from "./components/NotificationContextProvider";
import Greeting from "./components/Greeting";
import TogglableBlogForm from "./components/TogglableBlogForm";
import Notification from "./components/Notification";
import TogglableLoginForm from "./components/TogglableLoginForm";
import BlogList from "./components/BlogList";
import {
  setLoggedInUser,
  useLoginDispatch,
  useLoginValue,
} from "./components/LoginContextProvider";
import UserList from "./components/UserList";
import User from "./components/User";
import Blog from "./components/Blog";

import { Container, Typography } from "@mui/material";
import Navbar from "./components/Navbar";

const App = () => {
  const user = useLoginValue();
  const dispacthNotification = useNotificationDispatch();
  const loginDispatch = useLoginDispatch();
  const blogFormRef = useRef();
  const queryClient = useQueryClient();

  const newBlogMutation = useMutation({
    mutationFn: blogService.addBlog,
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData(["blogs"]);
      queryClient.setQueryData(["blogs"], blogs.concat(newBlog));

      const notificationObj = {
        message: `Blog "${newBlog.title}" added`,
        color: "lime",
      };
      showNotification(dispacthNotification, notificationObj);
    },
  });

  useEffect(() => {
    const userJSON = window.localStorage.getItem("loggedBlogUser");

    if (userJSON) {
      const user = JSON.parse(userJSON);

      setLoggedInUser(loginDispatch, user);

      const notificationObj = {
        message: `Welcome again ${user.name}`,
        color: "yellow"
      }

      showNotification(dispacthNotification, notificationObj)
    }
  }, []);

  const addBlog = (blog) => {
    blogFormRef.current.toggleVisibility();
    newBlogMutation.mutate(blog);
  };

  const navStyle = {
    "padding": "10px"
  }

  return (
    <div className="app">
      <Notification />

      <Navbar />

      <Container>
        <Routes>
          <Route path="/" element={
            <Container className="page">
              <Typography variant="h3">Blogs page</Typography>
              <TogglableBlogForm blogFormRef={blogFormRef} addBlog={addBlog} />
              <BlogList />
            </Container>
          } />

          <Route path="/users" element={<UserList />} />
          <Route path="/users/:id" element={<User />} />
          <Route path="/blogs/:id" element={<Blog />} />
        </Routes>
      </Container>
    </div>
  );
};

export default App;
