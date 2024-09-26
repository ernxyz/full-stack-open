import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewBlog } from "./reducers/blogsReducer";
import { setWhenLoggedIn } from "./reducers/userReducer";

import Greeting from "./components/Greeting";
import TogglableBlogForm from "./components/TogglableBlogForm";
import Notification from "./components/Notification";
import TogglableLoginForm from "./components/TogglableLoginForm";
import BlogList from "./components/BlogList";

const App = () => {
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const blogFormRef = useRef();

  useEffect(() => {
    const userJSON = window.localStorage.getItem("loggedBlogUser");

    if (userJSON) {
      const user = JSON.parse(userJSON);
      dispatch(setWhenLoggedIn(user));
    }
  }, []);

  const addBlog = (blog) => {
    blogFormRef.current.toggleVisibility();
    dispatch(addNewBlog(blog));
  };

  return (
    <div>
      <Notification />
      <TogglableLoginForm user={user} />
      <h2>blogs</h2>
      <Greeting user={user} />
      <TogglableBlogForm
        user={user}
        blogFormRef={blogFormRef}
        addBlog={addBlog}
      />
      <BlogList />
    </div>
  );
};

export default App;
