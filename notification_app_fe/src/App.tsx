import { CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { TokenProvider } from "./context/TokenContext";
import { appTheme } from "./theme";
import { AppRoutes } from "./routes/AppRoutes";

export default function App() {
  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <TokenProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TokenProvider>
    </ThemeProvider>
  );
}