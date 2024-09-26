import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { intializeBlogs } from "../reducers/blogsReducer";

import Blog from "./Blog";

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(intializeBlogs());
  }, []);

  if (!blogs) {
    return <div>No blogs to show yet...</div>;
  }

  return (
    <div>
      <ul>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </ul>
    </div>
  );
};

export default BlogList;
