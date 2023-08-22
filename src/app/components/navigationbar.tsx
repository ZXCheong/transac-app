import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import Link from "next/link";

const NavigationBar = () => {
  const username = localStorage.getItem("username");
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Transac App
        </Typography>
        <Button color="inherit">
          <Link href="/homepage">Home</Link>
        </Button>
        <Button color="inherit">
          <Link href="/orderform">Add Orders</Link>
        </Button>
        <Button color="inherit">
          <Link href="/">Logout({username})</Link>
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;
