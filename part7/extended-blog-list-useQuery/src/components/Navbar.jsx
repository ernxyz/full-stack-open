import { useLoginValue } from "./LoginContextProvider";
import { useNavigate } from "react-router-dom";
import Greeting from "./Greeting";

import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  MenuItem,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";

import { AccountCircle } from "@mui/icons-material";
import { useState } from "react";
import LoginForm from "./LoginForm";

const Navbar = () => {
  const user = useLoginValue()
  const nav = useNavigate()

  const [openDialog, setOpenDialog] = useState(false)

  const handleOpenDialog = () => setOpenDialog(true)
  const handleCloseDialog = () => setOpenDialog(false)

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Blogs App
          </Typography>
          <MenuItem onClick={() => nav("/")}>
            <span className="navbar-link">Home</span>
          </MenuItem>
          <MenuItem onClick={() => nav("/users")}>
            <span className="navbar-link">Users</span>
          </MenuItem>
          <MenuItem disableTouchRipple>
            {user && <Greeting user={user} />}
          </MenuItem>
          {!user && (
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              onClick={handleOpenDialog}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
      >
        <DialogContent>
          <LoginForm closeDialog={handleCloseDialog} />
        </DialogContent>
      </Dialog>
    </Box>
  )
}

export default Navbar