"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../const/theme";
import NavigationBar from "../components/navigationbar";
import DataTable from "../components/Table";
import LoginPage from "../page";

export default function Home() {
  const username = localStorage.getItem("username");

  return (
    <ThemeProvider theme={theme}>
      <NavigationBar />
      <main>
        <div>
          <Box
            sx={{
              backgroundColor: "rgba(254, 237, 232, 0.5)",
              backdropFilter: "blur(10px)",
              margin: 8,
              padding: 5,
              alignItems: "left",
              borderRadius: "8px",
              boxShadow: "9px 0px 9px rgba(0, 0, 0, 0.4)",
            }}
          >
            <Typography variant="h2">Welcome back {username}</Typography>

            <Box sx={{ mt: 20 }}>
              <Typography variant="h3">Recent Orders</Typography>
              <DataTable />
            </Box>
          </Box>
        </div>
      </main>
    </ThemeProvider>
  );
}
