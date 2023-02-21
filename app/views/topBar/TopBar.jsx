import React from "react";
import { NavLink } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import "./TopBar.css";

class TopBar extends React.Component {
  render() {
    return (
      <AppBar position="static">
        <Toolbar className="cse4050-toolbar">
          <Typography variant="h6" className="cse4050-logo">
            Andrews Board Application
          </Typography>
          <Stack
            direction="row"
            spacing={2}
            sx={{
              "& a.active": {
                color: (theme) => theme.palette.primary.contrastText,
                bgcolor: (theme) => theme.palette.primary.main,
              },
            }}
          >
            {/*Created buttons that link to pages :)*/}
            <Button
              variant="contained"
              component={NavLink}
              to={{
                pathname: "/",
              }}
            >
              Home
            </Button>

            <Button
              variant="contained"
              component={NavLink}
              to={{
                pathname: "/tasks",
              }}
            >
              Tasks
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>
    );
  }
}
export default TopBar;
