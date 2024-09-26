import { Link, useParams } from "react-router-dom"
import userService from "../services/users"
import { useQuery } from "@tanstack/react-query"
import { Container, List, ListItem, Typography } from "@mui/material"

const User = () => {
  const id = useParams().id

  const result = useQuery({
    queryKey: ["users"],
    queryFn: userService.getAll,
    refetchOnWindowFocus: false,
    retry: 2,
  })

  if (result.isLoading || result.isError) {
    return (
      <div>Loading...</div>
    )
  }

  const user = result.data.find(u => u.id === id)

  return (
    <Container className="page">
      <Typography variant="h2">{user.name}</Typography>

      <Typography sx={{ margin: "20px 0" }} variant="h5">Blogs added:</Typography>

      <List>
        {user.blogs.map(blog => (
          <ListItem key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>
              {blog.title}
            </Link>
          </ListItem>
        ))}
      </List>
    </Container>
  )
}

export default User