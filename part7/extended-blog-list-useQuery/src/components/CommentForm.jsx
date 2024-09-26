import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import blogService from "../services/blogs"

import { showNotification, useNotificationDispatch } from "./NotificationContextProvider"
import { Button, TextField } from "@mui/material"

const CommentForm = ({ blog }) => {
  const [content, setContent] = useState("")

  const queryClient = useQueryClient()
  const dispatchNotification = useNotificationDispatch()

  const addCommentMutation = useMutation({
    mutationFn: blogService.addComment,
    onSuccess: (commentAdded) => {
      queryClient.invalidateQueries(["blogs"])

      const notificationObj = {
        message: "comment added",
        color: "lightgreen",
      };
      showNotification(dispatchNotification, notificationObj);
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault()

    const blogAndContent = {
      blog,
      content,
    }

    addCommentMutation.mutate(blogAndContent)

    setContent("")
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="comment-form">
        <TextField
          size="small"
          variant="outlined"
          required
          type="text"
          value={content}
          onChange={({ target }) => setContent(target.value)}
          sx={{ backgroundColor: "white", borderRadius: "8px" }}
        />
        <Button variant="contained" color="primary" type="submit">add comment</Button>
      </div>
    </form>
  )
}

export default CommentForm