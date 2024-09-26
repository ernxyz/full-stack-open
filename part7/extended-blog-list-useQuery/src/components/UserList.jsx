import { useQuery } from "@tanstack/react-query"
import userService from "../services/users"
import { Link } from "react-router-dom"
import { Card, CardContent, Container, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material"

const UserList = () => {

  const result = useQuery({
    queryKey: ["users"],
    queryFn: userService.getAll,
    refetchOnWindowFocus: false,
    retry: 2,
  })

  if (result.isLoading || result.isError) {
    return (
      <div>No users to show yet...</div>
    )
  }

  const users = result.data

  return (
    <Container className="page">
      <Typography variant="h3">Users page</Typography>

      <Card className="card">
        <CardContent>
          <Table>
            <TableHead>
              <tr>
                <th></th>
                <th>blogs created</th>
              </tr>
            </TableHead>
            <TableBody>
              {users.map(user => (
                <TableRow key={user.id}>
                  <TableCell align="center"><Link to={`/users/${user.id}`}>{user.name}</Link></TableCell>
                  <TableCell align="center" sx={{ color: "white" }}>{user.blogs.length}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Container>
  )
}

export default UserList