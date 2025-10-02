import { StrictMode } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { createRoot } from "react-dom/client";
import { ErrorProvider } from "./providers/ErrorContext.jsx";
import { RequestsProvider } from "./providers/RequestsContext";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./providers/AuthContext";
import "./index.css";
import App from "./App.jsx";
import theme from "./theme";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <RequestsProvider>
          <ErrorProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </ErrorProvider>
        </RequestsProvider>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);
