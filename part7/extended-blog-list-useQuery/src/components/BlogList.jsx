import Blog from "./Blog";
import { useQuery } from "@tanstack/react-query";
import blogService from "../services/blogs";

import { Container } from "@mui/material"

const BlogList = () => {
  const result = useQuery({
    queryKey: ["blogs"],
    queryFn: blogService.getAll,
    refetchOnWindowFocus: false,
    retry: 2,
  });

  if (result.isLoading || result.isError) {
    return <div>No blogs to show yet...</div>;
  }

  const blogs = result.data.sort((a, b) => b.likes - a.likes)

  return (
    <Container className="page">
      <ul>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </ul>
    </Container>
  );
};

export default BlogList;
