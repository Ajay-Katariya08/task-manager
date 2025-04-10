import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { TaskProvider } from "./context/TaskContext.jsx";

import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <TaskProvider>
          <App />
          <ToastContainer/>
        </TaskProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
