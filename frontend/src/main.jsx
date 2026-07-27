import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import "./index.css";
import App from "./App.jsx";

import { ThemeProvider } from "./context/ThemeContext";
import { UploadProvider } from "./context/UploadContext";
import { SettingsProvider } from "./context/SettingsContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <UploadProvider>
          <SettingsProvider>
            <App />

            <Toaster
              position="top-right"
              reverseOrder={false}
            />
          </SettingsProvider>
        </UploadProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);