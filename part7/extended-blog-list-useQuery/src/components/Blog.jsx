import { useState } from "react";
import PropTypes from "prop-types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import blogService from "../services/blogs";
import {
  useNotificationDispatch,
  showNotification,
} from "./NotificationContextProvider";
import { useLoginValue } from "./LoginContextProvider";
import { useParams, Link, useNavigate, useMatch } from "react-router-dom";
import CommentForm from "./CommentForm";

import {
  Card,
  CardContent,
  Typography,
  Container,
  Button,
  ListItem,
  List,
} from "@mui/material"

const Blog = ({ blog, detailsTest }) => {
  const user = useLoginValue();

  const id = useParams().id
  const navigate = useNavigate()

  // const [details, setDetails] = useState("Details");

  const dispatchNotification = useNotificationDispatch();
  const queryClient = useQueryClient()

  const likeBlogMutation = useMutation({
    mutationFn: blogService.updateBlog,
    onSuccess: (updatedBlog) => {
      const blogs = queryClient.getQueryData(["blogs"]);

      const updatedBlogs = blogs.map((blog) =>
        blog.id === updatedBlog.id ? updatedBlog : blog,
      );

      queryClient.setQueryData(["blogs"], updatedBlogs);

      const notificationObj = {
        message: `Like added to "${updatedBlog.title}"`,
        color: "lightgreen",
      };
      showNotification(dispatchNotification, notificationObj);
    },
  });

  const deleteBlogMutation = useMutation({
    mutationFn: blogService.deleteBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });

      const notificationObj = {
        message: "Deleted successfully",
        color: "red",
      };
      showNotification(dispatchNotification, notificationObj);
    },
  });

  const handleLike = (blog) => {
    const updatedBlog = {
      id: blog.id,
      title: blog.title,
      url: blog.url,
      likes: blog.likes + 1,
    };

    likeBlogMutation.mutate(updatedBlog);
  };

  const handleDelete = (blog) => {
    const message = `Do you want to delete "${blog.title}" by ${blog.author.name}`;

    if (window.confirm(message)) {
      deleteBlogMutation.mutate(blog.id);
      navigate("/")
    }
  };

  const blogStyles = {
    url: {
      color: "#999",
      margin: 0,
      padding: 0,
    },
    show: {
      display: "",
    },
    hide: {
      display: "none",
    },
  };

  const matchToShowDetails = useMatch("/blogs/:id")

  const result = useQuery({
    queryKey: ["blogs"],
    queryFn: blogService.getAll,
    refetchOnWindowFocus: false,
    retry: 2,
  })

  if (result.isError || result.isLoading) {
    return <div>Loading...</div>
  }

  blog = result.data.find(b => b.id === id) || blog

  return (
    <Card className="card">
      <CardContent>
        <Typography variant={matchToShowDetails ? "h2" : "h4"} component={"h4"}>
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link> {!matchToShowDetails && <span>| Likes: {blog.likes}</span>}
        </Typography>
        <div
          style={matchToShowDetails ? blogStyles.show : blogStyles.hide}
          className="hidenContent"
        >
          <Typography variant="h6" sx={{ margin: "10px 0" }}>
            <a style={blogStyles.url} href={blog.url} target="blank">
              {blog.url}
            </a>
          </Typography>
          <Typography variant="body1" sx={{ margin: "10px 0" }}>by: <span style={{ fontWeight: "bolder" }}>{blog.author.name}</span></Typography>

          <p>Likes: {blog.likes}{" "}</p>
          <span>
            {user && (
              <Button sx={{ fontSize: "30px" }} onClick={() => handleLike(blog)}>👍</Button>
            )}
          </span>
          <span>
            {user && user.username === blog.author.username && (
              <>
                <span>or</span>
                <Button sx={{ fontSize: "20px" }} onClick={() => handleDelete(blog)}>🗑️</Button>
              </>
            )}
          </span>
          {user && (
            <div style={{ margin: "10px 0" }}>
              <h3>Leave a comment:</h3>
              <CommentForm blog={blog}/>
            </div >
          )}
          <Container sx={{ margin: "20px 0" }}>
            <Typography variant="h5" sx={{ margin: "10px 0" }}>comments:</Typography>
            <List>
              {blog.comments && blog.comments.map(comment => (
                <ListItem key={comment.id}>{comment.content}</ListItem>
              ))}
            </List>
          </Container>
        </div>
      </CardContent>
    </Card>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
};

export default Blog;
