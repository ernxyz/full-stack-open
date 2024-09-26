import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { ThemeProvider, createTheme } from "@mui/material";

import "./index.css"

import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";

import NotificationContextProvider from "./components/NotificationContextProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LoginContextProvider from "./components/LoginContextProvider";

const theme = createTheme({
  palette: {
    primary: {
      main: "#d00000",
    }
  }
})

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={theme}>
    <Router>
      <QueryClientProvider client={queryClient}>
        <LoginContextProvider>
          <NotificationContextProvider>
            <App />
          </NotificationContextProvider>
        </LoginContextProvider>
      </QueryClientProvider>
    </Router>
  </ThemeProvider>
);
