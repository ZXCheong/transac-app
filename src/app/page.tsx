"use client";
import Button from "@mui/material/Button";
import { ThemeProvider } from "@mui/material/styles";
import { TextField, Typography, Container } from "@mui/material";
import Box from "@mui/material/Box";
import { Form, useForm } from "react-hook-form";
import { theme } from "./const/theme";
import Link from "next/link";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export type InputProps = { UserName: string; Password: string };

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputProps>();

  const handleLogin = async () => {
    try {
      const requestData = {
        username,
        password,
      };

      const response = await axios.post(
        "http://localhost:4001/api/Authentication/Login",
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        const token = response.data;
        localStorage.setItem("authToken", token);
        localStorage.setItem("username", username);
        router.push("/homepage");
        console.log("redirecting to homepage");
        setLoginError(" ");
      } else {
        setLoginError("Login failed");
        console.log(response.data);
      }
    } catch (error) {
      console.error("Error during login:", error);
      setLoginError("Invalid username or password.");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <main>
        <Container maxWidth="sm">
          <Typography variant="h1">Transac App</Typography>

          <Box
            sx={{
              backgroundColor: "rgba(254, 237, 232, 0.5)",
              backdropFilter: "blur(10px)",
              margin: 8,
              padding: 10,
              alignItems: "left",
              borderRadius: "8px",
              boxShadow: "9px 0px 9px rgba(0, 0, 0, 0.4)",
            }}
          >
            <form onSubmit={handleSubmit(handleLogin)}>
              <Typography variant="h2">Login</Typography>
              <TextField
                sx={{ mt: 2 }}
                id="filled-basic"
                label="UserName"
                variant="filled"
                type="required"
                color="info"
                {...register("UserName", {
                  required: "This is required",
                  minLength: { value: 3, message: "Min Length is 3" },
                })}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Typography variant="body1" color="error">
                {errors.UserName?.message}
              </Typography>

              <TextField
                sx={{ mt: 2 }}
                id="filled-basic"
                label="Password"
                variant="filled"
                type="password"
                color="info"
                {...register("Password", {
                  required: "This is required",
                  minLength: { value: 3, message: "Min Length is 3" },
                })}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Typography variant="body1" color="error">
                {errors.Password?.message}
              </Typography>

              {loginError && (
                <Typography variant="body1" color="error">
                  {loginError}
                </Typography>
              )}

              <Box sx={{ margin: 1, maxWidth: "1rem" }}>
                <Button variant="contained" color="secondary" type="submit">
                  Login
                </Button>
              </Box>
            </form>
          </Box>
        </Container>
      </main>
    </ThemeProvider>
  );
}
