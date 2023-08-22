import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: { main: "#F4B860" },
    secondary: { main: "#C83E4D" },
    info: { main: "#4A5859" },
    error: { main: "#CB1900" },
  },

  typography: {
    h1: { fontSize: "5rem", textAlign: "center", color: "#FFFFFF" },
    h2: { fontSize: "3rem", color: "#32373B" },
    h3: { fontSize: "2rem", color: "#32373B" },
  },
});
