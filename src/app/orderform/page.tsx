"use client";
import Button from "@mui/material/Button";
import { ThemeProvider } from "@mui/material/styles";
import { TextField, Typography, Container } from "@mui/material";
import Box from "@mui/material/Box";
import { Form, useForm, useFieldArray } from "react-hook-form";
import { theme } from "../const/theme";
import NavigationBar from "../components/navigationbar";
import { DataProps } from "../components/Order_form/props";
import OrderForm from "../components/Order_form";
export type InputProps = { UserName: string; Password: string };

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputProps>();

  // const { fields } = useFieldArray;

  console.log(errors);

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
              mt: 15,
              alignItems: "left",
              borderRadius: "8px",
              boxShadow: "9px 0px 9px rgba(0, 0, 0, 0.4)",
            }}
          >
            <Typography variant="h2">Edit Orders</Typography>
            <OrderForm />
          </Box>
        </div>
      </main>
    </ThemeProvider>
  );
}
